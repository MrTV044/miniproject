import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWTToken(token: string) {
  try {
    if (!token) return null; // Explicitly handle missing token case

    const verifiedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    return verifiedToken.payload; // Ensure payload is returned
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null; // Return null instead of undefined
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    console.error("No access token found in cookies.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const verifiedToken = await verifyJWTToken(accessToken);

  console.log("Access Token:", accessToken);
  console.log("Verified Token:", verifiedToken);

  if (!verifiedToken || !verifiedToken.role) {
    console.error("Invalid or expired token.");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { pathname } = request.nextUrl;
  const role = verifiedToken.role;

  // Route access logic
  if (
    (pathname.startsWith("/dashboard/organizer") && role === "ORGANIZER") ||
    (pathname.startsWith("/dashboard/user") && role === "CUSTOMER")
  ) {
    return NextResponse.next();
  }

  // Redirect based on role
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL(
        role === "ORGANIZER" ? "/dashboard/organizer" : "/dashboard/user",
        request.url
      )
    );
  }

  return NextResponse.redirect(new URL("/sign-up", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
