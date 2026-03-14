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
        "rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--border)] hover:bg-[var(--surface-2)]",
        className
      )}
    >
      {children}
    </div>
  )
}
