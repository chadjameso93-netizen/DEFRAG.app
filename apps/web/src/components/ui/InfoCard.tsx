import PremiumPanel from "@/components/ui/PremiumPanel"

export default function InfoCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <PremiumPanel className="p-5 sm:p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{eyebrow}</p>
      <h3 className="mt-4 text-lg font-medium text-[var(--text-primary)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
    </PremiumPanel>
  )
}
