"use client"

export default function FamilyGraph() {
  return (
    <div className="glass-surface-light rounded-[26px] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-10 sm:gap-20">
          <div className="glass-surface-light rounded-2xl px-6 py-4 text-sm">Parent A</div>
          <div className="glass-surface-light rounded-2xl px-6 py-4 text-sm">Parent B</div>
        </div>

        <div className="mx-auto h-8 w-px bg-white/[0.06]" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="glass-surface-light rounded-2xl px-6 py-4 text-sm">You</div>
          <div className="glass-surface-light rounded-2xl px-6 py-4 text-sm">Sibling</div>
          <div className="glass-surface-light rounded-2xl px-6 py-4 text-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
