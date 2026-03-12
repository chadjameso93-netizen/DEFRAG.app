
"use client"

export default function PricingPage(){

  return (
    <div className="min-h-screen bg-black text-white p-12">

      <h1 className="text-3xl mb-10">
        Pricing
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="border border-white/10 rounded-xl p-6">
          <h2 className="text-xl">Free</h2>
          <p className="text-white/60">Limited access</p>
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <h2 className="text-xl">Core</h2>
          <p className="text-white/60">$24 / month</p>
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <h2 className="text-xl">Developer API</h2>
          <p className="text-white/60">Contact</p>
        </div>

      </div>

    </div>
  )
}
