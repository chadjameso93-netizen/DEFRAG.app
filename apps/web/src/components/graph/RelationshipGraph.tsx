"use client"
export default function RelationshipGraph() {
  return (
    <div className="grid h-full place-items-center rounded-2xl bg-[linear-gradient(180deg,#fafafa,#f4f4f5)] p-6">
      <div className="relative h-full w-full max-w-[560px]">
        <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">You</div>
        <div className="absolute left-10 top-40 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Partner</div>
        <div className="absolute right-10 top-40 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Parent</div>
        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">Sibling</div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 360" fill="none">
          <path d="M280 55 C 180 95, 130 150, 95 195" stroke="#a1a1aa" strokeWidth="2" />
          <path d="M280 55 C 380 95, 430 150, 465 195" stroke="#a1a1aa" strokeWidth="2" />
          <path d="M280 55 C 280 150, 280 230, 280 305" stroke="#a1a1aa" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}
