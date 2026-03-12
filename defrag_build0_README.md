# DEFRAG Build0 (Next.js 14 + Supabase + Stripe)

## Non-negotiables implemented
- Plain language only (no framework terms).
- Output contract: [What is happening] + [What it causes] + [What to do about it].
- Fixed viewport terminal UI (no scrolling).
- Palette: #080705 background, #E6D5B8 text.
- Supabase Auth: email magic link.
- Anonymous connection link intake (no recipient signup).
- Stripe Hosted Checkout + webhook + verify-session activation.

## 1) Supabase setup
1. Create a Supabase project.
2. Run the migration SQL in `supabase/migrations/0001_defrag_build0.sql`.
3. Enable Email (magic link) auth.

## 2) Stripe setup
Create 2 one-time Prices in Stripe:
- $22: access_level = `connection_single`
- $77: access_level = `family_group`

Set env vars with the Price IDs.

Webhook endpoint:
- `POST /api/commerce/webhook`

## 3) Environment variables
Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_ID_CONNECTION_SINGLE=...
STRIPE_PRICE_ID_FAMILY_GROUP=...
```

## 4) Run
- `npm run dev`

## Notes
- Mechanics flags are deterministic placeholders until the precision engine is connected.
- The app already enforces that user-visible strings cannot contain banned framework tokens.

## Ephemeris fallback (NASA/JPL Horizons)
The project includes a server-side Horizons client in `lib/ephemeris/horizons.ts` and an internal route at `GET /api/ephemeris/vectors`.

Configured defaults (Build0):
- FRAME = GEO (Earth geocenter baseline)
- DATA = POSVEL (position + velocity vectors)

Env:
- `HORIZONS_BASE_URL` (optional) default: `https://ssd.jpl.nasa.gov/api/horizons.api`

Use:
- This is intended as a precision fallback data source for the calculation service.
- The route enforces geocentric center and requires velocity components.
- Do not surface raw bodies/planet terms in UI output unless the user explicitly requests.



## Horizons configuration

This build enforces:
- FRAME: GEO (Earth geocenter baseline)
- DATA: POSVEL (position + velocity)
- TARGET_SET: 10, 199, 299, 301, 499, 599, 699, 799, 899, 999

These values are internal-only and never displayed to users.
