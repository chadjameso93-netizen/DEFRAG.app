"use client"
import { Panel } from "@/components/ui/Panel";

import { useEffect, useState } from "react"
import { Pause, Play, Volume2 } from "lucide-react"
import { getDailyRead } from "@/lib/api"

export default function DailyReadPanel() {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [insight, setInsight] = useState("Loading today's read...")

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await getDailyRead()
        if (!cancelled && data?.insight) {
          setInsight(data.insight)
        }
      } catch {
        if (!cancelled) {
          setInsight("Start with a calmer pace today. Clarity improves when you let the timeline speak before reacting.")
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Panel className="p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[#555555]">Daily strategic read</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#EAEAEA] sm:text-3xl">
            A calm read on what your relationship system may need today.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#EAEAEA]/62">
            This audio brief is built to slow the pace, frame the current pattern, and help you choose timing with more precision.
          </p>
        </div>

        <div className="grid min-w-[220px] gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-[24px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Length</p>
            <p className="mt-2 text-sm font-medium text-[#EAEAEA]">5 to 10 min</p>
          </div>
          <div className="rounded-[24px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Focus</p>
            <p className="mt-2 text-sm font-medium text-[#EAEAEA]">Timing and pattern</p>
          </div>
          <div className="rounded-[24px] border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.20em] text-[#EAEAEA]/40">Tone</p>
            <p className="mt-2 text-sm font-medium text-[#EAEAEA]">Clear and non-reactive</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-[#1F1F1F] bg-black/20 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1F1F1F] bg-[#0A0A0A]">
                <Volume2 size={18} className="text-[#EAEAEA]/80" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#EAEAEA]">Today’s read</p>
                <p className="text-xs text-[#EAEAEA]/50">Audio playback preview</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-[#1F1F1F] bg-[#0A0A0A] px-4 py-2 text-sm font-medium text-[#EAEAEA] transition hover:bg-white/12"
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {playing ? "Pause" : "Play"}
            </button>
          </div>

          <div className="mt-6 rounded-full bg-white/10 p-1">
            <div className={`h-2 rounded-full bg-[#e9dfcf] transition-all duration-700 ${playing ? "w-2/3" : "w-1/4"}`} />
          </div>

          <p className="mt-5 text-sm leading-7 text-[#9A9A9A]">{insight}</p>
        </div>

        <div className="rounded-[28px] border border-[#1F1F1F] bg-[#0A0A0A] p-5">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="flex w-full items-center justify-between text-left"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#EAEAEA]/40">Transcript</p>
              <p className="mt-2 text-sm text-[#EAEAEA]">Expand the full read for a skimmable version.</p>
            </div>
            <span className="rounded-full border border-[#1F1F1F] bg-[#0A0A0A] px-3 py-1 text-xs font-medium text-[#EAEAEA]">
              {expanded ? "Hide" : "Show"}
            </span>
          </button>

          {expanded ? (
            <div className="mt-5 space-y-4 text-sm leading-7 text-[#9A9A9A]">
              <p>{insight}</p>
              <p>
                Watch for repeated timing patterns instead of isolated moments. If a conversation feels loaded, wait for a quieter entry point and keep the next step small.
              </p>
              <p>
                Today favors clarity over intensity. Use the map and timeline together before you decide whether to reach out, set a boundary, or hold your position.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Panel>
  )
}
