import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — Landing Page / Home
// "They profit. You scroll. What if it was OURS?"
// Editorial manifesto style — dark-to-light emotional arc
// ═══════════════════════════════════════════════════════════════

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, style = {} }) => {
  const [ref, visible] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
};

const CountUp = ({ end, prefix = '', suffix = '', duration = 2000 }) => {
  const [ref, visible] = useInView(0.3);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const steps = 60;
    const inc = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += inc;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// ─── Price Tag Calculator ───
const PriceTag = () => {
  const [platform, setPlatform] = useState('instagram');
  const [followers, setFollowers] = useState('');
  const [posts, setPosts] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);
  const rpms = { instagram: 8.5, tiktok: 5.2, youtube: 12, twitter: 3.8, facebook: 6.4 };
  const names = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', twitter: 'X / Twitter', facebook: 'Facebook' };
  const icons = { instagram: '📸', tiktok: '🎵', youtube: '🎬', twitter: '𝕏', facebook: '📘' };
  const calc = () => {
    const f = parseInt(followers)||0, p = parseInt(posts)||0, y = parseInt(years)||1;
    const imp = f * 0.035 * 4.2 * p * 52 * y;
    const rev = (imp / 1000) * rpms[platform];
    setResult({ rev, ours: rev * 0.7, imp: imp / 1e6 });
  };
  const inp = (val, set, ph) => (
    <input type="number" value={val} onChange={e=>set(e.target.value)} placeholder={ph} style={{
      width: '100%', padding: '14px 16px', background: '#0a0e17', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10, color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box',
      fontFamily: "'DM Sans', sans-serif",
    }} />
  );
  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.keys(rpms).map(k => (
          <button key={k} onClick={()=>setPlatform(k)} style={{
            padding: '8px 16px', borderRadius: 24,
            border: platform===k ? '2px solid #0ea5e9' : '1px solid rgba(255,255,255,0.08)',
            background: platform===k ? 'rgba(14,165,233,0.12)' : 'transparent',
            color: platform===k ? '#fff' : '#94a3b8', fontSize: 13, cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}>{icons[k]} {names[k]}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
        {inp(followers, setFollowers, 'Followers')}
        {inp(posts, setPosts, 'Posts/week')}
        {inp(years, setYears, 'Years')}
      </div>
      <button onClick={calc} style={{
        width: '100%', padding: 16, border: 'none', borderRadius: 12, cursor: 'pointer',
        background: 'linear-gradient(135deg, #ef4444, #f59e0b)', color: '#fff',
        fontSize: 17, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
        letterSpacing: 0.3,
      }}>See What They Owe You</button>
      {result && (
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 6 }}>You generated for {names[platform]}</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#ef4444', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
            ${Math.round(result.rev).toLocaleString()}
          </div>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 4, marginBottom: 24 }}>{result.imp.toFixed(1)}M impressions of free labor</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#f87171', textTransform: 'uppercase', letterSpacing: 1.5 }}>They paid you</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#ef4444', fontFamily: "'Playfair Display', serif" }}>$0</div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 11, color: '#34d399', textTransform: 'uppercase', letterSpacing: 1.5 }}>OURS would target*</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#10b981', fontFamily: "'Playfair Display', serif" }}>~${Math.round(result.ours).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
const OursHomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const problems = [
    { icon: '🔒', title: 'Privacy Exploitation', stat: '18%', desc: 'Only 18% of Americans trust Facebook with their data. TikTok collects more data than any app ever created.' },
    { icon: '🎛️', title: 'Algorithm Manipulation', stat: '0%', desc: 'You choose who to follow. They choose what you see. Your feed isn\'t yours — it\'s theirs.' },
    { icon: '🧠', title: 'Mental Health Crisis', stat: '48%', desc: 'of teens say social media has a "mostly negative" effect on their lives. Anxiety mentions up 25% in one year.' },
    { icon: '🛡️', title: 'Hate & Toxicity', stat: '7.8/10', desc: 'X/Twitter\'s toxicity rating. Meta ended fact-checking entirely in 2025. They profit from your outrage.' },
    { icon: '💸', title: '$0 Creator Pay', stat: '$276B', desc: 'in social media ad revenue last year. How much went to the people who created the content? Virtually nothing.' },
    { icon: '📢', title: 'Intrusive Ad Overload', stat: '54%', desc: 'of all ad-related conversations online express anger. You\'re not a user — you\'re inventory.' },
    { icon: '🤖', title: 'Bot Epidemic', stat: 'Millions', desc: 'of fake accounts inflate every platform. You don\'t know if you\'re talking to a human or a script.' },
    { icon: '⚖️', title: 'Zero Ownership', stat: '0 rights', desc: 'You created it. They own it. No equity, no revenue, no vote, no portability. Read the fine print.' },
    { icon: '📋', title: 'Misinformation Flood', stat: '79%', desc: 'surge in "deinfluencing" — people actively telling others to stop trusting what they see online.' },
    { icon: '⏱️', title: 'Designed for Addiction', stat: '210M', desc: 'people worldwide addicted to social media. TikTok uses the same psychological hooks as slot machines.' },
    { icon: '🎨', title: 'Every Platform = TikTok', stat: 'Copy/Paste', desc: 'Instagram killed photos. YouTube pushed Shorts. Facebook became a "discovery engine." Originality died.' },
    { icon: '🤖', title: 'AI Trains on YOU', stat: 'No consent', desc: 'Meta and X scrape your posts to train AI models. You opted in by default. Your art builds their empire.' },
    { icon: '📉', title: 'Organic Reach = Dead', stat: '1-2%', desc: 'of your followers see your Facebook posts. Want reach? Pay up. It\'s a shakedown disguised as a feature.' },
    { icon: '🔥', title: 'Rage Bait by Design', stat: '95%', desc: 'surge in boycott mentions. Algorithms serve you content that makes you angry — because anger = engagement = money.' },
    { icon: '🪞', title: 'Comparison Culture', stat: 'Endless', desc: 'Highlight reels. Filtered lives. FOMO as a feature. You feel worse about your life so they feel better about their margins.' },
    { icon: '🗑️', title: 'AI Slop Everywhere', stat: 'Declining', desc: '"fun" on social media declining since 2023. Feeds flooded with AI-generated garbage. Brainrot was the word of 2024.' },
    { icon: '😩', title: 'Platform Fatigue', stat: '6+', desc: 'platforms the average person manages. Different formats, different algorithms, same exhaustion. Nobody asked for this.' },
    { icon: '🚫', title: 'Arbitrary Censorship', stat: 'No appeal', desc: 'Banned without explanation. Shadow-banned without proof. Rules change overnight. You have zero recourse.' },
    { icon: '🔐', title: 'Security Is a Joke', stat: 'Billions', desc: 'of records leaked across Facebook, LinkedIn, X. Cambridge Analytica was just the one they got caught for.' },
    { icon: '🔍', title: 'Trust Is Gone', stat: '79%↑', desc: 'surge in deinfluencing. People are actively warning others not to trust what influencers promote. The system is broken.' },
  ];

  const solutions = [
    { icon: '💰', title: 'Up to 70% Revenue Share', desc: 'Our target: up to 70% of ad revenue distributed to users, proportional to their HOURS. Your content, your earnings. Actual payouts depend on platform revenue and growth stage.', color: '#10b981' },
    { icon: '⏱️', title: 'HOURS Token', desc: 'Time creating, engaging, and moderating earns HOURS. HOURS = your share of the revenue pool. Time literally is money.', color: '#f59e0b' },
    { icon: '🎛️', title: 'You Control Your Feed', desc: 'Chronological by default. Slider to add discovery. You decide. The algorithm works for you, not advertisers.', color: '#0ea5e9' },
    { icon: '🏛️', title: 'Real Ownership', desc: 'Vote on features. Elect moderators. Export everything. Your HOURS = your governance power. It\'s literally OURS.', color: '#a78bfa' },
    { icon: '🧠', title: 'Wellness-First Design', desc: 'No infinite scroll. "You\'re caught up" endpoints. Hidden vanity metrics. Usage timers. We want you healthy, not hooked.', color: '#10b981' },
    { icon: '🛍️', title: 'Creator Storefronts', desc: 'Sell courses, art, services. Our launch target: creators keep up to 95%. Low platform fees, no hidden middlemen. Your store, your revenue.', color: '#f59e0b' },
    { icon: '📢', title: 'Real Reach, Not Ransom', desc: 'We prioritize delivering your posts to people who chose to follow you. No throttling reach to sell ads. Your audience should actually see your content.', color: '#0ea5e9' },
    { icon: '🔒', title: 'Privacy You Can See', desc: 'Dashboard showing exactly what we store. No third-party data sales. Export or delete anytime. Your data, your rules.', color: '#a78bfa' },
  ];

  return (
    <div style={{ background: '#050810', color: '#e2e8f0', minHeight: '100vh', overflowX: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050810; }
        ::selection { background: rgba(14,165,233,0.3); }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes grain {
          0% { transform: translate(0,0); }
          10% { transform: translate(-2%,-2%); }
          20% { transform: translate(1%,3%); }
          30% { transform: translate(-3%,1%); }
          40% { transform: translate(3%,-1%); }
          50% { transform: translate(-1%,2%); }
          60% { transform: translate(2%,-3%); }
          70% { transform: translate(-2%,1%); }
          80% { transform: translate(1%,-2%); }
          90% { transform: translate(-1%,3%); }
          100% { transform: translate(0,0); }
        }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

      {/* ═══════════ FILM GRAIN OVERLAY ═══════════ */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.5, animation: 'grain 4s steps(8) infinite',
      }} />

      {/* ═══════════ STICKY NAV ═══════════ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 24px',
        background: scrollY > 50 ? 'rgba(5,8,16,0.92)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(16px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(255,255,255,0.04)' : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: -1 }}>
          <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="#calculator" style={{ padding: '8px 18px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Your Price Tag</a>
          <a href="#join" style={{ padding: '8px 20px', borderRadius: 24, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', color: '#fff', fontSize: 13, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Join the Waitlist</a>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '60%', left: '30%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Reveal>
          <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 4, color: '#ef4444', marginBottom: 24 }}>
            THE SOCIAL MEDIA THEY DON'T WANT BUILT
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(42px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.05, maxWidth: 900, marginBottom: 24, letterSpacing: -2 }}>
            They profit.<br />
            <span style={{ color: '#64748b' }}>You scroll.</span><br />
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>What if it was <em>ours?</em></span>
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, lineHeight: 1.7, color: '#94a3b8', maxWidth: 580, marginBottom: 40 }}>
            Social media companies made <strong style={{ color: '#ef4444' }}>$276 billion</strong> last year from content <em>you</em> created. They paid you nothing. OURS is designed to pay you back — targeting <strong style={{ color: '#10b981' }}>70% of ad revenue</strong> back to the people who earn it.
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#calculator" style={{ padding: '16px 36px', borderRadius: 14, background: 'linear-gradient(135deg, #ef4444, #f59e0b)', color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', cursor: 'pointer' }}>
              💰 Calculate Your Price Tag
            </a>
            <a href="#truth" style={{ padding: '16px 36px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#e2e8f0', fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>
              See the ugly truth ↓
            </a>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', animation: 'float 2.5s ease-in-out infinite' }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: '2px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: 'rgba(255,255,255,0.3)', animation: 'pulse 1.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══════════ TICKER BAR ═══════════ */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '12px 0', background: 'rgba(239,68,68,0.03)' }}>
        <div style={{ display: 'flex', gap: 60, whiteSpace: 'nowrap', animation: 'ticker 30s linear infinite', width: 'max-content' }}>
          {[...[
            '$276B ad revenue — $0 to creators',
            '210 million people addicted to social media',
            '54% of ad mentions express anger',
            'Only 18% trust Facebook with their data',
            'Organic reach: 1-2% on Facebook',
            'Meta ended fact-checking in 2025',
            'Deinfluencing surged 79%',
            'Boycott mentions up 95%',
          ], ...[
            '$276B ad revenue — $0 to creators',
            '210 million people addicted to social media',
            '54% of ad mentions express anger',
            'Only 18% trust Facebook with their data',
            'Organic reach: 1-2% on Facebook',
            'Meta ended fact-checking in 2025',
            'Deinfluencing surged 79%',
            'Boycott mentions up 95%',
          ]].map((t, i) => (
            <span key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#ef4444', fontWeight: 500, opacity: 0.7 }}>● {t}</span>
          ))}
        </div>
      </div>

      {/* ═══════════ THE UGLY TRUTH ═══════════ */}
      <section id="truth" style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 4, color: '#ef4444', marginBottom: 12 }}>THE UGLY TRUTH</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
              20 reasons people are<br /><span style={{ color: '#ef4444' }}>leaving social media</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#64748b', marginTop: 12, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>These aren't opinions. They're documented, researched, data-backed facts from 2025 and 2026.</p>
          </div>
        </Reveal>

        <div style={{ columns: 'clamp(1, 10vw, 2)', columnGap: 16 }}>
          {problems.map((p, i) => (
            <Reveal key={i} delay={Math.min(i * 0.04, 0.3)}>
              <div style={{
                breakInside: 'avoid', marginBottom: 12,
                background: 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.08)',
                borderRadius: 14, padding: '18px 20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: '#f1f5f9' }}>{p.title}</span>
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: '#ef4444' }}>{p.stat}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6, color: '#94a3b8' }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ THE PIVOT — DIVIDER ═══════════ */}
      <section style={{ padding: '80px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(14,165,233,0.04), transparent)', pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, #ef4444, transparent)', margin: '0 auto 32px' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: -1, marginBottom: 16 }}>
              What if <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>every single one</span> of those problems<br />had a solution?
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
              Not a Band-Aid. Not a promise. A platform <em>designed from day one</em> to fix all twenty. We didn't copy their playbook and change the logo. We burned the playbook.
            </p>
            <div style={{ width: 80, height: 2, background: 'linear-gradient(90deg, transparent, #10b981)', margin: '32px auto 0' }} />
          </div>
        </Reveal>
      </section>

      {/* ═══════════ THE UPSIDE — SOLUTIONS ═══════════ */}
      <section style={{ padding: '80px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 4, color: '#10b981', marginBottom: 12 }}>THE UPSIDE</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
              A platform built for<br /><span style={{ color: '#10b981' }}>the people on it</span>
            </h2>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {solutions.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                background: `rgba(${s.color === '#10b981' ? '16,185,129' : s.color === '#f59e0b' ? '245,158,11' : s.color === '#0ea5e9' ? '14,165,233' : '167,139,250'},0.04)`,
                border: `1px solid ${s.color}18`,
                borderRadius: 16, padding: 28, height: '100%',
              }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#f1f5f9' }}>{s.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#94a3b8' }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW HOURS WORK ═══════════ */}
      <section style={{ padding: '80px 24px', background: 'rgba(14,165,233,0.02)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 4, color: '#f59e0b', marginBottom: 12 }}>THE CURRENCY</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: -1 }}>
                How <span style={{ color: '#f59e0b' }}>HOURS</span> Work
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#94a3b8', marginTop: 10 }}>Time is the most honest currency. You can't fake an hour of real engagement.</p>
            </div>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { step: '01', title: 'You create, engage, or moderate', desc: 'Every minute you spend making content, commenting thoughtfully, or keeping the community healthy earns HOURS tokens. Not vanity points. Real value.', color: '#0ea5e9' },
              { step: '02', title: 'Advertisers pay to reach you', desc: 'Brands still want to reach people. That doesn\'t change. What changes is where the money goes. Instead of a billionaire\'s yacht fund — it goes into the HOURS pool.', color: '#f59e0b' },
              { step: '03', title: '70% flows back to you', desc: 'Our target model splits ad revenue 70/20/10: 70% distributed to HOURS holders, 20% to platform operations, 10% to a community growth fund. Actual percentages may vary as the platform scales and evolves.', color: '#10b981' },
              { step: '04', title: 'HOURS = power, not just money', desc: 'Your HOURS also give you governance votes, moderation privileges, and priority customer support. The more you contribute, the more say you have in how the platform evolves. It\'s literally yours.', color: '#a78bfa' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 56, height: 56, borderRadius: 14,
                    background: `${item.color}12`, border: `1px solid ${item.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: item.color,
                  }}>{item.step}</div>
                  <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6, color: '#f1f5f9' }}>{item.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#94a3b8' }}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BIG NUMBERS ═══════════ */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
          {[
            { end: 276, prefix: '$', suffix: 'B', label: 'Social media ad revenue in 2025', color: '#ef4444' },
            { end: 0, prefix: '$', suffix: '', label: 'What they paid you', color: '#ef4444' },
            { end: 70, prefix: '', suffix: '%', label: 'Target revenue share to users*', color: '#10b981' },
            { end: 95, prefix: '', suffix: '%', label: 'Target creator storefront revenue*', color: '#10b981' },
          ].map((n, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: 28, borderRadius: 16, background: `${n.color}08`, border: `1px solid ${n.color}15` }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: n.color }}>
                  <CountUp end={n.end} prefix={n.prefix} suffix={n.suffix} />
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ THEM vs US TABLE ═══════════ */}
      <section style={{ padding: '60px 24px 100px', maxWidth: 800, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40, letterSpacing: -1 }}>
            Them <span style={{ color: '#64748b' }}>vs</span> <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
          </h2>
        </Reveal>
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            ['Your content revenue', '$0', 'Up to 70% of ad revenue*'],
            ['Who controls your feed', 'Their algorithm', 'You (with a slider)'],
            ['Storefront fee', '30-45% cut', 'Target: ~5% fee (you keep ~95%)*'],
            ['Organic reach', '1-2% of followers', 'Designed to actually deliver'],
            ['Your data', 'Sold to advertisers', 'You control it — export or delete anytime'],
            ['Moderation', 'Arbitrary, opaque', 'Transparent, community-elected'],
            ['AI training on your work', 'Automatic, no consent', 'Opt-in only + compensation'],
            ['Governance', 'Zero say', 'Vote on every major decision'],
            ['Infinite scroll addiction', 'By design', '"You\'re caught up" endpoints'],
            ['Account security', 'Billions of records leaked', 'Mandatory 2FA + E2E DMs'],
          ].map(([label, them, ours], i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
              }}>
                <div style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{label}</div>
                <div style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#ef4444', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>{them}</div>
                <div style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#10b981', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.04)' }}>{ours}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ PRICE TAG CALCULATOR ═══════════ */}
      <section id="calculator" style={{ padding: '100px 24px', background: 'rgba(239,68,68,0.02)', borderTop: '1px solid rgba(239,68,68,0.06)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: 4, color: '#ef4444', marginBottom: 12 }}>THE WAKE-UP CALL</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, lineHeight: 1.2, letterSpacing: -1 }}>
                How much did <em>you</em><br />make <span style={{ color: '#ef4444' }}>them?</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#94a3b8', marginTop: 10 }}>Enter your numbers. See what you're worth. Then ask yourself why you're working for free.</p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <PriceTag />
          </Reveal>
        </div>
      </section>

      {/* ═══════════ SOCIAL PROOF / QUOTES ═══════════ */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 800, letterSpacing: -0.5 }}>The world is ready</h2>
          </div>
        </Reveal>
        {[
          { quote: 'Social media time peaked around 2022 and is drifting down, especially among younger users. The combination of AI slop, partisan ownership, and aggressive advertising will lead many to break their addictions.', source: 'Financial Times / Deloitte Australia, 2026' },
          { quote: 'Conversations about social media being "fun" have been in steady decline since 2023. An analysis of 910 million mentions found brands initiate less than 1% of brand-related conversations. The real opportunity lies in the other 99%.', source: 'Brandwatch State of Social Report, 2026' },
          { quote: 'These tech companies know full well what they are doing. It is a business model that runs on envy, pride, lust, and rage. It gets a lot of clicks and sucks up a lot of time, turning us all into the product.', source: 'Dr. Jacob Lentz' },
        ].map((q, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ marginBottom: 20, padding: '24px 28px', borderLeft: `3px solid ${i === 0 ? '#ef4444' : i === 1 ? '#f59e0b' : '#0ea5e9'}`, background: 'rgba(255,255,255,0.01)', borderRadius: '0 12px 12px 0' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontStyle: 'italic', lineHeight: 1.7, color: '#cbd5e1', marginBottom: 8 }}>"{q.quote}"</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#64748b' }}>— {q.source}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section id="join" style={{ padding: '100px 24px 120px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <Reveal>
          <div style={{ fontSize: 56, marginBottom: 24 }}>✊</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: -2, maxWidth: 700, margin: '0 auto 20px' }}>
            It's time to own<br />
            <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>what's ours.</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#94a3b8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Join the waitlist. Be first to earn HOURS. Be first to finally get paid for the value you create every single day.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '18px 44px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #0ea5e9, #10b981)', color: '#fff', fontSize: 18, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', letterSpacing: 0.3 }}>Join the Waitlist</button>
            <button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '18px 32px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#e2e8f0', fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}>See Your Price Tag</button>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ DISCLOSURE ═══════════ */}
      <section style={{ padding: '40px 24px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)',
          borderRadius: 14, padding: '24px 28px',
        }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>Important Disclosures</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, lineHeight: 1.8, color: '#475569' }}>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: '#64748b' }}>*Revenue Sharing:</strong> The 70% ad revenue share and 95% storefront revenue figures represent our target model at launch. Actual payout percentages may vary based on platform revenue, operating costs, regulatory requirements, and growth stage. Revenue sharing is subject to the platform's then-current terms of service, which may be updated from time to time. OURS does not guarantee any specific level of earnings. Individual earnings will vary based on content quality, engagement levels, audience size, advertiser demand, and other factors beyond our control.
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: '#64748b' }}>*Price Tag Calculator:</strong> Calculations are estimates based on industry-average CPM rates, assumed engagement rates, and simplified impression models. These figures are for illustrative purposes only and do not represent actual revenue generated by any specific platform or account. Real-world ad revenue depends on many variables including geography, audience demographics, content category, ad format, and seasonality. The calculator is a directional tool, not a financial statement.
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: '#64748b' }}>*HOURS Tokens:</strong> HOURS are a platform engagement metric used to calculate proportional revenue distribution. HOURS are not a cryptocurrency, security, or investment vehicle. HOURS have no cash value outside the OURS platform and cannot be traded on external exchanges. The value of HOURS is tied directly to platform ad revenue, which may fluctuate. Past or projected earnings are not indicative of future results.
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: '#64748b' }}>*Content Delivery:</strong> OURS is designed to prioritize delivering content to followers over algorithmic recommendations. However, content visibility may be affected by factors including user preferences, content relevance, moderation actions, and system performance. We do not guarantee any specific reach percentage or content delivery rate.
            </p>
            <p style={{ marginBottom: 10 }}>
              <strong style={{ color: '#64748b' }}>*Governance:</strong> Community governance features including voting rights and moderation elections are aspirational features planned for future development. The platform reserves the right to make operational decisions necessary for legal compliance, user safety, and platform integrity regardless of community vote outcomes. Governance structures may evolve as the platform grows.
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong style={{ color: '#64748b' }}>*General:</strong> OURS is currently in development. Features described on this page represent our product vision and roadmap, not a guarantee of final functionality. All features are subject to change. Third-party statistics cited on this page are sourced from publicly available research and reports; OURS does not independently verify these figures. This page is not a solicitation for investment. By joining the waitlist, you agree to receive communications from OURS; you may unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#475569' }}>
          <span style={{ fontWeight: 700, background: 'linear-gradient(135deg, #0ea5e9, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OURS</span>
          {' '}— The platform where your time has value. Not theirs.
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: '#334155', marginTop: 8 }}>
          20 problems. 20 solutions. 1 platform. See disclosures above. All figures are targets, not guarantees.
        </div>
      </footer>
    </div>
  );
};

export default OursHomePage;
