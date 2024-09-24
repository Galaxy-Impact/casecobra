"use server";

import { revalidatePath } from "next/cache";
import axios from "@/lib/axios";
import { getAccessTokenFromCookie } from "./auth";
import { Order, OrderStatus, ServerActionError } from "@/types";

export const createPaymentSession = async (
  configId: string
): Promise<
  | {
      status: "success";
      data: {
        session: {
          url: string;
        };
      };
    }
  | ServerActionError
> => {
  try {
    const accessToken = await getAccessTokenFromCookie();
    if (!accessToken) throw new Error("Please logged in!");
    const { data } = await axios.get(`/order/checkout-session/${configId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};

type GetPaymentStatusResult = {
  status: "success";
  data: {
    order: Order;
  };
};

export const getPaymentStatus = async ({
  orderId,
}: {
  orderId: string;
}): Promise<ServerActionError | GetPaymentStatusResult> => {
  const accessToken = await getAccessTokenFromCookie();
  try {
    const { data } = await axios.get(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data as GetPaymentStatusResult;
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};

export const getStats = async (): Promise<
  | {
      data: {
        lastWeekSum: number;
        lastMonthSum: number;
      };
      status: "success";
    }
  | ServerActionError
> => {
  const accessToken = await getAccessTokenFromCookie();

  try {
    const { data } = await axios.get("/order/stats", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: "something went wrong!",
    };
  }
};

export const getRecentOrders = async (): Promise<
  | ServerActionError
  | {
      status: "success";
      data: {
        orders: {
          user: {
            id: string;
            email: string;
            name: string | null;
          };
          id: string;
          createdAt: Date;
          updatedAt: Date;
          amount: number;
          isPaid: boolean;
          status: OrderStatus;
          shippingAddress: {
            name: string;
          } | null;
        }[];
      };
    }
> => {
  const accessToken = await getAccessTokenFromCookie();

  try {
    const { data } = await axios.get("/order/recent-orders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: "something went wrong!",
    };
  }
};

export const updateOrderStatus = async ({
  status,
  id,
}: {
  status: OrderStatus;
  id: string;
}): Promise<
  | ServerActionError
  | {
      status: "success";
      data: any;
    }
> => {
  const accessToken = await getAccessTokenFromCookie();

  try {
    const { data } = await axios.patch(
      `/order/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    revalidatePath("/dashboard");

    return data;
  } catch (error) {
    return {
      status: "error",
      message: "something went wrong!",
    };
  }
};
