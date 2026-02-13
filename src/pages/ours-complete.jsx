import React, { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — THE CANDY STORE (V3 Complete)
// Every zone is a world. Every world earns. Every tap delights.
// Deep UX from first impression through zone immersion.
// ═══════════════════════════════════════════════════════════════════════════

const T = {
  bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
  border: 'rgba(56,68,100,0.22)', glow: 'rgba(14,165,233,0.08)',
  primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
  purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
  text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  font: "'Sora', 'Inter', sans-serif", mono: "'Space Mono', 'Courier New', monospace",
};

// ═══ Shared Components ═══
const Pill = ({ children, color = T.primary, glow = false, onClick, style = {} }) => (
  <span onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px',
    borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: T.font,
    background: `${color}15`, color, border: `1px solid ${color}25`,
    boxShadow: glow ? `0 0 12px ${color}30` : 'none',
    cursor: onClick ? 'pointer' : 'default', transition: 'all 0.2s', ...style,
  }}>{children}</span>
);

const Earnings = ({ amount, size = 'sm' }) => (
  <span style={{
    fontFamily: T.mono, fontWeight: 700, color: T.gold,
    fontSize: size === 'lg' ? 18 : size === 'md' ? 14 : 11,
  }}>+{amount} <span style={{ fontSize: '0.7em', opacity: 0.7 }}>HRS</span></span>
);

const Avatar = ({ emoji = '🧠', size = 32, ring = false, ringColor = T.primary }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: size * 0.55,
    background: `linear-gradient(135deg, ${T.card}, ${T.elevated})`,
    border: ring ? `2px solid ${ringColor}` : `1px solid ${T.border}`,
    flexShrink: 0,
  }}>{emoji}</div>
);

const LiveDot = ({ color = '#22c55e' }) => (
  <span style={{
    width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block',
    boxShadow: `0 0 6px ${color}`, animation: 'pulse 2s infinite',
  }} />
);

const ProgressBar = ({ value, max, color = T.primary, height = 4 }) => (
  <div style={{ width: '100%', height, background: `${color}15`, borderRadius: height }}>
    <div style={{
      width: `${Math.min((value / max) * 100, 100)}%`, height: '100%',
      background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: height,
      transition: 'width 0.6s ease',
    }} />
  </div>
);

const Card = ({ children, gradient, onClick, style = {}, hover = true }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: gradient || T.card, borderRadius: 16,
        border: `1px solid ${hovered && hover ? T.primary + '40' : T.border}`,
        padding: 16, cursor: onClick ? 'pointer' : 'default',
        transform: hovered && hover ? 'translateY(-2px)' : 'none',
        boxShadow: hovered && hover ? `0 8px 32px rgba(0,0,0,0.3)` : 'none',
        transition: 'all 0.25s ease', ...style,
      }}
    >{children}</div>
  );
};

// ═══ MAIN APP ═══
const OursCandyStore = () => {
  const [screen, setScreen] = useState('landing'); // landing | splash | onboard | home | zone
  const [activeZone, setActiveZone] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showReward, setShowReward] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [showQuests, setShowQuests] = useState(false);
  const [hours, setHours] = useState(142.5);
  const [earnings, setEarnings] = useState(28.50);
  const [streak, setStreak] = useState(12);
  const [xp, setXp] = useState(2340);
  const [level, setLevel] = useState(7);
  const [onboardStep, setOnboardStep] = useState(0);
  const [splashFade, setSplashFade] = useState(false);
  const [pulseItems, setPulseItems] = useState([]);
  const [viewMode, setViewMode] = useState('viewer'); // viewer | creator
  const [zoneSubPage, setZoneSubPage] = useState(null);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState('idle'); // idle | sending | success | error
  const [waitlistCount, setWaitlistCount] = useState(1847); // social proof number
  const [landingFeature, setLandingFeature] = useState(0);

  // Live pulse & earnings ticker
  useEffect(() => {
    const pulseNames = ['Luna', 'Kai', 'Mika', 'Alex', 'Zara', 'Ren', 'Nyx', 'Juno', 'Obi', 'Ava'];
    const pulseActions = [
      'earned +2.1 HRS watching', 'sold a course for 45 HRS', 'hit Level 12!',
      'joined Crypto Builders group', 'won Arena challenge', 'published an article',
      'tipped 5 HRS on a video', 'started a live room', 'voted on platform fees',
      'listed a design template', 'completed daily quests', 'reached 1K followers',
    ];
    const t = setInterval(() => {
      setEarnings(e => +(e + 0.001).toFixed(3));
      setPulseItems(prev => {
        const item = {
          id: Date.now(),
          name: pulseNames[Math.floor(Math.random() * pulseNames.length)],
          action: pulseActions[Math.floor(Math.random() * pulseActions.length)],
        };
        return [item, ...prev].slice(0, 20);
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Splash auto-advance
  useEffect(() => {
    if (screen === 'splash') {
      const t1 = setTimeout(() => setSplashFade(true), 1800);
      const t2 = setTimeout(() => setScreen('onboard'), 2400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [screen]);

  // Show daily reward when entering home
  useEffect(() => {
    if (screen === 'home' && !rewardClaimed) setShowReward(true);
  }, [screen]);

  const nav = (target) => {
    if (['home', 'search', 'create', 'messages', 'profile'].includes(target)) {
      setActiveZone(null);
      setActiveTab(target);
      setZoneSubPage(null);
    }
  };

  const enterZone = (zoneId) => {
    setActiveZone(zoneId);
    setActiveTab('home');
    setZoneSubPage(null);
  };

  const me = {
    name: 'Roger', handle: '@rogergrubb', avatar: '🧠',
    level, levelName: ['Newcomer','Observer','Contributor','Builder','Architect','Visionary','Pioneer','Luminary','Titan','Legend'][Math.min(level, 9)],
    xpCurrent: xp, xpNext: 3000, trust: 94, streak, rank: 847, totalUsers: 10247,
    followers: 342, following: 128, totalEarned: 1247.5,
  };

  // ═══════════════════════════════════════════════════════════════
  // WAITLIST LANDING PAGE — The First Impression
  // ═══════════════════════════════════════════════════════════════
  const submitWaitlist = async () => {
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;
    setWaitlistStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/rogergrubbrealestate@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          email: waitlistEmail,
          _subject: '🍬 New OURS Waitlist Signup!',
          message: `New waitlist signup: ${waitlistEmail}\nTimestamp: ${new Date().toISOString()}`,
        }),
      });
      if (res.ok) {
        setWaitlistStatus('success');
        setWaitlistCount(c => c + 1);
      } else { setWaitlistStatus('error'); }
    } catch { setWaitlistStatus('error'); }
  };

  // Auto-cycle landing features
  useEffect(() => {
    if (screen === 'landing') {
      const t = setInterval(() => setLandingFeature(f => (f + 1) % 4), 3500);
      return () => clearInterval(t);
    }
  }, [screen]);

  if (screen === 'landing') {
    const features = [
      { icon: '🎬', title: 'Watch & Earn', desc: 'Every second of video earns you HOURS tokens', color: '#8b5cf6' },
      { icon: '🛍️', title: 'Creator Storefronts', desc: 'Sell courses, art, templates — keep 92% of revenue', color: '#ec4899' },
      { icon: '🗳️', title: 'You Govern', desc: 'Vote on fees, features, and platform direction', color: '#10b981' },
      { icon: '🏆', title: 'Compete & Win', desc: 'Skill challenges with real HOURS prize pools', color: '#ef4444' },
    ];
    const feat = features[landingFeature];

    return (
      <div style={{
        position: 'fixed', inset: 0, background: T.bg,
        display: 'flex', flexDirection: 'column', fontFamily: T.font,
        overflow: 'hidden',
      }}>
        <style>{`
          @keyframes logoGlow { 0%,100% { text-shadow: 0 0 20px #0ea5e940; } 50% { text-shadow: 0 0 60px #0ea5e980, 0 0 120px #0ea5e940; } }
          @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
          @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes expandIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
          @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes ripple { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(2.5); opacity: 0; } }
          @keyframes featureFade { 0% { opacity: 0; transform: translateY(10px); } 15% { opacity: 1; transform: translateY(0); } 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          input::placeholder { color: #4a5b7a; }
        `}</style>

        {/* Ambient background glow */}
        <div style={{
          position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.primary}12 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -150, right: -100,
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.accent}10 0%, transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '24px 24px 40px', position: 'relative',
          maxWidth: 480, margin: '0 auto', width: '100%',
        }}>
          {/* Tagline above logo */}
          <div style={{
            fontSize: 11, color: T.dim, letterSpacing: 4, textTransform: 'uppercase',
            marginBottom: 16, animation: 'fadeIn 1s ease 0.2s both',
          }}>The platform that pays you back</div>

          {/* Logo */}
          <div style={{
            fontSize: 64, fontWeight: 900, letterSpacing: -3, marginBottom: 8,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent}, ${T.gold}, ${T.primary})`,
            backgroundSize: '300% 300%', animation: 'gradientShift 6s ease infinite',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>OURS</div>

          <div style={{
            fontSize: 16, color: T.sub, marginBottom: 8,
            animation: 'fadeIn 1s ease 0.4s both', textAlign: 'center',
          }}>It's Ours. Not Theirs.</div>

          <div style={{
            fontSize: 13, color: T.dim, textAlign: 'center', lineHeight: 1.6,
            maxWidth: 320, marginBottom: 32,
            animation: 'fadeIn 1s ease 0.6s both',
          }}>
            A social platform where your attention has real value. Watch, create, shop, vote — every action earns <span style={{ color: T.gold, fontWeight: 700 }}>HOURS</span> tokens you can cash out.
          </div>

          {/* Rotating feature showcase */}
          <div style={{
            width: '100%', padding: '16px 20px', background: `${feat.color}08`,
            borderRadius: 16, border: `1px solid ${feat.color}20`, marginBottom: 32,
            minHeight: 72, display: 'flex', alignItems: 'center', gap: 14,
            animation: 'fadeIn 0.5s ease', transition: 'border-color 0.5s ease, background 0.5s ease',
          }} key={landingFeature}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
              background: `linear-gradient(135deg, ${feat.color}30, ${feat.color}10)`,
            }}>{feat.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{feat.title}</div>
              <div style={{ fontSize: 12, color: T.sub, marginTop: 2 }}>{feat.desc}</div>
            </div>
          </div>

          {/* Feature dots */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {features.map((_, i) => (
              <div key={i} onClick={() => setLandingFeature(i)} style={{
                width: i === landingFeature ? 20 : 6, height: 6, borderRadius: 3,
                background: i === landingFeature ? features[i].color : T.dim + '40',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }} />
            ))}
          </div>

          {/* Waitlist Form */}
          {waitlistStatus === 'success' ? (
            <div style={{
              width: '100%', textAlign: 'center', padding: 24,
              background: `${T.accent}08`, borderRadius: 16, border: `1px solid ${T.accent}25`,
              animation: 'expandIn 0.4s ease',
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.text, marginBottom: 6 }}>You're on the list!</div>
              <div style={{ fontSize: 13, color: T.sub, marginBottom: 16 }}>
                We'll notify <span style={{ color: T.primary }}>{waitlistEmail}</span> when the doors open.
              </div>
              <div style={{
                fontSize: 12, color: T.dim, padding: '8px 16px',
                background: T.card, borderRadius: 10, display: 'inline-block',
              }}>
                🍬 #{waitlistCount.toLocaleString()} in line
              </div>
              <div style={{ marginTop: 20 }}>
                <button onClick={() => setScreen('splash')} style={{
                  padding: '12px 32px', borderRadius: 12, border: 'none',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
                  background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff',
                }}>Preview the Candy Store →</button>
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', animation: 'slideUp 0.8s ease 0.8s both' }}>
              {/* Email input + button */}
              <div style={{
                display: 'flex', gap: 8, width: '100%', marginBottom: 12,
              }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                  padding: '0 16px', background: T.card, borderRadius: 14,
                  border: `1px solid ${waitlistStatus === 'error' ? T.red + '60' : T.border}`,
                  transition: 'border-color 0.3s',
                }}>
                  <span style={{ fontSize: 16, opacity: 0.5 }}>✉️</span>
                  <input
                    type="email" value={waitlistEmail}
                    onChange={e => { setWaitlistEmail(e.target.value); setWaitlistStatus('idle'); }}
                    onKeyDown={e => e.key === 'Enter' && submitWaitlist()}
                    placeholder="your@email.com"
                    style={{
                      flex: 1, background: 'none', border: 'none', outline: 'none',
                      color: T.text, fontSize: 15, fontFamily: T.font,
                      padding: '14px 0',
                    }}
                  />
                </div>
                <button
                  onClick={submitWaitlist}
                  disabled={waitlistStatus === 'sending'}
                  style={{
                    padding: '0 24px', borderRadius: 14, border: 'none',
                    fontSize: 14, fontWeight: 700, cursor: waitlistStatus === 'sending' ? 'wait' : 'pointer',
                    fontFamily: T.font, whiteSpace: 'nowrap',
                    background: waitlistStatus === 'sending'
                      ? T.dim
                      : `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
                    color: '#fff',
                    boxShadow: waitlistStatus === 'sending' ? 'none' : `0 4px 20px ${T.primary}30`,
                    transition: 'all 0.3s',
                  }}
                >
                  {waitlistStatus === 'sending' ? (
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                  ) : 'Join Waitlist'}
                </button>
              </div>

              {waitlistStatus === 'error' && (
                <div style={{ fontSize: 12, color: T.red, textAlign: 'center', marginBottom: 8, animation: 'fadeIn 0.3s ease' }}>
                  Something went wrong — try again or email rogergrubbrealestate@gmail.com directly
                </div>
              )}

              {/* Social proof */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                marginBottom: 20,
              }}>
                <div style={{ display: 'flex' }}>
                  {['🧠', '🔧', '🎨', '📈', '🚀'].map((e, i) => (
                    <div key={i} style={{
                      width: 24, height: 24, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 12,
                      background: T.elevated, border: `1.5px solid ${T.bg}`,
                      marginLeft: i > 0 ? -6 : 0,
                    }}>{e}</div>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: T.sub }}>
                  <span style={{ color: T.primary, fontWeight: 700 }}>{waitlistCount.toLocaleString()}</span> creators already in line
                </span>
              </div>

              {/* Skip to preview */}
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => setScreen('splash')} style={{
                  background: 'none', border: 'none', color: T.dim, fontSize: 12,
                  cursor: 'pointer', fontFamily: T.font, textDecoration: 'underline',
                  textUnderlineOffset: 3,
                }}>or preview the platform →</button>
              </div>
            </div>
          )}

          {/* Zone icons floating at bottom */}
          <div style={{
            display: 'flex', gap: 16, marginTop: 40,
            animation: 'fadeIn 1.2s ease 1s both',
          }}>
            {['🎬', '📰', '🛍️', '🏛️', '🎙️', '✨', '🗳️', '🏆'].map((icon, i) => (
              <div key={i} style={{
                fontSize: 20, opacity: 0.25, animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}>{icon}</div>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            fontSize: 10, color: T.dim, marginTop: 24, textAlign: 'center',
            animation: 'fadeIn 1s ease 1.2s both',
          }}>
            No spam. We'll only email you when the doors open.
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // SPLASH SCREEN — The Doors Open
  // ═══════════════════════════════════════════════════════════════
  if (screen === 'splash') return (
    <div style={{
      position: 'fixed', inset: 0, background: T.bg, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.font, opacity: splashFade ? 0 : 1, transition: 'opacity 0.6s ease',
    }}>
      <style>{`
        @keyframes logoGlow { 0%,100% { text-shadow: 0 0 20px #0ea5e940; } 50% { text-shadow: 0 0 60px #0ea5e980, 0 0 120px #0ea5e940; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes expandIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{
        fontSize: 72, fontWeight: 900, letterSpacing: -3,
        background: `linear-gradient(135deg, ${T.primary}, ${T.accent}, ${T.gold})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        animation: 'logoGlow 3s ease-in-out infinite',
      }}>OURS</div>
      <div style={{
        fontSize: 14, color: T.sub, marginTop: 8, letterSpacing: 6, textTransform: 'uppercase',
        animation: 'fadeIn 1s ease 0.5s both',
      }}>It's Ours. Not Theirs.</div>
      <div style={{
        width: 40, height: 2, borderRadius: 1, marginTop: 32,
        background: `linear-gradient(90deg, transparent, ${T.primary}, transparent)`,
        animation: 'shimmer 1.5s ease-in-out infinite',
        backgroundSize: '200% 100%',
      }} />
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // ONBOARDING — The Welcome Experience
  // ═══════════════════════════════════════════════════════════════
  if (screen === 'onboard') {
    const steps = [
      {
        icon: '🍬', title: 'Welcome to the Candy Store',
        body: 'A platform where YOUR attention has value. Every scroll, every tap, every second — you earn.',
        accent: T.primary,
      },
      {
        icon: '⏰', title: 'Meet HOURS',
        body: 'Our currency. Watch videos? Earn HOURS. Write articles? Earn HOURS. Build a community? Earn even more. Cash out anytime.',
        accent: T.gold,
      },
      {
        icon: '🏪', title: 'Pick Your Aisle',
        body: '8 worlds to explore. Video, articles, shops, communities, music, discovery, governance, competitions. Each one pays differently.',
        accent: T.accent,
      },
      {
        icon: '🎁', title: 'Your Welcome Gift',
        body: null, // special claim screen
        accent: T.gold,
      },
    ];
    const s = steps[onboardStep];

    return (
      <div style={{
        position: 'fixed', inset: 0, background: T.bg, display: 'flex',
        flexDirection: 'column', fontFamily: T.font, padding: 24,
        animation: 'fadeIn 0.4s ease',
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: i === onboardStep ? 24 : 8, height: 8, borderRadius: 4,
              background: i <= onboardStep ? s.accent : T.dim + '40',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {onboardStep < 3 ? (
            <div style={{ animation: 'expandIn 0.5s ease' }} key={onboardStep}>
              <div style={{ fontSize: 80, marginBottom: 24, animation: 'float 3s ease-in-out infinite' }}>{s.icon}</div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: T.text, marginBottom: 12, lineHeight: 1.2 }}>{s.title}</h1>
              <p style={{ fontSize: 16, color: T.sub, lineHeight: 1.6, maxWidth: 340 }}>{s.body}</p>
            </div>
          ) : (
            /* Claim screen */
            <div style={{ animation: 'expandIn 0.5s ease', width: '100%', maxWidth: 360 }}>
              <div style={{ fontSize: 80, marginBottom: 16, animation: 'float 2s ease-in-out infinite' }}>🎁</div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: T.text, marginBottom: 8 }}>Your First HOURS!</h1>
              <p style={{ fontSize: 14, color: T.sub, marginBottom: 32 }}>Welcome bonus for joining OURS.</p>
              <div style={{
                fontSize: 56, fontWeight: 900, fontFamily: T.mono, color: T.gold,
                textShadow: `0 0 40px ${T.gold}40`, marginBottom: 4,
              }}>+10.0</div>
              <div style={{ fontSize: 13, color: T.sub, marginBottom: 32 }}>HOURS · ≈ $2.00 estimated value</div>
              <button onClick={() => { setHours(h => h + 10); setScreen('home'); }} style={{
                width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
                fontSize: 17, fontWeight: 800, cursor: 'pointer', fontFamily: T.font,
                background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000',
                boxShadow: `0 0 40px ${T.gold}30`, transition: 'transform 0.15s',
              }} onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
                 onMouseUp={e => e.target.style.transform = 'scale(1)'}>
                Claim & Enter the Candy Store →
              </button>
              <div style={{ fontSize: 10, color: T.dim, marginTop: 16 }}>
                *HOURS value fluctuates based on platform economy. Not financial advice.
              </div>
            </div>
          )}
        </div>

        {onboardStep < 3 && (
          <button onClick={() => setOnboardStep(onboardStep + 1)} style={{
            width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
            fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
            background: s.accent, color: '#000', transition: 'transform 0.15s',
          }} onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
             onMouseUp={e => e.target.style.transform = 'scale(1)'}>
            {onboardStep === 2 ? 'Show Me My Gift →' : 'Next →'}
          </button>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ZONE DEFINITIONS — Every Aisle of the Candy Store
  // ═══════════════════════════════════════════════════════════════
  const zones = [
    {
      id: 'watch', icon: '🎬', title: 'Watch', subtitle: 'Short + long video',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      color: '#8b5cf6', earn: '+0.3/min',
      preview: '14.2K viewers right now',
      hook: 'Full-screen shorts, series, live streams. Every second earns.',
      liveCount: 847, trending: ['AI Tools Review', 'Day Trading Setup', 'Creator Economy'],
      topCreators: [
        { name: 'TechVault', emoji: '🔧', followers: '142K', earning: '2,340/mo' },
        { name: 'FinanceFlow', emoji: '📈', followers: '89K', earning: '1,870/mo' },
        { name: 'DesignDaily', emoji: '🎨', followers: '67K', earning: '1,120/mo' },
      ],
    },
    {
      id: 'read', icon: '📰', title: 'Read', subtitle: 'Articles & threads',
      gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
      color: '#06b6d4', earn: '+0.8/article',
      preview: '234 new articles today',
      hook: 'Deep dives, newsletters, threaded debates. Writers get paid per read.',
      liveCount: 0, trending: ['The Creator Economy Collapse', 'AI Won\'t Replace You', 'Web3 is Dead?'],
      topCreators: [
        { name: 'DataMind', emoji: '🧠', followers: '34K', earning: '890/mo' },
        { name: 'MarketPulse', emoji: '📊', followers: '28K', earning: '670/mo' },
        { name: 'CodePhilosophy', emoji: '💡', followers: '21K', earning: '540/mo' },
      ],
    },
    {
      id: 'shop', icon: '🛍️', title: 'Shop', subtitle: 'Creator marketplace',
      gradient: 'linear-gradient(135deg, #f472b6, #ec4899)',
      color: '#ec4899', earn: '10% cashback',
      preview: '89 products launched this week',
      hook: 'Courses, templates, art, services. Buy with HOURS. Sell your craft.',
      liveCount: 0, trending: ['Notion Templates', 'AI Prompt Packs', 'Logo Design'],
      topCreators: [
        { name: 'TemplateKing', emoji: '👑', followers: '56K', earning: '4,200/mo' },
        { name: 'CourseFactory', emoji: '🎓', followers: '41K', earning: '3,100/mo' },
        { name: 'ArtByNyx', emoji: '🎨', followers: '33K', earning: '1,800/mo' },
      ],
    },
    {
      id: 'community', icon: '🏛️', title: 'Community', subtitle: 'Groups + treasuries',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      color: '#10b981', earn: '+1.2/post',
      preview: '3.4K active groups',
      hook: 'Every group has a shared treasury. Elected mods. Collective earning.',
      liveCount: 0, trending: ['Crypto Builders', 'Indie Hackers', 'AI Art Club'],
      topCreators: [
        { name: 'CryptoDAO', emoji: '🔗', followers: '12K', earning: '890/mo treasury' },
        { name: 'DesignGuild', emoji: '✏️', followers: '8K', earning: '560/mo treasury' },
        { name: 'WritersRoom', emoji: '📝', followers: '6K', earning: '340/mo treasury' },
      ],
    },
    {
      id: 'listen', icon: '🎙️', title: 'Listen', subtitle: 'Live audio + podcasts',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      color: '#f59e0b', earn: '+0.2/min',
      preview: '23 live rooms right now',
      hook: 'Podcasts, live rooms, music playlists. Listen while you earn in the background.',
      liveCount: 23, trending: ['Morning Market Brief', 'AI Debate Hour', 'Chill Beats Studio'],
      topCreators: [
        { name: 'MorningBrief', emoji: '☀️', followers: '45K', earning: '1,670/mo' },
        { name: 'TechTalkLive', emoji: '🎤', followers: '32K', earning: '1,240/mo' },
        { name: 'ChillBeats', emoji: '🎵', followers: '28K', earning: '980/mo' },
      ],
    },
    {
      id: 'explore', icon: '✨', title: 'Explore', subtitle: 'Visual discovery',
      gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
      color: '#a78bfa', earn: '+0.1/save',
      preview: 'Curated just for you',
      hook: 'Pinterest-style discovery. Photos, infographics, moodboards. Save → Earn.',
      liveCount: 0, trending: ['Workspace Setups', 'AI Generated Art', 'Travel Photography'],
      topCreators: [
        { name: 'VisualVault', emoji: '📸', followers: '67K', earning: '1,340/mo' },
        { name: 'InfographX', emoji: '📊', followers: '44K', earning: '890/mo' },
        { name: 'MoodBoard.co', emoji: '🎨', followers: '31K', earning: '670/mo' },
      ],
    },
    {
      id: 'govern', icon: '🗳️', title: 'Govern', subtitle: 'Shape the platform',
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      color: '#94a3b8', earn: '+2.0/vote',
      preview: '3 active proposals',
      hook: 'Vote on fees, features, policies. Higher trust score = more voting power.',
      liveCount: 0, trending: ['Lower Creator Fees to 5%', 'Add Dark Mode Toggle', 'Community Grants Fund'],
      topCreators: [
        { name: 'GovCouncil', emoji: '⚖️', followers: '5K', earning: 'elected' },
        { name: 'PolicyNerd', emoji: '📜', followers: '3K', earning: '450/mo' },
        { name: 'DataVoter', emoji: '🗳️', followers: '2K', earning: '280/mo' },
      ],
    },
    {
      id: 'arena', icon: '🏆', title: 'Arena', subtitle: 'Challenges + battles',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      color: '#ef4444', earn: 'Win prizes',
      preview: '12 active challenges',
      hook: 'Daily challenges, skill battles, creator competitions. Win big HOURS prizes.',
      liveCount: 0, trending: ['Best AI Prompt Challenge', '60sec Video Battle', 'Design Sprint'],
      topCreators: [
        { name: 'ChampionX', emoji: '🏅', followers: '23K', earning: '3,400/mo prizes' },
        { name: 'BattleBot', emoji: '🤖', followers: '18K', earning: '2,100/mo prizes' },
        { name: 'DesignDuel', emoji: '⚔️', followers: '14K', earning: '1,600/mo prizes' },
      ],
    },
  ];

  const quests = [
    { id: 'q1', title: 'Watch 5 minutes of video', reward: 1.5, icon: '🎬', zone: 'watch', progress: 3, target: 5, unit: 'min' },
    { id: 'q2', title: 'Read 2 articles', reward: 1.6, icon: '📰', zone: 'read', progress: 1, target: 2, unit: 'articles' },
    { id: 'q3', title: 'Post in a community', reward: 1.2, icon: '🏛️', zone: 'community', progress: 0, target: 1, unit: 'post' },
    { id: 'q4', title: 'Save 3 items in Explore', reward: 0.9, icon: '✨', zone: 'explore', progress: 2, target: 3, unit: 'saves' },
    { id: 'q5', title: 'Vote on a proposal', reward: 2.0, icon: '🗳️', zone: 'govern', progress: 0, target: 1, unit: 'vote' },
    { id: 'q6', title: 'Complete all dailies', reward: 5.0, icon: '⭐', zone: 'bonus', progress: 0, target: 5, unit: 'quests' },
  ];

  // ═══════════════════════════════════════════════════════════════
  // DAILY REWARD MODAL
  // ═══════════════════════════════════════════════════════════════
  const DailyReward = () => {
    if (!showReward || rewardClaimed) return null;
    const streakRewards = [0.5, 0.8, 1.2, 1.5, 2.0, 3.0, 5.0];
    const todayReward = streakRewards[Math.min(streak % 7, 6)];

    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: 24,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.3s ease',
      }} onClick={() => { setShowReward(false); setRewardClaimed(true); }}>
        <div onClick={e => e.stopPropagation()} style={{
          background: T.surface, borderRadius: 24, padding: 32, maxWidth: 360, width: '100%',
          border: `1px solid ${T.gold}30`, boxShadow: `0 0 80px ${T.gold}10`,
          animation: 'expandIn 0.4s ease', textAlign: 'center',
        }}>
          <div style={{ fontSize: 56, marginBottom: 8, animation: 'float 2s ease-in-out infinite' }}>🔥</div>
          <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font, marginBottom: 4 }}>Day {streak} streak!</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, fontFamily: T.font, marginBottom: 16 }}>Daily Reward</h2>

          {/* Streak calendar */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
            {streakRewards.map((r, i) => (
              <div key={i} style={{
                width: 38, height: 48, borderRadius: 10,
                background: i <= (streak % 7) ? `${T.gold}20` : T.card,
                border: `1px solid ${i <= (streak % 7) ? T.gold + '40' : T.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 10, color: i <= (streak % 7) ? T.gold : T.dim, fontFamily: T.mono, fontWeight: 700 }}>+{r}</span>
                <span style={{ fontSize: 8, color: T.dim }}>D{i + 1}</span>
              </div>
            ))}
          </div>

          <div style={{
            fontSize: 36, fontWeight: 900, fontFamily: T.mono, color: T.gold,
            textShadow: `0 0 30px ${T.gold}30`, marginBottom: 20,
          }}>+{todayReward} HRS</div>

          <button onClick={() => {
            setHours(h => h + todayReward); setRewardClaimed(true); setShowReward(false);
            setStreak(s => s + 1);
          }} style={{
            width: '100%', padding: '14px 0', borderRadius: 12, border: 'none',
            fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: T.font,
            background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000',
          }}>
            Claim Today's Reward
          </button>
          <div style={{ fontSize: 10, color: T.dim, marginTop: 8 }}>
            Come back tomorrow for +{streakRewards[Math.min((streak + 1) % 7, 6)]} HRS
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // QUEST BOARD MODAL
  // ═══════════════════════════════════════════════════════════════
  const QuestBoard = () => {
    if (!showQuests) return null;
    const completed = quests.filter(q => q.progress >= q.target).length;
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000, display: 'flex',
        alignItems: 'flex-end', justifyContent: 'center',
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.2s ease',
      }} onClick={() => setShowQuests(false)}>
        <div onClick={e => e.stopPropagation()} style={{
          background: T.surface, borderRadius: '24px 24px 0 0', padding: 24,
          maxWidth: 520, width: '100%', maxHeight: '80vh', overflowY: 'auto',
          border: `1px solid ${T.border}`, borderBottom: 'none',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: T.font }}>Daily Quests</h3>
              <span style={{ fontSize: 12, color: T.sub }}>{completed}/{quests.length} complete</span>
            </div>
            <Pill color={T.gold} glow>
              {completed === quests.length - 1 ? '🌟 Bonus unlocked!' : `${completed}/${quests.length - 1} for bonus`}
            </Pill>
          </div>

          <ProgressBar value={completed} max={quests.length} color={T.gold} height={6} />

          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quests.map(q => {
              const done = q.progress >= q.target;
              return (
                <div key={q.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                  background: done ? `${T.accent}10` : T.card, borderRadius: 12,
                  border: `1px solid ${done ? T.accent + '30' : T.border}`,
                  opacity: done ? 0.7 : 1,
                }}>
                  <span style={{ fontSize: 24 }}>{q.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: done ? T.accent : T.text, fontFamily: T.font,
                      textDecoration: done ? 'line-through' : 'none' }}>{q.title}</div>
                    <div style={{ marginTop: 4 }}>
                      <ProgressBar value={q.progress} max={q.target} color={done ? T.accent : T.primary} height={3} />
                    </div>
                    <span style={{ fontSize: 10, color: T.dim }}>{q.progress}/{q.target} {q.unit}</span>
                  </div>
                  <Earnings amount={q.reward} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // TOP BAR — Persistent Navigation
  // ═══════════════════════════════════════════════════════════════
  const TopBar = () => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100, background: `${T.bg}ee`,
      backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}`,
      padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {activeZone && (
          <button onClick={() => { setActiveZone(null); setZoneSubPage(null); }} style={{
            background: 'none', border: 'none', color: T.sub, fontSize: 18, cursor: 'pointer',
            padding: '4px 8px 4px 0',
          }}>←</button>
        )}
        <span style={{
          fontSize: 20, fontWeight: 900, fontFamily: T.font,
          background: activeZone
            ? zones.find(z => z.id === activeZone)?.gradient
            : `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {activeZone ? zones.find(z => z.id === activeZone)?.title : 'OURS'}
        </span>
        {!activeZone && <Pill color={T.accent}><LiveDot /> {pulseItems.length} live</Pill>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Earnings ticker */}
        <div style={{
          background: `${T.gold}08`, border: `1px solid ${T.gold}20`, padding: '4px 12px',
          borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>
            {hours.toFixed(1)}
          </span>
          <span style={{ fontSize: 9, color: T.dim }}>HRS</span>
        </div>

        {/* Quest button */}
        <button onClick={() => setShowQuests(true)} style={{
          background: `${T.purple}15`, border: `1px solid ${T.purple}25`, borderRadius: 20,
          padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ fontSize: 12 }}>🎯</span>
          <span style={{ fontSize: 10, color: T.purple, fontWeight: 600, fontFamily: T.font }}>Quests</span>
        </button>

        {/* Profile */}
        <div onClick={() => nav('profile')} style={{ cursor: 'pointer' }}>
          <Avatar emoji={me.avatar} size={28} ring ringColor={T.primary} />
        </div>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // LIVE PULSE TICKER — The Platform Breathes
  // ═══════════════════════════════════════════════════════════════
  const PulseTicker = () => (
    <div style={{
      overflow: 'hidden', height: 28, background: `${T.primary}06`,
      borderBottom: `1px solid ${T.border}`, position: 'relative',
    }}>
      <div style={{
        display: 'flex', gap: 32, whiteSpace: 'nowrap', paddingLeft: '100%',
        animation: 'marquee 60s linear infinite',
      }}>
        {[...pulseItems, ...pulseItems].map((item, i) => (
          <span key={i} style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>
            <span style={{ color: T.primary }}>@{item?.name}</span> {item?.action}
          </span>
        ))}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // HOME PAGE — THE CANDY STORE FLOOR
  // ═══════════════════════════════════════════════════════════════
  const HomePage = () => (
    <div style={{ padding: '0 16px 100px' }}>
      {/* Hero Welcome */}
      <div style={{ padding: '20px 0 16px' }}>
        <div style={{ fontSize: 13, color: T.sub, fontFamily: T.font }}>Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: T.text, fontFamily: T.font }}>{me.name} 👋</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
          <Pill color={T.gold} glow>
            <span style={{ fontFamily: T.mono }}>${earnings.toFixed(2)}</span> earned today
          </Pill>
          <Pill color={T.accent}>
            🔥 {streak}-day streak
          </Pill>
          <Pill color={T.purple}>
            Lv.{level} {me.levelName}
          </Pill>
        </div>
      </div>

      {/* XP Progress */}
      <div style={{ marginBottom: 20, padding: '12px 16px', background: T.card, borderRadius: 14, border: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Level {level} → {level + 1}</span>
          <span style={{ fontSize: 11, color: T.primary, fontFamily: T.mono }}>{xp}/{me.xpNext} XP</span>
        </div>
        <ProgressBar value={xp} max={me.xpNext} color={T.primary} height={5} />
      </div>

      {/* ═══ THE CANDY AISLES ═══ */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: T.font }}>Pick Your Aisle</h2>
          <span style={{ fontSize: 11, color: T.dim }}>{zones.length} worlds</span>
        </div>

        {/* Featured Zone — Big Card */}
        {(() => {
          const featured = zones[0]; // Watch is always the featured hero
          return (
            <Card gradient={featured.gradient} onClick={() => enterZone(featured.id)} style={{
              padding: 0, overflow: 'hidden', marginBottom: 12, position: 'relative', height: 160,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 28 }}>{featured.icon}</span>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', fontFamily: T.font }}>{featured.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{featured.subtitle}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Pill color="#fff" style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff' }}>
                    <LiveDot /> {featured.preview}
                  </Pill>
                  <Pill color={T.gold} style={{ background: 'rgba(251,191,36,0.15)', border: 'none' }}>
                    {featured.earn}
                  </Pill>
                </div>
              </div>
            </Card>
          );
        })()}

        {/* Zone Grid — 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {zones.slice(1).map(zone => (
            <Card key={zone.id} onClick={() => enterZone(zone.id)} style={{ padding: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 22,
                background: zone.gradient, marginBottom: 10,
              }}>{zone.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 2 }}>{zone.title}</div>
              <div style={{ fontSize: 11, color: T.sub, marginBottom: 8, lineHeight: 1.4 }}>{zone.subtitle}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: T.gold, fontFamily: T.mono, fontWeight: 600 }}>{zone.earn}</span>
                {zone.liveCount > 0 && <span style={{ fontSize: 9, color: T.accent, display: 'flex', alignItems: 'center', gap: 3 }}><LiveDot /> live</span>}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══ TRENDING ACROSS ALL ZONES ═══ */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>🔥 Trending Now</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {zones.slice(0, 4).flatMap(z => z.trending.slice(0, 1).map(t => ({ zone: z, topic: t }))).map((item, i) => (
            <div key={i} onClick={() => enterZone(item.zone.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
              background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, cursor: 'pointer',
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 16,
                background: item.zone.gradient,
              }}>{item.zone.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.font }}>{item.topic}</div>
                <div style={{ fontSize: 10, color: T.sub }}>{item.zone.title}</div>
              </div>
              <span style={{ fontSize: 11, color: T.dim }}>→</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ TOP EARNERS LEADERBOARD ═══ */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>🏆 Top Earners This Week</h2>
        <Card hover={false}>
          {[
            { rank: 1, name: 'TechVault', emoji: '🔧', earned: '847.2 HRS', medal: '🥇' },
            { rank: 2, name: 'CourseFactory', emoji: '🎓', earned: '692.1 HRS', medal: '🥈' },
            { rank: 3, name: 'DesignDaily', emoji: '🎨', earned: '534.8 HRS', medal: '🥉' },
            { rank: me.rank, name: me.name, emoji: me.avatar, earned: `${earnings.toFixed(1)} HRS`, medal: `#${me.rank}`, isMe: true },
          ].map((user, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < 3 ? `1px solid ${T.border}` : 'none',
              background: user.isMe ? `${T.primary}08` : 'transparent',
              borderRadius: user.isMe ? 8 : 0, padding: user.isMe ? '10px 8px' : '10px 0',
              marginTop: user.isMe ? 8 : 0,
            }}>
              <span style={{ fontSize: 16, width: 28, textAlign: 'center' }}>{user.medal}</span>
              <Avatar emoji={user.emoji} size={32} ring={user.isMe} ringColor={T.primary} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: user.isMe ? T.primary : T.text, fontFamily: T.font }}>
                  {user.name} {user.isMe && '(You)'}
                </div>
              </div>
              <span style={{ fontSize: 12, fontFamily: T.mono, color: T.gold, fontWeight: 600 }}>{user.earned}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* ═══ CREATOR / VIEWER TOGGLE ═══ */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: 'flex', background: T.card, borderRadius: 12, padding: 3,
          border: `1px solid ${T.border}`, marginBottom: 12,
        }}>
          {['viewer', 'creator'].map(m => (
            <button key={m} onClick={() => setViewMode(m)} style={{
              flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: viewMode === m ? T.primary : 'transparent',
              color: viewMode === m ? '#fff' : T.sub,
              fontSize: 13, fontWeight: 700, fontFamily: T.font, transition: 'all 0.2s',
            }}>{m === 'viewer' ? '👀 Viewer' : '🎨 Creator'}</button>
          ))}
        </div>

        {viewMode === 'viewer' ? (
          <Card hover={false}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 8 }}>Your Earning Sources</div>
            {[
              { zone: 'Watch', amount: 12.4, icon: '🎬', color: '#8b5cf6' },
              { zone: 'Read', amount: 8.2, icon: '📰', color: '#06b6d4' },
              { zone: 'Community', amount: 4.8, icon: '🏛️', color: '#10b981' },
              { zone: 'Arena', amount: 3.1, icon: '🏆', color: '#ef4444' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 3 ? `1px solid ${T.border}` : 'none' }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: T.text, fontFamily: T.font }}>{s.zone}</div>
                  <ProgressBar value={s.amount} max={15} color={s.color} height={3} />
                </div>
                <span style={{ fontSize: 12, fontFamily: T.mono, color: T.gold }}>{s.amount} HRS</span>
              </div>
            ))}
          </Card>
        ) : (
          <Card hover={false}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Creator Dashboard</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Total Earned', value: '1,247.5 HRS', color: T.gold },
                { label: 'Followers', value: '342', color: T.primary },
                { label: 'Content Views', value: '12.4K', color: T.accent },
                { label: 'Products Sold', value: '23', color: T.pink },
              ].map((stat, i) => (
                <div key={i} style={{ padding: 12, background: T.surface, borderRadius: 10, border: `1px solid ${T.border}` }}>
                  <div style={{ fontSize: 10, color: T.sub, fontFamily: T.font, marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: stat.color, fontFamily: T.mono }}>{stat.value}</div>
                </div>
              ))}
            </div>
            <button onClick={() => enterZone('shop')} style={{
              width: '100%', marginTop: 12, padding: '12px 0', borderRadius: 10, border: `1px solid ${T.pink}30`,
              background: `${T.pink}10`, color: T.pink, fontSize: 13, fontWeight: 700,
              fontFamily: T.font, cursor: 'pointer',
            }}>Open My Storefront →</button>
          </Card>
        )}
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // ZONE INTERIOR — Deep Zone Experience
  // ═══════════════════════════════════════════════════════════════
  const ZoneInterior = ({ zone }) => {
    const z = zones.find(zn => zn.id === zone);
    if (!z) return null;

    const ZoneHeader = () => (
      <div style={{ padding: '16px 16px 12px', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 24, background: z.gradient,
          }}>{z.icon}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: T.font }}>{z.title}</div>
            <div style={{ fontSize: 12, color: T.sub }}>{z.hook}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Pill color={T.gold}>{z.earn}</Pill>
          {z.liveCount > 0 && <Pill color={T.accent}><LiveDot /> {z.liveCount} live now</Pill>}
          <Pill color={z.color}>{z.preview}</Pill>
        </div>
      </div>
    );

    // Zone-specific content
    const zoneContent = {
      // ═══ WATCH ZONE ═══
      watch: () => (
        <div>
          <ZoneHeader />
          {/* Sub-navigation */}
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['For You', 'Following', 'Live', 'Series', 'Trending'].map((tab, i) => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'for you') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'for you') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>

          {/* Video Feed */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'I Built a $10K/mo SaaS in 30 Days', creator: 'TechVault', emoji: '🔧', views: '142K', duration: '12:34', earnings: '+3.7 HRS', thumbnail: z.gradient },
              { title: 'The AI Tool That Changed Everything', creator: 'FinanceFlow', emoji: '📈', views: '89K', duration: '8:21', earnings: '+2.5 HRS', thumbnail: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' },
              { title: '60-Second Design Challenge', creator: 'DesignDaily', emoji: '🎨', views: '234K', duration: '0:58', earnings: '+0.3 HRS', thumbnail: 'linear-gradient(135deg, #f472b6, #ef4444)' },
              { title: 'Morning Trading Routine', creator: 'MarketPulse', emoji: '📊', views: '67K', duration: '15:42', earnings: '+4.7 HRS', thumbnail: 'linear-gradient(135deg, #10b981, #0ea5e9)' },
            ].map((vid, i) => (
              <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
                {/* Thumbnail */}
                <div style={{
                  height: 180, background: vid.thumbnail, position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', background: 'rgba(0,0,0,0.6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                  }}>▶</div>
                  <span style={{
                    position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.75)',
                    padding: '2px 8px', borderRadius: 4, fontSize: 11, color: '#fff',
                    fontFamily: T.mono,
                  }}>{vid.duration}</span>
                  <span style={{
                    position: 'absolute', bottom: 8, left: 8, background: `${T.gold}dd`,
                    padding: '2px 8px', borderRadius: 4, fontSize: 10, color: '#000',
                    fontWeight: 700, fontFamily: T.mono,
                  }}>{vid.earnings}</span>
                </div>
                {/* Info */}
                <div style={{ padding: 12, display: 'flex', gap: 10 }}>
                  <Avatar emoji={vid.emoji} size={36} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: T.font, lineHeight: 1.3 }}>{vid.title}</div>
                    <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{vid.creator} · {vid.views} views</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Top Creators in this zone */}
          <div style={{ padding: '0 16px 100px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Top Creators</h3>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
              {z.topCreators.map((c, i) => (
                <div key={i} style={{
                  minWidth: 120, padding: 14, background: T.card, borderRadius: 14,
                  border: `1px solid ${T.border}`, textAlign: 'center',
                }}>
                  <Avatar emoji={c.emoji} size={40} ring ringColor={z.color} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.font, marginTop: 8 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: T.sub }}>{c.followers} followers</div>
                  <div style={{ fontSize: 10, color: T.gold, fontFamily: T.mono, marginTop: 4 }}>{c.earning} HRS</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),

      // ═══ READ ZONE ═══
      read: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Featured', 'Latest', 'Threads', 'Newsletters', 'Topics'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'featured') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'featured') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'The Creator Economy Is a Pyramid Scheme — Here\'s Why', author: 'DataMind', emoji: '🧠', readTime: '8 min', reactions: 342, earnings: '+0.8 HRS' },
              { title: 'I Replaced My 9-5 With AI Agents', author: 'CodePhilosophy', emoji: '💡', readTime: '12 min', reactions: 891, earnings: '+1.2 HRS' },
              { title: 'Web3 Is Dead. Long Live Web3.', author: 'MarketPulse', emoji: '📊', readTime: '6 min', reactions: 567, earnings: '+0.6 HRS' },
              { title: 'The Psychology of Infinite Scroll', author: 'MindHacker', emoji: '🔬', readTime: '15 min', reactions: 1204, earnings: '+1.5 HRS' },
            ].map((article, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <Avatar emoji={article.emoji} size={20} />
                      <span style={{ fontSize: 11, color: T.sub }}>{article.author}</span>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, lineHeight: 1.35, marginBottom: 8 }}>{article.title}</div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: T.dim }}>📖 {article.readTime}</span>
                      <span style={{ fontSize: 10, color: T.dim }}>❤️ {article.reactions}</span>
                      <Pill color={T.gold} style={{ fontSize: 9, padding: '1px 6px' }}>{article.earnings}</Pill>
                    </div>
                  </div>
                  <div style={{
                    width: 80, height: 80, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${z.color}40, ${z.color}10)`,
                  }} />
                </div>
              </Card>
            ))}
          </div>
          {/* Writer spotlight */}
          <div style={{ padding: '0 16px 100px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Top Writers</h3>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
              {z.topCreators.map((c, i) => (
                <div key={i} style={{ minWidth: 130, padding: 14, background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                  <Avatar emoji={c.emoji} size={40} ring ringColor={z.color} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.font, marginTop: 6 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: T.sub }}>{c.followers} subscribers</div>
                  <div style={{ fontSize: 10, color: T.gold, fontFamily: T.mono, marginTop: 4 }}>{c.earning} HRS/mo</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),

      // ═══ SHOP ZONE ═══
      shop: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Featured', 'Courses', 'Templates', 'Art', 'Services', 'My Store'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 12px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'featured') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'featured') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 11, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>
          {/* Categories */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
            {['🔥 Hot', '📐 Design', '💻 Dev', '📈 Business', '🎨 Art', '🎵 Audio'].map(cat => (
              <Pill key={cat} color={z.color} onClick={() => {}} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</Pill>
            ))}
          </div>
          {/* Product Grid */}
          <div style={{ padding: '0 16px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { title: 'Ultimate Notion System', seller: 'TemplateKing', emoji: '👑', price: '25 HRS', sales: 1247, rating: 4.9, img: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
              { title: 'AI Prompt Masterclass', seller: 'CourseFactory', emoji: '🎓', price: '45 HRS', sales: 892, rating: 4.8, img: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
              { title: 'Brand Identity Kit', seller: 'ArtByNyx', emoji: '🎨', price: '15 HRS', sales: 567, rating: 4.7, img: 'linear-gradient(135deg, #f472b6, #ec4899)' },
              { title: 'SaaS Launch Playbook', seller: 'TechVault', emoji: '🔧', price: '35 HRS', sales: 423, rating: 4.9, img: 'linear-gradient(135deg, #10b981, #059669)' },
              { title: 'Logo Design Service', seller: 'DesignGuild', emoji: '✏️', price: '20 HRS', sales: 234, rating: 4.6, img: 'linear-gradient(135deg, #f59e0b, #d97706)' },
              { title: 'YouTube Thumbnail Pack', seller: 'VisualVault', emoji: '📸', price: '8 HRS', sales: 1891, rating: 4.8, img: 'linear-gradient(135deg, #ef4444, #dc2626)' },
            ].map((product, i) => (
              <Card key={i} style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 100, background: product.img }} />
                <div style={{ padding: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.font, lineHeight: 1.3, marginBottom: 4 }}>{product.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                    <Avatar emoji={product.emoji} size={16} />
                    <span style={{ fontSize: 10, color: T.sub }}>{product.seller}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>{product.price}</span>
                    <span style={{ fontSize: 9, color: T.dim }}>⭐ {product.rating} · {product.sales} sold</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),

      // ═══ COMMUNITY ZONE ═══
      community: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Discover', 'My Groups', 'Events', 'Treasuries'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'discover') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'discover') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Crypto Builders', emoji: '🔗', members: '12.4K', treasury: '2,340 HRS', posts: 47, active: true },
              { name: 'Indie Hackers', emoji: '🚀', members: '8.9K', treasury: '1,560 HRS', posts: 32, active: true },
              { name: 'AI Art Club', emoji: '🤖', members: '6.2K', treasury: '890 HRS', posts: 28, active: false },
              { name: 'Side Hustle Nation', emoji: '💰', members: '15.7K', treasury: '3,200 HRS', posts: 56, active: true },
              { name: 'Design Systems', emoji: '🎨', members: '4.1K', treasury: '670 HRS', posts: 15, active: false },
            ].map((group, i) => (
              <Card key={i}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 24,
                    background: z.gradient,
                  }}>{group.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font }}>{group.name}</span>
                      {group.active && <LiveDot />}
                    </div>
                    <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{group.members} members · {group.posts} posts today</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                      <Pill color={T.gold} style={{ fontSize: 9, padding: '1px 6px' }}>💰 {group.treasury}</Pill>
                      <Pill color={T.accent} style={{ fontSize: 9, padding: '1px 6px' }}>Elected mods</Pill>
                    </div>
                  </div>
                  <button style={{
                    padding: '6px 14px', borderRadius: 8, border: `1px solid ${z.color}40`,
                    background: `${z.color}10`, color: z.color, fontSize: 11, fontWeight: 600,
                    fontFamily: T.font, cursor: 'pointer', alignSelf: 'center',
                  }}>Join</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),

      // ═══ LISTEN ZONE ═══
      listen: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Live Rooms', 'Podcasts', 'Music', 'Playlists'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'live rooms') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'live rooms') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>

          {/* Live Rooms */}
          <div style={{ padding: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>
              <LiveDot color={T.red} /> Live Now
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { title: 'Morning Market Brief', host: 'MorningBrief', emoji: '☀️', listeners: 342, speakers: ['📈', '💹', '🏦'], topic: 'Fed rate decision impact' },
                { title: 'AI Debate: Will Agents Replace Us?', host: 'TechTalkLive', emoji: '🎤', listeners: 891, speakers: ['🤖', '🧠', '💡'], topic: 'Open floor debate' },
                { title: 'Chill Beats & Study Session', host: 'ChillBeats', emoji: '🎵', listeners: 1204, speakers: ['🎹'], topic: 'Lo-fi focus room' },
              ].map((room, i) => (
                <Card key={i} gradient={`linear-gradient(135deg, ${z.color}15, ${z.color}05)`}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16, display: 'flex',
                      alignItems: 'center', justifyContent: 'center', fontSize: 28,
                      background: z.gradient, position: 'relative',
                    }}>
                      {room.emoji}
                      <div style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 14, height: 14, borderRadius: '50%', background: T.red,
                        border: `2px solid ${T.surface}`, animation: 'pulse 2s infinite',
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font }}>{room.title}</div>
                      <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{room.host} · {room.topic}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <div style={{ display: 'flex', gap: -4 }}>
                          {room.speakers.map((s, j) => (
                            <span key={j} style={{
                              fontSize: 14, marginLeft: j > 0 ? -4 : 0,
                              background: T.elevated, borderRadius: '50%', padding: 2,
                              border: `1px solid ${T.border}`,
                            }}>{s}</span>
                          ))}
                        </div>
                        <span style={{ fontSize: 10, color: T.sub }}>🎧 {room.listeners} listening</span>
                        <Pill color={T.gold} style={{ fontSize: 9, padding: '1px 6px' }}>+0.2/min</Pill>
                      </div>
                    </div>
                    <button style={{
                      padding: '8px 16px', borderRadius: 10, border: 'none',
                      background: z.gradient, color: '#fff', fontSize: 12, fontWeight: 700,
                      fontFamily: T.font, cursor: 'pointer',
                    }}>Join</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Podcasts */}
          <div style={{ padding: '0 16px 100px' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Trending Podcasts</h3>
            {[
              { title: 'The Creator Economy Report', host: 'DataMind', emoji: '🧠', episodes: 47, avgDuration: '32 min', monthlyListeners: '8.4K' },
              { title: 'Build in Public Podcast', host: 'IndieHacker', emoji: '🚀', episodes: 123, avgDuration: '45 min', monthlyListeners: '12.1K' },
              { title: 'Money Moves Weekly', host: 'FinanceFlow', emoji: '📈', episodes: 89, avgDuration: '28 min', monthlyListeners: '15.7K' },
            ].map((pod, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 30,
                    background: `linear-gradient(135deg, ${z.color}30, ${z.color}10)`,
                    flexShrink: 0,
                  }}>{pod.emoji}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font }}>{pod.title}</div>
                    <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{pod.host} · {pod.episodes} episodes</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <span style={{ fontSize: 10, color: T.dim }}>⏱ ~{pod.avgDuration}</span>
                      <span style={{ fontSize: 10, color: T.dim }}>🎧 {pod.monthlyListeners}/mo</span>
                      <Pill color={T.gold} style={{ fontSize: 9, padding: '1px 6px' }}>+0.2/min</Pill>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),

      // ═══ EXPLORE ZONE ═══
      explore: () => (
        <div>
          <ZoneHeader />
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto' }}>
            {['✨ For You', '💻 Tech', '🎨 Design', '📸 Photo', '🏠 Spaces', '🌍 Travel', '🍕 Food'].map(cat => (
              <Pill key={cat} color={z.color} onClick={() => {}} style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</Pill>
            ))}
          </div>
          {/* Masonry Grid */}
          <div style={{ padding: '0 16px 100px' }}>
            <div style={{ columnCount: 2, columnGap: 10 }}>
              {[
                { h: 200, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', title: 'Dreamy Workspace', saves: 342 },
                { h: 140, gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', title: 'Minimalist Desk', saves: 891 },
                { h: 260, gradient: 'linear-gradient(135deg, #f472b6, #ec4899)', title: 'AI Generated Landscape', saves: 1204 },
                { h: 180, gradient: 'linear-gradient(135deg, #10b981, #059669)', title: 'Brand Color Study', saves: 567 },
                { h: 150, gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', title: 'Typography Poster', saves: 423 },
                { h: 220, gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', title: 'Tokyo Night Photography', saves: 2341 },
                { h: 170, gradient: 'linear-gradient(135deg, #a78bfa, #7c3aed)', title: 'Retro Dashboard UI', saves: 678 },
                { h: 130, gradient: 'linear-gradient(135deg, #22d3ee, #0ea5e9)', title: 'Product Mockup', saves: 234 },
              ].map((item, i) => (
                <div key={i} style={{
                  breakInside: 'avoid', marginBottom: 10, borderRadius: 14, overflow: 'hidden',
                  border: `1px solid ${T.border}`, cursor: 'pointer',
                }}>
                  <div style={{ height: item.h, background: item.gradient, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      padding: '24px 10px 10px',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', fontFamily: T.font }}>{item.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>📌 {item.saves}</span>
                        <Pill color={T.gold} style={{ fontSize: 8, padding: '1px 5px', background: 'rgba(251,191,36,0.2)', border: 'none' }}>+0.1</Pill>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),

      // ═══ GOVERN ZONE ═══
      govern: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Active', 'Passed', 'Rejected', 'My Votes'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'active') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'active') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>

          {/* Voting Power */}
          <div style={{ margin: '16px 16px 0', padding: 16, background: `${z.color}08`, borderRadius: 14, border: `1px solid ${z.color}20` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Your Voting Power</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: T.text, fontFamily: T.mono }}>94</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: T.font }}>Trust Score</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: T.accent, fontFamily: T.mono }}>94%</div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: T.dim, marginTop: 8 }}>
              Higher trust = more voting weight. Earn trust through consistent, quality participation.
            </div>
          </div>

          {/* Active Proposals */}
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Lower creator platform fee from 8% to 5%', author: 'GovCouncil', emoji: '⚖️', yesVotes: 7842, noVotes: 2134, totalVoters: 9976, deadline: '2d left', status: 'active', reward: 2.0 },
              { title: 'Add native dark/light mode toggle', author: 'PolicyNerd', emoji: '📜', yesVotes: 8901, noVotes: 456, totalVoters: 9357, deadline: '5d left', status: 'active', reward: 2.0 },
              { title: 'Community Grants Fund — 10K HRS monthly', author: 'DataVoter', emoji: '🗳️', yesVotes: 5623, noVotes: 4201, totalVoters: 9824, deadline: '1d left', status: 'active', reward: 2.0 },
            ].map((proposal, i) => {
              const yesPercent = Math.round((proposal.yesVotes / proposal.totalVoters) * 100);
              return (
                <Card key={i}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <Avatar emoji={proposal.emoji} size={40} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, lineHeight: 1.3 }}>{proposal.title}</div>
                      <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>by {proposal.author} · {proposal.deadline}</div>

                      {/* Vote bar */}
                      <div style={{ marginTop: 12, marginBottom: 8 }}>
                        <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${yesPercent}%`, background: T.accent, transition: 'width 0.5s' }} />
                          <div style={{ flex: 1, background: T.red + '60' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                          <span style={{ fontSize: 10, color: T.accent }}>✅ Yes {yesPercent}%</span>
                          <span style={{ fontSize: 10, color: T.red }}>❌ No {100 - yesPercent}%</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={{
                          flex: 1, padding: '8px 0', borderRadius: 8, border: `1px solid ${T.accent}40`,
                          background: `${T.accent}10`, color: T.accent, fontSize: 12, fontWeight: 700,
                          fontFamily: T.font, cursor: 'pointer',
                        }}>Vote Yes</button>
                        <button style={{
                          flex: 1, padding: '8px 0', borderRadius: 8, border: `1px solid ${T.red}40`,
                          background: `${T.red}10`, color: T.red, fontSize: 12, fontWeight: 700,
                          fontFamily: T.font, cursor: 'pointer',
                        }}>Vote No</button>
                      </div>
                      <div style={{ fontSize: 10, color: T.gold, fontFamily: T.mono, marginTop: 6, textAlign: 'center' }}>
                        +{proposal.reward} HRS for voting
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ),

      // ═══ ARENA ZONE ═══
      arena: () => (
        <div>
          <ZoneHeader />
          <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${T.border}`, padding: '0 16px' }}>
            {['Active', 'Upcoming', 'My Entries', 'Leaderboard'].map(tab => (
              <button key={tab} onClick={() => setZoneSubPage(tab.toLowerCase())} style={{
                padding: '12px 14px', background: 'none', border: 'none',
                borderBottom: `2px solid ${(zoneSubPage || 'active') === tab.toLowerCase() ? z.color : 'transparent'}`,
                color: (zoneSubPage || 'active') === tab.toLowerCase() ? T.text : T.dim,
                fontSize: 12, fontWeight: 600, fontFamily: T.font, cursor: 'pointer',
              }}>{tab}</button>
            ))}
          </div>

          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Active Challenges */}
            {[
              {
                title: '60-Second Video Challenge', type: 'Creative', icon: '🎬',
                prize: '500 HRS', entries: 342, deadline: '23h left',
                description: 'Create a 60-second video explaining any concept. Most engaging wins.',
                difficulty: 'Easy', participants: ['🔧', '🎨', '📈', '💡'],
              },
              {
                title: 'AI Prompt Engineering Battle', type: 'Skill', icon: '🤖',
                prize: '1,000 HRS', entries: 89, deadline: '2d left',
                description: 'Write the prompt that gets the best output. Community votes determine winner.',
                difficulty: 'Medium', participants: ['🧠', '💻', '🔬'],
              },
              {
                title: 'Design Sprint: Logo in 1 Hour', type: 'Speed', icon: '⚡',
                prize: '250 HRS', entries: 567, deadline: 'Live now!',
                description: 'Design a logo from a random brief. Clock is ticking.',
                difficulty: 'Hard', participants: ['🎨', '✏️', '📐', '🖌️', '🎭'],
              },
              {
                title: 'Weekly Writing Marathon', type: 'Endurance', icon: '📝',
                prize: '2,000 HRS', entries: 1204, deadline: '5d left',
                description: 'Write and publish 5 articles this week. Quality scores matter.',
                difficulty: 'Expert', participants: ['🧠', '📰', '💡', '📊'],
              },
            ].map((challenge, i) => (
              <Card key={i} gradient={i === 2 ? `linear-gradient(135deg, ${z.color}15, ${z.color}05)` : undefined}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 28,
                    background: z.gradient, position: 'relative',
                  }}>
                    {challenge.icon}
                    {challenge.deadline === 'Live now!' && (
                      <div style={{
                        position: 'absolute', top: -3, right: -3, background: T.red,
                        borderRadius: 6, padding: '1px 5px', fontSize: 8, color: '#fff',
                        fontWeight: 700, animation: 'pulse 1.5s infinite',
                      }}>LIVE</div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                      <Pill color={z.color} style={{ fontSize: 9, padding: '1px 6px' }}>{challenge.type}</Pill>
                      <Pill color={
                        challenge.difficulty === 'Easy' ? T.accent :
                        challenge.difficulty === 'Medium' ? T.gold :
                        challenge.difficulty === 'Hard' ? T.orange : T.red
                      } style={{ fontSize: 9, padding: '1px 6px' }}>{challenge.difficulty}</Pill>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, fontFamily: T.font, lineHeight: 1.3 }}>{challenge.title}</div>
                    <div style={{ fontSize: 11, color: T.sub, marginTop: 4, lineHeight: 1.4 }}>{challenge.description}</div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
                      <div style={{
                        padding: '4px 10px', borderRadius: 8, background: `${T.gold}15`,
                        border: `1px solid ${T.gold}25`,
                      }}>
                        <span style={{ fontSize: 14, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>🏆 {challenge.prize}</span>
                      </div>
                      <span style={{ fontSize: 10, color: T.dim }}>{challenge.entries} entries · {challenge.deadline}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                      <div style={{ display: 'flex' }}>
                        {challenge.participants.map((p, j) => (
                          <span key={j} style={{
                            fontSize: 13, marginLeft: j > 0 ? -4 : 0,
                            background: T.elevated, borderRadius: '50%', padding: 3,
                            border: `1px solid ${T.border}`,
                          }}>{p}</span>
                        ))}
                      </div>
                      <button style={{
                        marginLeft: 'auto', padding: '8px 20px', borderRadius: 10, border: 'none',
                        background: z.gradient, color: '#fff', fontSize: 12, fontWeight: 700,
                        fontFamily: T.font, cursor: 'pointer',
                      }}>Enter</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ),
    };

    const renderZone = zoneContent[zone];
    return renderZone ? renderZone() : (
      <div style={{ padding: 40, textAlign: 'center', color: T.sub }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <div style={{ fontFamily: T.font }}>Coming soon...</div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // SEARCH PAGE
  // ═══════════════════════════════════════════════════════════════
  const SearchPage = () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ padding: '16px 16px 100px' }}>
        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
          background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, marginBottom: 20,
        }}>
          <span style={{ fontSize: 16, color: T.dim }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search everything..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: T.text, fontSize: 15, fontFamily: T.font,
            }} />
        </div>

        {/* Recent searches */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.sub, fontFamily: T.font, marginBottom: 10 }}>Recent</div>
          {['AI automation', 'passive income course', 'logo design', 'crypto analysis'].map((s, i) => (
            <div key={i} style={{
              padding: '10px 0', borderBottom: `1px solid ${T.border}`,
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
            }}>
              <span style={{ color: T.dim }}>🕐</span>
              <span style={{ fontSize: 14, color: T.text, fontFamily: T.font }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Trending */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.sub, fontFamily: T.font, marginBottom: 10 }}>Trending</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {zones.flatMap(z => z.trending.slice(0, 1)).map((t, i) => (
              <Pill key={i} color={zones[i % zones.length].color} onClick={() => setQuery(t)} style={{ cursor: 'pointer' }}>{t}</Pill>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  // PROFILE PAGE
  // ═══════════════════════════════════════════════════════════════
  const ProfilePage = () => (
    <div style={{ padding: '16px 16px 100px' }}>
      {/* Profile Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Avatar emoji={me.avatar} size={72} ring ringColor={T.primary} />
        <div style={{ fontSize: 22, fontWeight: 800, color: T.text, fontFamily: T.font, marginTop: 12 }}>{me.name}</div>
        <div style={{ fontSize: 13, color: T.sub }}>{me.handle}</div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
          <Pill color={T.purple}>Lv.{level} {me.levelName}</Pill>
          <Pill color={T.accent}>Trust {me.trust}%</Pill>
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 16 }}>
          {[
            { label: 'Followers', value: me.followers },
            { label: 'Following', value: me.following },
            { label: 'Total Earned', value: `${me.totalEarned} HRS` },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: T.mono }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: T.sub }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* XP + Level */}
      <Card hover={false} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: T.sub, fontFamily: T.font }}>Level {level} → {level + 1}</span>
          <span style={{ fontSize: 12, color: T.primary, fontFamily: T.mono }}>{xp}/{me.xpNext} XP</span>
        </div>
        <ProgressBar value={xp} max={me.xpNext} color={T.primary} height={8} />
      </Card>

      {/* Earning Breakdown */}
      <Card hover={false} style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Earnings by Zone</div>
        {zones.slice(0, 5).map((z, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? `1px solid ${T.border}` : 'none' }}>
            <span style={{ fontSize: 16 }}>{z.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: T.text, fontFamily: T.font }}>{z.title}</div>
              <ProgressBar value={[45, 28, 15, 8, 4][i]} max={50} color={z.color} height={3} />
            </div>
            <span style={{ fontSize: 11, fontFamily: T.mono, color: T.gold }}>{[45, 28, 15, 8, 4][i]} HRS</span>
          </div>
        ))}
      </Card>

      {/* Badges */}
      <Card hover={false}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 12 }}>Badges</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { icon: '🔥', label: '12-Day Streak', color: T.orange },
            { icon: '📰', label: 'First Article', color: T.primary },
            { icon: '🏛️', label: 'Community Founder', color: T.accent },
            { icon: '🗳️', label: 'First Vote', color: T.purple },
            { icon: '🎬', label: '100 Videos Watched', color: '#8b5cf6' },
            { icon: '🛍️', label: 'First Purchase', color: T.pink },
          ].map((badge, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              background: `${badge.color}10`, borderRadius: 10, border: `1px solid ${badge.color}25`,
            }}>
              <span style={{ fontSize: 16 }}>{badge.icon}</span>
              <span style={{ fontSize: 11, color: badge.color, fontWeight: 600, fontFamily: T.font }}>{badge.label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // MESSAGES PAGE
  // ═══════════════════════════════════════════════════════════════
  const MessagesPage = () => (
    <div style={{ padding: '16px 16px 100px' }}>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, fontFamily: T.font, marginBottom: 16 }}>Messages</h2>
      {[
        { name: 'TechVault', emoji: '🔧', lastMsg: 'Hey! Love your latest article on AI agents.', time: '2m', unread: 2, online: true },
        { name: 'Crypto Builders', emoji: '🔗', lastMsg: 'Alex: Has anyone tried the new trading bot?', time: '15m', unread: 8, online: true, isGroup: true },
        { name: 'DesignDaily', emoji: '🎨', lastMsg: 'Thanks for the feedback on my thumbnail!', time: '1h', unread: 0, online: false },
        { name: 'CourseFactory', emoji: '🎓', lastMsg: 'Your course order has been confirmed ✅', time: '3h', unread: 1, online: false },
        { name: 'OURS Support', emoji: '💬', lastMsg: 'Your payout of 50 HRS has been processed.', time: '1d', unread: 0, online: true },
      ].map((chat, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
          borderBottom: `1px solid ${T.border}`, cursor: 'pointer',
        }}>
          <div style={{ position: 'relative' }}>
            <Avatar emoji={chat.emoji} size={44} />
            {chat.online && <div style={{
              position: 'absolute', bottom: 0, right: 0, width: 10, height: 10,
              borderRadius: '50%', background: '#22c55e', border: `2px solid ${T.bg}`,
            }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: chat.unread > 0 ? 700 : 500, color: T.text, fontFamily: T.font }}>
                {chat.name} {chat.isGroup && '👥'}
              </span>
              <span style={{ fontSize: 10, color: T.dim }}>{chat.time}</span>
            </div>
            <div style={{
              fontSize: 12, color: chat.unread > 0 ? T.sub : T.dim, marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              fontWeight: chat.unread > 0 ? 500 : 400,
            }}>{chat.lastMsg}</div>
          </div>
          {chat.unread > 0 && (
            <div style={{
              minWidth: 20, height: 20, borderRadius: 10, background: T.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#fff',
            }}>{chat.unread}</div>
          )}
        </div>
      ))}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // WALLET PAGE (via profile or create tab)
  // ═══════════════════════════════════════════════════════════════
  const WalletPage = () => (
    <div style={{ padding: '16px 16px 100px' }}>
      {/* Balance Card */}
      <div style={{
        background: `linear-gradient(135deg, ${T.primary}15, ${T.accent}15)`,
        borderRadius: 20, padding: 24, border: `1px solid ${T.primary}20`,
        textAlign: 'center', marginBottom: 20,
      }}>
        <div style={{ fontSize: 12, color: T.sub, fontFamily: T.font, marginBottom: 4 }}>Total Balance</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: T.gold, fontFamily: T.mono }}>
          {hours.toFixed(1)} <span style={{ fontSize: 18, color: T.dim }}>HRS</span>
        </div>
        <div style={{ fontSize: 13, color: T.sub, marginTop: 4 }}>≈ ${(hours * 0.20).toFixed(2)} USD</div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button style={{
            flex: 1, padding: '12px 0', borderRadius: 12, border: 'none',
            background: T.accent, color: '#fff', fontSize: 14, fontWeight: 700,
            fontFamily: T.font, cursor: 'pointer',
          }}>Cash Out</button>
          <button style={{
            flex: 1, padding: '12px 0', borderRadius: 12, border: `1px solid ${T.primary}40`,
            background: `${T.primary}10`, color: T.primary, fontSize: 14, fontWeight: 700,
            fontFamily: T.font, cursor: 'pointer',
          }}>Send</button>
          <button style={{
            flex: 1, padding: '12px 0', borderRadius: 12, border: `1px solid ${T.gold}40`,
            background: `${T.gold}10`, color: T.gold, fontSize: 14, fontWeight: 700,
            fontFamily: T.font, cursor: 'pointer',
          }}>Buy</button>
        </div>
      </div>

      {/* Earnings today */}
      <Card hover={false} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font }}>Today's Earnings</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: T.gold, fontFamily: T.mono }}>+{earnings.toFixed(2)} HRS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { action: 'Watched 12 videos', amount: '+3.6', icon: '🎬', time: '2h ago' },
            { action: 'Daily streak reward', amount: '+3.0', icon: '🔥', time: '6h ago' },
            { action: 'Read 4 articles', amount: '+3.2', icon: '📰', time: '4h ago' },
            { action: 'Arena challenge entry', amount: '+0.0', icon: '🏆', time: '1h ago' },
            { action: 'Community post', amount: '+1.2', icon: '🏛️', time: '3h ago' },
          ].map((tx, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: i < 4 ? `1px solid ${T.border}` : 'none',
            }}>
              <span style={{ fontSize: 18 }}>{tx.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.text, fontFamily: T.font }}>{tx.action}</div>
                <div style={{ fontSize: 10, color: T.dim }}>{tx.time}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: T.mono }}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Earning tips */}
      <Card hover={false}>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: T.font, marginBottom: 10 }}>💡 Earn More</div>
        {[
          { tip: 'Complete daily quests for +5 HRS bonus', action: 'View Quests', color: T.purple },
          { tip: 'Sell on Shop — creators earn 92% of sales', action: 'Open Store', color: T.pink },
          { tip: 'Vote in Govern for +2 HRS per proposal', action: 'Vote Now', color: T.accent },
        ].map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderBottom: i < 2 ? `1px solid ${T.border}` : 'none',
          }}>
            <div style={{ flex: 1, fontSize: 12, color: T.sub, fontFamily: T.font }}>{t.tip}</div>
            <button style={{
              padding: '5px 12px', borderRadius: 8, border: `1px solid ${t.color}30`,
              background: `${t.color}10`, color: t.color, fontSize: 10, fontWeight: 600,
              fontFamily: T.font, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{t.action}</button>
          </div>
        ))}
      </Card>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // BOTTOM NAV — Persistent Tab Bar
  // ═══════════════════════════════════════════════════════════════
  const BottomNav = () => (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: `${T.bg}f0`, backdropFilter: 'blur(20px)',
      borderTop: `1px solid ${T.border}`, display: 'flex',
      padding: '6px 0 12px', maxWidth: 520, margin: '0 auto',
    }}>
      {[
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'search', icon: '🔍', label: 'Search' },
        { id: 'create', icon: '➕', label: 'Create', special: true },
        { id: 'messages', icon: '💬', label: 'Messages' },
        { id: 'profile', icon: '👤', label: 'Profile' },
      ].map(tab => (
        <button key={tab.id} onClick={() => nav(tab.id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
        }}>
          {tab.special ? (
            <div style={{
              width: 36, height: 36, borderRadius: 12, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 18,
              background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
              boxShadow: `0 2px 12px ${T.primary}40`, marginTop: -16,
            }}>{tab.icon}</div>
          ) : (
            <span style={{
              fontSize: 18, filter: activeTab === tab.id ? 'none' : 'grayscale(100%)',
              opacity: activeTab === tab.id ? 1 : 0.5,
            }}>{tab.icon}</span>
          )}
          <span style={{
            fontSize: 9, fontWeight: 600, fontFamily: T.font,
            color: activeTab === tab.id ? T.primary : T.dim,
          }}>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════
  const renderContent = () => {
    if (activeZone) return <ZoneInterior zone={activeZone} />;
    switch (activeTab) {
      case 'search': return <SearchPage />;
      case 'create': return <WalletPage />;
      case 'messages': return <MessagesPage />;
      case 'profile': return <ProfilePage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: T.bg, color: T.text, fontFamily: T.font,
      maxWidth: 520, margin: '0 auto', position: 'relative',
    }}>
      <style>{`
        @keyframes logoGlow { 0%,100% { text-shadow: 0 0 20px #0ea5e940; } 50% { text-shadow: 0 0 60px #0ea5e980; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes expandIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: ${T.dim}; }
      `}</style>

      <DailyReward />
      <QuestBoard />
      <TopBar />
      <PulseTicker />
      {renderContent()}
      <BottomNav />
    </div>
  );
};

export default OursCandyStore;
