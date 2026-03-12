import Link from "next/link"

export default function GlowButton({
  href,
  label,
  inverted = false,
}: {
  href: string
  label: string
  inverted?: boolean
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition duration-300",
        inverted
          ? "border border-white/10 bg-white/5 text-white hover:bg-white/10"
          : "bg-white text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_30px_rgba(255,255,255,0.08)] hover:bg-zinc-100"
      ].join(" ")}
    >
      {label}
    </Link>
  )
}
