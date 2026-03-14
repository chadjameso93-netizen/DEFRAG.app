export default function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full"
      style={{ opacity: 0.025, mixBlendMode: "overlay" }}
    >
      <filter id="defrag-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves={3}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#defrag-noise)" />
    </svg>
  )
}
