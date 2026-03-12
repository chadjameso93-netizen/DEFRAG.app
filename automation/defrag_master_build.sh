#!/usr/bin/env bash
set -e

echo "Starting Defrag full build..."

cd apps/web

echo "Installing dependencies..."
npm install @supabase/supabase-js stripe lucide-react recharts zustand framer-motion

mkdir -p src/lib
mkdir -p src/lib/supabase
mkdir -p src/lib/stripe
mkdir -p src/lib/engine
mkdir -p src/app/api/auth
mkdir -p src/app/api/billing

cat > src/lib/supabase/client.ts <<'TS'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
TS

cat > src/lib/engine/relationalEngine.ts <<'TS'
export function generateInsight(message: string) {
  if (!message) return "Describe a situation for analysis."

  const m = message.toLowerCase()

  if (m.includes("conflict"))
    return "Signals show elevated tension. A slower response may improve outcomes."

  if (m.includes("family"))
    return "Family systems often repeat patterns. Small shifts can interrupt the loop."

  if (m.includes("work"))
    return "Hierarchy pressure detected. Clear boundaries may reduce tension."

  return "System state suggests increased relational sensitivity today."
}
TS

mkdir -p src/app/api/insight

cat > src/app/api/insight/route.ts <<'TS'
import { NextResponse } from "next/server"
import { generateInsight } from "@/lib/engine/relationalEngine"

export async function POST(req: Request) {
  const body = await req.json()
  const insight = generateInsight(body.message)

  return NextResponse.json({ insight })
}
TS

mkdir -p src/app/api/simulate

cat > src/app/api/simulate/route.ts <<'TS'
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  return NextResponse.json({
    outcome: "Simulation indicates calm clarification has highest success probability.",
    probability: 0.63,
    scenario: body
  })
}
TS

echo "Creating missing UI pages..."

mkdir -p src/app/relationships
mkdir -p src/app/timeline
mkdir -p src/app/simulations

cat > src/app/relationships/page.tsx <<'TSX'
export default function RelationshipsPage() {
  return (
    <div style={{padding:40}}>
      <h1>Relationships</h1>
      <p>Relationship system mapping will appear here.</p>
    </div>
  )
}
TSX

cat > src/app/timeline/page.tsx <<'TSX'
export default function TimelinePage() {
  return (
    <div style={{padding:40}}>
      <h1>Timeline</h1>
      <p>Temporal relational events will appear here.</p>
    </div>
  )
}
TSX

cat > src/app/simulations/page.tsx <<'TSX'
export default function SimulationsPage() {
  return (
    <div style={{padding:40}}>
      <h1>Simulations</h1>
      <p>Conversation simulation engine will appear here.</p>
    </div>
  )
}
TSX

echo "Restarting dev server..."

pkill -f "next dev" || true
rm -rf .next

npm run dev

echo "Defrag master build completed."
