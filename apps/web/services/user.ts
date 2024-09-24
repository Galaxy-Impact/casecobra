"use server";
import axios from "@/lib/axios";
import { getAccessTokenFromCookie } from "./auth";

export const getCurrentUser = async (): Promise<{
  user: {
    id: string;
    email: string;
    name: string;
  };
} | null> => {
  try {
    const accessToken = await getAccessTokenFromCookie();

    const { data } = await axios.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  } catch (error) {
    return null;
  }
};
