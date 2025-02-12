import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyJWTToken(token: string) {
  try {
    const verifiedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return verifiedToken.payload;
  } catch (error) {
    console.log("Error!");
    console.error(error);
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const verifiedToken = await verifyJWTToken(accessToken!);

  console.log(verifiedToken?.payload);

  if (!accessToken || !verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { pathname } = request.nextUrl;
  const role = verifiedToken.role;

  console.log(accessToken);

  if (
    (pathname.startsWith("/dashboard/organizer") && role === "ORGANIZER") ||
    (pathname.startsWith("/dashboard/user") && role === "CUSTOMER")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-up", request.url));
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
