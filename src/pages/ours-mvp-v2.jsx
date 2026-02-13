import React, { useState } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS PLATFORM MVP V2 — The 20-Problem Killer
// Every feature maps to a specific social media complaint
// ═══════════════════════════════════════════════════════════════

const C = {
  bg: '#080b12',
  surface: '#0f1520',
  card: '#151d2b',
  border: 'rgba(71,85,105,0.22)',
  primary: '#0ea5e9',
  accent: '#10b981',
  gold: '#f59e0b',
  red: '#ef4444',
  purple: '#a78bfa',
  text: '#e2e8f0',
  muted: '#94a3b8',
  dim: '#64748b',
};

// ═══════════════════════════════════════════════════════════════
// THE 20 COMPLAINTS + 20 SOLUTIONS
// ═══════════════════════════════════════════════════════════════
const complaints = [
  {
    id: 1,
    complaint: 'Privacy Exploitation',
    evidence: 'Only 18% trust Facebook with privacy. TikTok collects more data than any app. Meta & TikTok ranked dead last in 2025 Incogni Privacy Rankings.',
    platforms: 'Facebook, TikTok, Instagram',
    solution: 'Privacy-First Architecture',
    how: 'Minimal data collection. No third-party data sales. Users own their data and can export/delete anytime. Transparent data dashboard showing exactly what OURS stores.',
    feature: 'Privacy Dashboard',
    icon: '🔒',
    severity: 10,
  },
  {
    id: 2,
    complaint: 'Algorithm Manipulation',
    evidence: 'Users want content from people they follow, not algorithmic recommendations. Instagram pushes Reels over friend content. Feeds are "less social" than ever.',
    platforms: 'Instagram, Facebook, TikTok, X',
    solution: 'Chronological + Choice Feed',
    how: 'Default chronological feed from people you follow. Optional "Discover" tab for algorithmic suggestions. User controls the mix with a simple slider. Algorithm is transparent and explainable.',
    feature: 'Feed Control Slider',
    icon: '🎛️',
    severity: 9,
  },
  {
    id: 3,
    complaint: 'Mental Health Damage',
    evidence: 'Instagram worsens body image for 1 in 3 teen girls. 48% of teens say social media is "mostly negative." Anxiety mentions up 25% in 2025.',
    platforms: 'Instagram, TikTok, Snapchat',
    solution: 'Wellness-First Design',
    how: 'No infinite scroll — content ends with a "You\'re caught up" message. Built-in usage timer with gentle nudges. No vanity metrics visible by default (hide like counts). Positive engagement rewards.',
    feature: 'Wellness Mode',
    icon: '🧠',
    severity: 10,
  },
  {
    id: 4,
    complaint: 'Hate Speech & Toxicity',
    evidence: 'X rated 7.82/10 toxicity. 38.1% say X has the most trolling. Meta ended fact-checking in 2025.',
    platforms: 'X, Facebook, Instagram',
    solution: 'Community-Powered Moderation',
    how: 'Elected community moderators earn HOURS for moderation work. AI-assisted flagging with human review. Reputation scores that reward constructive behavior. "Cooling off" periods before inflammatory replies post.',
    feature: 'Trust Score System',
    icon: '🛡️',
    severity: 9,
  },
  {
    id: 5,
    complaint: 'Creator Exploitation / $0 Pay',
    evidence: 'Platforms keep all ad revenue. X only pays based on Premium engagement. Algorithm changes destroy creator income overnight. $276B in social media ad revenue — creators get crumbs.',
    platforms: 'ALL platforms',
    solution: 'Up to 70% Revenue Share via HOURS',
    how: 'Our target model distributes up to 70% of ad revenue to users proportional to their HOURS tokens. Every minute creating, engaging, moderating earns HOURS. Transparent daily revenue reports. Actual percentages may vary based on platform revenue and operating costs.',
    feature: 'HOURS Token System',
    icon: '💰',
    severity: 10,
  },
  {
    id: 6,
    complaint: 'Ad Overload & Intrusive Ads',
    evidence: '54% of ad-related mentions show anger. Users bombarded with irrelevant, low-quality ads. The more you use, the more ads. Clickbait ads increasing.',
    platforms: 'Facebook, Instagram, YouTube',
    solution: 'Respectful Ad Model',
    how: 'Maximum 1 ad per 10 content items. Users choose ad categories they\'re interested in. No autoplay video ads. Revenue from ads goes 70% back to users. Ad-free tier available by paying with HOURS.',
    feature: 'Ad Preferences + Ad-Free Mode',
    icon: '🚫',
    severity: 8,
  },
  {
    id: 7,
    complaint: 'Bots & Fake Accounts',
    evidence: 'Spam bots infest every platform. X struggles with serious spam. Facebook removes millions of impersonating accounts. Engagement metrics inflated by non-humans.',
    platforms: 'X, Facebook, Instagram, TikTok',
    solution: 'Verified Humanity',
    how: 'Progressive verification system — phone, email, optional ID. Bot accounts flagged and quarantined. Engagement metrics only count verified users. Human-first content ranking.',
    feature: 'Human Verification Badges',
    icon: '✅',
    severity: 7,
  },
  {
    id: 8,
    complaint: 'No User Ownership',
    evidence: 'Users create ALL the content, ARE the product, yet own nothing — no equity, no revenue share, no governance vote, no data portability.',
    platforms: 'ALL platforms',
    solution: 'True User Ownership',
    how: 'HOURS tokens = ownership stake. Governance votes on platform features proportional to HOURS. Community-elected board seats. Full data portability — export everything anytime. Open API for developers.',
    feature: 'Governance & Voting',
    icon: '🏛️',
    severity: 10,
  },
  {
    id: 9,
    complaint: 'Misinformation & Fake News',
    evidence: 'Fact-checking removed on Meta. Conspiracy content amplified by engagement algorithms. Users can\'t distinguish real from fake.',
    platforms: 'Facebook, X, TikTok, YouTube',
    solution: 'Community Notes + Source Transparency',
    how: 'Community-sourced fact-check notes (like X\'s Community Notes but better). Source links required for news claims. Misinformation labels from diverse fact-check panel. Algorithmic demotion of repeatedly flagged content.',
    feature: 'Community Fact-Check',
    icon: '📋',
    severity: 8,
  },
  {
    id: 10,
    complaint: 'Addictive Design / Doomscrolling',
    evidence: 'TikTok uses gambling addiction principles. 95 min/day avg on TikTok. 210M people worldwide addicted to social media. 82% of Gen Z believe they\'re addicted.',
    platforms: 'TikTok, Instagram, YouTube',
    solution: 'Intentional Design',
    how: 'No infinite scroll — paginated content with natural stopping points. Daily usage summaries. "Time well spent" metric showing productive vs passive usage. HOURS earned for meaningful engagement, not just time spent.',
    feature: 'Time Well Spent Dashboard',
    icon: '⏱️',
    severity: 9,
  },
  {
    id: 11,
    complaint: 'Platform Homogenization',
    evidence: 'Every platform copies TikTok. Instagram abandoned photography for Reels. YouTube pushed Shorts. Facebook became a "discovery engine." Users want platforms to be distinct.',
    platforms: 'Instagram, Facebook, YouTube',
    solution: 'Multi-Format Native Support',
    how: 'Equal treatment of text, image, video, audio, and long-form content. No format forced over another. Users choose their content experience. Creators pick their medium without algorithmic penalty.',
    feature: 'Format-Neutral Feed',
    icon: '🎨',
    severity: 6,
  },
  {
    id: 12,
    complaint: 'AI Data Scraping Without Consent',
    evidence: 'Meta and X use public posts to train AI without consent. Users opted-in by default. Content used to build AI that replaces creators.',
    platforms: 'Facebook, Instagram, X',
    solution: 'AI Opt-In Only',
    how: 'Content NEVER used for AI training by default. Explicit opt-in with compensation in HOURS if users choose to contribute. Clear labeling of AI-generated content. Creator IP protection built into ToS.',
    feature: 'AI Protection Shield',
    icon: '🤖',
    severity: 8,
  },
  {
    id: 13,
    complaint: 'Declining Organic Reach / Pay-to-Play',
    evidence: 'Organic reach on Facebook is 1-2%. Instagram reach dropped 30%+ since Reels push. Businesses must pay to be seen. "The glory days are over" for regular users.',
    platforms: 'Facebook, Instagram, LinkedIn',
    solution: 'Prioritized Follower Delivery',
    how: 'If someone follows you, we prioritize showing them your posts. No throttling reach to sell ads. Our design philosophy puts follower content first. Paid promotion available but never required. Actual delivery rates may vary based on user activity and preferences.',
    feature: 'Follower-First Feed',
    icon: '📢',
    severity: 9,
  },
  {
    id: 14,
    complaint: 'Political Polarization & Rage Bait',
    evidence: 'Algorithms fuel division and negativity. Meta serves rage bait to drive engagement. Boycott mentions surged 95% in 2025. Political content pushed without consent.',
    platforms: 'X, Facebook, Instagram, TikTok',
    solution: 'Rage-Bait Demotion',
    how: 'Algorithm penalizes rage-bait engagement farming. Political content opt-in only. "Temperature check" on heated threads before allowing replies. Constructive disagreement rewarded with HOURS.',
    feature: 'Civil Discourse Mode',
    icon: '🕊️',
    severity: 8,
  },
  {
    id: 15,
    complaint: 'Comparison Culture & FOMO',
    evidence: 'Constant comparison to highlight reels. FOMO drives anxiety. Users feel "left behind." Performative activism pressures. External validation addiction.',
    platforms: 'Instagram, TikTok, Facebook',
    solution: 'Authentic-First Culture',
    how: 'Like counts hidden by default (optional to show). No follower count vanity displays. "Real" posts encouraged with HOURS bonus. Anti-highlight-reel culture baked into community guidelines.',
    feature: 'Hidden Metrics Mode',
    icon: '🪞',
    severity: 7,
  },
  {
    id: 16,
    complaint: 'AI-Generated Content Flood (AI Slop)',
    evidence: 'AI content flooding every platform in 2025-2026. Users can\'t tell real from generated. Content quality plummeting. "Brainrot" was Oxford\'s Word of the Year 2024.',
    platforms: 'ALL platforms',
    solution: 'Human-First Content Policy',
    how: 'Mandatory AI content labeling. AI-generated posts in separate "AI" feed. Human-created content gets priority ranking. AI-assist tools allowed but must be disclosed. HOURS bonus for verified human-created content.',
    feature: 'Human Content Badge',
    icon: '👤',
    severity: 8,
  },
  {
    id: 17,
    complaint: 'Platform Saturation & Fragmentation',
    evidence: 'Users exhausted managing multiple platforms. Average person on 6+ platforms. Content must be reformatted for each. Time investment is enormous.',
    platforms: 'ALL platforms',
    solution: 'All-in-One Hub',
    how: 'Text, images, video, audio, long-form, marketplace, messaging, groups — all in one platform. Cross-post tools built in. One audience, one identity, one revenue stream. Import tools from other platforms.',
    feature: 'Unified Platform',
    icon: '🏠',
    severity: 7,
  },
  {
    id: 18,
    complaint: 'Censorship & Arbitrary Bans',
    evidence: 'Users banned without explanation. Appeals process is broken. Shadow-banning suspected but unconfirmed. Rules change without notice. Content removed inconsistently.',
    platforms: 'Facebook, Instagram, YouTube, TikTok',
    solution: 'Transparent Moderation',
    how: 'Every moderation action comes with explanation. Appeals reviewed by community jury within 48 hours. Published moderation guidelines with versioned changelog. No shadow-banning — if content is limited, user is told why.',
    feature: 'Moderation Transparency Log',
    icon: '⚖️',
    severity: 8,
  },
  {
    id: 19,
    complaint: 'Cybersecurity & Identity Theft',
    evidence: 'Hacking, phishing, identity theft rising. Cambridge Analytica-level breaches. Scammers copy profiles to impersonate users. Data breaches expose millions.',
    platforms: 'Facebook, X, LinkedIn',
    solution: 'Security-Hardened Accounts',
    how: 'Mandatory 2FA for all accounts. Login notifications with device info. Impersonation detection and rapid takedown. End-to-end encrypted DMs. Security score for each account.',
    feature: 'Security Score + E2E DMs',
    icon: '🔐',
    severity: 7,
  },
  {
    id: 20,
    complaint: 'Deinfluencing & Trust Collapse',
    evidence: '"Deinfluencing" mentions surged 79% in 2025. Users can\'t trust sponsored content. Boycott mentions up 95%. Hidden fees and deceptive pricing fuel distrust.',
    platforms: 'Instagram, TikTok, YouTube',
    solution: 'Radical Transparency',
    how: 'All sponsored content clearly labeled with exact payment amount. Affiliate links show commission percentage. Review authenticity scoring. HOURS bonus for honest negative reviews. "Trusted Reviewer" badges earned through consistent accuracy.',
    feature: 'Sponsorship Transparency',
    icon: '🔍',
    severity: 8,
  },
];

// ═══════════════════════════════════════════════════════════════
// MOCK DATA FOR PLATFORM
// ═══════════════════════════════════════════════════════════════
const mockUser = {
  name: 'Roger G.', handle: '@rogergrubb', avatar: '🧠',
  hours: 142.5, earnings: 28.50, groups: 3, followers: 47, level: 'Pioneer',
  trustScore: 94, securityScore: 88, wellnessScore: 72,
};

const mockFeed = [
  { id: 1, user: 'Sarah Chen', handle: '@sarahbuilds', avatar: '👩‍💻', content: 'Just earned $12.40 from my tutorial group this week. On Instagram I made $0 in 3 years of posting. The difference is real.', likes: 234, comments: 18, hours: 3.2, tag: 'Creator Win', time: '2h', isHuman: true, trustScore: 91 },
  { id: 2, user: 'Marcus J.', handle: '@marcusfitness', avatar: '💪', content: 'Launched my workout plan storefront. 14 sales in the first day. No middleman taking 70%. This is how platforms should work.', likes: 456, comments: 42, hours: 1.8, tag: 'Storefront', time: '4h', isHuman: true, trustScore: 88 },
  { id: 3, user: 'Priya Patel', handle: '@priyacooks', avatar: '🍳', content: 'My recipe group just hit 500 members. Every time someone engages, we ALL earn. Not just the platform. Community > Corporation.', likes: 891, comments: 67, hours: 5.1, tag: 'Milestone', time: '6h', isHuman: true, trustScore: 95 },
  { id: 4, user: 'Alex Rivera', handle: '@alexdesigns', avatar: '🎨', content: 'Price Tag Calculator says I generated $4,200 in ad revenue for Instagram last year. Instagram paid me: $0. Moving everything here.', likes: 1205, comments: 89, hours: 0.5, tag: 'Price Tag', time: '8h', isHuman: true, trustScore: 87 },
];

const mockGroups = [
  { id: 1, name: 'Indie Hackers Bay Area', members: 1240, posts: 89, hourly: '$0.12/hr', icon: '🚀', hot: true },
  { id: 2, name: 'Solopreneur Kitchen', members: 890, posts: 156, hourly: '$0.08/hr', icon: '🍕' },
  { id: 3, name: 'AI Builders Club', members: 3400, posts: 234, hourly: '$0.18/hr', icon: '🤖', hot: true },
  { id: 4, name: 'Fitness Accountability', members: 2100, posts: 67, hourly: '$0.06/hr', icon: '🏋️' },
  { id: 5, name: 'Crypto Alpha Seekers', members: 5600, posts: 445, hourly: '$0.22/hr', icon: '📈', hot: true },
  { id: 6, name: 'Digital Nomad Network', members: 1800, posts: 102, hourly: '$0.10/hr', icon: '✈️' },
];

const mockMarketplace = [
  { id: 1, title: 'Complete Python Bootcamp', seller: '@sarahbuilds', price: 29, rating: 4.8, sales: 142, icon: '📚' },
  { id: 2, title: '30-Day HIIT Program', seller: '@marcusfitness', price: 19, rating: 4.9, sales: 89, icon: '💪' },
  { id: 3, title: 'Recipe Collection: Asian Fusion', seller: '@priyacooks', price: 12, rating: 4.7, sales: 234, icon: '🍜' },
  { id: 4, title: 'UI/UX Design Templates', seller: '@alexdesigns', price: 49, rating: 4.6, sales: 67, icon: '🎨' },
  { id: 5, title: 'SEO Mastery Guide 2026', seller: '@growthhacker', price: 39, rating: 4.5, sales: 156, icon: '📊' },
  { id: 6, title: 'Meditation Audio Pack', seller: '@zenmaster', price: 15, rating: 4.9, sales: 312, icon: '🧘' },
];

// ═══════════════════════════════════════════════════════════════
// PRICE TAG CALCULATOR
// ═══════════════════════════════════════════════════════════════
const PriceTagCalculator = ({ onClose }) => {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState('');
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [yearsActive, setYearsActive] = useState('');
  const [result, setResult] = useState(null);
  const platforms = {
    instagram: { name: 'Instagram', color: '#E4405F', rpm: 8.50, icon: '📸' },
    tiktok: { name: 'TikTok', color: '#010101', rpm: 5.20, icon: '🎵' },
    youtube: { name: 'YouTube', color: '#FF0000', rpm: 12.00, icon: '🎬' },
    twitter: { name: 'X/Twitter', color: '#1DA1F2', rpm: 3.80, icon: '🐦' },
    facebook: { name: 'Facebook', color: '#1877F2', rpm: 6.40, icon: '📘' },
  };
  const calculate = () => {
    const f = parseInt(followers) || 0, p = parseInt(postsPerWeek) || 0, y = parseInt(yearsActive) || 1;
    const plat = platforms[platform];
    const impressionsPerPost = f * 0.035 * 4.2;
    const totalPosts = p * 52 * y;
    const totalImpressions = impressionsPerPost * totalPosts;
    const adRevenue = (totalImpressions / 1000) * plat.rpm;
    setResult({ adRevenue: adRevenue.toFixed(2), oursWouldPay: (adRevenue * 0.70).toFixed(2), totalPosts, totalImpressions: (totalImpressions / 1000000).toFixed(1) });
  };
  const inp = { width: '100%', padding: '10px 12px', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, fontSize: 14, outline: 'none', boxSizing: 'border-box' };
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 }}>
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: 28, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', color: C.dim, fontSize: 20, cursor: 'pointer' }}>×</button>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: '0 0 4px' }}>💰 Your Price Tag</h2>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>How much revenue YOU generated — and got paid $0.</p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {Object.entries(platforms).map(([key, p]) => (
            <button key={key} onClick={() => setPlatform(key)} style={{ padding: '6px 12px', borderRadius: 20, border: `1px solid ${platform === key ? p.color : C.border}`, background: platform === key ? `${p.color}22` : 'transparent', color: platform === key ? '#fff' : C.muted, fontSize: 12, cursor: 'pointer', fontWeight: 500 }}>
              {p.icon} {p.name}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <div><label style={{ fontSize: 11, color: C.dim, display: 'block', marginBottom: 4 }}>Followers</label><input type="number" placeholder="e.g. 5000" value={followers} onChange={e => setFollowers(e.target.value)} style={inp} /></div>
          <div><label style={{ fontSize: 11, color: C.dim, display: 'block', marginBottom: 4 }}>Posts per week</label><input type="number" placeholder="e.g. 5" value={postsPerWeek} onChange={e => setPostsPerWeek(e.target.value)} style={inp} /></div>
          <div><label style={{ fontSize: 11, color: C.dim, display: 'block', marginBottom: 4 }}>Years on platform</label><input type="number" placeholder="e.g. 3" value={yearsActive} onChange={e => setYearsActive(e.target.value)} style={inp} /></div>
        </div>
        <button onClick={calculate} style={{ width: '100%', padding: 12, background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}>Calculate My Price Tag</button>
        {result && (
          <div style={{ background: C.bg, borderRadius: 12, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.dim, textTransform: 'uppercase', letterSpacing: 1 }}>You generated for {platforms[platform].name}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: C.red, margin: '4px 0' }}>${Number(result.adRevenue).toLocaleString()}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{result.totalPosts.toLocaleString()} posts • {result.totalImpressions}M impressions</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#f87171', textTransform: 'uppercase' }}>They paid you</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.red }}>$0</div>
              </div>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#34d399', textTransform: 'uppercase' }}>OURS would target</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.accent }}>~${Number(result.oursWouldPay).toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
const OursPlatformV2 = () => {
  const [activeNav, setActiveNav] = useState('feed');
  const [showCalculator, setShowCalculator] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});
  const [feedSlider, setFeedSlider] = useState(20); // 0=chrono, 100=algo
  const [showMetrics, setShowMetrics] = useState(false);
  const [wellnessMode, setWellnessMode] = useState(true);
  const [expandedComplaint, setExpandedComplaint] = useState(null);

  const navItems = [
    { id: 'feed', label: 'Feed', icon: '🏠' },
    { id: 'groups', label: 'Groups', icon: '👥' },
    { id: 'market', label: 'Market', icon: '🛍️' },
    { id: 'wallet', label: 'Wallet', icon: '💰' },
    { id: 'blueprint', label: '20×20', icon: '📋' },
  ];

  const severityBar = (val) => (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[...Array(10)].map((_, i) => (
        <div key={i} style={{
          width: 6, height: 14, borderRadius: 2,
          background: i < val ? (val >= 9 ? C.red : val >= 7 ? C.gold : C.accent) : 'rgba(71,85,105,0.2)',
        }} />
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      {showCalculator && <PriceTagCalculator onClose={() => setShowCalculator(false)} />}

      {/* ─── TOP BAR ─── */}
      <div style={{ position: 'sticky', top: 0, background: `${C.bg}ee`, backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 26, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</div>
          <span style={{ background: `${C.accent}22`, color: C.accent, padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 600 }}>MVP V2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setShowCalculator(true)} style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.red})`, border: 'none', borderRadius: 20, padding: '6px 14px', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>💰 Price Tag</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.card, padding: '4px 10px', borderRadius: 20, fontSize: 11 }}>
            <span style={{ color: C.gold }}>⏱ {mockUser.hours}</span>
            <span style={{ color: C.dim }}>hrs</span>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{mockUser.avatar}</div>
        </div>
      </div>

      {/* ─── NAV ─── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, padding: '0 8px', background: C.surface, overflowX: 'auto' }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
            flex: 1, minWidth: 60, padding: '12px 4px', border: 'none', background: 'none',
            color: activeNav === item.id ? C.primary : C.dim, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            borderBottom: `2px solid ${activeNav === item.id ? C.primary : 'transparent'}`,
            transition: 'all 0.2s', whiteSpace: 'nowrap',
          }}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: 16 }}>

        {/* ═══ FEED TAB ═══ */}
        {activeNav === 'feed' && (
          <div>
            {/* Feed Control Slider — solves #2 Algorithm Manipulation */}
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 10, color: C.dim, minWidth: 55 }}>🕐 Chrono</span>
              <input type="range" min="0" max="100" value={feedSlider} onChange={e => setFeedSlider(e.target.value)}
                style={{ flex: 1, accentColor: C.primary, height: 4 }} />
              <span style={{ fontSize: 10, color: C.dim, minWidth: 40 }}>Algo 🎛️</span>
              <button onClick={() => setShowMetrics(!showMetrics)} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', color: showMetrics ? C.gold : C.dim, fontSize: 9, cursor: 'pointer' }}>
                {showMetrics ? '👁️ Metrics ON' : '👁️‍🗨️ Metrics OFF'}
              </button>
            </div>

            {/* Wellness banner — solves #3, #10 */}
            {wellnessMode && (
              <div style={{ background: `${C.accent}11`, border: `1px solid ${C.accent}33`, borderRadius: 12, padding: '10px 14px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.accent }}>🧠 Wellness Mode Active</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Scroll limit: 30 posts • Hidden vanity metrics • Gentle reminders</div>
                </div>
                <button onClick={() => setWellnessMode(false)} style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', color: C.dim, fontSize: 9, cursor: 'pointer' }}>Adjust</button>
              </div>
            )}

            {/* HOURS earnings banner — solves #5, #8 */}
            <div style={{ background: `linear-gradient(135deg, ${C.primary}12, ${C.accent}12)`, border: `1px solid ${C.primary}33`, borderRadius: 14, padding: 16, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, color: C.dim, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your HOURS</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.gold }}>{mockUser.hours} hrs</div>
                <div style={{ fontSize: 12, color: C.accent }}>≈ ${mockUser.earnings.toFixed(2)} est. earnings*</div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                  <span style={{ background: `${C.accent}22`, color: C.accent, padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 600 }}>🏅 {mockUser.level}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, fontSize: 10, color: C.muted }}>
                  <span>🛡️ Trust: {mockUser.trustScore}</span>
                  <span>🔐 Sec: {mockUser.securityScore}</span>
                </div>
              </div>
            </div>

            {/* Feed posts — with trust scores, human badges, hidden metrics */}
            {mockFeed.map(post => (
              <div key={post.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{post.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{post.user}</span>
                      {/* Solves #7 — Human verification badge */}
                      {post.isHuman && <span style={{ fontSize: 9, background: `${C.primary}22`, color: C.primary, padding: '1px 5px', borderRadius: 4 }}>👤 Human</span>}
                      {/* Solves #4 — Trust score */}
                      <span style={{ fontSize: 9, color: C.dim }}>🛡️{post.trustScore}</span>
                      <span style={{ color: C.dim, fontSize: 10, marginLeft: 'auto' }}>{post.time}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                      <span style={{ background: `${C.accent}22`, color: C.accent, padding: '1px 6px', borderRadius: 6, fontSize: 9, fontWeight: 600 }}>+{post.hours} HOURS</span>
                      <span style={{ background: `${C.primary}22`, color: C.primary, padding: '1px 6px', borderRadius: 6, fontSize: 9, fontWeight: 600 }}>{post.tag}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: C.text, margin: '0 0 12px' }}>{post.content}</p>
                <div style={{ display: 'flex', gap: 20, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>
                  <button onClick={() => setLikedPosts(p => ({ ...p, [post.id]: !p[post.id] }))} style={{ background: 'none', border: 'none', color: likedPosts[post.id] ? C.red : C.dim, fontSize: 12, cursor: 'pointer' }}>
                    {likedPosts[post.id] ? '❤️' : '🤍'} {showMetrics ? (post.likes + (likedPosts[post.id] ? 1 : 0)) : ''}
                  </button>
                  <span style={{ color: C.dim, fontSize: 12 }}>💬 {showMetrics ? post.comments : ''}</span>
                  <span style={{ color: C.dim, fontSize: 12, marginLeft: 'auto' }}>🔄 Share</span>
                </div>
              </div>
            ))}

            {/* Solves #10 — "You're caught up" instead of infinite scroll */}
            <div style={{ textAlign: 'center', padding: '24px 0', color: C.dim, fontSize: 13 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
              <div style={{ fontWeight: 600, color: C.muted }}>You're all caught up!</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>You've seen all posts from people you follow. Time well spent: 12 min</div>
            </div>
          </div>
        )}

        {/* ═══ GROUPS TAB ═══ */}
        {activeNav === 'groups' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Groups</h2>
              <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Join communities where engagement = earnings • Community-moderated • Shared treasury</p>
            </div>
            {mockGroups.map(group => (
              <div key={group.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: C.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{group.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{group.name}</span>
                    {group.hot && <span style={{ background: '#ef444422', color: '#f87171', padding: '1px 6px', borderRadius: 6, fontSize: 8, fontWeight: 700 }}>🔥 HOT</span>}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{group.members.toLocaleString()} members • {group.posts} posts/week</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: C.accent, fontWeight: 700, fontSize: 13 }}>{group.hourly}</div>
                  <div style={{ fontSize: 9, color: C.dim }}>avg earn rate</div>
                </div>
              </div>
            ))}
            {/* Solves #8 — Governance */}
            <div style={{ background: `${C.purple}11`, border: `1px solid ${C.purple}33`, borderRadius: 12, padding: 14, marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.purple, marginBottom: 4 }}>🏛️ Group Governance</div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>Every group has elected moderators, a shared treasury, and member votes on rules. Your HOURS = your voting power. Groups you help build = groups you own.</div>
            </div>
          </div>
        )}

        {/* ═══ MARKETPLACE TAB ═══ */}
        {activeNav === 'market' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Marketplace</h2>
              <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Creator storefronts • Up to 95% to creators* • Transparent reviews</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {mockMarketplace.map(item => (
                <div key={item.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, cursor: 'pointer' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>by {item.seller}</div>
                  {/* Solves #20 — Transparent reviews */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: C.accent }}>${item.price}</span>
                    <span style={{ fontSize: 10, color: C.muted }}>⭐ {item.rating} • {item.sales} sold</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 9, color: C.dim, display: 'flex', justifyContent: 'space-between' }}>
                    <span>🔍 Verified reviews</span>
                    <span>💰 Up to 95% to creator*</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ WALLET TAB ═══ */}
        {activeNav === 'wallet' && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius: 16, padding: 24, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>Total HOURS Balance</div>
              <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', margin: '4px 0' }}>{mockUser.hours}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>≈ ${mockUser.earnings.toFixed(2)} USD est.*</div>
            </div>

            {/* Scores — solves #1, #4, #19 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
              {[
                { label: 'Trust', score: mockUser.trustScore, color: C.primary, icon: '🛡️' },
                { label: 'Security', score: mockUser.securityScore, color: C.accent, icon: '🔐' },
                { label: 'Wellness', score: mockUser.wellnessScore, color: C.purple, icon: '🧠' },
              ].map((s, i) => (
                <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 18 }}>{s.icon}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.score}</div>
                  <div style={{ fontSize: 10, color: C.dim }}>{s.label} Score</div>
                </div>
              ))}
            </div>

            {/* How HOURS Work */}
            <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>How HOURS Work</h3>
            {[
              { icon: '⏱️', title: 'Time = Value', desc: 'Every minute creating, engaging, or moderating earns HOURS tokens.' },
              { icon: '💸', title: 'Up to 70% Revenue Share', desc: 'Target model: up to 70% of ad revenue to users proportional to HOURS. 30% to platform ops. Actual rates may vary.*' },
              { icon: '🏪', title: 'Storefront Sales', desc: 'Target: keep up to 95% of sales. Low platform fee. Subject to payment processing costs.*' },
              { icon: '📈', title: 'Compound Growth', desc: 'More engagement → more HOURS → bigger share → more earnings.' },
              { icon: '🏛️', title: 'Governance Power', desc: 'HOURS = voting power on platform decisions. Your platform, your rules.' },
              { icon: '🤖', title: 'AI Protection', desc: 'Content never used for AI training without opt-in + compensation.' },
            ].map((item, i) => (
              <div key={i} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: 12, marginBottom: 6, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ 20×20 BLUEPRINT TAB ═══ */}
        {activeNav === 'blueprint' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px', fontFamily: "'Space Grotesk', sans-serif" }}>20 Problems × 20 Solutions</h2>
              <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Every major social media complaint — and exactly how OURS kills it</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: C.dim }}>
                <span>🔴 Critical (9-10)</span>
                <span>🟡 High (7-8)</span>
                <span>🟢 Medium (6)</span>
              </div>
            </div>

            {complaints.map((c, i) => {
              const isExpanded = expandedComplaint === c.id;
              return (
                <div key={c.id} onClick={() => setExpandedComplaint(isExpanded ? null : c.id)} style={{
                  background: isExpanded ? `${c.severity >= 9 ? C.red : c.severity >= 7 ? C.gold : C.accent}08` : C.surface,
                  border: `1px solid ${isExpanded ? (c.severity >= 9 ? C.red : c.severity >= 7 ? C.gold : C.accent) + '44' : C.border}`,
                  borderRadius: 12,
                  padding: isExpanded ? 16 : '12px 14px',
                  marginBottom: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.dim, fontFamily: "'JetBrains Mono', monospace" }}>#{c.id}</span>
                        <span style={{ fontWeight: 600, fontSize: 13, color: C.text }}>{c.complaint}</span>
                      </div>
                      {!isExpanded && (
                        <div style={{ fontSize: 11, color: C.accent, fontWeight: 500, marginTop: 2 }}>→ {c.solution}</div>
                      )}
                    </div>
                    <div>{severityBar(c.severity)}</div>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ marginTop: 12 }}>
                      {/* The Problem */}
                      <div style={{ background: `${C.red}11`, border: `1px solid ${C.red}22`, borderRadius: 8, padding: 10, marginBottom: 8 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.red, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>THE PROBLEM</div>
                        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{c.evidence}</div>
                        <div style={{ fontSize: 10, color: C.dim, marginTop: 6 }}>Worst offenders: {c.platforms}</div>
                      </div>

                      {/* The Solution */}
                      <div style={{ background: `${C.accent}11`, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: 10 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>OURS SOLUTION: {c.solution}</div>
                        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{c.how}</div>
                        <div style={{ marginTop: 8, display: 'inline-block', background: `${C.primary}22`, color: C.primary, padding: '3px 10px', borderRadius: 6, fontSize: 10, fontWeight: 600 }}>
                          Feature: {c.feature}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Summary */}
            <div style={{ background: `linear-gradient(135deg, ${C.primary}15, ${C.accent}15)`, border: `1px solid ${C.primary}33`, borderRadius: 14, padding: 20, marginTop: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: C.text, marginBottom: 4 }}>20 Problems. 20 Solutions. 1 Platform.</div>
              <div style={{ fontSize: 14, color: C.muted }}>Every feature in OURS exists because a real problem demanded it.</div>
              <div style={{ fontSize: 16, color: C.gold, fontWeight: 700, marginTop: 8 }}>It's OURS. Not theirs.</div>
              <div style={{ fontSize: 9, color: C.dim, marginTop: 12, lineHeight: 1.6, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
                *All revenue percentages, payout figures, and feature descriptions represent targets and aspirational design goals. Actual results will vary based on platform revenue, operating costs, user engagement, and market conditions. HOURS tokens are not a cryptocurrency, security, or investment. Price Tag Calculator provides estimates for illustrative purposes only. Platform features are subject to change during development. See full disclosures at ours.com/disclosures.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OursPlatformV2;
