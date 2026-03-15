"use client"

import { useState } from "react"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"
import { Activity, Sparkles, Send } from "lucide-react"

export default function AIChat() {
  const [msg, setMsg] = useState("")
  const [reply, setReply] = useState(
    "Submit a relational scenario for structural analysis."
  )
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!msg.trim()) return
    setLoading(true)

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      if (data.error) {
        setReply(data.error)
      } else {
        setReply(data.output_text || "Analysis complete. No structural anomalies detected.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Panel className="flex flex-col gap-12 p-8 lg:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-[#333] max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Activity size={14} className="text-[#4F6BFF] opacity-60" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">Active Intelligence Field</span>
        </div>
        <div className="flex flex-col gap-2">
           <h2 className="text-[32px] font-semibold tracking-tight text-[#EAEAEA] leading-[1.1]">Direct System Access</h2>
           <p className="text-[16px] leading-relaxed text-[#555555] font-light max-w-[540px]">
             Immediate calculation of subtext dynamics. Describe the situation below to begin processing.
           </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Assistant reply artifact */}
        <div className="bg-[#050505] border border-[#111111] rounded-[24px] p-8 min-h-[140px] flex flex-col justify-center relative group">
          <div className="absolute top-6 right-8 opacity-20">
            <Sparkles size={16} className="text-[#EAEAEA]" />
          </div>
          {loading ? (
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] animate-[pulse_1s_infinite] opacity-20" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] animate-[pulse_1s_infinite_200ms] opacity-40" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] animate-[pulse_1s_infinite_400ms] opacity-60" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#333] ml-2">Calculating Dynamics...</span>
             </div>
          ) : (
            <p className="text-[16px] leading-relaxed text-[#9A9A9A] font-light italic">
              &quot;{reply}&quot;
            </p>
          )}
        </div>

        {/* Tactical User Input */}
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <textarea
              className="w-full min-h-[180px] bg-[#000000] border border-[#111111] rounded-[24px] p-8 text-[16px] text-[#EAEAEA] placeholder:text-[#333] focus:outline-none focus:border-[#333] transition-all duration-500 font-light resize-none leading-relaxed"
              placeholder="Who is involved? What is the core pressure point?"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className="absolute bottom-6 right-6 flex items-center gap-6">
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#333]">Ready for input</span>
               <Button 
                onClick={send} 
                disabled={loading || !msg.trim()} 
                className="h-12 w-12 rounded-full p-0 flex items-center justify-center shadow-2xl"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
