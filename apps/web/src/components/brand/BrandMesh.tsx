export default function BrandMesh() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#f7f8fc]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_26%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.10),transparent_24%)]" />
      <div className="absolute left-[-10%] top-[-10%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-200/25 blur-3xl" />
      <div className="absolute right-[-8%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-sky-200/25 blur-3xl" />
      <div className="absolute bottom-[-12%] left-[25%] h-[24rem] w-[24rem] rounded-full bg-violet-200/20 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  )
}
