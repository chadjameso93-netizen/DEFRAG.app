import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"
import { getRedirectPath } from "@/lib/user-status"

// Routes that require authentication
const PROTECTED_ROUTES = ["/app", "/dashboard", "/relationships", "/timeline", "/daily-read", "/ai", "/settings", "/onboarding", "/invite"]

// Routes that authenticated users should NOT see (redirect to /app)
const AUTH_ROUTES = ["/login", "/signup"]

// Public routes that anyone can access
// Everything else: /, /about, /pricing, /principles, /privacy, /terms, /why, /support, /status, /invite, /intake, /api

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const { user, supabaseResponse, supabase } = await updateSession(request)

  const isProtected = PROTECTED_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))

  // Not authenticated → redirect to login for protected routes
  const unauthenticatedRedirect = getRedirectPath(
    { isAuthenticated: Boolean(user), onboardingComplete: false, homePath: "/app" },
    { isProtectedRoute: isProtected, isAuthRoute: isAuthRoute }
  )

  if (!user && unauthenticatedRedirect) {
    const url = request.nextUrl.clone()
    url.pathname = unauthenticatedRedirect
    return NextResponse.redirect(url)
  }

  // Authenticated → redirect away from auth routes
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = getRedirectPath(
      { isAuthenticated: true, onboardingComplete: true, homePath: "/app" },
      { isAuthRoute: true }
    ) || "/app"
    return NextResponse.redirect(url)
  }

  // Authenticated + accessing protected route (not onboarding) → check profile
  if (user && isProtected && pathname !== "/onboarding") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!profile) {
      const url = request.nextUrl.clone()
      url.pathname = getRedirectPath(
        { isAuthenticated: true, onboardingComplete: false, homePath: "/app" },
        { isProtectedRoute: true }
      ) || "/onboarding"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
