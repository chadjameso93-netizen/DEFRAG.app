"use client"

import { useSession } from "@/hooks/useSession"
import SubscribeButton from "@/components/SubscribeButton"

export default function Dashboard() {

  const session = useSession()

  if (!session) {
    return (
      <main className="p-12">
        <h1 className="text-3xl font-semibold">Access Required</h1>
        <p className="mt-4 text-zinc-500">
          Please log in or start a subscription to access your dashboard.
        </p>
        <SubscribeButton/>
      </main>
    )
  }

  return (
    <main className="p-10">

      <h1 className="text-3xl font-semibold">Defrag Dashboard</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <div className="rounded-xl border p-6">
          <h2 className="font-medium">Daily Insight</h2>
          <p className="mt-2 text-zinc-600">
            Communication dynamics appear sensitive today. 
            Consider approaching conversations with clarity and patience.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="font-medium">Relationship Map</h2>
          <div className="h-56 rounded-lg bg-zinc-100 mt-4"/>
        </div>

      </div>

    </main>
  )
}
