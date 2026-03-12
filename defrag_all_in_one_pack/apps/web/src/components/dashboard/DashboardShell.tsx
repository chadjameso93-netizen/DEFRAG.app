
"use client"

import DailyInsightPlayer from "@/components/audio/DailyInsightPlayer"
import BowenMapCanvas from "@/components/map/BowenMapCanvas"
import UserTimeline from "@/components/timeline/UserTimeline"
import AppNavigation from "@/components/navigation/AppNavigation"

export default function DashboardShell(){

  return (
    <div className="min-h-screen bg-black text-white">

      <AppNavigation/>

      <div className="max-w-6xl mx-auto p-6 space-y-10">

        <DailyInsightPlayer/>

        <div className="h-[520px] border border-white/10 rounded-xl">
          <BowenMapCanvas/>
        </div>

        <UserTimeline/>

      </div>

    </div>
  )
}
