async function parseJson<T>(res: Response): Promise<T> {
  return res.json()
}

export async function apiPost<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  return parseJson<T>(res)
}

export async function apiPut<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  return parseJson<T>(res)
}

export async function apiGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" })

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }

  return parseJson<T>(res)
}

export interface RelationshipListResponse<T> {
  relationships: T[]
}

export interface EventListResponse<T> {
  events: T[]
}

export interface DailyReadResponse {
  insight: string
}

export function getRelationships<T>() {
  return apiGet<RelationshipListResponse<T>>("/api/relationships")
}

export function getEvents<T>(relationshipId?: string) {
  const suffix = relationshipId ? `?relationship_id=${encodeURIComponent(relationshipId)}` : ""
  return apiGet<EventListResponse<T>>(`/api/events${suffix}`)
}

export function getDailyRead() {
  return apiGet<DailyReadResponse>("/api/system")
}
