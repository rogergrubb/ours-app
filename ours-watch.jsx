import React, { useState } from 'react';

const OursWatch = () => {
  const [tab, setTab] = useState('shorts');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [liked, setLiked] = useState({});
  const [following, setFollowing] = useState({});

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };

  const videos = [
    { id: 1, title: 'Building an AI Agent in 60 Seconds', creator: 'Maya Chen', handle: '@mayac', avatar: '👩‍🎤', duration: '0:58', views: '24.3K', likes: 1240, trust: 97, tags: ['#ai', '#coding'], thumbnail: '🤖', type: 'short' },
    { id: 2, title: 'Why I Left Big Tech for OURS', creator: 'Jordan Lee', handle: '@jordanl', avatar: '🎨', duration: '12:34', views: '8.1K', likes: 892, trust: 94, tags: ['#tech'], thumbnail: '💼', type: 'long' },
    { id: 3, title: 'Sunset Timelapse — Golden Gate', creator: 'PhotoMaster', handle: '@photomaster', avatar: '📸', duration: '0:45', views: '15.7K', likes: 2100, trust: 91, tags: ['#photography'], thumbnail: '🌅', type: 'short' },
    { id: 4, title: 'The Complete Guide to HOURS Earning', creator: 'CryptoMind', handle: '@cryptomind', avatar: '🧠', duration: '28:15', views: '5.4K', likes: 678, trust: 89, tags: ['#tutorial'], thumbnail: '💰', type: 'long' },
    { id: 5, title: 'Live Coding: React From Scratch', creator: 'CodeStream', handle: '@codestream', avatar: '⚡', duration: 'LIVE', views: '342', likes: 89, trust: 93, tags: ['#coding'], thumbnail: '💻', type: 'live', listeners: 342 },
    { id: 6, title: 'Acoustic Guitar Session', creator: 'MusicVibes', handle: '@musicvibes', avatar: '🎵', duration: 'LIVE', views: '128', likes: 45, trust: 88, tags: ['#music'], thumbnail: '🎸', type: 'live', listeners: 128 },
    { id: 7, title: '3 Meals Under $5 Each', creator: 'CheapEats', handle: '@cheapeats', avatar: '🍕', duration: '0:42', views: '31.2K', likes: 3400, trust: 92, tags: ['#food'], thumbnail: '🍳', type: 'short' },
    { id: 8, title: 'Deep Dive: Platform Economics', creator: 'EconNerd', handle: '@econnerd', avatar: '📊', duration: '45:20', views: '2.1K', likes: 445, trust: 96, tags: ['#analysis'], thumbnail: '📈', type: 'long' },
  ];

  const comments = [
    { user: '@techie', avatar: '💻', text: 'Finally a platform that respects creators.', time: '2h', likes: 24 },
    { user: '@creator_joe', avatar: '🎯', text: 'Made 40 HOURS last week just from videos.', time: '4h', likes: 18 },
    { user: '@newuser', avatar: '🌱', text: 'Just joined. So refreshing compared to YouTube.', time: '6h', likes: 12 },
  ];

  const filteredVideos = tab === 'shorts' ? videos.filter(v => v.type === 'short') : tab === 'longform' ? videos.filter(v => v.type === 'long') : tab === 'live' ? videos.filter(v => v.type === 'live') : videos;

  if (selectedVideo) {
    const v = selectedVideo; const isLiked = liked[v.id]; const isFollowing = following[v.creator];
    return (
      <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); } @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: `linear-gradient(135deg, ${T.surface}, ${T.card})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 64, opacity: 0.3 }}>{v.thumbnail}</span>
            <button style={{ position: 'absolute', width: 64, height: 64, borderRadius: '50%', background: `${T.primary}cc`, border: 'none', cursor: 'pointer', fontSize: 24, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</button>
            <button onClick={() => setSelectedVideo(null)} style={{ position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer' }}>←</button>
            <div style={{ position: 'absolute', bottom: 12, right: 12, padding: '4px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.6)', fontSize: 12, fontFamily: "'DM Mono', monospace", color: '#fff' }}>{v.duration}</div>
            {v.type === 'live' && <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 8, background: T.red, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>🔴 LIVE • {v.listeners}</div>}
          </div>
          <div style={{ padding: '8px 20px', background: `${T.gold}08`, borderBottom: `1px solid ${T.gold}12`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>💰 Earning +0.3 HRS/min</span>
            {v.type === 'live' && <span style={{ fontSize: 9, fontWeight: 700, color: T.red, fontFamily: "'DM Mono', monospace", padding: '2px 8px', borderRadius: 6, background: `${T.red}15` }}>2x LIVE</span>}
          </div>
          <div style={{ padding: '16px 20px' }}>
            <h1 style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif", margin: '0 0 12px', lineHeight: 1.3 }}>{v.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${T.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{v.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{v.creator}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{v.handle} <span style={{ padding: '1px 6px', borderRadius: 4, background: `${T.accent}15`, color: T.accent, fontSize: 8 }}>🛡️ {v.trust}</span></div>
                </div>
              </div>
              <button onClick={() => setFollowing({...following, [v.creator]: !isFollowing})} style={{ padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", background: isFollowing ? T.card : `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: isFollowing ? `1px solid ${T.border}` : 'none', color: isFollowing ? T.sub : '#fff' }}>{isFollowing ? 'Following' : 'Follow'}</button>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto' }}>
              {[{ icon: liked[v.id] ? '❤️' : '🤍', label: v.likes, act: () => setLiked({...liked, [v.id]: !liked[v.id]}) }, { icon: '💬', label: comments.length }, { icon: '↗️', label: 'Share' }, { icon: '🔖', label: 'Save' }, { icon: '💎', label: 'Tip' }].map((b, i) => (
                <button key={i} onClick={b.act} style={{ padding: '8px 14px', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, background: i === 4 ? `${T.gold}12` : T.card, border: `1px solid ${i === 4 ? `${T.gold}20` : T.border}`, flexShrink: 0 }}>
                  <span style={{ fontSize: 14 }}>{b.icon}</span><span style={{ fontSize: 11, color: i === 4 ? T.gold : T.sub, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{b.label}</span>
                </button>
              ))}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>Comments</div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🧠</div>
              <div style={{ flex: 1, padding: '10px 14px', borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, fontSize: 12, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Add a comment... <span style={{ color: T.gold, fontSize: 9, fontFamily: "'DM Mono', monospace" }}>+0.1 HRS</span></div>
            </div>
            {comments.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${T.primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{c.user} <span style={{ fontWeight: 400, color: T.dim, fontSize: 9 }}>{c.time}</span></div>
                  <div style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>{c.text}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4, fontSize: 10, color: T.dim }}><span>❤️ {c.likes}</span><span>↩️ Reply</span></div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ padding: '0 20px 20px', fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6, opacity: 0.5 }}>*HOURS earning rates are targets. Actual amounts vary based on platform revenue.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); } @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10, background: `${T.bg}dd`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 20 }}>🎬</span><span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: T.red }}>Watch</span></div>
          <div style={{ padding: '5px 10px', borderRadius: 8, background: `${T.gold}10`, fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>+0.3/min</div>
        </div>
        <div style={{ display: 'flex', gap: 4, padding: '12px 20px', overflowX: 'auto' }}>
          {[{ id: 'shorts', l: '⚡ Shorts' }, { id: 'longform', l: '🎬 Long Form' }, { id: 'live', l: '🔴 Live' }, { id: 'following', l: '👥 Following' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 16px', borderRadius: 12, cursor: 'pointer', whiteSpace: 'nowrap', background: tab === t.id ? `${T.red}15` : T.card, border: `1px solid ${tab === t.id ? T.red : T.border}`, color: tab === t.id ? T.red : T.sub, fontSize: 12, fontWeight: tab === t.id ? 700 : 400, fontFamily: "'Outfit', sans-serif" }}>{t.l}</button>
          ))}
        </div>
        <div style={{ padding: '8px 20px' }}>
          {tab === 'shorts' && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {filteredVideos.map(v => (
              <button key={v.id} onClick={() => setSelectedVideo(v)} style={{ borderRadius: 18, overflow: 'hidden', cursor: 'pointer', textAlign: 'left', background: T.card, border: `1px solid ${T.border}`, width: '100%', padding: 0 }}>
                <div style={{ aspectRatio: '9/12', background: `linear-gradient(135deg, ${T.surface}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 40, opacity: 0.3 }}>{v.thumbnail}</span>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '3px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.6)', fontSize: 10, color: '#fff', fontFamily: "'DM Mono', monospace" }}>{v.duration}</div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4, lineHeight: 1.3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{v.title}</div>
                  <div style={{ fontSize: 10, color: T.dim }}>{v.avatar} {v.creator} • {v.views}</div>
                </div>
              </button>
            ))}
          </div>}
          {(tab === 'longform' || tab === 'following') && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredVideos.map(v => (
              <button key={v.id} onClick={() => setSelectedVideo(v)} style={{ display: 'flex', gap: 12, borderRadius: 16, cursor: 'pointer', textAlign: 'left', background: T.card, border: `1px solid ${T.border}`, width: '100%', padding: 12 }}>
                <div style={{ width: 140, aspectRatio: '16/9', borderRadius: 12, background: `linear-gradient(135deg, ${T.surface}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
                  <span style={{ fontSize: 28, opacity: 0.3 }}>{v.thumbnail}</span>
                  <div style={{ position: 'absolute', bottom: 4, right: 4, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.6)', fontSize: 9, color: '#fff', fontFamily: "'DM Mono', monospace" }}>{v.duration}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{v.creator} • {v.views}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: T.gold, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>+0.3 HRS/min</div>
                </div>
              </button>
            ))}
          </div>}
          {tab === 'live' && <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredVideos.map(v => (
              <button key={v.id} onClick={() => setSelectedVideo(v)} style={{ borderRadius: 20, cursor: 'pointer', textAlign: 'left', background: `linear-gradient(135deg, ${T.red}08, ${T.card})`, border: `1px solid ${T.red}20`, width: '100%', padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: T.red }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse-dot 1.5s ease infinite' }} /><span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>LIVE</span></div>
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{v.listeners} watching</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.red, padding: '2px 8px', borderRadius: 6, background: `${T.red}15`, marginLeft: 'auto' }}>2x HRS</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>{v.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${T.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{v.avatar}</div>
                  <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{v.creator}</span>
                </div>
              </button>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};
export default OursWatch;
