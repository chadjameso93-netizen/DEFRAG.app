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
        "rounded-[30px] border border-white/70 bg-white/82 shadow-[0_24px_100px_rgba(15,23,42,0.10)] backdrop-blur-2xl",
        className
      )}
    >
      {children}
    </div>
  )
}
