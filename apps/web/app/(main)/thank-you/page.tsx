import { FC, Suspense } from "react";
import { notFound } from "next/navigation";

import ThankYou from "./ThankYou";
import { getPaymentStatus } from "@/services/order";

interface ThankYouPageProps {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}

const ThankYouPage: FC<ThankYouPageProps> = async ({
  searchParams: { orderId },
}) => {
  if (!orderId || typeof orderId !== "string") return notFound();

  const response = await getPaymentStatus({ orderId });

  if (response.status === "error")
    return (
      <div className="text-center text-xl py-20">
        <h1>{response.message}</h1>
      </div>
    );

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ThankYou order={response.data.order} />
    </Suspense>
  );
};

export default ThankYouPage;
