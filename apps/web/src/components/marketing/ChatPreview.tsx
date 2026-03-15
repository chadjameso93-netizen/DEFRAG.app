import React from "react"
import { Panel } from "@/components/ui/Panel"
import { Activity, CornerDownRight, Terminal } from "lucide-react"

export function ChatPreview() {
  return (
    <div className="relative w-full max-w-[600px] mx-auto group">
      {/* Precision structural shadows - no glow */}
      <div className="absolute inset-x-8 -bottom-12 h-24 bg-[#EAEAEA]/[0.02] blur-[80px] pointer-events-none" />
      
      <div className="relative flex flex-col gap-4">
        {/* User Input Artifact */}
        <div className="flex justify-end pr-4 animate-[page-enter_0.6s_ease_both]">
          <div className="bg-[#0A0A0A] border border-[#111] max-w-[85%] rounded-[16px] rounded-tr-none px-6 py-4 shadow-2xl">
            <p className="text-[14px] leading-relaxed text-[#555] font-light italic">
               &quot;I need to tell my co-founder that I&apos;m taking over the project lead role, but they are highly defensive.&quot;
            </p>
          </div>
        </div>

        {/* AI System Analysis Artifact */}
        <Panel className="p-8 border-[#1F1F1F] bg-[#020202] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:border-[#333] animate-[page-enter_0.8s_ease_both]">
          {/* Internal Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#111] mb-8">
            <div className="flex items-center gap-3">
              <Activity size={14} className="text-[#4F6BFF] opacity-60" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555555]">System Intelligence Analysis</span>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] opacity-20" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333]">Observed Pattern</h4>
              <p className="text-[15px] leading-relaxed text-[#EAEAEA] font-light">
                Status-threat reflex detected. Direct assertion will trigger an ego-preservation response, resulting in immediate relational withdrawal.
              </p>
            </div>

            <div className="flex flex-col gap-4 bg-[#050505] border border-[#111] rounded-[12px] p-5">
              <div className="flex items-center gap-3">
                 <Terminal size={12} className="text-[#4F6BFF] opacity-50" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Operational Pivot</span>
              </div>
              <div className="flex gap-4">
                <CornerDownRight size={14} className="text-[#333333] shrink-0 mt-1" />
                <p className="text-[14px] text-[#9A9A9A] italic font-light leading-relaxed">
                  &quot;Frame the shift as a necessary operational burden you are lifting from them, rather than a promotion you are taking.&quot;
                </p>
              </div>
            </div>
          </div>
        </Panel>

        {/* Tactical Indicators */}
        <div className="flex items-center gap-3 ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-[page-enter_1s_ease_both]">
           <div className="h-1 w-1 rounded-full bg-[#333]" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-[#555]">Field Pressure: Critical</span>
           <div className="h-1 w-1 rounded-full bg-[#333]" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-[#555]">Audit Reasoning Layer Active</span>
        </div>
      </div>
    </div>
  )
}
