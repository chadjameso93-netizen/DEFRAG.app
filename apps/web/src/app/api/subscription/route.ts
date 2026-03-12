import { NextResponse } from "next/server"
import { getSubscription } from "@/lib/data/mockDb"

export async function GET() {
  return NextResponse.json(getSubscription())
}
