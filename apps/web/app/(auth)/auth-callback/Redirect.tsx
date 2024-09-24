"use client";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authorize } from "@/services/auth";

interface RedirectProps {
  children: ReactNode;
  code: string | string[] | undefined;
}

const Redirect: FC<RedirectProps> = ({ children, code }) => {
  const router = useRouter();
  const initialRender = useRef(false);

  useEffect(() => {
    const init = async () => {
      if (initialRender.current) return;
      initialRender.current = true;

      if (code && typeof code === "string") {
        const res = await authorize(code);
        if (!res) return router.push("/signin");
      }

      const configId = localStorage.getItem("configId");
      if (configId) {
        localStorage.removeItem("configId");
        router.push(`/configure/preview?id=${configId}`);
      } else {
        router.push("/");
      }
    };
    init();
  }, [router, code]);

  return <>{children}</>;
};

export default Redirect;
