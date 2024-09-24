import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { buttonVariants } from "@casecobra/ui";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Image from "next/image";

const CreateYourCase = () => {
  return (
    <section>
      <MaxWidthWrapper className="py-24">
        <div className="mb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-3xl md:text-5xl text-gray-900">
              Upload your photo and get{" "}
              <span className="relative px-2 bg-green-600 text-white">
                your own case
              </span>{" "}
              now
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
            <Image
              width="0"
              height="0"
              sizes="100vw"
              alt="arrow"
              src="/arrow.png"
              className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 w-[126px] h-[31px]"
            />

            <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-3xl">
              <Image
                alt="horse"
                width="0"
                height="0"
                sizes="100vw"
                src="/horse.jpg"
                className="rounded-xl object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
              />
            </div>

            <Phone className="w-60" imgSrc="/horse_phone.jpg" />
          </div>
        </div>

        <ul className="mx-auto mt-24 max-w-prose sm:text-lg space-y-5 w-fit">
          <li className="w-fit">
            <Check className="h-5 w-5 text-green-600 inline mr-3.5" />
            High-quality silicone material
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-green-600 inline mr-3.5" />
            Scratch- and fingerprint resistant coating
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-green-600 inline mr-3.5" />
            Wireless charging compatible
          </li>
          <li className="w-fit">
            <Check className="h-5 w-5 text-green-600 inline mr-3.5" />5 year
            print warranty
          </li>

          <div className="flex justify-center">
            <Link
              className={buttonVariants({
                size: "lg",
                className: "mx-auto mt-8",
              })}
              href="/configure/upload"
            >
              Create your case now{" "}
              <ArrowRight className="h-[18px] w-[18px] ml-2" />
            </Link>
          </div>
        </ul>
      </MaxWidthWrapper>
    </section>
  );
};

export default CreateYourCase;
