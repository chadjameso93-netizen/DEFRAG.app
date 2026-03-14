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
    <main className="flex min-h-screen bg-[var(--surface-0)]">
      {/* Left info panel */}
      <div className="hidden flex-1 flex-col justify-center border-r border-[var(--border-subtle)] px-12 lg:flex xl:px-20">
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
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[480px] lg:shrink-0">
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
