import os
import asyncpg
from typing import Optional

_pool: Optional[asyncpg.Pool] = None

async def get_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        database_url = os.getenv("DATABASE_URL")
        if not database_url:
            raise RuntimeError("DATABASE_URL is not set")
        _pool = await asyncpg.create_pool(dsn=database_url)
    return _pool
