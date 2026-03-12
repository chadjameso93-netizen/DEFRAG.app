import type { ReactNode } from "react"
import Link from "next/link"
import BrandGradient from "@/components/brand/BrandGradient"
import Surface from "@/components/ui/Surface"

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-2xl px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
      {label}
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
    <main className="relative min-h-screen overflow-hidden bg-[#f5f7fb] text-zinc-950">
      <BrandGradient />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 p-4 xl:grid-cols-[290px_1fr] xl:p-6">
        <Surface className="p-6 xl:p-8">
          <div className="mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Defrag</p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">Relational intelligence</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Understand patterns in relationships, families, and teams.</p>
          </div>

          <nav className="grid gap-2">
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/relationships" label="Relationships" />
            <NavItem href="/timeline" label="Timeline" />
            <NavItem href="/simulations" label="Simulations" />
            <NavItem href="/pricing" label="Pricing" />
            <NavItem href="/settings" label="Settings" />
          </nav>
        </Surface>

        <div className="space-y-6">
          <Surface className="p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Defrag Workspace</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">{title}</h2>
            {subtitle ? <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">{subtitle}</p> : null}
          </Surface>
          {children}
        </div>
      </div>
    </main>
  )
}
