import { NextResponse } from "next/server"
import { getUserStatus } from "@/lib/user-status"

export async function GET() {
  const status = await getUserStatus()

  return NextResponse.json({
    authenticated: status.isAuthenticated,
    userId: status.userId,
    email: status.email,
    hasProfile: status.hasProfile,
    onboardingComplete: status.onboardingComplete,
    plan: status.plan,
    subscriptionStatus: status.subscriptionStatus,
    isSubscribed: status.isSubscribed,
    isAllowlisted: status.isAllowlisted,
    homePath: status.homePath,
  })
}
