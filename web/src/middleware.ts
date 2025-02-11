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
    console.log("Erro!");
    console.error(error);
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const verifiedToken = await verifyJWTToken(accessToken!);

  if (!accessToken || !verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/event-dashboard/:path*"],
};
