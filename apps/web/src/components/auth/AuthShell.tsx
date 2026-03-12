import type { ReactNode } from "react"
import Link from "next/link"
import BrandBackground from "@/components/brand/BrandBackground"
import GlassPanel from "@/components/ui/GlassPanel"

export default function AuthShell({
  eyebrow,
  title,
  body,
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: {
  eyebrow: string
  title: string
  body: string
  children: ReactNode
  footerText: string
  footerLinkLabel: string
  footerLinkHref: string
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandBackground />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <GlassPanel className="p-7 sm:p-10">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-500">
            Defrag
          </Link>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Clear insight</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Understand patterns before they become larger problems.</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Healthy outcomes</p>
              <p className="mt-2 text-sm leading-6 text-zinc-700">Guidance is designed to reduce stigma and improve communication.</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="mx-auto w-full max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-sm text-zinc-600">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-zinc-950 underline-offset-4 hover:underline">
              {footerLinkLabel}
            </Link>
          </p>
        </GlassPanel>
      </div>
    </main>
  )
}
