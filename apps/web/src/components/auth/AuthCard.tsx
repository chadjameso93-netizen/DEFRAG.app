import { Panel } from "@/components/ui/Panel";
import type { ReactNode } from "react"

export default function AuthCard({ children }: { children: ReactNode }) {
  return <Panel className="max-w-md p-6 sm:p-8">{children}</Panel>
}
