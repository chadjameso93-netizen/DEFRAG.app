"use client"
import { useEffect, useState, useCallback, useRef } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [handleMouseMove])

  return position
}
