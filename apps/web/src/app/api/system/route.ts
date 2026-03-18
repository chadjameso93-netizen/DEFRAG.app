import { NextResponse } from "next/server"
import { generateDailyInsight } from "@/lib/engine/dailyInsight"
import { createServerClient } from "@/lib/supabase/server"
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET() {
  const userId = await getOptionalAuthenticatedUserId()

  if (userId) {
    const supabase = await createServerClient()
    const { data: profile } = await supabase
      .from("profiles")
      .select("symbolic_profile_json")
      .eq("user_id", userId)
      .maybeSingle()

    const starterInsight = profile?.symbolic_profile_json?.onboarding?.starter_daily_read

    if (typeof starterInsight === "string" && starterInsight.trim()) {
      return NextResponse.json({ insight: starterInsight })
    }
  }

  const insight = generateDailyInsight()

  return NextResponse.json({ insight })
}
