import type { ReactNode } from "react"
import Surface from "@/components/ui/Surface"

export default function AuthCard({ children }: { children: ReactNode }) {
  return <Surface className="max-w-md p-6 sm:p-8">{children}</Surface>
}
