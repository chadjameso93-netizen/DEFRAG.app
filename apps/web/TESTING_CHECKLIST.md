# Defrag Web Testing Checklist

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

## Invite + Intake
- Create an invite with `email`, `sms`, and `manual` methods.
- Submit intake with name, birth date, birth time, and birth location.
- Verify redirect to `/invite/complete` after successful intake.
- Verify invite status updates to completed.

## Mobile Navigation
- Verify bottom nav includes: `Dashboard`, `Timeline`, `AI`, `People`, `Pricing`, `Settings`.
- Verify active tab styling updates by route.
- Verify no top-sheet mobile nav is rendered.
