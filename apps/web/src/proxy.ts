import { NextResponse, type NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const protectedPaths = ["/dashboard", "/relationships", "/timeline", "/simulations"]
  const path = req.nextUrl.pathname
  const isProtected = protectedPaths.some((p) => path.startsWith(p))

  if (!isProtected) return NextResponse.next()

  const hasAccessToken =
    req.cookies.has("sb-access-token") ||
    Array.from(req.cookies.getAll()).some((c) => c.name.includes("auth-token"))

  if (!hasAccessToken) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/relationships/:path*", "/timeline/:path*", "/simulations/:path*"],
}
