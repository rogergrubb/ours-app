import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — THE HOURS ECONOMY
// "The currency that can't be bought. Only earned."
//
// Earning • Spending • Tipping • Staking • Trust Score • Ownership Tiers
// Revenue Sharing • The Full Circle
//
// HOURS are not cryptocurrency. Not securities. Not fiat.
// They are proof of contribution — and the key to ownership.
// ═══════════════════════════════════════════════════════════════════════════

const OursHoursEconomy = () => {
  const [view, setView] = useState('overview'); // overview | earn | spend | tip | stake | tiers | revenue | faq
  const [mounted, setMounted] = useState(false);
  const [activeEarnTab, setActiveEarnTab] = useState('create');
  const [activeSpendTab, setActiveSpendTab] = useState('boost');
  const [selectedTier, setSelectedTier] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simActivity, setSimActivity] = useState({ posts: 5, videos: 1, comments: 20, votes: 3, tips: 10, referrals: 0 });
  const [animatedCount, setAnimatedCount] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [hoveredFlow, setHoveredFlow] = useState(null);

  useEffect(() => { setMounted(true); }, []);

  // Animate counter on overview
  useEffect(() => {
    if (mounted && view === 'overview') {
      let count = 0;
      const target = 142.5;
      const interval = setInterval(() => {
        count += target / 40;
        if (count >= target) { setAnimatedCount(target); clearInterval(interval); }
        else setAnimatedCount(Math.round(count * 10) / 10);
      }, 40);
      return () => clearInterval(interval);
    }
  }, [mounted, view]);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    lime: '#84cc16', teal: '#2dd4bf', rose: '#fb7185', indigo: '#818cf8',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const f = (family = 'body') => ({
    body: "'Outfit', sans-serif",
    mono: "'DM Mono', monospace",
    display: "'Playfair Display', serif",
  }[family]);

  // ═══ EARNING METHODS ═══
  const earningMethods = {
    create: [
      { action: 'Post text or photo', hours: '0.5', icon: '✏️', zone: 'Feed', frequency: 'Per post', note: 'Minimum 50 characters' },
      { action: 'Publish an article', hours: '3.0', icon: '📝', zone: 'Read', frequency: 'Per article', note: 'Minimum 500 words' },
      { action: 'Upload a video', hours: '2.0', icon: '🎬', zone: 'Watch', frequency: 'Per video', note: 'Minimum 60 seconds' },
      { action: 'List a product', hours: '1.0', icon: '🛍️', zone: 'Shop', frequency: 'Per listing', note: 'Must include description + photo' },
      { action: 'Host a live stream', hours: '1.5/hr', icon: '📡', zone: 'Live', frequency: 'Per hour live', note: 'Minimum 10 minutes' },
      { action: 'Host an audio room', hours: '1.5/hr', icon: '🎙️', zone: 'Listen', frequency: 'Per hour', note: 'Minimum 2 participants' },
      { action: 'Submit a proposal', hours: '2.0', icon: '🗳️', zone: 'Govern', frequency: 'Per proposal', note: 'Must pass format check' },
    ],
    engage: [
      { action: 'Comment on a post', hours: '0.1', icon: '💬', frequency: 'Per comment', note: 'Minimum 10 characters, max 50/day' },
      { action: 'Like content', hours: '0.05', icon: '❤️', frequency: 'Per like', note: 'Max 100/day to prevent farming' },
      { action: 'Share content', hours: '0.2', icon: '🔄', frequency: 'Per share', note: 'External shares earn more' },
      { action: 'Vote on a proposal', hours: '0.5', icon: '🗳️', frequency: 'Per vote', note: 'One vote per proposal' },
      { action: 'Report harmful content', hours: '0.3', icon: '🛡️', frequency: 'Per valid report', note: 'False reports lose HOURS' },
      { action: 'Complete daily check-in', hours: '0.25', icon: '📅', frequency: 'Daily', note: '7-day streak = 2x bonus' },
    ],
    quality: [
      { action: 'Content goes trending', hours: '5.0', icon: '🔥', frequency: 'Per trending post', note: 'Determined by organic engagement' },
      { action: 'Receive 100+ likes', hours: '2.0', icon: '💯', frequency: 'Per milestone', note: 'First time per post only' },
      { action: 'Article read to completion', hours: '0.1', icon: '📖', frequency: 'Per reader', note: 'Must read 80%+ of article' },
      { action: 'Video watched fully', hours: '0.05', icon: '👁️', frequency: 'Per full view', note: 'Must watch 90%+' },
      { action: 'Live stream viewer milestone', hours: '1.0', icon: '📡', frequency: 'Per 50 viewers', note: '50, 100, 250, 500, 1K+' },
      { action: 'Product sale completed', hours: '1.0', icon: '✅', frequency: 'Per sale', note: 'In addition to revenue share' },
    ],
    community: [
      { action: 'Refer a new member', hours: '5.0', icon: '🤝', frequency: 'Per referral', note: 'Must complete verification' },
      { action: 'Mentor a new creator', hours: '3.0', icon: '🎓', frequency: 'Per mentee', note: 'Mentee must publish 5+ posts' },
      { action: 'Moderate content', hours: '1.0/hr', icon: '⚖️', frequency: 'Per hour', note: 'Must be elected moderator' },
      { action: 'Win a challenge', hours: '10–100', icon: '🏆', frequency: 'Per win', note: 'Varies by challenge prize pool' },
      { action: 'Host a community event', hours: '5.0', icon: '🎉', frequency: 'Per event', note: 'Minimum 10 attendees' },
    ],
  };

  // ═══ SPENDING OPTIONS ═══
  const spendingOptions = {
    boost: [
      { action: 'Boost post visibility', cost: '5', icon: '🚀', desc: 'Algorithmically promote to more feeds for 24 hours', duration: '24h' },
      { action: 'Pin post to profile', cost: '2', icon: '📌', desc: 'Keep a post at the top of your profile permanently', duration: 'Permanent' },
      { action: 'Highlight in zone', cost: '10', icon: '⭐', desc: 'Featured placement in zone discovery for 48 hours', duration: '48h' },
      { action: 'Promote live stream', cost: '15', icon: '📡', desc: 'Push notification to non-subscribers in your zone', duration: 'One-time' },
    ],
    tools: [
      { action: 'Advanced analytics', cost: '20/mo', icon: '📊', desc: 'Deep audience insights, engagement patterns, optimal posting times' },
      { action: 'Custom profile theme', cost: '10', icon: '🎨', desc: 'Unlock custom colors, layouts, and profile effects' },
      { action: 'Scheduled posting', cost: '5/mo', icon: '📅', desc: 'Queue posts to publish at optimal times automatically' },
      { action: 'Multi-format export', cost: '8', icon: '📦', desc: 'Export content in multiple formats for cross-platform use' },
    ],
    shop: [
      { action: 'Buy items in Shop', cost: 'Varies', icon: '🛍️', desc: 'Use HOURS as partial or full payment for products' },
      { action: 'Gift a subscription', cost: '25', icon: '🎁', desc: "Pay for someone else's premium access with your HOURS" },
      { action: 'Unlock premium content', cost: 'Varies', icon: '🔓', desc: 'Access gated articles, courses, or exclusive videos' },
    ],
    give: [
      { action: 'Tip a creator', cost: '0.5+', icon: '⏣', desc: "Transfer HOURS directly to someone who's earned your respect" },
      { action: 'Fund a proposal', cost: '10+', icon: '🗳️', desc: 'Contribute HOURS to a governance proposal you support' },
      { action: 'Support a challenge', cost: '5+', icon: '🏆', desc: 'Add to a challenge prize pool for the community' },
    ],
  };

  // ═══ OWNERSHIP TIERS ═══
  const tiers = [
    {
      name: 'Observer', range: '0–99', icon: '👁️', color: T.dim, pct: '0%',
      benefits: ['View all content', 'Like and comment', 'Basic profile'],
      revenueShare: 'None — earn HOURS to begin',
      description: 'New to OURS. Exploring, learning, getting started.',
    },
    {
      name: 'Contributor', range: '100–999', icon: '🌱', color: T.accent, pct: '0.5%',
      benefits: ['Everything in Observer', 'Create all content types', 'Basic analytics', 'Vote on proposals'],
      revenueShare: 'Entry into the revenue pool',
      description: "You're creating. You're participating. You're an owner.",
    },
    {
      name: 'Creator', range: '1,000–4,999', icon: '🔥', color: T.orange, pct: '2%',
      benefits: ['Everything in Contributor', 'Advanced analytics', 'Priority support', 'Custom profile', 'Submit proposals'],
      revenueShare: 'Meaningful share of platform revenue',
      description: 'Consistent creator. Known in your zone. Building audience.',
    },
    {
      name: 'Builder', range: '5,000–24,999', icon: '⚡', color: T.primary, pct: '5%',
      benefits: ['Everything in Creator', 'Beta feature access', 'Creator spotlight', 'Moderation tools', 'Revenue dashboard'],
      revenueShare: 'Significant share — enough to notice',
      description: 'Shaping the platform. Your contributions move the needle.',
    },
    {
      name: 'Architect', range: '25,000–99,999', icon: '🏗️', color: T.purple, pct: '12%',
      benefits: ['Everything in Builder', 'Platform advisory access', 'Custom tools', 'Verified badge', 'Direct team channel'],
      revenueShare: 'Top-tier share — this is real income*',
      description: 'You built this place. The platform reflects your work.',
    },
    {
      name: 'Founder', range: '100,000+', icon: '👑', color: T.gold, pct: '25%',
      benefits: ['Everything in Architect', 'Board-level governance voice', 'Revenue multiplier', 'Equity consideration*', 'Legacy status'],
      revenueShare: 'Maximum share — founding-level ownership*',
      description: "The people who built OURS from the ground up. Legends.",
    },
  ];

  // ═══ REVENUE SHARING MODEL ═══
  const revenueModel = {
    totalRevenue: '$1,000,000',
    period: 'Monthly (illustrative)',
    sources: [
      { name: 'Shop transactions', pct: 34, amount: '$340,000', icon: '🛍️' },
      { name: 'Premium subscriptions', pct: 22, amount: '$220,000', icon: '⭐' },
      { name: 'Advertising (opt-in)', pct: 18, amount: '$180,000', icon: '📢' },
      { name: 'API & partnerships', pct: 14, amount: '$140,000', icon: '🔗' },
      { name: 'Marketplace fees', pct: 12, amount: '$120,000', icon: '💱' },
    ],
    distribution: [
      { name: 'Creator Revenue Pool', pct: 70, amount: '$700,000', color: T.accent, desc: 'Distributed to all HOURS holders proportionally' },
      { name: 'Platform Operations', pct: 20, amount: '$200,000', color: T.primary, desc: 'Servers, development, support, security' },
      { name: 'Community Treasury', pct: 10, amount: '$100,000', color: T.gold, desc: 'Governed by proposals — grants, challenges, growth' },
    ],
  };

  // ═══ FAQ ═══
  const faqs = [
    { q: 'Can I buy HOURS with real money?', a: 'No. HOURS cannot be purchased with fiat currency, cryptocurrency, or any other payment method. They can only be earned through genuine contribution to the platform. This is by design — it ensures that ownership reflects real value creation, not just wealth.' },
    { q: 'Can I sell or trade HOURS outside of OURS?', a: 'No. HOURS exist only within the OURS ecosystem. They cannot be transferred to external wallets, traded on exchanges, or converted to cryptocurrency. Any attempt to sell HOURS externally violates our Terms of Service.' },
    { q: 'Are HOURS cryptocurrency or a security?', a: 'No. HOURS are neither cryptocurrency nor securities. They are internal platform credits that represent contribution level and determine revenue-sharing eligibility. They have no independent market value, cannot be traded, and are not investment contracts. We have engaged legal counsel to ensure this structure.' },
    { q: 'What happens to my HOURS if I leave the platform?', a: 'HOURS remain in your account indefinitely. If you return, they are still there. If your account is deleted by request, your HOURS are returned to the Community Treasury. HOURS do not expire through inactivity alone.' },
    { q: 'How is revenue sharing calculated?', a: "Your share is determined by your HOURS balance relative to all HOURS in circulation, weighted by your ownership tier. For example, if you hold 5,000 HOURS (Builder tier, 5% weight) and the total pool is 10,000,000 HOURS, your share of the Creator Revenue Pool is calculated proportionally. Distributions happen quarterly." },
    { q: "Can HOURS be taken away?", a: "HOURS can be reduced as a consequence of Terms of Service violations, including spam, harassment, manipulation, or fraudulent activity. False content reports also deduct HOURS. The governance system determines the severity of deductions through community-voted moderation policies." },
    { q: 'How do you prevent HOURS farming?', a: 'Multiple systems: daily earning caps per activity type, minimum quality thresholds (character counts, engagement requirements), anti-bot verification, Sybil detection for fake accounts, and community reporting. The human verification system during signup is the first line of defense.' },
    { q: 'What is the revenue sharing target of 70%?', a: 'The 70% target means we aim to distribute 70% of net platform revenue to the Creator Revenue Pool. This is a target, not a guarantee. Actual percentages may vary based on operational costs, growth investments, and community governance decisions. We publish audited reports quarterly.' },
  ];

  // ═══ SIMULATOR CALC ═══
  const calculateSimEarnings = () => {
    const weekly =
      simActivity.posts * 0.5 +
      simActivity.videos * 2.0 +
      simActivity.comments * 0.1 +
      simActivity.votes * 0.5 +
      simActivity.tips +
      simActivity.referrals * 5.0;
    return {
      weekly: Math.round(weekly * 10) / 10,
      monthly: Math.round(weekly * 4.3 * 10) / 10,
      yearly: Math.round(weekly * 52 * 10) / 10,
    };
  };

  // ═══ STYLES ═══
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@400;700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 8px ${T.gold}30; } 50% { box-shadow: 0 0 24px ${T.gold}50; } }
    @keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes flowPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  // ═══ NAV SECTIONS ═══
  const sections = [
    { id: 'overview', label: 'Overview', icon: '⏣' },
    { id: 'earn', label: 'Earn', icon: '📈' },
    { id: 'spend', label: 'Spend', icon: '💎' },
    { id: 'tiers', label: 'Tiers', icon: '👑' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'simulator', label: 'Simulator', icon: '🧮' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
  ];

  // ═══ SECTION: OVERVIEW ═══
  const OverviewSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: '40px 20px 30px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200, height: 200, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.gold}15, transparent 70%)`,
          animation: 'glow 3s infinite',
        }} />
        <div style={{
          fontSize: 64, marginBottom: 12, position: 'relative',
          animation: 'float 3s ease-in-out infinite',
        }}>⏣</div>
        <h1 style={{
          fontSize: 32, fontWeight: 900, fontFamily: f('display'),
          background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: 8, position: 'relative',
        }}>HOURS</h1>
        <p style={{
          fontSize: 16, fontWeight: 600, color: T.text, fontFamily: f(),
          marginBottom: 6, position: 'relative',
        }}>The currency that can't be bought.</p>
        <p style={{
          fontSize: 14, color: T.sub, fontFamily: f(),
          maxWidth: 340, margin: '0 auto', lineHeight: 1.5, position: 'relative',
        }}>HOURS are proof of your contribution to OURS. They determine your ownership tier, your share of platform revenue, and your voice in governance.</p>
      </div>

      {/* Your balance */}
      <div style={{
        margin: '0 16px 20px', padding: 20, borderRadius: 18,
        background: `linear-gradient(135deg, ${T.gold}10, ${T.orange}08)`,
        border: `1px solid ${T.gold}25`, textAlign: 'center',
      }}>
        <div style={{ fontSize: 10, color: T.gold, fontFamily: f('mono'), letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Your Balance</div>
        <div style={{
          fontSize: 42, fontWeight: 900, fontFamily: f('mono'),
          color: T.gold, lineHeight: 1, marginBottom: 4,
          animation: 'countUp 0.6s ease',
        }}>{animatedCount}</div>
        <div style={{ fontSize: 12, color: `${T.gold}88`, fontFamily: f('mono') }}>HOURS</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.accent, fontFamily: f('mono') }}>Contributor</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Current Tier</div>
          </div>
          <div style={{ width: 1, background: T.border }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.primary, fontFamily: f('mono') }}>80</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Trust Score</div>
          </div>
          <div style={{ width: 1, background: T.border }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f('mono') }}>Q1 2026</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Next Payout</div>
          </div>
        </div>
      </div>

      {/* The Three Pillars */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10,
        }}>How HOURS Work</div>
        {[
          { icon: '📈', title: 'Earn by Contributing', desc: 'Create content, engage with others, participate in governance. Every real action earns HOURS. No purchases, no shortcuts.', color: T.accent },
          { icon: '🔄', title: 'Spend & Circulate', desc: 'Boost posts, tip creators, buy products, unlock tools. When HOURS move, the ecosystem grows. When you tip someone, you share your ownership.', color: T.primary },
          { icon: '💰', title: 'Own & Earn Revenue', desc: 'Your HOURS determine your ownership tier. Higher tiers get larger shares of actual platform revenue. Paid quarterly in real money.*', color: T.gold },
        ].map((pillar, i) => (
          <div key={i} style={{
            padding: 16, borderRadius: 16, marginBottom: 8,
            background: T.surface, border: `1px solid ${T.border}`,
            display: 'flex', gap: 12, alignItems: 'flex-start',
            animation: `slideUp 0.4s ease ${i * 0.1}s both`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: `${pillar.color}12`, border: `1px solid ${pillar.color}25`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
            }}>{pillar.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 4 }}>{pillar.title}</div>
              <div style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>{pillar.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* The Flow Diagram */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10,
        }}>The HOURS Lifecycle</div>
        <div style={{
          padding: 20, borderRadius: 18, background: T.surface,
          border: `1px solid ${T.border}`,
        }}>
          {[
            { icon: '🧑', label: 'You Create', arrow: '→', desc: 'Post, stream, write, build', color: T.accent },
            { icon: '⏣', label: 'Earn HOURS', arrow: '→', desc: 'Platform rewards your contribution', color: T.gold },
            { icon: '🔄', label: 'Circulate', arrow: '→', desc: 'Tip, boost, spend, or hold', color: T.primary },
            { icon: '📊', label: 'Tier Up', arrow: '→', desc: 'HOURS accumulate into ownership tier', color: T.purple },
            { icon: '💰', label: 'Revenue Share', arrow: '→', desc: 'Platform pays you quarterly*', color: T.accent },
            { icon: '🔁', label: 'Reinvest', arrow: '', desc: 'Create more, earn more, own more', color: T.orange },
          ].map((step, i) => (
            <div key={i}
              onMouseEnter={() => setHoveredFlow(i)}
              onMouseLeave={() => setHoveredFlow(null)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 8px', borderRadius: 12,
                background: hoveredFlow === i ? `${step.color}08` : 'transparent',
                transition: 'background 0.2s',
                borderBottom: i < 5 ? `1px solid ${T.border}` : 'none',
              }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${step.color}15`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: step.color, fontFamily: f() }}>{step.label}</div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{step.desc}</div>
              </div>
              {step.arrow && (
                <span style={{ fontSize: 16, color: T.dim, animation: 'flowPulse 2s infinite', animationDelay: `${i * 0.3}s` }}>↓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Key principles */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10,
        }}>Core Principles</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { icon: '🚫', title: "Can't Buy", desc: 'No purchases, no shortcuts', color: T.red },
            { icon: '🤝', title: 'Can Tip', desc: 'Share yours with others', color: T.accent },
            { icon: '🔒', title: "Can't Trade", desc: 'No external exchanges', color: T.purple },
            { icon: '📈', title: 'Can Grow', desc: 'More work = more HOURS', color: T.gold },
            { icon: '🏛️', title: 'Govern With', desc: 'Vote weight from HOURS', color: T.orange },
            { icon: '💵', title: 'Earn From', desc: 'Real revenue, real money*', color: T.accent },
          ].map((p, i) => (
            <div key={i} style={{
              padding: 14, borderRadius: 14, background: T.surface,
              border: `1px solid ${T.border}`, textAlign: 'center',
              animation: `slideUp 0.3s ease ${i * 0.05}s both`,
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{p.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, fontFamily: f(), marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══ SECTION: EARN ═══
  const EarnSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ padding: '20px 16px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>How to Earn HOURS</h2>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>Every genuine contribution earns HOURS. Quality beats quantity. Real engagement beats farming.</p>
      </div>

      {/* Earn tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px', overflowX: 'auto', marginBottom: 14, scrollbarWidth: 'none' }}>
        {[
          { id: 'create', label: 'Create', icon: '✏️', color: T.accent },
          { id: 'engage', label: 'Engage', icon: '💬', color: T.primary },
          { id: 'quality', label: 'Quality', icon: '⭐', color: T.gold },
          { id: 'community', label: 'Community', icon: '🤝', color: T.purple },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveEarnTab(tab.id)} style={{
            padding: '6px 14px', borderRadius: 10, border: 'none', whiteSpace: 'nowrap',
            background: activeEarnTab === tab.id ? `${tab.color}20` : T.surface,
            border: `1px solid ${activeEarnTab === tab.id ? `${tab.color}40` : T.border}`,
            fontSize: 11, fontWeight: 600, fontFamily: f(),
            color: activeEarnTab === tab.id ? tab.color : T.dim,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Earning methods list */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {earningMethods[activeEarnTab]?.map((method, i) => (
          <div key={i} style={{
            padding: '12px 14px', borderRadius: 14, background: T.surface,
            border: `1px solid ${T.border}`, display: 'flex', gap: 10,
            animation: `slideUp 0.3s ease ${i * 0.04}s both`,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: T.card, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18,
            }}>{method.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{method.action}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f(), marginTop: 2 }}>{method.note}</div>
              {method.zone && (
                <span style={{
                  fontSize: 9, color: T.primary, fontFamily: f('mono'), marginTop: 3,
                  background: `${T.primary}08`, padding: '1px 6px', borderRadius: 4,
                  display: 'inline-block',
                }}>{method.zone} zone</span>
              )}
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>+{method.hours}</div>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>HRS</div>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), marginTop: 2 }}>{method.frequency}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '12px 16px' }}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), lineHeight: 1.5 }}>
          *All HOURS earning rates shown are illustrative targets, not guarantees. Actual earning rates may be adjusted based on platform economics, anti-abuse measures, and community governance decisions. Daily earning caps apply to prevent manipulation.
        </p>
      </div>
    </div>
  );

  // ═══ SECTION: SPEND ═══
  const SpendSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ padding: '20px 16px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>How to Spend HOURS</h2>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>HOURS aren't just for holding. They unlock tools, amplify your voice, and flow to the people who deserve them.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '0 16px', overflowX: 'auto', marginBottom: 14, scrollbarWidth: 'none' }}>
        {[
          { id: 'boost', label: 'Boost', icon: '🚀', color: T.primary },
          { id: 'tools', label: 'Tools', icon: '🔧', color: T.cyan },
          { id: 'shop', label: 'Shop', icon: '🛍️', color: T.pink },
          { id: 'give', label: 'Give', icon: '💝', color: T.gold },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveSpendTab(tab.id)} style={{
            padding: '6px 14px', borderRadius: 10, border: 'none', whiteSpace: 'nowrap',
            background: activeSpendTab === tab.id ? `${tab.color}20` : T.surface,
            border: `1px solid ${activeSpendTab === tab.id ? `${tab.color}40` : T.border}`,
            fontSize: 11, fontWeight: 600, fontFamily: f(),
            color: activeSpendTab === tab.id ? tab.color : T.dim,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {spendingOptions[activeSpendTab]?.map((option, i) => (
          <div key={i} style={{
            padding: '14px', borderRadius: 14, background: T.surface,
            border: `1px solid ${T.border}`,
            animation: `slideUp 0.3s ease ${i * 0.04}s both`,
          }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: T.card, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18,
              }}>{option.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{option.action}</div>
                  <div style={{
                    padding: '2px 8px', borderRadius: 6,
                    background: `${T.gold}10`, border: `1px solid ${T.gold}20`,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>{option.cost}</span>
                    <span style={{ fontSize: 8, color: `${T.gold}88`, fontFamily: f('mono'), marginLeft: 2 }}>HRS</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), marginTop: 4, lineHeight: 1.4 }}>{option.desc}</div>
                {option.duration && (
                  <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 4, display: 'inline-block' }}>⏱️ {option.duration}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tipping explanation */}
      {activeSpendTab === 'give' && (
        <div style={{
          margin: '12px 16px', padding: 16, borderRadius: 16,
          background: `linear-gradient(135deg, ${T.gold}08, ${T.orange}06)`,
          border: `1px solid ${T.gold}20`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f(), marginBottom: 6 }}>💡 What tipping really means</div>
          <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.6 }}>
            When you tip someone 5 HOURS, you're not sending them money. You're transferring earned platform equity from your account to theirs. Their ownership tier goes up. Their revenue share grows. Their voice in governance gets louder.
          </p>
          <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.6, marginTop: 8 }}>
            You're saying: <em style={{ color: T.gold }}>"You deserve a bigger piece of this platform than I do right now."</em>
          </p>
          <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.6, marginTop: 8 }}>
            That's more powerful than a $5 donation will ever be.
          </p>
        </div>
      )}
    </div>
  );

  // ═══ SECTION: TIERS ═══
  const TiersSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ padding: '20px 16px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>Ownership Tiers</h2>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>Your HOURS accumulate into ownership tiers. Higher tiers unlock more benefits and larger revenue shares.*</p>
      </div>

      {/* Tier progress */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{
          padding: 14, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 18 }}>🌱</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.accent, fontFamily: f() }}>Contributor</span>
            </div>
            <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>142.5 / 1,000 HOURS</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: T.card, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 4,
              background: `linear-gradient(90deg, ${T.accent}, ${T.primary})`,
              width: '14.25%', transition: 'width 1s ease',
            }} />
          </div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: f(), marginTop: 6 }}>857.5 HOURS to <strong style={{ color: T.orange }}>Creator</strong> tier</div>
        </div>
      </div>

      {/* Tier cards */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tiers.map((tier, i) => {
          const isSelected = selectedTier === i;
          const isCurrent = tier.name === 'Contributor';
          return (
            <div key={i} onClick={() => setSelectedTier(isSelected ? null : i)} style={{
              borderRadius: 16, overflow: 'hidden',
              border: `1px solid ${isCurrent ? `${tier.color}40` : T.border}`,
              background: isCurrent ? `${tier.color}06` : T.surface,
              cursor: 'pointer', transition: 'all 0.2s',
              animation: `slideUp 0.3s ease ${i * 0.06}s both`,
            }}>
              <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                  background: `${tier.color}15`, border: `1px solid ${tier.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{tier.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: tier.color, fontFamily: f() }}>{tier.name}</span>
                    {isCurrent && (
                      <span style={{
                        fontSize: 8, fontWeight: 700, color: tier.color, fontFamily: f('mono'),
                        background: `${tier.color}15`, padding: '2px 6px', borderRadius: 4,
                      }}>YOU</span>
                    )}
                  </div>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{tier.range} HOURS</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: tier.color, fontFamily: f('mono') }}>{tier.pct}</div>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>Rev Share*</div>
                </div>
              </div>

              {isSelected && (
                <div style={{
                  padding: '0 16px 14px', animation: 'slideUp 0.2s ease',
                }}>
                  <div style={{
                    padding: 12, borderRadius: 12, background: T.card,
                    border: `1px solid ${T.border}`, marginBottom: 8,
                  }}>
                    <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.5, fontStyle: 'italic' }}>"{tier.description}"</p>
                  </div>
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
                    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6,
                  }}>Benefits</div>
                  {tier.benefits.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '3px 0' }}>
                      <span style={{ fontSize: 10, color: tier.color }}>✓</span>
                      <span style={{ fontSize: 11, color: T.text, fontFamily: f() }}>{b}</span>
                    </div>
                  ))}
                  <div style={{
                    marginTop: 8, padding: '8px 10px', borderRadius: 8,
                    background: `${tier.color}08`, border: `1px solid ${tier.color}15`,
                  }}>
                    <span style={{ fontSize: 10, color: tier.color, fontFamily: f(), fontWeight: 600 }}>💰 {tier.revenueShare}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: '12px 16px' }}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), lineHeight: 1.5 }}>
          *Revenue share percentages are illustrative targets representing the weight of each tier in the revenue distribution formula. Actual payouts depend on total platform revenue, number of HOURS holders per tier, and operational costs. "Equity consideration" at Founder tier is subject to legal review and board approval. See Terms for complete details.
        </p>
      </div>
    </div>
  );

  // ═══ SECTION: REVENUE ═══
  const RevenueSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ padding: '20px 16px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>Revenue Sharing</h2>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>OURS generates revenue. 70% goes back to the community. Quarterly. In real money.*</p>
      </div>

      {/* Revenue sources */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
        }}>Where Revenue Comes From (illustrative)</div>
        <div style={{
          padding: 16, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 28, fontWeight: 900, fontFamily: f('display'), color: T.accent }}>{revenueModel.totalRevenue}</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{revenueModel.period}</div>
          </div>
          {revenueModel.sources.map((src, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
              <span style={{ fontSize: 14, width: 24, textAlign: 'center' }}>{src.icon}</span>
              <span style={{ fontSize: 11, color: T.text, fontFamily: f(), flex: 1 }}>{src.name}</span>
              <div style={{ width: 100, height: 6, borderRadius: 3, background: T.card, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  background: T.primary, width: `${src.pct}%`,
                }} />
              </div>
              <span style={{ fontSize: 10, color: T.sub, fontFamily: f('mono'), width: 60, textAlign: 'right' }}>{src.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution */}
      <div style={{ padding: '0 16px', marginBottom: 16 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
        }}>How It Gets Split (target)</div>
        {revenueModel.distribution.map((dist, i) => (
          <div key={i} style={{
            padding: 14, borderRadius: 14, marginBottom: 8,
            background: `${dist.color}06`, border: `1px solid ${dist.color}20`,
            animation: `slideUp 0.3s ease ${i * 0.08}s both`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  fontSize: 22, fontWeight: 900, color: dist.color, fontFamily: f('mono'),
                }}>{dist.pct}%</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{dist.name}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: dist.color, fontFamily: f('mono') }}>{dist.amount}</span>
            </div>
            <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.4 }}>{dist.desc}</div>
          </div>
        ))}
      </div>

      {/* Your projected share */}
      <div style={{
        margin: '0 16px', padding: 16, borderRadius: 16,
        background: `linear-gradient(135deg, ${T.gold}08, ${T.accent}06)`,
        border: `1px solid ${T.gold}20`, marginBottom: 16,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: f(), marginBottom: 8 }}>Your Projected Share*</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginBottom: 3 }}>Your HOURS</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>142.5</div>
          </div>
          <div style={{ width: 1, background: T.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginBottom: 3 }}>Your Tier</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: f('mono') }}>Contributor</div>
          </div>
          <div style={{ width: 1, background: T.border }} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginBottom: 3 }}>Est. Quarterly</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: f('mono') }}>$—</div>
          </div>
        </div>
        <p style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 8, lineHeight: 1.4 }}>
          *Revenue sharing estimates depend on total platform revenue, total HOURS in circulation, and your tier weight. Actual payouts may vary significantly. Revenue sharing has not yet begun — first distribution targeted for Q2 2026.
        </p>
      </div>
    </div>
  );

  // ═══ SECTION: SIMULATOR ═══
  const SimulatorSection = () => {
    const earnings = calculateSimEarnings();
    return (
      <div style={{ animation: 'fadeIn 0.4s ease' }}>
        <div style={{ padding: '20px 16px 10px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>HOURS Simulator</h2>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>See how your activity level translates to HOURS. Adjust the sliders to match your expected activity.*</p>
        </div>

        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{
            padding: 16, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12,
            }}>Weekly Activity</div>

            {[
              { key: 'posts', label: 'Posts per week', icon: '✏️', max: 20, rate: '0.5 HRS each' },
              { key: 'videos', label: 'Videos per week', icon: '🎬', max: 10, rate: '2.0 HRS each' },
              { key: 'comments', label: 'Comments per week', icon: '💬', max: 100, rate: '0.1 HRS each' },
              { key: 'votes', label: 'Governance votes', icon: '🗳️', max: 10, rate: '0.5 HRS each' },
              { key: 'tips', label: 'HOURS received in tips', icon: '⏣', max: 50, rate: 'Direct transfer' },
              { key: 'referrals', label: 'Referrals per week', icon: '🤝', max: 10, rate: '5.0 HRS each' },
            ].map(slider => (
              <div key={slider.key} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14 }}>{slider.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{slider.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>{simActivity[slider.key]}</span>
                    <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>{slider.rate}</span>
                  </div>
                </div>
                <input
                  type="range" min="0" max={slider.max}
                  value={simActivity[slider.key]}
                  onChange={(e) => setSimActivity(prev => ({ ...prev, [slider.key]: parseInt(e.target.value) }))}
                  style={{
                    width: '100%', height: 6, borderRadius: 3,
                    appearance: 'none', background: T.card, outline: 'none',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ padding: '0 16px', marginBottom: 16 }}>
          <div style={{
            padding: 16, borderRadius: 16,
            background: `linear-gradient(135deg, ${T.gold}10, ${T.accent}08)`,
            border: `1px solid ${T.gold}25`,
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: f(),
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 12,
            }}>Estimated Earnings*</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Weekly', value: earnings.weekly, color: T.gold },
                { label: 'Monthly', value: earnings.monthly, color: T.accent },
                { label: 'Yearly', value: earnings.yearly, color: T.primary },
              ].map(period => (
                <div key={period.label} style={{
                  flex: 1, padding: 12, borderRadius: 12, textAlign: 'center',
                  background: T.surface, border: `1px solid ${T.border}`,
                }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: period.color, fontFamily: f('mono') }}>{period.value}</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>HRS / {period.label}</div>
                </div>
              ))}
            </div>

            {/* Tier projection */}
            <div style={{
              marginTop: 12, padding: '10px 12px', borderRadius: 10,
              background: T.surface, border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f() }}>
                At this rate, you'd reach <strong style={{ color: tiers.find(t => earnings.yearly > parseInt(t.range.replace(/,/g, '').split('–')[0]))?.color || T.dim }}>
                {tiers.filter(t => earnings.yearly > parseInt(t.range.replace(/,/g, '').split('–')[0])).pop()?.name || 'Observer'}
                </strong> tier in ~1 year
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 16px' }}>
          <p style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), lineHeight: 1.5 }}>
            *This simulator provides rough estimates based on illustrative earning rates. Actual HOURS earned may vary based on content quality, anti-abuse measures, daily caps, community engagement, and platform economics. Quality bonuses (trending, milestones) are not included in this calculation. This is not a guarantee of earnings.
          </p>
        </div>
      </div>
    );
  };

  // ═══ SECTION: FAQ ═══
  const FaqSection = () => (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div style={{ padding: '20px 16px 10px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>Frequently Asked Questions</h2>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>Honest answers to the questions that matter.</p>
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {faqs.map((faq, i) => (
          <div key={i} onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{
            padding: '14px 16px', borderRadius: 14,
            background: T.surface, border: `1px solid ${T.border}`,
            cursor: 'pointer', transition: 'all 0.2s',
            animation: `slideUp 0.3s ease ${i * 0.04}s both`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.4 }}>{faq.q}</div>
              <span style={{
                fontSize: 16, color: T.dim, flexShrink: 0,
                transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}>▾</span>
            </div>
            {expandedFaq === i && (
              <div style={{
                marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`,
                animation: 'slideUp 0.2s ease',
              }}>
                <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Final disclaimer */}
      <div style={{
        margin: '16px', padding: 16, borderRadius: 14,
        background: `${T.gold}06`, border: `1px solid ${T.gold}15`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f(), marginBottom: 6 }}>⚠️ Important Legal Notice</div>
        <p style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.6 }}>
          HOURS are internal platform credits, not financial instruments. They are not cryptocurrency, securities, stablecoins, or fiat currency. HOURS have no independent market value and cannot be purchased, sold, or traded outside the OURS platform. Revenue sharing targets (including the 70% distribution goal) are aspirational and subject to change based on platform economics, operational requirements, and community governance decisions. All earning rates shown throughout this document are illustrative targets, not guarantees. Past performance does not guarantee future results. OURS reserves the right to modify the HOURS system through community governance processes. Consult our complete Terms of Service for binding legal terms.
        </p>
      </div>
    </div>
  );

  // ═══ MAIN RENDER ═══
  const sectionComponents = {
    overview: OverviewSection,
    earn: EarnSection,
    spend: SpendSection,
    tiers: TiersSection,
    revenue: RevenueSection,
    simulator: SimulatorSection,
    faq: FaqSection,
  };

  const ActiveSection = sectionComponents[view] || OverviewSection;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <style>{globalStyles}</style>

      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>⏣</span>
              <span style={{
                fontSize: 18, fontWeight: 900, fontFamily: f(),
                background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>HOURS</span>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 10,
              background: `${T.gold}12`, border: `1px solid ${T.gold}25`,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>142.5 HRS</span>
            </div>
          </div>

          {/* Section nav */}
          <div style={{
            display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none',
            borderTop: `1px solid ${T.border}`,
          }}>
            {sections.map(s => (
              <button key={s.id} onClick={() => setView(s.id)} style={{
                padding: '8px 12px', border: 'none', background: 'none', whiteSpace: 'nowrap',
                fontFamily: f(), fontSize: 11, fontWeight: view === s.id ? 700 : 500,
                color: view === s.id ? T.gold : T.dim,
                borderBottom: `2px solid ${view === s.id ? T.gold : 'transparent'}`,
                display: 'flex', alignItems: 'center', gap: 3,
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 10 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active section */}
        <div style={{ paddingBottom: 40 }}>
          <ActiveSection />
        </div>
      </div>
    </div>
  );
};

export default OursHoursEconomy;
