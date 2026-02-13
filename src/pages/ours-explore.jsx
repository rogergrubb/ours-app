import React, { useState, useEffect } from 'react';

const OursExplore = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('foryou');
  const [selectedPin, setSelectedPin] = useState(null);
  const [saved, setSaved] = useState({});
  const [showBoards, setShowBoards] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a', explore: '#fb923c' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const topics = [
    { id: 'design', label: 'Design', icon: '🎨', color: '#ec4899' },
    { id: 'photo', label: 'Photography', icon: '📸', color: '#f59e0b' },
    { id: 'art', label: 'Digital Art', icon: '🖼️', color: '#8b5cf6' },
    { id: 'food', label: 'Food & Recipes', icon: '🍳', color: '#10b981' },
    { id: 'travel', label: 'Travel', icon: '✈️', color: '#0ea5e9' },
    { id: 'fashion', label: 'Fashion', icon: '👗', color: '#f472b6' },
    { id: 'tech', label: 'Tech & Code', icon: '💻', color: '#6366f1' },
    { id: 'fitness', label: 'Fitness', icon: '💪', color: '#ef4444' },
  ];

  const pins = [
    { id: 'e1', type: 'image', title: 'Glassmorphism Dashboard Concept', creator: '@alexdesigns', avatar: '🎨', saves: 2340, likes: 4500, topic: 'design', height: 180, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', hours: 12.5, trending: true },
    { id: 'e2', type: 'image', title: 'Golden Hour in Kyoto', creator: '@jadekim', avatar: '📸', saves: 1890, likes: 6700, topic: 'photo', height: 240, gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', hours: 8.2 },
    { id: 'e3', type: 'image', title: 'Neon Cyberpunk Character', creator: '@mayachen', avatar: '🖼️', saves: 3400, likes: 8900, topic: 'art', height: 200, gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)', hours: 24.0, trending: true },
    { id: 'e4', type: 'infographic', title: 'React Performance Cheatsheet', creator: '@devnotes', avatar: '💻', saves: 5600, likes: 12000, topic: 'tech', height: 280, gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)', hours: 45.0, trending: true },
    { id: 'e5', type: 'image', title: 'Minimalist Brand Identity System', creator: '@alexdesigns', avatar: '🎨', saves: 1200, likes: 3400, topic: 'design', height: 160, gradient: 'linear-gradient(135deg, #0f172a, #334155)', hours: 6.8 },
    { id: 'e6', type: 'recipe', title: 'One-Pan Lemon Herb Salmon', creator: '@priyacooks', avatar: '🍳', saves: 890, likes: 2100, topic: 'food', height: 200, gradient: 'linear-gradient(135deg, #10b981, #059669)', hours: 3.4 },
    { id: 'e7', type: 'image', title: 'Bali Sunset Cliffs', creator: '@jadekim', avatar: '📸', saves: 4500, likes: 9800, topic: 'travel', height: 220, gradient: 'linear-gradient(135deg, #f97316, #ef4444)', hours: 15.6 },
    { id: 'e8', type: 'image', title: 'Y2K Fashion Moodboard', creator: '@fashionkid', avatar: '👗', saves: 2100, likes: 5600, topic: 'fashion', height: 190, gradient: 'linear-gradient(135deg, #f472b6, #ec4899)', hours: 9.1 },
    { id: 'e9', type: 'infographic', title: 'CSS Grid Visual Guide', creator: '@sarahbuilds', avatar: '💻', saves: 7800, likes: 15000, topic: 'tech', height: 300, gradient: 'linear-gradient(135deg, #6366f1, #0ea5e9)', hours: 67.0, trending: true },
    { id: 'e10', type: 'image', title: 'Isometric City Illustration', creator: '@mayachen', avatar: '🖼️', saves: 2800, likes: 7200, topic: 'art', height: 210, gradient: 'linear-gradient(135deg, #a78bfa, #6366f1)', hours: 18.4 },
    { id: 'e11', type: 'image', title: 'Home Gym Setup Guide', creator: '@marcusfitness', avatar: '💪', saves: 3200, likes: 4500, topic: 'fitness', height: 170, gradient: 'linear-gradient(135deg, #ef4444, #f97316)', hours: 7.5 },
    { id: 'e12', type: 'recipe', title: 'Perfect Homemade Ramen', creator: '@priyacooks', avatar: '🍳', saves: 4200, likes: 8900, topic: 'food', height: 230, gradient: 'linear-gradient(135deg, #f59e0b, #10b981)', hours: 22.0 },
    { id: 'e13', type: 'image', title: '3D Abstract Composition', creator: '@mayachen', avatar: '🖼️', saves: 1500, likes: 4100, topic: 'art', height: 190, gradient: 'linear-gradient(135deg, #0ea5e9, #a78bfa)', hours: 11.2 },
    { id: 'e14', type: 'image', title: 'Tokyo Street Photography', creator: '@jadekim', avatar: '📸', saves: 3800, likes: 11000, topic: 'travel', height: 250, gradient: 'linear-gradient(135deg, #334155, #6366f1)', hours: 28.0 },
    { id: 'e15', type: 'image', title: 'SaaS Pricing Page Breakdown', creator: '@growthlabs', avatar: '📈', saves: 6100, likes: 13000, topic: 'tech', height: 180, gradient: 'linear-gradient(135deg, #10b981, #0ea5e9)', hours: 34.0 },
    { id: 'e16', type: 'image', title: 'Watercolor Landscape Tutorial', creator: '@artclass', avatar: '🎨', saves: 1800, likes: 3900, topic: 'art', height: 200, gradient: 'linear-gradient(135deg, #059669, #f59e0b)', hours: 5.6 },
  ];

  const boards = [
    { id: 'b1', title: 'Design Inspiration', count: 24, icon: '🎨' },
    { id: 'b2', title: 'Dev Resources', count: 18, icon: '💻' },
    { id: 'b3', title: 'Travel Goals', count: 12, icon: '✈️' },
  ];

  const filteredPins = activeTab === 'foryou' ? pins : activeTab === 'trending' ? pins.filter(p => p.trending) : pins.filter(p => p.topic === activeTab);

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  // ═══ MASONRY GRID ═══
  const MasonryGrid = ({ items }) => {
    const col1 = items.filter((_, i) => i % 2 === 0);
    const col2 = items.filter((_, i) => i % 2 === 1);
    const PinCard = ({ pin, index }) => (
      <div onClick={() => { setSelectedPin(pin); setView('detail'); }} style={{ marginBottom: 8, borderRadius: 14, overflow: 'hidden', background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `scaleIn 0.3s ease ${index * 0.04}s both` }}>
        <div style={{ width: '100%', height: pin.height, background: pin.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: 32, opacity: 0.3 }}>{pin.type === 'recipe' ? '🍽️' : pin.type === 'infographic' ? '📊' : '🖼️'}</span>
          {pin.trending && <span style={{ position: 'absolute', top: 6, left: 6, fontSize: 7, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: 4 }}>🔥 Trending</span>}
          <button onClick={(e) => { e.stopPropagation(); setSaved(p => ({ ...p, [pin.id]: !p[pin.id] })); }} style={{ position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: 8, border: 'none', background: saved[pin.id] ? T.explore : 'rgba(0,0,0,0.5)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{saved[pin.id] ? '✓' : '📌'}</button>
        </div>
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{pin.title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 12 }}>{pin.avatar}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{pin.creator}</span>
            </div>
            <span style={{ fontSize: 8, color: T.gold, fontFamily: f('mono') }}>⏣ {pin.hours}*</span>
          </div>
        </div>
      </div>
    );
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1 }}>{col1.map((pin, i) => <PinCard key={pin.id} pin={pin} index={i * 2} />)}</div>
        <div style={{ flex: 1 }}>{col2.map((pin, i) => <PinCard key={pin.id} pin={pin} index={i * 2 + 1} />)}</div>
      </div>
    );
  };

  // ═══ HOME ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.explore}, ${T.pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Explore</span>
          <div style={{ flex: 1, position: 'relative' }}>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search inspiration..." style={{ width: '100%', padding: '8px 12px 8px 30px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 11, fontFamily: f(), outline: 'none' }} />
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 12 }}>🔍</span>
          </div>
          <button onClick={() => setShowBoards(true)} style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📁</button>
        </div>
        {/* Topic pills */}
        <div style={{ display: 'flex', gap: 4, padding: '0 16px 8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[{ id: 'foryou', label: 'For You', icon: '✨' }, { id: 'trending', label: 'Trending', icon: '🔥' }, ...topics].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '5px 10px', borderRadius: 8, whiteSpace: 'nowrap', fontSize: 10, fontWeight: 600,
              background: activeTab === t.id ? (t.color || T.explore) : T.surface,
              border: `1px solid ${activeTab === t.id ? (t.color || T.explore) : T.border}`,
              color: activeTab === t.id ? '#fff' : T.sub, fontFamily: f(),
            }}>{t.icon || ''} {t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '8px 8px 100px' }}>
        <MasonryGrid items={filteredPins} />
      </div>
    </div>
  );

  // ═══ DETAIL VIEW ═══
  const DetailView = () => {
    if (!selectedPin) return null;
    const p = selectedPin;
    const isSaved = saved[p.id];
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedPin(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setSaved(pr => ({ ...pr, [p.id]: !isSaved }))} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: isSaved ? T.explore : T.surface, fontSize: 11, fontWeight: 700, color: isSaved ? '#fff' : T.sub, fontFamily: f() }}>{isSaved ? '✓ Saved' : '📌 Save'}</button>
            <button style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, fontSize: 11, fontWeight: 600, color: T.sub, fontFamily: f() }}>🔗 Share</button>
          </div>
        </div>
        <div style={{ padding: '0 0 100px' }}>
          <div style={{ width: '100%', height: 280, background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 56, opacity: 0.3 }}>{p.type === 'recipe' ? '🍽️' : p.type === 'infographic' ? '📊' : '🖼️'}</span>
          </div>
          <div style={{ padding: '16px' }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, marginBottom: 8 }}>{p.title}</h1>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, cursor: 'pointer' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{p.avatar}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{p.creator}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>Creator</div>
              </div>
              <button style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 8, border: 'none', background: T.explore, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>Follow</button>
            </div>
            <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{fmt(p.likes)}</div><div style={{ fontSize: 9, color: T.dim }}>Likes</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{fmt(p.saves)}</div><div style={{ fontSize: 9, color: T.dim }}>Saves</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>⏣ {p.hours}*</div><div style={{ fontSize: 9, color: T.dim }}>Earned</div></div>
            </div>
            <div style={{ marginTop: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>MORE LIKE THIS</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {pins.filter(pin => pin.topic === p.topic && pin.id !== p.id).slice(0, 4).map(pin => (
                  <div key={pin.id} onClick={() => setSelectedPin(pin)} style={{ minWidth: 120, borderRadius: 12, overflow: 'hidden', background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', flexShrink: 0 }}>
                    <div style={{ width: '100%', height: 100, background: pin.gradient }} />
                    <div style={{ padding: 6 }}><span style={{ fontSize: 9, fontWeight: 600, color: T.text, fontFamily: f() }}>{pin.title.slice(0, 25)}...</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12, textAlign: 'center' }}><span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal platform credits, not currency.</span></div>
          </div>
        </div>
      </div>
    );
  };

  // ═══ BOARDS SHEET ═══
  const BoardsSheet = () => showBoards && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowBoards(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 12 }}>📁 My Boards</div>
        {boards.map((board, i) => (
          <div key={board.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 24 }}>{board.icon}</span>
            <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: f() }}>{board.title}</div><div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{board.count} pins</div></div>
            <span style={{ fontSize: 12, color: T.dim }}>→</span>
          </div>
        ))}
        <button style={{ width: '100%', marginTop: 12, padding: 12, borderRadius: 12, border: `1px dashed ${T.border}`, background: 'transparent', fontSize: 12, fontWeight: 600, color: T.sub, fontFamily: f() }}>+ Create New Board</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'detail' && <DetailView />}
      <BoardsSheet />
    </div>
  );
};

export default OursExplore;
