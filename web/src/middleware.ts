import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWTToken(token: string) {
  try {
    if (!token) {
      return console.log("Token unavailable");
    }

    const verifiedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return verifiedToken.payload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    console.error("No access token found in cookies.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const verifiedToken = await verifyJWTToken(accessToken);

  if (!verifiedToken || !verifiedToken.role) {
    console.error("Invalid or expired token.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { pathname } = request.nextUrl;
  const role = verifiedToken.role;

  if (pathname.startsWith("/create-event") && role === "ORGANIZER") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/transaction") && role === "CUSTOMER") {
    return NextResponse.next();
  }

  if (
    (pathname.startsWith("/dashboard/organizer") && role === "ORGANIZER") ||
    (pathname.startsWith("/dashboard/user") && role === "CUSTOMER")
  ) {
    return NextResponse.next();
  }

  // Redirect based on role
  if (pathname.startsWith("/dashboard") && role === "ORGANIZER") {
    return NextResponse.redirect(new URL("/dashboard/organizer", request.url));
  }
  if (pathname.startsWith("/dashboard") && role === "CUSTOMER") {
    return NextResponse.redirect(new URL("/dashboard/user", request.url));
  }

  return NextResponse.redirect(new URL("/sign-up", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/create-event", "/transaction"],
};
