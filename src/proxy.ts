import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname; // get's the path from the url

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || ""; // get token from cookies or empty string

  if (isPublicPath && token) {
    // If user is authenticated and trying to access public path, redirect to profile
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and trying to access protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  // an array's of paths that will be protected by this middleware
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail",
    "/profile/:path*",
  ],
};
