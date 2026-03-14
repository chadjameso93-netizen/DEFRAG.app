export default function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--surface-0)]" />
      <div className="absolute left-[-10%] top-[-5%] h-[28rem] w-[28rem] rounded-full bg-violet-500/[0.07] blur-3xl" />
      <div className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-500/[0.07] blur-3xl" />
      <div className="absolute bottom-[-10%] left-[18%] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/[0.05] blur-3xl" />
    </div>
  )
}
