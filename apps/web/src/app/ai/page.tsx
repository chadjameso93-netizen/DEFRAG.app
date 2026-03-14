"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import AppShell from "@/components/layout/AppShell"
import { Send, RefreshCw, X, ChevronDown, Sparkles, FileText } from "lucide-react"
import type { Relationship, ProofJson } from "@/lib/types"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  proof_json?: ProofJson
  model?: string
  tokens_in?: number
  tokens_out?: number
}

const INTENTS = [
  { value: "processing", label: "Help me process this" },
  { value: "timing", label: "Is this the right time?" },
  { value: "phrasing", label: "How should I say this?" },
  { value: "simulation", label: "Simulate the conversation" },
]

function ProofPanel({ proof, onClose }: { proof: ProofJson; onClose: () => void }) {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">What is this based on?</h3>
        <button onClick={onClose} className="rounded-md p-1 text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-2)] hover:text-[var(--text-secondary)]">
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {/* Intent */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Intent</p>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{proof.intent.type.replace(/_/g, " ")}</p>
          <p className="mt-0.5 text-[12px] text-[var(--text-muted)]">{proof.intent.goal}</p>
        </div>

        {/* Context */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Context summary</p>
          <div className="mt-1 space-y-1 text-[12px] text-[var(--text-secondary)]">
            <p><span className="text-[var(--text-muted)]">Relationship state:</span> {proof.context_summary.relationship_state}</p>
            {proof.context_summary.recent_events.length > 0 && (
              <div>
                <span className="text-[var(--text-muted)]">Recent events:</span>
                <ul className="ml-3 mt-0.5 list-disc space-y-0.5">
                  {proof.context_summary.recent_events.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Patterns */}
        {proof.patterns_detected.length > 0 && (
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Patterns detected</p>
            <div className="mt-1 space-y-2">
              {proof.patterns_detected.map((p, i) => (
                <div key={i} className="rounded-md border border-[var(--border-subtle)] bg-[var(--surface-1)] p-2.5">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-medium text-[var(--text-primary)]">{p.name}</p>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                      p.confidence === "high" ? "bg-emerald-500/10 text-emerald-400" :
                      p.confidence === "medium" ? "bg-amber-500/10 text-amber-400" :
                      "bg-zinc-500/10 text-[var(--text-secondary)]"
                    }`}>
                      {p.confidence}
                    </span>
                  </div>
                  {p.evidence.length > 0 && (
                    <ul className="ml-3 mt-1 list-disc space-y-0.5 text-[11px] text-[var(--text-muted)]">
                      {p.evidence.map((e, j) => <li key={j}>{e}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timing */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Timing assessment</p>
          <div className="mt-1 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-1)] p-2.5 text-[12px]">
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-muted)]">Pressure:</span>
              <span className={
                proof.timing_assessment.pressure_level === "high" ? "text-red-400" :
                proof.timing_assessment.pressure_level === "moderate" ? "text-amber-400" : "text-emerald-400"
              }>{proof.timing_assessment.pressure_level}</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className="text-[var(--text-muted)]">Conversation support:</span>
              <span className="text-[var(--text-secondary)]">{proof.timing_assessment.support_for_direct_conversation}</span>
            </div>
            {proof.timing_assessment.notes && (
              <p className="mt-1.5 text-[var(--text-secondary)]">{proof.timing_assessment.notes}</p>
            )}
          </div>
        </div>

        {/* Hypothesis */}
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">Relational hypothesis</p>
          <div className="mt-1 space-y-1.5 text-[12px] text-[var(--text-secondary)]">
            <p><span className="text-[var(--text-muted)]">Your experience:</span> {proof.relational_hypothesis.user_experience}</p>
            <p><span className="text-[var(--text-muted)]">Their experience:</span> {proof.relational_hypothesis.other_experience}</p>
            <p><span className="text-[var(--text-muted)]">Dynamic:</span> {proof.relational_hypothesis.dynamic_summary}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  onShowProof,
  onRegenerate,
}: {
  message: Message
  onShowProof?: (proof: ProofJson) => void
  onRegenerate?: () => void
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-lg bg-[var(--surface-2)] px-4 py-2.5">
          <p className="text-[13px] leading-relaxed text-[var(--text-primary)]">{message.content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="max-w-[85%] rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] px-4 py-3">
        <div className="flex items-center gap-2 pb-2">
          <Sparkles size={12} className="text-[var(--text-muted)]" />
          <span className="text-[11px] text-[var(--text-muted)]">DEFRAG AI</span>
        </div>
        <div className="font-serif-accent text-[13px] leading-relaxed text-[var(--text-primary)] whitespace-pre-wrap">{message.content}</div>
      </div>
      <div className="flex items-center gap-2">
        {message.proof_json && onShowProof && (
          <button
            onClick={() => onShowProof(message.proof_json!)}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
          >
            <FileText size={12} /> What is this based on?
          </button>
        )}
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 text-[11px] text-[var(--text-muted)] transition-colors duration-300 hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
          >
            <RefreshCw size={12} /> Say it another way
          </button>
        )}
      </div>
    </div>
  )
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [relationships, setRelationships] = useState<Relationship[]>([])
  const [selectedRelId, setSelectedRelId] = useState("")
  const [selectedIntent, setSelectedIntent] = useState("processing")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [proofPanel, setProofPanel] = useState<ProofJson | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const loadRelationships = useCallback(async () => {
    try {
      const res = await fetch("/api/relationships")
      if (res.ok) {
        const d = await res.json()
        setRelationships(d.relationships ?? d ?? [])
      }
    } catch {}
  }, [])

  useEffect(() => { loadRelationships() }, [loadRelationships])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  async function sendMessage(messageText?: string) {
    const text = (messageText ?? input).trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: `msg_${Date.now()}_user`,
      role: "user",
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const selectedRel = relationships.find((r) => r.id === selectedRelId)
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[Intent: ${selectedIntent}] ${text}`,
          relationship_id: selectedRelId || undefined,
          relationship_name: selectedRel?.target_name,
          relationship_type: selectedRel?.relationship_type,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const assistantMsg: Message = {
          id: `msg_${Date.now()}_ai`,
          role: "assistant",
          content: data.output_text,
          proof_json: data.proof_json,
          model: data.model,
          tokens_in: data.tokens_in,
          tokens_out: data.tokens_out,
        }
        setMessages((prev) => [...prev, assistantMsg])
      } else {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        const errMsg: Message = {
          id: `msg_${Date.now()}_err`,
          role: "assistant",
          content: err.error || "Something went wrong. Please try again.",
        }
        setMessages((prev) => [...prev, errMsg])
      }
    } catch {
      const errMsg: Message = {
        id: `msg_${Date.now()}_err`,
        role: "assistant",
        content: "Network error. Please check your connection and try again.",
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setLoading(false)
    }
  }

  async function regenerate() {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")
    if (lastUserMsg) {
      setMessages((prev) => prev.slice(0, -1))
      await sendMessage(lastUserMsg.content)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const rightPanel = proofPanel ? (
    <ProofPanel proof={proofPanel} onClose={() => setProofPanel(null)} />
  ) : undefined

  return (
    <AppShell rightPanel={rightPanel}>
      <div className="flex h-full flex-col" style={{ height: "calc(100vh - 48px - 48px)" }}>
        {/* Messages area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 py-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <Sparkles size={28} className="text-[var(--text-muted)]" />
              <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">Defrag AI</h2>
              <p className="mt-2 max-w-sm text-center text-[13px] leading-relaxed text-[var(--text-muted)]">
                Ask about a relationship dynamic, get timing guidance, process an interaction, or simulate a conversation.
              </p>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  "How do I bring up something that's been bothering me?",
                  "Is this a good time to have a difficult conversation?",
                  "Help me understand what happened in that interaction",
                  "What patterns are showing up in this relationship?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => { setInput(prompt); sendMessage(prompt) }}
                    className="rounded-lg border border-[var(--border-subtle)] px-3 py-2.5 text-left text-[12px] leading-relaxed text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--border)] hover:bg-[var(--surface-1)] hover:text-[var(--text-secondary)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-4">
              {messages.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onShowProof={msg.proof_json ? (p) => setProofPanel(p) : undefined}
                  onRegenerate={
                    msg.role === "assistant" && i === messages.length - 1 ? regenerate : undefined
                  }
                />
              ))}
              {loading && (
                <div className="flex items-center gap-2 px-1">
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-muted)]" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">Thinking...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Composer */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-0)] p-4">
          {/* Composer controls */}
          <div className="mx-auto max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedRelId}
                  onChange={(e) => setSelectedRelId(e.target.value)}
                  className="appearance-none rounded-md border border-[var(--border-subtle)] bg-[var(--surface-1)] py-1 pl-2.5 pr-7 text-[11px] text-[var(--text-secondary)] outline-none transition-colors duration-300 focus:border-[var(--border)]"
                >
                  <option value="">No relationship</option>
                  {relationships.map((r) => (
                    <option key={r.id} value={r.id}>{r.target_name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              </div>
              <div className="relative">
                <select
                  value={selectedIntent}
                  onChange={(e) => setSelectedIntent(e.target.value)}
                  className="appearance-none rounded-md border border-[var(--border-subtle)] bg-[var(--surface-1)] py-1 pl-2.5 pr-7 text-[11px] text-[var(--text-secondary)] outline-none transition-colors duration-300 focus:border-[var(--border)]"
                >
                  {INTENTS.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              </div>
            </div>

            <div className="flex items-end gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your situation..."
                rows={1}
                className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent px-2 py-1.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="shrink-0 rounded-md bg-[var(--text-primary)] p-2 text-[var(--surface-0)] transition-colors duration-300 hover:bg-[var(--surface-2)] disabled:opacity-30"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
