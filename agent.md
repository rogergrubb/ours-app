# Agent Memory — OURS Platform

## 1. Project Overview
- **What**: User-owned social media platform with 8 content zones, HOURS token economy, creator storefronts, and quarterly revenue sharing
- **Primary users**: Content creators (who need monetization + ownership) and viewers (who need dopamine + discovery)
- **Non-goals**: Not a cryptocurrency exchange, not a DAO, not a blockchain project. HOURS are internal platform credits only.

## 2. Definition of Done (DoD)

### Functional Requirements
- [ ] User signup/login (magic link + OAuth)
- [ ] Content creation across 8 zones (Feed, Watch, Read, Listen, Shop, Explore, Community, Govern)
- [ ] HOURS earning on every qualifying action
- [ ] HOURS tipping between users
- [ ] Creator storefronts with products + memberships
- [ ] Real-time notifications (live alerts, tips, engagement)
- [ ] Per-creator notification subscriptions (SMS, push, in-app)
- [ ] Ownership tiers calculated from HOURS balance
- [ ] Daily brief delivered via Telegram
- [ ] Revenue tracking dashboard

### Non-Functional Constraints
- Performance: Lighthouse > 90, FCP < 1.5s
- Cost: Zero recurring subscriptions where possible, free-tier services preferred
- Legal: All HOURS displays include disclaimers. No securities language.
- UX: Mobile-first (375px–440px), dark theme, glass morphism
- Accessibility: WCAG 2.1 AA minimum

### Platforms
- Web: Vercel deployment (github.com/rogergrubb/ours-app)
- Backend: Hetzner server
- Bot: Telegram (@MiniMeeeeeeeBot for ops, @Rogergrubbbot for briefs)

### Out of Scope (for now)
- Native mobile apps (iOS/Android)
- Fiat payment processing
- Blockchain/on-chain anything
- Multi-language support

## 3. Current State

### Build Status
- **Frontend**: 20 prototype pages, 14,300+ lines of React (CSS-in-JS)
- **Backend**: None — all pages are stateless prototypes
- **Database**: None — no schema designed yet
- **Real-time**: None — no WebSocket infrastructure
- **Auth**: Prototype UI only — no real authentication

### Deployment Status
- GitHub: rogergrubb/ours-app (public)
- Vercel: Connected to GitHub, auto-deploys on push
- Vercel team: team_h4aVKRrQ17g4dZCH1XgVsMR5

### Known Blockers
- No backend = every feature is cosmetic only
- No database = no persistent data
- No auth = no real user accounts
- No HOURS ledger = economy is fictional

## 4. Architecture & Design Decisions

### Decided
- **Framework**: React 18 + Vite (fast builds, lazy loading)
- **Styling**: CSS-in-JS inline styles (no external CSS framework)
- **Fonts**: Outfit (body), DM Mono (data), Playfair Display (editorial)
- **Theme**: Dark mode only (#030712 base), glass morphism, micro-animations
- **Routing**: React Router v6 with lazy-loaded pages
- **Deployment**: Vercel (free tier) with GitHub integration
- **Design**: Mobile-first, max-width 440px, no desktop layout yet
- **HOURS model**: Internal platform credits, NOT crypto/securities

### Pending Decisions (for team)
- Database: PostgreSQL vs SQLite vs Supabase
- Backend framework: Express vs Fastify vs Hono
- Auth: Custom magic link vs Supabase Auth vs Clerk (free tier)
- Real-time: Socket.io vs native WebSocket vs Ably free tier
- Video: Self-hosted FFmpeg vs Mux vs Cloudflare Stream
- File storage: Hetzner volumes vs Cloudflare R2 vs Backblaze B2

## 5. Known Issues & Landmines
- All 20 pages are standalone components with duplicated theme objects — needs centralized design tokens
- Some pages reference channels/creators that don't match across pages (Maya Chen data not consistent)
- HOURS earning rates shown are illustrative — need to decide on real rates
- No error boundaries in any component
- No loading states for real data fetching
- GitHub token was exposed in chat — MUST be rotated

## 6. Debug History
- **Vercel 404 on routes**: Fixed by adding vercel.json with SPA rewrite rule
- **Git dubious ownership**: Fixed with `git config --global --add safe.directory`
- **Build failures**: None so far — clean builds on all commits

## 7. Proven Patterns
- CSS-in-JS with theme object (T.primary, T.surface, etc.) — consistent, works everywhere
- Lazy loading pages via React.lazy + Suspense — keeps initial bundle small
- Bottom sheets for modals — good mobile UX pattern
- Floating hearts animation — engagement feedback that feels alive
- HOURS disclaimers on every tipping/earning surface — legal protection

## 8. Failed Approaches
- (None yet — project is new)

## 9. Open Questions / Unknowns
1. What database will we use? (CDE decision)
2. How will HOURS transfers be atomic? (CDE + CP decision)
3. Video streaming architecture for live? (CCOMM decision)
4. How do we handle content moderation at scale? (CC + CUX decision)
5. What's the real HOURS earning rate table? (Lead decision with CFO input)

## 10. Next Actions
1. **CDE**: Design core database schema (users, content, hours_ledger, zones)
2. **CP**: Set up backend project structure on Hetzner
3. **CCOMM**: Research and recommend real-time stack (WebSocket + notifications)
4. **CUX**: Extract design tokens from existing pages into single source of truth
5. **CC**: Audit all 20 prototype pages for consistency issues and legal compliance
6. **ALL**: Decide on database (PostgreSQL on Hetzner is likely winner)
