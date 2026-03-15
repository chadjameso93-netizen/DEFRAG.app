import React from "react"
import { cn } from "@/lib/cn"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
}

export function Button({ 
  className, 
  variant = "primary", 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-[#EAEAEA] text-[#000000] hover:bg-[#FFFFFF] shadow-[0_4px_12px_rgba(255,255,255,0.05)]",
    secondary: "bg-[#0A0A0A] text-[#EAEAEA] border border-[#1F1F1F] hover:bg-[#111111] hover:border-[#333333]",
    outline: "bg-transparent border border-[#1F1F1F] text-[#EAEAEA] hover:border-[#333333] hover:bg-[#0A0A0A]",
    ghost: "bg-transparent text-[#9A9A9A] hover:text-[#EAEAEA] hover:bg-[#0A0A0A]"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] px-[20px] py-[12px] text-[14px] font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
