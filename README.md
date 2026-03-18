# Defrag

Defrag is a relational intelligence platform built as a monorepo with:

- `apps/web` — Next.js frontend and product-facing API routes
- `apps/api` — Python API services
- `infra/` — Supabase migrations and infrastructure assets

## Quickstart

1. Copy the environment template
   - `cp .env.example .env`
2. Install workspace dependencies
   - `pnpm install`
3. Start the web app
   - `cd apps/web`
   - `pnpm preview:dev`
4. Start the API app
   - `cd apps/api`
   - `python3 -m venv .venv`
   - `source .venv/bin/activate`
   - `pip install -r requirements.txt`
   - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

## Validation

- Web build: `cd apps/web && pnpm build`
- Web tests: `cd apps/web && pnpm test`
- API compile check: `python -m compileall apps/api/app`

## CI

GitHub Actions runs:

- Python compile validation for `apps/api`
- Web dependency install, build, and tests for `apps/web`

## Staging

- Preview deploys use Vercel.
- Standard preview flow:
  - `vercel deploy apps/web -y`
- After deploy, smoke test:
  - onboarding page loads
  - `GET /api/me`
  - onboarding submit returns expected auth/validation behavior

## Notes

- Use `pnpm` for JavaScript workspace commands.
- Keep `.env.example` current when adding required configuration.
