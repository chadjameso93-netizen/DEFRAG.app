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
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden bg-[#000000]">
      {/* Subtle central spotlight cinematic lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.02),transparent_60%)]" />
      
      {/* Slow-moving deep structural gradients instead of colorful cosmic blobs */}
      <div
        className="absolute left-[-10%] top-[-10%] h-[60rem] w-[60rem] rounded-full bg-[#EAEAEA] opacity-[0.015] blur-[120px] transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />
      <div
        className="absolute right-[-20%] top-[10%] h-[50rem] w-[50rem] rounded-full bg-[#EAEAEA] opacity-[0.012] blur-[120px] transition-transform duration-100"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      />
      
      {/* Structural grid over the dark background */}
      <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(to_right,rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:64px_64px]" />
      
      {/* Base blackout gradient overlay for contrast mapping */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.40),rgba(0,0,0,0.85))]" />
    </div>
  )
}
