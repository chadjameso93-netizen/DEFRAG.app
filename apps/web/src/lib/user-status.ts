import type { Entitlement } from "@/lib/types"
import { getEntitlement } from "@/lib/entitlements"
import { createServerClient } from "@/lib/supabase/server"

const DEFAULT_HOME_PATH = "/app"

export interface UserStatus {
  isAuthenticated: boolean
  userId: string | null
  email: string | null
  hasProfile: boolean
  onboardingComplete: boolean
  plan: Entitlement["plan"]
  subscriptionStatus: Entitlement["status"]
  isSubscribed: boolean
  isAllowlisted: boolean
  homePath: string
}

export interface ResolveUserStatusInput {
  userId?: string | null
  email?: string | null
  hasProfile?: boolean
  entitlement?: Partial<Entitlement> | null
}

function readAllowlist() {
  return (process.env.DEFRAG_ALLOWLIST ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

export function resolveUserStatus(input: ResolveUserStatusInput): UserStatus {
  const email = input.email ?? null
  const allowlist = readAllowlist()
  const plan = (input.entitlement?.plan as Entitlement["plan"] | undefined) ?? "free"
  const subscriptionStatus =
    (input.entitlement?.status as Entitlement["status"] | undefined) ?? "trialing"

  return {
    isAuthenticated: Boolean(input.userId),
    userId: input.userId ?? null,
    email,
    hasProfile: Boolean(input.hasProfile && input.userId),
    onboardingComplete: Boolean(input.hasProfile && input.userId),
    plan,
    subscriptionStatus,
    isSubscribed: subscriptionStatus === "active" || subscriptionStatus === "trialing",
    isAllowlisted: Boolean(email && allowlist.includes(email.toLowerCase())),
    homePath: DEFAULT_HOME_PATH,
  }
}

export function getRedirectPath(
  status: Pick<UserStatus, "isAuthenticated" | "onboardingComplete" | "homePath">,
  options?: { isProtectedRoute?: boolean; isAuthRoute?: boolean },
) {
  if (!status.isAuthenticated && options?.isProtectedRoute) {
    return "/login"
  }

  if (status.isAuthenticated && options?.isAuthRoute) {
    return status.homePath
  }

  if (status.isAuthenticated && options?.isProtectedRoute && !status.onboardingComplete) {
    return "/onboarding"
  }

  return null
}

export async function getUserStatus(): Promise<UserStatus> {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return resolveUserStatus({})
  }

  const [{ data: profile }, entitlement] = await Promise.all([
    supabase.from("profiles").select("id").eq("user_id", user.id).maybeSingle(),
    getEntitlement(user.id),
  ])

  return resolveUserStatus({
    userId: user.id,
    email: user.email ?? null,
    hasProfile: Boolean(profile?.id),
    entitlement,
  })
}
