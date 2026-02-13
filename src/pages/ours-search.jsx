import React, { useState } from 'react';

const OursSearch = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [focused, setFocused] = useState(false);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };

  const trending = [
    { tag: '#AIAgents', posts: '12.4K', change: '+340%', hot: true },
    { tag: '#CreatorEconomy', posts: '8.9K', change: '+120%', hot: true },
    { tag: '#Photography', posts: '45.2K', change: '+18%' },
    { tag: '#WebDev', posts: '23.1K', change: '+42%' },
    { tag: '#Sustainability', posts: '6.7K', change: '+89%' },
  ];

  const people = [
    { name: 'Maya Chen', handle: '@mayac', avatar: '👩‍🎤', followers: '12.4K', trust: 97, verified: true },
    { name: 'CodeStream', handle: '@codestream', avatar: '⚡', followers: '8.2K', trust: 93, verified: true },
    { name: 'PhotoMaster', handle: '@photomaster', avatar: '📸', followers: '15.1K', trust: 91, verified: true },
  ];

  const featuredContent = [
    { type: 'article', title: 'The Future of Creator Economics', creator: '@econnerd', icon: '📰', zone: 'Read', engagement: '2.1K reads', color: T.primary },
    { type: 'video', title: 'Building in Public: Week 12', creator: '@mayac', icon: '🎬', zone: 'Watch', engagement: '5.4K views', color: T.red },
    { type: 'community', title: 'Tech Builders Community', creator: '2.4K members', icon: '🏛️', zone: 'Community', engagement: '890 active', color: T.purple },
    { type: 'product', title: 'AI Prompt Templates Pack', creator: '@creator_joe', icon: '🛍️', zone: 'Shop', engagement: '$12.99', color: T.pink },
    { type: 'live', title: 'Late Night Code Session', creator: '@codestream', icon: '🔴', zone: 'Listen', engagement: '342 live', color: T.orange },
  ];

  const categories = [
    { icon: '🤖', label: 'AI & Tech', count: '4.2K' },
    { icon: '🎨', label: 'Art & Design', count: '3.1K' },
    { icon: '📈', label: 'Finance', count: '2.8K' },
    { icon: '🎵', label: 'Music', count: '5.4K' },
    { icon: '🍕', label: 'Food', count: '3.9K' },
    { icon: '📸', label: 'Photo', count: '6.1K' },
    { icon: '🏋️', label: 'Fitness', count: '2.3K' },
    { icon: '✈️', label: 'Travel', count: '4.7K' },
  ];

  const recentSearches = ['AI agents', 'photography tips', 'HOURS earning', '@mayac'];

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); } input::placeholder { color: rgba(138,157,195,0.4); }`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Search bar */}
        <div style={{ padding: '14px 20px', position: 'sticky', top: 0, zIndex: 10, background: `${T.bg}ee`, backdropFilter: 'blur(20px)' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, opacity: 0.4 }}>🔍</span>
            <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 200)} placeholder="Search people, content, tags..." style={{ width: '100%', padding: '12px 14px 12px 40px', borderRadius: 14, border: `1px solid ${focused ? T.primary : T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none', transition: 'border 0.2s' }} />
            {query && <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: T.dim, fontSize: 16, cursor: 'pointer' }}>×</button>}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 4, padding: '0 20px 12px', overflowX: 'auto' }}>
          {[{ id: 'all', l: '✨ All' }, { id: 'people', l: '👥 People' }, { id: 'videos', l: '🎬 Videos' }, { id: 'articles', l: '📰 Articles' }, { id: 'communities', l: '🏛️ Communities' }, { id: 'products', l: '🛍️ Products' }].map(f => (
            <button key={f.id} onClick={() => setActiveFilter(f.id)} style={{ padding: '6px 14px', borderRadius: 10, cursor: 'pointer', whiteSpace: 'nowrap', background: activeFilter === f.id ? `${T.primary}15` : T.card, border: `1px solid ${activeFilter === f.id ? T.primary + '30' : T.border}`, color: activeFilter === f.id ? T.primary : T.dim, fontSize: 11, fontWeight: activeFilter === f.id ? 700 : 400, fontFamily: "'Outfit', sans-serif" }}>{f.l}</button>
          ))}
        </div>

        {/* Recent searches (when focused) */}
        {focused && !query && (
          <div style={{ padding: '0 20px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.sub, marginBottom: 8 }}>Recent</div>
            {recentSearches.map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
                <span style={{ fontSize: 12, color: T.dim }}>🕐</span>
                <span style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{s}</span>
              </button>
            ))}
          </div>
        )}

        <div style={{ padding: '0 20px' }}>
          {/* Trending */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>🔥 Trending</span>
              <span style={{ fontSize: 11, color: T.primary, fontFamily: "'Outfit', sans-serif", cursor: 'pointer' }}>See all →</span>
            </div>
            {trending.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < trending.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.dim, fontFamily: "'DM Mono', monospace", width: 20 }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{t.tag} {t.hot && <span style={{ fontSize: 10 }}>🔥</span>}</div>
                    <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{t.posts} posts</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, fontFamily: "'DM Mono', monospace" }}>{t.change}</span>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: 10 }}>🗂️ Browse Categories</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {categories.map(c => (
                <button key={c.label} style={{ padding: '14px 4px', borderRadius: 14, cursor: 'pointer', background: T.card, border: `1px solid ${T.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <span style={{ fontSize: 9, color: T.sub, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{c.label}</span>
                  <span style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* People to follow */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: 10 }}>👥 People to Follow</span>
            {people.map(p => (
              <div key={p.handle} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${T.primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{p.name}</span>
                    {p.verified && <span style={{ fontSize: 8, padding: '1px 6px', borderRadius: 4, background: `${T.accent}15`, color: T.accent }}>🛡️ {p.trust}</span>}
                  </div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{p.handle} • {p.followers} followers</div>
                </div>
                <button style={{ padding: '6px 14px', borderRadius: 8, background: `${T.primary}15`, border: `1px solid ${T.primary}30`, color: T.primary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Follow</button>
              </div>
            ))}
          </div>

          {/* Featured content */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", display: 'block', marginBottom: 10 }}>✨ Featured</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {featuredContent.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${c.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{c.title}</div>
                    <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{c.creator} • {c.zone}</div>
                  </div>
                  <span style={{ fontSize: 10, color: c.color, fontFamily: "'DM Mono', monospace", alignSelf: 'center', flexShrink: 0 }}>{c.engagement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OursSearch;
