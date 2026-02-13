import React, { useState, useEffect } from 'react';

const OursCandyStore = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [showQuest, setShowQuest] = useState(true);
  const [pulseIndex, setPulseIndex] = useState(0);
  const [hours, setHours] = useState(142.5);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981',
    gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6',
    orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const zones = [
    { id: 'watch', icon: '🎬', title: 'Watch', subtitle: 'Videos & Streams', gradient: `linear-gradient(135deg, ${T.red}18, ${T.red}05)`, border: `${T.red}20`, color: T.red, earning: '+0.3/min', count: '12K videos' },
    { id: 'read', icon: '📰', title: 'Read', subtitle: 'Articles & Essays', gradient: `linear-gradient(135deg, ${T.primary}18, ${T.primary}05)`, border: `${T.primary}20`, color: T.primary, earning: '+0.8/read', count: '4.2K articles' },
    { id: 'community', icon: '🏛️', title: 'Community', subtitle: 'Groups & Treasury', gradient: `linear-gradient(135deg, ${T.purple}18, ${T.purple}05)`, border: `${T.purple}20`, color: T.purple, earning: '+0.2/engage', count: '890 groups' },
    { id: 'shop', icon: '🛍️', title: 'Shop', subtitle: 'Buy & Sell', gradient: `linear-gradient(135deg, ${T.pink}18, ${T.pink}05)`, border: `${T.pink}20`, color: T.pink, earning: '~95% to you', count: '3.1K products' },
    { id: 'explore', icon: '✨', title: 'Explore', subtitle: 'Discover & Save', gradient: `linear-gradient(135deg, ${T.gold}18, ${T.gold}05)`, border: `${T.gold}20`, color: T.gold, earning: '+0.1/save', count: 'Infinite' },
    { id: 'listen', icon: '🎙️', title: 'Listen', subtitle: 'Audio & Podcasts', gradient: `linear-gradient(135deg, ${T.cyan}18, ${T.cyan}05)`, border: `${T.cyan}20`, color: T.cyan, earning: '+0.2/listen', count: '1.5K shows' },
    { id: 'govern', icon: '🗳️', title: 'Govern', subtitle: 'Vote & Propose', gradient: `linear-gradient(135deg, ${T.orange}18, ${T.orange}05)`, border: `${T.orange}20`, color: T.orange, earning: '+0.5/vote', count: '24 active' },
    { id: 'arena', icon: '🏆', title: 'Arena', subtitle: 'Compete & Win', gradient: `linear-gradient(135deg, ${T.accent}18, ${T.accent}05)`, border: `${T.accent}20`, color: T.accent, earning: 'up to 50x', count: '8 live' },
  ];

  const quests = [
    { icon: '📝', title: 'Create your first post', reward: 5.0, progress: 0, total: 1, color: T.primary },
    { icon: '🎬', title: 'Watch 10 minutes of video', reward: 3.0, progress: 3, total: 10, color: T.red },
    { icon: '🏛️', title: 'Join a community', reward: 2.0, progress: 0, total: 1, color: T.purple },
    { icon: '🗳️', title: 'Cast your first vote', reward: 2.0, progress: 0, total: 1, color: T.orange },
    { icon: '👤', title: 'Complete your profile', reward: 5.0, progress: 2, total: 5, color: T.accent },
  ];

  const pulse = [
    '🎬 @maya just earned 4.2 HOURS from a viral video',
    '🛍️ @creator_joe sold 12 courses today — $2,340 revenue',
    '🏛️ Tech Builders community treasury hit 500 HOURS',
    '🗳️ 847 people voted on "Add dark mode to Explore"',
    '🏆 @speedcoder won the 48hr Hackathon — 250 HOURS prize',
    '📰 @writerly's article "The Algorithm Lie" hit 10K reads',
    '🎙️ Live Room "AI After Dark" has 342 listeners right now',
    '✨ @photomaster's collection saved 2.1K times today',
  ];

  const leaderboard = [
    { rank: 1, name: 'Maya Chen', handle: '@mayac', hours: 12450, badge: '🥇', avatar: '👩‍🎤' },
    { rank: 2, name: 'Tech Builders', handle: 'community', hours: 8920, badge: '🥈', avatar: '⚡' },
    { rank: 3, name: 'Jordan Lee', handle: '@jordanl', hours: 7340, badge: '🥉', avatar: '🎨' },
  ];

  useEffect(() => {
    const iv = setInterval(() => setPulseIndex(i => (i + 1) % pulse.length), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, position: 'relative', paddingBottom: 100 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        button:hover:not(:disabled) { filter: brightness(1.08); }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${T.primary}08, transparent 70%)`, top: -150, right: -100, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}06, transparent 70%)`, bottom: 100, left: -80, filter: 'blur(80px)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto' }}>

        {/* ═══ TOP BAR ═══ */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 20, background: `${T.bg}dd`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Outfit', sans-serif", background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 10, background: `${T.gold}10`, border: `1px solid ${T.gold}15`, cursor: 'pointer' }}>
              <span style={{ fontSize: 12 }}>💰</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{hours.toFixed(1)}</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${T.primary}30, ${T.accent}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>🧠</div>
          </div>
        </div>

        {/* ═══ WELCOME HERO ═══ */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ borderRadius: 24, padding: '24px 20px', background: `linear-gradient(135deg, ${T.surface}, ${T.card})`, border: `1px solid ${T.border}`, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>Welcome back</div>
                <div style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Outfit', sans-serif" }}>Roger 🧠</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase' }}>Rank</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>#847</div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'HOURS', value: '142.5', sub: '≈$28.50*', color: T.gold, icon: '💰' },
                { label: 'Level', value: '7', sub: 'Pioneer', color: T.primary, icon: '⭐' },
                { label: 'Trust', value: '94', sub: 'Verified', color: T.accent, icon: '🛡️' },
                { label: 'Streak', value: '12d', sub: '🔥 Active', color: T.orange, icon: '🔥' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', padding: '10px 4px', borderRadius: 14, background: `${s.color}08`, border: `1px solid ${s.color}12` }}>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* XP bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Level 7 → Level 8</span>
                <span style={{ fontSize: 10, color: T.primary, fontFamily: "'DM Mono', monospace" }}>2,340 / 3,000 XP</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: T.card }}>
                <div style={{ height: '100%', borderRadius: 3, width: '78%', background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, boxShadow: `0 0 8px ${T.primary}40` }} />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ QUEST BOARD ═══ */}
        {showQuest && (
          <div style={{ padding: '0 20px 16px' }}>
            <div style={{ borderRadius: 20, padding: '16px 18px', background: `linear-gradient(135deg, ${T.gold}08, ${T.orange}04)`, border: `1px solid ${T.gold}15` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>📋</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: "'Outfit', sans-serif" }}>Daily Quests</span>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, background: `${T.red}15`, color: T.red, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>2x BONUS</span>
                </div>
                <button onClick={() => setShowQuest(false)} style={{ background: 'none', border: 'none', color: T.dim, fontSize: 14, cursor: 'pointer' }}>×</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {quests.slice(0, 3).map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 12, background: `${T.bg}60` }}>
                    <span style={{ fontSize: 16 }}>{q.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{q.title}</div>
                      <div style={{ height: 3, borderRadius: 2, background: T.card, marginTop: 3 }}>
                        <div style={{ height: '100%', borderRadius: 2, width: `${(q.progress / q.total) * 100}%`, background: q.color, transition: 'width 0.3s' }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>+{q.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ LIVE PULSE ═══ */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ borderRadius: 14, padding: '10px 16px', background: T.surface, border: `1px solid ${T.border}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent, animation: 'pulse-dot 1.5s ease infinite', flexShrink: 0 }} />
              <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'opacity 0.3s' }}>
                {pulse[pulseIndex]}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 8 ZONE GRID ═══ */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: 0 }}>🍬 Your Candy Store</h2>
            <span style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>8 zones</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {zones.map(zone => (
              <button key={zone.id} onClick={() => setSelectedZone(zone.id)} style={{
                padding: '18px 14px', borderRadius: 20, cursor: 'pointer', textAlign: 'left',
                background: zone.gradient, border: `1px solid ${zone.border}`,
                transition: 'all 0.2s', width: '100%',
                boxShadow: selectedZone === zone.id ? `0 0 20px ${zone.color}20` : 'none',
                transform: selectedZone === zone.id ? 'scale(0.98)' : 'scale(1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{zone.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace", padding: '2px 8px', borderRadius: 8, background: `${T.gold}10` }}>{zone.earning}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 2 }}>{zone.title}</div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>{zone.subtitle}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{zone.count}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ LEADERBOARD ═══ */}
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: 0 }}>🏅 Top Earners</h2>
            <span style={{ fontSize: 11, color: T.primary, fontFamily: "'Outfit', sans-serif", cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {leaderboard.map(user => (
              <div key={user.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{user.badge}</span>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{user.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{user.name}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{user.handle}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{user.hours.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: T.dim }}>HOURS</div>
                </div>
              </div>
            ))}
            {/* Your position */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 16, background: `${T.primary}08`, border: `1px solid ${T.primary}15` }}>
              <span style={{ fontSize: 12, width: 28, textAlign: 'center', fontWeight: 700, color: T.dim, fontFamily: "'DM Mono', monospace" }}>#847</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🧠</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.primary, fontFamily: "'Outfit', sans-serif" }}>You</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>@rogergrubb</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>142.5</div>
                <div style={{ fontSize: 9, color: T.dim }}>HOURS</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TRENDING NOW ═══ */}
        <div style={{ padding: '0 20px 16px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: '0 0 12px' }}>🔥 Trending Now</h2>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {[
              { title: 'AI Art Debate', zone: '📰 Read', engagement: '2.4K', color: T.primary },
              { title: '48hr Code Sprint', zone: '🏆 Arena', engagement: '847 competing', color: T.accent },
              { title: 'Sunset Photography', zone: '✨ Explore', engagement: '1.2K saves', color: T.gold },
              { title: 'Late Night Tech Talk', zone: '🎙️ Listen', engagement: '342 live', color: T.cyan },
            ].map((item, i) => (
              <div key={i} style={{ minWidth: 160, padding: '14px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer', flexShrink: 0 }}>
                <div style={{ fontSize: 9, color: item.color, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>{item.zone}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{item.engagement}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ DISCLAIMERS ═══ */}
        <div style={{ padding: '0 20px 24px' }}>
          <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6, opacity: 0.5 }}>
            *All HOURS values, earning rates, and estimated USD equivalents are illustrative targets based on platform design goals. Actual amounts depend on platform revenue, user engagement, and other factors. HOURS are not cryptocurrency, securities, or guaranteed currency. Revenue sharing percentages (~70% to users, ~95% to sellers) are design targets, not contractual guarantees. Rankings and leaderboard positions are for gamification purposes. Past performance does not indicate future results. See Terms of Service for complete details.
          </p>
        </div>

        {/* ═══ FLOATING COMPOSE BUTTON ═══ */}
        <div style={{ position: 'fixed', bottom: 90, right: 'calc(50% - 210px)', zIndex: 30 }}>
          <button style={{
            width: 56, height: 56, borderRadius: 18,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, color: '#fff',
            boxShadow: `0 4px 20px ${T.primary}40, 0 0 40px ${T.primary}15`,
          }}>+</button>
        </div>

        {/* ═══ BOTTOM NAV ═══ */}
        <div style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 480, zIndex: 20,
          padding: '8px 20px 20px', background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
          borderTop: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {[
              { icon: '🏠', label: 'Home', active: true },
              { icon: '🔍', label: 'Search', active: false },
              { icon: '💬', label: 'Messages', active: false },
              { icon: '🔔', label: 'Alerts', active: false },
              { icon: '👤', label: 'Profile', active: false },
            ].map(item => (
              <button key={item.label} style={{
                background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 2, padding: '4px 8px',
              }}>
                <span style={{ fontSize: 20, filter: item.active ? 'none' : 'grayscale(0.8) opacity(0.5)' }}>{item.icon}</span>
                <span style={{ fontSize: 9, color: item.active ? T.primary : T.dim, fontFamily: "'Outfit', sans-serif", fontWeight: item.active ? 700 : 400 }}>{item.label}</span>
                {item.active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.primary, marginTop: 1 }} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OursCandyStore;
