from app.db import get_pool

async def list_relationships(user_id: str):
    pool = await get_pool()
    async with pool.acquire() as conn:
        rows = await conn.fetch("""
            select r.id, r.user_id, r.source_person_id, r.target_person_id,
                   r.relationship_type, r.tension_score, r.trust_score,
                   sp.name as source_name, tp.name as target_name
            from relationships_v2 r
            join persons sp on sp.id = r.source_person_id
            join persons tp on tp.id = r.target_person_id
            where r.user_id = $1
            order by r.created_at desc
        """, user_id)
    return [dict(row) for row in rows]

async def create_relationship(data: dict):
    pool = await get_pool()
    async with pool.acquire() as conn:
        row = await conn.fetchrow("""
            insert into relationships_v2 (user_id, source_person_id, target_person_id, relationship_type, tension_score, trust_score)
            values ($1, $2, $3, $4, $5, $6)
            returning id, user_id, source_person_id, target_person_id, relationship_type, tension_score, trust_score
        """, data["user_id"], data["source_person_id"], data["target_person_id"], data["relationship_type"], data.get("tension_score"), data.get("trust_score"))
    return dict(row)
