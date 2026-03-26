import { NextResponse } from "next/server";
import { runInsightPipeline } from "@/lib/ai/pipeline";
import { createClient } from "@/lib/supabase/server";
import { getOptionalAuthenticatedUserId } from "@/lib/auth/routeUser";
import { buildWorkbenchFromPipeline } from "@/lib/workbench/transform-pipeline";

export async function POST(req: Request) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const result = await runInsightPipeline({ message });
  const state = buildWorkbenchFromPipeline({
    message,
    proof: result.proof_json,
  });

  const userId = await getOptionalAuthenticatedUserId();

  if (userId) {
    const supabase = await createClient();

    await supabase.from("workbench_runs").insert({
      user_id: userId,
      prompt_text: message,
      state_json: state,
    });
  }

  return NextResponse.json(state);
}

export async function GET() {
  const userId = await getOptionalAuthenticatedUserId();

  if (!userId) {
    return NextResponse.json({ state: null });
  }

  const supabase = await createClient();

  const { data } = await supabase
    .from("workbench_runs")
    .select("state_json")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  return NextResponse.json(data?.[0]?.state_json ?? null);
}
