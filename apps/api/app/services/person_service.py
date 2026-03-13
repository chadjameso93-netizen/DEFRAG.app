from app.db import get_pool

async def list_persons(user_id: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            select id, user_id, name, role
            from persons
            where user_id = $1
            order by created_at desc
        """, user_id)
    return [dict(row) for row in rows]

async def create_person(data: dict):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            insert into persons (user_id, name, role)
            values ($1, $2, $3)
            returning id, user_id, name, role
        """, data["user_id"], data["name"], data.get("role"))
    return dict(row)
