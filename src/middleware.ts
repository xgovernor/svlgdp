import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Assuming auth middleware populates req.auth

export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const authRoutes = ["/auth/signin", "/api/auth/error", "/auth/error"];
  const publicRoutes: string[] = ["/"];
  const defaultRedirect = new URL("/", origin);

  // Allow public routes without authentication
  if (
    publicRoutes.includes(pathname) ||
    (authRoutes.includes(pathname) && !req.auth)
  ) {
    return NextResponse.next();
  }

  // Redirect authenticated users from auth routes to fallback or default page
  if (req.auth && authRoutes.includes(pathname)) {
    return NextResponse.redirect(defaultRedirect);
  }

  // Allow access by default for authenticated users
  // return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
