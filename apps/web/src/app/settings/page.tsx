"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import AppShell from "@/components/layout/AppShell"
import { User, CreditCard, Shield, AlertTriangle, Eye, LogOut } from "lucide-react"
import type { Profile, Entitlement } from "@/lib/types"
import { PLAN_LIMITS } from "@/lib/types"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Icon size={14} className="text-[#4F6BFF]" />
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555555]">{title}</h2>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const [, setProfile] = useState<Profile | null>(null)
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
        <div className="space-y-12">
          <div className="flex flex-col gap-2">
            <div className="skeleton h-10 w-48" />
            <div className="skeleton h-4 w-64" />
          </div>
          <div className="skeleton h-96" />
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="animate-[page-enter_0.5s_ease_both] space-y-12 max-w-[1000px] mx-auto pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">System Config</h1>
          <p className="text-[15px] text-[#9A9A9A] font-light">Manage your operational parameters and access level.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-8">
            {/* Profile Section */}
            <Panel className="p-8">
              <SectionHeader icon={User} title="Core Identity" />
              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Full Name</label>
                    <input
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Primary Origin</label>
                    <input
                      value={formData.birth_place}
                      onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                      placeholder="City, Country"
                      className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Origin Date</label>
                    <input
                      type="date"
                      value={formData.birth_date}
                      onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                      className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Origin Clock</label>
                    <input
                      type="time"
                      value={formData.birth_time}
                      onChange={(e) => setFormData({ ...formData, birth_time: e.target.value })}
                      className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-[#555555]">Temporal Confidence</label>
                  <select
                    value={formData.time_confidence}
                    onChange={(e) => setFormData({ ...formData, time_confidence: e.target.value as "exact" | "approximate" | "unknown" })}
                    className="bg-[#000000] border border-[#1F1F1F] rounded-[12px] p-4 focus:border-[#4F6BFF] focus:outline-none transition-all text-[#EAEAEA] text-[15px] font-light appearance-none sm:w-[200px]"
                  >
                    <option value="exact">Exact</option>
                    <option value="approximate">Approximate</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="px-8 h-12"
                  >
                    {saving ? "Updating..." : "Update Identity"}
                  </Button>
                </div>
              </form>
            </Panel>

            {/* Advanced */}
            <Panel className="p-8">
              <SectionHeader icon={Eye} title="Operational Modes" />
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[15px] font-medium text-[#EAEAEA]">Symbolic Engine</p>
                  <p className="text-[13px] text-[#555555] font-light">Layer raw interaction data with symbolic/archetypal intelligence.</p>
                </div>
                <button
                  onClick={() => setSymbolicView(!symbolicView)}
                  className={`relative h-6 w-11 rounded-full transition-all duration-500 ${
                    symbolicView ? "bg-[#EAEAEA]" : "bg-[#111]"
                  }`}
                >
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full transition-all duration-500 ${
                    symbolicView ? "translate-x-5 bg-[#000]" : "translate-x-0.5 bg-[#333]"
                  }`} />
                </button>
              </div>
            </Panel>
          </div>

          <div className="flex flex-col gap-8">
            {/* Plan & Billing */}
            <Panel className="p-8">
              <SectionHeader icon={CreditCard} title="Operational Access" />
              <div className="flex flex-col gap-8">
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-semibold capitalize text-[#EAEAEA] tracking-tight">{plan}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#1F1F1F] text-[#555]">
                    {entitlement?.status ?? "active"}
                  </span>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border border-[#111] rounded-[16px] bg-[#050505]">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#555]">System Map</span>
                    <span className="text-[14px] text-[#EAEAEA] font-mono">{limits.relationships} Nodes</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[#111] rounded-[16px] bg-[#050505]">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#555]">Insights</span>
                    <span className="text-[14px] text-[#EAEAEA] font-mono">
                      {entitlement?.insights_used_this_month ?? 0} / {limits.insights_per_month}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-[#111] rounded-[16px] bg-[#050505]">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#555]">Engine</span>
                    <span className="text-[14px] text-[#EAEAEA] font-mono">{limits.deep_dives ? "Complex" : "Base"}</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={openBillingPortal}
                  disabled={portalLoading}
                  className="w-full h-12"
                >
                  {portalLoading ? "Connecting..." : "Manage Subscription"}
                </Button>
              </div>
            </Panel>

            {/* Privacy */}
            <Panel className="p-8">
              <SectionHeader icon={Shield} title="Security Protocol" />
              <div className="flex flex-col gap-4">
                {[
                  "Military-grade encryption at rest",
                  "Zero third-party data extraction",
                  "Absolute data sovereignty",
                  "Hardware-isolated database instances",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 text-[13px] text-[#9A9A9A] font-light">
                    <div className="h-1 w-1 rounded-full bg-[#333]" />
                    {item}
                  </div>
                ))}
              </div>
            </Panel>

            {/* Danger Zone */}
            <div className="rounded-[24px] border border-red-500/10 bg-red-500/[0.02] p-8 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                 <AlertTriangle size={14} className="text-red-500/50" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">Critical Danger Zone</span>
              </div>
              <p className="text-[13px] text-[#555555] font-light leading-relaxed">Permanent deletion of your core identity and all relational artifacts. This action cannot be reversed.</p>
              
              {!deleteConfirm ? (
                <Button
                  variant="ghost"
                  onClick={() => setDeleteConfirm(true)}
                  className="w-full text-red-500/70 hover:text-red-500 hover:bg-red-500/10 border-red-500/10"
                >
                  Initiate Account Deletion
                </Button>
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-[13px] font-bold text-red-500 uppercase tracking-widest text-center">Confirm Destructive Action?</p>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-red-500 hover:bg-red-600 text-[#EAEAEA]"
                    >
                      Delete Everything
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setDeleteConfirm(false)}
                      className="flex-1"
                    >
                      Abort
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sign Out */}
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full h-12 border-[#111]"
            >
              <LogOut size={16} /> Terminate Session
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
