import jwt from "jsonwebtoken";
import { CookieOptions, Response } from "express";

import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  COOKIE_EXPIRES_IN,
  NODE_ENV,
} from "@/config";

export default class AuthManager {
  res: Response;
  accessToken: string = "";
  refreshToken: string = "";

  constructor(res: Response) {
    this.res = res;
  }

  private createToken(id: string) {
    const accessToken = jwt.sign({ id }, ACCESS_TOKEN_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET!, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  }

  createTokenAndCookie(id: string) {
    const { accessToken, refreshToken } = this.createToken(id);

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      expires: new Date(
        Date.now() + Number(COOKIE_EXPIRES_IN) * 24 * 60 * 1000
      ),
      secure: NODE_ENV === "production",
    };

    this.res.cookie("casecobra-access-token", accessToken, cookieOptions);
    this.res.cookie("casecobra-refresh-token", refreshToken, cookieOptions);

    return this;
  }

  sendResponse(
    statusCode: number,
    user: {
      id: string;
      name: string | null;
      email: string;
    }
  ) {
    this.res.status(statusCode).json({
      status: "success",
      token: {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      },
      data: {
        user,
      },
    });
  }
}
