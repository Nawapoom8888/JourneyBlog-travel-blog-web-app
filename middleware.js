// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/dashboard/user/:path*",
    "/dashboard/admin/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
  ],
};

// Role based Authorization
export default withAuth(
  async function middleware(req) {
    // authorize roles
    const url = req.nextUrl.pathname;
    const userRole = req?.nextauth?.token?.user?.role;

    // client side protection
    if (url?.includes("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (!token) {
          return false;
        }
      },
    },
  },
);