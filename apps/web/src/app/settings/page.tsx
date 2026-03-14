"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import { User, CreditCard, Shield, AlertTriangle, Eye, LogOut } from "lucide-react"
import type { Profile, Entitlement } from "@/lib/types"
import { PLAN_LIMITS } from "@/lib/types"

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-zinc-500" />
      <h2 className="text-sm font-semibold text-zinc-100">{title}</h2>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [entitlement, setEntitlement] = useState<Entitlement | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [symbolicView, setSymbolicView] = useState(false)

  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    time_confidence: "unknown" as "exact" | "approximate" | "unknown",
  })

  const loadData = useCallback(async () => {
    try {
      const [profileRes, subRes] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/subscription"),
      ])
      if (profileRes.ok) {
        const d = await profileRes.json()
        if (d.profile) {
          setProfile(d.profile)
          setFormData({
            full_name: d.profile.full_name || "",
            birth_date: d.profile.birth_date || "",
            birth_time: d.profile.birth_time || "",
            birth_place: d.profile.birth_place || "",
            time_confidence: d.profile.time_confidence || "unknown",
          })
        }
      }
      if (subRes.ok) {
        const d = await subRes.json()
        setEntitlement(d.entitlement ?? d ?? null)
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        const d = await res.json()
        setProfile(d.profile)
      }
    } finally {
      setSaving(false)
    }
  }

  async function openBillingPortal() {
    setPortalLoading(true)
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } finally {
      setPortalLoading(false)
    }
  }

  async function handleSignOut() {
    const { createBrowserClient } = await import("@supabase/ssr")
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const plan = entitlement?.plan ?? "free"
  const limits = PLAN_LIMITS[plan]

  if (loading) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-48" />
          <div className="skeleton h-36" />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50">Settings</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage your account, billing, and preferences.</p>
        </div>

        {/* Profile Section */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <SectionHeader icon={User} title="Profile" />
          <form onSubmit={handleSaveProfile} className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Full name</label>
                <input
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Birth date</label>
                <input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Birth time</label>
                <input
                  type="time"
                  value={formData.birth_time}
                  onChange={(e) => setFormData({ ...formData, birth_time: e.target.value })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
                />
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Birth place</label>
                <input
                  value={formData.birth_place}
                  onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                  placeholder="City, Country"
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-zinc-500">Time confidence</label>
              <select
                value={formData.time_confidence}
                onChange={(e) => setFormData({ ...formData, time_confidence: e.target.value as "exact" | "approximate" | "unknown" })}
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600 sm:w-auto"
              >
                <option value="exact">Exact</option>
                <option value="approximate">Approximate</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-zinc-50 px-4 py-1.5 text-[13px] font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </section>

        {/* Plan & Billing */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <SectionHeader icon={CreditCard} title="Plan & Billing" />
          <div className="mt-4">
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-semibold capitalize text-zinc-50">{plan}</span>
              <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                {entitlement?.status ?? "active"}
              </span>
            </div>
            <div className="mt-3 grid gap-2 text-[13px] text-zinc-400 sm:grid-cols-3">
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Relationships</p>
                <p className="mt-1 text-zinc-200">{limits.relationships} max</p>
              </div>
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Insights / month</p>
                <p className="mt-1 text-zinc-200">
                  {entitlement?.insights_used_this_month ?? 0} / {limits.insights_per_month}
                </p>
              </div>
              <div className="rounded-md border border-zinc-800 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Features</p>
                <p className="mt-1 text-zinc-200">
                  {limits.simulations ? "Simulations, " : ""}
                  {limits.deep_dives ? "Deep dives" : "Basic"}
                </p>
              </div>
            </div>
            <button
              onClick={openBillingPortal}
              disabled={portalLoading}
              className="mt-4 rounded-md border border-zinc-700 px-4 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:bg-zinc-800 disabled:opacity-50"
            >
              {portalLoading ? "Opening..." : "Manage billing"}
            </button>
          </div>
        </section>

        {/* Privacy */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <SectionHeader icon={Shield} title="Privacy" />
          <div className="mt-4 space-y-2">
            {[
              "Your data is encrypted at rest",
              "No third-party data sharing",
              "Export or delete your data anytime",
              "Row-level security on all tables",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[13px] text-zinc-400">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Advanced */}
        <section className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <SectionHeader icon={Eye} title="Advanced" />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[13px] font-medium text-zinc-200">Symbolic view</p>
              <p className="text-[12px] text-zinc-500">Show symbolic data alongside relational intelligence</p>
            </div>
            <button
              onClick={() => setSymbolicView(!symbolicView)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                symbolicView ? "bg-zinc-50" : "bg-zinc-700"
              }`}
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full transition-transform ${
                symbolicView ? "translate-x-5 bg-zinc-900" : "translate-x-0.5 bg-zinc-400"
              }`} />
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="rounded-lg border border-red-500/20 bg-zinc-900 p-5">
          <SectionHeader icon={AlertTriangle} title="Danger zone" />
          <p className="mt-2 text-[13px] text-zinc-500">Permanent actions that affect your account and all stored data.</p>
          <div className="mt-4 space-y-3">
            {!deleteConfirm ? (
              <button
                onClick={() => setDeleteConfirm(true)}
                className="rounded-md border border-red-500/20 bg-red-500/5 px-4 py-1.5 text-[13px] font-medium text-red-400 transition-colors hover:bg-red-500/10"
              >
                Delete account
              </button>
            ) : (
              <div className="rounded-md border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-[13px] font-medium text-red-400">Are you sure? This cannot be undone.</p>
                <p className="mt-1 text-[12px] text-zinc-500">All your relationships, events, insights, and profile data will be permanently deleted.</p>
                <div className="mt-3 flex gap-2">
                  <button
                    className="rounded-md bg-red-500 px-4 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Yes, delete everything
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="rounded-md px-4 py-1.5 text-[13px] text-zinc-400 transition-colors hover:text-zinc-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Sign Out */}
        <section className="pb-8">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-800 px-4 py-2 text-[13px] font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-200"
          >
            <LogOut size={14} /> Sign out
          </button>
        </section>
      </div>
    </AppShell>
  )
}
