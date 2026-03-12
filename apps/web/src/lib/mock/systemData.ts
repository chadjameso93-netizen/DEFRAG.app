export const mockRelationships = [
  { id: "rel_1", source_name: "You", target_name: "Partner", relationship_type: "personal", tension_score: 0.62, trust_score: 0.58 },
  { id: "rel_2", source_name: "You", target_name: "Parent", relationship_type: "family", tension_score: 0.48, trust_score: 0.66 },
  { id: "rel_3", source_name: "You", target_name: "Sibling", relationship_type: "family", tension_score: 0.71, trust_score: 0.44 },
]

export const mockEvents = [
  { id: "evt_1", event_type: "conflict", actor: "You", target: "Sibling", severity: 0.7, notes: "Tension increased after a short exchange.", created_at: new Date().toISOString() },
  { id: "evt_2", event_type: "repair", actor: "You", target: "Partner", severity: 0.3, notes: "Conversation became calmer after a pause.", created_at: new Date().toISOString() },
  { id: "evt_3", event_type: "stress", actor: "Parent", target: "You", severity: 0.5, notes: "Outside pressure appears to be affecting communication.", created_at: new Date().toISOString() },
]
