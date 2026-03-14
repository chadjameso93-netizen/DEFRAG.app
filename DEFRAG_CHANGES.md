# DEFRAG.app — Implementation Changes

All changes align the codebase with the canonical build spec. Build compiles cleanly under `next build` (Next.js 16.1.6 / Turbopack, 42 routes).

---

## 1. Build & Infrastructure Fixes

### Module-Level SDK Instantiation
Next.js fails at page data collection when SDKs are instantiated at module scope without env vars. Converted all to lazy factory functions:
- `api/billing/checkout/route.ts` — `new Stripe(...)` → `getStripe()` called inside handler
- `api/billing/portal/route.ts` — same
- `api/billing/create-checkout/route.ts` — same
- `api/stripe/webhook/route.ts` — same
- `src/lib/ai/pipeline.ts` — `new OpenAI(...)` → `getOpenAI()` called inside pipeline

### Stripe SDK v20 Breaking Changes
- `current_period_end` moved from `Subscription` to `SubscriptionItem` in Stripe v20.4.1
- Updated all access: `sub.current_period_end` → `sub.items.data[0].current_period_end`
- Fixed Supabase client type mismatch in `findUserByCustomer` parameter

### Deleted Stale Files
- `src/components/dashboard/DashboardShell.tsx` — imported non-existent `@/components/ui/Sidebar`
- `src/app/api/stripe/webhook.ts` — duplicate non-route file

---

## 2. Database Schema

**File:** `infra/supabase/migrations/0003_full_schema_rls.sql`

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profile (full_name, focus_area, natal_data, goals) | Own rows via `auth.uid()` |
| `relationships` | People in user's system (target_name, type, trust/tension/closeness) | Own rows via `auth.uid()` |
| `system_events` | Timeline events (conflict, repair, stress, observation) | Own rows via `auth.uid()` |
| `insight_runs` | AI pipeline results (output_text, proof_json, model, tokens, cost) | Own rows via `auth.uid()` |
| `entitlements` | Billing plan, status, Stripe IDs, usage counters | Own rows via `auth.uid()` |
| `stripe_events` | Webhook idempotency store | Service role only (deny-all user RLS) |

---

## 3. Type System & Entitlements

**`src/lib/types.ts`** — TypeScript interfaces for all domain objects:
- `Profile`, `Relationship`, `SystemEvent`, `InsightRun`, `Entitlement`, `StripeEvent`
- `ProofJson` — 12-stage reasoning proof schema
- `PLAN_LIMITS` — quota constants per plan (free: 5 insights/2 relationships, solo: 100/25, team: unlimited)

**`src/lib/entitlements.ts`** — Plan-gated feature checks:
- `getEntitlement()`, `canUseInsights()`, `canUseSimulations()`, `canUseTimeline()`

---

## 4. 9-Step Onboarding Flow

**Store:** `src/lib/store/onboarding.ts` (Zustand)

**Steps** (each in `src/components/onboarding/`):
1. `StepWelcome` — intro with brand mesh
2. `StepFocus` — relationship focus area selection
3. `StepAccount` — email/password signup via Supabase auth
4. `StepNatal` — optional birth data
5. `StepPrivacy` — privacy consent
6. `StepFirstRelationship` — add first person
7. `StepFirstEvent` — log first event
8. `StepFirstInsight` — run AI pipeline, display result
9. `StepGuidedTour` — summary + CTA to dashboard

**Page:** `src/app/onboarding/page.tsx` — orchestrates all steps with progress indicator.

---

## 5. AI Insight Pipeline

**`src/lib/ai/pipeline.ts`** — 12-stage reasoning pipeline:
- Context assembly → system prompt → OpenAI call (gpt-4o-mini) → ProofJson construction
- Fallback handling when OpenAI unavailable
- Cost estimation per call

**Exports:** `runInsightPipeline(input)` → `{ output_text, proof_json, model, total_tokens, estimated_cost_usd }`

---

## 6. API Routes

### New Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/insights` | POST | AI pipeline with entitlement gating, persists to `insight_runs` |
| `/api/insights/[id]/proof` | GET | Retrieve proof JSON for a specific insight |
| `/api/billing/checkout` | POST | Create Stripe checkout session (creates/reuses customer) |
| `/api/billing/portal` | POST | Create Stripe billing portal session |

### Replaced Routes (mockDb → Supabase)
| Route | Methods | Changes |
|-------|---------|---------|
| `/api/relationships` | GET, POST | Auth-gated, plan-based relationship limits, Supabase CRUD |
| `/api/events` | GET, POST | Auth-gated, optional `relationship_id` filter, Supabase CRUD |
| `/api/profile` | GET, PUT | Auth-gated, upsert logic for creation/update |
| `/api/stripe/webhook` | POST | Signature verification, idempotency, 4 event handlers |

---

## 7. Stripe Billing

**Checkout** (`/api/billing/checkout`):
- Looks up/creates Stripe customer, stores `supabase_user_id` in session metadata
- Upserts entitlement with customer ID

**Portal** (`/api/billing/portal`):
- Creates self-service portal session from existing customer ID

**Webhook** (`/api/stripe/webhook`):
- Signature verification via `stripe.webhooks.constructEvent`
- Idempotency via `stripe_events` table
- Handles: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

---

## 8. Core App Surface Updates

- **AIChat** — switched from `/api/insight` to `/api/insights`, updated response parsing
- **SettingsPanels** — added billing portal button, privacy panel, danger zone
- **AddRelationshipForm** — expanded types (partner/parent/sibling/friend/colleague/child/other)
- **PremiumFooter** — added /why, /about, /principles links

---

## 9. Public Pages

| Page | Path | Content |
|------|------|---------|
| Why Defrag | `/why` | Problem with reaction, what context changes, differentiators |
| About | `/about` | What Defrag is/isn't, 3-step how-it-works |
| Principles | `/principles` | 8 design principles (clarity, agency, context, specificity, safety, privacy, transparency, not-therapy) |

All pages use dark monochrome design with BrandMesh, GlowCard, PremiumFooter.

---

## File Summary

### New Files (20)
- `infra/supabase/migrations/0003_full_schema_rls.sql`
- `src/lib/types.ts`, `src/lib/entitlements.ts`, `src/lib/store/onboarding.ts`, `src/lib/ai/pipeline.ts`
- 9 onboarding step components in `src/components/onboarding/`
- `src/app/api/insights/route.ts`, `src/app/api/insights/[id]/proof/route.ts`
- `src/app/api/billing/checkout/route.ts`, `src/app/api/billing/portal/route.ts`
- `src/app/why/page.tsx`, `src/app/about/page.tsx`, `src/app/principles/page.tsx`

### Modified Files (10)
- `src/app/onboarding/page.tsx`
- `src/app/api/events/route.ts`, `src/app/api/profile/route.ts`, `src/app/api/relationships/route.ts`
- `src/app/api/stripe/webhook/route.ts`, `src/app/api/billing/create-checkout/route.ts`
- `src/components/chat/AIChat.tsx`, `src/components/settings/SettingsPanels.tsx`
- `src/components/relationships/AddRelationshipForm.tsx`, `src/components/marketing/PremiumFooter.tsx`

### Deleted Files (2)
- `src/components/dashboard/DashboardShell.tsx`
- `src/app/api/stripe/webhook.ts`

---

## Build Status

Compiles cleanly with **42 routes** (static + dynamic), zero TypeScript errors. Verified with `npx next build`.
