"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { Home, Users, Activity, Sparkles } from "lucide-react"

export default function AppShell({
  children,
  title,
  subtitle
}: {
  children: ReactNode
  title?: string
  subtitle?: string
}) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight">
            Defrag
          </Link>

          <nav className="flex gap-6 text-sm text-zinc-600">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/relationships">Relationships</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/simulations">Simulations</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {title && (
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-zinc-600 mt-2 text-sm">{subtitle}</p>
            )}
          </div>
        )}

        {children}
      </main>
    </div>
  )
}
