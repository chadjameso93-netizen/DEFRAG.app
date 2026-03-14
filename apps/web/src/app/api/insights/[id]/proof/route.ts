import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAuthenticatedUserId } from "@/lib/auth/routeUser"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userId = await requireAuthenticatedUserId()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("insight_runs")
    .select("id, proof_json, model, tokens_in, tokens_out, cost_usd, created_at")
    .eq("id", id)
    .eq("user_id", userId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Insight not found" }, { status: 404 })
  }

  return NextResponse.json({ proof: data.proof_json, meta: { model: data.model, tokens_in: data.tokens_in, tokens_out: data.tokens_out, cost_usd: data.cost_usd, created_at: data.created_at } })
}
