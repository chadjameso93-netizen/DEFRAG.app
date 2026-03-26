import { NextResponse } from "next/server";
import { createMockWorkbench } from "@/lib/workbench/mock-state";

export async function GET() {
  const state = createMockWorkbench();
  return NextResponse.json({ world: state.bowenField });
}
