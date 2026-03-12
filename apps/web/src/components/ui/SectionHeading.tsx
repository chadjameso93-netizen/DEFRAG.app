export default function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{title}</h2>
      {body ? <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">{body}</p> : null}
    </div>
  )
}
