// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES: Record<string, boolean> = {
  "/activate-account": true,
  "/activation": true,
  "/onboarding/info": true,
  "/onboarding/gender": true,
  "/onboarding/profile": true,
  "/profile": true,
  "/stories": true,
};

const PUBLIC_ROUTES: Record<string, boolean> = {
  "/": true,
  "/login": true,
  "/register": true,
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES[pathname];
  const isPrivateRoute = PRIVATE_ROUTES[pathname];

  if (!isPublicRoute && !isPrivateRoute) {
    return NextResponse.next();
  }

  const jwtToken = request.cookies.get("access_token");

  try {
    if (jwtToken === undefined) {
      /**
       * This prevent make the request to verify token when we want to access to
       * a public resource and we don't have a token
       * if is a private route then we redirect the user to the login page
       */
      return isPublicRoute
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/login", request.url));
    }

    const data = await getValidationToken(jwtToken);

    if (typeof data.redirect === "string" && data.redirect !== pathname) {
      return NextResponse.redirect(new URL(data.redirect, request.url));
    }

    const userRedirect = getUserRedirectPage(data.user, pathname);

    if (userRedirect === pathname) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(userRedirect, request.url));
  } catch (error) {
    return isPublicRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.url));
  }
}

const getValidationToken = async (jwtToken: string) => {
  const validateAccessTokenUrl = `${process.env.API_URL}/api/v1/auth/validate-access-token`;

  const response = await fetch(validateAccessTokenUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `${jwtToken}`,
    },
  });

  return await response.json();
};

interface User {
  account: {
    isDeleted: boolean;
    isActivate: boolean;
    onboardingComplete: boolean;
  };
  profile: {
    gender: string;
  };
}

export function getUserRedirectPage(user: User, pathname: string) {
  if (!user) {
    return "/";
  }

  const { account } = user;

  if (account.isDeleted) {
    return "/";
  }

  if (pathname === "/") {
    return "/stories";
  }

  const isActivationPathname =
    pathname === "/activate-account" || pathname === "/activation";

  if (account.isActivate && isActivationPathname) {
    return "/stories";
  }

  if (account.onboardingComplete && pathname.includes("onboarding")) {
    return "/stories";
  }
  return pathname;
}
