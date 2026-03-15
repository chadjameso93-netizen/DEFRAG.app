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
    <main className="relative flex min-h-screen bg-[var(--surface-0)]">
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[44rem] w-[44rem] rounded-full bg-violet-500/[0.12] blur-3xl" />
        <div className="absolute right-[-6%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-sky-500/[0.10] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[18%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.10] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.38),rgba(5,5,5,0.52))]" />
      </div>
      {/* Left info panel */}
      <div className="relative hidden flex-1 flex-col justify-center border-r border-[var(--border-subtle)] px-12 lg:flex xl:px-20">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Defrag
        </Link>

        <h1 className="mt-6 max-w-lg text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">{body}</p>

        <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
          <div className="glass-surface-light p-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Clear insight</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">Understand patterns before they become larger problems.</p>
          </div>
          <div className="glass-surface-light p-4">
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Healthy outcomes</p>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">Guidance designed to reduce stigma and improve communication.</p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[480px] lg:shrink-0">
        <div className="w-full max-w-sm">
          <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] lg:hidden">
            Defrag
          </Link>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] lg:mt-0">{eyebrow}</p>
          <div className="mt-5">{children}</div>
          <p className="mt-6 text-[13px] text-[var(--text-muted)]">
            {footerText}{" "}
            <Link href={footerLinkHref} className="font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
