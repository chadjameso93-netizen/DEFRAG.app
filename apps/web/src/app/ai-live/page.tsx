"use client";
import { useState } from "react";

export default function AILivePage() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!input) return;
    setLoading(true);

    const res = await fetch("/api/workbench-live", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setState(data);
    setLoading(false);
  }

  return (
    <div style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
      <h1>Defrag AI (Live)</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe a real situation"
        style={{ width: "100%", height: 100 }}
      />

      <button onClick={run} disabled={loading}>
        {loading ? "Thinking..." : "Analyze"}
      </button>

      {state?.currentSynthesis && (
        <div style={{ marginTop: 24 }}>
          <h3>What may be happening (you)</h3>
          <p>{state.currentSynthesis.forUser.whatMayBeHappening[0]}</p>

          <h3>What may be happening (them)</h3>
          <p>{state.currentSynthesis.forOthers[0]?.whatMayBeHappening[0]}</p>

          <h3>Dynamic</h3>
          <p>{state.currentSynthesis.betweenPeople.dominantDynamic}</p>

          <h3>Timing</h3>
          <p>{state.currentSynthesis.timing.summary}</p>
        </div>
      )}
    </div>
  );
}
