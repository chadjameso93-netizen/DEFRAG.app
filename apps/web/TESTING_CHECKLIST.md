# Defrag Web Testing Checklist

## Local Visual Preview
1. Start backend:
   - `cd apps/api`
   - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
2. Start frontend:
   - `cd apps/web`
   - `npm install`
   - `npm run preview:dev`
3. Open `http://localhost:3000`.

## Build
- Run `npm run build`.
- Confirm no TypeScript or route build errors.

## Route Smoke Check
- Open `/dashboard`.
- Open `/ai`.
- Open `/pricing`.
- Open `/invite`.
- Open `/intake/{id}` with a known invite id.
- Open `/invite/complete`.

## Pricing
- Verify plans are exactly: `Free`, `Core`, `Developer / API`.
- Verify `Core` shows `$24/month`.
- Verify `Choose Core` triggers `/api/billing/create-checkout`.
- Verify checkout failures show a visible error message.

## Invite + Intake
- Create an invite with `email`, `sms`, and `manual` methods.
- Submit intake with name, birth date, birth time, and birth location.
- Verify redirect to `/invite/complete` after successful intake.
- Verify invite status updates to completed.
- Verify duplicate submission returns already-complete behavior.

## Auth + Persistence
- Verify unauthenticated invite create returns `401`.
- Verify invite create stores the real authenticated `created_by_user_id`.
- Verify `ALLOW_MOCK_INVITE_FALLBACK=false` blocks silent mock fallback.
- Verify `ALLOW_MOCK_INVITE_FALLBACK=true` allows local fallback only in non-production environments.

## Mobile Navigation
- Verify bottom nav includes: `Dashboard`, `Timeline`, `AI`, `People`, `Pricing`, `Settings`.
- Verify active tab styling updates by route.
- Verify no top-sheet mobile nav is rendered.
