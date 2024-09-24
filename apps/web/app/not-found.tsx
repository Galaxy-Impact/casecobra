import React from "react";
import Link from "next/link";
import { buttonVariants } from "@casecobra/ui";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-20 items-center">
        <Image src="/not-found.svg" width={480} height={320} alt="not-found" />

        <div className="text-center">
          <h3 className="sm:text-2xl xs:text-xl text-lg dark:text-gray-50 text-gray-900 font-medium">
            Ohh! Page Not found{" "}
          </h3>
          <p className="sm:text-[16.75px] text-[14px] my-1.5 dark:text-gray-300 text-gray-800 ">
            We can't seem to find the page you are looking for
          </p>

          <Link
            href="/"
            className={buttonVariants({
              size: "sm",
              className: "mt-6 px-6",
            })}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
