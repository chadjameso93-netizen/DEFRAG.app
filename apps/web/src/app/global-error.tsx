"use client"

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ background: "#050505", color: "#F5F5F0", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ marginTop: "1rem", padding: "0.5rem 1.5rem", borderRadius: "1rem", background: "#F5F5F0", color: "#050505", border: "none", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
