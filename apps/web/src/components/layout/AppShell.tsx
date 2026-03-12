import type { ReactNode } from "react"
import Link from "next/link"

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950">
      <span>{label}</span>
    </Link>
  )
}

export default function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 xl:grid-cols-[280px_1fr]">
        <aside className="border-r border-zinc-200 bg-white/90 px-6 py-8">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Defrag</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">Relational intelligence</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Understand patterns in relationships, families, and teams.</p>
          </div>
          <nav className="space-y-2">
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/relationships" label="Relationships" />
            <NavItem href="/timeline" label="Timeline" />
            <NavItem href="/simulations" label="Simulations" />
            <NavItem href="/pricing" label="Pricing" />
            <NavItem href="/settings" label="Settings" />
          </nav>
          <div className="mt-10 rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">Today</p>
            <p className="mt-3 text-sm leading-6 text-zinc-700">Calm pacing and short clarifications are more likely to help than urgency.</p>
          </div>
        </aside>
        <section className="px-6 py-8 md:px-8 xl:px-10">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Defrag Workspace</p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">{subtitle}</p> : null}
          </div>
          {children}
        </section>
      </div>
    </main>
  )
}
