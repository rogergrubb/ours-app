// ═══════════════════════════════════════════════════════════════════════
// OURS — HOURS EARNING RATES (Single Source of Truth)
// Owner: Chief Database Engineer (CDE) + Chief UX (display)
//
// EVERY page that shows HOURS rates MUST import from here.
// DO NOT hardcode earning rates anywhere else.
//
// All amounts in centihours (1 HOUR = 100 centihours) for precision.
// Display with hoursConfig.decimals from design-tokens.
//
// * All rates are illustrative targets, not guarantees.
// ═══════════════════════════════════════════════════════════════════════

export const HOURS_RATES = {
  // ═══ CREATING CONTENT ═══
  create: {
    post:        { amount: 50,   label: '+0.5 HRS',   cap: null,    zone: 'feed',    note: 'Per published post' },
    article:     { amount: 300,  label: '+3.0 HRS',   cap: null,    zone: 'read',    note: 'Per published article (min 500 words)' },
    short_video: { amount: 200,  label: '+2.0 HRS',   cap: null,    zone: 'watch',   note: 'Per published short (< 60s)' },
    long_video:  { amount: 200,  label: '+2.0 HRS',   cap: null,    zone: 'watch',   note: 'Per published video (any length)' },
    live_stream: { amount: 150,  label: '+1.5 HRS/hr', cap: null,   zone: 'watch',   note: 'Per hour of live streaming' },
    audio_room:  { amount: 150,  label: '+1.5 HRS/hr', cap: null,   zone: 'listen',  note: 'Per hour hosting audio room' },
    product:     { amount: 100,  label: '+1.0 HRS',   cap: null,    zone: 'shop',    note: 'Per product listed' },
    proposal:    { amount: 200,  label: '+2.0 HRS',   cap: null,    zone: 'govern',  note: 'Per governance proposal submitted' },
  },

  // ═══ ENGAGING ═══
  engage: {
    comment:     { amount: 10,   label: '+0.1 HRS',   cap: 50,      note: 'Per comment (max 50/day)' },
    like:        { amount: 5,    label: '+0.05 HRS',  cap: 100,     note: 'Per like (max 100/day)' },
    share:       { amount: 20,   label: '+0.2 HRS',   cap: 30,      note: 'Per share (max 30/day)' },
    vote:        { amount: 50,   label: '+0.5 HRS',   cap: 10,      note: 'Per governance vote (max 10/day)' },
    report:      { amount: 30,   label: '+0.3 HRS',   cap: 5,       note: 'Per valid report (max 5/day)' },
    checkin:     { amount: 25,   label: '+0.25 HRS',  cap: 1,       note: 'Daily check-in (1/day)' },
  },

  // ═══ QUALITY BONUSES ═══
  bonus: {
    trending:        { amount: 500,  label: '+5.0 HRS',   note: 'Content reaches trending' },
    likes_100:       { amount: 200,  label: '+2.0 HRS',   note: 'Content receives 100+ likes' },
    full_read:       { amount: 10,   label: '+0.1 HRS',   note: 'Per full article read' },
    full_view:       { amount: 5,    label: '+0.05 HRS',  note: 'Per full video view' },
    viewer_milestone: { amount: 100, label: '+1.0 HRS',   note: 'Per viewer milestone (100/500/1K/etc)' },
    product_sale:    { amount: 100,  label: '+1.0 HRS',   note: 'Per product sold' },
  },

  // ═══ COMMUNITY ═══
  community: {
    referral:    { amount: 500,  label: '+5.0 HRS',     note: 'Per successful referral' },
    mentoring:   { amount: 300,  label: '+3.0 HRS',     note: 'Per mentoring session' },
    moderation:  { amount: 100,  label: '+1.0 HRS/hr',  note: 'Per hour of moderation' },
    challenge_win: { amount: 1000, label: '+10-100 HRS', note: 'Challenge reward (varies by challenge)' },
    event:       { amount: 500,  label: '+5.0 HRS',     note: 'Per community event hosted' },
  },

  // ═══ SPENDING ═══
  spend: {
    boost_post:      { amount: 500,  label: '5 HRS',    note: 'Boost post visibility' },
    pin_profile:     { amount: 200,  label: '2 HRS',    note: 'Pin to profile' },
    zone_highlight:  { amount: 1000, label: '10 HRS',   note: 'Zone highlight placement' },
    live_promote:    { amount: 1500, label: '15 HRS',   note: 'Promote live stream' },
    analytics:       { amount: 2000, label: '20 HRS/mo', note: 'Advanced analytics access' },
    custom_theme:    { amount: 1000, label: '10 HRS',   note: 'Custom profile theme' },
    scheduled_post:  { amount: 500,  label: '5 HRS/mo', note: 'Scheduled posting access' },
    export:          { amount: 800,  label: '8 HRS',    note: 'Multi-format content export' },
  },

  // ═══ TIPS ═══
  tip: {
    min: 50,          // 0.5 HRS minimum tip
    presets: [100, 500, 1000, 2500, 5000],  // 1, 5, 10, 25, 50 HRS
    max: 100000,      // 1,000 HRS maximum single tip
  },
};

// ═══ TIER THRESHOLDS (in centihours) ═══
export const TIER_THRESHOLDS = {
  observer:    { min: 0,         max: 9999,      revenueShare: 0,    label: '👁️ Observer' },
  contributor: { min: 10000,     max: 99999,     revenueShare: 0.5,  label: '🌱 Contributor' },
  creator:     { min: 100000,    max: 499999,    revenueShare: 2,    label: '🔥 Creator' },
  builder:     { min: 500000,    max: 2499999,   revenueShare: 5,    label: '⚡ Builder' },
  architect:   { min: 2500000,   max: 9999999,   revenueShare: 12,   label: '🏗️ Architect' },
  founder:     { min: 10000000,  max: Infinity,  revenueShare: 25,   label: '👑 Founder' },
};

// ═══ REVENUE SHARING ═══
export const REVENUE_CONFIG = {
  creatorPoolPct: 70,     // 70% to creator pool (target, not guarantee)
  operationsPct: 20,      // 20% to platform operations
  treasuryPct: 10,        // 10% to community treasury
  distributionFrequency: 'quarterly',
};

// ═══ ANTI-FARMING CAPS ═══
export const DAILY_CAPS = {
  comments: 50,
  likes: 100,
  shares: 30,
  votes: 10,
  reports: 5,
  checkins: 1,
};

// ═══ DISCLAIMER TEXT ═══
export const HOURS_DISCLAIMERS = {
  short: '* HOURS are internal platform credits, not financial instruments.',
  medium: '* HOURS are internal platform credits, not currency. All earning rates are illustrative targets, not guarantees.',
  full: 'HOURS are internal platform credits, not cryptocurrency, securities, stablecoins, or fiat currency. HOURS have no independent market value and cannot be purchased, sold, or traded outside the OURS platform. Revenue sharing targets (including the 70% distribution goal) are aspirational and subject to change based on platform economics, operational requirements, and community governance decisions. All earning rates shown are illustrative targets, not guarantees.',
};
