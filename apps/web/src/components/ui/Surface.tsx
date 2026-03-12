import type { ReactNode } from "react"

export default function Surface({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={["rounded-[28px] border border-white/60 bg-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl", className].join(" ")}>
      {children}
    </div>
  )
}
