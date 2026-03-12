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
        "rounded-[32px] border border-white/10 bg-white/5 shadow-[0_24px_100px_rgba(0,0,0,0.28),0_2px_10px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition duration-300 hover:border-white/15 hover:bg-white/[0.07]",
        className
      )}
    >
      {children}
    </div>
  )
}
