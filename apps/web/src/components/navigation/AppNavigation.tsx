"use client"
export default function AppNavigation(){

  return (
    <div className="border-b border-[#1F1F1F] p-4 flex justify-between">

      <div className="font-semibold">
        DEFRAG
      </div>

      <div className="flex gap-6 text-sm text-[#9A9A9A]">

        <a href="/dashboard">Dashboard</a>
        <a href="/ai">AI</a>
        <a href="/pricing">Pricing</a>

      </div>

    </div>
  )
}
