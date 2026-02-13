# OURS — The Platform That Pays You Back

> User-owned social media. 70% revenue shared. Zero data selling. You are the product AND the owner.

## What Is OURS?

OURS is a social media platform where every user is an owner. Instead of extracting value from users, OURS shares 70% of platform revenue back to the community through a contribution-based system called **HOURS**.

HOURS can't be bought — only earned through genuine contribution. They determine your ownership tier, your share of platform revenue, and your voice in governance.

## Architecture

The app is organized into **8 Content Zones**, each serving a different type of social interaction:

| Zone | Purpose | Status |
|------|---------|--------|
| 🏠 Feed | Posts, text, polls, images | Prototype |
| 🎬 Watch | Video content & live streaming | Prototype |
| 📚 Read | Articles, long-form writing | Prototype |
| 🎵 Listen | Audio rooms, podcasts, music | Prototype |
| 🛍️ Shop | Creator marketplace (95% to creator) | Prototype |
| 🌍 Explore | Visual discovery, challenges | Prototype |
| 💬 Community | Groups, discussions, forums | Prototype |
| 🏛️ Govern | Proposals, voting, platform decisions | Prototype |

## Pages Built

### Core Experience
- **`ours-homepage.jsx`** — Editorial manifesto landing page
- **`ours-auth.jsx`** — 6-screen auth flow (magic link, OAuth, human verification)
- **`ours-feed.jsx`** — Full social feed with 9 post types, stories, reactions, comments, tipping
- **`ours-live.jsx`** — Live streaming: building in public, podcasts, coworking, ambient
- **`ours-notifications.jsx`** — Notification center with per-creator subscriptions, SMS/push/in-app
- **`ours-hours-economy.jsx`** — Complete HOURS token economy explainer with simulator

### Supporting Pages
- **`ours-candy-store.jsx`** — Zone-based logged-in home experience
- **`ours-creator.jsx`** — Universal content creator (8 content types)
- **`ours-compose.jsx`** — Quick compose flow
- **`ours-onboarding.jsx`** — New user onboarding
- **`ours-profile.jsx`** — User profile
- **`ours-search.jsx`** — Search & discovery
- **`ours-messages.jsx`** — Messaging
- **`ours-wallet.jsx`** — HOURS wallet
- **`ours-watch.jsx`** — Video zone

### Planning & Architecture
- **`ours-app.jsx`** — Full 18-page clickable prototype
- **`ours-site-architecture.jsx`** — Interactive 80+ page sitemap
- **`ours-mvp-v2.jsx`** — 20×20 Blueprint (product strategy)

## The HOURS Economy

```
You Create → Earn HOURS → Circulate (tip/spend/hold) → Tier Up → Revenue Share → Reinvest
```

### Ownership Tiers
| Tier | HOURS | Rev Share Target |
|------|-------|-----------------|
| 👁️ Observer | 0–99 | 0% |
| 🌱 Contributor | 100–999 | 0.5% |
| 🔥 Creator | 1,000–4,999 | 2% |
| ⚡ Builder | 5,000–24,999 | 5% |
| 🏗️ Architect | 25,000–99,999 | 12% |
| 👑 Founder | 100,000+ | 25% |

## Tech Stack

- **Frontend**: React (standalone components with CSS-in-JS)
- **Fonts**: Outfit (body), DM Mono (data), Playfair Display (editorial)
- **Design**: Dark theme, glass morphism, micro-animations
- **Deployment**: Vercel

## Legal Disclaimer

*All HOURS earnings and revenue sharing percentages shown are illustrative targets, not guarantees. HOURS are not cryptocurrency, securities, or fiat currency. They are internal platform credits representing contribution level. Revenue sharing has not yet begun. See Terms of Service for complete details.*

## License

Proprietary — All rights reserved. © 2026 SellFast.Now
