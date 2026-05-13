# LEARNBOX — Engineering plan (MVP foundations)

Execution-oriented plan for the team. Product scope and rationale live in [`learnbox-mvp.md`](learnbox-mvp.md). Technical contracts, mock shapes, and swap points live in [`technical-foundation.md`](technical-foundation.md). For **who owns copy, palette, and visuals** vs what engineering ships next, see [`next-steps.md`](next-steps.md).

---

## Principles

- **Frontend-first:** Ship navigable UX with **mock data**; no production payments or auth until a dedicated backend milestone.
- **Swap points:** Profile, catalog, ranking, and “submit” actions go through small modules that can later call real APIs without rewriting screens.
- **Tokens first:** Visual changes for demos should be achievable by editing [`web/src/styles/tokens.css`](web/src/styles/tokens.css) (CSS custom properties).

---

## Milestones

### M1 — Repository and docs

- [x] Product doc present: `learnbox-mvp.md`
- [x] Technical foundation: `technical-foundation.md`
- [x] Team handoff (creative vs engineering): `next-steps.md`
- [x] This plan: `plan.md`

**DoD:** Team can read product + technical + execution plan + handoff doc in one pass.

---

### M2 — Vite scaffold and design tokens

- [x] `web/` application: Vite + React + TypeScript
- [x] App shell: header / main / footer using semantic landmarks
- [x] Global import of `tokens.css`; base typography and background from tokens

**DoD:** `npm install` and `npm run dev` (from `web/`) launch with no errors; changing a color token visibly updates the shell.

---

### M3 — Routing and stub pages (full journey)

Stub pages (placeholder copy acceptable) wired with React Router:

| Order | Route | Purpose |
|-------|-------|---------|
| 1 | `/` | Landing (includes **provider network** section: local, women- and non-binary-led businesses, inclusive employment, mission narrative; **no** per-provider catalog or portfolio picker) |
| 2 | `/onboarding` | Conversational onboarding placeholder |
| 3 | `/recommendations` | Recommendations placeholder |
| 4 | `/subscribe` | Subscription selection placeholder |
| 5 | `/checkout` | Checkout / shipping summary placeholder |
| — | `/build-your-own` | BYO coming soon / waitlist placeholder |

**DoD:** Every route reachable from in-app navigation (minimal links or nav); browser back/forward works; 404 fallback optional but nice. Landing communicates **who makes the boxes** (values + territory) per [`learnbox-mvp.md`](learnbox-mvp.md) without implying post-MVP **provider catalog** shopping.

---

### M4 — Mock catalog and ranking (thin slice)

- [ ] `src/mocks/learnboxes.ts` (or JSON) with several `Learnbox` entries
- [ ] `rankLearnboxes(profile, catalog)` (or equivalent) per technical doc
- [ ] Recommendations page calls ranker with a **hardcoded or sample** `FamilyProfile` until onboarding state is wired

**DoD:** Recommendations page shows an ordered list and at least one deterministic “why” string tied to the ranker.

---

### M5 — Onboarding state + persistence (optional demo hardening)

- [ ] Multi-step onboarding UI aligned to MVP question categories
- [ ] Optional `localStorage` persistence for draft

**DoD:** Refresh mid-flow restores draft on same browser; recommendations can consume the stored profile.

---

### M6 — Subscription + checkout (prototype only)

- [ ] Mock subscription tiers / frequency / themes
- [ ] Checkout page reads profile + selection + shows summary
- [ ] Clear in-UI disclaimer: not a real purchase

**DoD:** Single happy path from recommendations → subscribe → checkout without console errors.

---

### M7 — BYO waitlist

- [ ] `/build-your-own` teases feature; form or button stores email locally or logs to mock handler

**DoD:** UX matches MVP “announced / coming soon” intent; no claim of customization working.

---

## Definition of done (cross-cutting)

For any milestone that ships UI:

- **Responsive:** Readable layout at ~375px and ~1280px width.
- **Accessibility smoke:** Tab through primary path; focus visible; buttons and links are real interactive elements.
- **No secrets:** No API keys in repo; env vars documented only when integrations exist.

---

## Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Product copy / tone | Product / Design | Ongoing |
| Provider stories / consent to be featured | Product / Ops | When listing real providers by name or photo |
| Illustration assets | Design | Future |
| Legal: terms, subscription, children’s data | Stakeholders / Legal | Before production |
| Backend API spec | Engineering | Post–frontend milestone |
| Payment provider | Engineering / Ops | Deferred |

---

## Out of scope (until backend milestone)

- Real authentication and user accounts
- Payment capture and webhooks
- Email sending (transactional)
- Inventory, shipping labels, carrier integration
- Full analytics and experimentation platform
- Full personalization / engagement learning loop
- **Per-provider catalog browsing** and **portfolio pick-and-choose** checkout flows (logistics and multi-supplier operations); MVP may only **tell the story** on the landing page (see product doc)

---

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Stakeholders confuse prototype checkout with real billing | Banner + internal labeling; DoD includes disclaimer |
| Child data compliance | Mocks only until policy + backend retention defined |
| Scope creep into “real” BYO | BYO remains waitlist / teaser until product re-opens scope |

---

## Local development

```bash
cd web
npm install
npm run dev
```

```bash
cd web
npm run build
npm run preview
```

---

## Document control

| Version | Date | Notes |
|---------|------|--------|
| 0.1 | 2026-05-13 | Initial engineering plan; M2–M3 implemented in repo scaffold. |
| 0.2 | 2026-05-13 | Landing provider-network narrative and explicit deferral of provider-catalog UX. |
| 0.3 | 2026-05-13 | Link to `next-steps.md`; fix relative path to technical foundation; M1 includes handoff doc. |
