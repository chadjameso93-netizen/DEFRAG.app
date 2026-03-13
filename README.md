# Defrag

Defrag is a relational intelligence platform that helps people understand patterns in relationships, families, and teams.

## Local development

1. Copy environment template

   cp .env.example .env

2. Start infrastructure

   docker compose up -d

3. Start API

   cd apps/api
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

4. Start web

   cd apps/web
   npm install
   npm run preview:dev

5. Open local preview

   http://localhost:3000
