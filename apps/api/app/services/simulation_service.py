from app.db import get_pool

SIM_MAP = {
    "initiate_conversation": (0.25, 0.45, 0.3),
    "delay_response": (0.4, 0.2, 0.4),
    "set_boundary": (0.35, 0.35, 0.3),
    "withdraw": (0.55, 0.1, 0.35),
    "repair_attempt": (0.2, 0.6, 0.2),
}

async def run_simulation(user_id: str, relationship_id: str | None, action: str):
    probs = SIM_MAP.get(action, (0.3, 0.3, 0.4))

    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            insert into simulations (user_id, relationship_id, action, escalation_probability, repair_probability, stability_probability)
            values ($1, $2, $3, $4, $5, $6)
            returning id, user_id, relationship_id, action, escalation_probability, repair_probability, stability_probability
        """, user_id, relationship_id, action, probs[0], probs[1], probs[2])
    return dict(row)
