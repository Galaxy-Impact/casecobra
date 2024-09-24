import { FC } from "react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

import Redirect from "./Redirect";
import { getCurrentUser } from "@/services/user";

interface AuthCallBackPageProps {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}

const AuthCallBackPage: FC<AuthCallBackPageProps> = async ({
  searchParams: { code },
}) => {
  const user = await getCurrentUser();
  if (!user?.user && !code) return redirect("/signin");

  return (
    <Redirect code={code}>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Logging you in...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    </Redirect>
  );
};

export default AuthCallBackPage;
