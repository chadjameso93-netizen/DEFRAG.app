import { describe, expect, it } from "vitest"
import { getRedirectPath, resolveUserStatus } from "@/lib/user-status"

describe("user-status", () => {
  it("marks an authenticated profiled user as onboarded", () => {
    const status = resolveUserStatus({
      userId: "user-1",
      email: "person@example.com",
      hasProfile: true,
      entitlement: { plan: "free", status: "trialing" },
    })

    expect(status.isAuthenticated).toBe(true)
    expect(status.onboardingComplete).toBe(true)
    expect(status.homePath).toBe("/app")
  })

  it("redirects protected unauthenticated users to login", () => {
    const redirectPath = getRedirectPath(
      { isAuthenticated: false, onboardingComplete: false, homePath: "/app" },
      { isProtectedRoute: true },
    )

    expect(redirectPath).toBe("/login")
  })

  it("redirects incomplete authenticated users to onboarding", () => {
    const redirectPath = getRedirectPath(
      { isAuthenticated: true, onboardingComplete: false, homePath: "/app" },
      { isProtectedRoute: true },
    )

    expect(redirectPath).toBe("/onboarding")
  })

  it("redirects authenticated auth-route visits to the home path", () => {
    const redirectPath = getRedirectPath(
      { isAuthenticated: true, onboardingComplete: true, homePath: "/app" },
      { isAuthRoute: true },
    )

    expect(redirectPath).toBe("/app")
  })
})
