"use client"

export default function SubscribeButton() {
  const handleCheckout = () => {
    window.location.href = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT!
  }

  return (
    <button
      onClick={handleCheckout}
      className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
    >
      Start Subscription
    </button>
  )
}
