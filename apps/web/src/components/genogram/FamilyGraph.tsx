"use client"

export default function FamilyGraph() {
  return (
    <div className="grid h-full place-items-center rounded-2xl bg-[linear-gradient(180deg,#fafafa,#f4f4f5)] p-6">
      <div className="grid w-full max-w-2xl gap-10">
        <div className="flex items-center justify-center gap-20">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent A</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Parent B</div>
        </div>
        <div className="mx-auto h-8 w-px bg-zinc-300" />
        <div className="flex items-center justify-center gap-12">
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">You</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Sibling</div>
          <div className="rounded-2xl border border-zinc-300 bg-white px-6 py-4 text-sm shadow-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
