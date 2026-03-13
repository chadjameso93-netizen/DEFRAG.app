from app.db import get_pool

async def list_events(user_id: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            select id, user_id, relationship_id, event_type, severity, notes, occurred_at
            from events
            where user_id = $1
            order by occurred_at desc
        """, user_id)
    return [dict(row) for row in rows]

async def create_event(data: dict):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            insert into events (user_id, relationship_id, event_type, severity, notes, occurred_at)
            values ($1, $2, $3, $4, $5, $6)
            returning id, user_id, relationship_id, event_type, severity, notes, occurred_at
        """, data["user_id"], data.get("relationship_id"), data["event_type"], data["severity"], data.get("notes"), data["occurred_at"])
    return dict(row)
