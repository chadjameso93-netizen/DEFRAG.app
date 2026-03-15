import type { ReactNode } from "react"
import Link from "next/link"

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
    <main className="relative flex min-h-screen bg-[#000000]">
      <div className="pointer-events-none absolute inset-0 bg-[#000000]" />
      {/* Left info panel */}
      <div className="relative hidden flex-1 flex-col justify-center border-r border-[#1F1F1F] bg-[#000000] px-12 lg:flex xl:px-20 z-10">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#555555]">
          Defrag
        </Link>

        <h1 className="mt-6 max-w-lg text-3xl font-semibold tracking-tight text-[#EAEAEA]">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#9A9A9A]">{body}</p>

        <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-[24px]">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#555555]">Clear insight</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#9A9A9A]">Understand patterns before they become larger problems.</p>
          </div>
          <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] p-[24px]">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[#555555]">Healthy outcomes</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#9A9A9A]">Guidance designed to reduce stigma and improve communication.</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[480px] lg:shrink-0 z-10 bg-[#000000]">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#555555] lg:hidden">
            Defrag
          </Link>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[#555555] lg:mt-0">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-[13px] text-[#555555]">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-[#9A9A9A] transition-colors hover:text-[#EAEAEA]">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
