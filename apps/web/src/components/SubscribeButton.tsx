"use client"
export default function SubscribeButton() {
  const handleCheckout = () => {
    window.location.href = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT!
  }

  return (
    <button
      onClick={handleCheckout}
      className="mt-6 rounded-xl bg-[#EAEAEA] text-[#000000] shadow-none transition-all duration-300 hover:shadow-none px-6 py-3"
    >
      Start Subscription
    </button>
  )
}
