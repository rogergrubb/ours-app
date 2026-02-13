import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — SITE ARCHITECTURE MAP
// Complete page hierarchy: Public → User → Advertiser
// Every page defined before a single line of code is written
// ═══════════════════════════════════════════════════════════════

const OursSiteMap = () => {
  const [expandedNode, setExpandedNode] = useState(null);
  const [activeLayer, setActiveLayer] = useState('all'); // all | public | user | advertiser
  const [selectedPage, setSelectedPage] = useState(null);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)',
    public: '#f59e0b', user: '#0ea5e9', advertiser: '#10b981', shared: '#a78bfa',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    font: "'Sora', sans-serif", mono: "'Space Mono', monospace",
  };

  // ═══════════════════════════════════════
  // COMPLETE PAGE HIERARCHY
  // ═══════════════════════════════════════

  const pages = {
    // ──────────────────────────────
    // TIER 0: ROOT
    // ──────────────────────────────
    root: {
      id: 'root', title: 'ours.com', layer: 'public', tier: 0,
      desc: 'Domain root — routes to Homepage (public) or Candy Store (logged in)',
      status: 'built', file: 'ours-homepage.jsx',
      children: ['homepage', 'auth', 'userHome', 'advHome'],
    },

    // ──────────────────────────────
    // TIER 1: PUBLIC PAGES
    // ──────────────────────────────
    homepage: {
      id: 'homepage', title: '🏠 Homepage', layer: 'public', tier: 1,
      desc: 'Editorial manifesto landing page. Price Tag Calculator, 20 ugly truths, solutions, conversion CTAs.',
      status: 'built', file: 'ours-homepage.jsx',
      content: ['Hero with "They profit. You scroll."', 'Red ticker bar', 'The Ugly Truth (20 problems)', 'The Pivot', 'The Upside (8 solutions)', 'How HOURS Work', 'Big Numbers', 'Them vs Us Table', 'Price Tag Calculator', 'Social Proof', 'Final CTA', 'Disclosures'],
      children: ['about', 'blueprint', 'calculator', 'creators', 'advertiserLanding', 'press', 'legal'],
    },
    about: {
      id: 'about', title: '📖 About / Mission', layer: 'public', tier: 2,
      desc: 'Origin story. Why OURS exists. The team. The vision. Not a corporate page — a manifesto.',
      status: 'planned',
      content: ['Origin story', 'The founding problem', 'The OURS Principles (5 pillars)', 'Team / Founders', 'Roadmap timeline', 'Transparency commitments', 'Link to Blueprint'],
      children: ['roadmap', 'transparency'],
    },
    roadmap: {
      id: 'roadmap', title: '🗺️ Public Roadmap', layer: 'public', tier: 3,
      desc: 'Community-visible product roadmap. What\'s shipped, what\'s next, what\'s being voted on.',
      status: 'planned',
      content: ['Shipped features', 'In progress', 'Up next', 'Community-voted items', 'Governance vote links'],
      children: [],
    },
    transparency: {
      id: 'transparency', title: '🔍 Transparency Report', layer: 'public', tier: 3,
      desc: 'Published monthly. Revenue, user counts, moderation actions, ad spend breakdown. Walk the talk.',
      status: 'planned',
      content: ['Total revenue this period', 'Total distributed to users', 'User growth metrics', 'Moderation actions taken', 'Ad revenue breakdown', 'Content removal stats', 'Government requests'],
      children: [],
    },
    blueprint: {
      id: 'blueprint', title: '📋 The 20×20 Blueprint', layer: 'public', tier: 2,
      desc: 'Full public breakdown: 20 problems × 20 solutions. Interactive, expandable, shareable.',
      status: 'built', file: 'ours-mvp-v2.jsx (tab)',
      content: ['20 complaints with severity scores', '20 solutions with feature names', 'Evidence & citations', 'Platform comparisons', 'Shareable per-problem deep links'],
      children: ['blueprintProblem'],
    },
    blueprintProblem: {
      id: 'blueprintProblem', title: '🔗 /blueprint/:problem', layer: 'public', tier: 3,
      desc: 'Individual problem deep-link page. Shareable. "Share this with someone who doesn\'t think social media is broken."',
      status: 'planned',
      content: ['Problem detail', 'Evidence', 'OURS solution', 'Share buttons', 'CTA to join'],
      children: [],
    },
    calculator: {
      id: 'calculator', title: '🏷️ Price Tag Calculator', layer: 'public', tier: 2,
      desc: 'Standalone viral tool. "How much have you made for social media?" Shareable results.',
      status: 'built', file: 'ours-homepage.jsx (section)',
      content: ['Platform selector', 'Follower/post inputs', 'Revenue calculation', 'Shareable result card', 'CTA to join', 'Disclaimers'],
      children: [],
    },
    creators: {
      id: 'creators', title: '🎨 For Creators', layer: 'public', tier: 2,
      desc: 'Creator-specific landing page. Storefront features, revenue comparison, migration tool preview.',
      status: 'planned',
      content: ['Creator value prop', 'Revenue comparison vs other platforms', 'Storefront feature preview', 'HOURS earning breakdown', 'Migration tool preview', 'Creator testimonials', 'CTA to join waitlist'],
      children: ['creatorStories'],
    },
    creatorStories: {
      id: 'creatorStories', title: '📸 Creator Stories', layer: 'public', tier: 3,
      desc: 'Case studies of early creators. Earnings, growth, experience. Social proof machine.',
      status: 'planned',
      content: ['Individual creator profiles', 'Before/after earnings', 'Content strategy breakdowns', 'Video testimonials'],
      children: [],
    },
    advertiserLanding: {
      id: 'advertiserLanding', title: '📢 For Advertisers', layer: 'public', tier: 2,
      desc: 'Advertiser-specific landing page. The pitch: verified humans, willing audience, transparent metrics.',
      status: 'built', file: 'ours-candy-store.jsx (advertiser view)',
      content: ['The pitch: audience that wants your ads', 'Key metrics comparison', 'Ad format gallery', 'Revenue flow transparency', 'Case studies', 'Pricing tiers', 'CTA to advertiser signup'],
      children: ['adFormats', 'adCaseStudies'],
    },
    adFormats: {
      id: 'adFormats', title: '🎯 Ad Formats Gallery', layer: 'public', tier: 3,
      desc: 'Detailed breakdown of every ad format with examples, specs, pricing, and best practices.',
      status: 'planned',
      content: ['Native Feed Ads', 'Video Pre-Roll', 'Community Sponsorship', 'Challenge Sponsorship', 'Storefront Featured', 'Governance Sponsorship', 'Interactive specs per format', 'Creative guidelines'],
      children: [],
    },
    adCaseStudies: {
      id: 'adCaseStudies', title: '📈 Advertiser Case Studies', layer: 'public', tier: 3,
      desc: 'Brand success stories. ROAS numbers. Engagement proof. The data advertisers need.',
      status: 'planned',
      content: ['Campaign breakdowns', 'ROAS comparisons', 'Audience engagement data', 'Brand testimonials', 'Industry benchmarks'],
      children: [],
    },
    press: {
      id: 'press', title: '📰 Press / Media Kit', layer: 'public', tier: 2,
      desc: 'Press releases, brand assets, media coverage, founder quotes, key statistics.',
      status: 'planned',
      content: ['Press releases', 'Brand assets / logos', 'Key statistics', 'Founder bios & photos', 'Media coverage links', 'Press contact'],
      children: [],
    },
    legal: {
      id: 'legal', title: '⚖️ Legal', layer: 'public', tier: 2,
      desc: 'Terms, privacy policy, disclosures, cookie policy. All the legal foundations.',
      status: 'planned',
      content: ['Terms of Service', 'Privacy Policy', 'HOURS Token Disclosures', 'Advertiser Terms', 'Cookie Policy', 'DMCA Policy', 'Community Guidelines'],
      children: ['terms', 'privacy', 'disclosures', 'communityGuidelines'],
    },
    terms: { id: 'terms', title: '📜 Terms of Service', layer: 'public', tier: 3, desc: 'User agreement.', status: 'planned', content: [], children: [] },
    privacy: { id: 'privacy', title: '🔒 Privacy Policy', layer: 'public', tier: 3, desc: 'Data handling, AI protection, user rights.', status: 'planned', content: [], children: [] },
    disclosures: { id: 'disclosures', title: '📋 Full Disclosures', layer: 'public', tier: 3, desc: 'HOURS token, revenue sharing, earnings disclaimers.', status: 'planned', content: [], children: [] },
    communityGuidelines: { id: 'communityGuidelines', title: '🤝 Community Guidelines', layer: 'public', tier: 3, desc: 'What\'s allowed, moderation approach, appeals process.', status: 'planned', content: [], children: [] },

    // Auth
    auth: {
      id: 'auth', title: '🔐 Auth Flow', layer: 'shared', tier: 1,
      desc: 'Sign up, log in, onboarding. Magic link + social OAuth.',
      status: 'planned',
      content: ['Sign up (email / Google / Apple)', 'Log in', 'Magic link verification', 'Human verification step'],
      children: ['onboarding'],
    },
    onboarding: {
      id: 'onboarding', title: '🎯 Onboarding Flow', layer: 'shared', tier: 2,
      desc: '4-step onboarding: Pick interests → Set feed preferences → Tour the Candy Store → Claim first HOURS.',
      status: 'planned',
      content: ['Step 1: Pick 5+ interest categories', 'Step 2: Feed control preference (chrono vs discover mix)', 'Step 3: Interactive candy store tour', 'Step 4: First daily reward claim', 'Step 5: First quest assigned'],
      children: [],
    },

    // ──────────────────────────────
    // TIER 1: USER HOME (LOGGED IN)
    // ──────────────────────────────
    userHome: {
      id: 'userHome', title: '🍬 Candy Store Home', layer: 'user', tier: 1,
      desc: 'The logged-in home. Daily reward → Quest board → Zone grid → Leaderboard → Pulse.',
      status: 'built', file: 'ours-candy-store.jsx',
      content: ['Daily reward popup', 'Welcome banner + live earnings', 'Quest prompt', 'Live pulse ticker', 'Zone grid (8 zones)', 'Leaderboard preview', 'Disclosures'],
      children: ['zoneWatch', 'zoneRead', 'zoneCommunity', 'zoneShop', 'zoneExplore', 'zoneListen', 'zoneGovern', 'zoneArena', 'wallet', 'profile', 'messages', 'notifications', 'settings', 'search'],
    },

    // ─── ZONES ───
    zoneWatch: {
      id: 'zoneWatch', title: '🎬 Watch Zone', layer: 'user', tier: 2,
      desc: 'Full-screen video experience. Vertical swiper for shorts, horizontal browser for long-form. Live streams.',
      status: 'planned',
      content: ['Vertical video swiper (TikTok-style)', 'Long-form browser (YouTube-style)', 'Live streams with tipping', 'Video search', 'Channels / subscriptions', 'Watch history', 'HOURS earned per view display'],
      children: ['videoPlayer', 'liveStream', 'channel'],
    },
    videoPlayer: { id: 'videoPlayer', title: '▶️ Video Player', layer: 'user', tier: 3, desc: 'Full video experience with comments, related, tip, share, HOURS counter.', status: 'planned', content: ['Video playback', 'Comments thread', 'Related videos', 'Tip creator', 'Share', 'HOURS earned counter', 'Creator profile link'], children: [] },
    liveStream: { id: 'liveStream', title: '🔴 Live Stream', layer: 'user', tier: 3, desc: 'Live video with real-time chat, tips, HOURS multiplier for live engagement.', status: 'planned', content: ['Live video', 'Real-time chat', 'Tip/gift animations', 'Viewer count', 'HOURS multiplier badge'], children: [] },
    channel: { id: 'channel', title: '📺 Creator Channel', layer: 'user', tier: 3, desc: 'Creator\'s video hub with all content, playlists, about, storefront link.', status: 'planned', content: ['Video grid', 'Playlists', 'About / bio', 'Storefront link', 'Follow button', 'Trust score', 'Total HOURS earned'], children: [] },

    zoneRead: {
      id: 'zoneRead', title: '📰 Read Zone', layer: 'user', tier: 2,
      desc: 'Long-form content hub. Articles, threads, newsletters. Evergreen content that earns forever.',
      status: 'planned',
      content: ['Article feed (chronological / trending / following)', 'Reading time estimates', 'HOURS per article display', 'Bookmarks / reading list', 'Newsletter subscriptions', 'Writer profiles'],
      children: ['articleReader', 'writerProfile'],
    },
    articleReader: { id: 'articleReader', title: '📖 Article Reader', layer: 'user', tier: 3, desc: 'Clean reading experience. Progress bar, estimated HOURS, highlights, comments.', status: 'planned', content: ['Article body', 'Reading progress bar', 'HOURS progress (earn as you read)', 'Highlight & share quotes', 'Comments', 'Tip author', 'Related articles'], children: [] },
    writerProfile: { id: 'writerProfile', title: '✍️ Writer Profile', layer: 'user', tier: 3, desc: 'Writer hub with articles, newsletter, follower count, total reads.', status: 'planned', content: ['Article archive', 'Newsletter subscribe', 'Writer stats', 'Follow button'], children: [] },

    zoneCommunity: {
      id: 'zoneCommunity', title: '🏛️ Community Zone', layer: 'user', tier: 2,
      desc: 'Groups with shared treasuries. Create, join, moderate. Elected mods earn HOURS.',
      status: 'planned',
      content: ['My groups list', 'Discover groups', 'Create group flow', 'Group activity feed', 'Unread indicators', 'Treasury balances'],
      children: ['groupView', 'createGroup'],
    },
    groupView: {
      id: 'groupView', title: '👥 Group View', layer: 'user', tier: 3,
      desc: 'Inside a group: discussion feed, members, events, treasury, moderation, polls.',
      status: 'planned',
      content: ['Discussion feed', 'Members list with roles', 'Group events', 'Shared treasury', 'Mod elections', 'Group rules', 'Group-specific storefront'],
      children: ['groupTreasury', 'modElection'],
    },
    createGroup: { id: 'createGroup', title: '➕ Create Group', layer: 'user', tier: 3, desc: 'Group creation wizard: name, description, category, rules, privacy settings.', status: 'planned', content: [], children: [] },
    groupTreasury: { id: 'groupTreasury', title: '💰 Group Treasury', layer: 'user', tier: 4, desc: 'Treasury dashboard: total earned, distribution history, member contributions.', status: 'planned', content: [], children: [] },
    modElection: { id: 'modElection', title: '🗳️ Mod Election', layer: 'user', tier: 4, desc: 'Nominate, campaign, vote for group moderators.', status: 'planned', content: [], children: [] },

    zoneShop: {
      id: 'zoneShop', title: '🛍️ Shop Zone', layer: 'user', tier: 2,
      desc: 'Creator storefronts. Courses, templates, art, services. Browse, buy, review.',
      status: 'planned',
      content: ['Featured products', 'Categories', 'Search', 'Seller ratings', 'Purchase history', 'Wishlists'],
      children: ['productPage', 'storefront', 'myStorefront'],
    },
    productPage: { id: 'productPage', title: '📦 Product Page', layer: 'user', tier: 3, desc: 'Product detail with reviews, seller info, purchase flow.', status: 'planned', content: ['Product details', 'Price + creator earnings breakdown', 'Reviews (verified purchasers)', 'Seller profile link', 'Buy button', 'Affiliate disclosure'], children: [] },
    storefront: { id: 'storefront', title: '🏪 Creator Storefront', layer: 'user', tier: 3, desc: 'A creator\'s shop. All products, reviews, total sales.', status: 'planned', content: ['Product grid', 'Seller bio', 'Rating / reviews', 'Total sales count', 'Follow seller'], children: [] },
    myStorefront: { id: 'myStorefront', title: '🔧 My Storefront', layer: 'user', tier: 3, desc: 'Seller dashboard. Add products, manage inventory, view earnings.', status: 'planned', content: ['Add product wizard', 'Product management', 'Sales analytics', 'Earnings breakdown', 'Payout settings', 'Customer messages'], children: [] },

    zoneExplore: {
      id: 'zoneExplore', title: '✨ Explore Zone', layer: 'user', tier: 2,
      desc: 'Pinterest-style visual discovery. Masonry grid. Photos, infographics, moodboards.',
      status: 'planned',
      content: ['Masonry grid of visual content', 'Category filters', 'Save to collections', 'Related content rabbit holes', 'HOURS for saving/engaging'],
      children: ['collection'],
    },
    collection: { id: 'collection', title: '📂 Collection', layer: 'user', tier: 3, desc: 'User-curated collections of saved content. Public or private.', status: 'planned', content: ['Saved items grid', 'Collection title/description', 'Share collection', 'Collaborate with others'], children: [] },

    zoneListen: {
      id: 'zoneListen', title: '🎙️ Listen Zone', layer: 'user', tier: 2,
      desc: 'Audio rooms, podcasts, playlists. Background mode. Listen while you earn.',
      status: 'planned',
      content: ['Live audio rooms', 'Podcast directory', 'Playlists', 'Background playback', 'Audio search', 'Follow hosts'],
      children: ['audioRoom', 'podcastEpisode'],
    },
    audioRoom: { id: 'audioRoom', title: '🔊 Audio Room', layer: 'user', tier: 3, desc: 'Live audio with speakers, listeners, hand-raise, reactions, tips.', status: 'planned', content: ['Speaker stage', 'Listener count', 'Hand raise', 'Reactions', 'Tip speakers', 'Record option', 'HOURS for participation'], children: [] },
    podcastEpisode: { id: 'podcastEpisode', title: '🎧 Podcast Episode', layer: 'user', tier: 3, desc: 'Podcast player with chapters, show notes, comments, subscribe.', status: 'planned', content: ['Audio player', 'Chapter marks', 'Show notes', 'Comments', 'Subscribe', 'HOURS for listening'], children: [] },

    zoneGovern: {
      id: 'zoneGovern', title: '🗳️ Govern Zone', layer: 'user', tier: 2,
      desc: 'Platform governance. Active votes, proposals, results history. Your HOURS = your power.',
      status: 'planned',
      content: ['Active votes', 'Upcoming proposals', 'Past results', 'Proposal submission', 'Delegate voting power', 'Governance FAQ'],
      children: ['voteDetail', 'submitProposal'],
    },
    voteDetail: { id: 'voteDetail', title: '🗳️ Vote Detail', layer: 'user', tier: 3, desc: 'Individual vote: arguments for/against, vote tally, cast your vote, discussion.', status: 'planned', content: ['Proposal text', 'Pro/con arguments', 'Current tally', 'Cast vote (weighted by HOURS)', 'Discussion thread', 'Time remaining'], children: [] },
    submitProposal: { id: 'submitProposal', title: '📝 Submit Proposal', layer: 'user', tier: 3, desc: 'Propose a platform change. Requires minimum HOURS threshold.', status: 'planned', content: ['Proposal editor', 'Category selection', 'Impact assessment', 'HOURS threshold check', 'Preview + submit'], children: [] },

    zoneArena: {
      id: 'zoneArena', title: '🏆 Arena Zone', layer: 'user', tier: 2,
      desc: 'Challenges, competitions, events. Gamified earning with leaderboards and prizes.',
      status: 'planned',
      content: ['Active challenges', 'My progress', 'Leaderboards', 'Past winners', 'Create challenge (for brands)', 'Event calendar'],
      children: ['challengeDetail', 'leaderboard'],
    },
    challengeDetail: { id: 'challengeDetail', title: '🎯 Challenge Detail', layer: 'user', tier: 3, desc: 'Challenge rules, progress tracker, submissions, leaderboard.', status: 'planned', content: ['Challenge description', 'Rules', 'Progress tracker', 'Submit entry', 'Leaderboard', 'Sponsor branding', 'Prize breakdown'], children: [] },
    leaderboard: { id: 'leaderboard', title: '📊 Leaderboard', layer: 'user', tier: 3, desc: 'Global, weekly, challenge-specific leaderboards.', status: 'planned', content: ['Global top 100', 'Weekly top earners', 'Category leaders', 'Your rank', 'Friend ranks'], children: [] },

    // ─── USER UTILITY PAGES ───
    wallet: {
      id: 'wallet', title: '💰 Wallet / Earnings', layer: 'user', tier: 2,
      desc: 'Complete earnings dashboard. HOURS balance, earning history, payout settings, tax docs.',
      status: 'partially-built', file: 'ours-candy-store.jsx (section)',
      content: ['HOURS balance', 'Estimated USD value', 'Earning history (daily/weekly/monthly)', 'Earning sources breakdown', 'Payout settings', 'Payout history', 'Tax documentation', 'Revenue share explanation'],
      children: ['payoutSettings', 'earningsHistory'],
    },
    payoutSettings: { id: 'payoutSettings', title: '⚙️ Payout Settings', layer: 'user', tier: 3, desc: 'Bank/PayPal/crypto payout configuration.', status: 'planned', content: [], children: [] },
    earningsHistory: { id: 'earningsHistory', title: '📊 Earnings History', layer: 'user', tier: 3, desc: 'Detailed transaction log with filters.', status: 'planned', content: [], children: [] },

    profile: {
      id: 'profile', title: '👤 Profile', layer: 'user', tier: 2,
      desc: 'User\'s public profile. Bio, content, storefront, trust score, HOURS earned.',
      status: 'planned',
      content: ['Avatar / cover', 'Bio', 'Content tabs (posts, videos, articles)', 'Storefront link', 'Trust score', 'Verification badges', 'Total HOURS earned', 'Follow/message buttons'],
      children: ['editProfile'],
    },
    editProfile: { id: 'editProfile', title: '✏️ Edit Profile', layer: 'user', tier: 3, desc: 'Edit bio, avatar, links, privacy settings.', status: 'planned', content: [], children: [] },

    messages: {
      id: 'messages', title: '💬 Messages', layer: 'user', tier: 2,
      desc: 'E2E encrypted DMs. Group chats. Not mined for ads. Not used for AI training.',
      status: 'planned',
      content: ['Conversation list', 'Individual DM view', 'Group chat', 'Media sharing', 'Voice messages', 'Encryption indicator', 'Block/report'],
      children: ['conversation'],
    },
    conversation: { id: 'conversation', title: '💬 Conversation', layer: 'user', tier: 3, desc: 'Individual chat thread with media, voice, reactions.', status: 'planned', content: [], children: [] },

    notifications: {
      id: 'notifications', title: '🔔 Notifications', layer: 'user', tier: 2,
      desc: 'All notifications grouped by type: engagement, earnings, governance, system.',
      status: 'planned',
      content: ['Engagement notifications', 'HOURS earned alerts', 'Governance vote reminders', 'Quest completions', 'Follower updates', 'System announcements'],
      children: [],
    },

    settings: {
      id: 'settings', title: '⚙️ Settings', layer: 'user', tier: 2,
      desc: 'Account, privacy, feed control, wellness, security, data export.',
      status: 'planned',
      content: ['Account settings', 'Privacy dashboard', 'Feed control preferences', 'Wellness mode settings', 'Security (2FA, sessions)', 'AI protection toggle', 'Data export / delete', 'Notification preferences', 'Ad preferences', 'Blocked users'],
      children: ['privacyDashboard', 'wellnessSettings', 'feedControl', 'securitySettings', 'dataExport'],
    },
    privacyDashboard: { id: 'privacyDashboard', title: '🔒 Privacy Dashboard', layer: 'user', tier: 3, desc: 'See exactly what data OURS has. Control every setting. Delete anything.', status: 'planned', content: ['Data inventory', 'Third-party access log', 'AI training opt-in/out', 'Data download', 'Account deletion'], children: [] },
    wellnessSettings: { id: 'wellnessSettings', title: '🧘 Wellness Settings', layer: 'user', tier: 3, desc: 'Time limits, hidden metrics, "all caught up" preferences.', status: 'planned', content: ['Daily time limit', 'Break reminders', 'Hide vanity metrics', '"All caught up" behavior', 'Doomscroll prevention'], children: [] },
    feedControl: { id: 'feedControl', title: '🎛️ Feed Control', layer: 'user', tier: 3, desc: 'Chrono vs algo slider. Content type preferences. Muted topics.', status: 'planned', content: ['Algorithm mix slider', 'Content type weights', 'Muted topics', 'Blocked keywords', 'Political content toggle'], children: [] },
    securitySettings: { id: 'securitySettings', title: '🛡️ Security', layer: 'user', tier: 3, desc: '2FA, active sessions, login alerts, impersonation detection.', status: 'planned', content: ['Two-factor authentication', 'Active sessions', 'Login notifications', 'Trusted devices', 'Security score'], children: [] },
    dataExport: { id: 'dataExport', title: '📥 Data Export', layer: 'user', tier: 3, desc: 'Export everything: posts, followers, data, HOURS history.', status: 'planned', content: ['Full data export', 'Follower list export', 'Content archive', 'HOURS transaction history', 'Audience portability'], children: [] },

    search: {
      id: 'search', title: '🔍 Search', layer: 'user', tier: 2,
      desc: 'Universal search across all content types, users, groups, products, and topics.',
      status: 'planned',
      content: ['Search bar with autocomplete', 'Results by type: People, Posts, Videos, Articles, Products, Groups', 'Trending searches', 'Recent searches', 'Filtered results'],
      children: [],
    },

    // ──────────────────────────────
    // ADVERTISER PORTAL (LOGGED IN)
    // ──────────────────────────────
    advHome: {
      id: 'advHome', title: '📢 Advertiser Dashboard', layer: 'advertiser', tier: 1,
      desc: 'Campaign overview. Active campaigns, spend, performance, audience insights.',
      status: 'partially-built', file: 'ours-candy-store.jsx (advertiser view)',
      content: ['Active campaigns overview', 'Total spend / budget', 'Performance summary (impressions, clicks, conversions)', 'Audience insights', 'Quick-create campaign', 'Billing summary'],
      children: ['campaignBuilder', 'campaignManager', 'advAnalytics', 'audienceInsights', 'adCreativeLibrary', 'advBilling', 'advSettings'],
    },
    campaignBuilder: {
      id: 'campaignBuilder', title: '🎯 Campaign Builder', layer: 'advertiser', tier: 2,
      desc: 'Step-by-step campaign creation. Objective → Audience → Format → Creative → Budget → Launch.',
      status: 'planned',
      content: ['Step 1: Objective (awareness, engagement, conversions, sponsorship)', 'Step 2: Audience targeting (interests, demographics, trust score, zone)', 'Step 3: Ad format selection', 'Step 4: Creative upload/builder', 'Step 5: Budget & schedule', 'Step 6: Review & launch', 'Estimated reach preview', 'Revenue flow preview (show how spend distributes)'],
      children: ['adPreview'],
    },
    adPreview: { id: 'adPreview', title: '👁️ Ad Preview', layer: 'advertiser', tier: 3, desc: 'See how your ad looks in each zone/format before publishing.', status: 'planned', content: ['Feed preview', 'Video pre-roll preview', 'Community placement preview', 'Challenge branding preview'], children: [] },
    campaignManager: {
      id: 'campaignManager', title: '📋 Campaign Manager', layer: 'advertiser', tier: 2,
      desc: 'Manage all active, paused, and completed campaigns.',
      status: 'planned',
      content: ['Campaign list with status', 'Quick actions (pause, edit budget, duplicate)', 'Performance sparklines', 'A/B test management', 'Campaign comparison'],
      children: ['campaignDetail'],
    },
    campaignDetail: { id: 'campaignDetail', title: '📊 Campaign Detail', layer: 'advertiser', tier: 3, desc: 'Deep analytics for a single campaign.', status: 'planned', content: ['Performance over time chart', 'Audience breakdown', 'Creative performance', 'Engagement metrics', 'Conversion tracking', 'Revenue flow breakdown', 'Optimization suggestions'], children: [] },
    advAnalytics: {
      id: 'advAnalytics', title: '📈 Analytics Hub', layer: 'advertiser', tier: 2,
      desc: 'Cross-campaign analytics. Performance trends, benchmarks, audience overlap.',
      status: 'planned',
      content: ['Performance dashboards', 'Custom date ranges', 'Cross-campaign comparison', 'Industry benchmarks', 'Audience overlap analysis', 'ROAS tracking', 'Export reports'],
      children: [],
    },
    audienceInsights: {
      id: 'audienceInsights', title: '👥 Audience Insights', layer: 'advertiser', tier: 2,
      desc: 'Understand who your audience is. Demographics, interests, engagement patterns.',
      status: 'planned',
      content: ['Demographic breakdown', 'Interest categories', 'Zone engagement patterns', 'Trust score distribution', 'Active hours heatmap', 'Lookalike audience builder'],
      children: [],
    },
    adCreativeLibrary: {
      id: 'adCreativeLibrary', title: '🎨 Creative Library', layer: 'advertiser', tier: 2,
      desc: 'Manage all ad creatives. Upload, organize, A/B test, performance history.',
      status: 'planned',
      content: ['Creative upload', 'Asset management', 'Performance by creative', 'A/B test results', 'Creative specs per format', 'Brand guidelines storage'],
      children: [],
    },
    advBilling: {
      id: 'advBilling', title: '💳 Billing', layer: 'advertiser', tier: 2,
      desc: 'Payment methods, invoices, spend limits, receipts.',
      status: 'planned',
      content: ['Payment methods', 'Invoice history', 'Spend limits', 'Auto-pay settings', 'Tax receipts', 'Budget alerts'],
      children: [],
    },
    advSettings: {
      id: 'advSettings', title: '⚙️ Advertiser Settings', layer: 'advertiser', tier: 2,
      desc: 'Team management, notification preferences, API access, brand profile.',
      status: 'planned',
      content: ['Team members & roles', 'Notification preferences', 'API access / keys', 'Brand profile', 'Conversion tracking setup', 'Pixel/SDK integration'],
      children: [],
    },
  };

  // ═══ STATUS COLORS ═══
  const statusColors = {
    'built': '#10b981',
    'partially-built': '#fbbf24',
    'planned': '#64748b',
  };

  // ═══ COUNT STATS ═══
  const allPages = Object.values(pages);
  const stats = {
    total: allPages.length,
    public: allPages.filter(p => p.layer === 'public').length,
    user: allPages.filter(p => p.layer === 'user').length,
    advertiser: allPages.filter(p => p.layer === 'advertiser').length,
    shared: allPages.filter(p => p.layer === 'shared').length,
    built: allPages.filter(p => p.status === 'built').length,
    partial: allPages.filter(p => p.status === 'partially-built').length,
    planned: allPages.filter(p => p.status === 'planned').length,
  };

  // ═══ FILTER PAGES ═══
  const filteredPages = allPages.filter(p => {
    if (activeLayer === 'all') return true;
    if (activeLayer === 'public') return p.layer === 'public' || p.layer === 'shared';
    return p.layer === activeLayer || p.layer === 'shared';
  });

  // Group by tier
  const tiers = {};
  filteredPages.forEach(p => {
    if (!tiers[p.tier]) tiers[p.tier] = [];
    tiers[p.tier].push(p);
  });

  const tierLabels = {
    0: '🌐 Root',
    1: '🏠 Primary Pages',
    2: '📄 Secondary Pages',
    3: '📑 Detail Pages',
    4: '🔍 Deep Pages',
  };

  const layerColors = { public: T.public, user: T.user, advertiser: T.advertiser, shared: T.shared };

  // ═══ PAGE DETAIL PANEL ═══
  const PageDetail = ({ page }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', padding: 16 }} onClick={() => setSelectedPage(null)}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 24, padding: 28, maxWidth: 520, width: '100%', maxHeight: '85vh', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ background: `${layerColors[page.layer]}22`, color: layerColors[page.layer], padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, fontFamily: T.font, textTransform: 'uppercase' }}>{page.layer}</span>
              <span style={{ background: `${statusColors[page.status]}22`, color: statusColors[page.status], padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, fontFamily: T.font }}>{page.status}</span>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>Tier {page.tier}</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, margin: 0, color: T.text }}>{page.title}</h2>
          </div>
          <button onClick={() => setSelectedPage(null)} style={{ background: T.card, border: 'none', borderRadius: '50%', width: 32, height: 32, color: T.dim, fontSize: 16, cursor: 'pointer' }}>×</button>
        </div>

        <p style={{ fontSize: 14, color: T.sub, fontFamily: T.font, lineHeight: 1.6, margin: '0 0 16px' }}>{page.desc}</p>

        {page.file && (
          <div style={{ background: `${statusColors[page.status]}10`, border: `1px solid ${statusColors[page.status]}25`, borderRadius: 10, padding: '8px 12px', marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginBottom: 2 }}>File</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: statusColors[page.status], fontFamily: T.mono }}>{page.file}</div>
          </div>
        )}

        {page.content && page.content.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: T.font, marginBottom: 8 }}>Page Content</div>
            {page.content.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: i < page.content.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 10, color: layerColors[page.layer], fontFamily: T.mono, fontWeight: 700, marginTop: 2, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 12, color: T.text, fontFamily: T.font }}>{c}</span>
              </div>
            ))}
          </div>
        )}

        {page.children && page.children.length > 0 && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: T.font, marginBottom: 8 }}>Child Pages →</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {page.children.map(childId => {
                const child = pages[childId];
                if (!child) return null;
                return (
                  <button key={childId} onClick={() => setSelectedPage(childId)} style={{
                    padding: '6px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                    background: `${layerColors[child.layer]}12`, border: `1px solid ${layerColors[child.layer]}25`,
                    color: layerColors[child.layer],
                  }}>{child.title}</button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }`}</style>

      {selectedPage && pages[selectedPage] && <PageDetail page={pages[selectedPage]} />}

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 12px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: T.font, background: `linear-gradient(135deg, ${T.user}, ${T.advertiser})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS — Site Architecture</h1>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginTop: 4 }}>Complete page hierarchy • Click any page for full spec</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 16 }}>
          {[
            { label: 'Total Pages', value: stats.total, color: T.text },
            { label: 'Built', value: stats.built, color: '#10b981' },
            { label: 'Partial', value: stats.partial, color: '#fbbf24' },
            { label: 'Planned', value: stats.planned, color: '#64748b' },
          ].map((s, i) => (
            <div key={i} style={{ background: T.surface, borderRadius: 12, padding: '10px 12px', textAlign: 'center', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: T.mono }}>{s.value}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Layer legend & filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All', count: stats.total },
            { id: 'public', label: '🌐 Public', count: stats.public + stats.shared, color: T.public },
            { id: 'user', label: '👤 User', count: stats.user, color: T.user },
            { id: 'advertiser', label: '📢 Advertiser', count: stats.advertiser, color: T.advertiser },
          ].map(f => (
            <button key={f.id} onClick={() => setActiveLayer(f.id)} style={{
              padding: '7px 14px', borderRadius: 10, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
              background: activeLayer === f.id ? `${f.color || T.text}15` : T.surface,
              border: `1px solid ${activeLayer === f.id ? `${f.color || T.text}40` : T.border}`,
              color: activeLayer === f.id ? (f.color || T.text) : T.dim,
            }}>{f.label} ({f.count})</button>
          ))}
        </div>

        {/* Tier groups */}
        {Object.entries(tiers).sort(([a],[b]) => a - b).map(([tier, tierPages]) => (
          <div key={tier} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.font, color: T.sub, marginBottom: 8, padding: '0 2px' }}>
              {tierLabels[tier] || `Tier ${tier}`}
              <span style={{ color: T.dim, fontWeight: 400, marginLeft: 8 }}>{tierPages.length} pages</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: tier < 2 ? '1fr' : '1fr 1fr', gap: 6 }}>
              {tierPages.map(page => (
                <div key={page.id} onClick={() => setSelectedPage(page.id)} style={{
                  background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '12px 14px',
                  cursor: 'pointer', borderLeft: `3px solid ${layerColors[page.layer]}`,
                  transition: 'border-color 0.15s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font, color: T.text, lineHeight: 1.3 }}>{page.title}</div>
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColors[page.status], display: 'inline-block', marginTop: 4 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, lineHeight: 1.4 }}>{page.desc.length > 80 ? page.desc.slice(0, 80) + '...' : page.desc}</div>
                  {page.children && page.children.length > 0 && (
                    <div style={{ fontSize: 9, color: layerColors[page.layer], marginTop: 6, fontFamily: T.font, fontWeight: 600 }}>
                      → {page.children.length} child page{page.children.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Build Priority */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 18px', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, fontFamily: T.font, margin: '0 0 12px' }}>🔨 Build Priority Waterfall</h3>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, lineHeight: 1.5, margin: '0 0 16px' }}>What to build next, in order of impact:</p>
          {[
            { phase: 'Phase 1 — Foundation', color: '#ef4444', items: ['Auth flow + Onboarding', 'Profile page', 'Settings (privacy, feed control, security)', 'Legal pages (terms, privacy, disclosures)'] },
            { phase: 'Phase 2 — Core Zones', color: '#f59e0b', items: ['Watch Zone (video player, shorts swiper)', 'Read Zone (article reader)', 'Community Zone (groups, discussion)', 'Messages (E2E encrypted DMs)'] },
            { phase: 'Phase 3 — Earning Engine', color: '#10b981', items: ['Wallet / Earnings dashboard', 'Quest system (daily/weekly)', 'Storefront (creator products)', 'Arena (challenges, leaderboards)'] },
            { phase: 'Phase 4 — Governance + Discovery', color: '#0ea5e9', items: ['Govern Zone (voting, proposals)', 'Explore Zone (visual discovery)', 'Listen Zone (audio rooms, podcasts)', 'Search (universal)'] },
            { phase: 'Phase 5 — Advertiser Portal', color: '#a78bfa', items: ['Campaign Builder', 'Campaign Manager + Analytics', 'Audience Insights', 'Billing + Creative Library'] },
            { phase: 'Phase 6 — Growth + Polish', color: '#ec4899', items: ['Public Roadmap', 'Transparency Reports', 'Creator Stories / Case Studies', 'Press Kit', 'Advertiser Case Studies'] },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${p.color}22`, border: `2px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, fontFamily: T.mono, color: p.color }}>{i + 1}</div>
                <span style={{ fontSize: 13, fontWeight: 700, fontFamily: T.font, color: p.color }}>{p.phase}</span>
              </div>
              <div style={{ marginLeft: 36 }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: T.sub, fontFamily: T.font, padding: '3px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Notes */}
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 18px', marginBottom: 24 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, fontFamily: T.font, margin: '0 0 10px' }}>📐 Architecture Notes</h3>
          <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font, lineHeight: 1.7 }}>
            <p style={{ marginBottom: 8 }}><strong style={{ color: T.user }}>User path:</strong> ours.com → Homepage → Sign Up → Onboarding → Candy Store Home → Zones → Deep pages. Every page earns HOURS. Every action is gamified. "You're all caught up" replaces infinite scroll in every zone.</p>
            <p style={{ marginBottom: 8 }}><strong style={{ color: T.advertiser }}>Advertiser path:</strong> ours.com/advertise → Advertiser Landing → Sign Up → Dashboard → Campaign Builder → Analytics. Full transparency on spend allocation. Self-serve for small brands, managed for enterprise.</p>
            <p style={{ marginBottom: 8 }}><strong style={{ color: T.public }}>Public pages</strong> serve dual purpose: conversion (waitlist signups) and credibility (blueprint, transparency reports, press). Every public page has CTAs for both user and advertiser signup.</p>
            <p style={{ marginBottom: 0 }}><strong style={{ color: T.shared }}>Shared infrastructure:</strong> Auth, onboarding, legal pages serve both user and advertiser paths. Single sign-on with role-based access.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OursSiteMap;
