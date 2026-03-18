import { beforeEach, describe, expect, it, vi } from "vitest"

const getUser = vi.fn()
const runInsightPipeline = vi.fn()
const persistStarterArtifacts = vi.fn()

vi.mock("@/lib/supabase/server", () => ({
  createServerClient: vi.fn(async () => ({
    auth: {
      getUser,
    },
  })),
}))

vi.mock("@/lib/ai/pipeline", () => ({
  runInsightPipeline,
}))

vi.mock("@/lib/onboardingArtifacts", () => ({
  persistStarterArtifacts,
}))

describe("/api/onboarding/bootstrap", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("returns 401 when unauthenticated", async () => {
    getUser.mockResolvedValue({ data: { user: null } })
    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_name: "Alex",
          event_description: "Something happened recently.",
        }),
      }),
    )

    expect(response.status).toBe(401)
  })

  it("validates required onboarding starter fields", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-1" } } })
    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_name: "",
          event_description: "short",
        }),
      }),
    )

    expect(response.status).toBe(400)
  })

  it("generates and persists starter artifacts", async () => {
    getUser.mockResolvedValue({ data: { user: { id: "user-123" } } })
    runInsightPipeline.mockResolvedValue({ output_text: "Starter insight" })
    persistStarterArtifacts.mockResolvedValue({
      relationshipId: "rel-1",
      eventId: "evt-1",
      insight: "Starter insight",
      dailyRead: "Starter daily read",
    })

    const { POST } = await import("./route")

    const response = await POST(
      new Request("http://localhost/api/onboarding/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          relationship_name: "Alex",
          relationship_type: "partner",
          relationship_birth_date: "1990-01-01",
          event_description: "We had a difficult conversation and I keep replaying it.",
        }),
      }),
    )

    expect(response.status).toBe(200)
    expect(runInsightPipeline).toHaveBeenCalledWith(
      expect.objectContaining({
        relationship_name: "Alex",
      }),
    )
    expect(persistStarterArtifacts).toHaveBeenCalledWith(
      expect.anything(),
      "user-123",
      expect.objectContaining({
        relationshipName: "Alex",
      }),
    )
  })
})
