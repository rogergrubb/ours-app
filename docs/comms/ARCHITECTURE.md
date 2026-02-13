# OURS Communications Architecture
## Chief Communications (CCOMM) — Technical Recommendation

> "Every interaction on OURS needs to feel alive. That means real-time everything."

---

## Stack Recommendation

| Layer | Choice | Why | Cost | Alternative |
|-------|--------|-----|------|-------------|
| **WebSocket** | Socket.io on Hetzner | Battle-tested, auto-reconnect, rooms, namespaces. Self-hosted = $0 extra | $0 (on existing Hetzner) | ws (lighter but no rooms), Ably (free tier: 6M messages/mo) |
| **Video Streaming** | Cloudflare Stream | $1/1000min stored, $0.01/1000min delivered. No transcoding infra to manage | ~$5-50/mo at launch | Mux ($0.007/min), self-hosted FFmpeg+HLS (free but ops heavy) |
| **Audio Rooms** | LiveKit (self-hosted) | Open source WebRTC SFU. Handles 100+ participants. Self-hosted on Hetzner | $0 (self-hosted) | Daily.co (free: 10K min/mo), Agora ($0.99/1000min) |
| **Push Notifications** | Firebase Cloud Messaging | Free, unlimited, works on all platforms | $0 | OneSignal (free: 10K subscribers) |
| **SMS** | Twilio | $0.0079/SMS, reliable, good API | Pay-per-use | Vonage ($0.0068/SMS), skip SMS at launch |
| **Email** | Resend | Free: 3K emails/mo, great DX, React email templates | $0 at launch | SendGrid free (100/day), Postmark |
| **Telegram Bot** | grammy | TypeScript-native, middleware system, great docs | $0 | node-telegram-bot-api (simpler but less maintained) |
| **CDN** | Cloudflare (free) | Images, static assets, caching. Already integrated with many services | $0 | Bunny CDN ($0.01/GB) |

### Total infrastructure cost at launch: ~$5-10/month
(Hetzner server already paid for. Only variable cost is Cloudflare Stream usage.)

---

## Architecture Layers

### 1. Event Bus (Core)

Everything routes through a central event bus. When something happens anywhere on the platform, it becomes an event.

```
User tips creator → EVENT: { type: 'tip', from: userId, to: creatorId, amount: 500 }
                    ↓
              Event Router
              ↓         ↓         ↓          ↓
         WebSocket    Push     Database    Telegram
         (live UI)   (FCM)    (persist)   (if opted in)
```

**Event Types**:
- `content.created` — new post/video/article
- `content.liked` / `.commented` / `.shared` / `.saved`
- `hours.tipped` / `.earned` / `.spent`
- `user.followed` / `.subscribed`
- `live.started` / `.ended` / `.viewer_joined`
- `message.sent` / `.read`
- `storefront.purchased` / `.membership_new`
- `governance.vote_cast` / `.proposal_created`

### 2. WebSocket Layer (Real-Time UI)

**Namespace Architecture**:
```
io.of('/feed')        — live feed updates, new posts
io.of('/live')        — live stream chat, viewer count, reactions
io.of('/notifications') — real-time notification delivery
io.of('/messages')    — DM delivery, typing indicators, read receipts
io.of('/presence')    — online status, "watching now" indicators
```

**Room Strategy**:
- Each user auto-joins: `user:{userId}` (personal notifications)
- Feed rooms: `zone:{zoneName}` (zone-wide updates)
- Content rooms: `content:{contentId}` (comments, likes on specific content)
- Live rooms: `live:{streamId}` (chat, reactions, viewer sync)
- DM rooms: `conversation:{conversationId}` (message delivery)

**Reconnection**: Socket.io handles this automatically. Config: 3 retries, exponential backoff, max 30s.

### 3. Video Streaming Pipeline

**Upload Flow**:
```
Creator uploads → Hetzner (temp storage)
                → Cloudflare Stream API (upload)
                → Cloudflare transcodes (auto: 360p, 720p, 1080p)
                → HLS manifest URL returned
                → Store in media table
                → CDN delivery via Cloudflare
```

**Live Streaming Flow**:
```
Creator starts stream → RTMP ingest (Cloudflare Stream Live)
                      → Auto-transcode to HLS
                      → Viewers connect via HLS player
                      → Chat via WebSocket /live namespace
                      → Recording saved automatically
```

**Shorts** (< 60s): Same pipeline, but pre-transcode to MP4 for instant playback. Cache aggressively.

### 4. Audio Room Architecture

Using LiveKit (self-hosted on Hetzner):

```
Host creates room → LiveKit server creates session
                  → Participants connect via WebRTC
                  → SFU handles media routing
                  → Up to 100 simultaneous speakers
                  → Listeners can request to speak
```

**Roles**: Host (admin), Speaker (unmuted), Listener (muted), Moderator
**Features**: Hand raise, mute/unmute, speaker queue, recording (optional)

### 5. Notification Routing Engine

```
Event occurs
  → Check recipient's notification_preferences
  → Filter by type (notify_likes, notify_tips, etc.)
  → Check quiet hours
  → If digest_mode: queue for daily digest
  → Otherwise: route to enabled channels:
      ├── in_app: WebSocket push to /notifications namespace
      ├── push: FCM API call
      ├── sms: Twilio API call (only for high-priority: tips, sales, live)
      ├── email: Resend API call (batched, max 1/hour per user)
      └── telegram: grammy bot.sendMessage
```

**Priority Levels**:
- **Immediate**: Tips received, product sales, live stream starts (you subscribed)
- **Standard**: Likes, comments, follows, mentions
- **Batch**: Weekly digest, milestone notifications, system announcements
- **Silent**: View counts, minor engagement (in-app only, no push)

### 6. Private Messaging

**Architecture**: Standard conversations model (see DB schema).

**Encryption**: Messages encrypted at rest using AES-256-GCM.
- Key derived from conversation-specific secret
- Server can't read message content
- Future: end-to-end encryption with client-side keys

**Real-Time Features**:
- Typing indicator: WebSocket event, debounced 2s
- Read receipts: WebSocket event on scroll-to-bottom
- Online presence: Heartbeat every 30s via /presence namespace
- HOURS tipping in DMs: Inline tip with ledger entry

### 7. Telegram Bot (@MiniMeeeeeeeBot)

**Commands**:
```
/status      — Platform health, active users, revenue today
/brief       — Today's daily brief (auto-sent at 8 AM)
/hours       — Your HOURS balance and tier
/trending    — Top 5 trending content right now
/revenue     — Revenue dashboard summary
/alerts on   — Enable real-time alerts for tips > 10 HRS
/alerts off  — Disable real-time alerts
```

**Daily Brief Format** (auto-generated, sent 8 AM):
```
📊 OURS Daily Brief — Feb 12, 2026

👥 Users: 1,234 (+12 today)
📝 Content: 89 new posts, 12 videos, 3 articles
⏣ HOURS: 4,500 earned, 890 tipped, 230 spent
💰 Revenue: $342 today ($8,900 this month)
🔥 Trending: "I quit my 6-figure job" by @jordanblake (534K views)
🚀 Top Earner: @codestream (124.5 HRS today)
⚠️ Issues: None

Next milestone: 1,500 users (266 to go)
```

---

## Implementation Priority

### Phase 1 (Week 1-2): Foundation
1. Socket.io server on Hetzner with namespace architecture
2. Event bus with pub/sub pattern
3. FCM integration for push notifications
4. Basic Telegram bot with /status and /brief

### Phase 2 (Week 3-4): Core Messaging
5. DM system with WebSocket delivery
6. Notification routing engine (in-app + push)
7. Typing indicators and read receipts
8. Presence system (online/offline)

### Phase 3 (Week 5-6): Video
9. Cloudflare Stream integration (upload + playback)
10. Live streaming via Cloudflare Stream Live
11. HLS player component for frontend
12. Live chat via WebSocket

### Phase 4 (Week 7-8): Audio + Polish
13. LiveKit deployment on Hetzner
14. Audio room creation/joining flow
15. SMS notifications (Twilio) for premium events
16. Email digests (Resend) with React templates

---

## Key Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Self-host vs managed WebSocket | Self-host (Socket.io) | $0 cost, full control, Hetzner has capacity |
| Self-host vs managed video | Managed (Cloudflare Stream) | Transcoding is compute-heavy, not worth self-hosting at this scale |
| Self-host vs managed audio | Self-host (LiveKit) | Open source, good quality, avoids per-minute pricing |
| Message encryption | Server-side AES-256 | Simpler than E2E for MVP, upgrade path exists |
| Notification batching | Per-user preference | Some users want instant, some want digest. Let them choose. |

---

*All costs are estimates based on free tiers and early-stage usage. Will scale with user growth.*
*Video streaming costs are the primary variable — budget $50/mo for first 1,000 active video creators.*
