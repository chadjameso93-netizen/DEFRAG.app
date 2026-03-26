import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const base = body.message || "";

  return NextResponse.json({
    options: [
      {
        label: "Direct",
        text: base,
        expectedOutcome: "higher friction",
      },
      {
        label: "Soft entry",
        text: "Hey, I wanted to check in about something—when you have a sec",
        expectedOutcome: "more openness",
      },
      {
        label: "Delay",
        text: "No message yet—wait for lower pressure window",
        expectedOutcome: "reduced escalation risk",
      },
    ],
  });
}
