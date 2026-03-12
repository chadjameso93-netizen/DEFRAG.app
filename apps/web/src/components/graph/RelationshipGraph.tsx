"use client"

export default function RelationshipGraph() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-[26px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#f5f7fb)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 340" fill="none">
        <path d="M450 70 C 340 130, 245 165, 180 235" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M450 70 C 560 130, 655 165, 720 235" stroke="#a1a1aa" strokeWidth="2" />
        <path d="M450 70 C 450 130, 450 180, 450 260" stroke="#a1a1aa" strokeWidth="2" />
      </svg>

      <div className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-medium shadow-sm">
        You
      </div>
      <div className="absolute left-12 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Partner
      </div>
      <div className="absolute right-12 top-44 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Parent
      </div>
      <div className="absolute left-1/2 bottom-10 -translate-x-1/2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm shadow-sm">
        Sibling
      </div>
    </div>
  )
}
