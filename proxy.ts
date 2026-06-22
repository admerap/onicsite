import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const response = NextResponse.next();

  if (!req.cookies.get("sessionCartId")) {
    response.cookies.set("sessionCartId", crypto.randomUUID(), {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
