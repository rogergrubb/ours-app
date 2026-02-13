import React, { useState, useEffect } from 'react';

const OursSearch = () => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [recentSearches, setRecentSearches] = useState(['creator economy', 'react tutorial', 'lo-fi beats', 'meal prep']);
  const [focused, setFocused] = useState(false);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const trending = [
    { term: 'build in public', searches: '12.4K', icon: '🔥' },
    { term: 'creator economy 2026', searches: '8.9K', icon: '📈' },
    { term: 'passive income', searches: '7.2K', icon: '💰' },
    { term: 'AI tools for creators', searches: '6.8K', icon: '🤖' },
    { term: 'HOURS earning tips', searches: '5.4K', icon: '⏣' },
  ];

  const people = [
    { handle: '@sarahbuilds', name: 'Sarah Builds', avatar: '👩‍💻', verified: true, tier: '⚡ Builder', followers: '23.4K', bio: 'Full-stack dev turned educator' },
    { handle: '@devnotes', name: 'Dev Notes', avatar: '💻', verified: true, tier: '🏗️ Architect', followers: '89.3K', bio: 'Technical deep-dives' },
    { handle: '@growthlabs', name: 'Growth Labs', avatar: '📈', verified: true, tier: '🏗️ Architect', followers: '67.8K', bio: 'Data-driven growth' },
    { handle: '@priyacooks', name: 'Priya Sharma', avatar: '🍳', verified: true, tier: '⚡ Builder', followers: '34.2K', bio: 'Food writer & recipe developer' },
    { handle: '@alexdesigns', name: 'Alex Designs', avatar: '🎨', verified: true, tier: '🏗️ Architect', followers: '45.1K', bio: 'UI/UX designer' },
    { handle: '@marcusfitness', name: 'Marcus Fitness', avatar: '💪', verified: true, tier: '🏗️ Architect', followers: '67.2K', bio: 'NASM-certified trainer' },
  ];

  const content = [
    { id: 'sc1', title: 'Why 500K Followers Meant $0', type: 'article', zone: '📰 Read', creator: '@priyacooks', stats: '12.4K reads' },
    { id: 'sc2', title: 'How We Scaled to 1M WebSockets', type: 'article', zone: '📰 Read', creator: '@devnotes', stats: '23.1K reads' },
    { id: 'sc3', title: 'Python Bootcamp: Zero to Dev', type: 'product', zone: '🛍️ Shop', creator: '@sarahbuilds', stats: '1.4K sold' },
    { id: 'sc4', title: 'Creator Economy AMA', type: 'live', zone: '🎙️ Listen', creator: '@oursteam', stats: '342 listening' },
    { id: 'sc5', title: '7-Day Content Marathon', type: 'challenge', zone: '🏆 Arena', creator: 'OURS', stats: '890 participants' },
    { id: 'sc6', title: 'Indie Builders', type: 'community', zone: '🏛️ Community', creator: '4.2K members', stats: '' },
    { id: 'sc7', title: 'Lo-Fi Sample Pack Vol. 3', type: 'product', zone: '🛍️ Shop', creator: '@melodylab', stats: '3.4K sold' },
    { id: 'sc8', title: 'React Performance Cheatsheet', type: 'pin', zone: '✨ Explore', creator: '@devnotes', stats: '5.6K saves' },
  ];

  const communities = [
    { name: 'Indie Builders', icon: '🔨', members: '4.2K', category: 'Tech' },
    { name: 'Creator Economy Hub', icon: '💰', members: '8.9K', category: 'Business' },
    { name: 'Design Collective', icon: '🎨', members: '3.1K', category: 'Design' },
  ];

  const filters = [
    { id: 'all', label: 'All' }, { id: 'people', label: '👤 People' }, { id: 'articles', label: '📰 Articles' },
    { id: 'videos', label: '🎬 Videos' }, { id: 'products', label: '🛍️ Products' }, { id: 'communities', label: '🏛️ Groups' }, { id: 'audio', label: '🎙️ Audio' },
  ];

  const q = query.toLowerCase();
  const filteredPeople = q ? people.filter(p => p.name.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q) || p.bio.toLowerCase().includes(q)) : people.slice(0, 3);
  const filteredContent = q ? content.filter(c => c.title.toLowerCase().includes(q) || c.creator.toLowerCase().includes(q)) : content.slice(0, 4);
  const showResults = query.length > 0;

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
    input::placeholder { color: ${T.dim}; }
  `;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {/* Search header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}`, padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} placeholder="Search people, content, products..." style={{ width: '100%', padding: '12px 14px 12px 36px', borderRadius: 14, border: `1px solid ${focused ? T.primary : T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: f(), outline: 'none', transition: 'border 0.2s' }} />
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
            {query && <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: 14, color: T.dim }}>✕</button>}
          </div>
          {query && <button onClick={() => { setQuery(''); setFocused(false); }} style={{ fontSize: 12, color: T.primary, background: 'none', border: 'none', fontFamily: f(), fontWeight: 600 }}>Cancel</button>}
        </div>
        {showResults && (
          <div style={{ display: 'flex', gap: 4, marginTop: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {filters.map(fil => (
              <button key={fil.id} onClick={() => setActiveFilter(fil.id)} style={{ padding: '5px 10px', borderRadius: 8, whiteSpace: 'nowrap', background: activeFilter === fil.id ? T.primary : T.surface, border: `1px solid ${activeFilter === fil.id ? T.primary : T.border}`, fontSize: 10, fontWeight: 600, color: activeFilter === fil.id ? '#fff' : T.sub, fontFamily: f() }}>{fil.label}</button>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 16px', paddingBottom: 80 }}>
        {/* Empty state */}
        {!showResults && (
          <div>
            {recentSearches.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>RECENT</span>
                  <button onClick={() => setRecentSearches([])} style={{ background: 'none', border: 'none', fontSize: 10, color: T.primary, fontFamily: f() }}>Clear</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {recentSearches.map(term => (
                    <button key={term} onClick={() => setQuery(term)} style={{ padding: '6px 12px', borderRadius: 8, background: T.surface, border: `1px solid ${T.border}`, fontSize: 11, color: T.sub, fontFamily: f() }}>🕐 {term}</button>
                  ))}
                </div>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>🔥 TRENDING SEARCHES</span>
              {trending.map((t, i) => (
                <div key={t.term} onClick={() => setQuery(t.term)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? T.orange : T.dim, fontFamily: f('mono'), width: 20 }}>{i + 1}</span>
                  <span style={{ fontSize: 16 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{t.term}</span></div>
                  <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{t.searches}</span>
                </div>
              ))}
            </div>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>👤 SUGGESTED CREATORS</span>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {people.slice(0, 5).map((p, i) => (
                  <div key={p.handle} style={{ minWidth: 100, padding: 12, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, textAlign: 'center', flexShrink: 0, animation: `slideUp 0.3s ease ${i * 0.05}s both` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, margin: '0 auto 4px' }}>{p.avatar}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: f() }}>{p.name.split(' ')[0]}</div>
                    <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>{p.followers}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            {(activeFilter === 'all' || activeFilter === 'people') && filteredPeople.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>👤 PEOPLE</span>
                {filteredPeople.map((p, i) => (
                  <div key={p.handle} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{p.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{p.name}</span>
                        {p.verified && <span style={{ fontSize: 7, color: T.primary }}>✓</span>}
                        <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{p.handle}</span>
                      </div>
                      <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{p.bio}</div>
                      <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 1 }}>{p.tier} · {p.followers} followers</div>
                    </div>
                    <button style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: T.primary, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>Follow</button>
                  </div>
                ))}
              </div>
            )}
            {(activeFilter === 'all' || activeFilter !== 'people') && filteredContent.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>📄 CONTENT</span>
                {filteredContent.map((c, i) => (
                  <div key={c.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{c.zone.split(' ')[0]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{c.title}</div>
                      <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 9, color: T.primary, fontFamily: f('mono') }}>{c.zone}</span>
                        <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{c.creator}</span>
                        {c.stats && <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{c.stats}</span>}
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: T.dim }}>→</span>
                  </div>
                ))}
              </div>
            )}
            {(activeFilter === 'all' || activeFilter === 'communities') && (
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>🏛️ COMMUNITIES</span>
                {communities.map((c, i) => (
                  <div key={c.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                    <span style={{ fontSize: 24 }}>{c.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{c.name}</div>
                      <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{c.members} members · {c.category}</div>
                    </div>
                    <button style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f() }}>Join</button>
                  </div>
                ))}
              </div>
            )}
            {filteredPeople.length === 0 && filteredContent.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: T.dim, fontSize: 12, fontFamily: f() }}>No results for "{query}"</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OursSearch;
