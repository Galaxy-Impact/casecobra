import React from "react";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";

const users = [
  "/users/user-1.png",
  "/users/user-2.png",
  "/users/user-3.png",
  "/users/user-4.jpg",
  "/users/user-5.jpg",
];

const Hero = () => {
  return (
    <section>
      <MaxWidthWrapper className="pb-24 pt-10  sm:pb-32 lg:gap-x-0 lg:pt-24 xl:pt-28 lg:pb-52">
        <div className="flex lg:flex-row flex-col gap-6 lg:gap-28 items-center">
          <div className="col-span-2 px-6 lg:px-10 lg:pt-4">
            <div className="relative mx-auto text-center max-w-[540px] lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-16 left-0 -top-8 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-16" />
                <Image
                  src="/snake-1.png"
                  alt="snake"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-16 h-[84px]"
                  priority
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 md:text-5xl text-3xl ">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10  text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  {users.map((user) => (
                    <Image
                      className="rounded-full object-cover ring-2 ring-slate-100"
                      src={user}
                      alt="user image"
                      width={40}
                      height={40}
                      key={user}
                    />
                  ))}
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_item, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-green-600 fill-green-600"
                      />
                    ))}
                  </div>

                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[256px] flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-16 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src="/your-image.png"
                sizes="100vw"
                width="0"
                height="0"
                alt="your-image"
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <Image
                alt="line"
                src="/line.png"
                className="absolute -left-6 -bottom-6 select-none w-20"
                width="0"
                height="0"
                sizes="100vw"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
