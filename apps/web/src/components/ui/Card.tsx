import { ReactNode } from "react"
import { cn } from "@/lib/cn"

export default function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("glass-surface-light p-5 transition-all duration-300 hover:border-white/[0.06]", className)}>
      {children}
    </div>
  )
}
