export default function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--surface-0)]" />
      <div className="absolute left-[-10%] top-[-5%] h-[44rem] w-[44rem] rounded-full bg-violet-500/[0.14] blur-3xl" />
      <div className="absolute right-[-6%] top-[10%] h-[38rem] w-[38rem] rounded-full bg-sky-500/[0.12] blur-3xl" />
      <div className="absolute bottom-[-10%] left-[18%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/[0.12] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.35),rgba(5,5,5,0.50))]" />
    </div>
  )
}
