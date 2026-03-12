"use client"

export default function FamilyGraph() {
  return (
    <div className="rounded-[26px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-10 sm:gap-20">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent A</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent B</div>
        </div>

        <div className="mx-auto h-8 w-px bg-zinc-300" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">You</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Sibling</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
