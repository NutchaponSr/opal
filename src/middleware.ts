import { apiPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";

import { auth as middleware } from "@/lib/auth";

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
}