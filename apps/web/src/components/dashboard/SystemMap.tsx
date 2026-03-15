"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Relationship } from "@/lib/types"

interface SystemMapProps {
  relationships: Relationship[]
}

export default function SystemMap({ relationships }: SystemMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [activeNode, setActiveNode] = useState<string | null>(null)

  // Determine positions based on index
  const centerX = 300
  const centerY = 200
  const radius = 120

  const nodes = relationships.map((rel, i) => {
    const angle = (i / relationships.length) * Math.PI * 2
    return {
      id: rel.id,
      name: rel.target_name,
      tension: rel.tension_score ?? 0,
      x: centerX + Math.cos(angle) * (radius + (rel.tension_score ?? 0) * 50),
      y: centerY + Math.sin(angle) * (radius + (rel.tension_score ?? 0) * 50),
    }
  })

  // Add the "Self" node in the center
  const allNodes = [
    { id: "self", name: "You", tension: 0, x: centerX, y: centerY },
    ...nodes
  ]

  return (
    <div className="relative w-full h-[400px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-[16px] overflow-hidden flex items-center justify-center transform-gpu shadow-2xl transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,107,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence>
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id || hoveredNode === "self"
            const tensionColor = node.tension > 0.65 ? "#f87171" : node.tension > 0.45 ? "#fbbf24" : "#4F6BFF"
            const thickness = node.tension * 4 + 1
            const pulse = activeNode === node.id

            return (
              <motion.line
                key={`edge-${node.id}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={tensionColor}
                strokeWidth={isHovered ? thickness + 1 : thickness}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: isHovered ? 0.8 : 0.3, 
                  pathLength: 1,
                  strokeWidth: pulse ? thickness + 2 : (isHovered ? thickness + 1 : thickness)
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ filter: isHovered ? "drop-shadow(0 0 4px rgba(79,107,255,0.5))" : "none" }}
              />
            )
          })}
        </AnimatePresence>
      </svg>

      {allNodes.map(node => {
        const isSelf = node.id === "self"
        const isHovered = hoveredNode === node.id
        const isActive = activeNode === node.id
        const size = isSelf ? 64 : 48 + (node.tension * 20)

        return (
          <motion.div
            key={`node-${node.id}`}
            layoutId={`node-${node.id}`}
            className="absolute flex items-center justify-center cursor-pointer"
            style={{ 
              left: node.x - size / 2, 
              top: node.y - size / 2,
              width: size,
              height: size
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => setActiveNode(isActive ? null : node.id)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isActive ? 1.1 : (isHovered ? 1.05 : 1), 
              opacity: 1,
              zIndex: isActive || isHovered ? 10 : 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div 
              className={`w-full h-full rounded-full flex items-center justify-center border transition-colors duration-300 ${
                isSelf 
                  ? "bg-[#000000] border-[#EAEAEA] shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                  : "bg-[#000000] border-[#1F1F1F] hover:border-[#4F6BFF]"
              }`}
            >
              <span className={`text-[12px] font-medium ${isSelf ? "text-[#EAEAEA]" : "text-[#9A9A9A]"}`}>
                {node.name.substring(0, 10)}{node.name.length > 10 ? "..." : ""}
              </span>
            </div>
            
            {/* Active Node Detail Panel */}
            <AnimatePresence>
              {isActive && !isSelf && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-full mt-[16px] left-1/2 transform -translate-x-1/2 w-[240px] bg-[#0A0A0A] border border-[#1F1F1F] rounded-[12px] p-[16px] shadow-2xl z-50 pointer-events-none"
                >
                  <p className="text-[14px] font-medium text-[#EAEAEA]">{node.name}</p>
                  <div className="flex justify-between items-center mt-[8px]">
                    <span className="text-[12px] text-[#9A9A9A] uppercase tracking-wider">Tension</span>
                    <span className="text-[14px] text-[#EAEAEA]">{Math.round(node.tension * 100)}%</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
