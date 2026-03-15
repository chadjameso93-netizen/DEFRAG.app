"use client"

import { useEffect, useRef, useState } from "react"

export default function BrandMesh() {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const parallaxOffset = scrollY * 0.12

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--surface-0)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_22%)]" />
      <div
        className="absolute left-[-10%] top-[-12%] h-[50rem] w-[50rem] rounded-full bg-fuchsia-500/[0.16] blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      />
      <div
        className="absolute right-[-8%] top-[4%] h-[44rem] w-[44rem] rounded-full bg-sky-500/[0.14] blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.85}px)` }}
      />
      <div
        className="absolute bottom-[-14%] left-[18%] h-[38rem] w-[38rem] rounded-full bg-violet-500/[0.14] blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
      />
      <div
        className="absolute bottom-[5%] right-[5%] h-[32rem] w-[32rem] rounded-full bg-amber-500/[0.10] blur-3xl transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,rgba(245,245,240,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,245,240,1)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.30),rgba(5,5,5,0.50))]" />
    </div>
  )
}
