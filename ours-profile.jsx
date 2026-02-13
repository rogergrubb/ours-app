import React, { useState } from 'react';

const OursProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [editing, setEditing] = useState(false);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };

  const user = {
    name: 'Roger Grubb', handle: '@rogergrubb', bio: 'Building the future one automation at a time. Founder of SellFast.Now. AI enthusiast, real estate explorer, code whisperer.',
    avatar: '🧠', banner: `linear-gradient(135deg, ${T.primary}30, ${T.accent}20, ${T.purple}20)`,
    level: 7, trust: 94, rank: 847, hours: 142.5, hoursUsd: 28.50,
    followers: 234, following: 89, posts: 47,
    joinDate: 'Jan 2025', streak: 12,
    badges: [
      { icon: '🌟', name: 'Early Adopter', desc: 'Joined in first 10K users' },
      { icon: '🛡️', name: 'Verified Human', desc: 'Passed human verification' },
      { icon: '🔥', name: 'Hot Streak', desc: '10+ day activity streak' },
      { icon: '📝', name: 'Creator', desc: 'Published 10+ posts' },
      { icon: '🏛️', name: 'Citizen', desc: 'Voted on 5+ proposals' },
      { icon: '🎬', name: 'Director', desc: 'Uploaded 5+ videos' },
    ],
  };

  const contentGrid = {
    posts: [
      { id: 1, type: 'text', preview: 'Just discovered the HOURS earning system is way more rewarding than expected...', likes: 24, comments: 8, hours: 1.2 },
      { id: 2, type: 'image', preview: '🌅', caption: 'Golden hour in the Bay Area', likes: 67, comments: 12, hours: 2.4 },
      { id: 3, type: 'text', preview: 'Hot take: AI agents will replace 90% of SaaS tools within 5 years.', likes: 143, comments: 45, hours: 4.8 },
      { id: 4, type: 'image', preview: '🤖', caption: 'My AI agent dashboard', likes: 89, comments: 23, hours: 3.1 },
    ],
    videos: [
      { id: 5, title: 'Building SENTINEL in 60 Seconds', views: '2.4K', duration: '0:58', hours: 8.2 },
      { id: 6, title: 'Real Estate Automation Deep Dive', views: '1.1K', duration: '14:32', hours: 12.5 },
    ],
    articles: [
      { id: 7, title: 'Why Autonomous AI Agents Are the Next Frontier', reads: '890', readTime: '8 min', hours: 6.4 },
      { id: 8, title: 'The Death of Manual Business Operations', reads: '1.2K', readTime: '12 min', hours: 9.1 },
    ],
  };

  const earningHistory = [
    { date: 'Today', amount: 4.2, source: '3 posts, 2h watching', color: T.accent },
    { date: 'Yesterday', amount: 6.8, source: '1 article, 5 comments, voting', color: T.primary },
    { date: 'Feb 10', amount: 3.1, source: 'Video upload, community engagement', color: T.gold },
    { date: 'Feb 9', amount: 8.5, source: 'Article went viral — 890 reads', color: T.orange },
  ];

  const tabs = [
    { id: 'posts', label: '📝 Posts', count: user.posts },
    { id: 'videos', label: '🎬 Videos', count: contentGrid.videos.length },
    { id: 'articles', label: '📰 Articles', count: contentGrid.articles.length },
    { id: 'earnings', label: '💰 Earnings', count: null },
    { id: 'badges', label: '🏅 Badges', count: user.badges.length },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); }`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>

        {/* Banner */}
        <div style={{ height: 140, background: user.banner, position: 'relative' }}>
          <button style={{ position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', backdropFilter: 'blur(10px)' }}>←</button>
          <button onClick={() => setEditing(!editing)} style={{ position: 'absolute', top: 12, right: 12, padding: '8px 16px', borderRadius: 10, background: 'rgba(0,0,0,0.4)', border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", backdropFilter: 'blur(10px)' }}>{editing ? 'Save' : '✏️ Edit'}</button>
        </div>

        {/* Avatar & name */}
        <div style={{ padding: '0 20px', marginTop: -40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: `linear-gradient(135deg, ${T.primary}30, ${T.accent}30)`, border: `4px solid ${T.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{user.avatar}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '8px 16px', borderRadius: 10, background: T.card, border: `1px solid ${T.border}`, color: T.sub, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Share</button>
              <button style={{ padding: '8px 16px', borderRadius: 10, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: 'none', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>💬 Message</button>
            </div>
          </div>

          <h1 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 2px' }}>{user.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{user.handle}</span>
            <span style={{ padding: '2px 8px', borderRadius: 6, background: `${T.accent}15`, color: T.accent, fontSize: 9, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>🛡️ Trust {user.trust}</span>
            <span style={{ padding: '2px 8px', borderRadius: 6, background: `${T.primary}15`, color: T.primary, fontSize: 9, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>⭐ Lvl {user.level}</span>
          </div>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6, marginBottom: 12 }}>{user.bio}</p>

          {/* Follow stats */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            {[{ label: 'Followers', value: user.followers }, { label: 'Following', value: user.following }, { label: 'Posts', value: user.posts }].map(s => (
              <div key={s.label} style={{ cursor: 'pointer' }}>
                <span style={{ fontSize: 15, fontWeight: 800, fontFamily: "'DM Mono', monospace" }}>{s.value}</span>
                <span style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif", marginLeft: 4 }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* HOURS & rank card */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, padding: '14px', borderRadius: 16, background: `${T.gold}08`, border: `1px solid ${T.gold}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>HOURS Balance</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{user.hours}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>≈${user.hoursUsd}*</div>
            </div>
            <div style={{ flex: 1, padding: '14px', borderRadius: 16, background: `${T.primary}08`, border: `1px solid ${T.primary}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Global Rank</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: T.primary, fontFamily: "'DM Mono', monospace" }}>#{user.rank}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>🔥 {user.streak}d streak</div>
            </div>
            <div style={{ flex: 1, padding: '14px', borderRadius: 16, background: `${T.accent}08`, border: `1px solid ${T.accent}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>XP to Lvl 8</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: T.accent, fontFamily: "'DM Mono', monospace" }}>78%</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>660 XP left</div>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <div style={{ display: 'flex', gap: 2, padding: '0 20px', overflowX: 'auto', borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '12px 14px', cursor: 'pointer', whiteSpace: 'nowrap',
              background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === t.id ? T.primary : 'transparent'}`,
              color: activeTab === t.id ? T.primary : T.dim, fontSize: 12, fontWeight: activeTab === t.id ? 700 : 400,
              fontFamily: "'Outfit', sans-serif", transition: 'all 0.2s',
            }}>
              {t.label} {t.count !== null && <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{t.count}</span>}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ padding: '0 20px' }}>
          {activeTab === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contentGrid.posts.map(p => (
                <div key={p.id} style={{ padding: '14px 16px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
                  {p.type === 'image' && <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 12, background: `linear-gradient(135deg, ${T.surface}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, marginBottom: 10 }}>{p.preview}</div>}
                  <p style={{ fontSize: 13, color: T.text, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5, marginBottom: 8 }}>{p.type === 'image' ? p.caption : p.preview}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 10, color: T.dim }}>
                    <span>❤️ {p.likes}</span><span>💬 {p.comments}</span>
                    <span style={{ marginLeft: 'auto', color: T.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>+{p.hours} HRS</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contentGrid.videos.map(v => (
                <div key={v.id} style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
                  <div style={{ width: 120, aspectRatio: '16/9', borderRadius: 12, background: `linear-gradient(135deg, ${T.surface}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                    <span style={{ fontSize: 24, opacity: 0.4 }}>🎬</span>
                    <div style={{ position: 'absolute', bottom: 4, right: 4, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.6)', fontSize: 9, color: '#fff', fontFamily: "'DM Mono', monospace" }}>{v.duration}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>{v.title}</div>
                    <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{v.views} views</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>+{v.hours} HRS earned</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'articles' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {contentGrid.articles.map(a => (
                <div key={a.id} style={{ padding: '14px 16px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 6 }}>{a.title}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 10, color: T.dim }}>
                    <span>📖 {a.reads} reads</span><span>⏱️ {a.readTime}</span>
                    <span style={{ marginLeft: 'auto', color: T.gold, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>+{a.hours} HRS</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <div style={{ padding: '16px', borderRadius: 16, background: `${T.gold}08`, border: `1px solid ${T.gold}15`, marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Lifetime Earnings</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{user.hours} HRS</div>
                <div style={{ fontSize: 11, color: T.dim, fontFamily: "'DM Mono', monospace" }}>≈${user.hoursUsd}*</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {earningHistory.map((e, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}` }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{e.date}</div>
                      <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{e.source}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: e.color, fontFamily: "'DM Mono', monospace" }}>+{e.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {user.badges.map((b, i) => (
                <div key={i} style={{ padding: '16px 10px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, textAlign: 'center', cursor: 'pointer' }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{b.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 2 }}>{b.name}</div>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: "'Outfit', sans-serif", lineHeight: 1.4 }}>{b.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '16px 20px' }}>
          <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6, opacity: 0.5 }}>*HOURS value estimates are illustrative. Not cryptocurrency or securities. Joined {user.joinDate}.</p>
        </div>
      </div>
    </div>
  );
};
export default OursProfile;
