import { describe, expect, it } from "vitest"
import { buildGraph } from "./BowenDisplay"

describe("BowenDisplay graph hydration", () => {
  it("returns empty-state graph when no relationships exist", () => {
    const graph = buildGraph([], [])
    expect(graph.nodes).toHaveLength(1)
    expect(graph.edges).toHaveLength(0)
  })

  it("hydrates nodes and edges from real relationships", () => {
    const graph = buildGraph(
      [
        {
          id: "rel-1",
          source_name: "You",
          target_name: "Partner",
          tension_score: 0.6,
          trust_score: 0.5,
        },
      ],
      [{ actor: "You", target: "Partner", event_type: "conflict" }]
    )

    expect(graph.nodes.length).toBeGreaterThan(1)
    expect(graph.edges).toHaveLength(1)
    expect(graph.edges[0].label).toBe("tension")
  })
})
