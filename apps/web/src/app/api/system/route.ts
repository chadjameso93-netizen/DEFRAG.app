import { NextResponse } from "next/server"
import { generateDailyInsight } from "@/lib/engine/dailyInsight"

export async function GET(){

  const insight=generateDailyInsight()

  return NextResponse.json({insight})

}
