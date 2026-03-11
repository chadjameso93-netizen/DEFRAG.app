"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [msg,setMsg] = useState("")

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error) setMsg(error.message)
    else window.location.href="/dashboard"
  }

  return (
    <main className="mx-auto max-w-md py-20">

      <h1 className="text-3xl font-semibold">Login</h1>

      <input
        className="mt-6 w-full border rounded-lg px-4 py-3"
        placeholder="Email"
        onChange={e=>setEmail(e.target.value)}
      />

      <input
        type="password"
        className="mt-4 w-full border rounded-lg px-4 py-3"
        placeholder="Password"
        onChange={e=>setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="mt-6 w-full bg-black text-white rounded-lg py-3"
      >
        Login
      </button>

      <p className="mt-4 text-sm text-zinc-500">{msg}</p>

    </main>
  )
}
