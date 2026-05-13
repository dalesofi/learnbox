# LEARNBOX — Next steps (team handoff)

Short alignment doc so **creative decisions stay human-led** while engineering can keep shipping in parallel. Deeper scope lives in [`learnbox-mvp.md`](learnbox-mvp.md), [`technical-foundation.md`](technical-foundation.md), and [`plan.md`](plan.md).

---

## Creative track (human-owned — not delegated to automation)

**Owner:** Product / design (you and collaborators).

These outputs are inputs for engineering; they should be **chosen, written, and approved by people**:

| Deliverable | Purpose | Where it lands (typical) |
|-------------|---------|---------------------------|
| **Final copy** | Landing, pillars, CTAs, disclaimers, onboarding tone, legal-adjacent microcopy | Replace strings in `web/src/` (or a future CMS); align voice to MVP doc |
| **Colour palette & brand rules** | Consistent, accessible look across light/dark | [`web/src/styles/tokens.css`](../web/src/styles/tokens.css) and any brand one-pager you maintain |
| **Visuals** | Hero kit photography or illustration, future marketing assets, optional provider imagery | `web/public/` (e.g. hero image), with **rights and consent** cleared before shipping real faces or partner marks |

**Note for engineering:** Until palette and copy are final, treat the repo as **placeholder UI** — wire structure and accessibility first, then drop in approved assets and tokens without restructuring routes.

---

## Build the product — MVP (what unlocks a credible first release)

Rough order; some items can overlap once tokens and copy exist.

1. **Router + journey shell** — React Router (or equivalent): `/`, `/onboarding`, `/recommendations`, `/subscribe`, `/checkout`, `/build-your-own` per [`plan.md`](plan.md) M3; landing stays product-first; partner story stays accurate (no fake catalog).
2. **Mock catalog + ranking** — Static `Learnbox` data + `rankLearnboxes(profile, catalog)` (rules-based) and a recommendations screen that explains “why” briefly (M4).
3. **Onboarding flow** — Steps that match MVP question categories; optional `localStorage` for demo resilience (M5).
4. **Subscribe + checkout (prototype)** — Mock tiers/frequency/themes + summary screen; **clear “not a real purchase”** disclaimer (M6).
5. **BYO / waitlist** — Teaser + email capture mock or simple backend later (M7).
6. **Accessibility & responsive pass** — Keyboard, focus, labels, contrast against **your** final palette (WCAG-oriented targets in technical foundation).

**Backend / real money (explicitly after MVP foundations unless scope changes):** auth, payments, email, inventory, and multi-supplier catalog browsing stay **out** until product and ops are ready (see technical foundation “Integrations” and MVP doc).

---

## Nice to haves and later adds (post-MVP or parallel if capacity)

- **Provider catalog & portfolio pick-and-choose** — Product + logistics milestone; not implied in current MVP UI.
- **CMS or headless content** — For marketing and provider stories once copy volume grows.
- **Analytics** — Funnel and engagement, privacy-first choice of tool.
- **Accounts & saved profiles** — Cross-device onboarding and order history.
- **Real payments & subscriptions** — Stripe (or other) + tax/shipping rules by region.
- **Email transactional** — Order confirmation, waitlist, lifecycle.
- **Deeper personalization** — Learning from engagement beyond simple rules; parent dashboard.
- **i18n** — Multi-language UI and localized kits (product roadmap territory).

---

## Document control

| Version | Date | Notes |
|---------|------|--------|
| 0.1 | 2026-05-13 | Initial next-steps: human creative track vs MVP engineering vs later. |
