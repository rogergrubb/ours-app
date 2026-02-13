import React, { useState, useEffect, useReducer } from 'react';

// ─── OURS PLATFORM MVP ───
// Social platform that pays users. Revenue-sharing via HOURS tokens.
// Core: Feed + Groups + Marketplace + Storefronts + HOURS + Price Tag Calculator

const BRAND = {
  primary: '#0ea5e9',
  accent: '#10b981',
  gold: '#f59e0b',
  dark: '#0c1018',
  surface: '#141a24',
  surfaceLight: '#1c2433',
  border: 'rgba(71, 85, 105, 0.25)',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
  textDim: '#64748b',
};

// ─── MOCK DATA ───
const mockUser = {
  name: 'Roger G.',
  handle: '@rogergrubb',
  avatar: '🧠',
  hours: 142.5,
  earnings: 28.50,
  groups: 3,
  followers: 47,
  level: 'Pioneer',
};

const mockFeed = [
  { id: 1, user: 'Sarah Chen', handle: '@sarahbuilds', avatar: '👩‍💻', content: 'Just earned $12.40 from my tutorial group this week. On Instagram I made $0 in 3 years of posting. The difference is real.', likes: 234, comments: 18, hours: 3.2, tag: 'Creator Win', time: '2h' },
  { id: 2, user: 'Marcus J.', handle: '@marcusfitness', avatar: '💪', content: 'Launched my workout plan storefront. 14 sales in the first day. No middleman taking 70%. This is how platforms should work.', likes: 456, comments: 42, hours: 1.8, tag: 'Storefront', time: '4h' },
  { id: 3, user: 'Priya Patel', handle: '@priyacooks', avatar: '🍳', content: 'My recipe group just hit 500 members. Every time someone engages, we ALL earn. Not just the platform. Community > Corporation.', likes: 891, comments: 67, hours: 5.1, tag: 'Milestone', time: '6h' },
  { id: 4, user: 'Alex Rivera', handle: '@alexdesigns', avatar: '🎨', content: 'Price Tag Calculator says I generated $4,200 in ad revenue for Instagram last year. Instagram paid me: $0. Moving everything here.', likes: 1205, comments: 89, hours: 0.5, tag: 'Price Tag', time: '8h' },
];

const mockGroups = [
  { id: 1, name: 'Indie Hackers Bay Area', members: 1240, posts: 89, hourly: '$0.12/hr', category: 'Business', icon: '🚀', hot: true },
  { id: 2, name: 'Solopreneur Kitchen', members: 890, posts: 156, hourly: '$0.08/hr', category: 'Food', icon: '🍕' },
  { id: 3, name: 'AI Builders Club', members: 3400, posts: 234, hourly: '$0.18/hr', category: 'Tech', icon: '🤖', hot: true },
  { id: 4, name: 'Fitness Accountability', members: 2100, posts: 67, hourly: '$0.06/hr', category: 'Health', icon: '🏋️' },
  { id: 5, name: 'Crypto Alpha Seekers', members: 5600, posts: 445, hourly: '$0.22/hr', category: 'Finance', icon: '📈', hot: true },
  { id: 6, name: 'Digital Nomad Network', members: 1800, posts: 102, hourly: '$0.10/hr', category: 'Travel', icon: '✈️' },
];

const mockMarketplace = [
  { id: 1, title: 'Complete Python Bootcamp', seller: '@sarahbuilds', price: 29, rating: 4.8, sales: 142, category: 'Course', icon: '📚' },
  { id: 2, title: '30-Day HIIT Program', seller: '@marcusfitness', price: 19, rating: 4.9, sales: 89, category: 'Fitness', icon: '💪' },
  { id: 3, title: 'Recipe Collection: Asian Fusion', seller: '@priyacooks', price: 12, rating: 4.7, sales: 234, category: 'Food', icon: '🍜' },
  { id: 4, title: 'UI/UX Design Templates Pack', seller: '@alexdesigns', price: 49, rating: 4.6, sales: 67, category: 'Design', icon: '🎨' },
  { id: 5, title: 'SEO Mastery Guide 2026', seller: '@growthhacker', price: 39, rating: 4.5, sales: 156, category: 'Marketing', icon: '📊' },
  { id: 6, title: 'Meditation Audio Collection', seller: '@zenmaster', price: 15, rating: 4.9, sales: 312, category: 'Wellness', icon: '🧘' },
];

// ─── PRICE TAG CALCULATOR (Viral Hook) ───
const PriceTagCalculator = ({ onClose }) => {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState('');
  const [postsPerWeek, setPostsPerWeek] = useState('');
  const [yearsActive, setYearsActive] = useState('');
  const [result, setResult] = useState(null);

  const platforms = {
    instagram: { name: 'Instagram', color: '#E4405F', rpm: 8.50, icon: '📸' },
    tiktok: { name: 'TikTok', color: '#000000', rpm: 5.20, icon: '🎵' },
    youtube: { name: 'YouTube', color: '#FF0000', rpm: 12.00, icon: '🎬' },
    twitter: { name: 'X/Twitter', color: '#1DA1F2', rpm: 3.80, icon: '🐦' },
    facebook: { name: 'Facebook', color: '#1877F2', rpm: 6.40, icon: '📘' },
  };

  const calculate = () => {
    const f = parseInt(followers) || 0;
    const p = parseInt(postsPerWeek) || 0;
    const y = parseInt(yearsActive) || 1;
    const plat = platforms[platform];
    const engagementRate = 0.035;
    const impressionsPerPost = f * engagementRate * 4.2;
    const totalPosts = p * 52 * y;
    const totalImpressions = impressionsPerPost * totalPosts;
    const adRevenue = (totalImpressions / 1000) * plat.rpm;
    const youGot = adRevenue * 0.0;
    const platformKept = adRevenue;
    setResult({
      adRevenue: adRevenue.toFixed(2),
      youGot: youGot.toFixed(2),
      platformKept: platformKept.toFixed(2),
      oursWouldPay: (adRevenue * 0.70).toFixed(2),
      totalPosts,
      totalImpressions: (totalImpressions / 1000000).toFixed(1),
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    background: BRAND.surfaceLight,
    border: `1px solid ${BRAND.border}`,
    borderRadius: 8,
    color: BRAND.text,
    fontSize: 14,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 16,
    }}>
      <div style={{
        background: BRAND.surface,
        border: `1px solid ${BRAND.border}`,
        borderRadius: 16,
        padding: 28,
        maxWidth: 480,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 12, right: 16,
          background: 'none', border: 'none', color: BRAND.textDim,
          fontSize: 20, cursor: 'pointer',
        }}>×</button>

        <h2 style={{
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          color: BRAND.text,
          marginBottom: 4,
        }}>
          💰 Your Price Tag
        </h2>
        <p style={{ color: BRAND.textMuted, fontSize: 13, marginBottom: 20 }}>
          See how much revenue YOU generated for social media platforms — and got paid $0.
        </p>

        {/* Platform selector */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {Object.entries(platforms).map(([key, p]) => (
            <button key={key} onClick={() => setPlatform(key)} style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: `1px solid ${platform === key ? p.color : BRAND.border}`,
              background: platform === key ? `${p.color}22` : 'transparent',
              color: platform === key ? '#fff' : BRAND.textMuted,
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 500,
            }}>
              {p.icon} {p.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: BRAND.textDim, display: 'block', marginBottom: 4 }}>Followers</label>
            <input type="number" placeholder="e.g. 5000" value={followers} onChange={e => setFollowers(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: BRAND.textDim, display: 'block', marginBottom: 4 }}>Posts per week</label>
            <input type="number" placeholder="e.g. 5" value={postsPerWeek} onChange={e => setPostsPerWeek(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: BRAND.textDim, display: 'block', marginBottom: 4 }}>Years on platform</label>
            <input type="number" placeholder="e.g. 3" value={yearsActive} onChange={e => setYearsActive(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <button onClick={calculate} style={{
          width: '100%',
          padding: '12px',
          background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
          border: 'none',
          borderRadius: 10,
          color: '#fff',
          fontSize: 15,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Space Grotesk', sans-serif",
          marginBottom: 16,
        }}>
          Calculate My Price Tag
        </button>

        {result && (
          <div style={{
            background: BRAND.dark,
            borderRadius: 12,
            padding: 20,
            border: `1px solid ${BRAND.border}`,
          }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: BRAND.textDim, textTransform: 'uppercase', letterSpacing: 1 }}>
                You generated for {platforms[platform].name}
              </div>
              <div style={{
                fontSize: 36,
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#ef4444',
                margin: '4px 0',
              }}>
                ${Number(result.adRevenue).toLocaleString()}
              </div>
              <div style={{ fontSize: 12, color: BRAND.textMuted }}>
                across {result.totalPosts.toLocaleString()} posts • {result.totalImpressions}M impressions
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 10,
                padding: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: '#f87171', textTransform: 'uppercase', letterSpacing: 0.5 }}>They paid you</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#ef4444', fontFamily: "'Space Grotesk', sans-serif" }}>$0</div>
              </div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 10,
                padding: 12,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 10, color: '#34d399', textTransform: 'uppercase', letterSpacing: 0.5 }}>OURS would pay</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981', fontFamily: "'Space Grotesk', sans-serif" }}>
                  ${Number(result.oursWouldPay).toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{
              background: `linear-gradient(135deg, ${BRAND.primary}22, ${BRAND.accent}22)`,
              border: `1px solid ${BRAND.primary}44`,
              borderRadius: 10,
              padding: 12,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: BRAND.text, fontWeight: 600 }}>
                On OURS, 70% of ad revenue goes to creators.
              </div>
              <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 4 }}>
                It's OURS. Not theirs.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ───
const OursPlatform = () => {
  const [activeNav, setActiveNav] = useState('feed');
  const [showCalculator, setShowCalculator] = useState(false);
  const [likedPosts, setLikedPosts] = useState({});

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const navItems = [
    { id: 'feed', label: 'Feed', icon: '🏠' },
    { id: 'groups', label: 'Groups', icon: '👥' },
    { id: 'market', label: 'Market', icon: '🛍️' },
    { id: 'wallet', label: 'Wallet', icon: '💰' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: BRAND.dark,
      fontFamily: "'Space Grotesk', -apple-system, sans-serif",
      color: BRAND.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {showCalculator && <PriceTagCalculator onClose={() => setShowCalculator(false)} />}

      {/* ─── TOP BAR ─── */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: `${BRAND.dark}ee`,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${BRAND.border}`,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            fontSize: 24,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            OURS
          </div>
          <span style={{
            background: `${BRAND.accent}22`,
            color: BRAND.accent,
            padding: '2px 8px',
            borderRadius: 10,
            fontSize: 9,
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            MVP
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setShowCalculator(true)} style={{
            background: `linear-gradient(135deg, #f59e0b, #ef4444)`,
            border: 'none',
            borderRadius: 20,
            padding: '6px 14px',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            💰 Price Tag
          </button>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}>
            {mockUser.avatar}
          </div>
        </div>
      </div>

      {/* ─── NAV ─── */}
      <div style={{
        display: 'flex',
        borderBottom: `1px solid ${BRAND.border}`,
        padding: '0 16px',
        background: BRAND.surface,
      }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            style={{
              flex: 1,
              padding: '12px 0',
              border: 'none',
              background: 'none',
              color: activeNav === item.id ? BRAND.primary : BRAND.textDim,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              borderBottom: `2px solid ${activeNav === item.id ? BRAND.primary : 'transparent'}`,
              fontFamily: "'Space Grotesk', sans-serif",
              transition: 'all 0.2s',
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </div>

      {/* ─── CONTENT ─── */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 16 }}>

        {/* ─── FEED ─── */}
        {activeNav === 'feed' && (
          <div>
            {/* HOURS earnings banner */}
            <div style={{
              background: `linear-gradient(135deg, ${BRAND.primary}15, ${BRAND.accent}15)`,
              border: `1px solid ${BRAND.primary}33`,
              borderRadius: 14,
              padding: 16,
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 11, color: BRAND.textDim, textTransform: 'uppercase', letterSpacing: 0.5 }}>Your HOURS balance</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: BRAND.gold }}>{mockUser.hours} hrs</div>
                <div style={{ fontSize: 12, color: BRAND.accent }}>≈ ${mockUser.earnings.toFixed(2)} earned</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  background: `${BRAND.accent}22`,
                  color: BRAND.accent,
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  marginBottom: 4,
                }}>
                  🏅 {mockUser.level}
                </div>
                <div style={{ fontSize: 11, color: BRAND.textMuted }}>{mockUser.followers} followers</div>
              </div>
            </div>

            {/* Feed posts */}
            {mockFeed.map(post => (
              <div key={post.id} style={{
                background: BRAND.surface,
                border: `1px solid ${BRAND.border}`,
                borderRadius: 14,
                padding: 16,
                marginBottom: 10,
              }}>
                {/* Post header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: BRAND.surfaceLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                  }}>
                    {post.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{post.user}</span>
                      <span style={{ color: BRAND.textDim, fontSize: 11 }}>{post.handle}</span>
                      <span style={{ color: BRAND.textDim, fontSize: 10, marginLeft: 'auto' }}>{post.time}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                      <span style={{
                        background: `${BRAND.accent}22`,
                        color: BRAND.accent,
                        padding: '1px 6px',
                        borderRadius: 6,
                        fontSize: 9,
                        fontWeight: 600,
                      }}>
                        +{post.hours} HOURS
                      </span>
                      <span style={{
                        background: `${BRAND.primary}22`,
                        color: BRAND.primary,
                        padding: '1px 6px',
                        borderRadius: 6,
                        fontSize: 9,
                        fontWeight: 600,
                      }}>
                        {post.tag}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: BRAND.text,
                  margin: '0 0 12px',
                }}>
                  {post.content}
                </p>

                {/* Post actions */}
                <div style={{
                  display: 'flex',
                  gap: 20,
                  borderTop: `1px solid ${BRAND.border}`,
                  paddingTop: 10,
                }}>
                  <button
                    onClick={() => toggleLike(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: likedPosts[post.id] ? '#ef4444' : BRAND.textDim,
                      fontSize: 12,
                      cursor: 'pointer',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {likedPosts[post.id] ? '❤️' : '🤍'} {post.likes + (likedPosts[post.id] ? 1 : 0)}
                  </button>
                  <span style={{ color: BRAND.textDim, fontSize: 12 }}>💬 {post.comments}</span>
                  <span style={{ color: BRAND.textDim, fontSize: 12, marginLeft: 'auto' }}>🔄 Share</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── GROUPS ─── */}
        {activeNav === 'groups' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Groups</h2>
              <p style={{ fontSize: 12, color: BRAND.textMuted, margin: 0 }}>Join communities where engagement = earnings</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mockGroups.map(group => (
                <div key={group.id} style={{
                  background: BRAND.surface,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 12,
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: BRAND.surfaceLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}>
                    {group.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{group.name}</span>
                      {group.hot && (
                        <span style={{
                          background: '#ef444422',
                          color: '#f87171',
                          padding: '1px 6px',
                          borderRadius: 6,
                          fontSize: 8,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                        }}>
                          🔥 HOT
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: BRAND.textMuted, marginTop: 2 }}>
                      {group.members.toLocaleString()} members • {group.posts} posts/week
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      color: BRAND.accent,
                      fontWeight: 700,
                      fontSize: 13,
                    }}>
                      {group.hourly}
                    </div>
                    <div style={{ fontSize: 9, color: BRAND.textDim }}>avg earn rate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MARKETPLACE ─── */}
        {activeNav === 'market' && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>Marketplace</h2>
              <p style={{ fontSize: 12, color: BRAND.textMuted, margin: 0 }}>Creator storefronts • No middleman • 95% goes to creators</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {mockMarketplace.map(item => (
                <div key={item.id} style={{
                  background: BRAND.surface,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 12,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{
                    fontSize: 32,
                    marginBottom: 8,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: BRAND.textMuted, marginBottom: 8 }}>by {item.seller}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: BRAND.accent,
                    }}>
                      ${item.price}
                    </span>
                    <span style={{ fontSize: 10, color: BRAND.textMuted }}>
                      ⭐ {item.rating} • {item.sales} sold
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── WALLET ─── */}
        {activeNav === 'wallet' && (
          <div>
            <div style={{
              background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.accent})`,
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Total HOURS Balance
              </div>
              <div style={{ fontSize: 42, fontWeight: 700, color: '#fff', margin: '4px 0' }}>
                {mockUser.hours}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
                ≈ ${mockUser.earnings.toFixed(2)} USD
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>How HOURS Work</h3>
              {[
                { icon: '⏱️', title: 'Time = Value', desc: 'Every minute you spend creating, engaging, or moderating earns HOURS tokens.' },
                { icon: '💸', title: '70% Revenue Share', desc: 'Platform ad revenue is split: 70% to users proportional to HOURS, 30% to OURS.' },
                { icon: '🏪', title: 'Storefront Sales', desc: 'Sell products in your storefront. Keep 95% — only 5% platform fee.' },
                { icon: '📈', title: 'Compound Growth', desc: 'More engagement → more HOURS → bigger revenue share → more earnings.' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: BRAND.surface,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: BRAND.textMuted, lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>Earnings Breakdown</h3>
              {[
                { source: 'Content creation', hours: 82.3, earnings: 16.46, pct: 58 },
                { source: 'Group engagement', hours: 41.2, earnings: 8.24, pct: 29 },
                { source: 'Storefront sales', hours: 12.0, earnings: 2.40, pct: 8 },
                { source: 'Moderation', hours: 7.0, earnings: 1.40, pct: 5 },
              ].map((row, i) => (
                <div key={i} style={{
                  background: BRAND.surface,
                  border: `1px solid ${BRAND.border}`,
                  borderRadius: 8,
                  padding: '10px 12px',
                  marginBottom: 6,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>{row.source}</span>
                    <span style={{ fontSize: 12, color: BRAND.accent, fontWeight: 600 }}>${row.earnings.toFixed(2)}</span>
                  </div>
                  <div style={{
                    height: 4,
                    background: BRAND.surfaceLight,
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${row.pct}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.accent})`,
                      borderRadius: 2,
                    }} />
                  </div>
                  <div style={{ fontSize: 10, color: BRAND.textDim, marginTop: 2 }}>
                    {row.hours} hrs • {row.pct}% of total
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OursPlatform;
