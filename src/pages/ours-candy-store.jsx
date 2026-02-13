import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — THE CANDY STORE
// Not a feed. A world. Every zone earns. Every tap delights.
// Dual view: User Home + Advertiser Portal
// ═══════════════════════════════════════════════════════════════

const OursCandyStore = () => {
  const [view, setView] = useState('user'); // user | advertiser
  const [activeZone, setActiveZone] = useState(null);
  const [showReward, setShowReward] = useState(true);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [earnings, setEarnings] = useState(28.50);
  const [hours, setHours] = useState(142.5);
  const [pulseItems, setPulseItems] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedZone, setExpandedZone] = useState(null);
  const [claimedQuests, setClaimedQuests] = useState({});

  // Tick up earnings in real time
  useEffect(() => {
    const t = setInterval(() => {
      setEarnings(e => +(e + 0.001).toFixed(3));
      setPulseItems(p => p + 1);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const me = {
    name: 'Roger', handle: '@rogergrubb', avatar: '🧠',
    level: 7, levelName: 'Pioneer', xpCurrent: 2340, xpNext: 3000,
    trust: 94, streak: 12, rank: 847, totalUsers: 10247,
  };

  // ═══ DESIGN TOKENS ═══
  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', glow: 'rgba(14,165,233,0.08)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    font: "'Sora', sans-serif", mono: "'Space Mono', monospace",
  };

  // ═══ ZONES — The Aisles of the Candy Store ═══
  const zones = [
    {
      id: 'watch', icon: '🎬', title: 'Watch', subtitle: 'Short + long form video',
      gradient: `linear-gradient(135deg, #6366f1, #8b5cf6)`,
      description: 'Full-screen vertical video swiper, tutorials, documentaries, live streams. Every second watched earns HOURS.',
      stats: { items: '2.4K', hot: 'Trending', earn: '+0.3/min' },
      loveFrom: 'TikTok + YouTube',
      content: [
        { title: 'How I Built a $10K/mo SaaS', creator: '@indiehacker', views: '45K', duration: '12:30', type: 'tutorial' },
        { title: 'Tokyo Street Food at Midnight', creator: '@wandereats', views: '89K', duration: '0:58', type: 'short' },
        { title: 'The AI Agent Revolution', creator: '@futuredev', views: '23K', duration: '18:45', type: 'deep-dive' },
        { title: '5-Min Home Workout', creator: '@marcusfitness', views: '67K', duration: '5:32', type: 'fitness' },
      ]
    },
    {
      id: 'read', icon: '📰', title: 'Read', subtitle: 'Articles, threads, newsletters',
      gradient: `linear-gradient(135deg, #0ea5e9, #06b6d4)`,
      description: 'Long-form articles, investigative threads, newsletters. Quality writing that lives forever. Reading earns HOURS.',
      stats: { items: '890', hot: 'New', earn: '+0.8/article' },
      loveFrom: 'Medium + Substack',
      content: [
        { title: 'Why 500K Followers Meant $0', creator: '@priyacooks', reads: '12K', time: '10 min', type: 'essay' },
        { title: 'The Death of Organic Reach', creator: '@growthlabs', reads: '8.2K', time: '7 min', type: 'analysis' },
        { title: 'Building in Public: Month 3', creator: '@sarahbuilds', reads: '5.1K', time: '5 min', type: 'journal' },
        { title: 'Crypto Market Intelligence 101', creator: '@sentinelai', reads: '3.4K', time: '15 min', type: 'deep-dive' },
      ]
    },
    {
      id: 'community', icon: '🏛️', title: 'Community', subtitle: 'Groups with shared treasuries',
      gradient: `linear-gradient(135deg, #10b981, #059669)`,
      description: 'Find your tribe. Groups earn collectively. Elected mods. Shared treasuries. Real community ownership.',
      stats: { items: '340', hot: 'Active', earn: '+0.2/engage' },
      loveFrom: 'Facebook Groups + Reddit',
      content: [
        { name: 'Indie Hackers Bay Area', members: '1.2K', activity: '14 new', treasury: '$42.80', icon: '🚀' },
        { name: 'AI Builders Club', members: '3.4K', activity: '32 new', treasury: '$118.50', icon: '🤖' },
        { name: 'Solopreneur Kitchen', members: '890', activity: '7 new', treasury: '$23.10', icon: '🍕' },
        { name: 'Creative Writing Circle', members: '2.1K', activity: '19 new', treasury: '$67.20', icon: '✍️' },
      ]
    },
    {
      id: 'shop', icon: '🛍️', title: 'Shop', subtitle: 'Creator storefronts',
      gradient: `linear-gradient(135deg, #f59e0b, #f97316)`,
      description: 'Courses, templates, art, services. Creators keep up to ~95%. Verified reviews. Your store, your revenue.',
      stats: { items: '1.8K', hot: 'Selling', earn: '~95% kept*' },
      loveFrom: 'Instagram Shop + Gumroad',
      content: [
        { title: 'Python Bootcamp', seller: '@sarahbuilds', price: 29, sold: 142, rating: 4.8, icon: '📚' },
        { title: '30-Day HIIT Program', seller: '@marcusfitness', price: 19, sold: 89, rating: 4.9, icon: '💪' },
        { title: 'SaaS Dashboard UI Kit', seller: '@alexdesigns', price: 49, sold: 67, rating: 4.6, icon: '🎨' },
        { title: 'SEO Mastery 2026', seller: '@growthhacker', price: 39, sold: 156, rating: 4.5, icon: '📊' },
      ]
    },
    {
      id: 'explore', icon: '✨', title: 'Explore', subtitle: 'Visual discovery grid',
      gradient: `linear-gradient(135deg, #ec4899, #f43f5e)`,
      description: 'Pinterest-style visual discovery. Photos, infographics, moodboards, art. Tap anything, fall down the rabbit hole.',
      stats: { items: '15K+', hot: 'Curated', earn: '+0.1/save' },
      loveFrom: 'Pinterest + Instagram Explore',
      content: [],
    },
    {
      id: 'listen', icon: '🎙️', title: 'Listen', subtitle: 'Audio rooms + podcasts',
      gradient: `linear-gradient(135deg, #8b5cf6, #a78bfa)`,
      description: 'Live audio rooms, recorded podcasts, music playlists. Listen while you earn. Background mode included.',
      stats: { items: '230', hot: 'Live Now', earn: '+0.2/listen' },
      loveFrom: 'Twitter Spaces + Spotify',
      content: [
        { title: '🔴 LIVE: Creator Economy AMA', host: '@oursteam', listeners: 234, type: 'live' },
        { title: 'The Builder\'s Podcast #47', host: '@devbuilds', plays: '4.2K', type: 'podcast' },
        { title: 'Morning Motivation Mix', host: '@zenmaster', plays: '1.8K', type: 'playlist' },
      ]
    },
    {
      id: 'vote', icon: '🗳️', title: 'Govern', subtitle: 'Your platform, your vote',
      gradient: `linear-gradient(135deg, #0891b2, #0e7490)`,
      description: 'Vote on features, elect moderators, shape the roadmap. Your HOURS = your voting power. Real democracy.',
      stats: { items: '3', hot: 'Open', earn: '+0.5/vote' },
      loveFrom: 'Only on OURS',
      content: [
        { title: 'Add disappearing messages to DMs?', votes: 7284, status: 'Open', deadline: '2 days' },
        { title: 'Should AI-generated content be labeled?', votes: 12451, status: 'Open', deadline: '5 days' },
        { title: 'Elect Q2 Community Moderators', votes: 3892, status: 'Open', deadline: '1 week' },
      ]
    },
    {
      id: 'arena', icon: '🏆', title: 'Arena', subtitle: 'Challenges + leaderboards',
      gradient: `linear-gradient(135deg, #fbbf24, #f59e0b)`,
      description: 'Weekly challenges, creator competitions, community events. Compete, collaborate, earn bonus HOURS.',
      stats: { items: '5', hot: 'Active', earn: 'Up to 50x*' },
      loveFrom: 'Duolingo + Gaming',
      content: [
        { title: '7-Day Content Challenge', reward: '+50 HOURS', participants: 1247, deadline: '3 days', progress: 57 },
        { title: 'Best Tutorial of the Week', reward: '+100 HOURS', participants: 342, deadline: '5 days', progress: 0 },
        { title: 'Price Tag Challenge', reward: '+25 HOURS', participants: 8923, deadline: '1 day', progress: 100 },
      ]
    },
  ];

  // ═══ QUESTS (Daily/Weekly earning challenges) ═══
  const quests = [
    { id: 'q1', title: 'Post something', reward: 2.0, icon: '📝', done: true, type: 'daily' },
    { id: 'q2', title: 'Comment on 3 posts', reward: 1.5, icon: '💬', done: true, type: 'daily', progress: '3/3' },
    { id: 'q3', title: 'Watch 5 minutes of video', reward: 1.0, icon: '🎬', done: false, type: 'daily', progress: '2:30/5:00' },
    { id: 'q4', title: 'Save something to collection', reward: 0.5, icon: '📌', done: false, type: 'daily' },
    { id: 'q5', title: 'Vote on a governance issue', reward: 2.0, icon: '🗳️', done: false, type: 'daily' },
    { id: 'q6', title: 'Invite a friend', reward: 10.0, icon: '🤝', done: false, type: 'weekly' },
    { id: 'q7', title: 'List a product in storefront', reward: 5.0, icon: '🛍️', done: false, type: 'weekly' },
    { id: 'q8', title: 'Maintain 7-day streak', reward: 15.0, icon: '🔥', done: true, type: 'weekly' },
  ];

  // ═══ LIVE PULSE — Real-time community heartbeat ═══
  const pulseMessages = [
    '🎉 Sarah just earned +3.2 HOURS from a viral tutorial',
    '🛍️ Marcus sold 5 copies of his HIIT program',
    '🗳️ 127 new votes on "Add disappearing DMs"',
    '🏆 Price Tag Challenge hit 8,923 participants',
    '👥 AI Builders Club treasury reached $118.50',
    '📰 "Why 500K Followers Meant $0" hit 12K reads',
    '✊ OURS crossed 10,247 active users',
    '🎬 Tokyo Street Food video trending at 89K views',
    '💰 Community earned $1,247 in the last hour',
    '🔥 412 active streaks today',
  ];

  // ═══ ADVERTISER DATA ═══
  const adMetrics = {
    verifiedHumans: 94.2,
    avgEngagement: 8.7,
    botRate: 0.3,
    adSentiment: 72,
    avgCPM: 12.40,
    avgCTR: 4.2,
    roas: 6.8,
    audienceWilling: 87,
  };

  const adComparison = [
    { metric: 'Verified human rate', ours: '94.2%', them: '~70-80%', winner: 'ours' },
    { metric: 'Avg engagement rate', ours: '8.7%', them: '1-3%', winner: 'ours' },
    { metric: 'Bot / fake account rate', ours: '0.3%', them: '5-15%', winner: 'ours' },
    { metric: 'Users who WANT relevant ads', ours: '87%', them: '~12%', winner: 'ours' },
    { metric: 'Ad sentiment (positive)', ours: '72%', them: '~18%', winner: 'ours' },
    { metric: 'Avg click-through rate', ours: '4.2%', them: '0.5-1.5%', winner: 'ours' },
    { metric: 'Avg ROAS', ours: '6.8x', them: '2-4x', winner: 'ours' },
    { metric: 'Transparency', ours: 'Full', them: 'Opaque', winner: 'ours' },
  ];

  // ═══ DAILY REWARD ═══
  const DailyReward = () => {
    if (!showReward) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 28, padding: 36, maxWidth: 380, width: '90%', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Glow effect */}
          <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${T.gold}30, transparent)`, filter: 'blur(40px)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 3, color: T.gold, fontFamily: T.font, fontWeight: 700, marginBottom: 8 }}>Day {me.streak} Streak 🔥</div>
            <div style={{ fontSize: 56, marginBottom: 4, animation: rewardClaimed ? 'none' : 'float 2s ease-in-out infinite' }}>{rewardClaimed ? '🎉' : '🎁'}</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, margin: '8px 0 4px', color: T.text }}>
              {rewardClaimed ? 'Claimed!' : 'Daily Reward'}
            </h2>
            {rewardClaimed ? (
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: T.gold, fontFamily: T.mono, margin: '12px 0' }}>+3.0 HOURS</div>
                <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, lineHeight: 1.5, marginBottom: 16 }}>
                  Day {me.streak} bonus! Keep your streak alive for bigger rewards tomorrow.
                </div>
                <button onClick={() => setShowReward(false)} style={{
                  padding: '14px 40px', borderRadius: 14, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
                  background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff',
                }}>Enter the Candy Store →</button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 14, color: T.sub, fontFamily: T.font, lineHeight: 1.5, marginBottom: 20 }}>
                  You showed up. That earns HOURS.<br/>Tap to claim today's reward.
                </div>
                <button onClick={() => { setRewardClaimed(true); setHours(h => h + 3); setEarnings(e => +(e + 0.60).toFixed(2)); }} style={{
                  padding: '16px 48px', borderRadius: 14, border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
                  background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000',
                  boxShadow: `0 0 30px ${T.gold}40`,
                }}>🎁 Open Reward</button>
                <div style={{ fontSize: 10, color: T.dim, marginTop: 12, fontFamily: T.font }}>Rewards increase with consecutive streak days*</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ═══ QUEST PANEL ═══
  const QuestPanel = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 250, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', backdropFilter: 'blur(6px)' }} onClick={(e) => e.target === e.currentTarget && setShowQuests(false)}>
      <div style={{ background: T.surface, borderRadius: '28px 28px 0 0', width: '100%', maxWidth: 500, maxHeight: '85vh', overflow: 'auto', padding: '24px 20px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, margin: 0, color: T.text }}>⚡ Quest Board</h3>
            <p style={{ fontSize: 12, color: T.sub, margin: '2px 0 0', fontFamily: T.font }}>Complete quests → Earn bonus HOURS</p>
          </div>
          <button onClick={() => setShowQuests(false)} style={{ background: T.card, border: 'none', borderRadius: '50%', width: 32, height: 32, color: T.dim, fontSize: 16, cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: T.gold, fontFamily: T.font, marginBottom: 8 }}>Daily Quests</div>
        {quests.filter(q => q.type === 'daily').map(q => (
          <div key={q.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, marginBottom: 6,
            background: q.done ? `${T.accent}10` : T.card, border: `1px solid ${q.done ? `${T.accent}30` : T.border}`,
            opacity: q.done ? 0.7 : 1,
          }}>
            <span style={{ fontSize: 22 }}>{q.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font, color: T.text, textDecoration: q.done ? 'line-through' : 'none' }}>{q.title}</div>
              {q.progress && !q.done && <div style={{ fontSize: 10, color: T.primary, fontFamily: T.mono, marginTop: 2 }}>{q.progress}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              {q.done ? (
                <span style={{ fontSize: 11, color: T.accent, fontWeight: 700, fontFamily: T.font }}>✓ Done</span>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>+{q.reward}</span>
              )}
            </div>
          </div>
        ))}

        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, color: T.purple, fontFamily: T.font, margin: '16px 0 8px' }}>Weekly Quests</div>
        {quests.filter(q => q.type === 'weekly').map(q => (
          <div key={q.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, marginBottom: 6,
            background: q.done ? `${T.accent}10` : T.card, border: `1px solid ${q.done ? `${T.accent}30` : T.border}`,
            opacity: q.done ? 0.7 : 1,
          }}>
            <span style={{ fontSize: 22 }}>{q.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font, color: T.text }}>{q.title}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {q.done ? (
                <span style={{ fontSize: 11, color: T.accent, fontWeight: 700, fontFamily: T.font }}>✓ Done</span>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>+{q.reward}</span>
              )}
            </div>
          </div>
        ))}
        <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, marginTop: 12, lineHeight: 1.6 }}>
          *Quest rewards are in HOURS. Earnings estimates based on current platform revenue. Actual value may vary. HOURS are not a guarantee of income.
        </div>
      </div>
    </div>
  );

  // ═══ EXPANDED ZONE VIEW ═══
  const ZoneExpanded = ({ zone }) => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, overflow: 'auto', backdropFilter: 'blur(8px)' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '16px 12px' }}>
        {/* Zone header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button onClick={() => setExpandedZone(null)} style={{ background: T.card, border: 'none', borderRadius: '50%', width: 36, height: 36, color: T.text, fontSize: 16, cursor: 'pointer' }}>←</button>
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: zone.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          }}>{zone.icon}</div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, margin: 0 }}>{zone.title}</h2>
            <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{zone.subtitle} • From: {zone.loveFrom}</div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.6, fontFamily: T.font, margin: '0 0 16px' }}>{zone.description}</p>

        {/* Zone-specific content */}
        {zone.id === 'watch' && zone.content.map((v, i) => (
          <div key={i} style={{ background: T.card, borderRadius: 16, marginBottom: 8, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${T.border}` }}>
            <div style={{ height: 140, background: `linear-gradient(135deg, ${T.card}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>▶</div>
              <span style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 6, fontSize: 11, color: '#fff', fontFamily: T.mono }}>{v.duration}</span>
              <span style={{ position: 'absolute', top: 8, left: 12, background: `${T.primary}cc`, padding: '2px 8px', borderRadius: 6, fontSize: 9, fontWeight: 600, color: '#fff', fontFamily: T.font, textTransform: 'uppercase' }}>{v.type}</span>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font, marginBottom: 4 }}>{v.title}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.dim }}>
                <span>{v.creator} • {v.views} views</span>
                <span style={{ color: T.gold }}>⏱️ +HOURS</span>
              </div>
            </div>
          </div>
        ))}

        {zone.id === 'read' && zone.content.map((a, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 18, marginBottom: 8, cursor: 'pointer' }}>
            <span style={{ fontSize: 9, background: `${T.primary}22`, color: T.primary, padding: '2px 8px', borderRadius: 6, fontWeight: 600, fontFamily: T.font, textTransform: 'uppercase' }}>{a.type}</span>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: T.font, margin: '8px 0 4px', lineHeight: 1.3 }}>{a.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.dim, fontFamily: T.font }}>
              <span>{a.creator} • {a.reads} reads • {a.time}</span>
              <span style={{ color: T.gold }}>⏱️ +0.8 HOURS</span>
            </div>
          </div>
        ))}

        {zone.id === 'community' && zone.content.map((g, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font }}>{g.name}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{g.members} members • {g.activity}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, fontFamily: T.mono }}>{g.treasury}</div>
              <div style={{ fontSize: 9, color: T.dim }}>treasury*</div>
            </div>
          </div>
        ))}

        {zone.id === 'shop' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {zone.content.map((p, i) => (
              <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, cursor: 'pointer' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font, lineHeight: 1.3, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginBottom: 8 }}>by {p.seller}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: T.accent, fontFamily: T.font }}>${p.price}</span>
                  <span style={{ fontSize: 9, color: T.sub }}>⭐{p.rating} • {p.sold}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {zone.id === 'listen' && zone.content.map((a, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: a.type === 'live' ? `${T.red}22` : T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {a.type === 'live' ? '🔴' : a.type === 'podcast' ? '🎧' : '🎵'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font }}>{a.title}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{a.host} • {a.type === 'live' ? `${a.listeners} listening` : `${a.plays} plays`}</div>
            </div>
            <span style={{ fontSize: 10, color: T.gold, fontFamily: T.font }}>+HOURS</span>
          </div>
        ))}

        {zone.id === 'vote' && zone.content.map((v, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 18, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: T.font, lineHeight: 1.3, flex: 1, marginRight: 12 }}>{v.title}</div>
              <span style={{ fontSize: 9, background: `${T.cyan}22`, color: T.cyan, padding: '3px 8px', borderRadius: 8, fontWeight: 600, fontFamily: T.font, whiteSpace: 'nowrap' }}>{v.deadline} left</span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: T.sub, fontFamily: T.font }}>
              <span>{v.votes.toLocaleString()} votes</span>
              <span style={{ color: T.gold }}>+0.5 HOURS for voting</span>
            </div>
            <button style={{ marginTop: 10, padding: '10px 0', width: '100%', borderRadius: 10, border: `1px solid ${T.primary}`, background: `${T.primary}12`, color: T.primary, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>Cast Your Vote →</button>
          </div>
        ))}

        {zone.id === 'arena' && zone.content.map((c, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 18, marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: T.font }}>{c.title}</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{c.reward}</span>
            </div>
            <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font, marginBottom: 10 }}>{c.participants.toLocaleString()} participants • {c.deadline} left</div>
            {c.progress > 0 && (
              <div style={{ height: 8, borderRadius: 4, background: T.elevated, overflow: 'hidden', marginBottom: 4 }}>
                <div style={{ height: '100%', width: `${c.progress}%`, background: c.progress === 100 ? T.accent : `linear-gradient(90deg, ${T.primary}, ${T.cyan})`, borderRadius: 4 }} />
              </div>
            )}
            {c.progress === 100 ? (
              <div style={{ fontSize: 11, color: T.accent, fontWeight: 600, fontFamily: T.font }}>✓ Completed!</div>
            ) : (
              <button style={{ marginTop: 6, padding: '8px 0', width: '100%', borderRadius: 10, border: `1px solid ${T.gold}`, background: `${T.gold}12`, color: T.gold, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>Join Challenge →</button>
            )}
          </div>
        ))}

        {zone.id === 'explore' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
              {Array.from({ length: 12 }).map((_, i) => {
                const h = [120, 160, 140, 180, 130, 150, 170, 120, 160, 140, 150, 130][i];
                const hues = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#0ea5e9', '#8b5cf6', '#f43f5e', '#06b6d4', '#a78bfa', '#fb923c', '#22d3ee', '#14b8a6'];
                return (
                  <div key={i} style={{ height: h, borderRadius: 10, background: `linear-gradient(135deg, ${hues[i]}22, ${hues[i]}08)`, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: T.dim, cursor: 'pointer' }}>
                    {['🏔️','🎨','🍜','📐','🌊','🎭','🏙️','🌸','⚡','🎪','🦋','🔮'][i]}
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11, color: T.sub, textAlign: 'center', marginTop: 12, fontFamily: T.font }}>Visual discovery grid • Save anything → earn HOURS</div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════
  // USER VIEW
  // ═══════════════════════════════
  const UserView = () => (
    <div>
      {/* ─── WELCOME BANNER with live earnings ─── */}
      <div style={{
        background: `linear-gradient(135deg, ${T.surface}, ${T.card})`,
        borderRadius: 20, padding: '20px 20px 16px', margin: '12px 0',
        border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${T.gold}15, transparent)`, filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${T.primary}10, transparent)`, filter: 'blur(25px)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>Welcome back</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, color: T.text }}>{me.name} 🧠</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: T.font }}>Rank</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.primary, fontFamily: T.mono }}>#{me.rank}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font }}>of {me.totalUsers.toLocaleString()}</div>
            </div>
          </div>

          {/* Live earnings ticker */}
          <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
            <div style={{ flex: 1, background: `${T.gold}08`, border: `1px solid ${T.gold}18`, borderRadius: 14, padding: '10px 14px' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, color: T.dim, fontFamily: T.font }}>HOURS Balance</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>{hours.toFixed(1)}</div>
            </div>
            <div style={{ flex: 1, background: `${T.accent}08`, border: `1px solid ${T.accent}18`, borderRadius: 14, padding: '10px 14px' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, color: T.dim, fontFamily: T.font }}>Est. Value*</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.accent, fontFamily: T.mono }}>${earnings.toFixed(2)}</div>
            </div>
          </div>

          {/* XP Bar / Level progress */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: T.font, marginBottom: 4 }}>
              <span style={{ color: T.sub }}>🏅 Level {me.level} — {me.levelName}</span>
              <span style={{ color: T.dim }}>{me.xpCurrent}/{me.xpNext} XP</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: T.elevated, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(me.xpCurrent/me.xpNext)*100}%`, background: `linear-gradient(90deg, ${T.primary}, ${T.cyan})`, borderRadius: 3 }} />
            </div>
          </div>

          {/* Quick stats row */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
            {[
              { icon: '🔥', label: 'Streak', value: `${me.streak}d` },
              { icon: '🛡️', label: 'Trust', value: me.trust },
              { icon: '⚡', label: 'Quests', value: `${quests.filter(q=>q.done).length}/${quests.length}` },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', cursor: i === 2 ? 'pointer' : 'default' }} onClick={() => i === 2 && setShowQuests(true)}>
                <div style={{ fontSize: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.mono, color: T.text }}>{s.value}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── QUEST PROMPT ─── */}
      <div onClick={() => setShowQuests(true)} style={{
        background: `linear-gradient(90deg, ${T.gold}10, ${T.orange}10)`, border: `1px solid ${T.gold}20`,
        borderRadius: 14, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
      }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.font, color: T.text }}>3 quests left today</div>
          <div style={{ fontSize: 10, color: T.gold, fontFamily: T.font }}>+3.5 HOURS available → Complete them all for a 2x bonus*</div>
        </div>
        <span style={{ color: T.dim, fontSize: 16 }}>→</span>
      </div>

      {/* ─── LIVE PULSE ─── */}
      <div style={{
        overflow: 'hidden', borderRadius: 10, marginBottom: 16,
        background: `${T.primary}06`, border: `1px solid ${T.primary}12`,
      }}>
        <div style={{
          display: 'flex', gap: 40, whiteSpace: 'nowrap', padding: '8px 0',
          animation: 'ticker 30s linear infinite',
        }}>
          {[...pulseMessages, ...pulseMessages].map((msg, i) => (
            <span key={i} style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{msg}</span>
          ))}
        </div>
      </div>

      {/* ─── THE CANDY STORE — Zone Grid ─── */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, fontFamily: T.font, margin: 0, color: T.text }}>What are you in the mood for?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {zones.map(zone => (
            <div key={zone.id} onClick={() => setExpandedZone(zone.id)} style={{
              borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
              background: T.card, border: `1px solid ${T.border}`,
              transition: 'transform 0.15s, box-shadow 0.15s',
              position: 'relative',
            }}>
              {/* Gradient header */}
              <div style={{ height: 56, background: zone.gradient, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{zone.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, fontFamily: T.font, color: '#fff' }}>{zone.title}</div>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '10px 14px 12px' }}>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font, lineHeight: 1.4, marginBottom: 8 }}>{zone.subtitle}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 9, background: `${T.primary}18`, color: T.primary, padding: '2px 6px', borderRadius: 4, fontFamily: T.font, fontWeight: 600 }}>{zone.stats.items}</span>
                  <span style={{ fontSize: 9, color: T.gold, fontFamily: T.mono, fontWeight: 600 }}>{zone.stats.earn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── LEADERBOARD PREVIEW ─── */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 18, padding: '16px 18px', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, fontFamily: T.font, margin: 0 }}>🏆 Top Earners This Week</h3>
          <span style={{ fontSize: 10, color: T.primary, fontFamily: T.font, cursor: 'pointer' }}>See All →</span>
        </div>
        {[
          { rank: 1, name: 'Dev K.', hours: 312.5, badge: '🥇' },
          { rank: 2, name: 'Priya P.', hours: 287.2, badge: '🥈' },
          { rank: 3, name: 'Sarah C.', hours: 251.8, badge: '🥉' },
          { rank: me.rank, name: `${me.name} (you)`, hours: me.hours, badge: '', isMe: true },
        ].map((u, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10,
            background: u.isMe ? `${T.primary}10` : 'transparent', border: u.isMe ? `1px solid ${T.primary}20` : '1px solid transparent',
            marginBottom: 2,
          }}>
            <span style={{ width: 28, fontSize: u.badge ? 18 : 12, textAlign: 'center', fontWeight: 700, color: T.dim, fontFamily: T.mono }}>{u.badge || `#${u.rank}`}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: u.isMe ? 700 : 500, fontFamily: T.font, color: u.isMe ? T.primary : T.text }}>{u.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: T.mono, color: T.gold }}>{u.hours}</span>
          </div>
        ))}
      </div>

      {/* Disclosure */}
      <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, lineHeight: 1.7, padding: '0 4px 24px' }}>
        *All HOURS earnings, estimated values, quest rewards, and leaderboard figures are illustrative and based on the platform's target revenue model. Actual earnings depend on platform ad revenue, user base size, engagement levels, and other factors. HOURS are not a cryptocurrency, security, or investment vehicle. Individual results will vary. Revenue percentages are targets, not guarantees. See full disclosures at ours.com/disclosures.
      </div>
    </div>
  );

  // ═══════════════════════════════
  // ADVERTISER VIEW
  // ═══════════════════════════════
  const AdvertiserView = () => (
    <div style={{ padding: '12px 0' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.surface}, ${T.card})`,
        borderRadius: 20, padding: 24, marginBottom: 16,
        border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}12, transparent)`, filter: 'blur(40px)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, color: T.accent, fontFamily: T.font, fontWeight: 700 }}>Advertiser Portal</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: T.font, margin: '6px 0 4px', lineHeight: 1.2, color: T.text }}>The audience that <em style={{ color: T.gold }}>wants</em> to see your ad.</h2>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, lineHeight: 1.6 }}>
            On OURS, ad revenue flows to users. That means your audience is financially incentivized to engage with relevant ads — not skip them. Verified humans. Zero bots. Transparent metrics.
          </p>
        </div>
      </div>

      {/* Key metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          { label: 'Verified Humans', value: `${adMetrics.verifiedHumans}%`, icon: '👤', color: T.accent, sub: 'Trust-scored real people' },
          { label: 'Willing Audience', value: `${adMetrics.audienceWilling}%`, icon: '👁️', color: T.gold, sub: 'Users who opt-in to ads' },
          { label: 'Avg Engagement', value: `${adMetrics.avgEngagement}%`, icon: '📈', color: T.primary, sub: 'vs 1-3% industry avg' },
          { label: 'Bot Rate', value: `${adMetrics.botRate}%`, icon: '🛡️', color: T.cyan, sub: 'vs 5-15% on legacy' },
          { label: 'Avg CTR', value: `${adMetrics.avgCTR}%`, icon: '🖱️', color: T.purple, sub: 'vs 0.5-1.5% industry' },
          { label: 'Avg ROAS', value: `${adMetrics.roas}x`, icon: '💰', color: T.gold, sub: 'vs 2-4x on legacy' },
        ].map((m, i) => (
          <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{m.icon}</span>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: T.font, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{m.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: m.color, fontFamily: T.mono }}>{m.value}</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginTop: 2 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* WHY section */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 18px', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, fontFamily: T.font, margin: '0 0 12px' }}>Why OURS Converts Better</h3>
        <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 10px' }}>
            <strong style={{ color: T.gold }}>Users want your ads.</strong> On legacy platforms, users tolerate ads. On OURS, ad revenue funds their HOURS earnings. Every ad impression = money in their pocket. This creates the only audience in social media that's financially motivated to engage with relevant advertising.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong style={{ color: T.accent }}>Zero bot inflation.</strong> Every user is trust-scored. Human verification badges, progressive identity checks, and bot quarantine mean your impressions are real people, not inflated numbers.
          </p>
          <p style={{ margin: '0 0 10px' }}>
            <strong style={{ color: T.primary }}>Transparent attribution.</strong> See exactly where your spend goes: 70% flows to the users who engage with your content, 20% to platform operations, 10% to community growth. No black box.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: T.purple }}>Community sponsorship.</strong> Don't just buy impressions — sponsor groups, challenges, events. Put your brand alongside the content and communities your audience already loves.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 14px', marginBottom: 16, overflow: 'hidden' }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, fontFamily: T.font, margin: '0 0 12px', padding: '0 4px' }}>📊 OURS vs Legacy Platforms</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: T.font, fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 6px', color: T.dim, fontWeight: 600, fontSize: 10, textTransform: 'uppercase', borderBottom: `1px solid ${T.border}` }}>Metric</th>
                <th style={{ textAlign: 'center', padding: '8px 6px', color: T.accent, fontWeight: 700, fontSize: 10, textTransform: 'uppercase', borderBottom: `1px solid ${T.border}` }}>OURS</th>
                <th style={{ textAlign: 'center', padding: '8px 6px', color: T.red, fontWeight: 600, fontSize: 10, textTransform: 'uppercase', borderBottom: `1px solid ${T.border}` }}>Legacy</th>
              </tr>
            </thead>
            <tbody>
              {adComparison.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? `${T.card}` : 'transparent' }}>
                  <td style={{ padding: '10px 6px', color: T.sub, fontWeight: 500, fontSize: 11 }}>{r.metric}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 700, color: T.accent, fontFamily: T.mono }}>{r.ours}</td>
                  <td style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 500, color: T.dim }}>{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ad Formats */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 18px', marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, fontFamily: T.font, margin: '0 0 12px' }}>Ad Formats Available</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { icon: '📰', title: 'Native Feed Ads', desc: 'Blend into the content feed. Max 1 per 10 posts.', cpm: '$8-15' },
            { icon: '🎬', title: 'Video Pre-Roll', desc: 'Short clips before Watch content. Skippable after 3s.', cpm: '$12-25' },
            { icon: '🏛️', title: 'Community Sponsorship', desc: 'Brand your name on groups and events.', cpm: '$20-50' },
            { icon: '🏆', title: 'Challenge Sponsorship', desc: 'Power a community challenge with your brand.', cpm: '$30-80' },
            { icon: '🛍️', title: 'Storefront Featured', desc: 'Boost creator products with your brand.', cpm: '$10-30' },
            { icon: '📊', title: 'Governance Sponsorship', desc: 'Present your brand during community votes.', cpm: '$15-40' },
          ].map((f, i) => (
            <div key={i} style={{ background: T.card, borderRadius: 14, padding: 14, border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.font, marginBottom: 4, color: T.text }}>{f.title}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, lineHeight: 1.4, marginBottom: 6 }}>{f.desc}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>CPM: {f.cpm}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue flow visualization */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '20px 18px', marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 800, fontFamily: T.font, margin: '0 0 12px' }}>💸 Where Your Ad Spend Goes</h3>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, margin: '0 0 16px', lineHeight: 1.5 }}>Full transparency. Every dollar tracked. Target allocation model:*</p>
        {[
          { label: 'To Users (HOURS holders)', pct: 70, color: T.accent },
          { label: 'Platform Operations', pct: 20, color: T.primary },
          { label: 'Community Growth Fund', pct: 10, color: T.purple },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: T.font, marginBottom: 4 }}>
              <span style={{ color: T.sub, fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontWeight: 800, color: s.color, fontFamily: T.mono }}>{s.pct}%</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: T.elevated, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, borderRadius: 5 }} />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
        <button style={{
          padding: '16px 48px', borderRadius: 14, border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
          background: `linear-gradient(135deg, ${T.accent}, ${T.primary})`, color: '#fff',
          boxShadow: `0 4px 24px ${T.accent}40`,
        }}>Start Advertising on OURS →</button>
        <div style={{ fontSize: 11, color: T.sub, marginTop: 8, fontFamily: T.font }}>Minimum spend: $50 • Full dashboard • Real-time analytics</div>
      </div>

      {/* Disclosure */}
      <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, lineHeight: 1.7, padding: '16px 4px 24px' }}>
        *All metrics displayed are target projections based on platform design and beta testing data. Actual results may vary based on campaign quality, targeting, audience size, and platform growth stage. Revenue allocation percentages are targets and may be adjusted as the platform scales. ROAS, CTR, and engagement figures are modeled estimates, not guarantees. Advertiser results depend on creative quality, targeting strategy, and market conditions. OURS reserves the right to modify ad formats, pricing, and policies. Contact advertise@ours.com for current rate cards and terms.
      </div>
    </div>
  );

  // ═══════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {showReward && <DailyReward />}
      {showQuests && <QuestPanel />}
      {expandedZone && <ZoneExpanded zone={zones.find(z => z.id === expandedZone)} />}

      {/* ═══ TOP BAR ═══ */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100, padding: '8px 14px',
        background: `${T.bg}ee`, backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 24, fontWeight: 800, fontFamily: T.font, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>

        {/* View toggle */}
        <div style={{ display: 'flex', background: T.card, borderRadius: 10, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
          {[
            { id: 'user', label: '👤 User' },
            { id: 'advertiser', label: '📢 Advertiser' },
          ].map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              padding: '6px 14px', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, fontFamily: T.font,
              background: view === v.id ? `${T.primary}20` : 'transparent',
              color: view === v.id ? T.primary : T.dim,
            }}>{v.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ background: `${T.gold}10`, border: `1px solid ${T.gold}20`, padding: '3px 10px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{hours.toFixed(1)}</span>
            <span style={{ fontSize: 9, color: T.dim }}>HRS</span>
          </div>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer' }}>{me.avatar}</div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 12px' }}>
        {view === 'user' ? <UserView /> : <AdvertiserView />}
      </div>
    </div>
  );
};

export default OursCandyStore;
