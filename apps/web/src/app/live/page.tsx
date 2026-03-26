"use client";

export default function LiveLauncher() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Defrag Live System</h1>

      <ul>
        <li><a href="/ai-live">AI Live (core synthesis)</a></li>
        <li><a href="/workbench">Workbench (raw state)</a></li>
        <li><a href="/api/world-live">World API</a></li>
      </ul>

      <p>Use this page to test all live system surfaces quickly.</p>
    </div>
  );
}
