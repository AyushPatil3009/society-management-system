import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as { role?: string; status?: string } | undefined;
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isResidentRoute = nextUrl.pathname.startsWith("/resident");
  const isStaffRoute = nextUrl.pathname.startsWith("/staff");

  // 1. Allow internal auth API requests always
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // 2. Redirect logged-in users away from login/register
  if (isAuthRoute) {
    if (isLoggedIn && user) {
      if (user.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
      }
      if (user.role === "RESIDENT") {
        return NextResponse.redirect(new URL("/resident/dashboard", nextUrl));
      }
      if (user.role === "STAFF") {
        return NextResponse.redirect(new URL("/staff/dashboard", nextUrl));
      }
    }
    return NextResponse.next();
  }

  // 3. Protect private routes: Require authentication
  if (!isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
    );
  }

  // 4. Role-based access control (RBAC)
  if (isAdminRoute && user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (isResidentRoute && user?.role !== "RESIDENT") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  if (isStaffRoute && user?.role !== "STAFF") {
    return NextResponse.redirect(new URL("/unauthorized", nextUrl));
  }

  return NextResponse.next();
});

// Configure which paths the middleware intercepts
export const config = {
  matcher: [
    "/admin/:path*",
    "/resident/:path*",
    "/staff/:path*",
    "/login",
    "/register",
  ],
};

 //Summary in of line 10 Sentence:
// It tells TypeScript: "Trust me, when a user is logged in, their user object will contain role and status properties."Once you have this, TypeScript happily lets you write:
// typescript
// if (user.role === "ADMIN") { ... }
// without any red squiggly line!

/*
//The as keyword (Type Assertion / "Trust me, TypeScript")
Normally, TypeScript tries to protect you. It inspects NextAuth's default type definition and says:

"Hey developer! In the official NextAuth library, a user only has name, email, and image. You are trying to read user.role, but I have never heard of role! I'm throwing an error (Property 'role' does not exist) so you don't shoot yourself in the foot."
By writing as ..., you are telling TypeScript:

"I know what NextAuth's default is, but I configured the JWT callback earlier. I know for a fact that at runtime, our session object has a role and a status. Please treat this variable as having these extra properties."*/