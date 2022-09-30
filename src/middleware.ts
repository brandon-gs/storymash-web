// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES: Record<string, boolean> = {
  "/": true,
  "/activate-account": true,
  "/profile": true,
  "/activation": true,
  "/onboarding/info": true,
  "/onboarding/gender": true,
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

    return isPrivateRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", request.url));
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
