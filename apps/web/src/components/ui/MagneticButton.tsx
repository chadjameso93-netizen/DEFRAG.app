"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  const textX = useSpring(0, springConfig)
  const textY = useSpring(0, springConfig)
  const scale = useSpring(1, { damping: 20, stiffness: 300, mass: 0.4 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || disabled) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)

      if (dist < 100) {
        const strength = (1 - dist / 100) * 8
        const moveX = (distX / dist) * strength
        const moveY = (distY / dist) * strength
        x.set(moveX)
        y.set(moveY)
        textX.set(moveX * 1.2)
        textY.set(moveY * 1.2)
      }
    },
    [disabled, x, y, textX, textY],
  )

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    x.set(0)
    y.set(0)
    textX.set(0)
    textY.set(0)
  }, [x, y, textX, textY])

  const handleMouseDown = useCallback(() => {
    if (disabled) return
    scale.set(0.97)
  }, [disabled, scale])

  const handleMouseUp = useCallback(() => {
    scale.set(1)
  }, [scale])

  const handleClick = useCallback(() => {
    if (disabled) return
    if (href) {
      window.location.href = href
    } else if (onClick) {
      onClick()
    }
  }, [disabled, href, onClick])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      style={{ x, y, scale }}
      className={`inline-block cursor-pointer ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <motion.span
        style={{ x: textX, y: textY }}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}
