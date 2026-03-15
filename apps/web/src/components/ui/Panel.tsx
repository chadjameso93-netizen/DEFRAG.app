import React from "react"
import { cn } from "@/lib/cn"

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  noPadding?: boolean
}

export function Panel({ children, className, noPadding = false, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px]",
        !noPadding && "p-[32px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
