export default function PricingCard({ name, price, description, features, featured = false }: { name: string; price: string; description: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`rounded-3xl border p-6 shadow-sm ${featured ? "border-zinc-900 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-950"}`}>
      <p className={`text-sm font-medium uppercase tracking-[0.2em] ${featured ? "text-zinc-300" : "text-zinc-500"}`}>{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
      <p className={`mt-3 text-sm leading-6 ${featured ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>
      <ul className={`mt-6 space-y-3 text-sm ${featured ? "text-zinc-200" : "text-zinc-700"}`}>
        {features.map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      <a href="/signup" className={`mt-8 inline-block rounded-2xl px-5 py-3 text-sm font-medium transition ${featured ? "bg-white text-zinc-950 hover:bg-zinc-100" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}>Get started</a>
    </div>
  )
}
