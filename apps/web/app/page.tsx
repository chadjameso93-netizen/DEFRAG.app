export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 40, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 48, fontWeight: 600 }}>
        Understand the patterns shaping your relationships
      </h1>
      <p style={{ marginTop: 24, fontSize: 18, color: "#666" }}>
        Defrag helps you see relationship patterns clearly so you can make better decisions.
      </p>
      <a
        href="/signup"
        style={{
          display: "inline-block",
          marginTop: 32,
          background: "#111",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 12,
          textDecoration: "none"
        }}
      >
        Create account
      </a>
    </main>
  );
}
