export function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
}

export async function apiGet<T>(path: string, params?: Record<string, string>) {
  const url = new URL(`${getApiBase()}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  }

  const res = await fetch(url.toString(), { cache: "no-store" })
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body: unknown) {
  const res = await fetch(`${getApiBase()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  return res.json() as Promise<T>
}
