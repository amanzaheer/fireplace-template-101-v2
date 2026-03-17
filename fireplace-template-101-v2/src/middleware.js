import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com *.googleadservices.com *.doubleclick.net *.google.com *.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.logicalcrm.com *.google-analytics.com *.googletagmanager.com *.googleadservices.com *.doubleclick.net *.google.com *.gstatic.com",
      "frame-src *.googletagmanager.com *.googleadservices.com *.doubleclick.net *.google.com",
    ].join("; ")
  );

  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files, images, and Next.js internals
    "/((?!_next/static|_next/image|api/image|favicon.ico).*)",
  ],
};
