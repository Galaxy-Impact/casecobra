"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import axios from "@/lib/axios";
import { SignInFormData, SignUpFormData } from "@/types";

export const getAccessTokenFromCookie = async () => {
  const accessToken = cookies().get("casecobra-access-token");
  if (!accessToken?.value) return null;

  return accessToken.value;
};

export const signUp = async (formData: SignUpFormData) => {
  try {
    await axios.post(`/auth/signup`, formData, {
      withCredentials: true,
    });
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data.message || "Something went wrong!",
    };
  }

  redirect(`/verify?email=${formData.email}`);
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const { headers } = await axios.post(`/auth/signin`, formData, {
      withCredentials: true,
    });

    const cookie = cookies();
    headers["set-cookie"]?.map((c) => {
      const [name, value] = c.split("=");

      if (!value || !name) return;

      cookie.set(name, value?.slice(0, value.length - 6), {
        httpOnly: true,
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      });
    });
  } catch (error: any) {
    return {
      status: "error",
      message: error?.response?.data.message || "Something went wrong!",
    };
  }

  revalidatePath("/");
  redirect("/auth-callback");
};

export const signOut = () => {
  const cookie = cookies();

  cookie.delete("casecobra-access-token");
  cookie.delete("casecobra-refresh-token");

  redirect("/");
};

export const authorize = async (code: string) => {
  try {
    const { data } = await axios.post(
      `/auth/authorize`,
      {
        code,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      },
      {
        withCredentials: true,
      }
    );

    const cookie = cookies();

    cookie.set("casecobra-access-token", data.token.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    cookie.set("casecobra-refresh-token", data.token.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
