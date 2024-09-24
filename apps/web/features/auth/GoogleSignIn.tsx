import React from "react";
import Link from "next/link";
import { getGoogleOauthUrl } from "@/utils/getGoogleUrl";
import Image from "next/image";
import { buttonVariants } from "@casecobra/ui";

const GoogleSignIn = () => {
  const url = getGoogleOauthUrl();
  return (
    <Link
      href={url}
      className={buttonVariants({
        variant: "outline",
        size: "lg",
        className: "flex w-full h-12 px-2 items-center justify-center gap-3.5",
      })}
    >
      <Image src="/google-logo.svg" alt="google" width={18} height={18} />
      <span className="text-gray-600 text-sm xl:text-base">
        Continue with Google
      </span>
    </Link>
  );
};

export default GoogleSignIn;
