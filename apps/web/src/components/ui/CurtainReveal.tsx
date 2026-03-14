"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface CurtainRevealProps {
  children: ReactNode
  className?: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export function CurtainRevealContainer({ children, className = "" }: CurtainRevealProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function CurtainRevealItem({ children, className = "" }: CurtainRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div variants={itemVariants}>{children}</motion.div>
    </div>
  )
}
