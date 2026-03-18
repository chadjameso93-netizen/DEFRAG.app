import AppShell from "@/components/layout/AppShell"
import DailyReadPanel from "@/components/dashboard/DailyReadPanel"

export default function DailyReadPage() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">Daily Read</h1>
          <p className="text-[15px] font-light text-[#9A9A9A]">
            A grounded read on what this looks like today, what to do next, and what to avoid.
          </p>
        </div>
        <DailyReadPanel />
      </div>
    </AppShell>
  )
}
