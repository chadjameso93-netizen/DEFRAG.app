import type { ReactNode } from "react"
import Link from "next/link"
import BrandMesh from "@/components/brand/BrandMesh"
import PremiumPanel from "@/components/ui/PremiumPanel"

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
    <main className="relative min-h-screen overflow-hidden bg-[#09090b] px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <PremiumPanel className="p-7 sm:p-10 lg:p-12">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/45">
            Defrag
          </Link>

          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">{body}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Clear insight</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Understand patterns before they become larger problems.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-white/40">Healthy outcomes</p>
              <p className="mt-2 text-sm leading-6 text-white/65">Guidance is designed to reduce stigma and improve communication.</p>
            </div>
          </div>
        </PremiumPanel>

        <PremiumPanel className="mx-auto w-full max-w-md p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-sm text-white/55">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-white underline-offset-4 hover:underline">
              {footerLinkLabel}
            </Link>
          </p>
        </PremiumPanel>
      </div>
    </main>
  )
}
