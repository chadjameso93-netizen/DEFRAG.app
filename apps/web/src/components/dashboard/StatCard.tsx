import { Panel } from "@/components/ui/Panel";

export default function StatCard({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  return (
    <Panel className="p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EAEAEA]/40">{label}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#EAEAEA]">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[#9A9A9A]">{note}</p>
    </Panel>
  )
}
