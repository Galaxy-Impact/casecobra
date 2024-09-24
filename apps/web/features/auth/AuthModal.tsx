"use client";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  buttonVariants,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@casecobra/ui";

const LoginModal = ({
  isOpen,
  setIsOpen,
  configId,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  configId: string;
}) => {
  const onClick = () => {
    localStorage.setItem("configId", configId);
  };
  return (
    <div className="absolute h-full">
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="z-[9999999]">
          <DialogHeader>
            <div className="relative mx-auto w-20 h-20 mb-2">
              <Image
                src="/snake-1.png"
                alt="snake image"
                className="object-contain"
                fill
              />
            </div>
            <DialogTitle className="text-2xl text-center font-bold tracking-tight text-gray-900">
              Log in to continue
            </DialogTitle>
            <DialogDescription className="text-base text-center py-2">
              <span className="font-medium text-zinc-900">
                Your configuration was saved!
              </span>{" "}
              Please login or create an account to complete your purchase.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
            <Link
              href="/signin"
              className={buttonVariants({ variant: "outline", size: "lg" })}
              onClick={onClick}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ variant: "default", size: "lg" })}
              onClick={onClick}
            >
              Sign up
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
