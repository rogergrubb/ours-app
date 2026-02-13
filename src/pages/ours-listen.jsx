import React, { useState, useEffect } from 'react';

const OursListen = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('live');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(null);
  const [handRaised, setHandRaised] = useState(false);
  const [muted, setMuted] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [following, setFollowing] = useState({});
  const [playProgress, setPlayProgress] = useState(0);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (isPlaying) {
      const i = setInterval(() => setPlayProgress(p => p >= 100 ? 0 : p + 0.5), 500);
      return () => clearInterval(i);
    }
  }, [isPlaying]);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a', listen: '#a78bfa' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const liveRooms = [
    { id: 'lr1', title: 'Creator Economy AMA', host: '@oursteam', hostAvatar: '🎯', listeners: 342, speakers: [{ name: '@sarahbuilds', avatar: '👩‍💻', speaking: true }, { name: '@growthlabs', avatar: '📈', speaking: false }, { name: '@devnotes', avatar: '💻', speaking: false }], raised: 12, topic: 'Business', duration: '1h 23m', live: true, description: 'Weekly open AMA about building on OURS. Ask anything about the platform, HOURS economy, or creator tools.', earn: '+1.5 HRS/hr' },
    { id: 'lr2', title: 'Lo-Fi Beats & Chill Work Session', host: '@melodylab', hostAvatar: '🎵', listeners: 189, speakers: [{ name: '@melodylab', avatar: '🎵', speaking: true }], raised: 0, topic: 'Music', duration: '3h 10m', live: true, description: 'Ambient lo-fi production session. Come hang out while I make beats. Coworking vibes.', earn: '+0.5 HRS/hr' },
    { id: 'lr3', title: 'Design Critique Circle', host: '@alexdesigns', hostAvatar: '🎨', listeners: 67, speakers: [{ name: '@alexdesigns', avatar: '🎨', speaking: true }, { name: '@sarahmakes', avatar: '✍️', speaking: false }], raised: 4, topic: 'Design', duration: '45m', live: true, description: 'Bring your work, get real feedback. No sugarcoating.', earn: '+1.5 HRS/hr' },
    { id: 'lr4', title: 'Philosophy Hour: Ethics of AI Art', host: '@marcusj', hostAvatar: '🧠', listeners: 45, speakers: [{ name: '@marcusj', avatar: '🧠', speaking: true }], raised: 8, topic: 'Culture', duration: '30m', live: true, description: 'Deep discussion on whether AI-generated art is "real" art and what it means for human creators.', earn: '+1.5 HRS/hr' },
  ];

  const podcasts = [
    { id: 'pod1', title: 'The Builder\'s Podcast', host: '@devnotes', avatar: '💻', subscribers: '56.2K', episodes: 89, description: 'Weekly conversations with people who build things. Software, hardware, businesses, communities.', tags: ['#tech', '#building', '#interviews'],
      episodeList: [
        { id: 'ep1', title: '#89: How We Built a $10M SaaS in 18 Months', duration: '1h 12m', plays: '23.4K', date: '2d ago' },
        { id: 'ep2', title: '#88: The Art of Developer Relations', duration: '58m', plays: '18.9K', date: '1w ago' },
        { id: 'ep3', title: '#87: From Open Source to Revenue', duration: '1h 05m', plays: '21.1K', date: '2w ago' },
      ] },
    { id: 'pod2', title: 'Growth Decoded', host: '@growthlabs', avatar: '📈', subscribers: '34.8K', episodes: 156, description: 'Data-driven growth strategies dissected. Each episode breaks down one growth tactic with real numbers.', tags: ['#growth', '#marketing', '#data'],
      episodeList: [
        { id: 'ep4', title: '#156: TikTok Shop — The Numbers Behind the Hype', duration: '42m', plays: '45.6K', date: '1d ago' },
        { id: 'ep5', title: '#155: Why Email Lists Still Beat Social Media', duration: '38m', plays: '34.2K', date: '1w ago' },
      ] },
    { id: 'pod3', title: 'Kitchen Confidential', host: '@priyacooks', avatar: '🍳', subscribers: '12.4K', episodes: 47, description: 'Stories from behind the stove. Food culture, restaurant industry, and the business of cooking.', tags: ['#food', '#culture', '#stories'],
      episodeList: [
        { id: 'ep6', title: '#47: Why Every Recipe Blog is 2000 Words', duration: '35m', plays: '12.1K', date: '3d ago' },
        { id: 'ep7', title: '#46: The $0 Influencer Problem', duration: '41m', plays: '15.8K', date: '1w ago' },
      ] },
    { id: 'pod4', title: 'Moral Machines', host: '@marcusj', avatar: '🧠', subscribers: '8.9K', episodes: 23, description: 'Philosophy meets technology. Exploring the ethical dimensions of the tools we build and use.', tags: ['#philosophy', '#ethics', '#tech'],
      episodeList: [
        { id: 'ep8', title: '#23: Should Algorithms Have Rights?', duration: '52m', plays: '6.7K', date: '5d ago' },
      ] },
  ];

  const playlists = [
    { id: 'pl1', title: 'Focus Mode', icon: '🎧', tracks: 24, duration: '2h 30m', description: 'Ambient + lo-fi for deep work', creator: '@melodylab' },
    { id: 'pl2', title: 'Morning Energy', icon: '☀️', tracks: 18, duration: '1h 15m', description: 'Upbeat tracks to start the day', creator: '@melodylab' },
    { id: 'pl3', title: 'Late Night Code', icon: '🌙', tracks: 32, duration: '3h 45m', description: 'Dark ambient for late sessions', creator: '@melodylab' },
  ];

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
    @keyframes livePulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  const LiveBadge = () => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 8, fontWeight: 700, color: '#fff', background: T.red, padding: '2px 8px', borderRadius: 4, fontFamily: f('mono') }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff', animation: 'livePulse 1.5s ease infinite' }} /> LIVE</span>;

  // ═══ HOME ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.listen}, ${T.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Listen</span>
            <span style={{ fontSize: 8, fontWeight: 700, fontFamily: f('mono'), background: `${T.red}20`, color: T.red, padding: '2px 6px', borderRadius: 4 }}>{liveRooms.length} LIVE</span>
          </div>
          <button style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: T.listen, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f() }}>+ Start Room</button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', gap: 4 }}>
          {[{ id: 'live', label: '🔴 Live Now' }, { id: 'podcasts', label: '🎙️ Podcasts' }, { id: 'playlists', label: '🎵 Playlists' }, { id: 'history', label: '⏱️ History' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 10px', border: 'none', background: 'none', whiteSpace: 'nowrap', fontFamily: f(), fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.listen : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: miniPlayer ? 100 : 60 }}>
        {/* LIVE ROOMS */}
        {activeTab === 'live' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {liveRooms.map((room, i) => (
              <div key={room.id} onClick={() => { setSelectedRoom(room); setView('room'); }} style={{ padding: 16, borderRadius: 16, background: T.surface, border: `1px solid ${T.red}20`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><LiveBadge /><span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{room.duration}</span></div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{room.title}</div>
                  </div>
                  <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono'), background: `${T.gold}10`, padding: '2px 6px', borderRadius: 4 }}>{room.earn}*</span>
                </div>
                <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 8 }}>{room.description}</p>
                <div style={{ display: 'flex', gap: -4, marginBottom: 8 }}>
                  {room.speakers.map((s, j) => (
                    <div key={j} style={{ width: 30, height: 30, borderRadius: 10, background: s.speaking ? `${T.listen}30` : T.card, border: s.speaking ? `2px solid ${T.listen}` : `2px solid ${T.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, marginLeft: j > 0 ? -6 : 0, position: 'relative', zIndex: room.speakers.length - j }}>
                      {s.avatar}
                      {s.speaking && <span style={{ position: 'absolute', bottom: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: T.accent, border: `1.5px solid ${T.bg}` }} />}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, fontSize: 9, color: T.dim, fontFamily: f('mono') }}>
                  <span>👥 {room.listeners} listening</span>
                  <span>🎤 {room.speakers.length} speakers</span>
                  {room.raised > 0 && <span>✋ {room.raised} raised</span>}
                  <span style={{ color: T.sub }}>{room.topic}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PODCASTS */}
        {activeTab === 'podcasts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {podcasts.map((pod, i) => (
              <div key={pod.id} onClick={() => { setSelectedPodcast(pod); setView('podcast'); }} style={{ display: 'flex', gap: 12, padding: 14, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{pod.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>{pod.title}</div>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), marginTop: 1 }}>{pod.host}</div>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.3, marginTop: 4 }}>{pod.description.slice(0, 60)}...</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{pod.episodes} eps</span>
                    <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{pod.subscribers} subs</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PLAYLISTS */}
        {activeTab === 'playlists' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {playlists.map((pl, i) => (
              <div key={pl.id} onClick={() => { setMiniPlayer({ title: pl.title, subtitle: pl.creator, icon: pl.icon }); setIsPlaying(true); }} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${T.listen}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{pl.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{pl.title}</div>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{pl.tracks} tracks · {pl.duration}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{pl.description}</div>
                </div>
                <span style={{ fontSize: 20 }}>▶</span>
              </div>
            ))}
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div style={{ textAlign: 'center', padding: 40, color: T.dim, fontSize: 12, fontFamily: f() }}>Your listening history will appear here</div>
        )}
      </div>
    </div>
  );

  // ═══ LIVE ROOM VIEW ═══
  const RoomView = () => {
    if (!selectedRoom) return null;
    const r = selectedRoom;
    return (
      <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => { setView('home'); setSelectedRoom(null); }} style={{ fontSize: 10, color: T.sub, background: 'none', border: 'none', fontFamily: f() }}>← Back</button>
          <LiveBadge />
          <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>👥 {r.listeners}</span>
        </div>
        <div style={{ flex: 1, padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{r.title}</div>
            <div style={{ fontSize: 11, color: T.sub, fontFamily: f(), marginTop: 4 }}>{r.description}</div>
            <div style={{ display: 'inline-block', marginTop: 6, padding: '3px 10px', borderRadius: 6, background: `${T.gold}10`, fontSize: 9, color: T.gold, fontFamily: f('mono') }}>{r.earn}*</div>
          </div>
          {/* Speakers */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>🎤 SPEAKERS</span>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {r.speakers.map((s, i) => (
                <div key={i} style={{ textAlign: 'center', width: 70 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: s.speaking ? `${T.listen}20` : T.card, border: s.speaking ? `2px solid ${T.listen}` : `2px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 4px', animation: s.speaking ? 'pulse 2s ease infinite' : undefined }}>{s.avatar}</div>
                  <div style={{ fontSize: 9, color: T.text, fontFamily: f(), fontWeight: s.speaking ? 700 : 400 }}>{s.name}</div>
                  {s.speaking && <div style={{ fontSize: 7, color: T.accent, fontFamily: f('mono') }}>Speaking</div>}
                </div>
              ))}
            </div>
          </div>
          {/* Listeners preview */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>👥 LISTENERS ({r.listeners})</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, border: `1px solid ${T.border}` }}>
                  {['😊', '🧑‍💻', '🎨', '🤓', '😎', '🧑‍🔬', '👩‍🎤', '🧑‍🏫', '🥷', '👨‍🚀', '🦊', '🐱'][i]}
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 4, fontSize: 9, color: T.dim, fontFamily: f('mono') }}>+{r.listeners - 12} more</div>
          </div>
        </div>
        {/* Bottom controls */}
        <div style={{ padding: '16px', borderTop: `1px solid ${T.border}`, background: T.surface }}>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => setMuted(!muted)} style={{ width: 48, height: 48, borderRadius: 16, border: 'none', background: muted ? T.card : T.listen, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{muted ? '🔇' : '🎤'}</button>
            <button onClick={() => setHandRaised(!handRaised)} style={{ width: 48, height: 48, borderRadius: 16, border: `1px solid ${handRaised ? T.gold : T.border}`, background: handRaised ? `${T.gold}15` : T.card, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✋</button>
            <button style={{ width: 48, height: 48, borderRadius: 16, border: `1px solid ${T.border}`, background: T.card, fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</button>
            <button onClick={() => { setView('home'); setSelectedRoom(null); }} style={{ padding: '12px 24px', borderRadius: 16, border: 'none', background: `${T.red}20`, fontSize: 12, fontWeight: 700, color: T.red, fontFamily: f() }}>Leave</button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
        </div>
      </div>
    );
  };

  // ═══ PODCAST VIEW ═══
  const PodcastView = () => {
    if (!selectedPodcast) return null;
    const pod = selectedPodcast;
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedPodcast(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>Podcast</span>
        </div>
        <div style={{ padding: '16px', paddingBottom: miniPlayer ? 100 : 60 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>{pod.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f() }}>{pod.title}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{pod.host}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{pod.episodes} episodes</span>
                <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{pod.subscribers} subscribers</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 10 }}>{pod.description}</p>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            <button onClick={() => setFollowing(p => ({ ...p, [pod.id]: !p[pod.id] }))} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: following[pod.id] ? `1px solid ${T.border}` : 'none', background: following[pod.id] ? T.card : T.listen, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f() }}>{following[pod.id] ? '✓ Subscribed' : 'Subscribe'}</button>
            <button style={{ padding: '10px 16px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.card, fontSize: 13 }}>🔔</button>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>EPISODES</span>
          {pod.episodeList.map((ep, i) => (
            <div key={ep.id} onClick={() => { setMiniPlayer({ title: ep.title, subtitle: pod.title, icon: pod.avatar }); setIsPlaying(true); setPlayProgress(0); }} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
              <button style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: `${T.listen}15`, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>▶</button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{ep.title}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                  <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{ep.duration}</span>
                  <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>▶ {ep.plays}</span>
                  <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{ep.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ═══ MINI PLAYER ═══
  const MiniPlayerBar = () => miniPlayer && (
    <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 440, background: T.elevated, borderTop: `1px solid ${T.border}`, padding: '0', zIndex: 60, animation: 'slideUp 0.2s ease' }}>
      <div style={{ height: 2, background: T.card }}><div style={{ height: '100%', width: `${playProgress}%`, background: T.listen, transition: 'width 0.5s' }} /></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.listen}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{miniPlayer.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f(), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{miniPlayer.title}</div>
          <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{miniPlayer.subtitle}</div>
        </div>
        <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: T.listen, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{isPlaying ? '⏸' : '▶'}</button>
        <button onClick={() => { setMiniPlayer(null); setIsPlaying(false); }} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'transparent', fontSize: 14, color: T.dim }}>✕</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto', position: 'relative' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'room' && <RoomView />}
      {view === 'podcast' && <PodcastView />}
      <MiniPlayerBar />
    </div>
  );
};

export default OursListen;
