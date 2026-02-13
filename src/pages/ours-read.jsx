import React, { useState, useEffect } from 'react';

const OursRead = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('foryou');
  const [mounted, setMounted] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedWriter, setSelectedWriter] = useState(null);
  const [liked, setLiked] = useState({});
  const [saved, setSaved] = useState({});
  const [following, setFollowing] = useState({ '@priyacooks': true });
  const [showTipSheet, setShowTipSheet] = useState(false);
  const [tipAmount, setTipAmount] = useState(null);
  const [readProgress, setReadProgress] = useState(0);
  const [highlights, setHighlights] = useState({});
  const [expandedThread, setExpandedThread] = useState(null);
  const [writerTab, setWriterTab] = useState('articles');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (view === 'reader') {
      const interval = setInterval(() => setReadProgress(p => p >= 100 ? 100 : p + 2), 300);
      return () => clearInterval(interval);
    }
  }, [view]);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    read: '#0ea5e9',
  };
  const f = (family = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[family]);

  const writers = {
    '@priyacooks': { name: 'Priya Sharma', avatar: '🍳', verified: true, handle: '@priyacooks', subscribers: '34.2K', articles: 89, bio: 'Food writer. Recipe developer. Former restaurant critic. Now I write about the intersection of food, culture, and building in public.', tier: '⚡ Builder', hours: '8,900', monthlyEarnings: '2,100', tags: ['#food', '#culture', '#writing'] },
    '@growthlabs': { name: 'Growth Labs', avatar: '📈', verified: true, handle: '@growthlabs', subscribers: '67.8K', articles: 234, bio: 'Data-driven growth analysis. We dissect what works, what fails, and why. No fluff, just signal.', tier: '🏗️ Architect', hours: '28,400', monthlyEarnings: '6,800', tags: ['#growth', '#analytics', '#strategy'] },
    '@sarahmakes': { name: 'Sarah Chen', avatar: '✍️', verified: true, handle: '@sarahmakes', subscribers: '23.1K', articles: 56, bio: 'Product designer turned writer. I write about design systems, creative process, and making things that matter.', tier: '🔥 Creator', hours: '4,200', monthlyEarnings: '1,100', tags: ['#design', '#creative', '#product'] },
    '@marcusj': { name: 'Marcus Johnson', avatar: '🧠', verified: false, handle: '@marcusj', subscribers: '12.4K', articles: 42, bio: 'Philosophy grad student writing about ethics, technology, and why we build what we build.', tier: '🔥 Creator', hours: '2,800', monthlyEarnings: '680', tags: ['#philosophy', '#ethics', '#tech'] },
    '@devnotes': { name: 'Dev Notes', avatar: '💻', verified: true, handle: '@devnotes', subscribers: '89.3K', articles: 312, bio: 'Technical deep-dives for working developers. Architecture decisions, postmortems, and lessons from production.', tier: '🏗️ Architect', hours: '42,000', monthlyEarnings: '9,400', tags: ['#engineering', '#architecture', '#devops'] },
  };

  const articles = [
    { id: 'a1', type: 'article', title: 'Why 500K Followers Meant $0 Revenue', subtitle: 'The influencer economy is a lie. Here are the receipts.', writer: '@priyacooks', readTime: '10 min', reads: '12.4K', likes: 2340, comments: 189, tips: 340, published: '2d ago', premium: false, trending: true,
      body: `I had 500,000 followers across three platforms. Brand deals were coming in. My DMs were full of "collab?" messages.\n\nAnd my bank account? $247 for the entire month of January.\n\nLet me break down exactly where the money went — and didn't go:\n\n## The Brand Deal Myth\n\nOut of 12 brand inquiries that month, 8 wanted "exposure" trades. 3 offered rates below minimum wage when you calculated hours spent. 1 actually paid — $247 after the agency took their cut.\n\n## The Platform Cut\n\nInstagram: $0 (no direct monetization for my tier)\nYouTube: $42 (AdSense, but most of my content was Shorts)\nTikTok: $18 (Creator Fund, which pays less than a lemonade stand)\n\nTotal platform revenue: $60. For content that took 120+ hours to create.\n\n## The Real Cost\n\nEquipment: $200/month (camera payments, lighting, software)\nTime: 120 hours minimum = $0.50/hour effective rate\nMental health: Priceless (in the worst way)\n\n## What Changed\n\nThen I found OURS. First month: 2,340 HOURS earned. Direct tips from readers. No algorithm throttling. No brand deals needed.\n\nThe difference? On OURS, the reader IS the revenue model. Not advertisers. Not brands. Readers.\n\n## The Numbers Now\n\nMonth 1 on OURS: 2,340 HRS earned\nMonth 2: 4,100 HRS earned\nMonth 3: 6,890 HRS earned (and growing)\n\nFor the first time, my income comes from the people who actually read my work.*\n\n---\n*HOURS are internal platform credits. Earning rates are illustrative, not guaranteed.`,
      toc: ['The Brand Deal Myth', 'The Platform Cut', 'The Real Cost', 'What Changed', 'The Numbers Now'],
      tags: ['#creator-economy', '#monetization', '#transparency'] },
    { id: 'a2', type: 'article', title: 'The Death of Organic Reach — And What Comes Next', subtitle: 'A data analysis of 10,000 creator accounts across 5 platforms.', writer: '@growthlabs', readTime: '7 min', reads: '8.2K', likes: 1890, comments: 245, tips: 560, published: '3d ago', premium: false, trending: true,
      body: 'We analyzed 10,000 creator accounts across Instagram, TikTok, YouTube, Twitter, and LinkedIn over 6 months. The results are stark...',
      toc: ['Methodology', 'The Decline Curve', 'Platform Comparison', 'The Pay-to-Play Shift', 'Alternatives'],
      tags: ['#data', '#growth', '#platforms'] },
    { id: 'a3', type: 'article', title: 'Design Systems Are Gardens, Not Buildings', subtitle: 'Why the architecture metaphor fails — and what works better.', writer: '@sarahmakes', readTime: '12 min', reads: '5.6K', likes: 980, comments: 67, tips: 120, published: '5d ago', premium: false,
      body: 'Every design system talk I\'ve seen uses architecture metaphors. Foundations. Pillars. Building blocks. But design systems aren\'t buildings — they\'re gardens...',
      toc: ['The Building Fallacy', 'Why Gardens Work', 'Pruning vs. Demolishing', 'Seasons of Change', 'Tending Your System'],
      tags: ['#design', '#systems', '#metaphor'] },
    { id: 'a4', type: 'article', title: 'The Moral Weight of Algorithms', subtitle: 'When recommendation engines shape reality, who bears responsibility?', writer: '@marcusj', readTime: '15 min', reads: '3.2K', likes: 670, comments: 134, tips: 89, published: '1w ago', premium: false,
      body: 'A teenager spends 4 hours watching increasingly extreme content. The algorithm served each video. Who is responsible?...',
      toc: ['The Amplification Problem', 'Moral Agency in Code', 'The Designer\'s Dilemma', 'Toward Ethical Feeds', 'What OURS Does Differently'],
      tags: ['#ethics', '#algorithms', '#philosophy'] },
    { id: 'a5', type: 'article', title: 'How We Scaled to 1M WebSocket Connections on $50/Month', subtitle: 'A technical deep-dive into our real-time infrastructure.', writer: '@devnotes', readTime: '18 min', reads: '23.1K', likes: 4500, comments: 890, tips: 1200, published: '4d ago', premium: true, trending: true,
      body: 'When our real-time messaging hit 100K concurrent connections, everything broke. Here\'s exactly how we rebuilt it to handle 1M on a $50/month Hetzner box...',
      toc: ['The Breaking Point', 'Architecture v1 (What Failed)', 'The Rewrite', 'Connection Pooling', 'Message Fanout', 'The $50 Stack', 'Benchmarks'],
      tags: ['#engineering', '#websocket', '#scaling'] },
  ];

  const threads = [
    { id: 't1', type: 'thread', title: '🧵 10 things I learned burning through $200K in VC money', writer: '@growthlabs', posts: 12, reads: '45K', likes: 8900, published: '1d ago', trending: true,
      preview: ['Raised $200K pre-seed in 2024. Burned through it in 8 months. Here\'s what I\'d do differently:', '1/ We hired too fast. 3 engineers before we had product-market fit. Each one cost $15K/month all-in. That\'s $45K/month burn rate with zero revenue.', '2/ We built for scale before we had users. Kubernetes cluster for 12 users. A $400/month database for 200 rows of data.'],
      tags: ['#startup', '#lessons', '#vc'] },
    { id: 't2', type: 'thread', title: '🧵 Why every recipe blog is 2000 words of backstory (it\'s not what you think)', writer: '@priyacooks', posts: 8, reads: '18K', likes: 3400, published: '3d ago',
      preview: ['You know those recipe blogs where you scroll through someone\'s life story to get to the actual recipe? Everyone hates it. But here\'s why it exists:', '1/ Google SEO requires 1500+ words to rank. A recipe alone is ~200 words. So bloggers HAVE to pad.', '2/ Ad revenue is per-pageview, and longer pages = more ad slots = more money. The recipe is a vehicle for ads.'],
      tags: ['#food', '#seo', '#explained'] },
    { id: 't3', type: 'thread', title: '🧵 I reviewed 500 junior developer portfolios. Here are the 5 patterns that get interviews.', writer: '@devnotes', posts: 7, reads: '67K', likes: 12000, published: '2d ago', trending: true,
      preview: ['After reviewing 500 junior dev portfolios for our team, clear patterns emerged. Here are the 5 things that actually got people interviews:', '1/ REAL projects, not todo apps. The best candidates built something they actually used. A budgeting tool they use daily beats a tutorial clone every time.'],
      tags: ['#careers', '#webdev', '#hiring'] },
  ];

  const newsletters = [
    { id: 'n1', title: 'The Weekly Bite', writer: '@priyacooks', subscribers: '12.4K', frequency: 'Weekly', description: 'One recipe, one food story, one restaurant review. Every Friday.', latest: 'Issue #47: The Perfect Congee', free: true },
    { id: 'n2', title: 'Signal vs. Noise', writer: '@growthlabs', subscribers: '34.8K', frequency: 'Weekly', description: 'Data-driven analysis of what\'s actually working in growth. No hype.', latest: 'Issue #112: TikTok Shop Economics', free: false, price: '5 HRS/mo' },
    { id: 'n3', title: 'Production Notes', writer: '@devnotes', subscribers: '56.2K', frequency: 'Bi-weekly', description: 'Technical deep-dives from production systems. Postmortems, architecture decisions, and war stories.', latest: 'Issue #89: The Day Redis Ate Our Data', free: false, price: '10 HRS/mo' },
  ];

  const allContent = [...articles, ...threads];
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  // ═══ ARTICLE CARD ═══
  const ArticleCard = ({ article, index = 0 }) => {
    const w = writers[article.writer] || { name: article.writer, avatar: '✍️' };
    const isThread = article.type === 'thread';
    return (
      <div onClick={() => { setSelectedArticle(article); setView(isThread ? 'thread' : 'reader'); setReadProgress(0); }} style={{
        padding: 16, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`,
        cursor: 'pointer', animation: `slideUp 0.3s ease ${index * 0.05}s both`,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{w.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{w.name}</span>
              {w.verified && <span style={{ fontSize: 7, color: T.primary }}>✓</span>}
            </div>
            <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{article.published}</span>
          </div>
          {article.trending && <span style={{ fontSize: 8, fontWeight: 700, color: T.orange, background: `${T.orange}15`, padding: '2px 6px', borderRadius: 4, fontFamily: f('mono') }}>🔥 Trending</span>}
          {article.premium && <span style={{ fontSize: 8, fontWeight: 700, color: T.gold, background: `${T.gold}15`, padding: '2px 6px', borderRadius: 4, fontFamily: f('mono') }}>⏣ Premium</span>}
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(isThread ? 'body' : 'display'), lineHeight: 1.3, marginBottom: 4 }}>{article.title}</div>
        {article.subtitle && <div style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 8 }}>{article.subtitle}</div>}
        {isThread && article.preview && (
          <div style={{ padding: 10, borderRadius: 10, background: T.card, borderLeft: `3px solid ${T.read}`, marginBottom: 8 }}>
            <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>{article.preview[0]}</p>
            <span style={{ fontSize: 10, color: T.read, fontFamily: f('mono'), marginTop: 4, display: 'block' }}>{article.posts} posts in thread →</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {article.readTime && <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>📖 {article.readTime}</span>}
          <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{isThread ? '👁️' : '📄'} {article.reads} reads</span>
          <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>❤️ {fmt(article.likes)}</span>
          <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>💬 {article.comments || 0}</span>
          {article.tips > 0 && <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono') }}>⏣ {article.tips} tipped*</span>}
        </div>
        {article.tags && <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>{article.tags.map(tag => <span key={tag} style={{ fontSize: 9, color: T.primary, fontFamily: f() }}>{tag}</span>)}</div>}
      </div>
    );
  };

  // ═══ HOME VIEW ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.read}, ${T.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Read</span>
            <span style={{ fontSize: 8, fontWeight: 700, fontFamily: f('mono'), background: `${T.read}15`, color: T.read, padding: '2px 6px', borderRadius: 4 }}>890 articles</span>
          </div>
          <button style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✏️</button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[{ id: 'foryou', label: 'For You' }, { id: 'following', label: 'Following' }, { id: 'trending', label: '🔥 Trending' }, { id: 'threads', label: '🧵 Threads' }, { id: 'newsletters', label: '📬 Newsletters' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '8px 14px', border: 'none', background: 'none', whiteSpace: 'nowrap',
              fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? T.text : T.dim,
              borderBottom: `2px solid ${activeTab === tab.id ? T.read : 'transparent'}`,
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px', paddingBottom: 100 }}>
        {/* FEATURED */}
        {activeTab === 'foryou' && articles[0] && (
          <div onClick={() => { setSelectedArticle(articles[0]); setView('reader'); setReadProgress(0); }} style={{
            padding: 20, borderRadius: 18, marginBottom: 16, cursor: 'pointer',
            background: `linear-gradient(135deg, ${T.read}15, ${T.primary}08)`,
            border: `1px solid ${T.read}25`, animation: 'slideUp 0.3s ease both',
          }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: T.read, fontFamily: f('mono'), letterSpacing: 2 }}>FEATURED</span>
            <div style={{ fontSize: 20, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, margin: '6px 0 4px' }}>{articles[0].title}</div>
            <div style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 8 }}>{articles[0].subtitle}</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{writers[articles[0].writer]?.name}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>· {articles[0].readTime} · {articles[0].reads} reads</span>
            </div>
          </div>
        )}

        {/* THREADS */}
        {(activeTab === 'foryou' || activeTab === 'threads') && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>🧵 THREADS</span>
              {activeTab === 'foryou' && <button onClick={() => setActiveTab('threads')} style={{ background: 'none', border: 'none', fontSize: 10, color: T.read, fontFamily: f(), fontWeight: 600 }}>See all →</button>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {threads.map((t, i) => <ArticleCard key={t.id} article={t} index={i} />)}
            </div>
          </div>
        )}

        {/* ARTICLES */}
        {(activeTab === 'foryou' || activeTab === 'following' || activeTab === 'trending') && (
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>📰 ARTICLES</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(activeTab === 'trending' ? articles.filter(a => a.trending) : articles.slice(1)).map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            </div>
          </div>
        )}

        {/* NEWSLETTERS */}
        {(activeTab === 'foryou' || activeTab === 'newsletters') && (
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>📬 NEWSLETTERS</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {newsletters.map((nl, i) => {
                const w = writers[nl.writer] || {};
                return (
                  <div key={nl.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.06}s both` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f() }}>{nl.title}</div>
                        <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>by {w.name} · {nl.frequency}</div>
                      </div>
                      {!nl.free && <span style={{ fontSize: 9, fontWeight: 700, color: T.gold, background: `${T.gold}12`, padding: '3px 8px', borderRadius: 6, fontFamily: f('mono') }}>⏣ {nl.price}</span>}
                    </div>
                    <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 6 }}>{nl.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{nl.subscribers} subscribers · Latest: {nl.latest}</span>
                      <button style={{ padding: '5px 12px', borderRadius: 8, border: 'none', background: T.read, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>Subscribe</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ READER VIEW ═══
  const ReaderView = () => {
    if (!selectedArticle) return null;
    const w = writers[selectedArticle.writer] || { name: selectedArticle.writer, avatar: '✍️' };
    const isLiked = liked[selectedArticle.id];
    const isSaved = saved[selectedArticle.id];
    return (
      <div>
        {/* Reading progress bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, height: 3, background: T.surface }}>
          <div style={{ height: '100%', background: T.read, width: `${readProgress}%`, transition: 'width 0.3s', maxWidth: 440, margin: '0 auto' }} />
        </div>
        {/* Header */}
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedArticle(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{selectedArticle.readTime} · {Math.round(readProgress)}% read</span>
          <button onClick={() => setSaved(p => ({ ...p, [selectedArticle.id]: !isSaved }))} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: isSaved ? `${T.read}15` : T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isSaved ? '🔖' : '📌'}</button>
        </div>

        <div style={{ padding: '20px 16px', paddingBottom: 100 }}>
          <div style={{ marginBottom: 16 }}>
            {selectedArticle.tags && <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>{selectedArticle.tags.map(tag => <span key={tag} style={{ fontSize: 9, color: T.read, fontFamily: f('mono') }}>{tag}</span>)}</div>}
            <h1 style={{ fontSize: 24, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, marginBottom: 6 }}>{selectedArticle.title}</h1>
            {selectedArticle.subtitle && <p style={{ fontSize: 14, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 12 }}>{selectedArticle.subtitle}</p>}
          </div>

          {/* Writer bar */}
          <div onClick={() => { setSelectedWriter(selectedArticle.writer); setView('writer'); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, marginBottom: 16, cursor: 'pointer' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{w.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{w.name}</span>
                {w.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              </div>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{w.subscribers} subscribers · {selectedArticle.published}</span>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setFollowing(p => ({ ...p, [selectedArticle.writer]: !following[selectedArticle.writer] })); }} style={{
              padding: '6px 14px', borderRadius: 8, border: following[selectedArticle.writer] ? `1px solid ${T.border}` : 'none',
              background: following[selectedArticle.writer] ? T.card : T.read, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f(),
            }}>{following[selectedArticle.writer] ? '✓' : 'Follow'}</button>
          </div>

          {/* Table of Contents */}
          {selectedArticle.toc && (
            <div style={{ padding: 12, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 16 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1, marginBottom: 6 }}>TABLE OF CONTENTS</div>
              {selectedArticle.toc.map((item, i) => (
                <div key={i} style={{ padding: '4px 0', fontSize: 11, color: T.read, fontFamily: f(), cursor: 'pointer' }}>→ {item}</div>
              ))}
            </div>
          )}

          {/* Article body */}
          <div style={{ fontSize: 14, color: T.text, fontFamily: f(), lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {selectedArticle.body?.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('## ')) return <h2 key={i} style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: f('display'), margin: '24px 0 12px' }}>{paragraph.replace('## ', '')}</h2>;
              if (paragraph.startsWith('---')) return <hr key={i} style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '20px 0' }} />;
              return <p key={i} style={{ marginBottom: 16 }}>{paragraph}</p>;
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, padding: '16px 0', borderTop: `1px solid ${T.border}`, marginTop: 20, flexWrap: 'wrap' }}>
            <button onClick={() => setLiked(p => ({ ...p, [selectedArticle.id]: !isLiked }))} style={{ padding: '8px 14px', borderRadius: 10, background: isLiked ? `${T.red}15` : T.surface, border: `1px solid ${isLiked ? `${T.red}40` : T.border}`, fontSize: 11, fontWeight: 600, color: isLiked ? T.red : T.sub, fontFamily: f(), display: 'flex', alignItems: 'center', gap: 4 }}>{isLiked ? '❤️' : '🤍'} {fmt(selectedArticle.likes + (isLiked ? 1 : 0))}</button>
            <button style={{ padding: '8px 14px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 600, color: T.sub, fontFamily: f(), display: 'flex', alignItems: 'center', gap: 4 }}>💬 {selectedArticle.comments || 0}</button>
            <button style={{ padding: '8px 14px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, fontSize: 11, fontWeight: 600, color: T.sub, fontFamily: f() }}>🔄 Share</button>
            <button onClick={() => setShowTipSheet(true)} style={{ padding: '8px 14px', borderRadius: 10, background: `${T.gold}10`, border: `1px solid ${T.gold}25`, fontSize: 11, fontWeight: 600, color: T.gold, fontFamily: f(), display: 'flex', alignItems: 'center', gap: 4 }}>⏣ Tip</button>
          </div>
        </div>
      </div>
    );
  };

  // ═══ THREAD VIEW ═══
  const ThreadView = () => {
    if (!selectedArticle) return null;
    const w = writers[selectedArticle.writer] || { name: selectedArticle.writer, avatar: '✍️' };
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedArticle(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>Thread · {selectedArticle.posts} posts</span>
          <div style={{ width: 32 }} />
        </div>
        <div style={{ padding: '12px 16px', paddingBottom: 100 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{w.avatar}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{w.name}</span>
                {w.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              </div>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{selectedArticle.published}</span>
            </div>
          </div>
          {selectedArticle.preview?.map((post, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {i === 0 ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.read, flexShrink: 0 }} /> : <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.dim, flexShrink: 0 }} />}
                {i < selectedArticle.preview.length - 1 && <div style={{ width: 2, flex: 1, background: `${T.read}30`, margin: '4px 0' }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: 16 }}>
                <p style={{ fontSize: 13, color: T.text, fontFamily: f(), lineHeight: 1.6, animation: `slideUp 0.3s ease ${i * 0.08}s both` }}>{post}</p>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', padding: '12px 0', borderTop: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 11, color: T.read, fontFamily: f(), fontWeight: 600 }}>Continue reading ({selectedArticle.posts - (selectedArticle.preview?.length || 0)} more posts) →</span>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '12px 0' }}>
            <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>❤️ {fmt(selectedArticle.likes)}</span>
            <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>👁️ {selectedArticle.reads} reads</span>
            <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>⏣ Tip</span>
          </div>
        </div>
      </div>
    );
  };

  // ═══ WRITER PROFILE ═══
  const WriterView = () => {
    const w = writers[selectedWriter];
    if (!w) return null;
    const writerArticles = articles.filter(a => a.writer === selectedWriter);
    const writerThreads = threads.filter(t => t.writer === selectedWriter);
    const writerNL = newsletters.filter(n => n.writer === selectedWriter);
    return (
      <div>
        <div style={{ width: '100%', height: 80, background: `linear-gradient(135deg, ${T.read}30, ${T.primary}15)`, position: 'relative' }}>
          <button onClick={() => { setView('home'); setSelectedWriter(null); }} style={{ position: 'absolute', top: 10, left: 10, width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(0,0,0,0.4)', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        </div>
        <div style={{ padding: '0 16px', marginTop: -24 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', marginBottom: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: `3px solid ${T.bg}` }}>{w.avatar}</div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: f() }}>{w.name}</span>
                {w.verified && <span style={{ fontSize: 10, color: T.primary }}>✓</span>}
              </div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{w.handle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            <div><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{w.subscribers}</div><div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Subscribers</div></div>
            <div><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{w.articles}</div><div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>Articles</div></div>
          </div>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 10 }}>{w.bio}</p>
          <div style={{ padding: 10, borderRadius: 12, background: `${T.gold}08`, border: `1px solid ${T.gold}20`, marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{ l: 'Tier', v: w.tier, c: T.primary }, { l: 'HOURS', v: w.hours, c: T.gold }, { l: 'Monthly*', v: `${w.monthlyEarnings} HRS`, c: T.accent }].map(s => (
                <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: s.c, fontFamily: f('mono') }}>{s.v}</div>
                  <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button onClick={() => setFollowing(p => ({ ...p, [selectedWriter]: !following[selectedWriter] }))} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: following[selectedWriter] ? `1px solid ${T.border}` : 'none', background: following[selectedWriter] ? T.card : T.read, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f() }}>{following[selectedWriter] ? '✓ Following' : 'Follow'}</button>
            <button onClick={() => setShowTipSheet(true)} style={{ padding: '10px 16px', borderRadius: 12, background: `${T.gold}12`, border: `1px solid ${T.gold}25`, fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f() }}>⏣ Tip</button>
          </div>
          <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
            {['articles', 'threads', 'newsletters'].map(tab => (
              <button key={tab} onClick={() => setWriterTab(tab)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontFamily: f(), fontSize: 12, fontWeight: writerTab === tab ? 700 : 500, color: writerTab === tab ? T.text : T.dim, borderBottom: `2px solid ${writerTab === tab ? T.read : 'transparent'}`, textTransform: 'capitalize' }}>{tab}</button>
            ))}
          </div>
          <div style={{ paddingBottom: 40 }}>
            {writerTab === 'articles' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{writerArticles.length ? writerArticles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />) : <div style={{ textAlign: 'center', padding: 20, color: T.dim, fontSize: 12 }}>No articles yet</div>}</div>}
            {writerTab === 'threads' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{writerThreads.length ? writerThreads.map((t, i) => <ArticleCard key={t.id} article={t} index={i} />) : <div style={{ textAlign: 'center', padding: 20, color: T.dim, fontSize: 12 }}>No threads yet</div>}</div>}
            {writerTab === 'newsletters' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{writerNL.length ? writerNL.map((nl, i) => (
              <div key={nl.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i*0.06}s both` }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f() }}>{nl.title}</div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), marginTop: 2 }}>{nl.frequency} · {nl.subscribers} subscribers</div>
                <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginTop: 6 }}>{nl.description}</p>
                <button style={{ marginTop: 8, padding: '6px 14px', borderRadius: 8, border: 'none', background: T.read, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>Subscribe{!nl.free ? ` · ${nl.price}` : ''}</button>
              </div>
            )) : <div style={{ textAlign: 'center', padding: 20, color: T.dim, fontSize: 12 }}>No newsletters</div>}</div>}
          </div>
        </div>
      </div>
    );
  };

  // ═══ TIP SHEET ═══
  const TipSheet = () => showTipSheet && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowTipSheet(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>⏣</span>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), marginTop: 4 }}>Tip this writer</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          {[1, 5, 10, 25, 50].map(amt => (
            <button key={amt} onClick={() => setTipAmount(amt)} style={{ padding: '10px 14px', borderRadius: 12, background: tipAmount === amt ? T.gold : T.card, border: `1px solid ${tipAmount === amt ? T.gold : T.border}`, color: tipAmount === amt ? T.bg : T.text, fontSize: 13, fontWeight: 700, fontFamily: f('mono') }}>{amt}</button>
          ))}
        </div>
        <button onClick={() => { setShowTipSheet(false); setTipAmount(null); }} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f() }}>Send {tipAmount || 1} HOURS</button>
        <div style={{ textAlign: 'center', marginTop: 6 }}><span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are not currency. See Terms.</span></div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'reader' && <ReaderView />}
      {view === 'thread' && <ThreadView />}
      {view === 'writer' && <WriterView />}
      <TipSheet />
    </div>
  );
};

export default OursRead;
