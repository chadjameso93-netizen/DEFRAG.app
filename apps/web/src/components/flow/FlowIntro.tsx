export default function FlowIntro({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#555555]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#EAEAEA]">
        {title}
      </h1>
      <p className="mt-4 text-sm leading-7 text-[#9A9A9A]">
        {body}
      </p>
    </div>
  )
}
