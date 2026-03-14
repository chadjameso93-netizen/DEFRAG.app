"use client"

import Link from "next/link"
import { ArrowRight, BrainCircuit, Clock3, Network, ShieldCheck, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import BrandMesh from "@/components/brand/BrandMesh"
import GlowCard from "@/components/ui/GlowCard"
import FadeIn from "@/components/ui/FadeIn"
import PremiumFooter from "@/components/marketing/PremiumFooter"

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-0)]/40 px-4 py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-[var(--text-primary)]">{value}</p>
    </div>
  )
}

function Feature({
  icon,
  title,
  body,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  body: string
  delay?: number
}) {
  return (
    <FadeIn delay={delay}>
      <GlowCard className="p-6">
        <div className="inline-flex rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-3 text-[var(--text-primary)]">
          {icon}
        </div>
        <h3 className="mt-5 text-lg font-medium text-[var(--text-primary)]">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
      </GlowCard>
    </FadeIn>
  )
}

export default function HeroLanding() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--surface-0)] px-3 py-3 text-[var(--text-primary)] sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <BrandMesh />

      <div className="relative mx-auto max-w-7xl space-y-4 lg:space-y-6">
        <GlowCard className="p-4 sm:p-6 lg:p-8">
          <div className="rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,var(--surface-1),var(--surface-0))] px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="inline-flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]"
                >
                  Defrag Platform
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[4.5rem] lg:leading-[0.98]"
                >
                  Understand the relationship system before the next move.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-6 max-w-2xl font-serif-accent text-base leading-8 text-[var(--text-secondary)] sm:text-lg"
                >
                  Defrag helps you map people, track meaningful events, compare possible responses, and receive practical guidance before important conversations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                    <Link
                      href="/signup"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--text-primary)] px-6 py-3 text-sm font-medium text-[var(--surface-0)] shadow-[0_0_30px_rgba(245,245,240,0.06)] transition-shadow duration-400 hover:shadow-[0_0_40px_rgba(245,245,240,0.1)]"
                    >
                      Start free trial
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--surface-2)]"
                    >
                      View dashboard
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="mt-8 grid gap-3 sm:grid-cols-3"
                >
                  <Metric label="Map" value="Relationships" />
                  <Metric label="Track" value="Timeline" />
                  <Metric label="Prepare" value="Simulations" />
                </motion.div>
              </div>

              <FadeIn delay={0.3}>
                <GlowCard className="p-5 sm:p-6">
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">Relationship map</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">See who is involved and where the strongest pressure points sit.</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">Timeline</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">Track the events shaping the active dynamic instead of reacting to a single moment.</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">AI guidance</p>
                      <p className="mt-2 font-serif-accent text-sm leading-7 text-[var(--text-secondary)]">Turn situations into structured insight and clearer next steps.</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[var(--text-muted)]">Simulation</p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">Compare possible responses before the conversation happens.</p>
                    </div>
                  </div>
                </GlowCard>
              </FadeIn>
            </div>
          </div>
        </GlowCard>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 md:gap-6">
          <Feature delay={0} icon={<Network size={20} />} title="Relationship mapping" body="Organize the people in your system and see how the connections influence each other." />
          <Feature delay={0.1} icon={<Clock3 size={20} />} title="Timeline awareness" body="Review conflict, repair, and stress over time so the larger pattern becomes visible." />
          <Feature delay={0.2} icon={<BrainCircuit size={20} />} title="Decision support" body="Use structured guidance to move with more clarity and less reactivity." />
          <Feature delay={0.3} icon={<ShieldCheck size={20} />} title="Healthier outcomes" body="Built to support better conversations, better timing, and more grounded choices." />
        </section>

        <FadeIn>
          <GlowCard className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
                <Sparkles size={18} className="text-[var(--text-primary)]" />
                <h3 className="mt-4 text-base font-medium text-[var(--text-primary)]">Premium interface</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">Dark glass surfaces, stronger hierarchy, and cleaner spacing across every core screen.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
                <Network size={18} className="text-[var(--text-primary)]" />
                <h3 className="mt-4 text-base font-medium text-[var(--text-primary)]">Organized system view</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">The dashboard, relationships, and timeline pages all point back to the same platform purpose.</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-5">
                <BrainCircuit size={18} className="text-[var(--text-primary)]" />
                <h3 className="mt-4 text-base font-medium text-[var(--text-primary)]">Action-oriented guidance</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">Simulations and AI guidance are framed around real next-step preparation.</p>
              </div>
            </div>
          </GlowCard>
        </FadeIn>

        <PremiumFooter />
      </div>
    </main>
  )
}
