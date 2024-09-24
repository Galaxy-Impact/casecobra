import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { ObjectId } from "bson";
import qs from "qs";

import { db } from "@/app";
import Email from "@/services/email";
import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import AuthManager from "@/utils/authManager";
import {
  CLIENT_URL,
  EMAIL_ACTIVATION_TOKEN_EXPIRES_IN,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URL,
} from "@/config";
import axios from "axios";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const createHashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const createVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const hashToken = createHashToken(token);

  return {
    token,
    hashToken,
  };
};

export const checkVerificationToken = async (token: string) => {
  const hashToken = createHashToken(token);
  const user = await db.user.findFirst({
    where: {
      verificationToken: hashToken,
      verificationTokenExpiresIn: {
        gt: new Date(Date.now()),
      },
    },
  });

  return user;
};

export const signUp = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailInUse = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailInUse) return next(new AppError("Email is in use", 400));

    const id = new ObjectId().toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    const { token, hashToken } = createVerificationToken();

    const verificationTokenExpiresIn = new Date(
      Date.now() + Number(EMAIL_ACTIVATION_TOKEN_EXPIRES_IN)
    );

    await db.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        name,
        verificationToken: hashToken,
        verificationTokenExpiresIn,
      },
    });

    const url = `${CLIENT_URL}/auth-callback?code=${token}`;

    await new Email({
      user: { email, name },
    }).sendEmailActivationMail(url);

    res.status(201).json({
      status: "success",
      message: "Please verified your email address",
    });
  } catch (error) {
    console.log(error);
    next(new AppError("Failed to create account", 500));
  }
});

export const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (
    !user ||
    (user && user.password && !(await bcrypt.compare(password, user.password)))
  ) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  if (!user.isVerified) {
    return next(new AppError("Please verified your email address", 401));
  }

  new AuthManager(res)
    .createTokenAndCookie(user.id)
    .sendResponse(200, { id: user.id, email: user.email, name: user.name });
});

export const signOut = catchAsync(async (req, res, next) => {
  res.cookie("casecobra-access-token", "signout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 5000),
  });

  res.cookie("casecobra-refresh-token", "signout", {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 5000),
  });

  res.status(200).json({
    status: "success",
  });
});

const getGoogleOauthToken = async (code: string) => {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw new Error(error.message);
  }
};

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const googleOauthHandler = catchAsync(async (req, res, next) => {
  try {
    const code = req.query.code as string;

    const { access_token, id_token } = await getGoogleOauthToken(code);
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }

    const { hashToken, token } = createVerificationToken();
    const verificationTokenExpiresIn = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    );

    await db.user.upsert({
      where: {
        email: googleUser.email,
      },
      update: {
        name: googleUser.name,
        verificationToken: hashToken,
        verificationTokenExpiresIn,
      },
      create: {
        email: googleUser.email,
        name: googleUser.name,
        isVerified: true,
        verificationToken: hashToken,
        verificationTokenExpiresIn,
      },
    });

    res.redirect(`${CLIENT_URL!}/auth-callback?code=${token}`);
  } catch (error) {
    res.redirect(`${CLIENT_URL!}`);
  }
});

export const authorize = catchAsync(async (req, res, next) => {
  const { clientId, code } = req.body;

  if (clientId !== GOOGLE_CLIENT_ID)
    return next(new AppError("invalid client id", 401));

  const user = await checkVerificationToken(code);

  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "invalid code",
    });

    return;
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresIn: null,
    },
  });

  new AuthManager(res)
    .createTokenAndCookie(user.id)
    .sendResponse(200, { id: user.id, name: user.name, email: user.email });
});
