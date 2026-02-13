import React, { useState, useEffect } from 'react';

const OursShop = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [sellerTab, setSellerTab] = useState('products');
  const [mounted, setMounted] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [purchased, setPurchased] = useState({});

  useEffect(() => { setMounted(true); }, []);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    shop: '#10b981',
  };
  const f = (family = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[family]);
  const fmt = (n) => n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const categories = [
    { id: 'all', label: 'All', icon: '🏪' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'templates', label: 'Templates', icon: '🎨' },
    { id: 'tools', label: 'Tools', icon: '🔧' },
    { id: 'services', label: 'Services', icon: '💼' },
    { id: 'ebooks', label: 'eBooks', icon: '📖' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'fitness', label: 'Fitness', icon: '💪' },
  ];

  const sellers = {
    '@sarahbuilds': { name: 'Sarah Builds', avatar: '👩‍💻', verified: true, handle: '@sarahbuilds', sales: 1240, rating: 4.9, products: 12, followers: '23.4K', bio: 'Full-stack developer turned educator. My courses have helped 5,000+ students land their first dev job.', tier: '⚡ Builder', hours: '18,200', monthlyEarnings: '4,800', banner: `linear-gradient(135deg, #6366f1, #8b5cf6)` },
    '@alexdesigns': { name: 'Alex Designs', avatar: '🎨', verified: true, handle: '@alexdesigns', sales: 890, rating: 4.8, products: 24, followers: '45.1K', bio: 'UI/UX designer. Figma templates, icon packs, and design systems used by 10,000+ designers worldwide.', tier: '🏗️ Architect', hours: '32,400', monthlyEarnings: '7,200', banner: `linear-gradient(135deg, #ec4899, #f43f5e)` },
    '@marcusfitness': { name: 'Marcus Fitness', avatar: '💪', verified: true, handle: '@marcusfitness', sales: 2100, rating: 4.9, products: 8, followers: '67.2K', bio: 'NASM-certified trainer. 10 years of coaching distilled into programs that actually work. No bro-science.', tier: '🏗️ Architect', hours: '28,900', monthlyEarnings: '6,100', banner: `linear-gradient(135deg, #10b981, #059669)` },
    '@growthhacker': { name: 'Growth Hacker', avatar: '📈', verified: false, handle: '@growthhacker', sales: 560, rating: 4.5, products: 6, followers: '12.8K', bio: 'Former Head of Growth at 3 YC startups. Now I teach what actually works.', tier: '🔥 Creator', hours: '8,400', monthlyEarnings: '2,200', banner: `linear-gradient(135deg, #f59e0b, #f97316)` },
    '@melodylab': { name: 'Melody Lab', avatar: '🎵', verified: true, handle: '@melodylab', sales: 3400, rating: 4.7, products: 45, followers: '34.5K', bio: 'Producer, beatmaker, sound designer. Royalty-free loops, samples, and presets for your next hit.', tier: '⚡ Builder', hours: '15,600', monthlyEarnings: '3,900', banner: `linear-gradient(135deg, #8b5cf6, #a78bfa)` },
  };

  const products = [
    { id: 'p1', title: 'Python Bootcamp: Zero to Developer', seller: '@sarahbuilds', price: 2900, originalPrice: 4900, category: 'courses', rating: 4.9, reviews: 342, sales: 1420, icon: '🐍', featured: true, trending: true,
      description: '40 hours of video content. Build 12 real projects. From absolute beginner to job-ready developer. Includes lifetime access, community Discord, and certificate.',
      includes: ['40hr video course', '12 projects', 'Discord community', 'Certificate', 'Lifetime access', 'Source code'], deliveryType: 'instant' },
    { id: 'p2', title: 'SaaS Dashboard UI Kit', seller: '@alexdesigns', price: 4900, category: 'templates', rating: 4.8, reviews: 89, sales: 670, icon: '📊', featured: true,
      description: 'Complete Figma UI kit with 200+ components, 50+ screens, dark & light mode, auto-layout, and design tokens. Built for SaaS products.',
      includes: ['200+ components', '50+ screens', 'Dark & light mode', 'Auto-layout', 'Design tokens', 'Free updates'], deliveryType: 'instant' },
    { id: 'p3', title: '30-Day HIIT Program', seller: '@marcusfitness', price: 1900, category: 'fitness', rating: 4.9, reviews: 456, sales: 2100, icon: '🏋️', featured: true, trending: true,
      description: 'No gym required. 30 days of structured workouts, nutrition guide, weekly check-ins, and progress tracking. Average results: -8lbs fat, +3lbs muscle.',
      includes: ['30 daily workouts', 'Nutrition guide', 'Progress tracker', 'Video demos', 'Weekly check-in', 'Community access'], deliveryType: 'instant' },
    { id: 'p4', title: 'SEO Mastery 2026', seller: '@growthhacker', price: 3900, category: 'courses', rating: 4.5, reviews: 67, sales: 340, icon: '🔍',
      description: 'The only SEO course updated for 2026. AI-era SEO, programmatic content, technical audits, and link building strategies that still work.',
      includes: ['20hr video course', 'SEO audit template', 'Keyword research tool', '10 case studies', 'Monthly updates'], deliveryType: 'instant' },
    { id: 'p5', title: 'Lo-Fi Sample Pack Vol. 3', seller: '@melodylab', price: 800, category: 'music', rating: 4.7, reviews: 234, sales: 3400, icon: '🎧', trending: true,
      description: '500+ royalty-free samples. Vinyl crackle, tape hiss, keys, drums, and bass. WAV + stems. Use in any DAW.',
      includes: ['500+ samples', 'WAV format', 'Stems included', 'Royalty-free', 'Any DAW compatible'], deliveryType: 'instant' },
    { id: 'p6', title: 'React Component Library', seller: '@sarahbuilds', price: 1500, category: 'templates', rating: 4.8, reviews: 123, sales: 890, icon: '⚛️',
      description: '60+ production-ready React components. TypeScript, Tailwind, accessible, with Storybook docs. Copy-paste into any project.',
      includes: ['60+ components', 'TypeScript', 'Tailwind CSS', 'Storybook', 'NPM package', 'Free updates'], deliveryType: 'instant' },
    { id: 'p7', title: 'Portfolio Website Template', seller: '@alexdesigns', price: 900, category: 'templates', rating: 4.6, reviews: 56, sales: 450, icon: '🌐',
      description: 'Clean, minimal portfolio template. HTML/CSS/JS. Mobile responsive. Dark mode. One-click deploy to Vercel.',
      includes: ['HTML/CSS/JS', 'Responsive', 'Dark mode', 'Vercel config', 'SEO optimized'], deliveryType: 'instant' },
    { id: 'p8', title: '1-on-1 Code Review (1hr)', seller: '@sarahbuilds', price: 15000, category: 'services', rating: 5.0, reviews: 23, sales: 67, icon: '📞',
      description: 'Live 1-hour code review session via Zoom. I\'ll review your project, suggest improvements, and answer questions. Includes written summary.',
      includes: ['1hr Zoom call', 'Written summary', 'Code suggestions', 'Follow-up email'], deliveryType: 'scheduled' },
    { id: 'p9', title: 'The Indie Hacker\'s Playbook', seller: '@growthhacker', price: 1200, category: 'ebooks', rating: 4.6, reviews: 189, sales: 890, icon: '📕',
      description: '200-page guide to building profitable side projects. From idea validation to first $10K MRR. Real numbers, real tactics.',
      includes: ['200-page PDF', 'Notion templates', 'Revenue calculator', 'Case studies'], deliveryType: 'instant' },
    { id: 'p10', title: 'Cinematic Preset Pack', seller: '@melodylab', price: 1200, category: 'music', rating: 4.8, reviews: 178, sales: 1200, icon: '🎬',
      description: 'Serum + Vital presets for cinematic music. Pads, textures, risers, impacts. 80 presets, 20 wavetables.',
      includes: ['80 presets', '20 wavetables', 'Serum + Vital', 'Demo project', 'Tutorial video'], deliveryType: 'instant' },
    { id: 'p11', title: 'Meal Prep Masterclass', seller: '@marcusfitness', price: 1400, category: 'courses', rating: 4.8, reviews: 234, sales: 1100, icon: '🍱',
      description: '4-week meal prep system. 60 recipes, shopping lists, macros calculated. Save $200/month on food, eat better than ever.',
      includes: ['60 recipes', 'Shopping lists', 'Macro calculator', 'Video tutorials', 'Printable cards'], deliveryType: 'instant' },
    { id: 'p12', title: 'Icon Pack — 1,200 Icons', seller: '@alexdesigns', price: 2500, category: 'templates', rating: 4.9, reviews: 67, sales: 340, icon: '✨',
      description: 'Hand-crafted icon set. 1,200 icons in 4 styles (outline, solid, duotone, color). SVG, PNG, Figma, React components.',
      includes: ['1,200 icons', '4 styles', 'SVG + PNG', 'Figma file', 'React components', 'Free updates'], deliveryType: 'instant' },
  ];

  const collections = [
    { id: 'c1', title: 'Creator Starter Kit', icon: '🚀', description: 'Everything you need to launch', count: 4, products: ['p1', 'p7', 'p9', 'p4'] },
    { id: 'c2', title: 'Design Essentials', icon: '🎨', description: 'Templates, icons, and UI kits', count: 3, products: ['p2', 'p12', 'p7'] },
    { id: 'c3', title: 'Health & Hustle', icon: '💪', description: 'Fitness + productivity combo', count: 2, products: ['p3', 'p11'] },
  ];

  const filteredProducts = filterCategory === 'all' ? products : products.filter(p => p.category === filterCategory);
  const cartTotal = cart.reduce((sum, item) => sum + (products.find(p => p.id === item)?.price || 0), 0);

  const addToCart = (id) => { if (!cart.includes(id)) setCart([...cart, id]); };
  const removeFromCart = (id) => setCart(cart.filter(i => i !== id));
  const toggleWishlist = (id) => setWishlist(p => ({ ...p, [id]: !p[id] }));

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  const Stars = ({ rating, size = 10 }) => (
    <span style={{ fontSize: size, letterSpacing: 1 }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}</span>
  );

  const ProductCard = ({ product, index = 0, compact = false }) => {
    const s = sellers[product.seller] || {};
    const inCart = cart.includes(product.id);
    const inWish = wishlist[product.id];
    const owned = purchased[product.id];
    return (
      <div onClick={() => { setSelectedProduct(product); setView('product'); }} style={{
        padding: compact ? 10 : 14, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`,
        cursor: 'pointer', animation: `slideUp 0.3s ease ${index * 0.04}s both`, position: 'relative',
      }}>
        {product.trending && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 7, fontWeight: 700, color: T.orange, background: `${T.orange}15`, padding: '2px 6px', borderRadius: 4, fontFamily: f('mono') }}>🔥 Trending</div>}
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: compact ? 48 : 56, height: compact ? 48 : 56, borderRadius: 14, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: compact ? 22 : 26, flexShrink: 0 }}>{product.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: compact ? 12 : 14, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 2 }}>{product.title}</div>
            <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{s.name || product.seller}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ color: T.gold, fontSize: 10 }}><Stars rating={product.rating} /> <span style={{ fontFamily: f('mono'), fontSize: 9 }}>{product.rating}</span></span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>({product.reviews})</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{fmt(product.sales)} sold</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>⏣ {(product.price / 100).toFixed(0)}</span>
              {product.originalPrice && <span style={{ fontSize: 11, color: T.dim, fontFamily: f('mono'), textDecoration: 'line-through' }}>⏣ {(product.originalPrice / 100).toFixed(0)}</span>}
              {product.originalPrice && <span style={{ fontSize: 9, fontWeight: 700, color: T.shop, fontFamily: f('mono') }}>-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
            </div>
          </div>
        </div>
        {!compact && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {owned ? (
              <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: `${T.shop}15`, fontSize: 11, fontWeight: 700, color: T.shop, fontFamily: f() }}>✓ Owned — Download</button>
            ) : (
              <>
                <button onClick={(e) => { e.stopPropagation(); addToCart(product.id); }} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', background: inCart ? T.card : T.shop, fontSize: 11, fontWeight: 700, color: inCart ? T.shop : '#fff', fontFamily: f() }}>{inCart ? '✓ In Cart' : 'Add to Cart'}</button>
                <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${T.border}`, background: inWish ? `${T.pink}15` : T.card, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{inWish ? '❤️' : '🤍'}</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  // ═══ HOME VIEW ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.shop}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shop</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setShowCart(true)} style={{ position: 'relative', width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🛒
              {cart.length > 0 && <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: T.shop, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>{cart.length}</span>}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none', gap: 4 }}>
          {[{ id: 'featured', label: '⭐ Featured' }, { id: 'all', label: 'All' }, { id: 'trending', label: '🔥 Hot' }, { id: 'collections', label: '📦 Collections' }, { id: 'sellers', label: '👤 Top Sellers' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '8px 12px', border: 'none', background: 'none', whiteSpace: 'nowrap',
              fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500,
              color: activeTab === tab.id ? T.text : T.dim,
              borderBottom: `2px solid ${activeTab === tab.id ? T.shop : 'transparent'}`,
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px', paddingBottom: 100 }}>
        {/* Categories */}
        {(activeTab === 'featured' || activeTab === 'all') && (
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 14, paddingBottom: 2 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setFilterCategory(cat.id)} style={{
                padding: '6px 12px', borderRadius: 10, whiteSpace: 'nowrap',
                background: filterCategory === cat.id ? T.shop : T.surface,
                border: `1px solid ${filterCategory === cat.id ? T.shop : T.border}`,
                fontSize: 11, fontWeight: 600, color: filterCategory === cat.id ? '#fff' : T.sub, fontFamily: f(),
              }}>{cat.icon} {cat.label}</button>
            ))}
          </div>
        )}

        {/* Featured banner */}
        {activeTab === 'featured' && (
          <div style={{ padding: 18, borderRadius: 18, background: `linear-gradient(135deg, ${T.shop}15, ${T.gold}08)`, border: `1px solid ${T.shop}25`, marginBottom: 14, animation: 'slideUp 0.3s ease both' }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: T.shop, fontFamily: f('mono'), letterSpacing: 2 }}>CREATOR MARKETPLACE</span>
            <div style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, margin: '6px 0' }}>Creators keep ~95%*</div>
            <p style={{ fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4, marginBottom: 8 }}>Courses, templates, tools, services — all priced in HOURS. Buy directly from creators with near-zero platform fees.</p>
            <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*Retention rate is illustrative, not guaranteed.</span>
          </div>
        )}

        {/* Collections */}
        {(activeTab === 'featured' || activeTab === 'collections') && (
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>📦 CURATED COLLECTIONS</span>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {collections.map((col, i) => (
                <div key={col.id} style={{ minWidth: 160, padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.06}s both`, flexShrink: 0 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{col.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: T.text, fontFamily: f() }}>{col.title}</div>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), marginTop: 2 }}>{col.description}</div>
                  <div style={{ fontSize: 9, color: T.shop, fontFamily: f('mono'), marginTop: 6 }}>{col.count} products →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Sellers */}
        {(activeTab === 'featured' || activeTab === 'sellers') && (
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>👤 TOP SELLERS</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Object.values(sellers).map((s, i) => (
                <div key={s.handle} onClick={() => { setSelectedSeller(s.handle); setView('seller'); }} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{s.name}</span>
                      {s.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{s.products} products</span>
                      <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono') }}>★ {s.rating}</span>
                      <span style={{ fontSize: 9, color: T.shop, fontFamily: f('mono') }}>{fmt(s.sales)} sold</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: T.dim }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>
            {activeTab === 'trending' ? '🔥 TRENDING' : '🛍️ ALL PRODUCTS'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(activeTab === 'trending' ? products.filter(p => p.trending) : filteredProducts).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ PRODUCT DETAIL VIEW ═══
  const ProductView = () => {
    if (!selectedProduct) return null;
    const s = sellers[selectedProduct.seller] || {};
    const inCart = cart.includes(selectedProduct.id);
    const owned = purchased[selectedProduct.id];
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedProduct(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>Product Details</span>
          <button onClick={() => toggleWishlist(selectedProduct.id)} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: wishlist[selectedProduct.id] ? `${T.pink}15` : T.surface, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wishlist[selectedProduct.id] ? '❤️' : '🤍'}</button>
        </div>
        <div style={{ padding: '16px 16px 120px' }}>
          <div style={{ width: '100%', height: 140, borderRadius: 18, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, marginBottom: 16 }}>{selectedProduct.icon}</div>

          <div style={{ marginBottom: 4 }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: T.shop, fontFamily: f('mono'), textTransform: 'capitalize' }}>{selectedProduct.category}</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, marginBottom: 8 }}>{selectedProduct.title}</h1>

          {/* Seller */}
          <div onClick={() => { setSelectedSeller(selectedProduct.seller); setView('seller'); }} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, marginBottom: 12, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{s.name}</span>{s.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}</div>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{fmt(s.sales)} total sales · ★ {s.rating}</span>
            </div>
          </div>

          {/* Price + rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: T.gold, fontFamily: f('mono') }}>⏣ {(selectedProduct.price / 100).toFixed(0)}</span>
              {selectedProduct.originalPrice && <span style={{ fontSize: 14, color: T.dim, fontFamily: f('mono'), textDecoration: 'line-through' }}>⏣ {(selectedProduct.originalPrice / 100).toFixed(0)}</span>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: T.gold, fontSize: 12 }}><Stars rating={selectedProduct.rating} size={12} /> {selectedProduct.rating}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{selectedProduct.reviews} reviews · {fmt(selectedProduct.sales)} sold</div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: T.sub, fontFamily: f(), lineHeight: 1.6, marginBottom: 16 }}>{selectedProduct.description}</p>

          {/* What's included */}
          {selectedProduct.includes && (
            <div style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 8 }}>What's included</div>
              {selectedProduct.includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <span style={{ fontSize: 10, color: T.shop }}>✓</span>
                  <span style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Delivery */}
          <div style={{ padding: 12, borderRadius: 12, background: `${T.shop}08`, border: `1px solid ${T.shop}20`, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 20 }}>{selectedProduct.deliveryType === 'instant' ? '⚡' : '📅'}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.shop, fontFamily: f() }}>{selectedProduct.deliveryType === 'instant' ? 'Instant Delivery' : 'Scheduled Service'}</div>
              <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{selectedProduct.deliveryType === 'instant' ? 'Download immediately after purchase' : 'Book a time after purchase'}</div>
            </div>
          </div>

          {/* Buy buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {owned ? (
              <button style={{ flex: 1, padding: 14, borderRadius: 14, border: 'none', background: `${T.shop}15`, fontSize: 14, fontWeight: 700, color: T.shop, fontFamily: f() }}>✓ Owned — Download</button>
            ) : (
              <>
                <button onClick={() => { addToCart(selectedProduct.id); setShowCheckout(true); }} style={{ flex: 1, padding: 14, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.shop}, ${T.accent})`, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Buy Now · ⏣ {(selectedProduct.price / 100).toFixed(0)}</button>
                <button onClick={() => addToCart(selectedProduct.id)} style={{ padding: '14px 18px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14 }}>{inCart ? '✓' : '🛒'}</button>
              </>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: 6 }}><span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>* HOURS are internal platform credits, not currency.</span></div>
        </div>
      </div>
    );
  };

  // ═══ SELLER PROFILE ═══
  const SellerView = () => {
    const s = sellers[selectedSeller];
    if (!s) return null;
    const sellerProducts = products.filter(p => p.seller === selectedSeller);
    return (
      <div>
        <div style={{ width: '100%', height: 80, background: s.banner, position: 'relative' }}>
          <button onClick={() => { setView('home'); setSelectedSeller(null); }} style={{ position: 'absolute', top: 10, left: 10, width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(0,0,0,0.4)', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        </div>
        <div style={{ padding: '0 16px', marginTop: -24 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', marginBottom: 10 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: `3px solid ${T.bg}` }}>{s.avatar}</div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: f() }}>{s.name}</span>{s.verified && <span style={{ fontSize: 10, color: T.primary }}>✓</span>}</div>
              <span style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{s.handle}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
            {[{ l: 'Sales', v: fmt(s.sales) }, { l: 'Products', v: s.products }, { l: 'Rating', v: `★ ${s.rating}` }, { l: 'Followers', v: s.followers }].map(stat => (
              <div key={stat.l}><div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{stat.v}</div><div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{stat.l}</div></div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 10 }}>{s.bio}</p>
          <div style={{ padding: 10, borderRadius: 12, background: `${T.gold}08`, border: `1px solid ${T.gold}20`, marginBottom: 12, display: 'flex', gap: 8 }}>
            {[{ l: 'Tier', v: s.tier, c: T.primary }, { l: 'HOURS', v: s.hours, c: T.gold }, { l: 'Monthly*', v: `${s.monthlyEarnings} HRS`, c: T.accent }].map(st => (
              <div key={st.l} style={{ flex: 1, textAlign: 'center' }}><div style={{ fontSize: 11, fontWeight: 800, color: st.c, fontFamily: f('mono') }}>{st.v}</div><div style={{ fontSize: 8, color: T.dim }}>{st.l}</div></div>
            ))}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', margin: '12px 0 8px' }}>🛍️ PRODUCTS</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
            {sellerProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    );
  };

  // ═══ CART SHEET ═══
  const CartSheet = () => showCart && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowCart(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, maxHeight: '80vh', overflowY: 'auto', background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f() }}>🛒 Cart ({cart.length})</span>
          <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: 18, color: T.dim }}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 30, color: T.dim, fontSize: 12, fontFamily: f() }}>Your cart is empty</div>
        ) : (
          <>
            {cart.map(id => { const p = products.find(pr => pr.id === id); if (!p) return null; return (
              <div key={id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 24 }}>{p.icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{p.title}</div><div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{sellers[p.seller]?.name}</div></div>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ {(p.price / 100).toFixed(0)}</span>
                <button onClick={() => removeFromCart(id)} style={{ background: 'none', border: 'none', fontSize: 14, color: T.dim }}>✕</button>
              </div>
            ); })}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>Total</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: T.gold, fontFamily: f('mono') }}>⏣ {(cartTotal / 100).toFixed(0)}</span>
            </div>
            <button onClick={() => { setPurchased(p => { const up = { ...p }; cart.forEach(id => up[id] = true); return up; }); setCart([]); setShowCart(false); }} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.shop}, ${T.accent})`, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Checkout · ⏣ {(cartTotal / 100).toFixed(0)} HOURS</button>
            <div style={{ textAlign: 'center', marginTop: 6 }}><span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>* HOURS are internal platform credits, not currency.</span></div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'product' && <ProductView />}
      {view === 'seller' && <SellerView />}
      <CartSheet />
    </div>
  );
};

export default OursShop;
