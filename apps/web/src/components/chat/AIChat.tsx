"use client"

import { useState } from "react"

export default function AIChat() {

  const [msg,setMsg] = useState("")
  const [reply,setReply] = useState("")

  async function send() {

    const res = await fetch("/api/insight",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({ message:msg })
    })

    const data = await res.json()

    setReply(data.insight)
  }

  return (

    <div className="border rounded-xl p-6">

      <h2 className="text-lg font-medium mb-4">
        Ask the Defrag AI
      </h2>

      <input
        className="w-full border rounded-lg px-3 py-2"
        value={msg}
        onChange={e=>setMsg(e.target.value)}
        placeholder="Describe a situation"
      />

      <button
        className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
        onClick={send}
      >
        Analyze
      </button>

      {reply && (
        <p className="mt-4 text-zinc-600">{reply}</p>
      )}

    </div>
  )
}
