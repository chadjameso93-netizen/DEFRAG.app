export default function BrandGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/30 blur-3xl" />
      <div className="absolute right-[-10%] top-[10%] h-[24rem] w-[24rem] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[20%] h-[20rem] w-[20rem] rounded-full bg-emerald-200/20 blur-3xl" />
    </div>
  )
}
