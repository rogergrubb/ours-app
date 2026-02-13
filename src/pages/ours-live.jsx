import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — LIVE
// "Watch people be real."
//
// Building in Public • Live Podcasts • Interviews • Creative Sessions
// Monologues • Coworking • Just Vibing • Audio Rooms
// The anti-performance. No filters. Just humans doing human things.
// ═══════════════════════════════════════════════════════════════════════════

const OursLive = () => {
  const [view, setView] = useState('browse'); // browse | watching | hosting | goLive
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStream, setSelectedStream] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showViewers, setShowViewers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [tipAmount, setTipAmount] = useState(null);
  const [showTipSheet, setShowTipSheet] = useState(false);
  const [showGoLive, setShowGoLive] = useState(false);
  const [liveTitle, setLiveTitle] = useState('');
  const [liveCategory, setLiveCategory] = useState('building');
  const [liveDescription, setLiveDescription] = useState('');
  const [liveSettings, setLiveSettings] = useState({ camera: true, screen: true, chat: true, tips: true, cohost: false });
  const [reactions, setReactions] = useState([]);
  const [viewerCount, setViewerCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [pinnedMessage, setPinnedMessage] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [activeTab, setActiveTab] = useState('live'); // live | upcoming | replays
  const chatEndRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Simulate viewer count fluctuation
  useEffect(() => {
    if (view === 'watching' && selectedStream) {
      setViewerCount(selectedStream.viewers);
      const interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [view, selectedStream]);

  // Simulate elapsed time
  useEffect(() => {
    if (view === 'watching') {
      const interval = setInterval(() => setElapsed(prev => prev + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Auto-chat messages
  useEffect(() => {
    if (view === 'watching') {
      const initialMessages = [
        { id: 1, user: 'Maya C.', avatar: '🎨', text: 'This is so cool watching you build in real-time', time: '2m', type: 'chat', verified: true },
        { id: 2, user: 'Jordan B.', avatar: '💡', text: 'What stack are you using?', time: '2m', type: 'chat' },
        { id: 3, user: 'Dev P.', avatar: '💻', text: '🔥🔥🔥', time: '1m', type: 'reaction' },
        { id: 4, user: 'System', avatar: '⏣', text: 'Luna Nova tipped 5.0 HOURS', time: '1m', type: 'tip', amount: 5 },
        { id: 5, user: 'Alex R.', avatar: '🎬', text: 'Can you explain that last function?', time: '45s', type: 'chat', verified: true },
        { id: 6, user: 'Sam T.', avatar: '🎵', text: 'Love the chill vibes of this stream', time: '30s', type: 'chat' },
      ];
      setChatMessages(initialMessages);

      const botMessages = [
        { user: 'Nira C.', avatar: '🪡', text: 'Just joined! What did I miss?', type: 'chat' },
        { user: 'System', avatar: '✦', text: '3 new viewers joined', type: 'system' },
        { user: 'Jade K.', avatar: '📸', text: 'This is exactly what I needed to see today', type: 'chat', verified: true },
        { user: 'System', avatar: '⏣', text: 'Maya Chen tipped 2.0 HOURS', type: 'tip', amount: 2 },
        { user: 'Dr. Liu', avatar: '🧠', text: 'Fascinating approach to the data layer', type: 'chat', verified: true },
        { user: 'Dev P.', avatar: '💻', text: 'Have you considered using a state machine here?', type: 'chat' },
        { user: 'Luna N.', avatar: '🌙', text: '👏👏👏', type: 'reaction' },
        { user: 'System', avatar: '✦', text: 'Viewer milestone: 50+ watching!', type: 'milestone' },
      ];

      let msgIndex = 0;
      const interval = setInterval(() => {
        if (msgIndex < botMessages.length) {
          const msg = { ...botMessages[msgIndex], id: Date.now() + msgIndex, time: 'now' };
          setChatMessages(prev => [...prev, msg]);
          msgIndex++;
        }
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [view]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    lime: '#84cc16', teal: '#2dd4bf', rose: '#fb7185', indigo: '#818cf8',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    glass: 'rgba(10,17,34,0.88)',
  };

  const f = (family = 'body') => ({
    body: "'Outfit', sans-serif",
    mono: "'DM Mono', monospace",
    display: "'Playfair Display', serif",
  }[family]);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}` : `${m}:${String(s).padStart(2,'0')}`;
  };

  // ═══ CATEGORIES ═══
  const categories = [
    { id: 'all', label: 'All Live', icon: '📡', color: T.primary },
    { id: 'building', label: 'Building', icon: '🔨', color: T.cyan },
    { id: 'creating', label: 'Creating', icon: '🎨', color: T.pink },
    { id: 'talking', label: 'Talking', icon: '🎙️', color: T.orange },
    { id: 'coworking', label: 'Coworking', icon: '☕', color: T.teal },
    { id: 'learning', label: 'Learning', icon: '📚', color: T.purple },
    { id: 'gaming', label: 'Gaming', icon: '🎮', color: T.accent },
    { id: 'music', label: 'Music', icon: '🎵', color: T.gold },
    { id: 'vibing', label: 'Just Vibing', icon: '🌊', color: T.indigo },
  ];

  // ═══ LIVE STREAMS DATA ═══
  const liveStreams = [
    {
      id: 'l1', category: 'building',
      title: 'Building a revenue dashboard from scratch',
      host: { name: 'Dev Patel', avatar: '💻', handle: '@devpatel', verified: false, followers: '8.9K' },
      viewers: 47, duration: '1h 23m', started: '1h ago',
      tags: ['#buildinpublic', '#react', '#dashboard'],
      thumbnail: 'linear-gradient(135deg, #0c1222 0%, #162544 50%, #0a1832 100%)',
      thumbnailIcon: '💻',
      description: "Building a real-time analytics dashboard for my OURS shop. Using React, Recharts, and the OURS API. Come watch, ask questions, or just vibe while I code.",
      featured: true, tips: 23.5,
      cohosts: [],
      mood: 'focused',
    },
    {
      id: 'l2', category: 'talking',
      title: 'Creator Roundtable: How ownership changes everything',
      host: { name: 'Sam Torres', avatar: '🎵', handle: '@samtorres', verified: true, followers: '34.2K' },
      viewers: 189, duration: '45m', started: '45m ago',
      tags: ['#podcast', '#creatoreconomy', '#ownership'],
      thumbnail: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)',
      thumbnailIcon: '🎙️',
      description: "Weekly roundtable with creators across all OURS zones. This week: Maya Chen (art), Alex Rivera (video), and Dr. Sarah Liu (writing). Ask anything.",
      featured: true, tips: 67.0,
      cohosts: [
        { name: 'Maya C.', avatar: '🎨' },
        { name: 'Alex R.', avatar: '🎬' },
        { name: 'Dr. Liu', avatar: '🧠' },
      ],
      mood: 'conversational',
    },
    {
      id: 'l3', category: 'creating',
      title: 'Painting to lo-fi — come chill',
      host: { name: 'Maya Chen', avatar: '🎨', handle: '@mayachen', verified: true, followers: '45.2K' },
      viewers: 312, duration: '2h 10m', started: '2h ago',
      tags: ['#art', '#lofi', '#chill', '#painting'],
      thumbnail: 'linear-gradient(135deg, #1a1033 0%, #2d1654 50%, #0f0a1f 100%)',
      thumbnailIcon: '🎨',
      description: "Just painting whatever feels right. No plan, no pressure. Lo-fi beats in the background. Chat if you want, or just watch the colors come together.",
      tips: 89.0,
      cohosts: [],
      mood: 'chill',
    },
    {
      id: 'l4', category: 'coworking',
      title: 'Silent coworking — cameras on, heads down ☕',
      host: { name: 'Focus Club', avatar: '☕', handle: '@focusclub', verified: false, followers: '2.1K' },
      viewers: 78, duration: '3h 45m', started: '4h ago',
      tags: ['#coworking', '#focus', '#productivity'],
      thumbnail: 'linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)',
      thumbnailIcon: '☕',
      description: "The virtual office. Cameras on, mics off. 25/5 pomodoro timer running. Just knowing others are working alongside you is the point. Join the room.",
      tips: 12.0,
      cohosts: [],
      mood: 'silent',
      special: 'pomodoro',
    },
    {
      id: 'l5', category: 'talking',
      title: "I quit my 6-figure job for OURS — here's what happened",
      host: { name: 'Jordan Blake', avatar: '💡', handle: '@jordanblake', verified: false, followers: '12.3K' },
      viewers: 534, duration: '32m', started: '32m ago',
      tags: ['#story', '#career', '#honesty'],
      thumbnail: 'linear-gradient(135deg, #1a1205 0%, #2a1f0a 50%, #1a1205 100%)',
      thumbnailIcon: '💡',
      description: "No script. No edits. Just me being honest about leaving a comfortable career to bet on platform ownership. The good, the bad, and the terrifying.",
      featured: true, tips: 145.0,
      cohosts: [],
      mood: 'raw',
    },
    {
      id: 'l6', category: 'learning',
      title: 'Web3 for normal humans — no jargon edition',
      host: { name: 'Dr. Sarah Liu', avatar: '🧠', handle: '@drsarahliu', verified: true, followers: '67.8K' },
      viewers: 256, duration: '1h 05m', started: '1h ago',
      tags: ['#learning', '#web3', '#explainer'],
      thumbnail: 'linear-gradient(135deg, #051a14 0%, #0a2e24 50%, #051a14 100%)',
      thumbnailIcon: '📚',
      description: "Breaking down complex concepts into plain English. Today: What platform ownership actually means and why it matters for regular people.",
      tips: 34.0,
      cohosts: [],
      mood: 'educational',
    },
    {
      id: 'l7', category: 'music',
      title: 'Late night beats — producing live',
      host: { name: 'Rhythm Lab', avatar: '🎹', handle: '@rhythmlab', verified: false, followers: '5.6K' },
      viewers: 93, duration: '1h 40m', started: '2h ago',
      tags: ['#music', '#production', '#beats', '#lofi'],
      thumbnail: 'linear-gradient(135deg, #0a0520 0%, #1a0a3a 50%, #0a0520 100%)',
      thumbnailIcon: '🎵',
      description: "Making beats from scratch in Ableton. Request a vibe in the chat and I'll try to make it. Last session we made 4 tracks together.",
      tips: 56.0,
      cohosts: [],
      mood: 'creative',
    },
    {
      id: 'l8', category: 'vibing',
      title: 'Sunset from my rooftop — Tokyo 🌅',
      host: { name: 'Jade Kim', avatar: '📸', handle: '@jadekim', verified: true, followers: '23.4K' },
      viewers: 421, duration: '20m', started: '20m ago',
      tags: ['#tokyo', '#sunset', '#ambient', '#peaceful'],
      thumbnail: 'linear-gradient(135deg, #1a0a05 0%, #2e1a0f 30%, #4a2a15 60%, #1a0a05 100%)',
      thumbnailIcon: '🌅',
      description: "No commentary. No agenda. Just watching the sun set over Tokyo with a few hundred strangers. Sometimes that's enough.",
      tips: 178.0,
      cohosts: [],
      mood: 'ambient',
    },
    {
      id: 'l9', category: 'building',
      title: 'Fixing production bugs LIVE (send prayers)',
      host: { name: 'Code Panic', avatar: '🚨', handle: '@codepanic', verified: false, followers: '3.2K' },
      viewers: 156, duration: '55m', started: '1h ago',
      tags: ['#debugging', '#production', '#chaos'],
      thumbnail: 'linear-gradient(135deg, #1a0505 0%, #2e0a0a 50%, #1a0505 100%)',
      thumbnailIcon: '🔥',
      description: "Our deploy broke something. Fixing it live because transparency. This is what real engineering looks like. Messy, stressful, human.",
      tips: 45.0,
      cohosts: [{ name: 'Bug Bot', avatar: '🐛' }],
      mood: 'chaotic',
    },
  ];

  // Upcoming
  const upcomingStreams = [
    { id: 'u1', title: 'OURS Town Hall — February 2026', host: 'OURS Team', avatar: '✦', time: 'Tomorrow, 2:00 PM', attendees: 1247, category: 'talking' },
    { id: 'u2', title: 'Generative Art Workshop', host: 'Maya Chen', avatar: '🎨', time: 'Fri, 4:00 PM', attendees: 456, category: 'creating' },
    { id: 'u3', title: 'Startup Pitch Practice — Brutal Honesty', host: 'Jordan Blake', avatar: '💡', time: 'Sat, 11:00 AM', attendees: 234, category: 'talking' },
    { id: 'u4', title: 'Sunday Ambient Session — Nature Sounds', host: 'Jade Kim', avatar: '📸', time: 'Sun, 6:00 PM', attendees: 892, category: 'vibing' },
  ];

  const filteredStreams = activeCategory === 'all'
    ? liveStreams
    : liveStreams.filter(s => s.category === activeCategory);

  // ═══ HELPERS ═══
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, {
      id: Date.now(), user: 'You', avatar: '👤', text: chatInput, time: 'now', type: 'chat',
    }]);
    setChatInput('');
  };

  const sendReaction = (emoji) => {
    const id = Date.now() + Math.random();
    setReactions(prev => [...prev, { id, emoji, x: 60 + Math.random() * 30 }]);
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2000);
  };

  const getMoodStyle = (mood) => {
    const moods = {
      focused: { border: T.cyan, label: '🎯 Focused', bg: `${T.cyan}10` },
      conversational: { border: T.orange, label: '💬 Conversation', bg: `${T.orange}10` },
      chill: { border: T.purple, label: '🧘 Chill', bg: `${T.purple}10` },
      silent: { border: T.dim, label: '🤫 Silent Room', bg: `${T.dim}10` },
      raw: { border: T.gold, label: '💯 Raw & Honest', bg: `${T.gold}10` },
      educational: { border: T.teal, label: '📖 Educational', bg: `${T.teal}10` },
      creative: { border: T.pink, label: '✨ Creative', bg: `${T.pink}10` },
      ambient: { border: T.indigo, label: '🌊 Ambient', bg: `${T.indigo}10` },
      chaotic: { border: T.red, label: '🔥 Chaos Mode', bg: `${T.red}10` },
    };
    return moods[mood] || moods.focused;
  };

  // ═══ STYLES ═══
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes livePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes reactionFloat {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      50% { transform: translateY(-60px) scale(1.3); opacity: 0.8; }
      100% { transform: translateY(-120px) scale(0.6); opacity: 0; }
    }
    @keyframes waveform {
      0%,100% { height: 4px; }
      50% { height: 16px; }
    }
    @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes breathe { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
    input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.3); }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
    textarea { resize: none; }
  `;

  // ═══ STREAM CARD ═══
  const StreamCard = ({ stream, index, size = 'normal' }) => {
    const moodStyle = getMoodStyle(stream.mood);
    const isFeatured = stream.featured;
    const isLarge = size === 'large';

    return (
      <div
        onClick={() => { setSelectedStream(stream); setView('watching'); setElapsed(0); }}
        style={{
          borderRadius: 18, overflow: 'hidden',
          border: `1px solid ${isFeatured ? `${T.primary}30` : T.border}`,
          background: T.surface, cursor: 'pointer',
          transition: 'all 0.25s ease',
          animation: `slideUp 0.4s ease ${index * 0.06}s both`,
        }}
      >
        {/* Thumbnail */}
        <div style={{
          position: 'relative', width: '100%',
          aspectRatio: isLarge ? '16/8' : '16/9',
          background: stream.thumbnail,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{ fontSize: isLarge ? 56 : 40, opacity: 0.2 }}>{stream.thumbnailIcon}</span>

          {/* Live badge */}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            padding: '3px 10px', borderRadius: 8,
            background: T.red, display: 'flex', alignItems: 'center', gap: 5,
            animation: 'livePulse 2s infinite',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f('mono') }}>LIVE</span>
          </div>

          {/* Viewer count */}
          <div style={{
            position: 'absolute', top: 10, right: 10,
            padding: '3px 8px', borderRadius: 8,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 10 }}>👁️</span>
            <span style={{ fontSize: 10, color: '#fff', fontFamily: f('mono'), fontWeight: 600 }}>{stream.viewers}</span>
          </div>

          {/* Duration */}
          <div style={{
            position: 'absolute', bottom: 10, right: 10,
            padding: '3px 8px', borderRadius: 8,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: 10, color: '#fff', fontFamily: f('mono') }}>{stream.duration}</span>
          </div>

          {/* Mood badge */}
          <div style={{
            position: 'absolute', bottom: 10, left: 10,
            padding: '3px 8px', borderRadius: 8,
            background: moodStyle.bg, border: `1px solid ${moodStyle.border}30`,
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: 9, color: moodStyle.border, fontFamily: f(), fontWeight: 600 }}>{moodStyle.label}</span>
          </div>

          {/* Co-hosts */}
          {stream.cohosts.length > 0 && (
            <div style={{
              position: 'absolute', top: 10, left: 80,
              display: 'flex', gap: -8,
            }}>
              {stream.cohosts.map((c, i) => (
                <div key={i} style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: T.card, border: `2px solid ${T.bg}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, marginLeft: i > 0 ? -6 : 0,
                }}>{c.avatar}</div>
              ))}
              <span style={{
                fontSize: 9, color: '#fff', fontFamily: f('mono'),
                background: 'rgba(0,0,0,0.5)', padding: '4px 6px', borderRadius: 6,
                marginLeft: 4, alignSelf: 'center',
              }}>+{stream.cohosts.length}</span>
            </div>
          )}

          {/* Tips indicator */}
          {stream.tips > 20 && (
            <div style={{
              position: 'absolute', top: 38, left: 10,
              padding: '2px 6px', borderRadius: 6,
              background: `${T.gold}20`, backdropFilter: 'blur(8px)',
            }}>
              <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono'), fontWeight: 600 }}>⏣ {stream.tips} HRS tipped</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: T.card, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18, flexShrink: 0,
              border: `2px solid ${T.border}`,
            }}>{stream.host.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f(),
                lineHeight: 1.3, marginBottom: 3,
                overflow: 'hidden', textOverflow: 'ellipsis',
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>{stream.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{stream.host.name}</span>
                {stream.host.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {stream.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontSize: 10, color: T.primary, fontFamily: f(), fontWeight: 500,
                background: `${T.primary}08`, padding: '2px 6px', borderRadius: 6,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ═══ BROWSE VIEW ═══
  const BrowseView = () => (
    <div style={{ maxWidth: 520, margin: '0 auto', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 20, fontWeight: 900, fontFamily: f(),
              background: `linear-gradient(135deg, ${T.red}, ${T.orange})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>LIVE</span>
            <div style={{
              width: 8, height: 8, borderRadius: '50%', background: T.red,
              animation: 'pulse 1.5s infinite',
            }} />
            <span style={{ fontSize: 11, color: T.sub, fontFamily: f('mono') }}>
              {liveStreams.length} streaming now
            </span>
          </div>
          <button onClick={() => setShowGoLive(true)} style={{
            padding: '8px 16px', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${T.red}, ${T.orange})`,
            fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: f(),
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
            Go Live
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '0 16px', borderTop: `1px solid ${T.border}` }}>
          {[
            { id: 'live', label: 'Live Now', count: liveStreams.length },
            { id: 'upcoming', label: 'Upcoming', count: upcomingStreams.length },
            { id: 'replays', label: 'Replays' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: '10px 0', border: 'none', background: 'none',
              fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? T.text : T.dim,
              borderBottom: `2px solid ${activeTab === tab.id ? T.red : 'transparent'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
            }}>
              {tab.label}
              {tab.count && (
                <span style={{
                  fontSize: 9, fontFamily: f('mono'), fontWeight: 600,
                  background: activeTab === tab.id ? `${T.red}20` : `${T.dim}20`,
                  color: activeTab === tab.id ? T.red : T.dim,
                  padding: '1px 5px', borderRadius: 6,
                }}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'live' && (
        <>
          {/* Categories */}
          <div style={{
            display: 'flex', gap: 6, padding: '12px 16px',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '6px 12px', borderRadius: 10, border: 'none', whiteSpace: 'nowrap',
                background: activeCategory === cat.id ? `${cat.color}20` : T.surface,
                border: `1px solid ${activeCategory === cat.id ? `${cat.color}40` : T.border}`,
                fontSize: 11, fontWeight: 600, fontFamily: f(),
                color: activeCategory === cat.id ? cat.color : T.sub,
                display: 'flex', alignItems: 'center', gap: 4,
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 12 }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured stream */}
          {activeCategory === 'all' && (
            <div style={{ padding: '0 16px 10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
                <span style={{ fontSize: 12 }}>⭐</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase' }}>Featured</span>
              </div>
              <StreamCard stream={liveStreams.find(s => s.id === 'l5')} index={0} size="large" />
            </div>
          )}

          {/* Stream grid */}
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 100 }}>
            {activeCategory === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                <span style={{ fontSize: 12 }}>📡</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase' }}>All Live</span>
              </div>
            )}
            {filteredStreams.map((stream, i) => (
              <StreamCard key={stream.id} stream={stream} index={i + 1} />
            ))}

            {filteredStreams.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📡</div>
                <div style={{ fontSize: 13, color: T.sub, fontFamily: f() }}>No streams in this category right now</div>
                <button onClick={() => setShowGoLive(true)} style={{
                  marginTop: 12, padding: '8px 20px', borderRadius: 10, border: 'none',
                  background: T.red, fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: f(),
                }}>Be the first — Go Live</button>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'upcoming' && (
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 100 }}>
          {upcomingStreams.map((stream, i) => (
            <div key={stream.id} style={{
              padding: 14, borderRadius: 16, background: T.surface,
              border: `1px solid ${T.border}`, display: 'flex', gap: 12,
              animation: `slideUp 0.3s ease ${i * 0.06}s both`,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: T.card,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
              }}>{stream.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 2 }}>{stream.title}</div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{stream.host}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: T.primary, fontFamily: f('mono') }}>🕐 {stream.time}</span>
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>👥 {stream.attendees} interested</span>
                </div>
              </div>
              <button style={{
                padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.primary}40`,
                background: `${T.primary}10`, fontSize: 10, fontWeight: 600,
                color: T.primary, fontFamily: f(), alignSelf: 'center',
              }}>Remind me</button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'replays' && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📼</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.sub, fontFamily: f() }}>Replays coming soon</div>
          <div style={{ fontSize: 11, color: T.dim, fontFamily: f(), marginTop: 4 }}>Every live stream gets auto-saved for replay</div>
        </div>
      )}
    </div>
  );

  // ═══ WATCHING VIEW ═══
  const WatchingView = () => {
    if (!selectedStream) return null;
    const moodStyle = getMoodStyle(selectedStream.mood);

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Video Area */}
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16/9',
          background: selectedStream.thumbnail,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{ fontSize: 72, opacity: 0.15 }}>{selectedStream.thumbnailIcon}</span>

          {/* Ambient waveform for audio/chill streams */}
          {(selectedStream.mood === 'chill' || selectedStream.mood === 'ambient' || selectedStream.mood === 'creative') && (
            <div style={{
              position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: 3, alignItems: 'flex-end',
            }}>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{
                  width: 3, borderRadius: 2,
                  background: `${moodStyle.border}60`,
                  animation: `waveform ${0.8 + Math.random() * 0.8}s ease-in-out ${Math.random() * 0.5}s infinite`,
                }} />
              ))}
            </div>
          )}

          {/* Pomodoro timer for coworking */}
          {selectedStream.special === 'pomodoro' && (
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#fff', fontFamily: f('mono'), opacity: 0.8, animation: 'breathe 4s infinite' }}>
                24:37
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: f(), marginTop: 4 }}>Focus Session — 25 min</div>
            </div>
          )}

          {/* Top overlay */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '10px 12px', display: 'flex', justifyContent: 'space-between',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          }}>
            <button onClick={() => { setView('browse'); setSelectedStream(null); }} style={{
              width: 32, height: 32, borderRadius: 10, border: 'none',
              background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: '#fff',
            }}>←</button>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{
                padding: '4px 10px', borderRadius: 8, background: T.red,
                display: 'flex', alignItems: 'center', gap: 5,
                animation: 'livePulse 2s infinite',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f('mono') }}>LIVE</span>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: 8,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 10 }}>👁️</span>
                <span style={{ fontSize: 10, color: '#fff', fontFamily: f('mono'), fontWeight: 600 }}>{viewerCount}</span>
              </div>
              <div style={{
                padding: '4px 8px', borderRadius: 8,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
              }}>
                <span style={{ fontSize: 10, color: '#fff', fontFamily: f('mono') }}>{formatTime(elapsed)}</span>
              </div>
            </div>
          </div>

          {/* Floating reactions */}
          {reactions.map(r => (
            <div key={r.id} style={{
              position: 'absolute', bottom: 10, left: `${r.x}%`,
              fontSize: 24, animation: 'reactionFloat 2s ease-out forwards',
              pointerEvents: 'none',
            }}>{r.emoji}</div>
          ))}
        </div>

        {/* Stream Info Bar */}
        <div style={{
          padding: '12px 14px', background: T.surface,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, background: T.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, flexShrink: 0, border: `2px solid ${T.border}`,
            }}>{selectedStream.host.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{selectedStream.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <span style={{ fontSize: 12, color: T.sub, fontFamily: f() }}>{selectedStream.host.name}</span>
                {selectedStream.host.verified && <span style={{ fontSize: 9, color: T.primary }}>✓</span>}
                <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>· {selectedStream.host.followers}</span>
              </div>
            </div>
            <button onClick={() => setIsFollowing(!isFollowing)} style={{
              padding: '6px 14px', borderRadius: 10,
              border: `1px solid ${isFollowing ? T.border : T.primary}`,
              background: isFollowing ? T.card : `${T.primary}15`,
              fontSize: 11, fontWeight: 600,
              color: isFollowing ? T.sub : T.primary, fontFamily: f(),
            }}>{isFollowing ? 'Following' : 'Follow'}</button>
          </div>

          {/* Mood + Tags */}
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{
              padding: '2px 8px', borderRadius: 6, fontSize: 9, fontWeight: 600,
              color: moodStyle.border, background: moodStyle.bg,
              border: `1px solid ${moodStyle.border}20`, fontFamily: f(),
            }}>{moodStyle.label}</span>
            {selectedStream.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 10, color: T.primary, fontFamily: f(),
                background: `${T.primary}08`, padding: '2px 6px', borderRadius: 6,
              }}>{tag}</span>
            ))}
          </div>

          {/* Co-hosts */}
          {selectedStream.cohosts.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>Co-hosting:</span>
              {selectedStream.cohosts.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 14 }}>{c.avatar}</span>
                  <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{c.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: T.bg }}>
          {/* Chat header */}
          <div style={{
            padding: '8px 14px', borderBottom: `1px solid ${T.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Live Chat</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setShowViewers(!showViewers)} style={{
                padding: '3px 8px', borderRadius: 6, border: `1px solid ${T.border}`,
                background: T.surface, fontSize: 10, color: T.sub, fontFamily: f(),
              }}>👥 {viewerCount}</button>
              {selectedStream.tips > 0 && (
                <span style={{
                  padding: '3px 8px', borderRadius: 6,
                  background: `${T.gold}10`, border: `1px solid ${T.gold}20`,
                  fontSize: 10, color: T.gold, fontFamily: f('mono'), fontWeight: 600,
                }}>⏣ {selectedStream.tips} tipped</span>
              )}
            </div>
          </div>

          {/* Pinned message */}
          {selectedStream.mood === 'silent' && (
            <div style={{
              margin: '8px 14px 0', padding: '8px 10px', borderRadius: 10,
              background: `${T.gold}08`, border: `1px solid ${T.gold}15`,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ fontSize: 11 }}>📌</span>
              <span style={{ fontSize: 10, color: T.gold, fontFamily: f() }}>Silent room — chat for emergencies only. Enjoy the focus. 🤫</span>
            </div>
          )}

          {/* Chat messages */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: '8px 14px',
            display: 'flex', flexDirection: 'column', gap: 4,
            maxHeight: 300,
          }}>
            {chatMessages.map((msg, i) => (
              <div key={msg.id} style={{
                display: 'flex', gap: 8, padding: '4px 0',
                animation: `slideUp 0.2s ease`,
                ...(msg.type === 'tip' ? {
                  background: `${T.gold}08`, borderRadius: 8, padding: '6px 8px',
                  border: `1px solid ${T.gold}15`,
                } : {}),
                ...(msg.type === 'milestone' ? {
                  background: `${T.primary}08`, borderRadius: 8, padding: '6px 8px',
                  border: `1px solid ${T.primary}15`,
                } : {}),
                ...(msg.type === 'system' ? { justifyContent: 'center' } : {}),
              }}>
                {msg.type === 'system' ? (
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: f(), fontStyle: 'italic' }}>
                    {msg.text}
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>{msg.avatar}</span>
                    <div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, fontFamily: f(),
                        color: msg.type === 'tip' ? T.gold : T.sub,
                        marginRight: 6,
                      }}>
                        {msg.user}
                        {msg.verified && <span style={{ fontSize: 8, color: T.primary, marginLeft: 3 }}>✓</span>}
                      </span>
                      <span style={{
                        fontSize: 12, color: msg.type === 'tip' ? T.gold : msg.type === 'reaction' ? T.text : T.text,
                        fontFamily: f(),
                        ...(msg.type === 'tip' ? { fontWeight: 600 } : {}),
                      }}>{msg.text}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Reaction bar */}
          <div style={{
            padding: '6px 14px', display: 'flex', gap: 6, justifyContent: 'center',
            borderTop: `1px solid ${T.border}`,
          }}>
            {['❤️', '🔥', '👏', '😍', '🤯', '💡', '😂', '🙌'].map(emoji => (
              <button key={emoji} onClick={() => sendReaction(emoji)} style={{
                width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`,
                background: T.surface, fontSize: 16, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.1s',
              }}>{emoji}</button>
            ))}
          </div>

          {/* Chat input */}
          <div style={{
            padding: '8px 14px 12px', display: 'flex', gap: 8,
            borderTop: `1px solid ${T.border}`,
          }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendChat()}
              placeholder={selectedStream.mood === 'silent' ? 'Silent room...' : 'Say something...'}
              disabled={selectedStream.mood === 'silent'}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 12,
                background: T.surface, border: `1px solid ${T.border}`,
                fontSize: 13, color: T.text, fontFamily: f(),
                outline: 'none', opacity: selectedStream.mood === 'silent' ? 0.4 : 1,
              }}
            />
            <button onClick={() => setShowTipSheet(true)} style={{
              width: 40, height: 40, borderRadius: 12, border: 'none',
              background: `${T.gold}15`, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>⏣</button>
            <button onClick={() => setHasRaisedHand(!hasRaisedHand)} style={{
              width: 40, height: 40, borderRadius: 12, border: 'none',
              background: hasRaisedHand ? `${T.orange}20` : T.surface,
              border: `1px solid ${hasRaisedHand ? T.orange + '40' : T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>✋</button>
          </div>
        </div>

        {/* Tip Sheet */}
        {showTipSheet && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={() => setShowTipSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
            <div style={{
              position: 'relative', width: '100%', maxWidth: 440,
              background: T.surface, borderRadius: '20px 20px 0 0',
              border: `1px solid ${T.border}`, padding: 20,
              animation: 'slideUp 0.3s ease',
            }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>⏣</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), marginTop: 4 }}>
                  Tip {selectedStream.host.name}
                </div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>Support this stream directly*</div>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                {[1, 5, 10, 25, 50].map(amt => (
                  <button key={amt} onClick={() => setTipAmount(amt)} style={{
                    padding: '10px 14px', borderRadius: 12,
                    background: tipAmount === amt ? T.gold : T.card,
                    border: `1px solid ${tipAmount === amt ? T.gold : T.border}`,
                    color: tipAmount === amt ? T.bg : T.text,
                    fontSize: 13, fontWeight: 700, fontFamily: f('mono'),
                  }}>{amt}</button>
                ))}
              </div>
              <button onClick={() => {
                setShowTipSheet(false);
                setChatMessages(prev => [...prev, {
                  id: Date.now(), user: 'System', avatar: '⏣',
                  text: `You tipped ${tipAmount || 1} HOURS! ✨`, time: 'now', type: 'tip',
                }]);
                setTipAmount(null);
              }} style={{
                width: '100%', padding: 14, borderRadius: 14, border: 'none',
                background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
                fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f(),
              }}>Send {tipAmount || 1} HOURS</button>
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are not currency. See Terms.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ═══ GO LIVE SHEET ═══
  const GoLiveSheet = () => showGoLive && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowGoLive(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, padding: 20,
        maxHeight: '85vh', overflowY: 'auto',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setShowGoLive(false)} style={{
            background: 'none', border: 'none', fontSize: 13, color: T.dim, fontFamily: f(),
          }}>Cancel</button>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>Go Live</span>
          <div style={{ width: 50 }} />
        </div>

        {/* Camera preview */}
        <div style={{
          width: '100%', aspectRatio: '16/9', borderRadius: 16,
          background: 'linear-gradient(135deg, #0a0f1a, #111827)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 16, overflow: 'hidden', border: `1px solid ${T.border}`,
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 36, opacity: 0.3 }}>📹</span>
            <div style={{ fontSize: 11, color: T.dim, fontFamily: f(), marginTop: 4 }}>Camera preview</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Stream Title</label>
          <input
            value={liveTitle}
            onChange={(e) => setLiveTitle(e.target.value)}
            placeholder="What are you doing today?"
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12,
              background: T.card, border: `1px solid ${T.border}`,
              fontSize: 14, color: T.text, fontFamily: f(), outline: 'none',
            }}
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Category</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.filter(c => c.id !== 'all').map(cat => (
              <button key={cat.id} onClick={() => setLiveCategory(cat.id)} style={{
                padding: '6px 12px', borderRadius: 10,
                background: liveCategory === cat.id ? `${cat.color}20` : T.card,
                border: `1px solid ${liveCategory === cat.id ? `${cat.color}40` : T.border}`,
                fontSize: 11, fontWeight: 600, fontFamily: f(),
                color: liveCategory === cat.id ? cat.color : T.sub,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 12 }}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description (optional)</label>
          <textarea
            value={liveDescription}
            onChange={(e) => setLiveDescription(e.target.value)}
            placeholder="Tell viewers what to expect..."
            rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 12,
              background: T.card, border: `1px solid ${T.border}`,
              fontSize: 13, color: T.text, fontFamily: f(), outline: 'none',
            }}
          />
        </div>

        {/* Settings */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Settings</label>
          {[
            { key: 'camera', label: 'Camera', icon: '📹', desc: 'Show your face' },
            { key: 'screen', label: 'Screen Share', icon: '🖥️', desc: 'Share your screen' },
            { key: 'chat', label: 'Live Chat', icon: '💬', desc: 'Allow viewer chat' },
            { key: 'tips', label: 'Accept Tips', icon: '⏣', desc: 'Let viewers tip HOURS' },
            { key: 'cohost', label: 'Co-hosting', icon: '👥', desc: 'Allow others to join' },
          ].map(setting => (
            <div key={setting.key} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{setting.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{setting.label}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{setting.desc}</div>
              </div>
              <button onClick={() => setLiveSettings(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))} style={{
                width: 44, height: 24, borderRadius: 12, border: 'none',
                background: liveSettings[setting.key] ? T.accent : T.card,
                position: 'relative', transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: 3,
                  left: liveSettings[setting.key] ? 23 : 3,
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Go Live button */}
        <button style={{
          width: '100%', padding: 16, borderRadius: 14, border: 'none',
          background: liveTitle.length > 0 ? `linear-gradient(135deg, ${T.red}, ${T.orange})` : T.card,
          fontSize: 15, fontWeight: 800, color: liveTitle.length > 0 ? '#fff' : T.dim,
          fontFamily: f(), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'all 0.2s', opacity: liveTitle.length > 0 ? 1 : 0.5,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: liveTitle.length > 0 ? '#fff' : T.dim }} />
          Go Live Now
        </button>

        {/* Earnings note */}
        <div style={{
          marginTop: 10, padding: '8px 10px', borderRadius: 10,
          background: `${T.gold}08`, border: `1px solid ${T.gold}15`,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 12 }}>⏣</span>
          <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>Earn HOURS from viewers + tips while streaming*</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS earning targets are illustrative, not guaranteed. HOURS are not currency. See Terms.</span>
        </div>
      </div>
    </div>
  );

  // ═══ MAIN RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <style>{globalStyles}</style>

      {view === 'browse' && <BrowseView />}
      {view === 'watching' && <WatchingView />}
      <GoLiveSheet />
    </div>
  );
};

export default OursLive;
