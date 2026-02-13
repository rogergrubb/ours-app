import React, { useState, useEffect } from 'react';

const OursCandyStore = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [expandedQuest, setExpandedQuest] = useState(null);
  const [pulseIndex, setPulseIndex] = useState(0);
  const [showReward, setShowReward] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setPulseIndex(i => i + 1), 3000);
    return () => clearInterval(t);
  }, []);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const zones = [
    { id: 'watch', icon: '🎬', title: 'Watch', sub: 'Videos & live', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', earn: '+0.3/min', count: '2.4K' },
    { id: 'read', icon: '📰', title: 'Read', sub: 'Articles & essays', gradient: 'linear-gradient(135deg, #0ea5e9, #0891b2)', earn: '+0.8/read', count: '890' },
    { id: 'community', icon: '🏛️', title: 'Community', sub: 'Groups & discussions', gradient: 'linear-gradient(135deg, #10b981, #059669)', earn: '+0.2/engage', count: '156' },
    { id: 'shop', icon: '🛍️', title: 'Shop', sub: 'Creator products', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', earn: '~95% kept', count: '324' },
    { id: 'explore', icon: '✨', title: 'Explore', sub: 'Visual discovery', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', earn: '+0.1/save', count: '5.1K' },
    { id: 'listen', icon: '🎙️', title: 'Listen', sub: 'Audio & podcasts', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', earn: '+0.2/listen', count: '67' },
    { id: 'govern', icon: '🗳️', title: 'Govern', sub: 'Vote & propose', gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', earn: '+0.5/vote', count: '12' },
    { id: 'arena', icon: '🏆', title: 'Arena', sub: 'Challenges & battles', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', earn: 'Up to 50x', count: '8' },
  ];

  const quests = [
    { id: 'q1', icon: '📝', title: 'Post something today', reward: '+2.0 HRS', progress: 0, total: 1, type: 'daily', bonus: '2x streak bonus' },
    { id: 'q2', icon: '👀', title: 'Watch 5 videos', reward: '+1.5 HRS', progress: 2, total: 5, type: 'daily' },
    { id: 'q3', icon: '💬', title: 'Comment on 3 posts', reward: '+1.0 HRS', progress: 1, total: 3, type: 'daily' },
    { id: 'q4', icon: '🗳️', title: 'Vote on a proposal', reward: '+0.5 HRS', progress: 0, total: 1, type: 'daily' },
    { id: 'q5', icon: '🏆', title: 'Enter a challenge', reward: '+5.0 HRS', progress: 0, total: 1, type: 'weekly', bonus: 'Weekly bonus' },
    { id: 'q6', icon: '📰', title: 'Read 10 articles', reward: '+3.0 HRS', progress: 4, total: 10, type: 'weekly' },
  ];

  const pulse = [
    '🔥 @luna_creates earned +4.2 HRS from her viral video',
    '🛍️ @pixel_studio sold "UI Kit Pro" for $29 (kept $27.55)',
    '🗳️ "Dark Mode Default" proposal passed with 89% votes',
    '🏆 @speedcoder won the 24-Hour Hackathon (+100 HRS)',
    '🎙️ "AI Builders" room has 234 listeners right now',
    '📰 @deepwriter\'s article reached 1,000 reads (+800 HRS)',
    '🏛️ "Indie Hackers Bay Area" treasury grew to 1,200 HRS',
    '🎬 @filmfox went live — 89 viewers in 2 minutes',
    '✨ @artflow\'s collection saved 500+ times today',
    '💰 Platform paid out $12,400 to creators this week*',
  ];

  const leaderboard = [
    { rank: 1, name: 'luna_creates', hrs: '8,420', badge: '👑', trend: '+12%' },
    { rank: 2, name: 'pixel_studio', hrs: '7,891', badge: '🥈', trend: '+8%' },
    { rank: 3, name: 'deepwriter', hrs: '6,234', badge: '🥉', trend: '+15%' },
  ];

  const feed = [
    { id: 'f1', type: 'video', user: 'luna_creates', avatar: '🎨', text: 'My creative process for designing landing pages', likes: 234, comments: 45, hrs: '+3.2', time: '2h', media: true, trust: 96 },
    { id: 'f2', type: 'article', user: 'deepwriter', avatar: '✍️', text: 'Why the Creator Economy is Broken (And How to Fix It)', likes: 189, comments: 67, hrs: '+5.8', time: '4h', trust: 92 },
    { id: 'f3', type: 'post', user: 'indie_sarah', avatar: '🚀', text: 'Just hit $1K/month from my OURS storefront. Started 3 weeks ago. The ~95% cut is no joke. Thank you all for the support! 🎉', likes: 456, comments: 89, hrs: '+1.2', time: '6h', trust: 88 },
    { id: 'f4', type: 'visual', user: 'artflow', avatar: '🎭', text: 'Morning light study series — Part 3', likes: 567, comments: 23, hrs: '+0.8', time: '8h', media: true, trust: 91 },
  ];

  const Anim = ({ children, delay = 0, style: s = {} }) => (
    <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)', transition: `all 0.5s ease ${delay}s`, ...s }}>{children}</div>
  );

  // ═══ TOP BAR ═══
  const TopBar = () => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100, padding: '10px 16px',
      background: `${T.bg}dd`, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Outfit', sans-serif", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${T.gold}10`, padding: '5px 10px', borderRadius: 10, cursor: 'pointer', border: `1px solid ${T.gold}20` }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: T.gold, fontFamily: "'DM Mono', monospace" }}>142.5</span>
          <span style={{ fontSize: 9, color: T.dim }}>HRS</span>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>🧠</div>
      </div>
    </div>
  );

  // ═══ WELCOME BANNER ═══
  const WelcomeBanner = () => (
    <Anim delay={0.05}>
      <div style={{
        background: `linear-gradient(135deg, ${T.card}, ${T.elevated})`,
        borderRadius: 20, padding: '18px 18px 14px', margin: '12px 14px 0',
        border: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>Hey Roger 👋</div>
            <div style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>Level 7 Pioneer • Day 12 streak 🔥</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.gold, fontFamily: "'DM Mono', monospace" }}>142.5</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>≈ $28.50*</div>
          </div>
        </div>

        {/* XP Bar */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace", marginBottom: 3 }}>
            <span>XP: 2,340 / 3,000</span>
            <span>Level 8 →</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: T.elevated, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '78%', borderRadius: 3, background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, transition: 'width 1s ease' }} />
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { icon: '🛡️', label: 'Trust', value: '94', color: T.accent },
            { icon: '🔥', label: 'Streak', value: '12d', color: T.orange },
            { icon: '📋', label: 'Quests', value: '2/6', color: T.primary },
            { icon: '🏅', label: 'Rank', value: '#847', color: T.purple },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: `${T.surface}80`, borderRadius: 10, padding: '6px 4px', textAlign: 'center', border: `1px solid ${T.border}` }}>
              <div style={{ fontSize: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Anim>
  );

  // ═══ QUEST BOARD ═══
  const QuestBoard = () => (
    <Anim delay={0.1}>
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>⚡ Today's Quests</div>
          <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>+13.0 HRS available</div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {quests.map(q => (
            <div key={q.id} onClick={() => setExpandedQuest(expandedQuest === q.id ? null : q.id)} style={{
              minWidth: 150, background: T.card, borderRadius: 16, padding: '12px',
              border: `1px solid ${q.progress >= q.total ? T.accent : T.border}`,
              cursor: 'pointer', flexShrink: 0,
              opacity: q.progress >= q.total ? 0.6 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>{q.icon}</span>
                {q.bonus && <span style={{ fontSize: 8, color: T.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace", background: `${T.gold}10`, padding: '2px 6px', borderRadius: 4 }}>{q.bonus}</span>}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", marginBottom: 4, lineHeight: 1.3 }}>{q.title}</div>
              <div style={{ height: 4, borderRadius: 2, background: T.elevated, marginBottom: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(q.progress / q.total) * 100}%`, borderRadius: 2, background: q.progress >= q.total ? T.accent : T.primary, transition: 'width 0.5s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                <span style={{ color: T.dim, fontFamily: "'DM Mono', monospace" }}>{q.progress}/{q.total}</span>
                <span style={{ color: T.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{q.reward}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Anim>
  );

  // ═══ LIVE PULSE ═══
  const LivePulse = () => (
    <Anim delay={0.15}>
      <div style={{ margin: '12px 14px 0', overflow: 'hidden', borderRadius: 12, background: `${T.surface}80`, border: `1px solid ${T.border}`, padding: '8px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.red, animation: 'blink 1.5s infinite', flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block', animation: 'scroll 25s linear infinite' }}>
              {pulse.concat(pulse).map((p, i) => <span key={i} style={{ marginRight: 40 }}>{p}</span>)}
            </span>
          </div>
        </div>
      </div>
    </Anim>
  );

  // ═══ ZONE GRID ═══
  const ZoneGrid = () => (
    <Anim delay={0.2}>
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>🍬 The Candy Store</div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>8 zones</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {zones.map((zone, i) => (
            <div key={zone.id} style={{
              borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
              background: T.card, border: `1px solid ${T.border}`,
              transition: 'all 0.2s',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            }}>
              <div style={{ height: 6, background: zone.gradient }} />
              <div style={{ padding: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 26 }}>{zone.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace", background: `${T.gold}10`, padding: '2px 6px', borderRadius: 4 }}>{zone.earn}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: 2 }}>{zone.title}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{zone.sub}</div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: "'DM Mono', monospace", marginTop: 6 }}>{zone.count} items</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Anim>
  );

  // ═══ FEED ═══
  const Feed = () => (
    <Anim delay={0.3}>
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>📡 Your Feed</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Following', 'Trending', 'New'].map((tab, i) => (
              <button key={i} style={{
                padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600,
                fontFamily: "'Outfit', sans-serif", cursor: 'pointer',
                background: i === 0 ? `${T.primary}15` : 'transparent',
                border: `1px solid ${i === 0 ? T.primary : T.border}`,
                color: i === 0 ? T.primary : T.dim,
              }}>{tab}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {feed.map(post => (
            <div key={post.id} style={{
              background: T.card, borderRadius: 18, padding: '14px',
              border: `1px solid ${T.border}`,
            }}>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{post.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>@{post.user}</span>
                    <span style={{ fontSize: 9, color: T.accent, fontFamily: "'DM Mono', monospace" }}>🛡️ {post.trust}</span>
                  </div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{post.time} ago</div>
                </div>
                <div style={{ fontSize: 9, padding: '3px 8px', borderRadius: 6, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                  background: post.type === 'video' ? '#8b5cf620' : post.type === 'article' ? '#0ea5e920' : post.type === 'visual' ? '#ec489920' : `${T.primary}10`,
                  color: post.type === 'video' ? '#8b5cf6' : post.type === 'article' ? '#0ea5e9' : post.type === 'visual' ? '#ec4899' : T.primary,
                }}>{post.type}</div>
              </div>

              {/* Content */}
              <div style={{ fontSize: 14, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5, marginBottom: 10, color: T.text }}>{post.text}</div>

              {/* Media placeholder */}
              {post.media && (
                <div style={{ height: 160, borderRadius: 14, background: `linear-gradient(135deg, ${T.elevated}, ${T.surface})`, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 36, opacity: 0.3 }}>{post.type === 'video' ? '▶️' : '🖼️'}</span>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  {[
                    { icon: '❤️', count: post.likes },
                    { icon: '💬', count: post.comments },
                    { icon: '🔄', count: '' },
                    { icon: '🔖', count: '' },
                  ].map((a, i) => (
                    <button key={i} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', gap: 3, padding: 0 }}>
                      <span style={{ fontSize: 14 }}>{a.icon}</span>
                      {a.count && <span style={{ fontSize: 11 }}>{a.count}</span>}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{post.hrs} HRS</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Anim>
  );

  // ═══ LEADERBOARD ═══
  const Leaderboard = () => (
    <Anim delay={0.25}>
      <div style={{ padding: '14px 14px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>🏅 Top Earners This Week</div>
          <span style={{ fontSize: 10, color: T.primary, fontWeight: 600, fontFamily: "'Outfit', sans-serif", cursor: 'pointer' }}>See all →</span>
        </div>
        <div style={{ background: T.card, borderRadius: 18, padding: '12px', border: `1px solid ${T.border}` }}>
          {leaderboard.map((l, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 4px',
              borderBottom: i < leaderboard.length - 1 ? `1px solid ${T.border}` : 'none',
            }}>
              <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{l.badge}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>@{l.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{l.hrs}</div>
                <div style={{ fontSize: 9, color: T.accent, fontFamily: "'DM Mono', monospace" }}>{l.trend}</div>
              </div>
            </div>
          ))}
          {/* User's rank */}
          <div style={{ marginTop: 6, padding: '8px 4px', background: `${T.primary}06`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${T.primary}15` }}>
            <span style={{ fontSize: 12, width: 28, textAlign: 'center', color: T.dim, fontFamily: "'DM Mono', monospace" }}>#847</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.primary }}>You (@rogergrubb)</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: "'DM Mono', monospace" }}>142.5</div>
          </div>
        </div>
      </div>
    </Anim>
  );

  // ═══ DAILY REWARD ═══
  const DailyReward = () => (
    <Anim delay={0.35}>
      <div onClick={() => setShowReward(!showReward)} style={{
        margin: '14px 14px 0', padding: '14px 16px', borderRadius: 18, cursor: 'pointer',
        background: `linear-gradient(135deg, ${T.gold}08, ${T.orange}08)`,
        border: `1px solid ${T.gold}20`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 28, animation: 'float 2.5s ease-in-out infinite' }}>🎁</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: T.gold }}>Daily Login Reward</div>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>12-day streak! Tap to claim +0.5 HRS*</div>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 10,
          background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
          fontSize: 12, fontWeight: 800, color: '#000', fontFamily: "'Outfit', sans-serif",
        }}>Claim</div>
      </div>
    </Anim>
  );

  // ═══ BOTTOM NAV ═══
  const BottomNav = () => (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 520, zIndex: 100,
      background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-around', padding: '8px 0 12px',
    }}>
      {[
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'search', icon: '🔍', label: 'Search' },
        { id: 'create', icon: '✨', label: 'Create', special: true },
        { id: 'messages', icon: '💬', label: 'Messages' },
        { id: 'profile', icon: '👤', label: 'Profile' },
      ].map(item => (
        <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: activeTab === item.id ? T.primary : T.dim,
        }}>
          {item.special ? (
            <div style={{
              width: 44, height: 44, borderRadius: 14,
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, marginTop: -20, boxShadow: `0 4px 16px ${T.primary}40`,
            }}>{item.icon}</div>
          ) : (
            <span style={{ fontSize: 20 }}>{item.icon}</span>
          )}
          <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
        </button>
      ))}
    </div>
  );

  // ═══ RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 520, margin: '0 auto', paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { height: 0; width: 0; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        button:hover:not(:disabled) { filter: brightness(1.05); }
      `}</style>

      <TopBar />
      <WelcomeBanner />
      <DailyReward />
      <QuestBoard />
      <LivePulse />
      <ZoneGrid />
      <Leaderboard />
      <Feed />

      {/* Disclaimer */}
      <div style={{ padding: '20px 14px 4px', textAlign: 'center' }}>
        <div style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
          *All HOURS amounts, estimated values, and revenue percentages are illustrative targets. Actual earnings depend on platform revenue, engagement, and other factors. HOURS are not cryptocurrency, securities, or investments.
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default OursCandyStore;
