import type { ReactNode } from "react"

export default function Surface({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        "rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface-1)] backdrop-blur-xl transition-all duration-500 hover:border-[var(--border)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}
