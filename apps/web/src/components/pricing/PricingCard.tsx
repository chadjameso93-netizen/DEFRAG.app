export default function PricingCard({ name, price, description, features, featured = false }: { name: string; price: string; description: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`glass-surface-light p-6 ${featured ? "border-[var(--border)] bg-[var(--surface-2)]" : ""}`}>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--text-primary)]">{price}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
        {features.map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      <a href="/signup" className={`mt-8 inline-block rounded-2xl px-5 py-3 text-sm font-medium transition-colors duration-300 ${featured ? "bg-[var(--text-primary)] text-[var(--surface-0)] hover:shadow-[0_0_30px_rgba(245,245,240,0.08)]" : "bg-[var(--surface-2)] text-[var(--text-primary)] hover:bg-[var(--surface-1)]"}`}>Get started</a>
    </div>
  )
}
