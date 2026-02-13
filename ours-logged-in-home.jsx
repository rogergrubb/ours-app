import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — Logged-In Home Experience
// "A kid in a candy store" — Every flavor of goodness
// Stolen best features from: Facebook, YouTube, Instagram,
// TikTok, Reddit, WhatsApp, LinkedIn, Snapchat, BeReal
// ═══════════════════════════════════════════════════════════════

const OursHome = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [showStory, setShowStory] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeType, setComposeType] = useState('text');
  const [feedMode, setFeedMode] = useState('following'); // following | discover | trending
  const [showEarnings, setShowEarnings] = useState(true);
  const [notification, setNotification] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [trendingTab, setTrendingTab] = useState('topics');

  // User
  const me = { name: 'Roger', handle: '@rogergrubb', avatar: '🧠', hours: 142.5, usd: 28.50, level: 'Pioneer', trust: 94, streak: 12 };

  // Stories (Instagram/Snapchat love)
  const stories = [
    { id: 0, user: 'Your Story', avatar: '➕', hasStory: false, isMine: true },
    { id: 1, user: 'Sarah', avatar: '👩‍💻', hasStory: true, seen: false, earnings: '+0.3 hrs' },
    { id: 2, user: 'Marcus', avatar: '💪', hasStory: true, seen: false, earnings: '+0.1 hrs' },
    { id: 3, user: 'Priya', avatar: '🍳', hasStory: true, seen: true, earnings: '+0.2 hrs' },
    { id: 4, user: 'Alex', avatar: '🎨', hasStory: true, seen: false, earnings: '+0.4 hrs' },
    { id: 5, user: 'Luna', avatar: '🌙', hasStory: true, seen: true, earnings: '+0.1 hrs' },
    { id: 6, user: 'Dev', avatar: '⚡', hasStory: true, seen: false, earnings: '+0.5 hrs' },
    { id: 7, user: 'Mia', avatar: '🎵', hasStory: true, seen: true, earnings: '+0.2 hrs' },
  ];

  // Feed posts — mixed format (text, image, video, poll, article, marketplace)
  const feedPosts = [
    {
      id: 1, type: 'milestone',
      user: 'OURS Team', handle: '@ours', avatar: '✊', verified: true, trust: 99,
      content: "🎉 OURS just crossed 10,000 waitlist signups in 48 hours. Every single one of you will earn HOURS from day one. This isn't hype — it's math. The more people join, the more ad revenue flows, the more everyone earns. Welcome to a platform that actually wants you here.",
      likes: 2847, comments: 312, shares: 1205, hours: 0, time: '1h',
      tag: 'Platform Update', tagColor: '#0ea5e9',
    },
    {
      id: 2, type: 'creator',
      user: 'Sarah Chen', handle: '@sarahbuilds', avatar: '👩‍💻', verified: true, trust: 91,
      content: "Day 14 on OURS. Here's my honest breakdown:\n\n📝 12 posts (mix of tutorials + personal)\n👥 Joined 3 groups, commented daily\n🛍️ Listed 1 digital product ($29 Python course)\n\nTotal HOURS earned: 47.2\nEstimated earnings: ~$9.44\n\nOn Instagram I posted for 3 YEARS and earned exactly $0. Not from ads, not from reach, not from anything. The game was rigged. This one isn't.*\n\n*Earnings are estimates based on current platform revenue. Individual results vary.",
      likes: 1456, comments: 203, shares: 567, hours: 3.2, time: '3h',
      tag: 'Creator Win', tagColor: '#10b981',
      hasImage: true, imageDesc: '📊 Earnings Dashboard Screenshot',
    },
    {
      id: 3, type: 'poll',
      user: 'OURS Community', handle: '@community', avatar: '🏛️', verified: true, trust: 99,
      content: "🗳️ GOVERNANCE VOTE #47: Should OURS add disappearing messages (like Snapchat/WhatsApp) to DMs?\n\nYour HOURS = your voting power. This is how platforms should make decisions.",
      pollOptions: [
        { text: 'Yes — privacy matters', votes: 4521, pct: 62 },
        { text: 'No — keep everything permanent', votes: 1203, pct: 17 },
        { text: 'Optional per-conversation', votes: 1560, pct: 21 },
      ],
      totalVotes: 7284,
      likes: 892, comments: 445, shares: 234, hours: 0.5, time: '5h',
      tag: 'Governance', tagColor: '#a78bfa',
    },
    {
      id: 4, type: 'video',
      user: 'Marcus Johnson', handle: '@marcusfitness', avatar: '💪', verified: false, trust: 88,
      content: "5-minute home workout that actually works. No equipment. No BS. No \"link in bio\" paywall.\n\nOh and I just passed 200 sales on my HIIT program in the storefront. At 95% revenue share that's real money hitting my account, not \"exposure.\"\n\nDrop a 💪 if you want a nutrition guide next.",
      likes: 2103, comments: 189, shares: 445, hours: 1.8, time: '6h',
      tag: 'Fitness', tagColor: '#ef4444',
      hasVideo: true, videoDuration: '5:32',
    },
    {
      id: 5, type: 'article',
      user: 'Priya Patel', handle: '@priyacooks', avatar: '🍳', verified: true, trust: 95,
      content: "I wrote a long-form article about why I left a 500K Instagram following to build here. TL;DR: I was generating an estimated ~$180K/year in ad revenue for Instagram based on my impressions. I saw none of it. Here, my content earns HOURS from day one.\n\nFull article below ↓ (10 min read, earns you +0.8 HOURS for reading)",
      likes: 3402, comments: 567, shares: 1289, hours: 5.1, time: '8h',
      tag: 'Long Read', tagColor: '#f59e0b',
      hasArticle: true, articleTitle: 'Why 500K Followers Meant $0: A Creator\'s Honest Reckoning',
      readTime: '10 min',
    },
    {
      id: 6, type: 'marketplace',
      user: 'Alex Rivera', handle: '@alexdesigns', avatar: '🎨', verified: false, trust: 87,
      content: "🛍️ NEW IN MY STOREFRONT: 50 premium UI templates for SaaS dashboards. Figma + React components included.\n\nPriced at $39 because I keep $37.05 of every sale. Try that on Gumroad.",
      likes: 678, comments: 45, shares: 189, hours: 0.5, time: '10h',
      tag: 'Storefront', tagColor: '#10b981',
      hasProduct: true, productName: 'SaaS Dashboard UI Kit', productPrice: 39,
    },
    {
      id: 7, type: 'discussion',
      user: 'Dev Kapoor', handle: '@devbuilds', avatar: '⚡', verified: false, trust: 82,
      content: "Genuine question for the community: How do we prevent OURS from becoming what we left?\n\nI've seen this cycle before. Platform starts great → grows → monetization pressure → enshittification.\n\nThe governance model is promising but I want to hear from the team — what are the structural safeguards? Not just promises, but actual mechanisms.\n\nTagging @ours for visibility.",
      likes: 1567, comments: 892, shares: 234, hours: 2.4, time: '12h',
      tag: 'Discussion', tagColor: '#64748b',
    },
    {
      id: 8, type: 'trending',
      user: 'Luna Reyes', handle: '@lunaverse', avatar: '🌙', verified: true, trust: 93,
      content: "Just used the Price Tag Calculator. In 4 years of TikTok with 89K followers posting 4x/week, I generated an estimated ~$18,700 in ad revenue for them.\n\nPaid to me: $0\nPayment for my HOURS here so far: ~$4.20\n\nI've been on OURS for 6 days. 🫠\n\n*Estimates based on industry-average CPM rates. Actual platform revenue varies.",
      likes: 4521, comments: 678, shares: 2345, hours: 0.8, time: '14h',
      tag: '🔥 Trending', tagColor: '#ef4444',
    },
  ];

  // Trending topics (Twitter/Reddit love)
  const trending = [
    { topic: '#OURSlaunchday', posts: '12.4K', category: 'Platform' },
    { topic: 'Price Tag Challenge', posts: '8.9K', category: 'Viral' },
    { topic: '#CreatorExodus', posts: '6.2K', category: 'Movement' },
    { topic: 'First HOURS Payout', posts: '4.8K', category: 'Earnings' },
    { topic: '#OwnYourFeed', posts: '3.1K', category: 'Community' },
    { topic: 'Governance Vote #47', posts: '2.7K', category: 'DAO' },
  ];

  // Groups (Facebook Groups love)
  const myGroups = [
    { name: 'Indie Hackers Bay Area', icon: '🚀', members: '1.2K', unread: 14, earning: '$0.12/hr' },
    { name: 'Solopreneur Kitchen', icon: '🍕', members: '890', unread: 7, earning: '$0.08/hr' },
    { name: 'AI Builders Club', icon: '🤖', members: '3.4K', unread: 32, earning: '$0.18/hr' },
  ];

  // Suggested content (TikTok discovery love)
  const discover = [
    { title: 'How to Start a SaaS in 2026', creator: '@buildinpublic', views: '45K', format: '🎬 Video', duration: '12 min' },
    { title: 'The Psychology of Pricing', creator: '@pricingnerds', views: '23K', format: '📝 Article', duration: '8 min' },
    { title: 'Street Food Tokyo', creator: '@wandereats', views: '89K', format: '📸 Photo Series', duration: '24 photos' },
    { title: 'Rust for JavaScript Devs', creator: '@rustacean', views: '18K', format: '🎬 Tutorial', duration: '22 min' },
  ];

  const colors = {
    bg: '#060a13', surface: '#0c1220', card: '#111a2a', elevated: '#172035',
    border: 'rgba(71,85,105,0.18)', borderHover: 'rgba(71,85,105,0.35)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#f59e0b', red: '#ef4444', purple: '#a78bfa',
    text: '#e8ecf4', sub: '#94a3b8', dim: '#5a6577',
  };

  const font = "'Outfit', sans-serif";
  const mono = "'JetBrains Mono', monospace";

  const toggleLike = (id) => {
    setLikedPosts(p => ({ ...p, [id]: !p[id] }));
    if (!likedPosts[id]) {
      setNotification('+0.05 HOURS for engaging');
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const toggleSave = (id) => setSavedPosts(p => ({ ...p, [id]: !p[id] }));

  // ─── Compose Modal ───
  const ComposeModal = () => (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 20, width: '100%', maxWidth: 560, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: font, margin: 0 }}>Create Something</h3>
          <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', color: colors.dim, fontSize: 22, cursor: 'pointer' }}>×</button>
        </div>
        {/* Format selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { id: 'text', icon: '📝', label: 'Post' },
            { id: 'image', icon: '📸', label: 'Photo' },
            { id: 'video', icon: '🎬', label: 'Video' },
            { id: 'article', icon: '📰', label: 'Article' },
            { id: 'poll', icon: '🗳️', label: 'Poll' },
            { id: 'audio', icon: '🎙️', label: 'Audio' },
            { id: 'product', icon: '🛍️', label: 'Product' },
            { id: 'event', icon: '📅', label: 'Event' },
          ].map(f => (
            <button key={f.id} onClick={() => setComposeType(f.id)} style={{
              padding: '8px 14px', borderRadius: 20, whiteSpace: 'nowrap',
              border: composeType === f.id ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
              background: composeType === f.id ? `${colors.primary}15` : 'transparent',
              color: composeType === f.id ? '#fff' : colors.sub, fontSize: 12, cursor: 'pointer', fontFamily: font, fontWeight: 500,
            }}>{f.icon} {f.label}</button>
          ))}
        </div>
        {/* Compose area */}
        <div style={{ background: colors.card, borderRadius: 14, padding: 16, marginBottom: 16, minHeight: 120 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{me.avatar}</div>
            <div style={{ flex: 1, color: colors.dim, fontSize: 14, fontFamily: font, lineHeight: 1.6 }}>
              What's on your mind? Every post earns HOURS...
            </div>
          </div>
        </div>
        {/* HOURS estimate */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11, color: colors.dim, fontFamily: font }}>
            <span style={{ color: colors.gold }}>⏱️</span> Est. earnings: <span style={{ color: colors.gold, fontWeight: 600 }}>+0.5 - 2.0 HOURS</span> based on engagement*
          </div>
          <button style={{ padding: '10px 28px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: font }}>Post</button>
        </div>
      </div>
    </div>
  );

  // ─── Story Viewer ───
  const StoryViewer = ({ story }) => (
    <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        <button onClick={() => setShowStory(null)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
      </div>
      <div style={{ fontSize: 120, marginBottom: 16 }}>{story.avatar}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: '#fff', fontFamily: font }}>{story.user}'s Story</div>
      <div style={{ fontSize: 12, color: colors.gold, marginTop: 8, fontFamily: font }}>Viewing this story earns {story.earnings}</div>
    </div>
  );

  // ─── Post Card ───
  const PostCard = ({ post }) => {
    const liked = likedPosts[post.id];
    const saved = savedPosts[post.id];
    const expanded = expandedPost === post.id;
    return (
      <div style={{
        background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 18,
        padding: 0, marginBottom: 12, overflow: 'hidden', transition: 'border-color 0.2s',
      }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: colors.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{post.avatar}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: 14, fontFamily: font }}>{post.user}</span>
              {post.verified && <span style={{ fontSize: 10, background: `${colors.primary}22`, color: colors.primary, padding: '1px 5px', borderRadius: 4 }}>✓</span>}
              <span style={{ fontSize: 11, color: colors.dim, fontFamily: font }}>{post.handle}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 9, background: `${colors.accent}18`, color: colors.accent, padding: '1px 6px', borderRadius: 4, fontFamily: font, fontWeight: 600 }}>👤 Human • 🛡️{post.trust}</span>
              <span style={{ fontSize: 10, color: colors.dim }}>{post.time}</span>
            </div>
          </div>
          {post.hours > 0 && showEarnings && (
            <div style={{ background: `${colors.gold}12`, border: `1px solid ${colors.gold}25`, borderRadius: 10, padding: '4px 10px', textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.gold, fontFamily: mono }}>+{post.hours}</div>
              <div style={{ fontSize: 8, color: colors.dim, textTransform: 'uppercase' }}>HOURS</div>
            </div>
          )}
        </div>

        {/* Tag */}
        <div style={{ padding: '8px 18px 0' }}>
          <span style={{ background: `${post.tagColor}18`, color: post.tagColor, padding: '3px 10px', borderRadius: 8, fontSize: 10, fontWeight: 600, fontFamily: font }}>{post.tag}</span>
        </div>

        {/* Content */}
        <div style={{ padding: '10px 18px 0' }}>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: colors.text, fontFamily: font, margin: 0, whiteSpace: 'pre-wrap' }}>
            {expanded || post.content.length < 280 ? post.content : post.content.slice(0, 280) + '...'}
          </p>
          {post.content.length > 280 && !expanded && (
            <button onClick={() => setExpandedPost(post.id)} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 13, cursor: 'pointer', padding: '4px 0', fontFamily: font, fontWeight: 500 }}>Read more</button>
          )}
        </div>

        {/* Poll (Reddit/Twitter love) */}
        {post.pollOptions && (
          <div style={{ padding: '10px 18px 0' }}>
            {post.pollOptions.map((opt, i) => (
              <div key={i} style={{ marginBottom: 6, position: 'relative', borderRadius: 10, overflow: 'hidden', border: `1px solid ${colors.border}`, background: colors.card }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${opt.pct}%`, background: `${colors.primary}12`, borderRadius: 10 }} />
                <div style={{ position: 'relative', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontFamily: font, color: colors.text }}>{opt.text}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.primary, fontFamily: mono }}>{opt.pct}%</span>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: colors.dim, marginTop: 4, fontFamily: font }}>{post.totalVotes.toLocaleString()} votes • Voting earns +0.2 HOURS</div>
          </div>
        )}

        {/* Image placeholder */}
        {post.hasImage && (
          <div style={{ margin: '12px 18px 0', background: colors.card, borderRadius: 14, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.dim, fontSize: 13, fontFamily: font }}>{post.imageDesc}</span>
          </div>
        )}

        {/* Video placeholder */}
        {post.hasVideo && (
          <div style={{ margin: '12px 18px 0', background: '#000', borderRadius: 14, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', border: `1px solid ${colors.border}` }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, cursor: 'pointer' }}>▶</div>
            <span style={{ position: 'absolute', bottom: 10, right: 14, background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 6, fontSize: 11, color: '#fff', fontFamily: mono }}>{post.videoDuration}</span>
          </div>
        )}

        {/* Article card (YouTube/Medium long-form love) */}
        {post.hasArticle && (
          <div style={{ margin: '12px 18px 0', background: `linear-gradient(135deg, ${colors.card}, ${colors.elevated})`, borderRadius: 14, padding: 18, border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: font, color: colors.text, marginBottom: 6 }}>{post.articleTitle}</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11, color: colors.dim, fontFamily: font }}>
              <span>📖 {post.readTime} read</span>
              <span style={{ color: colors.gold }}>⏱️ +0.8 HOURS for reading</span>
            </div>
          </div>
        )}

        {/* Product card (Instagram Shopping love) */}
        {post.hasProduct && (
          <div style={{ margin: '12px 18px 0', background: `${colors.accent}08`, borderRadius: 14, padding: 16, border: `1px solid ${colors.accent}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, fontFamily: font, color: colors.text }}>{post.productName}</div>
              <div style={{ fontSize: 11, color: colors.dim, fontFamily: font, marginTop: 2 }}>Creator keeps ~$37.05 of each sale*</div>
            </div>
            <div style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, padding: '8px 18px', borderRadius: 10, fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: font }}>${post.productPrice}</div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 0, padding: '12px 10px 12px', borderTop: `1px solid ${colors.border}`, marginTop: 12 }}>
          {[
            { icon: liked ? '❤️' : '🤍', label: liked ? (post.likes + 1) : post.likes, action: () => toggleLike(post.id), active: liked, color: colors.red },
            { icon: '💬', label: post.comments, action: () => {}, active: false },
            { icon: '🔄', label: post.shares, action: () => {}, active: false },
            { icon: saved ? '🔖' : '📌', label: 'Save', action: () => toggleSave(post.id), active: saved, color: colors.gold },
            { icon: '💸', label: 'Tip', action: () => {}, active: false, color: colors.accent },
          ].map((a, i) => (
            <button key={i} onClick={a.action} style={{
              flex: 1, background: 'none', border: 'none', color: a.active ? (a.color || colors.primary) : colors.dim,
              fontSize: 12, cursor: 'pointer', fontFamily: font, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, padding: '6px 0',
            }}>
              <span style={{ fontSize: 15 }}>{a.icon}</span>
              <span style={{ fontSize: 11 }}>{typeof a.label === 'number' ? a.label.toLocaleString() : a.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, color: colors.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @keyframes slideIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      {showCompose && <ComposeModal />}
      {showStory && <StoryViewer story={stories[showStory]} />}

      {/* ─── NOTIFICATION TOAST ─── */}
      {notification && (
        <div style={{ position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)', background: colors.gold, color: '#000', padding: '8px 20px', borderRadius: 24, fontSize: 13, fontWeight: 600, fontFamily: font, zIndex: 300, animation: 'slideIn 0.3s ease', boxShadow: `0 4px 24px ${colors.gold}44` }}>
          ⏱️ {notification}
        </div>
      )}

      {/* ═══ TOP BAR ═══ */}
      <div style={{ position: 'sticky', top: 0, background: `${colors.bg}ee`, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${colors.border}`, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 26, fontWeight: 800, fontFamily: font, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* HOURS always visible — the candy */}
          <div style={{ background: `${colors.gold}10`, border: `1px solid ${colors.gold}25`, padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }} onClick={() => setActiveTab('wallet')}>
            <span style={{ fontSize: 14, fontWeight: 700, color: colors.gold, fontFamily: mono }}>{me.hours}</span>
            <span style={{ fontSize: 10, color: colors.dim }}>HOURS</span>
            <span style={{ fontSize: 10, color: colors.accent }}>≈${me.usd.toFixed(2)}*</span>
          </div>
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: colors.red }} />
          </div>
          <span style={{ fontSize: 10, background: `${colors.accent}22`, color: colors.accent, padding: '2px 8px', borderRadius: 8, fontFamily: font, fontWeight: 600 }}>🔥{me.streak}d</span>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>{me.avatar}</div>
        </div>
      </div>

      {/* ═══ MAIN NAV ═══ */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, background: colors.surface, overflowX: 'auto' }}>
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'discover', icon: '🔍', label: 'Discover' },
          { id: 'groups', icon: '👥', label: 'Groups' },
          { id: 'market', icon: '🛍️', label: 'Market' },
          { id: 'messages', icon: '💬', label: 'Messages' },
          { id: 'wallet', icon: '💰', label: 'Wallet' },
        ].map(n => (
          <button key={n.id} onClick={() => setActiveTab(n.id)} style={{
            flex: 1, minWidth: 56, padding: '11px 2px', border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            color: activeTab === n.id ? colors.primary : colors.dim, fontSize: 10, fontWeight: 600, fontFamily: font,
            borderBottom: `2px solid ${activeTab === n.id ? colors.primary : 'transparent'}`, transition: 'all 0.2s',
          }}>
            <div style={{ fontSize: 16 }}>{n.icon}</div>
            {n.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', gap: 0 }}>

        {/* ═══ MAIN COLUMN ═══ */}
        <div style={{ flex: 1, maxWidth: 640, margin: '0 auto', padding: '0 12px' }}>

          {activeTab === 'home' && (
            <div style={{ paddingTop: 12 }}>

              {/* ─── STORIES ROW (Instagram/Snapchat love) ─── */}
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, marginBottom: 4 }}>
                {stories.map(s => (
                  <div key={s.id} onClick={() => s.hasStory && setShowStory(s.id)} style={{ textAlign: 'center', cursor: s.hasStory ? 'pointer' : 'default', flexShrink: 0 }}>
                    <div style={{
                      width: 58, height: 58, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                      background: s.isMine ? colors.card : 'transparent',
                      border: s.isMine ? `2px dashed ${colors.dim}` : s.hasStory && !s.seen ? `3px solid ${colors.primary}` : `2px solid ${colors.border}`,
                    }}>{s.avatar}</div>
                    <div style={{ fontSize: 10, color: s.hasStory && !s.seen ? colors.text : colors.dim, marginTop: 4, fontFamily: font, fontWeight: 500 }}>{s.user}</div>
                    {s.earnings && showEarnings && <div style={{ fontSize: 8, color: colors.gold, fontFamily: mono }}>{s.earnings}</div>}
                  </div>
                ))}
              </div>

              {/* ─── COMPOSE BAR ─── */}
              <div onClick={() => setShowCompose(true)} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{me.avatar}</div>
                <span style={{ color: colors.dim, fontSize: 14, fontFamily: font, flex: 1 }}>What's happening? Every post earns HOURS...</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['📸', '🎬', '📊', '🛍️'].map((e, i) => <span key={i} style={{ fontSize: 18, opacity: 0.5 }}>{e}</span>)}
                </div>
              </div>

              {/* ─── FEED MODE SWITCHER (solves Algorithm Manipulation) ─── */}
              <div style={{ display: 'flex', gap: 0, marginBottom: 12, background: colors.surface, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
                {[
                  { id: 'following', label: '🕐 Following', desc: 'Chronological from people you follow' },
                  { id: 'discover', label: '✨ Discover', desc: 'Algorithmic recommendations' },
                  { id: 'trending', label: '🔥 Trending', desc: 'What the community is talking about' },
                ].map(m => (
                  <button key={m.id} onClick={() => setFeedMode(m.id)} title={m.desc} style={{
                    flex: 1, padding: '10px 8px', border: 'none', cursor: 'pointer', fontFamily: font, fontWeight: 600, fontSize: 11,
                    background: feedMode === m.id ? `${colors.primary}15` : 'transparent',
                    color: feedMode === m.id ? colors.primary : colors.dim,
                    borderBottom: `2px solid ${feedMode === m.id ? colors.primary : 'transparent'}`,
                  }}>{m.label}</button>
                ))}
              </div>

              {/* ─── DAILY EARNINGS CARD ─── */}
              {showEarnings && (
                <div style={{ background: `linear-gradient(135deg, ${colors.gold}08, ${colors.accent}08)`, border: `1px solid ${colors.gold}20`, borderRadius: 14, padding: '12px 16px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, color: colors.dim, fontFamily: font, fontWeight: 500 }}>Today's HOURS</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 22, fontWeight: 700, color: colors.gold, fontFamily: mono }}>+4.7</span>
                      <span style={{ fontSize: 11, color: colors.accent }}>≈ $0.94 est.*</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 10, color: colors.sub, fontFamily: font }}>
                    <div style={{ textAlign: 'center' }}><div style={{ color: colors.primary, fontWeight: 700, fontSize: 14 }}>3</div>posts</div>
                    <div style={{ textAlign: 'center' }}><div style={{ color: colors.accent, fontWeight: 700, fontSize: 14 }}>12</div>comments</div>
                    <div style={{ textAlign: 'center' }}><div style={{ color: colors.purple, fontWeight: 700, fontSize: 14 }}>1</div>vote</div>
                  </div>
                  <button onClick={() => setShowEarnings(false)} style={{ background: 'none', border: 'none', color: colors.dim, fontSize: 14, cursor: 'pointer' }}>×</button>
                </div>
              )}

              {/* ─── THE FEED ─── */}
              {feedPosts.map(post => <PostCard key={post.id} post={post} />)}

              {/* ─── "You're caught up" (solves #10 Addiction) ─── */}
              <div style={{ textAlign: 'center', padding: '40px 20px 60px' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, fontFamily: font }}>You're all caught up</div>
                <div style={{ fontSize: 13, color: colors.sub, marginTop: 6, fontFamily: font, lineHeight: 1.6 }}>You've seen everything from people you follow today.</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, fontSize: 12, fontFamily: font }}>
                  <div style={{ color: colors.gold }}>⏱️ Time on OURS today: 18 min</div>
                  <div style={{ color: colors.accent }}>📈 HOURS earned: +4.7</div>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <button onClick={() => setFeedMode('discover')} style={{ padding: '10px 20px', borderRadius: 12, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.primary, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font }}>✨ Explore Discover feed</button>
                  <button style={{ padding: '10px 20px', borderRadius: 12, border: `1px solid ${colors.border}`, background: 'transparent', color: colors.sub, fontSize: 13, cursor: 'pointer', fontFamily: font }}>📴 Done for now</button>
                </div>
                <div style={{ fontSize: 9, color: colors.dim, marginTop: 16, fontFamily: font }}>*All earnings are estimates based on current platform revenue. Individual results vary. HOURS are not a guarantee of income.</div>
              </div>
            </div>
          )}

          {/* ═══ DISCOVER TAB ═══ */}
          {activeTab === 'discover' && (
            <div style={{ paddingTop: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: font, margin: '0 0 4px' }}>Discover</h2>
              <p style={{ fontSize: 12, color: colors.sub, fontFamily: font, margin: '0 0 16px' }}>Content picked for you • Everything earns HOURS • Human-first</p>

              {/* Trending topics */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 0, marginBottom: 10, borderBottom: `1px solid ${colors.border}` }}>
                  {['topics', 'creators', 'audio'].map(t => (
                    <button key={t} onClick={() => setTrendingTab(t)} style={{
                      padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
                      color: trendingTab === t ? colors.primary : colors.dim, fontSize: 12, fontWeight: 600, fontFamily: font,
                      borderBottom: `2px solid ${trendingTab === t ? colors.primary : 'transparent'}`,
                      textTransform: 'capitalize',
                    }}>{t === 'topics' ? '🔥 ' : t === 'creators' ? '⭐ ' : '🎵 '}{t}</button>
                  ))}
                </div>
                {trending.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: colors.dim, fontFamily: mono, width: 24 }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, fontFamily: font }}>{t.topic}</div>
                      <div style={{ fontSize: 11, color: colors.dim, fontFamily: font }}>{t.category} • {t.posts} posts</div>
                    </div>
                    <span style={{ fontSize: 10, color: colors.gold, fontFamily: font }}>+HOURS</span>
                  </div>
                ))}
              </div>

              {/* Recommended content — mixed format */}
              <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: font, marginBottom: 10, color: colors.sub }}>FOR YOU</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {discover.map((d, i) => (
                  <div key={i} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 14, overflow: 'hidden', cursor: 'pointer' }}>
                    <div style={{ height: 100, background: `linear-gradient(135deg, ${[colors.primary, colors.accent, colors.gold, colors.purple][i]}15, ${colors.card})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 32 }}>{d.format.split(' ')[0]}</span>
                    </div>
                    <div style={{ padding: 12 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, fontFamily: font, lineHeight: 1.3, marginBottom: 6 }}>{d.title}</div>
                      <div style={{ fontSize: 10, color: colors.dim, fontFamily: font }}>{d.creator} • {d.views} views • {d.duration}</div>
                      <div style={{ fontSize: 9, color: colors.gold, marginTop: 4, fontFamily: font }}>⏱️ Watching earns HOURS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ GROUPS TAB ═══ */}
          {activeTab === 'groups' && (
            <div style={{ paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: font, margin: 0 }}>Your Groups</h2>
                  <p style={{ fontSize: 12, color: colors.sub, fontFamily: font, margin: '2px 0 0' }}>Communities where everyone earns • Shared treasuries • Elected mods</p>
                </div>
                <button style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${colors.primary}`, background: 'transparent', color: colors.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: font }}>+ Create Group</button>
              </div>
              {myGroups.map((g, i) => (
                <div key={i} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: colors.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{g.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, fontFamily: font }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: colors.sub, fontFamily: font, marginTop: 2 }}>{g.members} members</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {g.unread > 0 && <div style={{ background: colors.primary, color: '#fff', borderRadius: 10, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginBottom: 4, display: 'inline-block' }}>{g.unread}</div>}
                    <div style={{ fontSize: 11, color: colors.gold, fontFamily: font }}>{g.earning} avg*</div>
                  </div>
                </div>
              ))}
              <div style={{ background: `${colors.purple}08`, border: `1px solid ${colors.purple}20`, borderRadius: 14, padding: 16, marginTop: 12 }}>
                <div style={{ fontWeight: 600, color: colors.purple, fontSize: 14, fontFamily: font, marginBottom: 4 }}>🏛️ How Group Earnings Work</div>
                <div style={{ fontSize: 12, color: colors.sub, lineHeight: 1.6, fontFamily: font }}>When people engage in your group, the group earns HOURS collectively. Earnings are shared among active members proportional to their contributions. Groups elect their own moderators — and mods earn HOURS for keeping the community healthy.*</div>
              </div>
            </div>
          )}

          {/* ═══ MARKET TAB ═══ */}
          {activeTab === 'market' && (
            <div style={{ paddingTop: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: font, margin: '0 0 4px' }}>Marketplace</h2>
              <p style={{ fontSize: 12, color: colors.sub, fontFamily: font, margin: '0 0 16px' }}>Creator storefronts • Target: up to ~95% to creators* • Transparent reviews • Verified purchases</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { title: 'Complete Python Bootcamp', seller: '@sarahbuilds', price: 29, rating: 4.8, sales: 142, icon: '📚', rev: '$27.55' },
                  { title: '30-Day HIIT Program', seller: '@marcusfitness', price: 19, rating: 4.9, sales: 89, icon: '💪', rev: '$18.05' },
                  { title: 'Recipe Collection: Asian Fusion', seller: '@priyacooks', price: 12, rating: 4.7, sales: 234, icon: '🍜', rev: '$11.40' },
                  { title: 'SaaS Dashboard UI Kit', seller: '@alexdesigns', price: 49, rating: 4.6, sales: 67, icon: '🎨', rev: '$46.55' },
                  { title: 'SEO Mastery Guide 2026', seller: '@growthhacker', price: 39, rating: 4.5, sales: 156, icon: '📊', rev: '$37.05' },
                  { title: 'Meditation Audio Pack', seller: '@zenmaster', price: 15, rating: 4.9, sales: 312, icon: '🧘', rev: '$14.25' },
                ].map((item, i) => (
                  <div key={i} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 16, cursor: 'pointer' }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 13, fontFamily: font, lineHeight: 1.3, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: colors.dim, fontFamily: font, marginBottom: 8 }}>by {item.seller}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: colors.accent, fontFamily: font }}>${item.price}</span>
                      <span style={{ fontSize: 10, color: colors.sub }}>⭐ {item.rating} • {item.sales} sold</span>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 9, color: colors.dim, fontFamily: font }}>Creator receives ~{item.rev}/sale*</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ MESSAGES TAB ═══ */}
          {activeTab === 'messages' && (
            <div style={{ paddingTop: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: font, margin: '0 0 4px' }}>Messages</h2>
              <p style={{ fontSize: 12, color: colors.sub, fontFamily: font, margin: '0 0 16px' }}>🔐 End-to-end encrypted • Not mined for ads • Yours</p>
              {[
                { user: 'Sarah Chen', avatar: '👩‍💻', msg: 'Hey! Saw your post about the affiliate setup, want to collab on a guide?', time: '12m', unread: true },
                { user: 'AI Builders Club', avatar: '🤖', msg: 'Dev K: Has anyone tried the new MCP integration with...', time: '1h', unread: true, isGroup: true },
                { user: 'Marcus Johnson', avatar: '💪', msg: 'Thanks for the shoutout! 🙏', time: '3h', unread: false },
                { user: 'OURS Support', avatar: '✊', msg: 'Your storefront has been approved! You can now list...', time: '5h', unread: false, isOfficial: true },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: colors.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, position: 'relative' }}>
                    {m.avatar}
                    {m.unread && <div style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: colors.primary, border: `2px solid ${colors.bg}` }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <span style={{ fontWeight: m.unread ? 700 : 500, fontSize: 14, fontFamily: font }}>{m.user}</span>
                      {m.isGroup && <span style={{ fontSize: 9, background: `${colors.purple}22`, color: colors.purple, padding: '1px 5px', borderRadius: 4 }}>Group</span>}
                      {m.isOfficial && <span style={{ fontSize: 9, background: `${colors.primary}22`, color: colors.primary, padding: '1px 5px', borderRadius: 4 }}>Official</span>}
                    </div>
                    <div style={{ fontSize: 12, color: m.unread ? colors.text : colors.dim, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.msg}</div>
                  </div>
                  <span style={{ fontSize: 10, color: colors.dim, flexShrink: 0, fontFamily: font }}>{m.time}</span>
                </div>
              ))}
              <div style={{ background: `${colors.accent}08`, borderRadius: 12, padding: 14, marginTop: 16, border: `1px solid ${colors.accent}20` }}>
                <div style={{ fontSize: 12, fontFamily: font, color: colors.sub, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 600, color: colors.accent }}>🔐 Your messages are yours.</span> End-to-end encrypted. Not scanned for ad targeting. Not used to train AI models. Not sold to third parties. Just private conversations between humans.
                </div>
              </div>
            </div>
          )}

          {/* ═══ WALLET TAB ═══ */}
          {activeTab === 'wallet' && (
            <div style={{ paddingTop: 16 }}>
              <div style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`, borderRadius: 20, padding: 28, marginBottom: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 2, fontFamily: font }}>Total HOURS Balance</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: font }}>{me.hours}</div>
                <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontFamily: font }}>≈ ${me.usd.toFixed(2)} USD estimated*</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 16px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Level</div>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: font }}>🏅 {me.level}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 16px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Trust</div>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: font }}>🛡️ {me.trust}</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '6px 16px' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>Streak</div>
                    <div style={{ fontSize: 14, fontWeight: 700, fontFamily: font }}>🔥 {me.streak}d</div>
                  </div>
                </div>
              </div>

              <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: font, marginBottom: 10 }}>Where Your HOURS Come From</h3>
              {[
                { source: 'Content Creation', hours: 82.3, pct: 58, color: colors.primary, icon: '📝' },
                { source: 'Group Engagement', hours: 41.2, pct: 29, color: colors.accent, icon: '👥' },
                { source: 'Storefront Sales', hours: 12.0, pct: 8, color: colors.gold, icon: '🛍️' },
                { source: 'Moderation', hours: 7.0, pct: 5, color: colors.purple, icon: '🛡️' },
              ].map((s, i) => (
                <div key={i} style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: 14, marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: font, fontWeight: 600, fontSize: 13 }}>{s.icon} {s.source}</span>
                    <span style={{ fontFamily: mono, fontWeight: 600, fontSize: 13, color: s.color }}>{s.hours} hrs ({s.pct}%)</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: colors.card, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 9, color: colors.dim, fontFamily: font, marginTop: 12, lineHeight: 1.6, padding: '0 4px' }}>
                *HOURS earnings are estimates based on current platform revenue and your proportional share. Actual payouts depend on total platform ad revenue, number of active users, and other factors. HOURS are not a cryptocurrency, security, or investment vehicle. Past performance is not indicative of future results.
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT SIDEBAR (Desktop) ═══ */}
        <div style={{ width: 280, padding: '16px 12px 16px 0', display: 'none' }}>
          {/* This would show on desktop — trending, groups, etc. */}
        </div>
      </div>
    </div>
  );
};

export default OursHome;
