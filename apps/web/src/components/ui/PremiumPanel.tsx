import type { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function PremiumPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--surface-1)] backdrop-blur-2xl transition-all duration-500 hover:border-[var(--border)] hover:bg-[var(--surface-2)] hover:shadow-[0_0_50px_rgba(245,245,240,0.03)]",
        className
      )}
    >
      {children}
    </div>
  )
}
