import React, { FC } from "react";
import Link from "next/link";

interface AuthFormFooterProps {
  url: string;
  label: string;
  text: string;
}

const AuthFormFooter: FC<AuthFormFooterProps> = ({ url, label, text }) => {
  return (
    <footer className="text-center xl:text-[15px] text-sm">
      <span className="text-gray-500 font-light mr-1">{text}</span>
      <Link href={url} className="text-primary">
        {label}
      </Link>
    </footer>
  );
};

export default AuthFormFooter;
