import React, { useState, useEffect } from 'react';

const OursProfile = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const profile = {
    name: 'Roger Grubb', handle: '@rogergrubb', avatar: '🚀', verified: true,
    bio: 'Building the future of creator economies. Founder of SellFast.Now & OURS. Turning ideas into autonomous empires.',
    banner: `linear-gradient(135deg, ${T.purple}40, ${T.primary}40, ${T.accent}40)`,
    tier: '🔥 Creator', tierColor: T.orange,
    hours: 2400, hoursEarned: 340, hoursThisWeek: 89,
    followers: 1247, following: 312, posts: 47,
    joined: 'Jan 2026',
    links: [{ label: 'sellfast.now', url: '#' }, { label: 'github.com/rogergrubb', url: '#' }],
    badges: [
      { icon: '✍️', title: 'First Post' }, { icon: '🔥', title: '7-Day Streak' },
      { icon: '🦋', title: 'Social Butterfly' }, { icon: '🗳️', title: 'Voter' },
    ],
  };

  const posts = [
    { id: 'p1', text: 'Just shipped the OURS MVP. Every zone is a world — Watch, Read, Shop, Community, Listen, Explore, Govern, Arena. Each one designed to make creators earn more. This is what the internet should feel like.', likes: 234, comments: 45, tips: 12, time: '2h ago', zone: 'Feed' },
    { id: 'p2', text: 'Hot take: The creator economy is broken because platforms keep 50-70% of the value. OURS flips that — creators get 70%. When you build FOR creators, not ON creators, everything changes.', likes: 567, comments: 89, tips: 34, time: '1d ago', zone: 'Feed' },
    { id: 'p3', text: 'The HOURS economy design is complete: Observer → Contributor → Creator → Builder → Architect. Each tier unlocks new powers. No buying your way up — you earn it through real contribution.', likes: 189, comments: 23, tips: 8, time: '3d ago', zone: 'Feed' },
  ];

  const articles = [
    { id: 'a1', title: 'Why I Built OURS: A Manifesto', zone: '📰 Read', reads: '12.4K', time: '1w ago' },
    { id: 'a2', title: 'The HOURS Economy Explained', zone: '📰 Read', reads: '8.9K', time: '2w ago' },
  ];

  const products = [
    { id: 'pr1', title: 'Creator Business Blueprint', price: 29, sales: 156, zone: '🛍️ Shop', rating: 4.9 },
  ];

  const followers = [
    { handle: '@sarahbuilds', name: 'Sarah Builds', avatar: '👩‍💻', tier: '⚡ Builder' },
    { handle: '@devnotes', name: 'Dev Notes', avatar: '💻', tier: '🏗️ Architect' },
    { handle: '@growthlabs', name: 'Growth Labs', avatar: '📈', tier: '🏗️ Architect' },
    { handle: '@priyacooks', name: 'Priya Sharma', avatar: '🍳', tier: '⚡ Builder' },
    { handle: '@alexdesigns', name: 'Alex Designs', avatar: '🎨', tier: '🏗️ Architect' },
  ];

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>

      {/* Banner */}
      <div style={{ height: 120, background: profile.banner, position: 'relative' }}>
        <button style={{ position: 'absolute', top: 10, right: 10, padding: '5px 10px', borderRadius: 8, border: `1px solid rgba(255,255,255,0.2)`, background: 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: f(), backdropFilter: 'blur(10px)' }}>⚙️</button>
      </div>

      {/* Profile info */}
      <div style={{ padding: '0 16px', marginTop: -36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: T.card, border: `3px solid ${T.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>{profile.avatar}</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setShowEdit(true)} style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>Edit Profile</button>
            <button style={{ padding: '8px 12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 11 }}>🔗</button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f() }}>{profile.name}</span>
          {profile.verified && <span style={{ fontSize: 10, color: T.primary, background: `${T.primary}15`, padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>✓</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: T.dim, fontFamily: f('mono') }}>{profile.handle}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: profile.tierColor, fontFamily: f('mono'), background: `${profile.tierColor}15`, padding: '1px 6px', borderRadius: 4 }}>{profile.tier}</span>
        </div>
        <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 8 }}>{profile.bio}</p>

        {/* Links */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {profile.links.map(link => (
            <span key={link.label} style={{ fontSize: 10, color: T.primary, fontFamily: f('mono') }}>🔗 {link.label}</span>
          ))}
          <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>📅 {profile.joined}</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <span onClick={() => setShowFollowers('followers')} style={{ cursor: 'pointer' }}><strong style={{ color: T.text, fontFamily: f('mono'), fontSize: 13 }}>{fmt(profile.followers)}</strong> <span style={{ fontSize: 11, color: T.dim }}>followers</span></span>
          <span onClick={() => setShowFollowers('following')} style={{ cursor: 'pointer' }}><strong style={{ color: T.text, fontFamily: f('mono'), fontSize: 13 }}>{fmt(profile.following)}</strong> <span style={{ fontSize: 11, color: T.dim }}>following</span></span>
          <span><strong style={{ color: T.text, fontFamily: f('mono'), fontSize: 13 }}>{profile.posts}</strong> <span style={{ fontSize: 11, color: T.dim }}>posts</span></span>
        </div>

        {/* HOURS card */}
        <div style={{ padding: 14, borderRadius: 16, background: `${T.gold}06`, border: `1px solid ${T.gold}15`, marginBottom: 12, animation: 'slideUp 0.3s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: f(), letterSpacing: 1 }}>HOURS BALANCE*</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: T.gold, fontFamily: f('mono') }}>⏣ {fmt(profile.hours)}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: T.accent, fontFamily: f('mono') }}>+{profile.hoursThisWeek} this week</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{fmt(profile.hoursEarned)} lifetime</div>
            </div>
          </div>
          <div style={{ height: 4, borderRadius: 2, background: T.card, marginTop: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '48%', background: `linear-gradient(90deg, ${T.gold}, ${T.orange})`, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
            <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>🔥 Creator</span>
            <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>⚡ Builder: 5,000 HRS</span>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {profile.badges.map(b => (
            <div key={b.title} style={{ padding: '6px 8px', borderRadius: 8, background: T.surface, border: `1px solid ${T.border}`, textAlign: 'center' }}>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <div style={{ fontSize: 7, color: T.dim, fontFamily: f('mono'), marginTop: 1 }}>{b.title}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
          {[{ id: 'posts', label: '📝 Posts' }, { id: 'articles', label: '📰 Articles' }, { id: 'products', label: '🛍️ Shop' }, { id: 'likes', label: '❤️ Likes' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontFamily: f(), fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.primary : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'posts' && posts.map((post, i) => (
          <div key={post.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 8, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{profile.avatar}</div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>{profile.name}</span>
                <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginLeft: 4 }}>{post.time}</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 8 }}>{post.text}</p>
            <div style={{ display: 'flex', gap: 14 }}>
              <button onClick={() => setLikedPosts(p => ({ ...p, [post.id]: !p[post.id] }))} style={{ background: 'none', border: 'none', fontSize: 10, color: likedPosts[post.id] ? T.red : T.dim, fontFamily: f('mono') }}>{likedPosts[post.id] ? '❤️' : '🤍'} {post.likes + (likedPosts[post.id] ? 1 : 0)}</button>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>💬 {post.comments}</span>
              <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>⏣ {post.tips} tips</span>
            </div>
          </div>
        ))}

        {activeTab === 'articles' && articles.map((a, i) => (
          <div key={a.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 8, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>{a.title}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 9, color: T.primary, fontFamily: f('mono') }}>{a.zone}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{a.reads} reads</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{a.time}</span>
            </div>
          </div>
        ))}

        {activeTab === 'products' && products.map((pr, i) => (
          <div key={pr.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 8, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>{pr.title}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ {pr.price} HRS*</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>⭐ {pr.rating}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{pr.sales} sold</span>
            </div>
          </div>
        ))}

        {activeTab === 'likes' && <div style={{ textAlign: 'center', padding: 30, color: T.dim, fontSize: 12, fontFamily: f() }}>Your liked content appears here</div>}

        <div style={{ textAlign: 'center', marginTop: 8, fontSize: 8, color: T.dim, fontFamily: f('mono'), paddingBottom: 60 }}>*HOURS are internal credits, not currency.</div>
      </div>

      {/* Followers sheet */}
      {showFollowers && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setShowFollowers(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 440, maxHeight: '70vh', overflowY: 'auto', background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 12, textTransform: 'capitalize' }}>{showFollowers}</div>
            {followers.map(u => (
              <div key={u.handle} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{u.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{u.name}</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{u.handle} · {u.tier}</div>
                </div>
                <button style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f() }}>Following</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit sheet */}
      {showEdit && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setShowEdit(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 440, maxHeight: '85vh', overflowY: 'auto', background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 14 }}>Edit Profile</div>
            {[{ label: 'Name', value: profile.name }, { label: 'Bio', value: profile.bio }, { label: 'Website', value: 'sellfast.now' }].map(field => (
              <div key={field.label} style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f(), display: 'block', marginBottom: 4 }}>{field.label}</label>
                {field.label === 'Bio' ?
                  <textarea defaultValue={field.value} rows={3} style={{ width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none', resize: 'none' }} /> :
                  <input defaultValue={field.value} style={{ width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none' }} />
                }
              </div>
            ))}
            <button onClick={() => setShowEdit(false)} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.primary, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OursProfile;
