import React, { FC } from "react";
import Logo from "@/components/Logo";

interface AuthFormHeaderProps {
  title: string;
  subtitle: string;
}

const AuthFormHeader: FC<AuthFormHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="flex flex-col items-center gap-4">
      <Logo className="2xl:text-xl text-lg" />
      <div className="text-center">
        <h3 className="font-bold mb-1.5 text-2xl text-gray-700">{title}</h3>
        <p className="text-[15px] text-gray-500">{subtitle}</p>
      </div>
    </header>
  );
};

export default AuthFormHeader;
