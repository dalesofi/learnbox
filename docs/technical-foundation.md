# LEARNBOX — Technical Foundation (MVP, frontend-first)

This document translates the product scope in [`learnbox-mvp.md`](../learnbox-mvp.md) into engineering agreements for the **first implementation phase**: a Vite-based SPA using **mock data** and clear **swap points** for a future backend. It is the technical counterpart to the product MVP and to [`plan.md`](../plan.md).

---

## 1. Goals and non-goals

### Goals (this phase)

- **Landing:** Communicate what Learnbox is, who it is for, how personalization works, the subscription concept, and **who stands behind the product**: a **local provider network** of **women- and non-binary-led** small companies that **employ people with different abilities**, framed as a **territory-rooted, mission-driven** partnership (see product doc). **Storytelling only** on the landing page for MVP — no per-provider catalog or portfolio shopping flows.
- **Conversational onboarding (UI):** Guided flow collecting the same *categories* of information as the MVP (shipping, children count/ages, proficiency, challenges, usage scenarios, interests). Implementation can be step-by-step screens or a single flow component; behavior is **client-side** with optional `localStorage` for persistence during prototyping.
- **Recommendations (UI):** Present curated Learnbox suggestions aligned with the captured profile using **rules-based ranking** over a **mock catalog** (see §5).
- **Subscription selection (UI):** Tier, frequency, and preferred themes as selectable options (mock plans).
- **Checkout & shipping (UI):** Order summary and shipping details form; **no real payment or fulfillment**.
- **“Build your own Learnbox” (MVP):** Announced only — teaser UI plus waitlist or “coming soon” path (mock submit acceptable).

### Non-goals (explicitly deferred)

- Production **payments**, **tax**, **invoicing**.
- Real **warehouse / fulfillment**, **carrier APIs**, **inventory**.
- **Accounts / auth** (login, sessions, password reset) unless added in a later milestone.
- Full **personalization engine**, **analytics pipeline**, **A/B** infrastructure.
- **Mascot**-heavy experience (future per product doc).
- **Multi-language** product UI (copy can stay English until a later milestone).
- **Per-provider catalog browsing**, **portfolio pick-and-choose**, or **multi-supplier line-item checkout** (deferred for logistics and operations; landing may reference the network only).

---

## 2. User journeys → routes and states

Map the MVP “Main User Journey” to SPA routes (base path `/`):

| MVP step | Route (suggested) | Notes |
|----------|-------------------|--------|
| 1 — Landing | `/` | Entry; CTA into onboarding. Includes a **provider network** section (copy + layout): local, inclusive leadership and employment, mission; **no** links or flows that imply choosing SKUs from individual supplier catalogs until a later milestone. |
| 2 — Onboarding | `/onboarding` | Sub-routes or query steps optional (`/onboarding?step=3`). |
| 3 — Recommendations | `/recommendations` | Reads from in-memory profile or mock “session” store. |
| 4 — Subscription selection | `/subscribe` | Mock tiers/frequency/themes. |
| 5 — Checkout & shipping | `/checkout` | Prototype-only confirmation. |
| BYO / waitlist | `/build-your-own` | Coming soon + waitlist (mock). |

**Swap point:** A small module (e.g. `src/services/profile.ts` or `src/api/client.ts`) should define async functions that today return mocks and later call `fetch` to a real API without changing route components beyond loading/error states.

---

## 3. Mock data contracts (JSON shapes)

These shapes are **UI-facing**; backend may normalize differently later.

### 3.1 `Address`

```ts
type Address = {
  line1: string;
  line2?: string;
  city: string;
  region?: string; // state/province
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2 recommended
};
```

### 3.2 `ChildProfile`

```ts
type EnglishLevel = "beginner" | "intermediate" | "advanced" | "native_like";

type ChildProfile = {
  id: string;
  age: number; // 4–12 in MVP audience
  englishLevel: EnglishLevel;
  interests: string[]; // controlled tags + custom strings from MVP list
  learningChallenges?: string;
};
```

### 3.3 `FamilyProfile` (onboarding aggregate)

```ts
type UsageScenario =
  | "travel"
  | "school_support"
  | "weekend_family"
  | "remote_living"
  | "other";

type FamilyProfile = {
  shippingAddress: Address;
  children: ChildProfile[];
  usageScenarios: UsageScenario[];
  biggestChallenges?: string;
  updatedAt: string; // ISO datetime
};
```

### 3.4 `Learnbox` (catalog item)

```ts
type Learnbox = {
  id: string;
  title: string;
  theme: string;
  ageRange: { min: number; max: number };
  difficulty: "gentle" | "standard" | "stretch";
  summary: string;
  activityTypes: string[];
};
```

### 3.5 `SubscriptionSelection`

```ts
type BillingFrequency = "monthly" | "every_2_months" | "quarterly";

type SubscriptionTier = "explore" | "grow" | "immerse"; // labels TBD by product

type SubscriptionSelection = {
  tier: SubscriptionTier;
  frequency: BillingFrequency;
  preferredThemes: string[];
};
```

### 3.6 `CheckoutDraft`

```ts
type CheckoutDraft = {
  profile: FamilyProfile;
  recommendedBoxIds: string[];
  subscription: SubscriptionSelection;
  acknowledgements?: { terms: boolean; subscription_disclaimer: boolean };
};
```

---

## 4. Frontend architecture (Vite SPA)

### Stack (current decision)

- **Vite** + **React** + **TypeScript** in the `web/` application directory (see repository layout).
- **React Router** for journey navigation.
- **CSS** with **design tokens** as CSS custom properties in a dedicated file (see §7) — no requirement for Tailwind or CSS-in-JS for MVP foundations.

### Structure (guideline)

- `src/routes/` or `src/pages/` — top-level screens per §2.
- `src/components/` — shared UI (layout, buttons, form fields).
- `src/mocks/` — static JSON or TS constants for catalog and plans.
- `src/lib/` — recommendation rules, formatters, small utilities.
- `src/state/` or `src/context/` — optional thin global state for onboarding draft; keep **minimal** and prefer lifting state only where multiple steps need it.

### State strategy

- **Onboarding draft:** React state + optional `localStorage` key (e.g. `learnbox:onboarding`) for refresh resilience during demos.
- **URL:** Use route params/query for deep-linking onboarding step only if UX needs it; otherwise keep internal step state.

### Accessibility (acceptance-oriented)

Aligned with MVP intent (WCAG-inspired, NNGroup-style clarity):

- **Keyboard:** All interactive controls reachable in logical order; visible focus styles using tokenized outline/color.
- **Labels:** Inputs have associated `<label>` or `aria-label`; error text tied with `aria-describedby`.
- **Contrast:** Text and controls meet **WCAG 2.2 AA** for normal text where feasible using token defaults; document any intentional large-display exceptions.
- **Touch targets:** Minimum ~44×44 CSS px for primary actions on small breakpoints.
- **Motion:** Respect `prefers-reduced-motion` for non-essential animations.
- **Semantics:** One `h1` per view; headings reflect outline; landmarks (`header`, `main`, `nav`, `footer`) on shell layout.

---

## 5. Recommendation behavior (MVP)

Until a server-side engine exists:

- Maintain a **mock catalog** of `Learnbox` items in `src/mocks/`.
- Implement a **pure function** e.g. `rankLearnboxes(profile: FamilyProfile, catalog: Learnbox[]): Learnbox[]` that scores:

  - **Age fit:** overlap between child ages and `ageRange`.
  - **Interests / theme:** string overlap between child `interests` and box `theme` / keywords.
  - **Level:** map `englishLevel` to preferred `difficulty`.
  - **Lifestyle:** light weighting for `usageScenarios` (e.g. travel → compact/portable wording in metadata later; for mock data use tags on boxes).

- **Transparency:** UI may show a short “why we picked these” line using deterministic reasons derived from the same function (keeps trust high for parents).

**Swap point:** Replace `rankLearnboxes` body with an API call returning ranked IDs; keep the same return type for the UI.

---

## 6. Logical data model (entities)

Mirrors “Core Entities” in the product doc; fields marked **UI** are required for the prototype screens; **Future** indicates persistence/services later.

| Entity | Fields (logical) | MVP phase |
|--------|-------------------|-----------|
| **User** (parent) | name optional, email optional for waitlist only | **UI** / local mock |
| **Address** | as §3.1 | **UI** |
| **Child** | age, english level, interests, challenges | **UI** |
| **Learnbox** | theme, age range, difficulty, activity types | **UI** mock catalog |
| **Subscription** | tier, frequency, preferred themes, status | **UI** selection only |
| **Recommendation inputs** | onboarding answers, edits, engagement | **UI** minimal; engagement **Future** |
| **Provider** | narrative fields (mission, territory, leadership, inclusive practices); future catalog/portfolio IDs; ops metadata | **Future** for commerce; **MVP** optional static copy only (no new API contract required) |

---

## 7. Design system (tokens)

- **Location:** `web/src/styles/tokens.css` (or equivalent) defines `:root { ... }` custom properties: color, spacing, typography scale, radii, shadows, motion.
- **Consumption:** Components use `var(--token-name)` only — no hard-coded hex in new components unless exceptional.
- **Editability:** Designers or PMs can tune the MVP look by editing **tokens only** without touching React logic.
- **Brand alignment:** Defaults aim at “minimal but playful”: clean base, pastel secondaries, vibrant accents (tunable). See visual direction in [`learnbox-mvp.md`](../learnbox-mvp.md).

---

## 8. Integrations (deferred / TBD)

| Integration | MVP phase | Notes |
|-------------|-----------|--------|
| Authentication | **Not in v0** | No real accounts. |
| Payments (Stripe, etc.) | **Not in v0** | Checkout is demonstrative. |
| Email / notifications | **TBD** | Waitlist could POST to future endpoint. |
| CMS (marketing copy) | **Optional** | Can remain in-repo strings initially; **provider section** may pull from static markdown/JSON until a CMS exists. |
| Analytics | **TBD** | Privacy-first choice later. |
| Address validation / geocoding | **TBD** | Manual entry only in v0. |
| Order management / OMS | **Not in v0** | |

---

## 9. Risks and open questions

- **Checkout without payments:** Clearly label internally and in demos as **non-binding** to avoid misleading testers.
- **Legal / subscription copy:** Terms, cancellation, shipping regions — needs stakeholder/legal input before any “real” launch.
- **Privacy (GDPR / COPPA-adjacent):** Collecting data about children requires strict policy when moving beyond local mocks; document retention and consent **before** production backend stores child data.
- **Internationalization:** Product MVP is English-forward; expansion is a later architectural decision (i18n framework, content pipeline).

---

## 10. Repository layout (reference)

```
learnbox/
├── learnbox-mvp.md          # Product source of truth
├── plan.md                  # Engineering milestones
├── docs/
│   └── technical-foundation.md
└── web/                     # Vite + React + TS application
    ├── src/
    │   ├── styles/tokens.css
    │   ├── mocks/
    │   └── ...
    └── package.json
```

---

## Document control

| Version | Date | Notes |
|---------|------|--------|
| 0.1 | 2026-05-13 | Initial technical foundation for frontend-first MVP. |
| 0.2 | 2026-05-13 | Landing provider-network goals; defer per-provider catalog UX; Provider entity noted as future. |
