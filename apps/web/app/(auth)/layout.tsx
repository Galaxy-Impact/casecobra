import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      {children}
    </main>
  );
};

export default AuthLayout;
