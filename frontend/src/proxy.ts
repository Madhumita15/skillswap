import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("pathname:", pathname);

  const token = request.cookies.get("accessToken")?.value;

  console.log("accessToken:", token);

  // ==========================================
  // 1. NORMAL PUBLIC ROUTES
  // ==========================================

  const isPublicRoute =
    pathname === "/" ||
    pathname === "/verify-email" ||
    pathname === "/forgot-password"

  // Landing page can ALWAYS be accessed
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ==========================================
  // 2. NO TOKEN
  // ==========================================

  if (!token) {
    // These pages are accessible without login
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Login is accessible without login
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Anything else is protected
    // /user/* or /admin/* or other protected pages
   
      return NextResponse.redirect(new URL("/login", request.url));
    
  }

  // ==========================================
  // 3. TOKEN EXISTS → VERIFY JWT
  // ==========================================

  const secret = process.env.JWT_ACCESS_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET_KEY is not defined");
  }

  const encodedSecret = new TextEncoder().encode(secret);

  let payload;

  try {
    const result = await jwtVerify(token, encodedSecret);

    payload = result.payload;
  } catch (error) {
    console.log("Invalid token:", error);

    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = payload.role;

  console.log("role:", role);

  // ==========================================
  // 4. LOGGED-IN USER/ADMIN
  //    CANNOT VISIT AUTH PAGES
  // ==========================================

  if (
    pathname === "/login" ||
    pathname === "/forgot-password" ||
    pathname === "/verify-email"
  ) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  // ==========================================
  // 5. ADMIN ROUTES
  // ==========================================

  if (pathname.startsWith("/admin")) {
    if (role === "admin") {
      return NextResponse.next();
    }

    // User trying to access admin
    if (role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }
  }

  // ==========================================
  // 6. USER ROUTES
  // ==========================================

  if (pathname.startsWith("/user")) {
    if (role === "user") {
      return NextResponse.next();
    }

    // Admin trying to access user
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  // ==========================================
  // 7. EVERYTHING ELSE
  // ==========================================

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/login",
    "/verify-email",
    "/admin/:path*",
    "/forgot-password",
    
  ],
};
