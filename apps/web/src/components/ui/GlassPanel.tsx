import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function GlassPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[32px] border border-white/70 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  )
}
