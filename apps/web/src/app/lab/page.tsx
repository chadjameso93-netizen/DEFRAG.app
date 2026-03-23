"use client"

import { useState } from "react"

export default function LabPage() {
  const [input, setInput] = useState("")
  const [storyboard, setStoryboard] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)

  async function generateStoryboard() {
    const res = await fetch("/api/storyboard", {
      method: "POST",
      body: JSON.stringify({ input }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()
    setStoryboard(data.storyboard)
  }

  async function generateImage() {
    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await res.json()
    setImage(data.image)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">Defrag Relational Media Lab</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe a relational situation..."
        className="w-full h-32 bg-neutral-900 p-4 rounded-md mb-4"
      />

      <div className="flex gap-4 mb-6">
        <button onClick={generateStoryboard} className="px-4 py-2 bg-white text-black rounded">
          Generate Storyboard
        </button>
        <button onClick={generateImage} className="px-4 py-2 bg-white text-black rounded">
          Generate Visual
        </button>
      </div>

      {storyboard && (
        <div className="mb-6">
          <h2 className="text-lg mb-2">Storyboard</h2>
          <pre className="bg-neutral-900 p-4 rounded">{storyboard}</pre>
        </div>
      )}

      {image && (
        <div>
          <h2 className="text-lg mb-2">Generated Visual</h2>
          <img src={image} alt="Generated" className="rounded" />
        </div>
      )}
    </div>
  )
}
