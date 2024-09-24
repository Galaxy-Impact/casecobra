import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/user";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
