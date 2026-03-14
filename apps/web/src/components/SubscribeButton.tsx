"use client"

export default function SubscribeButton() {
  const handleCheckout = () => {
    window.location.href = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT!
  }

  return (
    <button
      onClick={handleCheckout}
      className="mt-6 rounded-xl bg-[var(--text-primary)] text-[var(--surface-0)] shadow-[0_0_20px_rgba(245,245,240,0.04)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,245,240,0.08)] px-6 py-3"
    >
      Start Subscription
    </button>
  )
}
