from app.db import get_pool

async def generate_insight(user_id: str, relationship_id: str | None):
    # Placeholder inference logic
    summary = (
        "Observation: Recent tension is followed by repair, but the rhythm is uneven.\n"
        "Context: When repair is inconsistent, pressure can build before the next conversation.\n"
        "Next step: A calm check-in within 24–48 hours can lower escalation risk."
    )
    confidence = 0.55
    evidence = ["Recent conflict events", "Repair event after conflict"]
    alternate = ["External stress may be driving behavior"]

    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            insert into insights (user_id, relationship_id, summary, confidence, evidence, alternate_explanations)
            values ($1, $2, $3, $4, $5, $6)
            returning id, user_id, relationship_id, summary, confidence, evidence, alternate_explanations
        """, user_id, relationship_id, summary, confidence, evidence, alternate)
    return dict(row)

async def list_insights(user_id: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            select id, user_id, relationship_id, summary, confidence, evidence, alternate_explanations
            from insights
            where user_id = $1
            order by created_at desc
        """, user_id)
    return [dict(row) for row in rows]
