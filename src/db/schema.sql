-- ═══════════════════════════════════════════════════════════════════════
-- OURS PLATFORM — CORE DATABASE SCHEMA
-- Owner: Chief Database Engineer (CDE)
-- Database: PostgreSQL 16 on Hetzner
-- 
-- Design Principles:
--   1. HOURS ledger uses double-entry bookkeeping (every transfer has debit + credit)
--   2. Soft deletes on user-generated content (deleted_at timestamp)
--   3. All monetary amounts in integer (HOURS * 100 to support 0.01 precision)
--   4. Event sourcing on HOURS ledger (append-only, never UPDATE/DELETE)
--   5. UUID primary keys for external exposure, BIGSERIAL for internal joins
--   6. Every table has created_at + updated_at
--   7. PII fields marked for encryption at rest
-- ═══════════════════════════════════════════════════════════════════════

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ═══ ENUMS ═══

CREATE TYPE user_role AS ENUM ('user', 'creator', 'moderator', 'admin');
CREATE TYPE ownership_tier AS ENUM ('observer', 'contributor', 'creator', 'builder', 'architect', 'founder');
CREATE TYPE content_type AS ENUM ('post', 'article', 'short_video', 'long_video', 'live_stream', 'audio_room', 'product', 'proposal', 'comment', 'reply');
CREATE TYPE zone_type AS ENUM ('watch', 'read', 'community', 'shop', 'explore', 'listen', 'govern', 'arena');
CREATE TYPE hours_action AS ENUM (
  -- Earning
  'earn_post', 'earn_article', 'earn_video', 'earn_livestream', 'earn_audio',
  'earn_comment', 'earn_like', 'earn_share', 'earn_vote', 'earn_report',
  'earn_checkin', 'earn_referral', 'earn_moderation', 'earn_challenge',
  -- Spending
  'spend_boost', 'spend_tool', 'spend_purchase', 'spend_gift',
  -- Transfer
  'tip_send', 'tip_receive',
  'membership_pay', 'membership_receive',
  'product_buy', 'product_sell',
  -- System
  'system_mint', 'system_burn', 'system_treasury_in', 'system_treasury_out',
  'revenue_share_distribute'
);
CREATE TYPE notification_channel AS ENUM ('in_app', 'push', 'sms', 'email', 'telegram');
CREATE TYPE notification_type AS ENUM (
  'like', 'comment', 'follow', 'tip', 'mention', 'reply',
  'live_start', 'premiere', 'milestone', 'achievement',
  'product_sale', 'membership_new', 'revenue_share',
  'system', 'moderation'
);
CREATE TYPE media_type AS ENUM ('image', 'video', 'audio', 'document', 'thumbnail');
CREATE TYPE subscription_status AS ENUM ('active', 'paused', 'cancelled', 'expired');
CREATE TYPE storefront_item_type AS ENUM ('digital_product', 'service', 'membership_tier', 'course');

-- ═══ CORE: USERS ═══

CREATE TABLE users (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  -- Identity (PII — encrypt at rest)
  email           TEXT UNIQUE NOT NULL,
  phone           TEXT UNIQUE,
  display_name    TEXT NOT NULL,
  handle          TEXT UNIQUE NOT NULL,  -- @handle, lowercase, alphanumeric + underscore
  avatar_url      TEXT,
  banner_url      TEXT,
  bio             TEXT DEFAULT '',
  
  -- Platform
  role            user_role DEFAULT 'user',
  is_verified     BOOLEAN DEFAULT FALSE,
  
  -- HOURS (denormalized for fast reads — source of truth is hours_ledger)
  hours_balance   BIGINT DEFAULT 0,        -- current balance (in centihours: 1 HOUR = 100)
  hours_lifetime  BIGINT DEFAULT 0,        -- total ever earned
  tier            ownership_tier DEFAULT 'observer',
  trust_score     SMALLINT DEFAULT 50,      -- 0-100
  
  -- Preferences
  timezone        TEXT DEFAULT 'UTC',
  locale          TEXT DEFAULT 'en',
  
  -- Auth
  magic_link_token    TEXT,
  magic_link_expires  TIMESTAMPTZ,
  last_login_at       TIMESTAMPTZ,
  
  -- Meta
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ  -- soft delete
);

CREATE INDEX idx_users_handle ON users(handle) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_tier ON users(tier) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_hours ON users(hours_balance DESC) WHERE deleted_at IS NULL;

-- ═══ CORE: FOLLOWS ═══

CREATE TABLE follows (
  id              BIGSERIAL PRIMARY KEY,
  follower_id     BIGINT NOT NULL REFERENCES users(id),
  following_id    BIGINT NOT NULL REFERENCES users(id),
  notify          BOOLEAN DEFAULT TRUE,  -- get notifications for this person
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- ═══ CONTENT ═══

CREATE TABLE content (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  author_id       BIGINT NOT NULL REFERENCES users(id),
  content_type    content_type NOT NULL,
  zone            zone_type NOT NULL,
  
  -- Content body
  title           TEXT,
  body            TEXT,       -- markdown/rich text for articles, caption for videos
  media_url       TEXT,       -- primary media (video URL, audio URL, image)
  thumbnail_url   TEXT,
  
  -- Video-specific
  duration_seconds INTEGER,
  is_live          BOOLEAN DEFAULT FALSE,
  
  -- Series
  series_id       BIGINT REFERENCES content_series(id),
  episode_number  SMALLINT,
  
  -- Metadata
  tags            TEXT[] DEFAULT '{}',
  
  -- Engagement counters (denormalized for performance)
  like_count      INTEGER DEFAULT 0,
  comment_count   INTEGER DEFAULT 0,
  share_count     INTEGER DEFAULT 0,
  view_count      INTEGER DEFAULT 0,
  save_count      INTEGER DEFAULT 0,
  tip_total       BIGINT DEFAULT 0,   -- total HOURS tipped (centihours)
  
  -- HOURS earned by this content
  hours_earned    BIGINT DEFAULT 0,   -- centihours
  
  -- Flags
  is_trending     BOOLEAN DEFAULT FALSE,
  is_pinned       BOOLEAN DEFAULT FALSE,
  is_nsfw         BOOLEAN DEFAULT FALSE,
  
  -- Meta
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_content_author ON content(author_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_zone ON content(zone, published_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_type ON content(content_type, published_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_content_trending ON content(is_trending, view_count DESC) WHERE deleted_at IS NULL AND is_trending = TRUE;
CREATE INDEX idx_content_series ON content(series_id, episode_number) WHERE series_id IS NOT NULL;
CREATE INDEX idx_content_tags ON content USING GIN(tags) WHERE deleted_at IS NULL;

-- ═══ CONTENT SERIES ═══

CREATE TABLE content_series (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  author_id       BIGINT NOT NULL REFERENCES users(id),
  title           TEXT NOT NULL,
  description     TEXT,
  thumbnail_url   TEXT,
  zone            zone_type NOT NULL,
  episode_count   SMALLINT DEFAULT 0,
  is_complete     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ═══ INTERACTIONS ═══

CREATE TABLE likes (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  content_id      BIGINT NOT NULL REFERENCES content(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE TABLE saves (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  content_id      BIGINT NOT NULL REFERENCES content(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, content_id)
);

CREATE TABLE comments (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  content_id      BIGINT NOT NULL REFERENCES content(id),
  author_id       BIGINT NOT NULL REFERENCES users(id),
  parent_id       BIGINT REFERENCES comments(id),  -- for threaded replies
  body            TEXT NOT NULL,
  like_count      INTEGER DEFAULT 0,
  hours_earned    BIGINT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_comments_content ON comments(content_id, created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_comments_author ON comments(author_id) WHERE deleted_at IS NULL;

CREATE TABLE shares (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  content_id      BIGINT NOT NULL REFERENCES content(id),
  shared_to       TEXT,  -- 'feed', 'dm', 'external'
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE views (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT REFERENCES users(id),  -- nullable for anonymous
  content_id      BIGINT NOT NULL REFERENCES content(id),
  duration_seconds INTEGER,  -- how long they watched/read
  completed       BOOLEAN DEFAULT FALSE,  -- watched/read to end
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_views_content ON views(content_id, created_at);
-- Partitioning recommended for views table at scale (by month)

-- ═══ HOURS LEDGER (Double-entry, append-only) ═══
-- 
-- This is the SOURCE OF TRUTH for all HOURS.
-- users.hours_balance is a CACHE derived from this ledger.
-- Amounts in centihours (1 HOUR = 100 centihours) for precision.
-- 
-- Example: User A tips User B 5 HOURS
--   Row 1: user_id=A, amount=-500, action='tip_send', counterparty_id=B
--   Row 2: user_id=B, amount=+500, action='tip_receive', counterparty_id=A
-- 
-- The ledger MUST always balance:
--   SUM(amount) WHERE action LIKE 'system_mint%' = 
--   SUM(ABS(amount)) WHERE action LIKE 'system_burn%' + SUM(hours_balance) for all users

CREATE TABLE hours_ledger (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  user_id         BIGINT NOT NULL REFERENCES users(id),
  amount          BIGINT NOT NULL,  -- positive = credit, negative = debit
  action          hours_action NOT NULL,
  
  -- Context
  counterparty_id BIGINT REFERENCES users(id),  -- other party in transfer
  content_id      BIGINT REFERENCES content(id), -- what content triggered this
  description     TEXT,
  
  -- Running balance (for fast queries without SUM)
  balance_after   BIGINT NOT NULL,
  
  -- Immutable
  created_at      TIMESTAMPTZ DEFAULT NOW()
  -- NO updated_at, NO deleted_at — this table is APPEND-ONLY
);

CREATE INDEX idx_ledger_user ON hours_ledger(user_id, created_at DESC);
CREATE INDEX idx_ledger_action ON hours_ledger(action, created_at DESC);
CREATE INDEX idx_ledger_content ON hours_ledger(content_id) WHERE content_id IS NOT NULL;

-- ═══ DAILY EARNING CAPS (anti-farming) ═══

CREATE TABLE daily_earning_caps (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  date            DATE NOT NULL DEFAULT CURRENT_DATE,
  
  comments_count  SMALLINT DEFAULT 0,   -- max 50/day
  likes_count     SMALLINT DEFAULT 0,   -- max 100/day
  shares_count    SMALLINT DEFAULT 0,   -- max 30/day
  checkins_count  SMALLINT DEFAULT 0,   -- max 1/day
  
  hours_earned_today BIGINT DEFAULT 0,  -- centihours
  
  UNIQUE(user_id, date)
);

-- ═══ CREATOR STOREFRONTS ═══

CREATE TABLE storefront_items (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  seller_id       BIGINT NOT NULL REFERENCES users(id),
  item_type       storefront_item_type NOT NULL,
  
  title           TEXT NOT NULL,
  description     TEXT,
  icon            TEXT,          -- emoji or icon URL
  
  price_hours     BIGINT NOT NULL,  -- centihours
  
  -- Digital product delivery
  file_url        TEXT,          -- download link (encrypted/signed)
  
  -- Membership tier specific
  interval_months SMALLINT,     -- 1 = monthly, 12 = yearly
  perks           TEXT[] DEFAULT '{}',
  
  -- Stats (denormalized)
  sales_count     INTEGER DEFAULT 0,
  rating_avg      NUMERIC(2,1) DEFAULT 0.0,
  rating_count    INTEGER DEFAULT 0,
  active_members  INTEGER DEFAULT 0,  -- for memberships
  
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_storefront_seller ON storefront_items(seller_id) WHERE is_active = TRUE;

CREATE TABLE storefront_purchases (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  buyer_id        BIGINT NOT NULL REFERENCES users(id),
  seller_id       BIGINT NOT NULL REFERENCES users(id),
  item_id         BIGINT NOT NULL REFERENCES storefront_items(id),
  
  amount_hours    BIGINT NOT NULL,   -- centihours paid
  ledger_entry_id BIGINT REFERENCES hours_ledger(id),  -- links to the HOURS transfer
  
  -- For memberships
  subscription_status subscription_status,
  expires_at      TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_buyer ON storefront_purchases(buyer_id, created_at DESC);
CREATE INDEX idx_purchases_seller ON storefront_purchases(seller_id, created_at DESC);

-- ═══ NOTIFICATIONS ═══

CREATE TABLE notifications (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  
  user_id         BIGINT NOT NULL REFERENCES users(id),  -- recipient
  actor_id        BIGINT REFERENCES users(id),            -- who triggered it
  
  type            notification_type NOT NULL,
  title           TEXT NOT NULL,
  body            TEXT,
  
  -- Context
  content_id      BIGINT REFERENCES content(id),
  target_url      TEXT,
  
  -- Delivery
  channels_sent   notification_channel[] DEFAULT '{}',
  
  is_read         BOOLEAN DEFAULT FALSE,
  read_at         TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ═══ NOTIFICATION PREFERENCES ═══

CREATE TABLE notification_preferences (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  
  -- Per-creator subscription (null = global default)
  creator_id      BIGINT REFERENCES users(id),
  
  -- Channel toggles
  in_app          BOOLEAN DEFAULT TRUE,
  push            BOOLEAN DEFAULT TRUE,
  sms             BOOLEAN DEFAULT FALSE,
  email           BOOLEAN DEFAULT TRUE,
  telegram        BOOLEAN DEFAULT FALSE,
  
  -- Type filters
  notify_likes    BOOLEAN DEFAULT TRUE,
  notify_comments BOOLEAN DEFAULT TRUE,
  notify_follows  BOOLEAN DEFAULT TRUE,
  notify_tips     BOOLEAN DEFAULT TRUE,
  notify_mentions BOOLEAN DEFAULT TRUE,
  notify_live     BOOLEAN DEFAULT TRUE,
  notify_sales    BOOLEAN DEFAULT TRUE,
  
  -- Schedule
  quiet_start     TIME,  -- quiet hours start
  quiet_end       TIME,  -- quiet hours end
  digest_mode     BOOLEAN DEFAULT FALSE,  -- batch into daily digest
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, creator_id)
);

-- ═══ MESSAGING ═══

CREATE TABLE conversations (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  is_group        BOOLEAN DEFAULT FALSE,
  title           TEXT,  -- for group chats
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE conversation_members (
  id              BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id),
  user_id         BIGINT NOT NULL REFERENCES users(id),
  is_admin        BOOLEAN DEFAULT FALSE,
  last_read_at    TIMESTAMPTZ DEFAULT NOW(),
  muted           BOOLEAN DEFAULT FALSE,
  joined_at       TIMESTAMPTZ DEFAULT NOW(),
  left_at         TIMESTAMPTZ,
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE messages (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  conversation_id BIGINT NOT NULL REFERENCES conversations(id),
  sender_id       BIGINT NOT NULL REFERENCES users(id),
  body            TEXT NOT NULL,  -- encrypted at rest
  media_url       TEXT,
  
  -- For HOURS tips in DMs
  hours_amount    BIGINT,  -- if this message includes a tip
  
  is_system       BOOLEAN DEFAULT FALSE,  -- "User joined" etc.
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);

-- ═══ GOVERNANCE ═══

CREATE TABLE proposals (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  author_id       BIGINT NOT NULL REFERENCES users(id),
  title           TEXT NOT NULL,
  body            TEXT NOT NULL,
  category        TEXT,  -- 'feature', 'policy', 'treasury', 'moderation'
  
  -- Voting
  votes_for       INTEGER DEFAULT 0,
  votes_against   INTEGER DEFAULT 0,
  voting_ends_at  TIMESTAMPTZ NOT NULL,
  
  -- HOURS weight
  hours_weight_for     BIGINT DEFAULT 0,   -- sum of voters' HOURS
  hours_weight_against BIGINT DEFAULT 0,
  
  -- Outcome
  is_passed       BOOLEAN,
  executed_at     TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE votes (
  id              BIGSERIAL PRIMARY KEY,
  proposal_id     BIGINT NOT NULL REFERENCES proposals(id),
  voter_id        BIGINT NOT NULL REFERENCES users(id),
  vote            BOOLEAN NOT NULL,  -- true = for, false = against
  hours_weight    BIGINT NOT NULL,   -- voter's HOURS at time of vote
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(proposal_id, voter_id)
);

-- ═══ PLATFORM ECONOMICS ═══

CREATE TABLE revenue_periods (
  id              BIGSERIAL PRIMARY KEY,
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  
  -- Revenue sources (in USD cents)
  revenue_shop        BIGINT DEFAULT 0,
  revenue_premium     BIGINT DEFAULT 0,
  revenue_advertising BIGINT DEFAULT 0,
  revenue_api         BIGINT DEFAULT 0,
  revenue_marketplace BIGINT DEFAULT 0,
  revenue_total       BIGINT DEFAULT 0,
  
  -- Distribution
  creator_pool_pct     SMALLINT DEFAULT 70,  -- target: 70%
  operations_pct       SMALLINT DEFAULT 20,
  treasury_pct         SMALLINT DEFAULT 10,
  
  -- Calculated
  creator_pool_amount  BIGINT DEFAULT 0,
  
  is_distributed  BOOLEAN DEFAULT FALSE,
  distributed_at  TIMESTAMPTZ,
  
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ═══ MEDIA ASSETS ═══

CREATE TABLE media (
  id              BIGSERIAL PRIMARY KEY,
  uuid            UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  uploader_id     BIGINT NOT NULL REFERENCES users(id),
  media_type      media_type NOT NULL,
  
  original_url    TEXT NOT NULL,
  cdn_url         TEXT,
  thumbnail_url   TEXT,
  
  file_size_bytes BIGINT,
  mime_type       TEXT,
  width           INTEGER,
  height          INTEGER,
  duration_seconds INTEGER,  -- for video/audio
  
  -- Video transcoding
  hls_url         TEXT,      -- HLS manifest for adaptive streaming
  is_transcoded   BOOLEAN DEFAULT FALSE,
  
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ═══ REPORTS / MODERATION ═══

CREATE TABLE reports (
  id              BIGSERIAL PRIMARY KEY,
  reporter_id     BIGINT NOT NULL REFERENCES users(id),
  content_id      BIGINT REFERENCES content(id),
  user_id         BIGINT REFERENCES users(id),  -- reporting a user
  reason          TEXT NOT NULL,
  description     TEXT,
  is_resolved     BOOLEAN DEFAULT FALSE,
  resolved_by     BIGINT REFERENCES users(id),
  resolution      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  resolved_at     TIMESTAMPTZ
);

-- ═══ HELPER FUNCTIONS ═══

-- Update updated_at automatically
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_content_updated BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_comments_updated BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_storefront_updated BEFORE UPDATE ON storefront_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_notif_prefs_updated BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_conversations_updated BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_proposals_updated BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate ownership tier from HOURS balance
CREATE OR REPLACE FUNCTION calculate_tier(balance BIGINT)
RETURNS ownership_tier AS $$
BEGIN
  -- Balance is in centihours. Tiers in whole HOURS:
  -- Observer: 0-99, Contributor: 100-999, Creator: 1000-4999
  -- Builder: 5000-24999, Architect: 25000-99999, Founder: 100000+
  IF balance >= 10000000 THEN RETURN 'founder';      -- 100,000+ HOURS
  ELSIF balance >= 2500000 THEN RETURN 'architect';   -- 25,000+ HOURS
  ELSIF balance >= 500000 THEN RETURN 'builder';      -- 5,000+ HOURS
  ELSIF balance >= 100000 THEN RETURN 'creator';      -- 1,000+ HOURS
  ELSIF balance >= 10000 THEN RETURN 'contributor';   -- 100+ HOURS
  ELSE RETURN 'observer';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ═══ LEDGER INTEGRITY CHECK ═══

-- Run periodically to verify the ledger balances
-- Total minted should equal total in all user balances + total burned
CREATE OR REPLACE FUNCTION verify_ledger_integrity()
RETURNS TABLE(
  total_minted BIGINT,
  total_burned BIGINT,
  total_user_balances BIGINT,
  total_in_circulation BIGINT,
  is_balanced BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COALESCE(SUM(amount), 0) FROM hours_ledger WHERE action = 'system_mint') AS total_minted,
    (SELECT COALESCE(SUM(ABS(amount)), 0) FROM hours_ledger WHERE action = 'system_burn') AS total_burned,
    (SELECT COALESCE(SUM(hours_balance), 0) FROM users WHERE deleted_at IS NULL) AS total_user_balances,
    (SELECT COALESCE(SUM(amount), 0) FROM hours_ledger) AS total_in_circulation,
    (SELECT COALESCE(SUM(amount), 0) FROM hours_ledger) = 
     (SELECT COALESCE(SUM(hours_balance), 0) FROM users WHERE deleted_at IS NULL) AS is_balanced;
END;
$$ LANGUAGE plpgsql;
