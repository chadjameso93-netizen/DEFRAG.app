
"use client"

export default function UserTimeline(){

  const events = [
    {id:1,label:"Conversation noted",date:"Today"},
    {id:2,label:"Invitation sent",date:"Yesterday"}
  ]

  return (
    <div className="border border-white/10 rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        User Timeline
      </h2>

      <ul className="space-y-2">
        {events.map(e=>(
          <li key={e.id} className="text-white/70 text-sm">
            {e.date} — {e.label}
          </li>
        ))}
      </ul>

    </div>
  )
}
