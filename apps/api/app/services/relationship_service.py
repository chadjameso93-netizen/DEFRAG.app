def list_relationships():
    return {
        "relationships": [
            {
                "id": "rel_1",
                "source_name": "You",
                "target_name": "Partner",
                "relationship_type": "personal",
                "tension_score": 0.62,
                "trust_score": 0.58,
            },
            {
                "id": "rel_2",
                "source_name": "You",
                "target_name": "Sibling",
                "relationship_type": "family",
                "tension_score": 0.71,
                "trust_score": 0.44,
            },
        ]
    }

def create_relationship(data: dict):
    return {"ok": True, "relationship": data}
