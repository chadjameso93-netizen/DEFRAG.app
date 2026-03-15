"use client"
export default function FamilyGraph() {
  return (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-[26px] p-6">
      <div className="grid gap-10">
        <div className="flex items-center justify-center gap-10 sm:gap-20">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-2xl px-6 py-4 text-sm">Parent A</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-2xl px-6 py-4 text-sm">Parent B</div>
        </div>

        <div className="mx-auto h-8 w-px bg-[#1F1F1F]" />

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-2xl px-6 py-4 text-sm">You</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-2xl px-6 py-4 text-sm">Sibling</div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] rounded-2xl px-6 py-4 text-sm">Relative</div>
        </div>
      </div>
    </div>
  )
}
