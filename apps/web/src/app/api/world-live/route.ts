import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser";

export async function GET() {
  const userId = await getOptionalAuthenticatedUserId();

  if (!userId) {
    return NextResponse.json({ world: null });
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("workbench_runs")
    .select("state_json")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  const state = data?.[0]?.state_json;

  return NextResponse.json({ world: state?.bowenField ?? null });
}
