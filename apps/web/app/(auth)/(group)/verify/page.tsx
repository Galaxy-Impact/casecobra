import React, { FC } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@casecobra/ui";

interface VerifyEmailPageProps {
  searchParams: {
    email: string;
  };
}

const VerifyEmailPage: FC<VerifyEmailPageProps> = ({
  searchParams: { email },
}) => {
  if (!email) return redirect("/signup");

  return (
    <div className="flex flex-col gap-8 items-center text-gray-700 text-base w-full px-4 py-20">
      <div className="flex flex-col gap-4 items-center ">
        <div className="flex flex-col items-center">
          <div className="w-[140px] h-[140px]">
            <Image
              src="/email.gif"
              alt="mail"
              height="0"
              width="0"
              sizes="100vw"
              className="w-[140px] h-auto -hue-rotate-30"
              unoptimized
            />
          </div>
          <h2 className="text-gray-800 text-3xl font-bold mb-1">
            Please verify your email
          </h2>
        </div>
        <p>You are almost there! We sent an email to</p>
        <small className="font-semibold text-gray-800 text-lg -mt-3.5">
          {email}
        </small>
      </div>

      <p className="max-w-[540px] text-center">
        Just click on the link in that email to complete sign up. if you don't
        see it, you may need to{" "}
        <span className="font-semibold text-gray-800">
          check your spam folder.
        </span>
      </p>

      <p>Still can't find the email? No problem</p>

      <Button size="lg" className="max-w-[250px] lg:text-base">
        Resend Verification Email
      </Button>
    </div>
  );
};

export default VerifyEmailPage;
