import { NextResponse } from "next/server";
import { createMockWorkbench } from "@/lib/workbench/mock-state";

export async function GET() {
  const state = createMockWorkbench();
  return NextResponse.json(state);
}

export async function POST(req: Request) {
  const body = await req.json();
  const state = createMockWorkbench();

  if (body?.message) {
    state.currentSynthesis.forUser.whatMayBeHappening = [
      "You are trying to resolve something directly",
    ];
    state.currentSynthesis.timing.summary =
      "The timing may be sensitive; a softer entry could help";
  }

  return NextResponse.json(state);
}
