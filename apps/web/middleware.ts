import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/user";
import { ADMIN_EMAIL } from "./utils/config";

export async function middleware(request: NextRequest) {
  const forbiddenRoutes = ["/dashboard"];

  const currentPath = request.nextUrl.pathname;

  const isForbiddenRoute = forbiddenRoutes.includes(currentPath);

  if (isForbiddenRoute) {
    const data = await getCurrentUser();

    if (!data || data.user.email !== ADMIN_EMAIL)
      return NextResponse.redirect(new URL("/not-found", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
