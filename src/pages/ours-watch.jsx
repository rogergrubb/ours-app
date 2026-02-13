import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — WATCH ZONE
// "The video world that pays everyone."
//
// For VIEWERS: Shorts, Long-form, Series, Live, Premieres, Theater Mode
// For CREATORS: Storefront, Analytics, Revenue Dashboard, Upload Studio
//
// TikTok's dopamine + YouTube's depth + Netflix's polish + OURS ownership
// ═══════════════════════════════════════════════════════════════════════════

const OursWatch = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('foryou');
  const [mounted, setMounted] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [following, setFollowing] = useState({ '@mayachen': true });
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showTipSheet, setShowTipSheet] = useState(false);
  const [tipAmount, setTipAmount] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [currentShort, setCurrentShort] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [channelTab, setChannelTab] = useState('videos');
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (view === 'player' && isPlaying) {
      const interval = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.5), 200);
      return () => clearInterval(interval);
    }
  }, [view, isPlaying]);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    lime: '#84cc16', teal: '#2dd4bf', rose: '#fb7185', indigo: '#818cf8',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    watch: '#ef4444',
  };

  const f = (family = 'body') => ({
    body: "'Outfit', sans-serif",
    mono: "'DM Mono', monospace",
    display: "'Playfair Display', serif",
  }[family]);

  // ═══ CREATORS / CHANNELS ═══
  const channels = {
    '@mayachen': {
      name: 'Maya Chen', avatar: '🎨', verified: true, handle: '@mayachen',
      subscribers: '45.2K', totalViews: '2.8M', videos: 142, joined: 'Nov 2025',
      bio: 'Digital artist building in public. Speed paints, tutorials, and creative chaos. 95% of my revenue stays with me.',
      banner: 'linear-gradient(135deg, #1a0a2e, #2d1654, #0f0a1f)',
      zone: 'Watch', tier: '⚡ Builder', hours: '12,450',
      monthlyEarnings: '2,340', topVideo: '890K views',
      tags: ['#art', '#speedpaint', '#digital', '#tutorial'],
      storefront: {
        products: [
          { name: 'Procreate Brush Pack v3', price: '15 HRS', sales: 1240, icon: '🖌️', rating: 4.9 },
          { name: 'Neon City Wallpaper Pack', price: '5 HRS', sales: 3400, icon: '🌃', rating: 4.8 },
          { name: '1-on-1 Art Critique (30min)', price: '50 HRS', sales: 89, icon: '🎓', rating: 5.0 },
          { name: 'Speed Paint Source Files', price: '25 HRS', sales: 456, icon: '📁', rating: 4.7 },
        ],
        membershipTiers: [
          { name: 'Supporter', price: '10 HRS/mo', perks: ['Early access to videos', 'Members-only chat badge'], members: 890 },
          { name: 'Inner Circle', price: '50 HRS/mo', perks: ['Everything in Supporter', 'Monthly live Q&A', 'Source file access', 'Name in video credits'], members: 124 },
        ],
      },
    },
    '@jordanblake': {
      name: 'Jordan Blake', avatar: '💡', verified: false, handle: '@jordanblake',
      subscribers: '12.3K', totalViews: '450K', videos: 38, joined: 'Jan 2026',
      bio: "Raw takes on creator economy, quitting corporate, building something that matters. No scripts, no edits, just truth.",
      banner: 'linear-gradient(135deg, #1a1205, #2a1f0a, #1a1205)',
      zone: 'Watch', tier: '🔥 Creator', hours: '3,200',
      monthlyEarnings: '780', topVideo: '534K views',
      tags: ['#honesty', '#career', '#buildinpublic'],
      storefront: {
        products: [
          { name: 'Quit Your Job Workbook (PDF)', price: '10 HRS', sales: 890, icon: '📖', rating: 4.8 },
          { name: 'Career Pivot Call (45min)', price: '75 HRS', sales: 34, icon: '📞', rating: 5.0 },
        ],
        membershipTiers: [
          { name: 'Real Ones', price: '5 HRS/mo', perks: ['Uncut extended videos', 'Weekly voice note update'], members: 340 },
        ],
      },
    },
    '@codestream': {
      name: 'Code Stream', avatar: '⚡', verified: true, handle: '@codestream',
      subscribers: '67.8K', totalViews: '5.1M', videos: 234, joined: 'Oct 2025',
      bio: 'Learn to code by watching someone code. Live builds, tutorials, and the occasional disaster. 100% real, 0% scripted.',
      banner: 'linear-gradient(135deg, #0a1222, #162544, #0a1832)',
      zone: 'Watch', tier: '🏗️ Architect', hours: '34,500',
      monthlyEarnings: '8,900', topVideo: '1.2M views',
      tags: ['#coding', '#react', '#tutorial', '#live'],
      storefront: {
        products: [
          { name: 'React Masterclass (12hr course)', price: '100 HRS', sales: 2300, icon: '⚛️', rating: 4.9 },
          { name: 'VS Code Theme Pack', price: '3 HRS', sales: 8900, icon: '🎨', rating: 4.7 },
          { name: 'Code Review Session (1hr)', price: '150 HRS', sales: 67, icon: '🔍', rating: 5.0 },
          { name: 'Starter Template Bundle', price: '20 HRS', sales: 4500, icon: '📦', rating: 4.8 },
          { name: 'API Cheat Sheet Collection', price: '8 HRS', sales: 6700, icon: '📋', rating: 4.6 },
        ],
        membershipTiers: [
          { name: 'Student', price: '15 HRS/mo', perks: ['Source code access', 'Discord channel', 'Early video access'], members: 2100 },
          { name: 'Pro Dev', price: '75 HRS/mo', perks: ['Everything in Student', 'Monthly 1-on-1', 'Private repo access', 'Job referral network'], members: 340 },
        ],
      },
    },
    '@cheapeats': {
      name: 'Cheap Eats', avatar: '🍕', verified: false, handle: '@cheapeats',
      subscribers: '28.4K', totalViews: '1.1M', videos: 87, joined: 'Dec 2025',
      bio: 'Budget meals that actually taste good. College student energy, Michelin ambition.',
      banner: 'linear-gradient(135deg, #1a1005, #2e2a0a, #1a1005)',
      zone: 'Watch', tier: '🔥 Creator', hours: '4,100',
      monthlyEarnings: '1,200', topVideo: '456K views',
      tags: ['#food', '#budget', '#cooking'],
      storefront: { products: [], membershipTiers: [] },
    },
    '@jadekim': {
      name: 'Jade Kim', avatar: '📸', verified: true, handle: '@jadekim',
      subscribers: '23.4K', totalViews: '890K', videos: 62, joined: 'Nov 2025',
      bio: 'Photographer chasing light around the world. Timelapses, city walks, and quiet moments.',
      banner: 'linear-gradient(135deg, #1a0a05, #2e1a0f, #4a2a15)',
      zone: 'Watch', tier: '🔥 Creator', hours: '5,800',
      monthlyEarnings: '1,650', topVideo: '678K views',
      tags: ['#photography', '#timelapse', '#travel', '#ambient'],
      storefront: {
        products: [
          { name: 'Lightroom Preset Pack — "Golden"', price: '12 HRS', sales: 2100, icon: '✨', rating: 4.9 },
          { name: '4K Wallpaper Collection (50 images)', price: '8 HRS', sales: 3800, icon: '🖼️', rating: 4.8 },
        ],
        membershipTiers: [],
      },
    },
    '@drsarahliu': {
      name: 'Dr. Sarah Liu', avatar: '🧠', verified: true, handle: '@drsarahliu',
      subscribers: '23.4K', totalViews: '560K', videos: 45, joined: 'Dec 2025',
      bio: 'PhD researcher making complex ideas simple. Platform economics, web3, and why ownership matters.',
      banner: 'linear-gradient(135deg, #051a14, #0a2e24, #051a14)',
      zone: 'Watch', tier: '⚡ Builder', hours: '8,200',
      monthlyEarnings: '2,100', topVideo: '256K views',
      tags: ['#education', '#web3', '#explainer'],
      storefront: {
        products: [
          { name: 'Platform Economics 101 (course)', price: '60 HRS', sales: 890, icon: '📚', rating: 4.9 },
        ],
        membershipTiers: [],
      },
    },
  };

  // ═══ VIDEO DATA ═══
  const videos = [
    { id: 's1', type: 'short', title: 'CSS trick that will blow your mind 🤯', channel: '@codestream',
      duration: '0:42', views: '892K', likes: 45200, comments: 1230, shares: 3400,
      thumb: 'linear-gradient(135deg, #0a1832, #1a2e4e)', thumbIcon: '💻',
      earnings: 124.5, description: "One line of CSS. That's it. That's the video. #css #webdev #coding",
      tags: ['#css', '#webdev', '#coding'], trending: true, posted: '2h ago' },
    { id: 's2', type: 'short', title: 'Speed paint: neon city in 45 seconds', channel: '@mayachen',
      duration: '0:45', views: '234K', likes: 18900, comments: 890, shares: 2100,
      thumb: 'linear-gradient(135deg, #1a0a3a, #2e1a5e)', thumbIcon: '🎨',
      earnings: 67.0, description: 'Procreate + 3 layers + vibes. Full tutorial on my channel.',
      tags: ['#art', '#speedpaint', '#neon'], posted: '4h ago' },
    { id: 's3', type: 'short', title: "I made $2,340 last month on OURS. Here's proof.", channel: '@mayachen',
      duration: '0:58', views: '1.2M', likes: 89000, comments: 5600, shares: 12000,
      thumb: 'linear-gradient(135deg, #0a1a0f, #1a2e1f)', thumbIcon: '💰',
      earnings: 340.0, description: 'Real numbers. Real dashboard. Real money. Not a flex — a proof of concept.',
      tags: ['#earnings', '#proof', '#creator'], trending: true, posted: '1d ago' },
    { id: 's4', type: 'short', title: '3 meals under $5 each 🍳', channel: '@cheapeats',
      duration: '0:52', views: '456K', likes: 34000, comments: 2300, shares: 8900,
      thumb: 'linear-gradient(135deg, #1a1005, #2e2a0a)', thumbIcon: '🍳',
      earnings: 89.0, description: 'Grocery haul + 3 recipes + real costs.',
      tags: ['#food', '#budget', '#cooking'], posted: '6h ago' },
    { id: 's5', type: 'short', title: 'Sunset timelapse — Tokyo rooftop 🌅', channel: '@jadekim',
      duration: '0:38', views: '678K', likes: 52000, comments: 890, shares: 4500,
      thumb: 'linear-gradient(135deg, #1a0a05, #2e1a0f, #4a2a15)', thumbIcon: '🌅',
      earnings: 156.0, description: 'No words needed. Just 38 seconds of peace.',
      tags: ['#sunset', '#tokyo', '#ambient'], posted: '8h ago' },

    { id: 'l1', type: 'long', title: "I quit my 6-figure job. Here's what happened next.", channel: '@jordanblake',
      duration: '18:42', views: '534K', likes: 42000, comments: 3800, shares: 8900,
      thumb: 'linear-gradient(135deg, #1a1205, #2a1f0a)', thumbIcon: '💡',
      earnings: 890.0, description: "Month 3 update. The bank account, the mental health, the regrets, the wins. Everything.",
      tags: ['#career', '#honesty', '#buildinpublic'], trending: true, posted: '2d ago',
      chapters: [
        { time: '0:00', title: 'The decision' }, { time: '3:24', title: 'Month 1: Pure terror' },
        { time: '7:15', title: 'Month 2: Finding rhythm' }, { time: '11:30', title: 'Month 3: The numbers' },
        { time: '15:00', title: 'Would I do it again?' },
      ]},
    { id: 'l2', type: 'long', title: 'Building a complete app in 2 hours — React + OURS API', channel: '@codestream',
      duration: '2:04:15', views: '89K', likes: 7800, comments: 1200, shares: 2300,
      thumb: 'linear-gradient(135deg, #0a1832, #162544)', thumbIcon: '⚡',
      earnings: 450.0, description: "No cuts. No edits. Just me, VS Code, and 2 hours.",
      tags: ['#coding', '#react', '#tutorial', '#buildinpublic'], posted: '3d ago',
      chapters: [
        { time: '0:00', title: 'Project setup' }, { time: '12:30', title: 'API integration' },
        { time: '45:00', title: 'UI components' }, { time: '1:20:00', title: 'Data visualization' },
        { time: '1:50:00', title: 'Deploy to Vercel' },
      ]},
    { id: 'l3', type: 'long', title: 'The Ownership Effect — a documentary', channel: '@mayachen',
      duration: '34:18', views: '1.2M', likes: 98000, comments: 8900, shares: 23000,
      thumb: 'linear-gradient(135deg, #0a0520, #1a0a3a)', thumbIcon: '🎬',
      earnings: 2100.0, description: "What happens when creators actually own the platform they create on? We followed 12 OURS creators for 90 days.",
      tags: ['#documentary', '#ownership', '#creators'], trending: true, posted: '1w ago',
      chapters: [
        { time: '0:00', title: 'Introduction' }, { time: '4:30', title: 'The old model' },
        { time: '10:15', title: 'Meet the creators' }, { time: '18:00', title: '90 days later' },
        { time: '28:00', title: 'The numbers' }, { time: '32:00', title: 'What comes next' },
      ]},
    { id: 'l4', type: 'long', title: 'Web3 for normal humans — the 20-minute version', channel: '@drsarahliu',
      duration: '21:08', views: '256K', likes: 19000, comments: 2100, shares: 5600,
      thumb: 'linear-gradient(135deg, #051a14, #0a2e24)', thumbIcon: '🧠',
      earnings: 560.0, description: "No jargon. No hype. Just a PhD researcher explaining platform ownership in plain English.",
      tags: ['#education', '#web3', '#explainer'], posted: '5d ago' },

    { id: 'se1', type: 'series', title: 'Build From Scratch — Season 2', channel: '@codestream',
      episodes: 12, totalViews: '2.1M', thumb: 'linear-gradient(135deg, #0a1832, #162544)', thumbIcon: '⚡',
      description: '12 episodes. 12 complete apps. Zero to deployed.', latestEpisode: 'E12: The Final Deploy', status: 'Complete' },
    { id: 'se2', type: 'series', title: 'Quit Your Job Diaries', channel: '@jordanblake',
      episodes: 8, totalViews: '890K', thumb: 'linear-gradient(135deg, #1a1205, #2a1f0a)', thumbIcon: '💡',
      description: 'Real-time documentation of leaving corporate. Updated weekly.', latestEpisode: 'E8: Month 3 Update', status: 'Ongoing' },
    { id: 'se3', type: 'series', title: '10-Minute Masterclass', channel: '@mayachen',
      episodes: 24, totalViews: '3.4M', thumb: 'linear-gradient(135deg, #1a0a2e, #2d1654)', thumbIcon: '🎨',
      description: 'One new digital art technique every episode. 10 minutes. No fluff.', latestEpisode: 'E24: Neon Glow Effects', status: 'Ongoing' },

    { id: 'lv1', type: 'live', title: 'Live coding: Building the OURS notification system', channel: '@codestream',
      viewers: 342, duration: '1h 23m', thumb: 'linear-gradient(135deg, #0a1832, #162544)', thumbIcon: '💻',
      earnings: 23.5, description: "Building in public. Come watch, ask questions, or just vibe.", tags: ['#coding', '#live'] },
    { id: 'lv2', type: 'live', title: 'Painting whatever chat decides 🎨', channel: '@mayachen',
      viewers: 189, duration: '45m', thumb: 'linear-gradient(135deg, #1a0a3a, #2e1a5e)', thumbIcon: '🎨',
      earnings: 45.0, description: "Chat picks the subject. I paint it.", tags: ['#art', '#interactive'] },

    { id: 'p1', type: 'premiere', title: 'OURS Creator Awards 2026', channel: '@oursofficial',
      premiereTime: 'Saturday, 8 PM', interested: 4500,
      thumb: 'linear-gradient(135deg, #1a0a05, #0a1a2e, #1a0a2e)', thumbIcon: '🏆',
      description: 'First ever OURS Creator Awards. Community-voted. Live reactions.' },
  ];

  const shorts = videos.filter(v => v.type === 'short');
  const longform = videos.filter(v => v.type === 'long');
  const seriesList = videos.filter(v => v.type === 'series');
  const liveList = videos.filter(v => v.type === 'live');
  const premieres = videos.filter(v => v.type === 'premiere');

  const fmt = (n) => {
    if (typeof n === 'string') return n;
    if (n >= 1000000) return `${(n/1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n/1000).toFixed(1)}K`;
    return String(n);
  };

  const addHeart = () => {
    const id = Date.now() + Math.random();
    const colors = ['#ef4444','#f472b6','#fbbf24','#a78bfa'];
    setFloatingHearts(p => [...p, { id, x: 60 + Math.random() * 30, color: colors[Math.floor(Math.random()*colors.length)] }]);
    setTimeout(() => setFloatingHearts(p => p.filter(h => h.id !== id)), 1500);
  };

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes livePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } }
    @keyframes heartFloat { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-120px) scale(0.4); opacity: 0; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
    input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.3); }
  `;

  // ═══ REUSABLE: VIDEO CARD ═══
  const VideoCard = ({ video, index = 0, layout = 'vertical' }) => {
    const ch = channels[video.channel] || { name: video.channel, avatar: '👤', verified: false };
    const isLive = video.type === 'live';
    const isPremiere = video.type === 'premiere';

    const openVideo = () => { setSelectedVideo(video); setView('player'); setProgress(0); setIsPlaying(true); };

    if (layout === 'horizontal') {
      return (
        <div onClick={openVideo} style={{
          display: 'flex', gap: 10, cursor: 'pointer',
          animation: `slideUp 0.3s ease ${index * 0.04}s both`,
        }}>
          <div style={{
            width: 160, height: 90, borderRadius: 12, flexShrink: 0,
            background: video.thumb, position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 28, opacity: 0.3 }}>{video.thumbIcon}</span>
            {isLive && (
              <div style={{ position: 'absolute', top: 6, left: 6, padding: '2px 8px', borderRadius: 6, background: T.red, display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#fff' }} />
                <span style={{ fontSize: 8, fontWeight: 700, color: '#fff', fontFamily: f('mono') }}>LIVE</span>
              </div>
            )}
            {!isLive && !isPremiere && (
              <div style={{ position: 'absolute', bottom: 4, right: 4, padding: '1px 5px', borderRadius: 4, background: 'rgba(0,0,0,0.7)' }}>
                <span style={{ fontSize: 9, color: '#fff', fontFamily: f('mono') }}>{video.duration}</span>
              </div>
            )}
            {video.trending && (
              <div style={{ position: 'absolute', top: 6, right: 6, padding: '1px 5px', borderRadius: 4, background: `${T.orange}20` }}>
                <span style={{ fontSize: 8, color: T.orange, fontFamily: f('mono'), fontWeight: 700 }}>🔥</span>
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 4,
              overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            }}>{video.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
              <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{ch.name}</span>
              {ch.verified && <span style={{ fontSize: 7, color: T.primary }}>✓</span>}
            </div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>
              {isLive ? `${video.viewers} watching` : `${video.views} views · ${video.posted}`}
            </div>
            {video.earnings > 0 && (
              <div style={{ fontSize: 9, color: T.gold, fontFamily: f('mono'), marginTop: 2 }}>⏣ {video.earnings} HRS earned*</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div onClick={openVideo} style={{
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        background: T.surface, border: `1px solid ${T.border}`,
        animation: `slideUp 0.3s ease ${index * 0.05}s both`,
      }}>
        <div style={{
          width: '100%', aspectRatio: '16/9', background: video.thumb,
          position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 36, opacity: 0.2 }}>{video.thumbIcon}</span>
          {isLive && (
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 8, background: T.red, display: 'flex', alignItems: 'center', gap: 4, animation: 'livePulse 2s infinite' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
              <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: f('mono') }}>LIVE · {video.viewers}</span>
            </div>
          )}
          {isPremiere && (
            <div style={{ position: 'absolute', top: 8, left: 8, padding: '3px 10px', borderRadius: 8, background: T.purple }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: f('mono') }}>🎬 PREMIERE · {video.premiereTime}</span>
            </div>
          )}
          {!isLive && !isPremiere && (
            <div style={{ position: 'absolute', bottom: 6, right: 6, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.75)' }}>
              <span style={{ fontSize: 9, color: '#fff', fontFamily: f('mono') }}>{video.duration}</span>
            </div>
          )}
        </div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            }}>{ch.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 2,
                overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              }}>{video.title}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>
                {ch.name} {ch.verified ? '✓' : ''} · {isLive ? `${video.viewers} watching` : isPremiere ? `${video.interested} interested` : `${video.views} views`}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══ SERIES CARD ═══
  const SeriesCard = ({ s, index = 0 }) => {
    const ch = channels[s.channel] || {};
    return (
      <div style={{
        minWidth: 220, borderRadius: 14, overflow: 'hidden',
        background: T.surface, border: `1px solid ${T.border}`,
        animation: `slideUp 0.3s ease ${index * 0.06}s both`, cursor: 'pointer',
      }}>
        <div style={{
          width: '100%', height: 100, background: s.thumb,
          display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        }}>
          <span style={{ fontSize: 32, opacity: 0.2 }}>{s.thumbIcon}</span>
          <div style={{ position: 'absolute', bottom: 6, left: 6, padding: '2px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.7)' }}>
            <span style={{ fontSize: 9, color: '#fff', fontFamily: f('mono'), fontWeight: 600 }}>{s.episodes} eps</span>
          </div>
          <div style={{ position: 'absolute', top: 6, right: 6, padding: '2px 6px', borderRadius: 4, background: s.status === 'Ongoing' ? `${T.accent}20` : `${T.primary}20` }}>
            <span style={{ fontSize: 8, color: s.status === 'Ongoing' ? T.accent : T.primary, fontFamily: f('mono'), fontWeight: 700 }}>{s.status}</span>
          </div>
        </div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 2 }}>{s.title}</div>
          <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{ch.name}</div>
          <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 4 }}>{s.totalViews} views · {s.latestEpisode}</div>
        </div>
      </div>
    );
  };

  // ═══ HOME VIEW ═══
  const HomeView = () => (
    <div>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 20, fontWeight: 900, fontFamily: f(),
              background: `linear-gradient(135deg, ${T.watch}, ${T.orange})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Watch</span>
            <span style={{ fontSize: 8, fontWeight: 700, fontFamily: f('mono'), background: `${T.watch}15`, color: T.watch, padding: '2px 6px', borderRadius: 4 }}>2.4K videos</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowUpload(true)} style={{
              padding: '6px 12px', borderRadius: 10, border: 'none',
              background: T.watch, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f(),
              display: 'flex', alignItems: 'center', gap: 4,
            }}>+ Upload</button>
            <button style={{
              width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`,
              background: T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>🔍</button>
          </div>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'foryou', label: 'For You' }, { id: 'following', label: 'Following' },
            { id: 'trending', label: '🔥 Trending' }, { id: 'shorts', label: 'Shorts' },
            { id: 'series', label: 'Series' }, { id: 'live', label: '🔴 Live' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '8px 14px', border: 'none', background: 'none', whiteSpace: 'nowrap',
              fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? T.text : T.dim,
              borderBottom: `2px solid ${activeTab === tab.id ? T.watch : 'transparent'}`,
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px', paddingBottom: 100 }}>
        {/* LIVE NOW */}
        {liveList.length > 0 && (activeTab === 'foryou' || activeTab === 'live') && (
          <div style={{ marginBottom: 16 }}>
            {activeTab === 'foryou' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.red, animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>LIVE NOW</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {liveList.map((v, i) => <div key={v.id} style={{ minWidth: 260 }}><VideoCard video={v} index={i} /></div>)}
            </div>
          </div>
        )}

        {/* PREMIERE */}
        {premieres.length > 0 && activeTab === 'foryou' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 12 }}>🎬</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>UPCOMING</span>
            </div>
            {premieres.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
          </div>
        )}

        {/* SHORTS */}
        {(activeTab === 'foryou' || activeTab === 'shorts') && (
          <div style={{ marginBottom: 16 }}>
            {activeTab === 'foryou' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>⚡ SHORTS</span>
                <button onClick={() => setActiveTab('shorts')} style={{ background: 'none', border: 'none', fontSize: 10, color: T.watch, fontFamily: f(), fontWeight: 600 }}>See all →</button>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: activeTab === 'shorts' ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 8 }}>
              {shorts.slice(0, activeTab === 'shorts' ? shorts.length : 3).map((v, i) => (
                <div key={v.id} onClick={() => { setCurrentShort(i); setView('shorts'); }} style={{
                  borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                  aspectRatio: activeTab === 'shorts' ? '9/14' : '9/16',
                  background: v.thumb, position: 'relative',
                  animation: `slideUp 0.3s ease ${i * 0.06}s both`,
                }}>
                  <span style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 28, opacity: 0.2 }}>{v.thumbIcon}</span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '20px 8px 8px' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f(), lineHeight: 1.2, marginBottom: 3 }}>{v.title}</div>
                    <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', fontFamily: f('mono') }}>{v.views} views</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERIES */}
        {(activeTab === 'foryou' || activeTab === 'series') && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>📺 SERIES</span>
            </div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {seriesList.map((s, i) => <SeriesCard key={s.id} s={s} index={i} />)}
            </div>
          </div>
        )}

        {/* LONG FORM */}
        {(activeTab === 'foryou' || activeTab === 'following' || activeTab === 'trending') && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 12 }}>{activeTab === 'trending' ? '🔥' : '🎬'}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>
                {activeTab === 'trending' ? 'TRENDING' : 'LONG FORM'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(activeTab === 'trending' ? longform.filter(v => v.trending) : longform).map((v, i) => (
                <VideoCard key={v.id} video={v} index={i} layout="horizontal" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ SHORTS (TikTok full-screen) ═══
  const ShortsView = () => {
    const short = shorts[currentShort];
    if (!short) return null;
    const ch = channels[short.channel] || { name: short.channel, avatar: '👤' };
    const isLiked = liked[short.id];

    return (
      <div style={{ position: 'fixed', inset: 0, background: short.thumb, zIndex: 60, display: 'flex', flexDirection: 'column' }}>
        <span style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 80, opacity: 0.1 }}>{short.thumbIcon}</span>

        {floatingHearts.map(h => (
          <div key={h.id} style={{ position: 'absolute', bottom: 200, right: `${100 - h.x}%`, fontSize: 22, color: h.color, animation: 'heartFloat 1.5s ease-out forwards', pointerEvents: 'none', zIndex: 10 }}>❤️</div>
        ))}

        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)', zIndex: 2 }}>
          <button onClick={() => setView('home')} style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(0,0,0,0.3)', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: f() }}>Shorts</span>
          <div style={{ width: 32 }} />
        </div>

        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 80, left: 16, right: 70, zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div onClick={() => { setSelectedChannel(short.channel); setView('channel'); }} style={{
                width: 36, height: 36, borderRadius: 12, background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer',
              }}>{ch.avatar}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f() }}>{ch.name}</span>
                  {ch.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
                </div>
              </div>
              <button onClick={() => setFollowing(p => ({ ...p, [short.channel]: !p[short.channel] }))} style={{
                padding: '4px 12px', borderRadius: 8, border: 'none', marginLeft: 4,
                background: following[short.channel] ? 'rgba(255,255,255,0.15)' : T.watch,
                fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f(),
              }}>{following[short.channel] ? '✓' : 'Follow'}</button>
            </div>
            <div style={{ fontSize: 12, color: '#fff', fontFamily: f(), lineHeight: 1.4, marginBottom: 6 }}>{short.title}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {short.tags?.map(tag => <span key={tag} style={{ fontSize: 10, color: T.primary, fontFamily: f() }}>{tag}</span>)}
            </div>
            {short.earnings > 0 && <div style={{ marginTop: 6, fontSize: 9, color: T.gold, fontFamily: f('mono') }}>⏣ {short.earnings} HRS earned*</div>}
          </div>

          <div style={{ position: 'absolute', bottom: 100, right: 12, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <button onClick={() => { setLiked(p => ({ ...p, [short.id]: !p[short.id] })); addHeart(); }} style={{ background: 'none', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 26, transition: 'transform 0.2s', transform: isLiked ? 'scale(1.2)' : 'scale(1)' }}>{isLiked ? '❤️' : '🤍'}</div>
              <div style={{ fontSize: 10, color: '#fff', fontFamily: f('mono'), marginTop: 2 }}>{fmt(short.likes + (isLiked ? 1 : 0))}</div>
            </button>
            <button style={{ background: 'none', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>💬</div>
              <div style={{ fontSize: 10, color: '#fff', fontFamily: f('mono'), marginTop: 2 }}>{fmt(short.comments)}</div>
            </button>
            <button style={{ background: 'none', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>🔄</div>
              <div style={{ fontSize: 10, color: '#fff', fontFamily: f('mono'), marginTop: 2 }}>{fmt(short.shares)}</div>
            </button>
            <button onClick={() => setShowTipSheet(true)} style={{ background: 'none', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>⏣</div>
              <div style={{ fontSize: 10, color: T.gold, fontFamily: f('mono'), marginTop: 2 }}>Tip</div>
            </button>
            <button onClick={() => setSaved(p => ({ ...p, [short.id]: !p[short.id] }))} style={{ background: 'none', border: 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{saved[short.id] ? '🔖' : '📌'}</div>
            </button>
          </div>
        </div>

        <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'center', gap: 8, background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }}>
          {currentShort > 0 && <button onClick={() => setCurrentShort(p => p - 1)} style={{ padding: '8px 20px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.1)', fontSize: 11, color: '#fff', fontFamily: f() }}>↑ Prev</button>}
          <button onClick={() => setCurrentShort(p => Math.min(p + 1, shorts.length - 1))} style={{ padding: '8px 20px', borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.15)', fontSize: 11, color: '#fff', fontFamily: f() }}>Next ↓</button>
        </div>
      </div>
    );
  };

  // ═══ PLAYER VIEW ═══
  const PlayerView = () => {
    if (!selectedVideo) return null;
    const ch = channels[selectedVideo.channel] || { name: selectedVideo.channel, avatar: '👤', verified: false, subscribers: '—' };
    const isLiked = liked[selectedVideo.id];
    const isSaved = saved[selectedVideo.id];
    const isFollowed = following[selectedVideo.channel];

    const commentsList = [
      { user: 'Luna Nova', avatar: '🌙', text: 'This changed my perspective. Shared with everyone I know.', time: '2h', likes: 142, verified: true },
      { user: 'Dev Patel', avatar: '💻', text: 'Production quality keeps getting better. OURS creators are next level.', time: '3h', likes: 89 },
      { user: 'Nira C.', avatar: '🪡', text: 'Tipped 10 HOURS because this deserves way more visibility.', time: '5h', likes: 67, tip: true },
      { user: 'Alex R.', avatar: '🎬', text: 'Collab? I have a similar series idea.', time: '8h', likes: 34 },
    ];

    return (
      <div style={{ minHeight: '100vh' }}>
        <div style={{
          width: '100%', aspectRatio: '16/9', position: 'relative', background: selectedVideo.thumb,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 56, opacity: 0.15 }}>{selectedVideo.thumbIcon}</span>
          <button onClick={() => setIsPlaying(!isPlaying)} style={{ position: 'absolute', inset: 0, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isPlaying && <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff' }}>▶</div>}
          </button>
          <button onClick={() => { setView('home'); setSelectedVideo(null); }} style={{
            position: 'absolute', top: 10, left: 10, width: 32, height: 32, borderRadius: 10,
            border: 'none', background: 'rgba(0,0,0,0.4)', fontSize: 14, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>←</button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.2)' }}>
            <div style={{ height: '100%', background: T.watch, width: `${progress}%`, transition: 'width 0.2s' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 8, right: 8, padding: '2px 6px', borderRadius: 4, background: 'rgba(0,0,0,0.6)' }}>
            <span style={{ fontSize: 9, color: '#fff', fontFamily: f('mono') }}>{selectedVideo.duration}</span>
          </div>
        </div>

        <div style={{ padding: '12px 16px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 6 }}>{selectedVideo.title}</h2>
          <div style={{ display: 'flex', gap: 12, fontSize: 10, color: T.dim, fontFamily: f('mono'), marginBottom: 10 }}>
            <span>{selectedVideo.views} views</span>
            <span>{selectedVideo.posted}</span>
            {selectedVideo.earnings > 0 && <span style={{ color: T.gold }}>⏣ {selectedVideo.earnings} HRS*</span>}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {[
              { icon: isLiked ? '❤️' : '🤍', label: fmt((selectedVideo.likes||0)+(isLiked?1:0)), active: isLiked, color: T.red, action: () => { setLiked(p=>({...p,[selectedVideo.id]:!isLiked})); if(!isLiked)addHeart(); } },
              { icon: '💬', label: fmt(selectedVideo.comments||0), action: () => {} },
              { icon: '🔄', label: 'Share', action: () => {} },
              { icon: '⏣', label: 'Tip', color: T.gold, action: () => setShowTipSheet(true), gold: true },
              { icon: isSaved ? '🔖' : '📌', label: isSaved ? 'Saved' : 'Save', active: isSaved, color: T.primary, action: () => setSaved(p=>({...p,[selectedVideo.id]:!isSaved})) },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} style={{
                padding: '8px 14px', borderRadius: 10,
                background: btn.gold ? `${T.gold}10` : btn.active ? `${btn.color}15` : T.surface,
                border: `1px solid ${btn.gold ? `${T.gold}25` : btn.active ? `${btn.color}40` : T.border}`,
                fontSize: 11, fontWeight: 600, color: btn.gold ? T.gold : btn.active ? btn.color : T.sub,
                fontFamily: f(), display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
              }}>{btn.icon} {btn.label}</button>
            ))}
          </div>

          {/* Channel bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
            <div onClick={() => { setSelectedChannel(selectedVideo.channel); setView('channel'); }} style={{
              width: 44, height: 44, borderRadius: 14, background: T.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, cursor: 'pointer', border: `2px solid ${T.border}`,
            }}>{ch.avatar}</div>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => { setSelectedChannel(selectedVideo.channel); setView('channel'); }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{ch.name}</span>
                {ch.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              </div>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{ch.subscribers} subscribers</span>
            </div>
            <button onClick={() => setFollowing(p => ({ ...p, [selectedVideo.channel]: !isFollowed }))} style={{
              padding: '8px 16px', borderRadius: 10, border: isFollowed ? `1px solid ${T.border}` : 'none',
              background: isFollowed ? T.card : T.watch, fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: f(),
            }}>{isFollowed ? 'Following' : 'Subscribe'}</button>
          </div>

          {/* Description */}
          <div style={{ padding: 12, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 12 }}>
            <p style={{
              fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5,
              ...(!showMore ? { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' } : {}),
            }}>{selectedVideo.description}</p>
            {selectedVideo.description?.length > 100 && (
              <button onClick={() => setShowMore(!showMore)} style={{ background: 'none', border: 'none', fontSize: 11, color: T.watch, fontFamily: f(), fontWeight: 600, marginTop: 4 }}>{showMore ? 'Less' : 'More'}</button>
            )}
            {selectedVideo.tags && <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>{selectedVideo.tags.map(tag => <span key={tag} style={{ fontSize: 10, color: T.primary, fontFamily: f() }}>{tag}</span>)}</div>}
          </div>

          {/* Chapters */}
          {selectedVideo.chapters && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, marginBottom: 6 }}>CHAPTERS</div>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
                {selectedVideo.chapters.map((c, i) => (
                  <div key={i} style={{ minWidth: 120, padding: '8px 10px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.watch, fontFamily: f('mono'), marginBottom: 2 }}>{c.time}</div>
                    <div style={{ fontSize: 10, color: T.text, fontFamily: f() }}>{c.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, marginBottom: 8 }}>COMMENTS · {fmt(selectedVideo.comments || 0)}</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, padding: '10px 12px', borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
              <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." style={{ flex: 1, background: 'none', border: 'none', fontSize: 12, color: T.text, fontFamily: f(), outline: 'none' }} />
              {commentText && <button style={{ padding: '4px 10px', borderRadius: 8, border: 'none', background: T.watch, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>Post</button>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {commentsList.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, animation: `slideUp 0.2s ease ${i * 0.05}s both` }}>
                  <div style={{ width: 30, height: 30, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{c.avatar}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>{c.user}</span>
                      {c.verified && <span style={{ fontSize: 7, color: T.primary }}>✓</span>}
                      {c.tip && <span style={{ fontSize: 7, color: T.gold, background: `${T.gold}15`, padding: '1px 4px', borderRadius: 3, fontFamily: f('mono') }}>TIPPER</span>}
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginTop: 2 }}>{c.text}</p>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>❤️ {c.likes}</span>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Reply</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Up Next */}
          <div style={{ paddingBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, marginBottom: 8 }}>UP NEXT</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {longform.filter(v => v.id !== selectedVideo.id).slice(0, 4).map((v, i) => <VideoCard key={v.id} video={v} index={i} layout="horizontal" />)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ═══ CHANNEL VIEW (CREATOR STOREFRONT) ═══
  const ChannelView = () => {
    const ch = channels[selectedChannel];
    if (!ch) return null;
    const isFollowed = following[selectedChannel];
    const channelVideos = videos.filter(v => v.channel === selectedChannel && v.type !== 'series');
    const channelSeries = seriesList.filter(s => s.channel === selectedChannel);
    const store = ch.storefront || { products: [], membershipTiers: [] };

    return (
      <div>
        {/* Banner */}
        <div style={{ width: '100%', height: 120, background: ch.banner, position: 'relative' }}>
          <button onClick={() => { setView('home'); setSelectedChannel(null); }} style={{
            position: 'absolute', top: 10, left: 10, width: 32, height: 32, borderRadius: 10,
            border: 'none', background: 'rgba(0,0,0,0.4)', fontSize: 14, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>←</button>
        </div>

        <div style={{ padding: '0 16px', marginTop: -30 }}>
          {/* Profile */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', marginBottom: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 20, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, border: `3px solid ${T.bg}` }}>{ch.avatar}</div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: f() }}>{ch.name}</span>
                {ch.verified && <span style={{ fontSize: 10, color: T.primary }}>✓</span>}
              </div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{ch.handle}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            {[{ l: 'Subscribers', v: ch.subscribers }, { l: 'Videos', v: ch.videos }, { l: 'Views', v: ch.totalViews }].map(s => (
              <div key={s.l}><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{s.v}</div><div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{s.l}</div></div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 10 }}>{ch.bio}</p>

          {/* Creator earnings card */}
          <div style={{ padding: 12, borderRadius: 14, background: `linear-gradient(135deg, ${T.gold}08, ${T.accent}06)`, border: `1px solid ${T.gold}20`, marginBottom: 12 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.gold, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Creator Stats</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ l: 'Tier', v: ch.tier, c: T.primary }, { l: 'HOURS', v: ch.hours, c: T.gold }, { l: 'Monthly*', v: `${ch.monthlyEarnings} HRS`, c: T.accent }].map(s => (
                <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: s.c, fontFamily: f('mono') }}>{s.v}</div>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button onClick={() => setFollowing(p => ({ ...p, [selectedChannel]: !isFollowed }))} style={{
              flex: 1, padding: '10px 0', borderRadius: 12, border: isFollowed ? `1px solid ${T.border}` : 'none',
              background: isFollowed ? T.card : T.watch, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f(),
            }}>{isFollowed ? '✓ Subscribed' : 'Subscribe'}</button>
            <button onClick={() => setShowTipSheet(true)} style={{
              padding: '10px 16px', borderRadius: 12, background: `${T.gold}12`, border: `1px solid ${T.gold}25`,
              fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f(),
            }}>⏣ Tip</button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
            {['videos', 'series', 'store', 'about'].map(tab => (
              <button key={tab} onClick={() => setChannelTab(tab)} style={{
                flex: 1, padding: '10px 0', border: 'none', background: 'none',
                fontFamily: f(), fontSize: 12, fontWeight: channelTab === tab ? 700 : 500,
                color: channelTab === tab ? T.text : T.dim,
                borderBottom: `2px solid ${channelTab === tab ? T.watch : 'transparent'}`,
                textTransform: 'capitalize',
              }}>{tab}</button>
            ))}
          </div>

          {/* Tab Content */}
          {channelTab === 'videos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 40 }}>
              {channelVideos.length > 0 ? channelVideos.map((v, i) => <VideoCard key={v.id} video={v} index={i} layout="horizontal" />) :
              <div style={{ textAlign: 'center', padding: 20, color: T.dim, fontSize: 12, fontFamily: f() }}>No videos yet</div>}
            </div>
          )}

          {channelTab === 'series' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
              {channelSeries.length > 0 ? channelSeries.map((s, i) => <div key={s.id}><SeriesCard s={s} index={i} /></div>) :
              <div style={{ textAlign: 'center', padding: 20, color: T.dim, fontSize: 12, fontFamily: f() }}>No series yet</div>}
            </div>
          )}

          {/* ═══ STORE TAB — THE CREATOR STOREFRONT ═══ */}
          {channelTab === 'store' && (
            <div style={{ paddingBottom: 40 }}>
              {/* Memberships */}
              {store.membershipTiers.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Memberships</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {store.membershipTiers.map((tier, i) => (
                      <div key={i} style={{
                        padding: 14, borderRadius: 14,
                        background: `linear-gradient(135deg, ${T.purple}08, ${T.primary}06)`,
                        border: `1px solid ${T.purple}20`,
                        animation: `slideUp 0.3s ease ${i * 0.06}s both`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f() }}>{tier.name}</div>
                            <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{tier.members} members</div>
                          </div>
                          <div style={{ padding: '4px 12px', borderRadius: 8, background: `${T.purple}15`, border: `1px solid ${T.purple}25` }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: T.purple, fontFamily: f('mono') }}>{tier.price}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          {tier.perks.map((perk, j) => (
                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 9, color: T.accent }}>✓</span>
                              <span style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{perk}</span>
                            </div>
                          ))}
                        </div>
                        <button style={{
                          width: '100%', marginTop: 10, padding: '8px 0', borderRadius: 10,
                          border: 'none', background: T.purple, fontSize: 12, fontWeight: 700,
                          color: '#fff', fontFamily: f(),
                        }}>Join {tier.price}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {store.products.length > 0 && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Products</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {store.products.map((product, i) => (
                      <div key={i} style={{
                        padding: 14, borderRadius: 14, background: T.surface,
                        border: `1px solid ${T.border}`, display: 'flex', gap: 12,
                        animation: `slideUp 0.3s ease ${i * 0.05}s both`,
                      }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 14, background: T.card,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 24, flexShrink: 0,
                        }}>{product.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 2 }}>{product.name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>⭐ {product.rating}</span>
                            <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{fmt(product.sales)} sold</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 4 }}>
                          <div style={{ padding: '3px 10px', borderRadius: 8, background: `${T.gold}12`, border: `1px solid ${T.gold}20` }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>{product.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {store.products.length === 0 && store.membershipTiers.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🏪</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.sub, fontFamily: f() }}>No store items yet</div>
                  <div style={{ fontSize: 11, color: T.dim, fontFamily: f(), marginTop: 4 }}>This creator hasn't set up their storefront.</div>
                </div>
              )}

              <div style={{ marginTop: 12, padding: 10, borderRadius: 10, background: `${T.accent}06`, border: `1px solid ${T.accent}12` }}>
                <span style={{ fontSize: 9, color: T.accent, fontFamily: f('mono') }}>🛡️ All transactions use HOURS. Creator keeps ~95% of every sale. No hidden platform fees.*</span>
              </div>
            </div>
          )}

          {channelTab === 'about' && (
            <div style={{ paddingBottom: 40 }}>
              <div style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1, marginBottom: 6 }}>DETAILS</div>
                {[{ l: 'Joined', v: ch.joined }, { l: 'Zone', v: ch.zone, c: T.watch }, { l: 'Top Video', v: ch.topVideo }].map(d => (
                  <div key={d.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: f(), padding: '4px 0' }}>
                    <span style={{ color: T.dim }}>{d.l}</span><span style={{ color: d.c || T.text }}>{d.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {ch.tags.map(tag => <span key={tag} style={{ fontSize: 10, color: T.primary, fontFamily: f(), background: `${T.primary}08`, padding: '3px 8px', borderRadius: 6 }}>{tag}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══ UPLOAD SHEET ═══
  const UploadSheet = () => showUpload && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowUpload(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setShowUpload(false)} style={{ background: 'none', border: 'none', fontSize: 13, color: T.dim, fontFamily: f() }}>Cancel</button>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>Upload Video</span>
          <div style={{ width: 50 }} />
        </div>

        <div style={{ border: `2px dashed ${T.border}`, borderRadius: 16, padding: '30px 20px', textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎬</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: f(), marginBottom: 4 }}>Tap to select a video</div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>MP4, MOV, WebM · Max 4GB · Up to 4K</div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[{ icon: '⚡', label: 'Short', desc: '< 60s vertical' }, { icon: '🎬', label: 'Long-form', desc: 'Any length' }, { icon: '📡', label: 'Go Live', desc: 'Stream now' }].map(opt => (
            <div key={opt.label} style={{ flex: 1, padding: '12px 8px', borderRadius: 12, textAlign: 'center', background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>{opt.label}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{opt.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 12, borderRadius: 12, background: `${T.gold}08`, border: `1px solid ${T.gold}15` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 14 }}>⏣</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f() }}>Earning Preview</span>
          </div>
          <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>
            Upload: <strong style={{ color: T.gold }}>+2.0 HRS</strong> · Per view: <strong style={{ color: T.gold }}>+0.05 HRS</strong> · Tips: <strong style={{ color: T.gold }}>unlimited</strong>
          </div>
          <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), marginTop: 4 }}>*Illustrative targets, not guaranteed.</div>
        </div>
      </div>
    </div>
  );

  // ═══ TIP SHEET ═══
  const TipSheet = () => showTipSheet && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowTipSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>⏣</span>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), marginTop: 4 }}>Tip this creator</div>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>Share your earned HOURS*</div>
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
        <button onClick={() => { setShowTipSheet(false); setTipAmount(null); }} style={{
          width: '100%', padding: 14, borderRadius: 14, border: 'none',
          background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
          fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f(),
        }}>Send {tipAmount || 1} HOURS</button>
        <div style={{ textAlign: 'center', marginTop: 6 }}>
          <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are not currency. See Terms.</span>
        </div>
      </div>
    </div>
  );

  // ═══ RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'shorts' && <ShortsView />}
      {view === 'player' && <PlayerView />}
      {view === 'channel' && <ChannelView />}
      <UploadSheet />
      <TipSheet />
    </div>
  );
};

export default OursWatch;
