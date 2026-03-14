"use client"

import { useRef, useCallback } from "react"
import type { ReactNode } from "react"

interface EdgeLitSurfaceProps {
  children: ReactNode
  className?: string
}

export default function EdgeLitSurface({ children, className = "" }: EdgeLitSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI)
    ref.current.style.setProperty("--edge-angle", `${angle}deg`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.setProperty("--edge-angle", "0deg")
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`edge-lit-surface ${className}`}
      style={{
        ["--edge-angle" as string]: "0deg",
        position: "relative",
        padding: "1px",
        borderRadius: "inherit",
        background: `conic-gradient(from var(--edge-angle), transparent 60%, rgba(245,245,240,0.15) 80%, transparent 100%)`,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <div className="h-full w-full" style={{ borderRadius: "inherit" }}>
        {children}
      </div>
    </div>
  )
}
