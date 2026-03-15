export default function PricingCard({ name, price, description, features, featured = false }: { name: string; price: string; description: string; features: string[]; featured?: boolean }) {
  return (
    <div className={`bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-6 ${featured ? "border-[#1F1F1F] bg-[#161616]" : ""}`}>
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#555555]">{name}</p>
      <p className="mt-4 text-4xl font-semibold tracking-tight text-[#EAEAEA]">{price}</p>
      <p className="mt-3 text-sm leading-6 text-[#9A9A9A]">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-[#9A9A9A]">
        {features.map((feature) => <li key={feature}>• {feature}</li>)}
      </ul>
      <a href="/signup" className={`mt-8 inline-block rounded-2xl px-5 py-3 text-sm font-medium transition-colors duration-300 ${featured ? "bg-[#EAEAEA] text-[#000000] hover:shadow-none" : "bg-[#161616] text-[#EAEAEA] hover:bg-[#0A0A0A]"}`}>Get started</a>
    </div>
  )
}
