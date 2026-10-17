
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;
  console.log("token", token)
  const role = request.cookies.get("role")?.value;
  console.log("role", role)

  if(pathname === "/"){
    return NextResponse.next()
  }

 if ((pathname === "/login" || pathname === "/verify-email" || pathname === ("/forgot-password")) && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

//   3. Admin routes
  if (pathname.startsWith("/admin")) {
    if (role === "admin") {
      return NextResponse.next();
    }

    if (role === "user") {
      return NextResponse.redirect(
        new URL("/user/dashboard", request.url)
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

//   4. User routes
  if (pathname.startsWith("/user")) {
    if (role === "user") {
      return NextResponse.next();
    }

    if (role === "admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/verify-email",
    "/forgot-password",
    "/user/:path*",
    "/admin/:path*",
  ],
};
