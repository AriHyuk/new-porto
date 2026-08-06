import { type NextRequest, NextResponse } from "next/server";

// Portfolio is fully static — no auth/admin needed.
// This middleware is a pure passthrough.
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
