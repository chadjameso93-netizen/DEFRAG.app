export default function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-12%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/40 blur-3xl" />
      <div className="absolute right-[-8%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[18%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.65),transparent_38%)]" />
    </div>
  )
}
