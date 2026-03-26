"use client";
import { useEffect, useState } from "react";

export default function WorkbenchPage() {
  const [state, setState] = useState<any>(null);
  const [input, setInput] = useState("");

  async function load() {
    const res = await fetch("/api/workbench");
    setState(await res.json());
  }

  async function run() {
    const res = await fetch("/api/workbench", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    setState(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Relational Workbench</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe situation"
        style={{ width: "100%", height: 80 }}
      />

      <button onClick={run}>Run</button>

      {state && (
        <div style={{ marginTop: 24 }}>
          <h3>Synthesis</h3>
          <pre>{JSON.stringify(state.currentSynthesis, null, 2)}</pre>

          <h3>Field</h3>
          <pre>{JSON.stringify(state.bowenField, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
