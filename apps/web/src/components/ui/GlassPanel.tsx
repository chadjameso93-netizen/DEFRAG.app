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
        "glass-surface transition-all duration-300 hover:border-white/[0.08]",
        className
      )}
    >
      {children}
    </div>
  )
}
