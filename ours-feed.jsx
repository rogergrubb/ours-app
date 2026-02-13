import React, { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — THE SOCIAL FEED
// "Everything you love about social media, except it loves you back."
//
// Stories • Rich Posts • Reactions • Comments • HOURS Tips • Live Pulse
// 7 Post Types • Inline Media • Polls • Threading • Animations
// The dopamine loop that PAYS you.
// ═══════════════════════════════════════════════════════════════════════════

const OursFeed = () => {
  const [view, setView] = useState('feed'); // feed | story | postDetail | compose | notifications | profile
  const [mounted, setMounted] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState('post');
  const [composeText, setComposeText] = useState('');
  const [showReactions, setShowReactions] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [showTipModal, setShowTipModal] = useState(null);
  const [tipAmount, setTipAmount] = useState(1);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifCount, setNotifCount] = useState(7);
  const [activeTab, setActiveTab] = useState('foryou'); // foryou | following | trending | live
  const [scrollY, setScrollY] = useState(0);
  const [showEarnings, setShowEarnings] = useState(false);
  const [earnedAnimation, setEarnedAnimation] = useState(null);
  const [pollVotes, setPollVotes] = useState({});
  const [liveActivityPulse, setLiveActivityPulse] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const feedRef = useRef(null);
  const storyTimerRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  // Live activity pulse
  useEffect(() => {
    const interval = setInterval(() => setLiveActivityPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  // ═══ DESIGN TOKENS ═══
  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    lime: '#84cc16', teal: '#2dd4bf', rose: '#fb7185', indigo: '#818cf8',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    glass: 'rgba(10,17,34,0.85)',
  };

  // ═══ STORIES DATA ═══
  const stories = [
    { id: 'you', user: 'Your Story', avatar: '➕', isAdd: true, hasStory: false, ring: T.dim },
    { id: 's1', user: 'Maya Chen', avatar: '🎨', hasStory: true, ring: T.primary, verified: true, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #0ea5e9, #a78bfa)', text: 'Just earned 50 HOURS from my art series! 🎉', time: '2h' },
      { type: 'gradient', bg: 'linear-gradient(135deg, #f472b6, #fb923c)', text: "The community voted my piece into the gallery. I'm crying 😭", time: '2h' },
    ]},
    { id: 's2', user: 'Alex Rivera', avatar: '🎬', hasStory: true, ring: T.red, verified: true, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #ef4444, #f59e0b)', text: 'New video dropping tomorrow... 1M views incoming 🔥', time: '4h' },
    ]},
    { id: 's3', user: 'Sam Torres', avatar: '🎵', hasStory: true, ring: T.accent, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #10b981, #22d3ee)', text: 'Hosting an audio room tonight — join me!', time: '1h' },
    ]},
    { id: 's4', user: 'Jade Kim', avatar: '📸', hasStory: true, ring: T.purple, verified: true, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #a78bfa, #f472b6)', text: 'Tokyo at golden hour. Shot on phone.', time: '6h' },
    ]},
    { id: 's5', user: 'Dev Patel', avatar: '💻', hasStory: true, ring: T.cyan, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #22d3ee, #0ea5e9)', text: 'Built my first app on OURS. Revenue sharing is real.', time: '3h' },
    ]},
    { id: 's6', user: 'Luna Nova', avatar: '🌙', hasStory: true, ring: T.gold, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #fbbf24, #fb923c)', text: 'Governance proposal passed! We did it! 🗳️', time: '5h' },
    ]},
    { id: 's7', user: 'OURS Team', avatar: '✦', hasStory: true, ring: T.primary, verified: true, isOfficial: true, slides: [
      { type: 'gradient', bg: 'linear-gradient(135deg, #0ea5e9, #10b981)', text: '🎉 1 million users milestone! Thank you, owners.', time: '1h' },
    ]},
  ];

  // ═══ POSTS DATA ═══
  const posts = [
    {
      id: 'p1', type: 'image',
      user: { name: 'Maya Chen', handle: '@mayachen', avatar: '🎨', verified: true, badge: 'Creator', badgeColor: T.pink },
      content: "Just finished this piece for the community gallery. Every brushstroke felt different knowing the people who see it actually own this platform with me.\n\nThis is what art feels like when the algorithm doesn't decide who sees it.",
      images: [{ id: 1, aspect: '4:3', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }],
      tags: ['#art', '#digitalart', '#community'],
      time: '2h', zone: 'Explore',
      stats: { likes: 1247, comments: 89, shares: 234, tips: 45.5, views: '12.4K' },
      earnings: '+3.2 HRS',
      pinned: false,
    },
    {
      id: 'p2', type: 'text',
      user: { name: 'Jordan Blake', handle: '@jordanblake', avatar: '💡', verified: false, badge: 'Thinker', badgeColor: T.cyan },
      content: "Hot take: The reason social media feels broken isn't the technology — it's the business model.\n\nWhen a platform makes money by keeping you angry and addicted, every feature is designed to exploit you.\n\nWhen a platform makes money when YOU make money... everything changes.\n\nOURS isn't just another app. It's proof that the incentives can be aligned.\n\nWhat if your feed was optimized for your actual wellbeing instead of engagement metrics? We're about to find out.",
      time: '4h', zone: 'Feed',
      stats: { likes: 3891, comments: 467, shares: 1203, tips: 127.0, views: '89.2K' },
      earnings: '+12.7 HRS',
      trending: true,
    },
    {
      id: 'p3', type: 'video',
      user: { name: 'Alex Rivera', handle: '@alexrivera', avatar: '🎬', verified: true, badge: 'Director', badgeColor: T.red },
      content: "The OURS Creator Fund just hit different. Made this short film about connection in the digital age. 4 minutes. No budget. Just heart.",
      video: { duration: '4:12', thumb: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', views: '234K', quality: '4K' },
      time: '6h', zone: 'Watch',
      stats: { likes: 8923, comments: 1247, shares: 3456, tips: 892.0, views: '234K' },
      earnings: '+89.2 HRS',
    },
    {
      id: 'p4', type: 'poll',
      user: { name: 'OURS Governance', handle: '@governance', avatar: '🗳️', verified: true, badge: 'Official', badgeColor: T.gold, isOfficial: true },
      content: "Community Vote #47: Should OURS implement a \"slow feed\" mode that limits scrolling after 30 minutes?",
      poll: {
        options: [
          { id: 'a', text: 'Yes — protect our attention', votes: 6234, emoji: '🛡️' },
          { id: 'b', text: 'Optional toggle only', votes: 8901, emoji: '⚖️' },
          { id: 'c', text: 'No — let users decide', votes: 2345, emoji: '🆓' },
          { id: 'd', text: 'Need more research first', votes: 1890, emoji: '🔬' },
        ],
        totalVotes: 19370, endsIn: '2 days', quorum: '15,000', quorumMet: true,
        earningForVote: '+0.5 HRS',
      },
      time: '8h', zone: 'Govern',
      stats: { likes: 2103, comments: 891, shares: 567, tips: 0, views: '45.6K' },
    },
    {
      id: 'p5', type: 'article',
      user: { name: 'Dr. Sarah Liu', handle: '@drsarahliu', avatar: '🧠', verified: true, badge: 'Scholar', badgeColor: T.teal },
      content: "I spent 6 months studying what happens to creators when they own the platform. The results surprised everyone — including me.",
      article: {
        title: 'The Ownership Effect: How Platform Equity Changes Creator Behavior',
        readTime: '12 min', wordCount: '3,400',
        preview: 'When creators become owners, their content changes. Not in quality — in character. They stop performing and start creating...',
        cover: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      },
      time: '12h', zone: 'Read',
      stats: { likes: 5672, comments: 2103, shares: 4567, tips: 234.0, views: '156K' },
      earnings: '+23.4 HRS',
    },
    {
      id: 'p6', type: 'product',
      user: { name: 'Nira Craft', handle: '@niracraft', avatar: '🪡', verified: false, badge: 'Maker', badgeColor: T.orange },
      content: "Handmade ceramic mugs, inspired by the OURS community. Each one is unique, just like every owner.",
      product: {
        name: 'OURS Community Mug — Handcrafted',
        price: '$34.00', originalPrice: '$42.00',
        rating: 4.9, reviews: 127, sold: 89,
        image: 'linear-gradient(135deg, #92400e 0%, #78350f 100%)',
        shipping: 'Free shipping',
        revenue: '95% to creator',
      },
      time: '1d', zone: 'Shop',
      stats: { likes: 892, comments: 134, shares: 267, tips: 12.0, views: '8.9K' },
    },
    {
      id: 'p7', type: 'audio',
      user: { name: 'Sam Torres', handle: '@samtorres', avatar: '🎵', verified: true, badge: 'Producer', badgeColor: T.accent },
      content: "Tonight's audio room: \"Building in Public — How OURS creators are changing the game.\" 47 people already in. Join us.",
      audio: {
        title: 'Building in Public — Creator Stories',
        isLive: true, listeners: 47, speakers: 4, duration: '1h 23m',
        speakers_list: ['Sam T.', 'Maya C.', 'Jordan B.', 'Dr. Liu'],
      },
      time: '🔴 Live', zone: 'Listen',
      stats: { likes: 456, comments: 89, shares: 123, tips: 67.0, views: '2.1K' },
    },
    {
      id: 'p8', type: 'milestone',
      user: { name: 'OURS', handle: '@ours', avatar: '✦', verified: true, badge: 'Platform', badgeColor: T.primary, isOfficial: true },
      content: "🎉 COMMUNITY MILESTONE: $1,000,000 paid out to creators this month. Every dollar came from real revenue, not VC subsidies. This is what ownership looks like.",
      milestone: {
        amount: '$1,000,000', label: 'Paid to Creators', period: 'This Month',
        breakdown: [
          { label: 'Watch', amount: '$340K', icon: '🎬', pct: 34 },
          { label: 'Shop', amount: '$280K', icon: '🛍️', pct: 28 },
          { label: 'Read', amount: '$180K', icon: '📚', pct: 18 },
          { label: 'Listen', amount: '$120K', icon: '🎵', pct: 12 },
          { label: 'Other', amount: '$80K', icon: '✨', pct: 8 },
        ],
      },
      time: '1d', zone: 'Platform',
      stats: { likes: 24567, comments: 4567, shares: 12345, tips: 0, views: '1.2M' },
    },
    {
      id: 'p9', type: 'challenge',
      user: { name: 'OURS Challenges', handle: '@challenges', avatar: '🏆', verified: true, badge: 'Official', badgeColor: T.gold, isOfficial: true },
      content: "🎯 WEEKLY CHALLENGE: \"My OURS Story\" — Share your best moment on the platform. Winner gets 100 HOURS + featured spot.",
      challenge: {
        title: 'My OURS Story', prize: '100 HOURS',
        entries: 2341, timeLeft: '3 days',
        topEntries: [
          { user: 'Maya C.', preview: 'When my art was voted...', likes: 456 },
          { user: 'Dev P.', preview: 'Built my first revenue...', likes: 389 },
          { user: 'Luna N.', preview: 'The day governance...', likes: 312 },
        ],
      },
      time: '2d', zone: 'Community',
      stats: { likes: 3456, comments: 2341, shares: 890, tips: 0, views: '67.8K' },
    },
  ];

  // ═══ NOTIFICATIONS DATA ═══
  const notifications = [
    { id: 'n1', type: 'tip', text: 'Maya Chen tipped you 5.0 HOURS on your post', time: '2m', icon: '💰', color: T.gold },
    { id: 'n2', type: 'like', text: '47 people liked your article "The Future of..."', time: '15m', icon: '❤️', color: T.red },
    { id: 'n3', type: 'comment', text: 'Alex Rivera replied to your comment', time: '32m', icon: '💬', color: T.primary },
    { id: 'n4', type: 'follow', text: 'Dr. Sarah Liu started following you', time: '1h', icon: '👤', color: T.purple },
    { id: 'n5', type: 'governance', text: 'Your vote was counted in Proposal #47', time: '2h', icon: '🗳️', color: T.gold },
    { id: 'n6', type: 'milestone', text: "You've earned 100 HOURS total! 🎉", time: '3h', icon: '🏆', color: T.accent },
    { id: 'n7', type: 'mention', text: 'Sam Torres mentioned you in an audio room', time: '4h', icon: '🎵', color: T.orange },
  ];

  // ═══ TRENDING DATA ═══
  const trending = [
    { tag: '#CreatorEconomy', posts: '12.4K', hot: true },
    { tag: '#OURSMilestone', posts: '8.9K', hot: true },
    { tag: '#BuildInPublic', posts: '6.7K' },
    { tag: '#DigitalArt', posts: '5.2K' },
    { tag: '#PlatformOwnership', posts: '4.1K' },
  ];

  const suggestedFollows = [
    { name: 'Dr. Sarah Liu', handle: '@drsarahliu', avatar: '🧠', verified: true, reason: 'Popular in Read', followers: '45.2K' },
    { name: 'Nira Craft', handle: '@niracraft', avatar: '🪡', reason: 'Trending in Shop', followers: '12.8K' },
    { name: 'Dev Patel', handle: '@devpatel', avatar: '💻', reason: 'Active in Community', followers: '8.9K' },
  ];

  // ═══ COMMENTS DATA ═══
  const commentsData = {
    p1: [
      { id: 'c1', user: 'Alex R.', avatar: '🎬', text: 'This is absolutely stunning. The colors... 😍', time: '1h', likes: 34, verified: true },
      { id: 'c2', user: 'Jordan B.', avatar: '💡', text: 'When art is free from algorithmic pressure, this is what happens.', time: '1h', likes: 89 },
      { id: 'c3', user: 'Sam T.', avatar: '🎵', text: 'Would love to feature this in my next audio room discussion!', time: '45m', likes: 12 },
    ],
    p2: [
      { id: 'c4', user: 'Maya C.', avatar: '🎨', text: 'This perfectly captures why I moved here. The incentive shift changes everything.', time: '3h', likes: 156, verified: true },
      { id: 'c5', user: 'Dr. Liu', avatar: '🧠', text: 'I have research data that backs this up. Writing about it now.', time: '2h', likes: 203, verified: true },
    ],
  };

  // ═══ HELPERS ═══
  const formatNumber = (n) => {
    if (n >= 1000000) return (n/1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n/1000).toFixed(1) + 'K';
    return n.toString();
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!likedPosts[postId]) {
      const id = Date.now();
      setFloatingHearts(prev => [...prev, { id, x: 30 + Math.random() * 40, color: [T.red, T.pink, T.rose][Math.floor(Math.random() * 3)] }]);
      setTimeout(() => setFloatingHearts(prev => prev.filter(h => h.id !== id)), 1200);
      triggerEarning('+0.1 HRS');
    }
  };

  const toggleSave = (postId) => setSavedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  const toggleFollow = (userId) => setFollowedUsers(prev => ({ ...prev, [userId]: !prev[userId] }));

  const triggerEarning = (amount) => {
    setEarnedAnimation(amount);
    setTimeout(() => setEarnedAnimation(null), 1500);
  };

  const votePoll = (postId, optionId) => {
    if (pollVotes[postId]) return;
    setPollVotes(prev => ({ ...prev, [postId]: optionId }));
    triggerEarning('+0.5 HRS');
  };

  // Story viewer
  const openStory = (story) => {
    if (story.isAdd) { setShowCompose(true); return; }
    setActiveStory(story);
    setStoryProgress(0);
    setView('story');
  };

  useEffect(() => {
    if (view === 'story' && activeStory) {
      const duration = 5000;
      const interval = 50;
      let progress = 0;
      storyTimerRef.current = setInterval(() => {
        progress += (interval / duration) * 100;
        setStoryProgress(progress);
        if (progress >= 100) {
          const currentSlideIndex = Math.floor(storyProgress / (100 / activeStory.slides.length));
          if (currentSlideIndex < activeStory.slides.length - 1) {
            setStoryProgress((currentSlideIndex + 1) * (100 / activeStory.slides.length));
          } else {
            clearInterval(storyTimerRef.current);
            setView('feed');
            setActiveStory(null);
          }
        }
      }, interval);
      return () => clearInterval(storyTimerRef.current);
    }
  }, [view, activeStory]);

  // ═══ STYLES ═══
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes heartFloat {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
    }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes livePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } }
    @keyframes earnFloat {
      0% { transform: translateY(0) scale(0.8); opacity: 0; }
      20% { transform: translateY(-10px) scale(1.1); opacity: 1; }
      80% { transform: translateY(-40px) scale(1); opacity: 1; }
      100% { transform: translateY(-60px) scale(0.8); opacity: 0; }
    }
    @keyframes gradientShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
    @keyframes storyProgress { from { width: 0%; } to { width: 100%; } }
    @keyframes confettiBurst {
      0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
      100% { transform: translateY(-100px) rotate(720deg) scale(0); opacity: 0; }
    }
    @keyframes ripple {
      0% { transform: scale(1); opacity: 0.3; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.3); }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
    textarea { resize: none; }
  `;

  const f = (family = 'body') => ({
    body: "'Outfit', sans-serif",
    mono: "'DM Mono', monospace",
    display: "'Playfair Display', serif",
  }[family]);

  // ═══ STORY BAR ═══
  const StoryBar = () => (
    <div style={{
      padding: '14px 0 10px', display: 'flex', gap: 14,
      overflowX: 'auto', overflowY: 'hidden',
      scrollbarWidth: 'none', msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch',
      paddingLeft: 16, paddingRight: 16,
    }}>
      {stories.map((story, i) => (
        <div key={story.id} onClick={() => openStory(story)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer', minWidth: 68, opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(10px)',
          transition: `all 0.4s ease ${i * 0.05}s`,
        }}>
          <div style={{
            width: 62, height: 62, borderRadius: '50%',
            background: story.isAdd ? T.card : `conic-gradient(${story.ring}, ${story.ring}88, ${story.ring})`,
            padding: 3, position: 'relative',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: story.isAdd ? T.surface : T.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: story.isAdd ? 20 : 26, border: `2px solid ${T.bg}`,
            }}>
              {story.avatar}
            </div>
            {story.isOfficial && (
              <div style={{
                position: 'absolute', bottom: -1, right: -1, width: 18, height: 18,
                borderRadius: '50%', background: T.primary, border: `2px solid ${T.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8,
              }}>✦</div>
            )}
            {story.hasStory && !story.isAdd && (
              <div style={{
                position: 'absolute', bottom: -1, right: -1, width: 14, height: 14,
                borderRadius: '50%', border: `2px solid ${T.bg}`,
                background: T.accent,
              }} />
            )}
          </div>
          <span style={{
            fontSize: 10, color: story.isAdd ? T.dim : T.sub,
            fontFamily: f(), fontWeight: 500, maxWidth: 68,
            textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{story.user}</span>
        </div>
      ))}
    </div>
  );

  // ═══ STORY VIEWER ═══
  const StoryViewer = () => {
    if (!activeStory || !activeStory.slides) return null;
    const slideCount = activeStory.slides.length;
    const currentSlide = Math.min(Math.floor(storyProgress / (100 / slideCount)), slideCount - 1);
    const slide = activeStory.slides[currentSlide];

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: slide.bg || T.bg,
        display: 'flex', flexDirection: 'column',
      }} onClick={() => { setView('feed'); setActiveStory(null); }}>
        {/* Progress bars */}
        <div style={{ display: 'flex', gap: 4, padding: '12px 12px 0' }}>
          {activeStory.slides.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 2, background: '#fff',
                width: i < currentSlide ? '100%' : i === currentSlide ? `${(storyProgress - (i * 100/slideCount)) / (100/slideCount) * 100}%` : '0%',
                transition: 'width 0.1s linear',
              }} />
            </div>
          ))}
        </div>
        {/* Header */}
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>{activeStory.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f() }}>{activeStory.user}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: f() }}>{slide.time} ago</div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>×</div>
        </div>
        {/* Content */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 32px', textAlign: 'center',
        }}>
          <p style={{
            fontSize: 24, fontWeight: 700, color: '#fff', fontFamily: f(),
            lineHeight: 1.4, textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          }}>{slide.text}</p>
        </div>
        {/* Bottom */}
        <div style={{ padding: '20px 16px', display: 'flex', gap: 10, justifyContent: 'center' }}>
          <div style={{
            flex: 1, maxWidth: 300, padding: '10px 16px', borderRadius: 24,
            border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: f(), textAlign: 'center',
          }}>Reply to story...</div>
          <button style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.15)', fontSize: 18, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>❤️</button>
          <button style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.15)', fontSize: 18, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>📤</button>
        </div>
      </div>
    );
  };

  // ═══ TOP NAV BAR ═══
  const TopNav = () => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 22, fontWeight: 900, fontFamily: f(),
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: -0.5,
          }}>OURS</span>
          <div style={{
            padding: '2px 6px', borderRadius: 6, fontSize: 8,
            fontFamily: f('mono'), fontWeight: 500, color: T.gold,
            background: `${T.gold}15`, border: `1px solid ${T.gold}30`,
            letterSpacing: 1,
          }}>BETA</div>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Earnings ticker */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 20,
            background: `${T.gold}12`, border: `1px solid ${T.gold}25`,
          }}>
            <span style={{ fontSize: 12 }}>⏣</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>142.5</span>
            <span style={{ fontSize: 9, color: `${T.gold}88`, fontFamily: f('mono') }}>HRS</span>
          </div>
          {/* Notifications */}
          <button onClick={() => setShowNotifications(!showNotifications)} style={{
            width: 36, height: 36, borderRadius: 12, border: `1px solid ${T.border}`,
            background: showNotifications ? T.elevated : T.surface,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, position: 'relative',
          }}>
            🔔
            {notifCount > 0 && (
              <div style={{
                position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16,
                borderRadius: 8, background: T.red, border: `2px solid ${T.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: f('mono'),
                padding: '0 3px',
              }}>{notifCount}</div>
            )}
          </button>
          {/* Profile */}
          <button style={{
            width: 36, height: 36, borderRadius: 12,
            background: `linear-gradient(135deg, ${T.primary}, ${T.purple})`,
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>👤</button>
        </div>
      </div>

      {/* Feed tabs */}
      <div style={{ display: 'flex', padding: '0 16px', gap: 0, borderTop: `1px solid ${T.border}` }}>
        {[
          { id: 'foryou', label: 'For You', icon: '✨' },
          { id: 'following', label: 'Following', icon: '👥' },
          { id: 'trending', label: 'Trending', icon: '🔥' },
          { id: 'live', label: 'Live', icon: '🔴' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: '10px 0', border: 'none', background: 'none',
            fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
            color: activeTab === tab.id ? T.text : T.dim,
            borderBottom: `2px solid ${activeTab === tab.id ? T.primary : 'transparent'}`,
            transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 11 }}>{tab.icon}</span>
            {tab.label}
            {tab.id === 'live' && (
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: T.red,
                animation: 'pulse 1.5s infinite',
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  // ═══ NOTIFICATION PANEL ═══
  const NotificationPanel = () => showNotifications && (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 80,
    }}>
      <div onClick={() => setShowNotifications(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{
        position: 'absolute', top: 60, right: 10, width: 340, maxHeight: '70vh',
        background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)', overflow: 'hidden',
        animation: 'slideDown 0.25s ease',
      }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${T.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 700, fontFamily: f(), color: T.text }}>Notifications</span>
          <button onClick={() => { setNotifCount(0); setShowNotifications(false); }} style={{
            background: 'none', border: 'none', fontSize: 11, color: T.primary, fontFamily: f(), fontWeight: 600,
          }}>Mark all read</button>
        </div>
        <div style={{ overflowY: 'auto', maxHeight: '60vh' }}>
          {notifications.map((n, i) => (
            <div key={n.id} style={{
              padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start',
              borderBottom: `1px solid ${T.border}`,
              background: i < notifCount ? `${T.primary}06` : 'transparent',
              animation: `slideDown 0.2s ease ${i * 0.05}s both`,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: `${n.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
              }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.text, fontFamily: f(), lineHeight: 1.4 }}>{n.text}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), marginTop: 3 }}>{n.time} ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ═══ POST CARD ═══
  const PostCard = ({ post, index }) => {
    const isLiked = likedPosts[post.id];
    const isSaved = savedPosts[post.id];
    const hasComments = expandedComments[post.id];
    const comments = commentsData[post.id] || [];

    const zoneColors = {
      Feed: T.primary, Watch: T.red, Read: T.cyan, Shop: T.pink,
      Community: T.purple, Listen: T.orange, Govern: T.gold, Explore: T.teal,
      Platform: T.primary,
    };
    const zoneColor = zoneColors[post.zone] || T.primary;

    return (
      <div style={{
        background: T.surface, borderRadius: 20,
        border: `1px solid ${T.border}`, overflow: 'hidden',
        animation: `slideUp 0.4s ease ${index * 0.08}s both`,
        transition: 'border-color 0.2s',
      }}>
        {/* Post Header */}
        <div style={{ padding: '14px 16px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 14,
            background: post.user.isOfficial ? `linear-gradient(135deg, ${T.primary}, ${T.accent})` : T.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            border: `2px solid ${T.border}`,
          }}>{post.user.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{post.user.name}</span>
              {post.user.verified && <span style={{ fontSize: 10, color: T.primary }}>✓</span>}
              {post.user.badge && (
                <span style={{
                  fontSize: 9, fontWeight: 600, color: post.user.badgeColor,
                  background: `${post.user.badgeColor}15`, padding: '1px 6px',
                  borderRadius: 6, fontFamily: f(),
                }}>{post.user.badge}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
              <span style={{ fontSize: 11, color: T.dim, fontFamily: f() }}>{post.user.handle}</span>
              <span style={{ fontSize: 8, color: T.dim }}>·</span>
              <span style={{ fontSize: 11, color: post.time === '🔴 Live' ? T.red : T.dim, fontFamily: f('mono'), fontWeight: post.time === '🔴 Live' ? 600 : 400 }}>{post.time}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
            <span style={{
              fontSize: 9, color: zoneColor, background: `${zoneColor}12`,
              padding: '2px 8px', borderRadius: 6, fontFamily: f('mono'), fontWeight: 500,
            }}>{post.zone}</span>
            {post.earnings && (
              <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono'), fontWeight: 600 }}>{post.earnings}</span>
            )}
          </div>
        </div>

        {/* Trending badge */}
        {post.trending && (
          <div style={{
            margin: '8px 16px 0', padding: '6px 10px', borderRadius: 10,
            background: `linear-gradient(135deg, ${T.orange}15, ${T.red}15)`,
            border: `1px solid ${T.orange}20`, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ fontSize: 12 }}>🔥</span>
            <span style={{ fontSize: 10, color: T.orange, fontFamily: f(), fontWeight: 600 }}>Trending — {post.stats.views} views</span>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '10px 16px' }}>
          <p style={{
            fontSize: 13.5, color: T.text, fontFamily: f(), lineHeight: 1.55,
            whiteSpace: 'pre-wrap',
          }}>{post.content}</p>

          {/* Tags */}
          {post.tags && (
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, color: T.primary, fontFamily: f(), fontWeight: 500,
                  cursor: 'pointer',
                }}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Type-specific content */}
        {post.type === 'image' && post.images && (
          <div style={{ padding: '0 16px 10px' }}>
            {post.images.map(img => (
              <div key={img.id} style={{
                width: '100%', aspectRatio: img.aspect === '4:3' ? '4/3' : '16/9',
                borderRadius: 14, background: img.color, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 48, opacity: 0.5 }}>🖼️</span>
              </div>
            ))}
          </div>
        )}

        {post.type === 'video' && post.video && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              width: '100%', aspectRatio: '16/9', borderRadius: 14,
              background: post.video.thumb, overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', cursor: 'pointer',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, transition: 'transform 0.2s',
              }}>▶️</div>
              <div style={{
                position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 6,
              }}>
                <span style={{
                  padding: '3px 8px', borderRadius: 6,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  fontSize: 10, color: '#fff', fontFamily: f('mono'),
                }}>{post.video.duration}</span>
                <span style={{
                  padding: '3px 8px', borderRadius: 6,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  fontSize: 10, color: '#fff', fontFamily: f('mono'),
                }}>{post.video.quality}</span>
              </div>
              <div style={{
                position: 'absolute', bottom: 10, right: 10,
                padding: '3px 8px', borderRadius: 6,
                background: 'rgba(0,0,0,0.6)', fontSize: 10,
                color: '#fff', fontFamily: f('mono'),
              }}>{post.video.views} views</div>
            </div>
          </div>
        )}

        {post.type === 'poll' && post.poll && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {post.poll.options.map(opt => {
                const total = post.poll.totalVotes;
                const pct = Math.round((opt.votes / total) * 100);
                const isVoted = pollVotes[post.id] === opt.id;
                const hasVoted = !!pollVotes[post.id];
                return (
                  <button key={opt.id} onClick={() => votePoll(post.id, opt.id)} disabled={hasVoted} style={{
                    position: 'relative', padding: '10px 14px', borderRadius: 12,
                    background: T.card, border: `1px solid ${isVoted ? T.primary : T.border}`,
                    textAlign: 'left', overflow: 'hidden', transition: 'all 0.3s',
                    cursor: hasVoted ? 'default' : 'pointer',
                  }}>
                    {hasVoted && (
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${pct}%`, background: isVoted ? `${T.primary}15` : `${T.dim}08`,
                        borderRadius: 12, transition: 'width 0.8s ease',
                      }} />
                    )}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14 }}>{opt.emoji}</span>
                        <span style={{ fontSize: 12, color: T.text, fontFamily: f(), fontWeight: isVoted ? 700 : 500 }}>{opt.text}</span>
                      </div>
                      {hasVoted && (
                        <span style={{ fontSize: 12, fontWeight: 700, color: isVoted ? T.primary : T.sub, fontFamily: f('mono') }}>{pct}%</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>
                {formatNumber(post.poll.totalVotes)} votes · Ends in {post.poll.endsIn}
              </span>
              <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono'), fontWeight: 600 }}>
                {post.poll.earningForVote} for voting
              </span>
            </div>
            {post.poll.quorumMet && (
              <div style={{
                marginTop: 6, padding: '4px 8px', borderRadius: 8,
                background: `${T.accent}10`, border: `1px solid ${T.accent}20`,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 10 }}>✅</span>
                <span style={{ fontSize: 10, color: T.accent, fontFamily: f('mono') }}>Quorum reached ({post.poll.quorum} votes)</span>
              </div>
            )}
          </div>
        )}

        {post.type === 'article' && post.article && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.border}`,
              cursor: 'pointer', transition: 'border-color 0.2s',
            }}>
              <div style={{
                height: 100, background: post.article.cover,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 32, opacity: 0.5 }}>📚</span>
              </div>
              <div style={{ padding: '12px 14px', background: T.card }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 6 }}>
                  {post.article.title}
                </div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 8 }}>
                  {post.article.preview}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>📖 {post.article.readTime}</span>
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{post.article.wordCount} words</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {post.type === 'product' && post.product && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden', border: `1px solid ${T.border}`,
              display: 'flex', background: T.card,
            }}>
              <div style={{
                width: 120, minHeight: 120, background: post.product.image,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: 32, opacity: 0.5 }}>🛍️</span>
              </div>
              <div style={{ padding: '12px 14px', flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 4 }}>{post.product.name}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: f() }}>{post.product.price}</span>
                  <span style={{ fontSize: 11, color: T.dim, fontFamily: f(), textDecoration: 'line-through' }}>{post.product.originalPrice}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.gold }}>{'★'.repeat(Math.floor(post.product.rating))}</span>
                  <span style={{ fontSize: 10, color: T.sub, fontFamily: f('mono') }}>{post.product.rating} ({post.product.reviews})</span>
                </div>
                <div style={{ fontSize: 10, color: T.accent, fontFamily: f('mono') }}>{post.product.revenue}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), marginTop: 2 }}>{post.product.shipping}</div>
              </div>
            </div>
          </div>
        )}

        {post.type === 'audio' && post.audio && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              borderRadius: 14, padding: 14, background: T.card,
              border: `1px solid ${post.audio.isLive ? T.red + '40' : T.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                {post.audio.isLive && (
                  <span style={{
                    padding: '2px 8px', borderRadius: 6, fontSize: 9, fontWeight: 700,
                    color: '#fff', background: T.red, fontFamily: f('mono'),
                    animation: 'livePulse 2s infinite',
                  }}>● LIVE</span>
                )}
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{post.audio.title}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {post.audio.speakers_list.map((s, i) => (
                  <div key={i} style={{
                    padding: '4px 10px', borderRadius: 10, background: T.elevated,
                    border: `1px solid ${T.border}`, fontSize: 10, color: T.sub, fontFamily: f(),
                  }}>{s}</div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 10, color: T.sub, fontFamily: f('mono') }}>👥 {post.audio.listeners} listening</span>
                  <span style={{ fontSize: 10, color: T.sub, fontFamily: f('mono') }}>🎤 {post.audio.speakers} speakers</span>
                </div>
                <button style={{
                  padding: '6px 16px', borderRadius: 20, border: 'none',
                  background: post.audio.isLive ? T.red : T.primary,
                  fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f(),
                }}>Join</button>
              </div>
            </div>
          </div>
        )}

        {post.type === 'milestone' && post.milestone && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              borderRadius: 14, overflow: 'hidden',
              background: `linear-gradient(135deg, ${T.primary}15, ${T.accent}15)`,
              border: `1px solid ${T.primary}25`, padding: 16,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 28, fontWeight: 900, fontFamily: f('display'), color: T.accent, lineHeight: 1 }}>
                  {post.milestone.amount}
                </div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: f(), marginTop: 4 }}>
                  {post.milestone.label} · {post.milestone.period}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {post.milestone.breakdown.map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, width: 24, textAlign: 'center' }}>{item.icon}</span>
                    <span style={{ fontSize: 11, color: T.text, fontFamily: f(), fontWeight: 600, width: 50 }}>{item.label}</span>
                    <div style={{ flex: 1, height: 6, borderRadius: 3, background: T.bg, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`,
                        width: `${item.pct}%`, transition: 'width 1s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: 10, color: T.sub, fontFamily: f('mono'), width: 40, textAlign: 'right' }}>{item.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {post.type === 'challenge' && post.challenge && (
          <div style={{ padding: '0 16px 10px' }}>
            <div style={{
              borderRadius: 14, padding: 14,
              background: `linear-gradient(135deg, ${T.gold}10, ${T.orange}10)`,
              border: `1px solid ${T.gold}25`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>🏆</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f() }}>{post.challenge.title}</span>
                </div>
                <span style={{
                  padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                  color: T.gold, background: `${T.gold}15`, fontFamily: f('mono'),
                }}>🎁 {post.challenge.prize}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
                {post.challenge.topEntries.map((entry, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                    borderRadius: 10, background: T.card, border: `1px solid ${T.border}`,
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: i === 0 ? T.gold : T.dim, fontFamily: f('mono'), width: 20, textAlign: 'center' }}>
                      {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{entry.user}</div>
                      <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{entry.preview}</div>
                    </div>
                    <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>❤️ {entry.likes}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{post.challenge.entries} entries · {post.challenge.timeLeft} left</span>
                <button style={{
                  padding: '6px 14px', borderRadius: 10, border: 'none',
                  background: T.gold, fontSize: 11, fontWeight: 700, color: T.bg, fontFamily: f(),
                }}>Enter Challenge</button>
              </div>
            </div>
          </div>
        )}

        {/* Interaction Bar */}
        <div style={{
          padding: '6px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {/* Like */}
            <button onClick={() => toggleLike(post.id)} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 10px', borderRadius: 10, border: 'none',
              background: isLiked ? `${T.red}15` : 'transparent',
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 15, transform: isLiked ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.2s' }}>
                {isLiked ? '❤️' : '🤍'}
              </span>
              <span style={{ fontSize: 11, color: isLiked ? T.red : T.dim, fontFamily: f('mono'), fontWeight: 600 }}>
                {formatNumber(post.stats.likes + (isLiked ? 1 : 0))}
              </span>
            </button>

            {/* Comment */}
            <button onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 10px', borderRadius: 10, border: 'none',
              background: hasComments ? `${T.primary}10` : 'transparent',
            }}>
              <span style={{ fontSize: 14 }}>💬</span>
              <span style={{ fontSize: 11, color: hasComments ? T.primary : T.dim, fontFamily: f('mono'), fontWeight: 600 }}>{formatNumber(post.stats.comments)}</span>
            </button>

            {/* Share */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 10px', borderRadius: 10, border: 'none', background: 'transparent',
            }}>
              <span style={{ fontSize: 14 }}>🔄</span>
              <span style={{ fontSize: 11, color: T.dim, fontFamily: f('mono'), fontWeight: 600 }}>{formatNumber(post.stats.shares)}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: 4 }}>
            {/* Tip HOURS */}
            {post.stats.tips > 0 && (
              <button onClick={() => setShowTipModal(post.id)} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 10px', borderRadius: 10, border: 'none',
                background: `${T.gold}10`,
              }}>
                <span style={{ fontSize: 13 }}>⏣</span>
                <span style={{ fontSize: 11, color: T.gold, fontFamily: f('mono'), fontWeight: 600 }}>Tip</span>
              </button>
            )}

            {/* Save */}
            <button onClick={() => toggleSave(post.id)} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              padding: '6px 10px', borderRadius: 10, border: 'none',
              background: isSaved ? `${T.purple}15` : 'transparent',
            }}>
              <span style={{ fontSize: 14 }}>{isSaved ? '🔖' : '📌'}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {hasComments && (
          <div style={{
            padding: '0 16px 14px',
            borderTop: `1px solid ${T.border}`, paddingTop: 12,
            animation: 'slideUp 0.2s ease',
          }}>
            {comments.length > 0 ? comments.map((c, i) => (
              <div key={c.id} style={{
                display: 'flex', gap: 8, padding: '8px 0',
                borderBottom: i < comments.length - 1 ? `1px solid ${T.border}` : 'none',
                animation: `slideUp 0.2s ease ${i * 0.05}s both`,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 10, background: T.card,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, flexShrink: 0,
                }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>{c.user}</span>
                    {c.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
                    <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{c.time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginTop: 2 }}>{c.text}</p>
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button style={{ background: 'none', border: 'none', fontSize: 10, color: T.dim, fontFamily: f() }}>❤️ {c.likes}</button>
                    <button style={{ background: 'none', border: 'none', fontSize: 10, color: T.dim, fontFamily: f() }}>Reply</button>
                  </div>
                </div>
              </div>
            )) : (
              <p style={{ fontSize: 11, color: T.dim, fontFamily: f(), textAlign: 'center', padding: '10px 0' }}>No comments yet. Be the first!</p>
            )}
            {/* Comment input */}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input
                placeholder="Add a comment..."
                value={newComment[post.id] || ''}
                onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 12,
                  background: T.card, border: `1px solid ${T.border}`,
                  fontSize: 12, color: T.text, fontFamily: f(),
                  outline: 'none',
                }}
              />
              <button style={{
                padding: '8px 14px', borderRadius: 12, border: 'none',
                background: T.primary, fontSize: 12, fontWeight: 600,
                color: '#fff', fontFamily: f(), opacity: newComment[post.id] ? 1 : 0.4,
              }}>Post</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ═══ TIP MODAL ═══
  const TipModal = () => showTipModal && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowTipModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, borderBottom: 'none',
        padding: 24, animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>⏣</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: f() }}>Tip HOURS</div>
          <div style={{ fontSize: 12, color: T.sub, fontFamily: f(), marginTop: 4 }}>Support this creator directly*</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          {[0.5, 1, 5, 10, 25].map(amt => (
            <button key={amt} onClick={() => setTipAmount(amt)} style={{
              padding: '10px 14px', borderRadius: 12,
              background: tipAmount === amt ? T.gold : T.card,
              border: `1px solid ${tipAmount === amt ? T.gold : T.border}`,
              color: tipAmount === amt ? T.bg : T.text,
              fontSize: 13, fontWeight: 700, fontFamily: f('mono'),
              transition: 'all 0.2s',
            }}>{amt}</button>
          ))}
        </div>
        <button onClick={() => { setShowTipModal(null); triggerEarning(`-${tipAmount} HRS`); }} style={{
          width: '100%', padding: '14px', borderRadius: 14, border: 'none',
          background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`,
          fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f(),
        }}>Send {tipAmount} HOURS</button>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>*HOURS are not currency. See Terms.</span>
        </div>
      </div>
    </div>
  );

  // ═══ COMPOSE SHEET ═══
  const ComposeSheet = () => showCompose && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowCompose(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, borderBottom: 'none',
        padding: 20, maxHeight: '70vh', animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setShowCompose(false)} style={{
            background: 'none', border: 'none', fontSize: 13, color: T.dim, fontFamily: f(), fontWeight: 600,
          }}>Cancel</button>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>Create</span>
          <button onClick={() => { setShowCompose(false); triggerEarning('+0.5 HRS'); }} style={{
            padding: '6px 14px', borderRadius: 10, border: 'none',
            background: composeText.length > 0 ? T.primary : T.card,
            fontSize: 12, fontWeight: 700, color: composeText.length > 0 ? '#fff' : T.dim,
            fontFamily: f(), transition: 'all 0.2s',
          }}>Post</button>
        </div>

        {/* Quick type selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'post', icon: '✏️', label: 'Post', color: T.primary },
            { id: 'photo', icon: '📸', label: 'Photo', color: T.pink },
            { id: 'video', icon: '🎬', label: 'Video', color: T.red },
            { id: 'poll', icon: '📊', label: 'Poll', color: T.purple },
            { id: 'article', icon: '📝', label: 'Article', color: T.cyan },
          ].map(t => (
            <button key={t.id} onClick={() => setComposeType(t.id)} style={{
              padding: '6px 12px', borderRadius: 10, border: 'none', whiteSpace: 'nowrap',
              background: composeType === t.id ? `${t.color}20` : T.card,
              fontSize: 11, fontWeight: 600, fontFamily: f(),
              color: composeType === t.id ? t.color : T.sub,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ fontSize: 12 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        <textarea
          placeholder="What's on your mind?"
          value={composeText}
          onChange={(e) => setComposeText(e.target.value)}
          style={{
            width: '100%', minHeight: 120, padding: 14, borderRadius: 14,
            background: T.card, border: `1px solid ${T.border}`,
            fontSize: 14, color: T.text, fontFamily: f(), lineHeight: 1.5,
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['📷', '🎥', '📊', '📍', '😊'].map(icon => (
              <button key={icon} style={{
                width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`,
                background: T.card, fontSize: 16, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>{icon}</button>
            ))}
          </div>
          <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{composeText.length}/2000</span>
        </div>

        <div style={{
          marginTop: 10, padding: '8px 10px', borderRadius: 10,
          background: `${T.gold}08`, border: `1px solid ${T.gold}15`,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 12 }}>⏣</span>
          <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>Earn +0.5 HOURS for posting*</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 6 }}>
          <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS earning targets are illustrative, not guaranteed</span>
        </div>
      </div>
    </div>
  );

  // ═══ TRENDING SIDEBAR (desktop) ═══
  const TrendingSidebar = () => (
    <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Live Activity */}
      <div style={{
        background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`,
        padding: 14, overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: T.accent,
            animation: 'pulse 2s infinite',
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Live Activity</span>
        </div>
        {[
          { text: 'Maya Chen earned 50 HOURS', icon: '💰', time: '2m' },
          { text: 'Proposal #47 hit quorum', icon: '🗳️', time: '5m' },
          { text: 'New audio room: Building in Public', icon: '🎙️', time: '8m' },
          { text: '1,000 new owners joined today', icon: '🎉', time: '12m' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, padding: '6px 0', alignItems: 'center',
            opacity: liveActivityPulse || i !== 0 ? 1 : 0.7, transition: 'opacity 0.5s',
          }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span style={{ fontSize: 10, color: T.sub, fontFamily: f(), flex: 1, lineHeight: 1.3 }}>{item.text}</span>
            <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{item.time}</span>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div style={{
        background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: 14,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Trending</span>
        {trending.map((tag, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < trending.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.primary, fontFamily: f(), cursor: 'pointer' }}>{tag.tag}</span>
                {tag.hot && <span style={{ fontSize: 10 }}>🔥</span>}
              </div>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{tag.posts} posts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Follows */}
      <div style={{
        background: T.surface, borderRadius: 16, border: `1px solid ${T.border}`, padding: 14,
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Who to follow</span>
        {suggestedFollows.map((user, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', alignItems: 'center', borderBottom: i < suggestedFollows.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 12, background: T.card,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{user.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{user.name}</span>
                {user.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              </div>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{user.reason} · {user.followers}</span>
            </div>
            <button onClick={() => toggleFollow(user.handle)} style={{
              padding: '5px 12px', borderRadius: 8, border: `1px solid ${followedUsers[user.handle] ? T.border : T.primary}`,
              background: followedUsers[user.handle] ? T.card : `${T.primary}15`,
              fontSize: 10, fontWeight: 600, color: followedUsers[user.handle] ? T.sub : T.primary, fontFamily: f(),
            }}>{followedUsers[user.handle] ? 'Following' : 'Follow'}</button>
          </div>
        ))}
      </div>

      {/* HOURS disclaimer */}
      <div style={{ padding: '8px 12px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), lineHeight: 1.5 }}>
          *All HOURS earnings shown are illustrative targets, not guarantees. HOURS are not cryptocurrency, securities, or fiat currency. Revenue sharing percentages are targets subject to change. See Terms of Service for complete details.
        </p>
      </div>
    </div>
  );

  // ═══ FLOATING ACTION BUTTON ═══
  const FAB = () => (
    <button onClick={() => setShowCompose(true)} style={{
      position: 'fixed', bottom: 80, right: 20, width: 56, height: 56,
      borderRadius: 16, border: 'none', zIndex: 40,
      background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
      boxShadow: `0 4px 20px ${T.primary}40`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 24, transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      ✏️
    </button>
  );

  // ═══ BOTTOM NAV ═══
  const BottomNav = () => (
    <div style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 440, background: `${T.bg}ee`,
      backdropFilter: 'blur(20px)', borderTop: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-around', padding: '8px 0 12px', zIndex: 30,
    }}>
      {[
        { icon: '🏠', label: 'Feed', active: true },
        { icon: '🔍', label: 'Explore' },
        { icon: '🎬', label: 'Watch' },
        { icon: '💬', label: 'Chat' },
        { icon: '👤', label: 'Profile' },
      ].map((tab, i) => (
        <button key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          background: 'none', border: 'none', padding: '4px 12px',
        }}>
          <span style={{ fontSize: 20, opacity: tab.active ? 1 : 0.4 }}>{tab.icon}</span>
          <span style={{ fontSize: 9, color: tab.active ? T.text : T.dim, fontFamily: f(), fontWeight: tab.active ? 700 : 400 }}>{tab.label}</span>
          {tab.active && (
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: T.primary, marginTop: 1 }} />
          )}
        </button>
      ))}
    </div>
  );

  // ═══ FLOATING HEARTS ═══
  const FloatingHeartsLayer = () => (
    <>
      {floatingHearts.map(heart => (
        <div key={heart.id} style={{
          position: 'fixed', left: `${heart.x}%`, bottom: '40%',
          fontSize: 20, animation: 'heartFloat 1.2s ease-out forwards',
          pointerEvents: 'none', zIndex: 100, color: heart.color,
        }}>❤️</div>
      ))}
    </>
  );

  // ═══ EARNING ANIMATION ═══
  const EarningAnimation = () => earnedAnimation && (
    <div style={{
      position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'earnFloat 1.5s ease-out forwards',
      pointerEvents: 'none', zIndex: 100,
    }}>
      <div style={{
        padding: '8px 16px', borderRadius: 12,
        background: T.gold, color: T.bg,
        fontSize: 16, fontWeight: 800, fontFamily: f('mono'),
        boxShadow: `0 4px 20px ${T.gold}40`,
      }}>{earnedAnimation}</div>
    </div>
  );

  // ═══ MAIN RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <style>{globalStyles}</style>

      {view === 'story' && <StoryViewer />}

      {view === 'feed' && (
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', gap: 16 }}>
          {/* Main Feed Column */}
          <div style={{ flex: 1, maxWidth: 440, margin: '0 auto' }}>
            <TopNav />
            <StoryBar />

            {/* Feed Posts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '6px 10px 100px' }}>
              {/* Live room banner */}
              {activeTab === 'foryou' && (
                <div style={{
                  borderRadius: 16, padding: 12,
                  background: `linear-gradient(135deg, ${T.red}15, ${T.orange}15)`,
                  border: `1px solid ${T.red}25`,
                  display: 'flex', alignItems: 'center', gap: 10,
                  animation: 'slideUp 0.3s ease',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${T.red}20`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 18,
                    animation: 'livePulse 2s infinite',
                  }}>🎙️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Building in Public — Live Now</div>
                    <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>Sam Torres + 3 speakers · 47 listening</div>
                  </div>
                  <button style={{
                    padding: '6px 14px', borderRadius: 10, border: 'none',
                    background: T.red, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f(),
                  }}>Join</button>
                </div>
              )}

              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}

              {/* End of feed */}
              <div style={{ textAlign: 'center', padding: '30px 0 60px' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>✨</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.sub, fontFamily: f() }}>You're all caught up!</div>
                <div style={{ fontSize: 11, color: T.dim, fontFamily: f(), marginTop: 4 }}>Check back later for more from the community</div>
              </div>
            </div>

            <FAB />
            <BottomNav />
          </div>

          {/* Desktop Sidebar */}
          <div style={{
            display: 'none', // Hidden on mobile, would show via media query
          }}>
            <TrendingSidebar />
          </div>
        </div>
      )}

      {/* Overlays */}
      <NotificationPanel />
      <ComposeSheet />
      <TipModal />
      <FloatingHeartsLayer />
      <EarningAnimation />
    </div>
  );
};

export default OursFeed;
