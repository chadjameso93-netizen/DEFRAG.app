def list_events():
    return {
        "events": [
            {"id": "evt_1", "event_type": "conflict", "actor": "You", "target": "Sibling", "severity": 0.7, "notes": "Tension increased after a short exchange."},
            {"id": "evt_2", "event_type": "repair", "actor": "You", "target": "Partner", "severity": 0.3, "notes": "Conversation became calmer after a pause."},
        ]
    }

def create_event(data: dict):
    return {"ok": True, "event": data}
