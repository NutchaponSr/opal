import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/overviews(.*)", "/org"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)", "/overviews"]);
const isPublicEntry = createRouteMatcher(["/", "/sign-in", "/sign-up"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // ✅ If user is signed in and hits a public entry page, redirect to /org
  if (userId && isPublicEntry(req)) {
    const url = new URL("/org", req.url);
    return NextResponse.redirect(url);
  }

  // ✅ Protect routes
  if (isProtectedRoute(req)) {
    await auth.protect();

    if (isAdminRoute(req) && sessionClaims?.metadata?.role !== "admin") {
      const url = new URL("/", req.url);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};