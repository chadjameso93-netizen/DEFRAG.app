"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Target, Clock, Activity } from "lucide-react"
import PremiumFooter from "@/components/marketing/PremiumFooter"
import BrandMesh from "@/components/brand/BrandMesh"
import { ChatPreview } from "@/components/marketing/ChatPreview"
import { Panel } from "@/components/ui/Panel"
import { Button } from "@/components/ui/Button"

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function HeroLanding() {
  const [heroInput, setHeroInput] = useState(
    "I need to tell my co-founder that I'm taking over the project lead role, but they are highly defensive and avoid direct conflict."
  )
  const [ctaInput, setCtaInput] = useState("")

  return (
    <main className="min-h-screen bg-[#000000] text-[#EAEAEA] selection:bg-[#EAEAEA] selection:text-[#000000] font-sans antialiased relative overflow-x-hidden">
      <BrandMesh />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full mx-auto max-w-[1240px] px-8 sm:px-12 pt-[220px] pb-[160px] z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[100px] items-start">
          
          {/* Left Column: Tactical Direction */}
          <div className="lg:col-span-6 flex flex-col gap-[56px]">
            <div className="flex flex-col gap-[32px]">
              <motion.div 
                custom={0}
                initial="hidden"
                animate="visible"
                variants={FADE_UP_VARIANTS}
                className="inline-flex items-center gap-3 border border-[#111] bg-[#050505] rounded-full px-4 py-2 w-fit"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#EAEAEA] shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#555555]">Structural Intelligence Field</span>
              </motion.div>
              
              <motion.h1 
                custom={1}
                initial="hidden"
                animate="visible"
                variants={FADE_UP_VARIANTS}
                className="text-[56px] md:text-[80px] leading-[0.9] font-semibold text-[#EAEAEA] tracking-tight"
              >
                Calculated <br />Interaction.
              </motion.h1>
              
              <motion.p 
                custom={2}
                initial="hidden"
                animate="visible"
                variants={FADE_UP_VARIANTS}
                className="text-[18px] md:text-[22px] leading-relaxed text-[#555555] font-light max-w-[500px]"
              >
                Defrag renders the subtext of high-stakes conversations into tactical clarity. Identify the friction points before you engage.
              </motion.p>
            </div>

            <motion.div 
              custom={3}
              initial="hidden"
              animate="visible"
              variants={FADE_UP_VARIANTS}
              className="flex flex-col gap-[24px] max-w-[540px]"
            >
              <div className="relative">
                <textarea
                  value={heroInput}
                  onChange={(e) => setHeroInput(e.target.value)}
                  className="relative w-full h-[160px] bg-[#050505] border border-[#111] rounded-[24px] p-[28px] text-[#EAEAEA] text-[16px] resize-none focus:outline-none focus:border-[#333] transition-all duration-500 placeholder:text-[#333] font-light leading-relaxed shadow-2xl"
                  placeholder="Input scenario for analysis..."
                  spellCheck={false}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                 <Link href="/signup" className="w-full sm:w-auto">
                   <Button className="w-full sm:px-10 h-[56px] text-[16px] gap-3">
                     Process Situation
                     <Activity size={16} />
                   </Button>
                 </Link>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#333] whitespace-nowrap">Transient Processing Encryption Active</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Artifact */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full lg:sticky lg:top-[220px]"
          >
            <ChatPreview />
          </motion.div>
        </div>
      </section>

      {/* 2. SPECIFICATION GRID */}
      <section className="relative w-full mx-auto max-w-[1240px] px-8 sm:px-12 py-[160px] z-10 border-t border-[#111111]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {[
            { 
              icon: Lock, 
              title: "Encrypted Inference", 
              desc: "Defrag utilizes hardware-isolated processing environments. We extract structural subtext without ever persisting raw transcripts or identity markers." 
            },
            { 
              icon: Target, 
              title: "Operational Vector", 
              desc: "Get precise phrasing, tonal calibration, and framing advice derived from the ego-preservation dynamics of your target. No generic archetypes." 
            },
            { 
              icon: Clock, 
              title: "Temporal Calculus", 
              desc: "Interaction succeeds on timing. We evaluate the pressure levels of the relational field to identify the ideal activation window for the conversation." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <div className="w-12 h-12 rounded-[16px] bg-[#050505] border border-[#111] flex items-center justify-center">
                <item.icon size={20} className="text-[#EAEAEA] opacity-40"/>
              </div>
              <div className="space-y-4">
                <h3 className="text-[20px] font-semibold text-[#EAEAEA] tracking-tight">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#555] font-light">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. INTERFACE PROOF */}
      <section className="relative w-full mx-auto max-w-[1240px] px-8 sm:px-12 py-[200px] z-10 border-t border-[#111111]">
        <div className="flex flex-col pb-32 items-center text-center max-w-[640px] mx-auto gap-6">
          <span className="text-[10px] items-center gap-3 font-bold uppercase tracking-[0.4em] text-[#333] flex">
             <div className="w-1 h-1 rounded-full bg-[#EAEAEA] opacity-20" />
             The Artifact
             <div className="w-1 h-1 rounded-full bg-[#EAEAEA] opacity-20" />
          </span>
          <h2 className="text-[48px] font-semibold text-[#EAEAEA] tracking-tight leading-[1.0]">Intelligence is Structured.</h2>
          <p className="text-[18px] text-[#555] font-light leading-relaxed">
            Defrag abandons the chat bubble. We render your situation as a precise dashboard of tactical risks and openings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px]">
          <Panel className="flex flex-col gap-[48px] p-10 hover:border-[#333] transition-all duration-700 bg-[#020202]">
            <div className="flex items-center justify-between border-b border-[#111] pb-6">
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Relational Matrix</span>
               <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] opacity-10" />
            </div>
            <div className="h-[280px] w-full bg-[#000000] border border-[#111] rounded-[16px] relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-5 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
               <div className="w-[140px] h-[140px] rounded-full border border-dashed border-[#111] flex items-center justify-center">
                  <div className="w-[64px] h-[64px] rounded-full bg-[#0A0A0A] border border-[#1F1F1F] flex items-center justify-center shadow-2xl">
                    <div className="w-2 h-2 rounded-full bg-[#EAEAEA] animate-pulse" />
                  </div>
               </div>
               <div className="absolute left-[15%] top-[25%] w-12 h-12 rounded-full border border-[#111] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
               </div>
               <div className="absolute right-[20%] bottom-[15%] w-16 h-16 rounded-full border border-[#111] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
               </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[18px] font-medium tracking-tight">Status Mapping</h4>
              <p className="text-[15px] text-[#555] font-light leading-relaxed">Visualize the hidden distance between perceived authority and intent during high-stakes shifts.</p>
            </div>
          </Panel>

          <Panel className="flex flex-col gap-[48px] p-10 hover:border-[#333] transition-all duration-700 bg-[#020202]">
            <div className="flex items-center justify-between border-b border-[#111] pb-6">
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#555555]">Trajectory System</span>
               <div className="h-1.5 w-1.5 rounded-full bg-[#EAEAEA] opacity-10" />
            </div>
            <div className="h-[280px] w-full bg-[#000000] border border-[#111] rounded-[16px] p-8 flex flex-col justify-between">
              {[0.8, 0.45, 0.65, 0.3].map((v, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <div className="w-[140px] h-1 bg-[#111] rounded-full overflow-hidden">
                      <div className="h-full bg-[#EAEAEA] opacity-40 transition-all duration-1000" style={{ width: `${v*100}%` }} />
                    </div>
                    <span className="text-[9px] text-[#222] font-mono tracking-widest uppercase">Signal_Log_0{i+1}</span>
                  </div>
                  <div className="w-full h-[1px] bg-[#111] opacity-50" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[18px] font-medium tracking-tight">Signal Persistence</h4>
              <p className="text-[15px] text-[#555] font-light leading-relaxed">Map the intensity of historical signals to isolate behavioral loops before they manifest as crisis points.</p>
            </div>
          </Panel>
        </div>
      </section>

      {/* 4. FINAL CTA INTAKE */}
      <section className="relative w-full mx-auto max-w-[1240px] px-8 sm:px-12 py-[240px] z-10 border-t border-[#111111]">
        <div className="max-w-[800px] mx-auto flex flex-col gap-[64px] items-center text-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-[64px] font-semibold text-[#EAEAEA] tracking-tight leading-[1.0]">Ready for intake.</h2>
            <p className="text-[20px] text-[#555] font-light leading-relaxed max-w-lg mx-auto">Enter the situation you are currently avoiding to begin the decryption process.</p>
          </div>
          
          <div className="w-full flex flex-col gap-[28px] text-left">
            <textarea
              value={ctaInput}
              onChange={(e) => setCtaInput(e.target.value)}
              className="w-full h-[160px] bg-[#050505] border border-[#111] rounded-[24px] p-[28px] text-[#EAEAEA] text-[16px] resize-none focus:outline-none focus:border-[#333] transition-all duration-500 placeholder:text-[#333] font-light shadow-2xl"
              placeholder="What conversation is looming?"
              spellCheck={false}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
               <Link href="/signup" className="w-full sm:w-auto">
                 <Button className="w-full sm:px-12 h-[60px] text-[17px] gap-3">
                   Commence System Intake
                   <ArrowRight size={18} />
                 </Button>
               </Link>
               <span className="text-[10px] font-bold uppercase tracking-widest text-[#222] hidden md:block">System Node: Operational / 100% Signal Strength</span>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#000000] border-t border-[#111111] relative z-10">
        <PremiumFooter />
      </div>
    </main>
  )
}
