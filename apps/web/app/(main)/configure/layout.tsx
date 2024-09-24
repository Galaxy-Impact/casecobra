import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/features/configure/Steps";
import { EdgeStoreProvider } from "@/lib/edgestore";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <EdgeStoreProvider>
      <MaxWidthWrapper className="flex-1 flex flex-col">
        <Steps />
        {children}
      </MaxWidthWrapper>
    </EdgeStoreProvider>
  );
};

export default Layout;
