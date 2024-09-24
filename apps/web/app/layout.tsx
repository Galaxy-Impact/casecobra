import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Recursive } from "next/font/google";
import { Toaster } from "@casecobra/ui";
import { constructMetadata } from "@/utils/helper";
import "./globals.css";

const recursive = Recursive({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        {children}
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            classNames: {
              error: "xl:text-base text-sm",
              description: "text-sm",
            },
          }}
        />

        <NextTopLoader showSpinner={false} color="#2b9b50" height={2} />
      </body>
    </html>
  );
}
