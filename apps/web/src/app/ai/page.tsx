"use client"
import { useEffect, useState, useCallback, useRef } from "react"
import AppShell from "@/components/layout/AppShell"
import { Send, RefreshCw, X, ChevronDown, FileText, Activity, Terminal } from "lucide-react"
import type { Relationship, ProofJson } from "@/lib/types"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

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
    <div className="p-8 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Terminal size={14} className="text-[#4F6BFF]" />
           <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">Reasoning Log</span>
        </div>
        <button onClick={onClose} className="rounded-full p-2 text-[#555555] transition-all hover:bg-[#111] hover:text-[#EAEAEA]">
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {/* Intent */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333]">System Intent</p>
          <p className="text-[14px] font-medium text-[#EAEAEA] capitalize">{proof.intent.type.replace(/_/g, " ")}</p>
          <p className="text-[13px] leading-relaxed text-[#9A9A9A] font-light italic">{proof.intent.goal}</p>
        </div>

        {/* Context */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333]">Relational Context</p>
          <div className="bg-[#050505] border border-[#1A1A1A] rounded-[12px] p-5 flex flex-col gap-4">
            <p className="text-[13px] text-[#9A9A9A] leading-relaxed"><span className="text-[#EAEAEA] font-medium uppercase text-[10px] mr-2">State:</span> {proof.context_summary.relationship_state}</p>
            {proof.context_summary.recent_events.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-[#111] pt-4">
                <span className="text-[#EAEAEA] font-medium uppercase text-[10px]">Recent Signals:</span>
                <ul className="flex flex-col gap-2">
                  {proof.context_summary.recent_events.map((e, i) => (
                    <li key={i} className="text-[12px] text-[#555555] flex items-center gap-3">
                       <div className="w-1 h-1 rounded-full bg-[#333]" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Patterns */}
        {proof.patterns_detected.length > 0 && (
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#333]">Pattern Detection</p>
            <div className="flex flex-col gap-3">
              {proof.patterns_detected.map((p, i) => (
                <div key={i} className="bg-[#050505] border border-[#1A1A1A] rounded-[12px] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[13px] font-medium text-[#EAEAEA]">{p.name}</p>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#333]">{p.confidence} Confidence</span>
                  </div>
                  {p.evidence.length > 0 && (
                    <ul className="flex flex-col gap-1.5 opacity-60">
                      {p.evidence.map((e, j) => (
                        <li key={j} className="text-[11px] text-[#555555] flex items-start gap-2">
                           <span className="mt-1">&rarr;</span> {e}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timing */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#333]">Timing Matrix</p>
          <div className="bg-[#050505] border border-[#1A1A1A] rounded-[12px] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#555555]">System Pressure</span>
              <span className="text-[12px] font-mono text-[#EAEAEA] uppercase">{proof.timing_assessment.pressure_level}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#111] pt-4">
              <span className="text-[11px] text-[#555555]">Response Support</span>
              <span className="text-[12px] font-mono text-[#EAEAEA] uppercase">{proof.timing_assessment.support_for_direct_conversation}</span>
            </div>
            {proof.timing_assessment.notes && (
              <p className="text-[13px] leading-relaxed text-[#9A9A9A] font-light italic mt-2 border-t border-[#111] pt-4">{proof.timing_assessment.notes}</p>
            )}
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
  const renderStructuredContent = (content: string) => {
    const sections = content.split(/\n\n(?=Summary:|Observed pattern:|Timing insight:|Suggested approach:)/i);
    
    if (sections.length > 1) {
      return (
        <div className="flex flex-col gap-[32px]">
          {sections.map((sec, idx) => {
            const match = sec.match(/^(Summary|Observed pattern|Timing insight|Suggested approach):\s*([\s\S]*)/i);
            if (match) {
              return (
                <div key={idx} className="flex flex-col gap-[12px]">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#555555]">{match[1]}</h4>
                  <p className="text-[15px] leading-relaxed text-[#EAEAEA] font-light">{match[2].trim()}</p>
                </div>
              );
            }
            return <p key={idx} className="text-[15px] leading-relaxed text-[#EAEAEA] font-light">{sec.trim()}</p>;
          })}
        </div>
      );
    }
    return <div className="text-[15px] leading-relaxed text-[#EAEAEA] font-light whitespace-pre-wrap">{content}</div>;
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end pr-4">
        <div className="bg-[#0A0A0A] border border-[#1F1F1F] max-w-[85%] rounded-[16px] rounded-tr-none px-6 py-4 shadow-2xl">
          <p className="text-[15px] leading-relaxed text-[#9A9A9A] font-light italic">
             &quot;{message.content}&quot;
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto pl-4">
      <Panel className="p-8 hover:border-[#333] transition-all duration-500 shadow-2xl relative overflow-hidden group bg-[#020202]">
        <div className="flex items-center justify-between pb-6 border-b border-[#111] mb-8">
          <div className="flex items-center gap-3">
            <Activity size={14} className="text-[#4F6BFF] opacity-60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">System Intelligence Analysis</span>
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {renderStructuredContent(message.content)}
      </Panel>

      <div className="flex items-center gap-2 ml-2">
        {message.proof_json && onShowProof && (
          <Button
            variant="ghost"
            onClick={() => onShowProof(message.proof_json!)}
            className="h-9 px-4 text-[10px] uppercase tracking-widest font-bold text-[#555]"
          >
            <FileText size={14} className="mr-2" /> Audit Reasoning
          </Button>
        )}
        {onRegenerate && (
          <Button
            variant="ghost"
            onClick={onRegenerate}
            className="h-9 px-4 text-[10px] uppercase tracking-widest font-bold text-[#555]"
          >
            <RefreshCw size={14} className="mr-2" /> Recalculate
          </Button>
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
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-1 py-8">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8">
              <div className="flex flex-col items-center gap-4 mb-12">
                 <div className="w-12 h-12 rounded-[16px] bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center shadow-2xl">
                    <Activity size={24} className="text-[#4F6BFF] opacity-60" />
                 </div>
                 <div className="text-center flex flex-col gap-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-[#EAEAEA]">Operational Interface</h2>
                    <p className="max-w-md text-[15px] font-light text-[#555555]">
                      Select a situation or relationship focus to begin calculating subtext dynamics and pacing risks.
                    </p>
                 </div>
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2 max-w-2xl w-full">
                {[
                  "How do I bring up something that is bothering me?",
                  "Is this a good time to have a difficult conversation?",
                  "Help me understand what happened in that interaction",
                  "What patterns are showing up in this relationship?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => { setInput(prompt); sendMessage(prompt) }}
                    className="bg-[#050505] border border-[#1A1A1A] rounded-[16px] p-6 text-left text-[14px] leading-relaxed text-[#9A9A9A] transition-all duration-500 hover:border-[#333] hover:-translate-y-1 font-light"
                  >
                    &quot;{prompt}&quot;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-12">
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
                <div className="flex items-center gap-4 px-8 max-w-3xl mx-auto">
                  <div className="flex gap-1.5">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EAEAEA] opacity-20" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EAEAEA] opacity-40 [animation-delay:150ms]" />
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EAEAEA] opacity-60 [animation-delay:300ms]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333]">Calculating Dynamics...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Composer */}
        <div className="shrink-0 border-t border-[#111] bg-[#000000] p-8">
          <div className="mx-auto max-w-3xl flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <select
                  value={selectedRelId}
                  onChange={(e) => setSelectedRelId(e.target.value)}
                  className="appearance-none rounded-[12px] border border-[#1F1F1F] bg-[#0A0A0A] py-3 pl-4 pr-10 text-[11px] font-bold uppercase tracking-widest text-[#555555] outline-none transition-all duration-300 focus:border-[#4F6BFF] hover:border-[#333] cursor-pointer"
                >
                  <option value="">No Active Focus</option>
                  {relationships.map((r) => (
                    <option key={r.id} value={r.id}>{r.target_name}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#333]" />
              </div>
              <div className="relative group">
                <select
                  value={selectedIntent}
                  onChange={(e) => setSelectedIntent(e.target.value)}
                  className="appearance-none rounded-[12px] border border-[#1F1F1F] bg-[#0A0A0A] py-3 pl-4 pr-10 text-[11px] font-bold uppercase tracking-widest text-[#555555] outline-none transition-all duration-300 focus:border-[#4F6BFF] hover:border-[#333] cursor-pointer"
                >
                  {INTENTS.map((i) => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#333]" />
              </div>
            </div>

            <div className="flex items-end gap-3 rounded-[20px] border border-[#1F1F1F] bg-[#050505] p-3 shadow-2xl focus-within:border-[#333] transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Submit situation for analysis..."
                rows={1}
                className="max-h-64 min-h-[48px] flex-1 resize-none bg-transparent px-4 py-3 text-[15px] text-[#EAEAEA] font-light outline-none placeholder:text-[#333] leading-relaxed"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="shrink-0 h-11 w-11 rounded-full p-0 flex items-center justify-center bg-[#EAEAEA] hover:bg-[#FFFFFF]"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
