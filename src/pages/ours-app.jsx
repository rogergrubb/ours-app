import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — FULL APP PROTOTYPE
// Phase 1: Auth, Onboarding, Profile, Settings, Legal
// Phase 2: Watch, Read, Community, Messages
// Phase 3: Wallet, Shop, Arena, Govern
// Phase 4: Explore, Listen, Search, Notifications
// All interconnected. Click through the entire app.
// ═══════════════════════════════════════════════════════════════

const OursApp = () => {
  const [page, setPage] = useState('home');
  const [prevPages, setPrevPages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [feedPref, setFeedPref] = useState(50);
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(true);
  const [hours, setHours] = useState(142.5);
  const [settingsTab, setSettingsTab] = useState('account');
  const [legalTab, setLegalTab] = useState('terms');
  const [profileTab, setProfileTab] = useState('posts');
  const [communityTab, setCommunityTab] = useState('my');
  const [shopTab, setShopTab] = useState('browse');
  const [walletTab, setWalletTab] = useState('overview');
  const [watchMode, setWatchMode] = useState('shorts');
  const [readFilter, setReadFilter] = useState('trending');
  const [msgThread, setMsgThread] = useState(null);
  const [governTab, setGovernTab] = useState('active');
  const [arenaTab, setArenaTab] = useState('challenges');
  const [listenTab, setListenTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifFilter, setNotifFilter] = useState('all');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [expandedVote, setExpandedVote] = useState(null);
  const [expandedChallenge, setExpandedChallenge] = useState(null);

  // Navigation helper
  const nav = (target) => {
    setPrevPages(p => [...p, page]);
    setPage(target);
  };
  const back = () => {
    if (prevPages.length > 0) {
      setPage(prevPages[prevPages.length - 1]);
      setPrevPages(p => p.slice(0, -1));
    }
  };

  const me = {
    name: 'Roger', handle: '@rogergrubb', avatar: '🧠',
    level: 7, levelName: 'Pioneer', xpCurrent: 2340, xpNext: 3000,
    trust: 94, streak: 12, rank: 847, totalUsers: 10247,
    bio: 'Builder. Creator. Believer in the open internet. Making AI work for everyone.',
    joined: 'Jan 2026', followers: 234, following: 89, posts: 47,
  };

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', glow: 'rgba(14,165,233,0.08)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    font: "'Sora', sans-serif", mono: "'Space Mono', monospace",
  };

  // ═══ SHARED COMPONENTS ═══
  const TopBar = ({ title, showBack = true, right = null }) => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100, padding: '10px 14px',
      background: `${T.bg}ee`, backdropFilter: 'blur(16px)',
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
        {showBack && prevPages.length > 0 && (
          <button onClick={back} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 18, cursor: 'pointer', padding: 0 }}>←</button>
        )}
        {title ? (
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: T.font, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
        ) : (
          <span onClick={() => nav('home')} style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>OURS</span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {right}
        <div onClick={() => nav('wallet')} style={{ background: `${T.gold}10`, border: `1px solid ${T.gold}20`, padding: '3px 10px', borderRadius: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{hours.toFixed(1)}</span>
          <span style={{ fontSize: 9, color: T.dim }}>HRS</span>
        </div>
        <div onClick={() => nav('profile')} style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}>{me.avatar}</div>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: `${T.bg}f0`, backdropFilter: 'blur(16px)',
      borderTop: `1px solid ${T.border}`,
      display: 'flex', justifyContent: 'space-around', padding: '6px 0 12px',
      maxWidth: 600, margin: '0 auto',
    }}>
      {[
        { icon: '🍬', label: 'Home', target: 'home' },
        { icon: '🔍', label: 'Search', target: 'search' },
        { icon: '💬', label: 'Messages', target: 'messages' },
        { icon: '🔔', label: 'Alerts', target: 'notifications' },
        { icon: '👤', label: 'Profile', target: 'profile' },
      ].map(item => (
        <button key={item.target} onClick={() => { setPrevPages(p => [...p, page]); setPage(item.target); }} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: page === item.target ? T.primary : T.dim, fontSize: 18, fontFamily: T.font,
        }}>
          <span>{item.icon}</span>
          <span style={{ fontSize: 9, fontWeight: page === item.target ? 700 : 400 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );

  const Card = ({ children, style: s = {}, onClick }) => (
    <div onClick={onClick} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, ...s, cursor: onClick ? 'pointer' : 'default' }}>
      {children}
    </div>
  );

  const Tabs = ({ tabs, active, onChange, color = T.primary }) => (
    <div style={{ display: 'flex', gap: 4, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '7px 14px', borderRadius: 10, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font, whiteSpace: 'nowrap', flexShrink: 0,
          background: active === t.id ? `${color}18` : T.surface, border: `1px solid ${active === t.id ? `${color}40` : T.border}`,
          color: active === t.id ? color : T.dim,
        }}>{t.label}</button>
      ))}
    </div>
  );

  const SectionHeader = ({ title, action, onAction }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, fontFamily: T.font, margin: 0 }}>{title}</h3>
      {action && <span onClick={onAction} style={{ fontSize: 11, color: T.primary, fontFamily: T.font, cursor: 'pointer' }}>{action}</span>}
    </div>
  );

  const Badge = ({ text, color = T.primary }) => (
    <span style={{ fontSize: 9, background: `${color}18`, color, padding: '2px 8px', borderRadius: 6, fontWeight: 600, fontFamily: T.font, textTransform: 'uppercase' }}>{text}</span>
  );

  const HoursEarn = ({ amount }) => (
    <span style={{ fontSize: 10, color: T.gold, fontFamily: T.mono, fontWeight: 600 }}>+{amount} HRS</span>
  );

  const Disclaimer = ({ text }) => (
    <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, lineHeight: 1.7, padding: '12px 0' }}>{text || '*All HOURS earnings and estimated values are illustrative. Actual earnings depend on platform revenue, user engagement, and other factors. HOURS are not cryptocurrency, securities, or investments. Revenue percentages are targets, not guarantees.'}</div>
  );

  const Wrap = ({ children }) => (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 12px 80px' }}>{children}</div>
  );

  // ═══════════════════════════════════════
  // AUTH FLOW
  // ═══════════════════════════════════════
  const AuthPage = () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ fontSize: 42, fontWeight: 800, fontFamily: T.font, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>OURS</div>
      <p style={{ fontSize: 14, color: T.sub, fontFamily: T.font, marginBottom: 32, textAlign: 'center' }}>The platform that pays you back.</p>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, color: T.dim, fontFamily: T.font, display: 'block', marginBottom: 4 }}>Email</label>
          <input type="email" placeholder="you@email.com" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: T.font, outline: 'none' }} />
        </div>
        <button onClick={() => { setOnboardingStep(1); nav('onboarding'); }} style={{
          width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
          background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff', marginBottom: 12,
        }}>Send Magic Link ✨</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          <span style={{ fontSize: 11, color: T.dim, fontFamily: T.font }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
        {['Google', 'Apple'].map(p => (
          <button key={p} onClick={() => { setOnboardingStep(1); nav('onboarding'); }} style={{
            width: '100%', padding: '12px 0', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface,
            color: T.text, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: T.font, marginBottom: 8,
          }}>Continue with {p}</button>
        ))}
        <p style={{ fontSize: 10, color: T.dim, fontFamily: T.font, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
          By signing up, you agree to our <span style={{ color: T.primary, cursor: 'pointer' }} onClick={() => nav('legal')}>Terms</span> and <span style={{ color: T.primary, cursor: 'pointer' }} onClick={() => nav('legal')}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );

  // ═══════════════════════════════════════
  // ONBOARDING FLOW
  // ═══════════════════════════════════════
  const interests = ['🎬 Video', '📰 Articles', '🏛️ Communities', '🛍️ Shopping', '✨ Visual Art', '🎙️ Podcasts', '💪 Fitness', '🍕 Food', '🤖 AI & Tech', '🎮 Gaming', '📚 Education', '🎵 Music', '💼 Business', '🌿 Wellness', '📷 Photography', '🏠 Home'];

  const OnboardingPage = () => (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 20, maxWidth: 420, margin: '0 auto' }}>
      {/* Progress */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {[1,2,3,4].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= onboardingStep ? T.primary : T.elevated }} />
        ))}
      </div>

      {onboardingStep === 1 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, marginBottom: 4 }}>What lights you up? 🔥</h2>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 20 }}>Pick 5 or more. We'll fill your Candy Store with the good stuff.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {interests.map(i => {
              const sel = selectedInterests.includes(i);
              return (
                <button key={i} onClick={() => setSelectedInterests(sel ? selectedInterests.filter(x => x !== i) : [...selectedInterests, i])} style={{
                  padding: '10px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                  background: sel ? `${T.primary}20` : T.surface, border: `1px solid ${sel ? T.primary : T.border}`, color: sel ? T.primary : T.sub,
                }}>{i}</button>
              );
            })}
          </div>
          <button disabled={selectedInterests.length < 5} onClick={() => setOnboardingStep(2)} style={{
            width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font, marginTop: 24,
            background: selectedInterests.length >= 5 ? `linear-gradient(135deg, ${T.primary}, ${T.accent})` : T.elevated,
            color: selectedInterests.length >= 5 ? '#fff' : T.dim,
          }}>Continue ({selectedInterests.length}/5+)</button>
        </div>
      )}

      {onboardingStep === 2 && (
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, marginBottom: 4 }}>How do you like your feed? 🎛️</h2>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 24 }}>You control the algorithm. Always. Adjust anytime in settings.</p>
          <div style={{ background: T.card, borderRadius: 16, padding: 20, border: `1px solid ${T.border}`, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: T.font, marginBottom: 12 }}>
              <span style={{ color: T.primary }}>🕐 Chronological</span>
              <span style={{ color: T.purple }}>✨ Discovery</span>
            </div>
            <input type="range" min="0" max="100" value={feedPref} onChange={e => setFeedPref(e.target.value)} style={{ width: '100%', accentColor: T.primary }} />
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 13, color: T.text, fontFamily: T.font, fontWeight: 600 }}>
                {feedPref < 30 ? 'Mostly chronological — see posts from people you follow, in order' :
                 feedPref > 70 ? 'Mostly discovery — let the algorithm surprise you with new content' :
                 'Balanced — mix of your follows and new discoveries'}
              </span>
            </div>
          </div>
          <Card style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font, lineHeight: 1.6 }}>
              <strong style={{ color: T.accent }}>Unlike other platforms:</strong> You can see and change this anytime. We'll never secretly adjust it to maximize your time on screen. Your feed, your rules.
            </div>
          </Card>
          <button onClick={() => setOnboardingStep(3)} style={{
            width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff',
          }}>Continue</button>
        </div>
      )}

      {onboardingStep === 3 && (
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, marginBottom: 4 }}>Welcome to the Candy Store 🍬</h2>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 24 }}>Here's a quick tour of your new home.</p>
          <div style={{ textAlign: 'left' }}>
            {[
              { icon: '🎬', title: 'Watch', desc: 'Short & long videos. Every second earns HOURS.' },
              { icon: '📰', title: 'Read', desc: 'Articles & newsletters. Great writing, forever.' },
              { icon: '🏛️', title: 'Community', desc: 'Groups with shared treasuries. Elected mods.' },
              { icon: '🛍️', title: 'Shop', desc: 'Creator storefronts. Creators keep ~95%.*' },
              { icon: '🗳️', title: 'Govern', desc: 'Vote on features. Your HOURS = your power.' },
              { icon: '🏆', title: 'Arena', desc: 'Challenges & leaderboards. Compete to earn.' },
            ].map((z, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < 5 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{z.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font }}>{z.title}</div>
                  <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>{z.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setOnboardingStep(4)} style={{
            width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font, marginTop: 20,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff',
          }}>Got it — Show me my reward! 🎁</button>
        </div>
      )}

      {onboardingStep === 4 && (
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎁</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: T.font, marginBottom: 4 }}>Your First HOURS!</h2>
          <p style={{ fontSize: 14, color: T.sub, fontFamily: T.font, marginBottom: 20 }}>Welcome bonus for joining OURS.</p>
          <div style={{ fontSize: 42, fontWeight: 800, color: T.gold, fontFamily: T.mono, marginBottom: 4 }}>+10.0 HOURS</div>
          <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 24 }}>≈ $2.00 estimated value*</div>
          <button onClick={() => { setIsLoggedIn(true); nav('home'); }} style={{
            width: '100%', padding: '16px 0', borderRadius: 12, border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
            background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000',
            boxShadow: `0 0 30px ${T.gold}40`,
          }}>Enter the Candy Store →</button>
          <Disclaimer />
        </div>
      )}
    </div>
  );

  // ═══════════════════════════════════════
  // CANDY STORE HOME
  // ═══════════════════════════════════════
  const zones = [
    { id: 'watch', icon: '🎬', title: 'Watch', sub: 'Short + long video', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', earn: '+0.3/min', count: '2.4K' },
    { id: 'read', icon: '📰', title: 'Read', sub: 'Articles & threads', gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', earn: '+0.8/article', count: '890' },
    { id: 'community', icon: '🏛️', title: 'Community', sub: 'Groups + treasuries', gradient: 'linear-gradient(135deg, #10b981, #059669)', earn: '+0.2/engage', count: '340' },
    { id: 'shop', icon: '🛍️', title: 'Shop', sub: 'Creator storefronts', gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', earn: '~95% kept*', count: '1.8K' },
    { id: 'explore', icon: '✨', title: 'Explore', sub: 'Visual discovery', gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', earn: '+0.1/save', count: '15K+' },
    { id: 'listen', icon: '🎙️', title: 'Listen', sub: 'Audio + podcasts', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', earn: '+0.2/listen', count: '230' },
    { id: 'govern', icon: '🗳️', title: 'Govern', sub: 'Your vote matters', gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', earn: '+0.5/vote', count: '3' },
    { id: 'arena', icon: '🏆', title: 'Arena', sub: 'Challenges', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', earn: 'Up to 50x*', count: '5' },
  ];

  const quests = [
    { title: 'Post something', reward: 2.0, icon: '📝', done: true },
    { title: 'Comment on 3 posts', reward: 1.5, icon: '💬', done: true, prog: '3/3' },
    { title: 'Watch 5 min of video', reward: 1.0, icon: '🎬', done: false, prog: '2:30/5:00' },
    { title: 'Save to collection', reward: 0.5, icon: '📌', done: false },
    { title: 'Vote on governance', reward: 2.0, icon: '🗳️', done: false },
  ];

  const pulse = [
    '🎉 Sarah earned +3.2 HRS from a viral tutorial',
    '🛍️ Marcus sold 5 copies of his HIIT program',
    '🗳️ 127 new votes on "Add disappearing DMs"',
    '🏆 Price Tag Challenge hit 8,923 participants',
    '👥 AI Builders treasury reached $118.50',
    '💰 Community earned $1,247 in the last hour',
  ];

  const HomePage = () => (
    <Wrap>
      {/* Welcome Banner */}
      <div style={{ background: `linear-gradient(135deg, ${T.surface}, ${T.card})`, borderRadius: 20, padding: '20px 18px 16px', margin: '12px 0', border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${T.gold}15, transparent)`, filter: 'blur(30px)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>Welcome back</div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font }}>{me.name} {me.avatar}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: T.font }}>Rank</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.primary, fontFamily: T.mono }}>#{me.rank}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <div onClick={() => nav('wallet')} style={{ flex: 1, background: `${T.gold}08`, border: `1px solid ${T.gold}18`, borderRadius: 14, padding: '10px 14px', cursor: 'pointer' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, color: T.dim, fontFamily: T.font }}>HOURS Balance</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>{hours.toFixed(1)}</div>
            </div>
            <div onClick={() => nav('wallet')} style={{ flex: 1, background: `${T.accent}08`, border: `1px solid ${T.accent}18`, borderRadius: 14, padding: '10px 14px', cursor: 'pointer' }}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: 1.5, color: T.dim, fontFamily: T.font }}>Est. Value*</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: T.accent, fontFamily: T.mono }}>${(hours * 0.20).toFixed(2)}</div>
            </div>
          </div>
          {/* XP Bar */}
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontFamily: T.font, marginBottom: 4 }}>
              <span style={{ color: T.sub }}>🏅 Level {me.level} — {me.levelName}</span>
              <span style={{ color: T.dim }}>{me.xpCurrent}/{me.xpNext} XP</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: T.elevated, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(me.xpCurrent/me.xpNext)*100}%`, background: `linear-gradient(90deg, ${T.primary}, ${T.cyan})`, borderRadius: 3 }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 10 }}>
            {[
              { icon: '🔥', label: 'Streak', value: `${me.streak}d` },
              { icon: '🛡️', label: 'Trust', value: me.trust },
              { icon: '⚡', label: 'Quests', value: `${quests.filter(q=>q.done).length}/${quests.length}` },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16 }}>{s.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.mono, color: T.text }}>{s.value}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quest prompt */}
      <div style={{ background: `linear-gradient(90deg, ${T.gold}10, ${T.orange}10)`, border: `1px solid ${T.gold}20`, borderRadius: 14, padding: '10px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <span style={{ fontSize: 20 }}>⚡</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, fontFamily: T.font }}>{quests.filter(q=>!q.done).length} quests left</div>
          <div style={{ fontSize: 10, color: T.gold, fontFamily: T.font }}>Complete them all for a 2x bonus*</div>
        </div>
      </div>

      {/* Live Pulse */}
      <div style={{ overflow: 'hidden', borderRadius: 10, marginBottom: 14, background: `${T.primary}06`, border: `1px solid ${T.primary}12` }}>
        <div style={{ display: 'flex', gap: 40, whiteSpace: 'nowrap', padding: '7px 0', animation: 'ticker 25s linear infinite' }}>
          {[...pulse, ...pulse].map((m, i) => (
            <span key={i} style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Zone Grid */}
      <SectionHeader title="What are you in the mood for?" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
        {zones.map(z => (
          <div key={z.id} onClick={() => nav(z.id)} style={{ borderRadius: 18, overflow: 'hidden', cursor: 'pointer', background: T.card, border: `1px solid ${T.border}` }}>
            <div style={{ height: 52, background: z.gradient, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
              <span style={{ fontSize: 22 }}>{z.icon}</span>
              <span style={{ fontSize: 15, fontWeight: 800, fontFamily: T.font, color: '#fff' }}>{z.title}</span>
            </div>
            <div style={{ padding: '8px 14px 10px' }}>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font, marginBottom: 6 }}>{z.sub}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Badge text={z.count} />
                <span style={{ fontSize: 9, color: T.gold, fontFamily: T.mono, fontWeight: 600 }}>{z.earn}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <Card style={{ marginBottom: 12 }}>
        <SectionHeader title="🏆 Top Earners This Week" action="See All →" onAction={() => nav('arena')} />
        {[
          { rank: 1, name: 'Dev K.', hrs: 312.5, badge: '🥇' },
          { rank: 2, name: 'Priya P.', hrs: 287.2, badge: '🥈' },
          { rank: 3, name: 'Sarah C.', hrs: 251.8, badge: '🥉' },
          { rank: me.rank, name: `${me.name} (you)`, hrs: hours, badge: '', isMe: true },
        ].map((u, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 8px', borderRadius: 10, background: u.isMe ? `${T.primary}10` : 'transparent', border: u.isMe ? `1px solid ${T.primary}20` : '1px solid transparent', marginBottom: 2 }}>
            <span style={{ width: 26, textAlign: 'center', fontSize: u.badge ? 16 : 11, fontWeight: 700, color: T.dim, fontFamily: T.mono }}>{u.badge || `#${u.rank}`}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: u.isMe ? 700 : 500, fontFamily: T.font, color: u.isMe ? T.primary : T.text }}>{u.name}</span>
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: T.mono, color: T.gold }}>{u.hrs.toFixed(1)}</span>
          </div>
        ))}
      </Card>

      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // WATCH ZONE
  // ═══════════════════════════════════════
  const videos = [
    { id: 'v1', title: 'How I Built a $10K/mo SaaS', creator: '@indiehacker', views: '45K', duration: '12:30', type: 'tutorial', likes: 2340, comments: 187 },
    { id: 'v2', title: 'Tokyo Street Food at Midnight', creator: '@wandereats', views: '89K', duration: '0:58', type: 'short', likes: 8920, comments: 412 },
    { id: 'v3', title: 'The AI Agent Revolution', creator: '@futuredev', views: '23K', duration: '18:45', type: 'deep-dive', likes: 1560, comments: 234 },
    { id: 'v4', title: '5-Min Home Workout', creator: '@marcusfitness', views: '67K', duration: '5:32', type: 'fitness', likes: 5430, comments: 312 },
    { id: 'v5', title: 'Why I Left Instagram', creator: '@sarahbuilds', views: '34K', duration: '8:12', type: 'vlog', likes: 3210, comments: 567 },
    { id: 'v6', title: 'Sourdough from Scratch', creator: '@breadmaker', views: '12K', duration: '22:10', type: 'tutorial', likes: 890, comments: 123 },
  ];

  const WatchPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'shorts', label: '⚡ Shorts' },
          { id: 'longform', label: '📺 Long Form' },
          { id: 'live', label: '🔴 Live' },
          { id: 'following', label: '👥 Following' },
        ]} active={watchMode} onChange={setWatchMode} color="#8b5cf6" />
      </div>

      {expandedVideo ? (() => {
        const v = videos.find(x => x.id === expandedVideo);
        return (
          <div>
            {/* Video player placeholder */}
            <div style={{ height: 220, background: `linear-gradient(135deg, ${T.card}, ${T.elevated})`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>▶</div>
              <span style={{ position: 'absolute', bottom: 8, right: 12, background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontFamily: T.mono, color: '#fff' }}>{v.duration}</span>
              <div style={{ position: 'absolute', top: 8, right: 12, background: `${T.gold}cc`, padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, fontFamily: T.font }}>+HOURS ⏱️</div>
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, marginBottom: 6 }}>{v.title}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🎬</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font }}>{v.creator}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{v.views} views • 🛡️92 Trust</div>
              </div>
              <button style={{ marginLeft: 'auto', padding: '6px 16px', borderRadius: 8, border: `1px solid ${T.primary}`, background: `${T.primary}12`, color: T.primary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font }}>Follow</button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[
                { icon: '❤️', count: v.likes },
                { icon: '💬', count: v.comments },
                { icon: '🔄', count: 'Share' },
                { icon: '📌', count: 'Save' },
                { icon: '💸', count: 'Tip' },
              ].map((a, i) => (
                <button key={i} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.sub, fontSize: 10, fontFamily: T.font, cursor: 'pointer', textAlign: 'center' }}>
                  {a.icon}<br/>{typeof a.count === 'number' ? a.count.toLocaleString() : a.count}
                </button>
              ))}
            </div>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: T.font, marginBottom: 8 }}>Comments ({v.comments})</div>
              {['This changed my perspective entirely! 🙌', 'Earning HOURS while watching this? Love it.', 'More content like this please'].map((c, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none', fontSize: 12, color: T.sub, fontFamily: T.font }}>
                  <span style={{ fontWeight: 600, color: T.text }}>User{i+1}</span> {c}
                </div>
              ))}
            </Card>
            <button onClick={() => setExpandedVideo(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginTop: 10 }}>← Back to videos</button>
          </div>
        );
      })() : (
        <div>
          {watchMode === 'live' && (
            <Card style={{ marginBottom: 10, borderLeft: `3px solid ${T.red}` }} onClick={() => {}}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${T.red}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔴</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font }}>Creator Economy AMA</div>
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>@oursteam • 234 watching • HOURS 2x multiplier</div>
                </div>
                <Badge text="LIVE" color={T.red} />
              </div>
            </Card>
          )}
          {videos.filter(v => watchMode === 'shorts' ? v.type === 'short' || true : true).map(v => (
            <div key={v.id} onClick={() => setExpandedVideo(v.id)} style={{ background: T.card, borderRadius: 16, marginBottom: 8, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${T.border}` }}>
              <div style={{ height: 130, background: `linear-gradient(135deg, ${T.card}, ${T.elevated})`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>▶</div>
                <span style={{ position: 'absolute', bottom: 6, right: 10, background: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 4, fontSize: 10, fontFamily: T.mono, color: '#fff' }}>{v.duration}</span>
                <span style={{ position: 'absolute', top: 6, left: 10 }}><Badge text={v.type} color="#8b5cf6" /></span>
              </div>
              <div style={{ padding: '10px 14px' }}>
                <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font, marginBottom: 2 }}>{v.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.dim }}>
                  <span>{v.creator} • {v.views} views</span>
                  <HoursEarn amount="0.3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // READ ZONE
  // ═══════════════════════════════════════
  const articles = [
    { id: 'a1', title: 'Why 500K Followers Meant $0', creator: '@priyacooks', reads: '12K', time: '10 min', type: 'essay', preview: 'I spent 3 years building an audience on Instagram. I posted every day. I got brand deals. I did everything right. And I made almost nothing...' },
    { id: 'a2', title: 'The Death of Organic Reach', creator: '@growthlabs', reads: '8.2K', time: '7 min', type: 'analysis', preview: 'In 2016, a Facebook page post reached 26% of followers. In 2024, that number dropped to 2.2%. What happened?' },
    { id: 'a3', title: 'Building in Public: Month 3', creator: '@sarahbuilds', reads: '5.1K', time: '5 min', type: 'journal', preview: 'Revenue update: $2,847 this month. Here\'s exactly what worked and what didn\'t...' },
    { id: 'a4', title: 'The AI Agent Intelligence Report', creator: '@sentinelai', reads: '3.4K', time: '15 min', type: 'deep-dive', preview: 'We analyzed 148,000 AI agents on MoltBook to understand how autonomous trading signals form...' },
    { id: 'a5', title: 'How OURS Actually Pays Creators', creator: '@oursteam', reads: '24K', time: '8 min', type: 'explainer', preview: 'A transparent breakdown of how ad revenue flows from advertisers to your HOURS balance...' },
  ];

  const ReadPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'trending', label: '🔥 Trending' },
          { id: 'following', label: '👥 Following' },
          { id: 'new', label: '🆕 New' },
          { id: 'saved', label: '📌 Saved' },
        ]} active={readFilter} onChange={setReadFilter} color={T.primary} />
      </div>

      {expandedArticle ? (() => {
        const a = articles.find(x => x.id === expandedArticle);
        return (
          <div>
            <Badge text={a.type} />
            <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: T.font, lineHeight: 1.25, margin: '10px 0 8px' }}>{a.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📰</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font }}>{a.creator}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{a.reads} reads • {a.time} read • 🛡️ Verified</div>
              </div>
            </div>
            {/* Reading progress */}
            <div style={{ background: `${T.primary}10`, border: `1px solid ${T.primary}20`, borderRadius: 10, padding: '8px 12px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: T.primary, fontFamily: T.font }}>📖 Reading earns HOURS</span>
              <HoursEarn amount="0.8" />
            </div>
            {/* Article body placeholder */}
            <div style={{ fontSize: 15, color: T.sub, fontFamily: T.font, lineHeight: 1.8, marginBottom: 20 }}>
              <p style={{ marginBottom: 16 }}>{a.preview}</p>
              <p style={{ marginBottom: 16 }}>This is a preview of the full article content. In the live version, the complete article would render here with rich formatting, embedded media, pull quotes, and inline HOURS earning indicators as you scroll through the content.</p>
              <p style={{ marginBottom: 16 }}>The reading progress bar at the top would advance as you scroll, and HOURS would accumulate in real-time — rewarding quality attention, not just clicks.</p>
              <div style={{ background: T.card, borderLeft: `3px solid ${T.gold}`, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontStyle: 'italic', color: T.text, fontFamily: T.font }}>"The platforms profit from your attention. On OURS, your attention profits you."</div>
              </div>
              <p>Full article continues with detailed analysis, data, and conclusions...</p>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {['❤️ Like', '💬 Comment', '🔄 Share', '📌 Save', '💸 Tip'].map((a, i) => (
                <button key={i} style={{ flex: 1, padding: '10px 0', borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.sub, fontSize: 10, fontFamily: T.font, cursor: 'pointer', textAlign: 'center' }}>{a}</button>
              ))}
            </div>
            <button onClick={() => setExpandedArticle(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font }}>← Back to articles</button>
          </div>
        );
      })() : (
        articles.map(a => (
          <Card key={a.id} style={{ marginBottom: 8 }} onClick={() => setExpandedArticle(a.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <Badge text={a.type} />
              <HoursEarn amount="0.8" />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: T.font, lineHeight: 1.3, margin: '6px 0' }}>{a.title}</h3>
            <p style={{ fontSize: 12, color: T.dim, fontFamily: T.font, lineHeight: 1.5, margin: '0 0 8px' }}>{a.preview.slice(0, 100)}...</p>
            <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font }}>{a.creator} • {a.reads} reads • {a.time}</div>
          </Card>
        ))
      )}
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // COMMUNITY ZONE
  // ═══════════════════════════════════════
  const groups = [
    { id: 'g1', name: 'Indie Hackers Bay Area', icon: '🚀', members: '1.2K', unread: 14, treasury: '$42.80', desc: 'Builders shipping products in the Bay Area.', posts: 234 },
    { id: 'g2', name: 'AI Builders Club', icon: '🤖', members: '3.4K', unread: 32, treasury: '$118.50', desc: 'AI, agents, LLMs — if it thinks, we build it.', posts: 567 },
    { id: 'g3', name: 'Solopreneur Kitchen', icon: '🍕', members: '890', unread: 7, treasury: '$23.10', desc: 'One-person businesses sharing wins.', posts: 123 },
    { id: 'g4', name: 'Creative Writing Circle', icon: '✍️', members: '2.1K', unread: 19, treasury: '$67.20', desc: 'Writers helping writers.', posts: 345 },
  ];

  const CommunityPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'my', label: '🏠 My Groups' },
          { id: 'discover', label: '🔍 Discover' },
          { id: 'create', label: '➕ Create' },
        ]} active={communityTab} onChange={setCommunityTab} color={T.accent} />
      </div>

      {expandedGroup ? (() => {
        const g = groups.find(x => x.id === expandedGroup);
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, margin: 0 }}>{g.name}</h2>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{g.members} members • {g.posts} posts</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 16 }}>{g.desc}</p>

            {/* Treasury */}
            <Card style={{ marginBottom: 12, borderLeft: `3px solid ${T.accent}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, color: T.dim, fontFamily: T.font }}>Group Treasury*</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: T.accent, fontFamily: T.mono }}>{g.treasury}</div>
                </div>
                <div style={{ fontSize: 10, color: T.sub, fontFamily: T.font, textAlign: 'right' }}>Shared among<br/>active members</div>
              </div>
            </Card>

            {/* Mod election */}
            <Card style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: T.font, marginBottom: 6 }}>🗳️ Moderator Election</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Next election in 12 days. Current mods: 3. <span style={{ color: T.primary, cursor: 'pointer' }}>View candidates →</span></div>
            </Card>

            {/* Sample discussion posts */}
            {['Has anyone tried the new MCP integration? Seeing 40% faster response times.', 'Weekly wins thread! Drop your best moment this week 🏆', 'Looking for beta testers for my AI writing assistant'].map((post, i) => (
              <Card key={i} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>👤</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: T.font }}>Member{i+1} <span style={{ fontWeight: 400, color: T.dim }}>• {i+1}h ago</span></div>
                    <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginTop: 2 }}>{post}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 10, color: T.dim }}>
                      <span>❤️ {12 + i * 7}</span>
                      <span>💬 {3 + i * 2}</span>
                      <span style={{ color: T.gold }}>+0.2 HRS</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <button onClick={() => setExpandedGroup(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginTop: 10 }}>← Back to groups</button>
          </div>
        );
      })() : communityTab === 'create' ? (
        <Card>
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: T.font, marginBottom: 12 }}>Create a Group</h3>
          {['Group Name', 'Description', 'Category'].map((field, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 11, color: T.dim, fontFamily: T.font, display: 'block', marginBottom: 4 }}>{field}</label>
              <input placeholder={`Enter ${field.toLowerCase()}...`} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: T.font, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: T.dim, fontFamily: T.font, display: 'block', marginBottom: 4 }}>Privacy</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Public', 'Private', 'Secret'].map(p => (
                <button key={p} style={{ flex: 1, padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font }}>{p}</button>
              ))}
            </div>
          </div>
          <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${T.accent}, ${T.primary})`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>Create Group</button>
        </Card>
      ) : (
        groups.map(g => (
          <Card key={g.id} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }} onClick={() => setExpandedGroup(g.id)}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font }}>{g.name}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{g.members} members{g.unread > 0 && <span style={{ color: T.primary }}> • {g.unread} new</span>}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.accent, fontFamily: T.mono }}>{g.treasury}</div>
              <div style={{ fontSize: 9, color: T.dim }}>treasury*</div>
            </div>
          </Card>
        ))
      )}
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // SHOP ZONE
  // ═══════════════════════════════════════
  const products = [
    { id: 'p1', title: 'Complete Python Bootcamp', seller: '@sarahbuilds', price: 29, sold: 142, rating: 4.8, icon: '📚', category: 'Education', creatorCut: 27.55 },
    { id: 'p2', title: '30-Day HIIT Program', seller: '@marcusfitness', price: 19, sold: 89, rating: 4.9, icon: '💪', category: 'Fitness', creatorCut: 18.05 },
    { id: 'p3', title: 'SaaS Dashboard UI Kit', seller: '@alexdesigns', price: 49, sold: 67, rating: 4.6, icon: '🎨', category: 'Design', creatorCut: 46.55 },
    { id: 'p4', title: 'SEO Mastery Guide 2026', seller: '@growthhacker', price: 39, sold: 156, rating: 4.5, icon: '📊', category: 'Marketing', creatorCut: 37.05 },
    { id: 'p5', title: 'Recipe Collection: Asian Fusion', seller: '@priyacooks', price: 12, sold: 234, rating: 4.7, icon: '🍜', category: 'Food', creatorCut: 11.40 },
    { id: 'p6', title: 'Meditation Audio Pack', seller: '@zenmaster', price: 15, sold: 312, rating: 4.9, icon: '🧘', category: 'Wellness', creatorCut: 14.25 },
  ];

  const ShopPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'browse', label: '🔥 Browse' },
          { id: 'mystore', label: '🏪 My Storefront' },
          { id: 'purchases', label: '📦 Purchases' },
        ]} active={shopTab} onChange={setShopTab} color={T.orange} />
      </div>

      {expandedProduct ? (() => {
        const p = products.find(x => x.id === expandedProduct);
        return (
          <div>
            <div style={{ fontSize: 56, textAlign: 'center', marginBottom: 12 }}>{p.icon}</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, textAlign: 'center', marginBottom: 4 }}>{p.title}</h2>
            <div style={{ textAlign: 'center', fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 16 }}>by {p.seller} • ⭐{p.rating} • {p.sold} sold</div>

            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: T.accent, fontFamily: T.font }}>${p.price}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: T.accent, fontWeight: 700, fontFamily: T.mono }}>Creator gets ~${p.creatorCut}*</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font }}>Target: ~{Math.round(p.creatorCut/p.price*100)}% to creator</div>
                </div>
              </div>
              <button style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000', fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: T.font }}>Buy Now — ${p.price}</button>
            </Card>

            <Card style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font, marginBottom: 8 }}>Reviews ({Math.floor(p.sold * 0.4)})</div>
              {['Incredible value. Changed my workflow completely.', 'Clear, well-structured, and actually useful.', 'Worth every penny and more.'].map((r, i) => (
                <div key={i} style={{ padding: '8px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none', fontSize: 12, color: T.sub, fontFamily: T.font }}>
                  <span style={{ color: T.gold }}>⭐⭐⭐⭐⭐</span> <span style={{ fontWeight: 600, color: T.text }}>Verified Buyer</span><br/>{r}
                </div>
              ))}
            </Card>
            <button onClick={() => setExpandedProduct(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font }}>← Back to shop</button>
          </div>
        );
      })() : shopTab === 'mystore' ? (
        <div>
          <Card style={{ marginBottom: 12, textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🏪</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: T.font, marginBottom: 4 }}>Your Storefront</h3>
            <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 16 }}>Sell courses, templates, art, services. Keep up to ~95% of every sale.*</p>
            <button style={{ padding: '12px 28px', borderRadius: 10, border: 'none', background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>+ List Your First Product</button>
          </Card>
          <Card>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: T.font, marginBottom: 8 }}>Seller Stats</div>
            {[['Products Listed', '0'], ['Total Sales', '$0.00'], ['Creator Rating', 'N/A'], ['Payout Method', 'Not set']].map(([k, v], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none', fontSize: 12, fontFamily: T.font }}>
                <span style={{ color: T.sub }}>{k}</span>
                <span style={{ color: T.dim }}>{v}</span>
              </div>
            ))}
          </Card>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {products.map(p => (
            <Card key={p.id} onClick={() => setExpandedProduct(p.id)}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font, lineHeight: 1.3, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginBottom: 6 }}>{p.seller}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: T.accent, fontFamily: T.font }}>${p.price}</span>
                <span style={{ fontSize: 9, color: T.sub }}>⭐{p.rating}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // MESSAGES
  // ═══════════════════════════════════════
  const conversations = [
    { id: 'm1', name: 'Sarah Chen', preview: 'Hey! Want to collab on that affiliate setup?', time: '12m', unread: true, avatar: '👩‍💻' },
    { id: 'm2', name: 'AI Builders Club', preview: 'Dev K: Has anyone tried the new MCP integration...', time: '1h', unread: true, avatar: '🤖', group: true },
    { id: 'm3', name: 'Marcus Johnson', preview: 'Thanks for the shoutout! 🙏', time: '3h', unread: false, avatar: '💪' },
    { id: 'm4', name: 'OURS Support', preview: 'Your storefront has been approved!', time: '5h', unread: false, avatar: '🛡️', official: true },
  ];

  const MessagesPage = () => (
    <Wrap>
      <Card style={{ margin: '8px 0 12px', background: `${T.accent}08`, borderColor: `${T.accent}20` }}>
        <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>
          <span style={{ fontWeight: 700, color: T.accent }}>🔐 End-to-end encrypted.</span> Not scanned for ads. Not used to train AI. Not sold. Private.
        </div>
      </Card>

      {msgThread ? (() => {
        const c = conversations.find(x => x.id === msgThread);
        return (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <button onClick={() => setMsgThread(null)} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 16, cursor: 'pointer' }}>←</button>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{c.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font }}>{c.name}</div>
                <div style={{ fontSize: 10, color: T.accent, fontFamily: T.font }}>🔐 Encrypted</div>
              </div>
            </div>
            {/* Chat bubbles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ alignSelf: 'flex-start', background: T.card, borderRadius: '16px 16px 16px 4px', padding: '10px 14px', maxWidth: '80%' }}>
                <div style={{ fontSize: 13, color: T.text, fontFamily: T.font }}>{c.preview}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, marginTop: 4 }}>{c.time} ago</div>
              </div>
              <div style={{ alignSelf: 'flex-end', background: `${T.primary}22`, borderRadius: '16px 16px 4px 16px', padding: '10px 14px', maxWidth: '80%' }}>
                <div style={{ fontSize: 13, color: T.text, fontFamily: T.font }}>That sounds great! Let's set up a time to chat about it.</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: T.font, marginTop: 4 }}>Just now</div>
              </div>
            </div>
            {/* Compose */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Type a message..." style={{ flex: 1, padding: '12px 14px', borderRadius: 24, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: T.font, outline: 'none' }} />
              <button style={{ width: 44, height: 44, borderRadius: '50%', border: 'none', background: T.primary, color: '#fff', fontSize: 16, cursor: 'pointer' }}>→</button>
            </div>
          </div>
        );
      })() : (
        conversations.map(c => (
          <div key={c.id} onClick={() => setMsgThread(c.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, marginBottom: 4, cursor: 'pointer',
            background: c.unread ? `${T.primary}08` : 'transparent', border: `1px solid ${c.unread ? `${T.primary}12` : T.border}`,
          }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, position: 'relative' }}>
              {c.avatar}
              {c.group && <span style={{ position: 'absolute', bottom: -2, right: -2, fontSize: 10, background: T.card, borderRadius: '50%', padding: 2 }}>👥</span>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: c.unread ? 700 : 500, fontFamily: T.font }}>{c.name}</span>
                <span style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{c.time}</span>
              </div>
              <div style={{ fontSize: 12, color: c.unread ? T.text : T.dim, fontFamily: T.font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.preview}</div>
            </div>
            {c.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: T.primary, flexShrink: 0 }} />}
          </div>
        ))
      )}
    </Wrap>
  );

  // ═══════════════════════════════════════
  // WALLET
  // ═══════════════════════════════════════
  const WalletPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${T.surface}, ${T.card})`, borderRadius: 20, padding: 24, marginBottom: 12, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${T.gold}15, transparent)`, filter: 'blur(30px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: T.font }}>Total HOURS</div>
            <div style={{ fontSize: 42, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>{hours.toFixed(1)}</div>
            <div style={{ fontSize: 14, color: T.sub, fontFamily: T.font }}>≈ ${(hours * 0.20).toFixed(2)} USD estimated*</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <div><span style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>Level</span><br/><span style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font }}>🏅 {me.levelName}</span></div>
              <div><span style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>Trust</span><br/><span style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font }}>🛡️ {me.trust}</span></div>
              <div><span style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>Streak</span><br/><span style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font }}>🔥 {me.streak}d</span></div>
            </div>
          </div>
        </div>

        <Tabs tabs={[
          { id: 'overview', label: '📊 Overview' },
          { id: 'history', label: '📋 History' },
          { id: 'payout', label: '💳 Payout' },
        ]} active={walletTab} onChange={setWalletTab} color={T.gold} />

        {walletTab === 'overview' && (
          <div>
            <SectionHeader title="Earnings Breakdown" />
            {[
              { label: 'Content Creation', hrs: 82.3, pct: 58, color: T.primary },
              { label: 'Group Engagement', hrs: 41.2, pct: 29, color: T.accent },
              { label: 'Storefront Sales', hrs: 12.0, pct: 8, color: T.gold },
              { label: 'Moderation', hrs: 7.0, pct: 5, color: T.purple },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: T.font, marginBottom: 3 }}>
                  <span style={{ color: T.sub }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color, fontFamily: T.mono }}>{s.hrs} hrs ({s.pct}%)</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: T.elevated, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {walletTab === 'history' && (
          <div>
            {[
              { type: 'Post engagement', amount: '+0.5', time: '2h ago', color: T.primary },
              { type: 'Video watched', amount: '+0.3', time: '3h ago', color: T.purple },
              { type: 'Daily reward', amount: '+3.0', time: '6h ago', color: T.gold },
              { type: 'Comment engagement', amount: '+0.2', time: '8h ago', color: T.primary },
              { type: 'Quest: Post something', amount: '+2.0', time: '1d ago', color: T.accent },
              { type: 'Storefront sale', amount: '+4.5', time: '1d ago', color: T.gold },
              { type: 'Governance vote', amount: '+0.5', time: '2d ago', color: T.cyan },
            ].map((tx, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, fontFamily: T.font, color: T.text }}>{tx.type}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{tx.time}</div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: tx.color, fontFamily: T.mono }}>{tx.amount} HRS</span>
              </div>
            ))}
          </div>
        )}

        {walletTab === 'payout' && (
          <Card>
            <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: T.font, marginBottom: 12 }}>Payout Settings</h3>
            {['PayPal', 'Bank Transfer', 'Crypto Wallet'].map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 13, fontFamily: T.font, color: T.sub }}>{m}</span>
                <button style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.surface, color: T.primary, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font }}>Connect</button>
              </div>
            ))}
            <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginTop: 12, lineHeight: 1.5 }}>Minimum payout: $10.00. Payouts processed weekly. Tax documentation required for payouts over $600/year (US residents).</div>
          </Card>
        )}
        <Disclaimer />
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // GOVERN ZONE
  // ═══════════════════════════════════════
  const votes = [
    { id: 'v1', title: 'Add disappearing messages to DMs?', votes: 7284, deadline: '2 days', options: ['Yes — 24hr default', 'Yes — user-controlled timer', 'No — keep permanent'] },
    { id: 'v2', title: 'Should AI-generated content be labeled?', votes: 12451, deadline: '5 days', options: ['Mandatory labels', 'Creator\'s choice', 'No labeling'] },
    { id: 'v3', title: 'Elect Q2 Community Moderators', votes: 3892, deadline: '1 week', options: ['View candidates'] },
  ];

  const GovernPage = () => (
    <Wrap>
      <Card style={{ margin: '8px 0 12px', background: `${T.cyan}08`, borderColor: `${T.cyan}20` }}>
        <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>
          <span style={{ fontWeight: 700, color: T.cyan }}>Your HOURS = your voting power.*</span> This is aspirational governance — structures may evolve. Platform retains operational authority for safety and legal compliance.
        </div>
      </Card>
      <Tabs tabs={[
        { id: 'active', label: '🗳️ Active Votes' },
        { id: 'past', label: '📜 Past Results' },
        { id: 'propose', label: '📝 Propose' },
      ]} active={governTab} onChange={setGovernTab} color={T.cyan} />

      {expandedVote ? (() => {
        const v = votes.find(x => x.id === expandedVote);
        return (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, lineHeight: 1.3, marginBottom: 8 }}>{v.title}</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 11, color: T.sub, fontFamily: T.font }}>
              <span>{v.votes.toLocaleString()} votes cast</span>
              <span>•</span>
              <span style={{ color: T.red }}>{v.deadline} remaining</span>
            </div>
            {v.options.map((o, i) => (
              <button key={i} style={{
                width: '100%', padding: '14px 16px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.card,
                color: T.text, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: T.font, marginBottom: 8, textAlign: 'left',
              }}>
                <div>{o}</div>
                <div style={{ height: 6, borderRadius: 3, background: T.elevated, marginTop: 8, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${30 + Math.random() * 40}%`, background: T.cyan, borderRadius: 3 }} />
                </div>
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <span style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Your voting power: <span style={{ color: T.gold, fontWeight: 700 }}>{hours.toFixed(1)} HOURS</span></span>
              <HoursEarn amount="0.5" />
            </div>
            <button onClick={() => setExpandedVote(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginTop: 12 }}>← Back to votes</button>
          </div>
        );
      })() : (
        votes.map(v => (
          <Card key={v.id} style={{ marginBottom: 8 }} onClick={() => setExpandedVote(v.id)}>
            <div style={{ fontWeight: 700, fontSize: 15, fontFamily: T.font, lineHeight: 1.3, marginBottom: 6 }}>{v.title}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.dim, fontFamily: T.font }}>
              <span>{v.votes.toLocaleString()} votes • {v.deadline} left</span>
              <HoursEarn amount="0.5" />
            </div>
          </Card>
        ))
      )}
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // ARENA ZONE
  // ═══════════════════════════════════════
  const challenges = [
    { id: 'c1', title: '7-Day Content Challenge', reward: '+50 HOURS', participants: 1247, deadline: '3 days', progress: 57, desc: 'Post every day for 7 days. Any format counts.' },
    { id: 'c2', title: 'Best Tutorial of the Week', reward: '+100 HOURS', participants: 342, deadline: '5 days', progress: 0, desc: 'Create the most helpful tutorial. Community votes the winner.' },
    { id: 'c3', title: 'Price Tag Challenge', reward: '+25 HOURS', participants: 8923, deadline: '1 day', progress: 100, desc: 'Share your Price Tag Calculator results. Most shares wins.' },
  ];

  const ArenaPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'challenges', label: '🎯 Challenges' },
          { id: 'leaderboards', label: '🏆 Leaderboards' },
          { id: 'events', label: '📅 Events' },
        ]} active={arenaTab} onChange={setArenaTab} color={T.gold} />

        {arenaTab === 'leaderboards' ? (
          <div>
            {['Global This Week', 'All Time', 'Creators', 'Communities'].map((board, bi) => (
              <Card key={bi} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: T.font, marginBottom: 8 }}>{board}</div>
                {[
                  { name: 'Dev K.', hrs: 312 + bi * 100 },
                  { name: 'Priya P.', hrs: 287 + bi * 80 },
                  { name: 'Sarah C.', hrs: 251 + bi * 60 },
                ].map((u, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, fontFamily: T.font }}>
                    <span style={{ width: 20, fontSize: 14, textAlign: 'center' }}>{['🥇','🥈','🥉'][i]}</span>
                    <span style={{ flex: 1, color: T.sub }}>{u.name}</span>
                    <span style={{ fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{u.hrs}</span>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        ) : expandedChallenge ? (() => {
          const c = challenges.find(x => x.id === expandedChallenge);
          return (
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, fontFamily: T.font, marginBottom: 4 }}>{c.title}</h2>
              <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 16 }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <Card style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>{c.reward}</div>
                  <div style={{ fontSize: 9, color: T.dim }}>Prize*</div>
                </Card>
                <Card style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, fontFamily: T.mono }}>{c.participants.toLocaleString()}</div>
                  <div style={{ fontSize: 9, color: T.dim }}>Participants</div>
                </Card>
              </div>
              {c.progress > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: T.font, marginBottom: 4 }}>
                    <span style={{ color: T.sub }}>Your progress</span>
                    <span style={{ color: c.progress === 100 ? T.accent : T.primary }}>{c.progress}%</span>
                  </div>
                  <div style={{ height: 10, borderRadius: 5, background: T.elevated, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${c.progress}%`, background: c.progress === 100 ? T.accent : `linear-gradient(90deg, ${T.primary}, ${T.cyan})`, borderRadius: 5 }} />
                  </div>
                </div>
              )}
              <button style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: c.progress === 100 ? T.accent : `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: c.progress === 100 ? '#fff' : '#000', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>
                {c.progress === 100 ? '✓ Completed!' : 'Join Challenge →'}
              </button>
              <button onClick={() => setExpandedChallenge(null)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginTop: 8 }}>← Back</button>
            </div>
          );
        })() : (
          challenges.map(c => (
            <Card key={c.id} style={{ marginBottom: 8 }} onClick={() => setExpandedChallenge(c.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: T.font }}>{c.title}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{c.reward}</span>
              </div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font, marginBottom: 8 }}>{c.participants.toLocaleString()} participants • {c.deadline} left</div>
              {c.progress > 0 && (
                <div style={{ height: 6, borderRadius: 3, background: T.elevated, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.progress}%`, background: c.progress === 100 ? T.accent : T.primary, borderRadius: 3 }} />
                </div>
              )}
            </Card>
          ))
        )}
        <Disclaimer />
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // EXPLORE ZONE
  // ═══════════════════════════════════════
  const ExplorePage = () => (
    <Wrap>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', margin: '8px 0 12px' }}>
        {['All', '🎨 Art', '📐 Design', '🍜 Food', '🏔️ Travel', '💻 Tech', '🏋️ Fitness', '🎵 Music'].map((cat, i) => (
          <button key={i} style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: T.font, whiteSpace: 'nowrap', background: i === 0 ? `${T.pink}18` : T.surface, border: `1px solid ${i === 0 ? T.pink : T.border}`, color: i === 0 ? T.pink : T.dim }}>{cat}</button>
        ))}
      </div>
      <div style={{ columnCount: 2, columnGap: 6 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const heights = [140, 180, 160, 200, 150, 170, 190, 130, 175, 155, 165, 145];
          const hues = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#0ea5e9', '#8b5cf6', '#f43f5e', '#06b6d4', '#a78bfa', '#fb923c', '#22d3ee', '#14b8a6'];
          const icons = ['🏔️','🎨','🍜','📐','🌊','🎭','🏙️','🌸','⚡','🎪','🦋','🔮'];
          return (
            <div key={i} style={{ height: heights[i], borderRadius: 12, background: `linear-gradient(135deg, ${hues[i]}18, ${hues[i]}06)`, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, cursor: 'pointer', marginBottom: 6, breakInside: 'avoid', position: 'relative' }}>
              {icons[i]}
              <span style={{ position: 'absolute', bottom: 6, right: 8, fontSize: 9, color: T.dim, fontFamily: T.font }}>📌 +0.1</span>
            </div>
          );
        })}
      </div>
      <Disclaimer />
    </Wrap>
  );

  // ═══════════════════════════════════════
  // LISTEN ZONE
  // ═══════════════════════════════════════
  const ListenPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'live', label: '🔴 Live Rooms' },
          { id: 'podcasts', label: '🎧 Podcasts' },
          { id: 'playlists', label: '🎵 Playlists' },
        ]} active={listenTab} onChange={setListenTab} color={T.purple} />

        {listenTab === 'live' && (
          <div>
            <Card style={{ marginBottom: 8, borderLeft: `3px solid ${T.red}` }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.red}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔴</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font }}>Creator Economy AMA</div>
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>@oursteam • 234 listening</div>
                  <div style={{ fontSize: 10, color: T.gold, fontFamily: T.font, marginTop: 2 }}>🎙️ HOURS 2x multiplier active</div>
                </div>
                <button style={{ padding: '6px 14px', borderRadius: 8, background: T.red, border: 'none', color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: T.font, alignSelf: 'center' }}>Join</button>
              </div>
            </Card>
            <Card style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>📅</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: T.font }}>Weekly Builder Hangout</div>
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Starting in 2 hours • 45 interested</div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {listenTab === 'podcasts' && (
          [
            { title: "The Builder's Podcast #47", host: '@devbuilds', plays: '4.2K', duration: '42 min' },
            { title: 'Creator Economy Weekly', host: '@growthlabs', plays: '8.1K', duration: '35 min' },
            { title: 'AI Unpacked: Agent Networks', host: '@sentinelai', plays: '2.3K', duration: '58 min' },
          ].map((p, i) => (
            <Card key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎧</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font }}>{p.title}</div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{p.host} • {p.plays} plays • {p.duration}</div>
              </div>
              <HoursEarn amount="0.2" />
            </Card>
          ))
        )}

        {listenTab === 'playlists' && (
          [
            { title: 'Morning Motivation Mix', curator: '@zenmaster', tracks: 24, plays: '1.8K' },
            { title: 'Focus & Flow', curator: '@productivityhub', tracks: 32, plays: '3.4K' },
            { title: 'Chill Coding', curator: '@devbuilds', tracks: 18, plays: '2.1K' },
          ].map((p, i) => (
            <Card key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${T.purple}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🎵</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, fontFamily: T.font }}>{p.title}</div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>{p.curator} • {p.tracks} tracks • {p.plays} plays</div>
              </div>
              <HoursEarn amount="0.1" />
            </Card>
          ))
        )}
        <Disclaimer />
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // PROFILE
  // ═══════════════════════════════════════
  const ProfilePage = () => (
    <Wrap>
      <div style={{ textAlign: 'center', padding: '20px 0 12px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 10px' }}>{me.avatar}</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: T.font, margin: 0 }}>{me.name}</h2>
        <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font }}>{me.handle} • Joined {me.joined}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 6 }}>
          <Badge text={`🏅 Lvl ${me.level}`} color={T.primary} />
          <Badge text={`🛡️ ${me.trust}`} color={T.accent} />
          <Badge text="👤 Human" color={T.cyan} />
        </div>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: T.font, margin: '10px 0', lineHeight: 1.5 }}>{me.bio}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 12 }}>
          {[
            { value: me.posts, label: 'Posts' },
            { value: me.followers, label: 'Followers' },
            { value: me.following, label: 'Following' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: T.mono, color: T.text }}>{s.value}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button onClick={() => nav('settings')} style={{ padding: '8px 20px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.sub, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: T.font }}>⚙️ Edit Profile</button>
          <button onClick={() => nav('wallet')} style={{ padding: '8px 20px', borderRadius: 10, border: `1px solid ${T.gold}40`, background: `${T.gold}10`, color: T.gold, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: T.font }}>💰 {hours.toFixed(1)} HRS</button>
        </div>
      </div>

      <Tabs tabs={[
        { id: 'posts', label: '📝 Posts' },
        { id: 'videos', label: '🎬 Videos' },
        { id: 'articles', label: '📰 Articles' },
        { id: 'store', label: '🛍️ Store' },
      ]} active={profileTab} onChange={setProfileTab} />

      {['Sample post about building in public...', 'Just shipped a new feature for our dashboard!', 'Thoughts on the creator economy in 2026...'].map((post, i) => (
        <Card key={i} style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, lineHeight: 1.5 }}>{post}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 10, color: T.dim }}>
            <span>❤️ {23 + i * 11}</span>
            <span>💬 {5 + i * 3}</span>
            <span>🔄 {2 + i}</span>
            <span style={{ color: T.gold, marginLeft: 'auto' }}>+{(0.3 + i * 0.2).toFixed(1)} HRS</span>
          </div>
        </Card>
      ))}
    </Wrap>
  );

  // ═══════════════════════════════════════
  // SETTINGS
  // ═══════════════════════════════════════
  const SettingsPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'account', label: '👤 Account' },
          { id: 'privacy', label: '🔒 Privacy' },
          { id: 'feed', label: '🎛️ Feed' },
          { id: 'wellness', label: '🧘 Wellness' },
          { id: 'security', label: '🛡️ Security' },
        ]} active={settingsTab} onChange={setSettingsTab} />

        {settingsTab === 'account' && (
          <div>
            {[
              { label: 'Display Name', value: me.name },
              { label: 'Handle', value: me.handle },
              { label: 'Email', value: 'roger@example.com' },
              { label: 'Bio', value: me.bio },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, color: T.dim, fontFamily: T.font, display: 'block', marginBottom: 4 }}>{f.label}</label>
                <input defaultValue={f.value} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: T.font, outline: 'none' }} />
              </div>
            ))}
            <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: T.primary, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: T.font }}>Save Changes</button>

            <div style={{ borderTop: `1px solid ${T.border}`, marginTop: 24, paddingTop: 16 }}>
              <button onClick={() => nav('legal')} style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginBottom: 8, textAlign: 'left' }}>📜 Terms of Service →</button>
              <button onClick={() => nav('legal')} style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginBottom: 8, textAlign: 'left' }}>🔒 Privacy Policy →</button>
              <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.red}30`, background: `${T.red}08`, color: T.red, fontSize: 12, cursor: 'pointer', fontFamily: T.font, textAlign: 'left' }}>🗑️ Delete Account & Data →</button>
            </div>
          </div>
        )}

        {settingsTab === 'privacy' && (
          <div>
            <SectionHeader title="🔒 Privacy Dashboard" />
            <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 16, lineHeight: 1.5 }}>See exactly what OURS knows. Control everything. Delete anything.</p>
            {[
              { label: 'AI Training Opt-Out', desc: 'Your content will NOT be used to train AI models', enabled: true },
              { label: 'Ad Personalization', desc: 'Show relevant ads based on interests', enabled: true },
              { label: 'Public Profile', desc: 'Allow non-followers to see your posts', enabled: true },
              { label: 'Activity Status', desc: 'Show when you\'re online', enabled: false },
              { label: 'Search Engine Indexing', desc: 'Allow Google to index your profile', enabled: false },
              { label: 'Data Collection Analytics', desc: 'Help improve OURS with anonymous usage data', enabled: true },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{s.desc}</div>
                </div>
                <div style={{ width: 40, height: 22, borderRadius: 11, background: s.enabled ? T.accent : T.elevated, cursor: 'pointer', position: 'relative' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: s.enabled ? 20 : 2, transition: 'left 0.2s' }} />
                </div>
              </div>
            ))}
            <button onClick={() => nav('legal')} style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.primary}`, background: `${T.primary}10`, color: T.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: T.font, marginTop: 16 }}>📥 Download All My Data</button>
          </div>
        )}

        {settingsTab === 'feed' && (
          <div>
            <SectionHeader title="🎛️ Feed Control" />
            <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 16, lineHeight: 1.5 }}>Your feed, your rules. Unlike other platforms, we'll never secretly change these.</p>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontFamily: T.font, marginBottom: 10 }}>
                <span style={{ color: T.primary }}>🕐 Chronological</span>
                <span style={{ color: T.purple }}>✨ Discovery</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="50" style={{ width: '100%', accentColor: T.primary }} />
            </Card>
            {['Muted Topics', 'Blocked Keywords', 'Content Type Preferences', 'Political Content'].map((s, i) => (
              <button key={i} style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginBottom: 6, textAlign: 'left' }}>{s} →</button>
            ))}
          </div>
        )}

        {settingsTab === 'wellness' && (
          <div>
            <SectionHeader title="🧘 Wellness Settings" />
            <p style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 16, lineHeight: 1.5 }}>We don't want you addicted. We want you enriched.</p>
            {[
              { label: 'Daily Time Limit', desc: 'Get a nudge after this many minutes', value: '60 min' },
              { label: 'Break Reminders', desc: 'Remind me to take breaks', value: 'Every 30 min' },
              { label: 'All Caught Up', desc: 'Show endpoint when feed is exhausted', value: 'On' },
              { label: 'Hide Like Counts', desc: 'Don\'t show numeric like counts on posts', value: 'Off' },
              { label: 'Doomscroll Prevention', desc: 'Slow down feed after extended scrolling', value: 'On' },
              { label: 'Bedtime Mode', desc: 'Dimmed interface and gentle reminders after...', value: '10 PM' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{s.desc}</div>
                </div>
                <span style={{ fontSize: 11, color: T.primary, fontFamily: T.mono, fontWeight: 600 }}>{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {settingsTab === 'security' && (
          <div>
            <SectionHeader title="🛡️ Security" />
            {[
              { label: 'Two-Factor Authentication', status: 'Enabled', color: T.accent },
              { label: 'Active Sessions', status: '2 devices', color: T.primary },
              { label: 'Login Notifications', status: 'Email + Push', color: T.primary },
              { label: 'Trusted Devices', status: '1 device', color: T.accent },
              { label: 'Security Score', status: '94/100', color: T.gold },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 500, fontFamily: T.font, color: T.sub }}>{s.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: T.mono }}>{s.status}</span>
              </div>
            ))}
            <button style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 12, cursor: 'pointer', fontFamily: T.font, marginTop: 12 }}>Change Password →</button>
          </div>
        )}
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // LEGAL
  // ═══════════════════════════════════════
  const LegalPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'terms', label: '📜 Terms' },
          { id: 'privacy', label: '🔒 Privacy' },
          { id: 'disclosures', label: '📋 Disclosures' },
          { id: 'guidelines', label: '🤝 Guidelines' },
        ]} active={legalTab} onChange={setLegalTab} color={T.purple} />

        <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, lineHeight: 1.8 }}>
          {legalTab === 'terms' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, color: T.text, margin: '0 0 12px' }}>Terms of Service</h2>
              <p><strong>Last updated:</strong> February 2026</p>
              <p>Welcome to OURS. These Terms of Service govern your use of the OURS platform, including our website, applications, and services.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>1. Acceptance of Terms</h3>
              <p>By accessing or using OURS, you agree to be bound by these Terms. If you disagree, you may not use the platform.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>2. HOURS Token</h3>
              <p>HOURS is a platform engagement metric. It is not a cryptocurrency, security, or investment vehicle. HOURS have no guaranteed cash value. The estimated USD value displayed is based on the platform's current ad revenue model and may fluctuate. OURS reserves the right to modify the HOURS system.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>3. Revenue Sharing</h3>
              <p>Revenue percentages (such as 70% to users, ~95% to storefront creators) are targets, not guarantees. Actual percentages may vary based on platform revenue, operating costs, regulatory requirements, and growth stage.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>4. Content Ownership</h3>
              <p>You retain ownership of content you create and post on OURS. You grant OURS a license to display, distribute, and promote your content within the platform. You may export or delete your content at any time.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>5. Governance</h3>
              <p>Community governance features are aspirational and planned for future implementation. OURS retains full operational authority for legal compliance, safety, and platform integrity regardless of community votes. Governance structures may evolve.</p>
            </div>
          )}
          {legalTab === 'privacy' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, color: T.text, margin: '0 0 12px' }}>Privacy Policy</h2>
              <p><strong>Last updated:</strong> February 2026</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>What We Collect</h3>
              <p>Account information (email, name, profile data), content you create, engagement data (views, likes, comments), device information, and usage analytics.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>What We Don't Do</h3>
              <p>We don't sell your personal data to third parties. We don't scan your encrypted messages for ad targeting. We don't use your content to train AI models without explicit opt-in consent. We don't share your data with advertisers in individually identifiable form.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Your Rights</h3>
              <p>Data export (full download of all your data), account deletion (permanent removal of all data), content portability (export followers and content), opt-out of analytics, and right to be forgotten.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>End-to-End Encryption</h3>
              <p>Direct messages on OURS are end-to-end encrypted. OURS cannot read the content of your private messages. This encryption cannot be overridden for ad targeting or data mining.</p>
            </div>
          )}
          {legalTab === 'disclosures' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, color: T.text, margin: '0 0 12px' }}>Full Disclosures</h2>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Revenue Sharing</h3>
              <p>70% and 95% figures are targets, not guarantees. Actual percentages vary based on platform revenue, operating costs, regulatory requirements, and growth stage. Individual earnings vary based on content quality, engagement, audience size, and advertiser demand. No guaranteed earnings.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>HOURS Token</h3>
              <p>HOURS is a platform engagement metric, not a cryptocurrency, security, or investment. No cash value outside OURS. Cannot be traded externally. Value tied to platform ad revenue which may fluctuate. Past or projected earnings are not indicative of future results.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Content Delivery</h3>
              <p>Designed to prioritize follower content but affected by user preferences, relevance, moderation, and system performance. No specific reach percentage is guaranteed.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Platform Status</h3>
              <p>OURS is in development. Features represent vision and roadmap, not final functionality. Subject to change. Third-party statistics are not independently verified. This is not an investment solicitation.</p>
            </div>
          )}
          {legalTab === 'guidelines' && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, fontFamily: T.font, color: T.text, margin: '0 0 12px' }}>Community Guidelines</h2>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Be Human</h3>
              <p>OURS is a platform for real people. Bots, spam accounts, and coordinated inauthentic behavior will be removed. Trust scores reflect authentic engagement.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Be Respectful</h3>
              <p>Harassment, hate speech, threats, and targeted abuse are not tolerated. Disagree constructively. Debate ideas, not identities.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Be Honest</h3>
              <p>Don't mislead. Label AI-generated content. Disclose sponsorships. Verify claims. Trust is earned, not gamed.</p>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: T.text, margin: '16px 0 6px' }}>Moderation</h3>
              <p>Community-elected moderators handle group-level moderation. Platform-level moderation handles legal compliance, safety, and Terms violations. Appeals process available for all moderation decisions.</p>
            </div>
          )}
        </div>
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // SEARCH
  // ═══════════════════════════════════════
  const SearchPage = () => (
    <Wrap>
      <div style={{ margin: '12px 0' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Search everything..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, padding: '12px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: T.font, outline: 'none' }} />
        </div>
      </div>

      {!searchQuery && (
        <div>
          <SectionHeader title="🔥 Trending" />
          {['#OURSlaunchday', 'Price Tag Challenge', '#CreatorExodus', 'First HOURS Payout', '#OwnYourFeed'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: T.dim, fontFamily: T.mono, width: 24 }}>{i + 1}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, fontFamily: T.font }}>{t}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{Math.floor(Math.random() * 10 + 2)}K posts</div>
              </div>
            </div>
          ))}

          <SectionHeader title="⭐ Suggested Creators" />
          {[
            { name: 'Sarah Chen', handle: '@sarahbuilds', tag: 'Python • SaaS' },
            { name: 'Marcus Johnson', handle: '@marcusfitness', tag: 'Fitness • Wellness' },
            { name: 'Dev Kapoor', handle: '@devbuilds', tag: 'AI • Engineering' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>👤</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: T.font }}>{c.name}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font }}>{c.handle} • {c.tag}</div>
              </div>
              <button style={{ padding: '5px 12px', borderRadius: 8, border: `1px solid ${T.primary}`, background: `${T.primary}12`, color: T.primary, fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: T.font }}>Follow</button>
            </div>
          ))}
        </div>
      )}

      {searchQuery && (
        <div>
          <div style={{ fontSize: 11, color: T.dim, fontFamily: T.font, marginBottom: 12 }}>Results for "{searchQuery}"</div>
          <Tabs tabs={[
            { id: 'all', label: 'All' },
            { id: 'people', label: 'People' },
            { id: 'posts', label: 'Posts' },
            { id: 'videos', label: 'Videos' },
            { id: 'groups', label: 'Groups' },
            { id: 'products', label: 'Products' },
          ]} active="all" onChange={() => {}} />
          <Card style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font }}>Search results would appear here for "{searchQuery}" across all content types, people, groups, and products.</div>
          </Card>
        </div>
      )}
    </Wrap>
  );

  // ═══════════════════════════════════════
  // NOTIFICATIONS
  // ═══════════════════════════════════════
  const NotificationsPage = () => (
    <Wrap>
      <div style={{ marginTop: 8 }}>
        <Tabs tabs={[
          { id: 'all', label: '🔔 All' },
          { id: 'earnings', label: '💰 Earnings' },
          { id: 'social', label: '❤️ Social' },
          { id: 'govern', label: '🗳️ Governance' },
        ]} active={notifFilter} onChange={setNotifFilter} />

        {[
          { icon: '💰', text: 'You earned +3.0 HOURS from daily reward', time: '2h ago', type: 'earnings' },
          { icon: '❤️', text: 'Sarah Chen liked your post', time: '3h ago', type: 'social' },
          { icon: '💬', text: 'Marcus replied to your comment', time: '4h ago', type: 'social' },
          { icon: '🗳️', text: 'New vote: "Should AI content be labeled?"', time: '5h ago', type: 'govern' },
          { icon: '⚡', text: 'Quest completed: Post something (+2.0 HRS)', time: '6h ago', type: 'earnings' },
          { icon: '👥', text: 'Dev K. followed you', time: '8h ago', type: 'social' },
          { icon: '🏆', text: 'Price Tag Challenge: 3 days left!', time: '1d ago', type: 'social' },
          { icon: '💰', text: 'Storefront sale: Python Bootcamp (+4.5 HRS)', time: '1d ago', type: 'earnings' },
        ].filter(n => notifFilter === 'all' || n.type === notifFilter).map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{n.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontFamily: T.font, color: T.text }}>{n.text}</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: T.font, marginTop: 2 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );

  // ═══════════════════════════════════════
  // PAGE ROUTER
  // ═══════════════════════════════════════
  const pageConfig = {
    auth: { component: AuthPage, topBar: false, bottomNav: false },
    onboarding: { component: OnboardingPage, topBar: false, bottomNav: false },
    home: { component: HomePage, title: null, topBar: true, bottomNav: true },
    watch: { component: WatchPage, title: '🎬 Watch', topBar: true, bottomNav: true },
    read: { component: ReadPage, title: '📰 Read', topBar: true, bottomNav: true },
    community: { component: CommunityPage, title: '🏛️ Community', topBar: true, bottomNav: true },
    shop: { component: ShopPage, title: '🛍️ Shop', topBar: true, bottomNav: true },
    explore: { component: ExplorePage, title: '✨ Explore', topBar: true, bottomNav: true },
    listen: { component: ListenPage, title: '🎙️ Listen', topBar: true, bottomNav: true },
    govern: { component: GovernPage, title: '🗳️ Govern', topBar: true, bottomNav: true },
    arena: { component: ArenaPage, title: '🏆 Arena', topBar: true, bottomNav: true },
    wallet: { component: WalletPage, title: '💰 Wallet', topBar: true, bottomNav: true },
    messages: { component: MessagesPage, title: '💬 Messages', topBar: true, bottomNav: true },
    profile: { component: ProfilePage, title: '👤 Profile', topBar: true, bottomNav: true },
    settings: { component: SettingsPage, title: '⚙️ Settings', topBar: true, bottomNav: true },
    legal: { component: LegalPage, title: '⚖️ Legal', topBar: true, bottomNav: true },
    search: { component: SearchPage, title: '🔍 Search', topBar: true, bottomNav: true },
    notifications: { component: NotificationsPage, title: '🔔 Notifications', topBar: true, bottomNav: true },
  };

  const currentPage = pageConfig[page] || pageConfig.home;
  const PageComponent = currentPage.component;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        input[type="range"] { height: 4px; }
      `}</style>

      {currentPage.topBar && <TopBar title={currentPage.title} />}
      <PageComponent />
      {currentPage.bottomNav && <BottomNav />}
    </div>
  );
};

export default OursApp;
