import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@casecobra/ui";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex z-40 font-semibold 2xl:text-[22px] md:text-xl text-lg",
        className
      )}
    >
      case<span className="text-green-600">cobra</span>
    </Link>
  );
};

export default Logo;
