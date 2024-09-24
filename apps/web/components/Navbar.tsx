import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@casecobra/ui";

import Logo from "./Logo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SignOutButton from "@/features/auth/SignOutButton";
import { getCurrentUser } from "@/services/user";
import { ADMIN_EMAIL } from "@/utils/config";

const Navbar = async () => {
  const user = await getCurrentUser();
  const isAdmin = ADMIN_EMAIL === user?.user.email;

  return (
    <nav className="sticky z-[100] h-14 lg:h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 lg:h-16 items-center justify-between border-b border-zinc-200">
          <Logo />

          <div className="h-full flex items-center md:space-x-4 space-x-1">
            {user ? (
              <>
                <SignOutButton />
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/signin"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
