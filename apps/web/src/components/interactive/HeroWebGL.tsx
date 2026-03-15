"use client"
import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Line, Sphere } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSystem() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[0.08, 16, 16]} position={[-2, 1, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[2, -1, 1]}>
        <meshBasicMaterial color="#4F6BFF" transparent opacity={0.6} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0, -2, -1]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </Sphere>
      <Line
        points={[
          [-2, 1, 0],
          [2, -1, 1],
          [0, -2, -1],
          [-2, 1, 0]
        ]}
        color="#1F1F1F"
        lineWidth={1}
        transparent
        opacity={0.3}
      />
    </group>
  )
}

export default function HeroWebGL() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <fog attach="fog" args={["#000000", 5, 15]} />
        <AnimatedSystem />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
    </div>
  )
}
