import React, { useState, useEffect } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — PAGE 1: AUTH FLOW
// Sign Up • Log In • Magic Link • Human Verification
// ═══════════════════════════════════════════════════════════════

const OursAuth = () => {
  const [mode, setMode] = useState('landing'); // landing | signup | login | magiclink | verify | verified
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [verifyImages, setVerifyImages] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setMounted(true);
    // Generate floating particles
    const p = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.05,
    }));
    setParticles(p);
  }, []);

  // Fake "human verification" images
  const verifyOptions = [
    { id: 1, emoji: '🌅', label: 'Sunset' },
    { id: 2, emoji: '🐕', label: 'Dog' },
    { id: 3, emoji: '🏔️', label: 'Mountain' },
    { id: 4, emoji: '🌊', label: 'Ocean' },
    { id: 5, emoji: '🎸', label: 'Guitar' },
    { id: 6, emoji: '🍕', label: 'Pizza' },
    { id: 7, emoji: '🚀', label: 'Rocket' },
    { id: 8, emoji: '📚', label: 'Books' },
    { id: 9, emoji: '🎨', label: 'Art' },
  ];

  const T = {
    bg: '#030712',
    surface: '#0a1122',
    card: '#0f1a2e',
    elevated: '#152240',
    border: 'rgba(56,68,100,0.22)',
    primary: '#0ea5e9',
    accent: '#10b981',
    gold: '#fbbf24',
    red: '#ef4444',
    purple: '#a78bfa',
    text: '#eaf0f9',
    sub: '#8b9dc3',
    dim: '#4a5b7a',
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleSendMagicLink = () => {
    if (email.includes('@')) setMode('magiclink');
  };

  const handleSocialAuth = (provider) => {
    setMode('verify');
  };

  const handleVerifySelect = (id) => {
    if (verifyImages.includes(id)) {
      setVerifyImages(verifyImages.filter(i => i !== id));
    } else {
      setVerifyImages([...verifyImages, id]);
    }
  };

  const handleVerifySubmit = () => {
    if (verifyImages.length >= 2) {
      setMode('verified');
    }
  };

  // ═══ REUSABLE COMPONENTS ═══

  const AnimatedText = ({ children, delay = 0, style = {} }) => (
    <div style={{
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );

  const Button = ({ children, onClick, variant = 'primary', disabled = false, style: s = {} }) => {
    const variants = {
      primary: {
        background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
        color: '#fff',
        border: 'none',
        boxShadow: `0 4px 20px ${T.primary}30`,
      },
      social: {
        background: T.surface,
        color: T.text,
        border: `1px solid ${T.border}`,
        boxShadow: 'none',
      },
      gold: {
        background: `linear-gradient(135deg, ${T.gold}, #f97316)`,
        color: '#000',
        border: 'none',
        boxShadow: `0 4px 20px ${T.gold}30`,
      },
      ghost: {
        background: 'transparent',
        color: T.sub,
        border: `1px solid ${T.border}`,
        boxShadow: 'none',
      },
    };
    const v = variants[variant];
    return (
      <button disabled={disabled} onClick={onClick} style={{
        width: '100%', padding: '15px 0', borderRadius: 14, fontSize: 15, fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: "'Outfit', sans-serif",
        transition: 'all 0.2s ease', opacity: disabled ? 0.4 : 1,
        ...v, ...s,
      }}>
        {children}
      </button>
    );
  };

  const Divider = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '20px 0' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }} />
      <span style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase' }}>or</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${T.border}, transparent)` }} />
    </div>
  );

  const BackButton = ({ to }) => (
    <button onClick={() => { setMode(to); setVerifyImages([]); }} style={{
      position: 'absolute', top: 20, left: 20, background: `${T.surface}cc`, border: `1px solid ${T.border}`,
      borderRadius: '50%', width: 40, height: 40, color: T.sub, fontSize: 18, cursor: 'pointer',
      backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10,
    }}>←</button>
  );

  // ═══ LANDING VIEW ═══
  const LandingView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 32px' }}>
      {/* Logo */}
      <AnimatedText delay={0.1}>
        <div style={{ marginBottom: 6 }}>
          <span style={{
            fontSize: 56, fontWeight: 900, fontFamily: "'Outfit', sans-serif", letterSpacing: -3,
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent}, ${T.gold})`,
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 4s ease infinite',
          }}>OURS</span>
        </div>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <p style={{
          fontSize: 17, color: T.sub, fontFamily: "'Outfit', sans-serif", textAlign: 'center',
          lineHeight: 1.5, maxWidth: 300, margin: '0 0 8px',
        }}>
          The platform that pays you back.
        </p>
      </AnimatedText>

      <AnimatedText delay={0.4}>
        <p style={{
          fontSize: 12, color: T.dim, fontFamily: "'DM Mono', monospace", textAlign: 'center',
          maxWidth: 280, margin: '0 0 36px', lineHeight: 1.6,
        }}>
          Your attention has value. Your data has value.<br/>It's time you got paid for both.
        </p>
      </AnimatedText>

      {/* Stats ticker */}
      <AnimatedText delay={0.5}>
        <div style={{
          display: 'flex', gap: 24, marginBottom: 36, padding: '12px 24px',
          background: `${T.surface}80`, borderRadius: 16, border: `1px solid ${T.border}`,
          backdropFilter: 'blur(10px)',
        }}>
          {[
            { value: '10K+', label: 'Waitlist', color: T.primary },
            { value: '$0', label: 'Your cost', color: T.accent },
            { value: '70%', label: 'Revenue shared*', color: T.gold },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </AnimatedText>

      {/* Main CTA */}
      <AnimatedText delay={0.6} style={{ width: '100%', maxWidth: 340 }}>
        <Button onClick={() => setMode('signup')} variant="primary">
          Join OURS →
        </Button>
      </AnimatedText>

      <AnimatedText delay={0.7} style={{ width: '100%', maxWidth: 340, marginTop: 10 }}>
        <Button onClick={() => setMode('login')} variant="ghost">
          I already have an account
        </Button>
      </AnimatedText>

      {/* Trust signals */}
      <AnimatedText delay={0.9}>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>
          <span>🔒 E2E Encrypted</span>
          <span>•</span>
          <span>🛡️ No data selling</span>
          <span>•</span>
          <span>🤖 No AI training*</span>
        </div>
      </AnimatedText>

      <AnimatedText delay={1.0}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", textAlign: 'center', marginTop: 24, maxWidth: 300, lineHeight: 1.6, opacity: 0.6 }}>
          *Revenue sharing percentages are targets based on platform design. Actual percentages may vary. "No AI training" refers to opt-out default — users can choose to opt in. All figures are projections, not guarantees.
        </p>
      </AnimatedText>
    </div>
  );

  // ═══ SIGNUP VIEW ═══
  const SignupView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '60px 32px 40px' }}>
      <BackButton to="landing" />

      <AnimatedText delay={0.1}>
        <div style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: T.primary, letterSpacing: 2, textTransform: 'uppercase' }}>Join OURS</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px', lineHeight: 1.15 }}>
          Start earning<br/>from day one.
        </h1>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 28px', lineHeight: 1.5 }}>
          Sign up in 30 seconds. No password needed.
        </p>
      </AnimatedText>

      {/* Email input */}
      <AnimatedText delay={0.2}>
        <div style={{ marginBottom: 14, position: 'relative' }}>
          <label style={{
            fontSize: 10, fontWeight: 600, color: emailFocused ? T.primary : T.dim,
            fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase',
            display: 'block', marginBottom: 6, transition: 'color 0.2s',
          }}>Email</label>
          <div style={{
            position: 'relative', borderRadius: 14, overflow: 'hidden',
            boxShadow: emailFocused ? `0 0 0 2px ${T.primary}40` : 'none',
            transition: 'box-shadow 0.2s',
          }}>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                width: '100%', padding: '16px 18px', borderRadius: 14,
                border: `1px solid ${emailFocused ? T.primary : T.border}`,
                background: T.surface, color: T.text, fontSize: 15,
                fontFamily: "'Outfit', sans-serif", outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
            {email.includes('@') && (
              <div style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                width: 24, height: 24, borderRadius: '50%', background: `${T.accent}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: T.accent,
              }}>✓</div>
            )}
          </div>
        </div>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <Button onClick={handleSendMagicLink} disabled={!email.includes('@')}>
          ✨ Send Magic Link
        </Button>
        <p style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", textAlign: 'center', marginTop: 8 }}>
          No password to remember. Ever.
        </p>
      </AnimatedText>

      <Divider />

      {/* Social auth */}
      <AnimatedText delay={0.4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { provider: 'Google', icon: '🔵', color: '#4285f4' },
            { provider: 'Apple', icon: '⚫', color: '#fff' },
          ].map(s => (
            <button key={s.provider} onClick={() => handleSocialAuth(s.provider)} style={{
              width: '100%', padding: '14px 0', borderRadius: 14,
              border: `1px solid ${T.border}`, background: T.surface,
              color: T.text, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.15s',
            }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              Continue with {s.provider}
            </button>
          ))}
        </div>
      </AnimatedText>

      {/* First HOURS bonus teaser */}
      <AnimatedText delay={0.5}>
        <div style={{
          marginTop: 24, padding: '14px 18px', borderRadius: 16,
          background: `linear-gradient(135deg, ${T.gold}08, ${T.gold}04)`,
          border: `1px solid ${T.gold}18`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 28, animation: 'float 3s ease-in-out infinite' }}>🎁</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.gold }}>+10.0 HOURS welcome bonus</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Claim yours after sign up*</div>
          </div>
        </div>
      </AnimatedText>

      {/* Legal links */}
      <AnimatedText delay={0.6}>
        <p style={{
          fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", textAlign: 'center',
          marginTop: 20, lineHeight: 1.7,
        }}>
          By signing up, you agree to our{' '}
          <span style={{ color: T.primary, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: T.primary, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>Privacy Policy</span>.
        </p>
      </AnimatedText>

      <AnimatedText delay={0.7}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", textAlign: 'center', marginTop: 16, lineHeight: 1.6, opacity: 0.5 }}>
          *HOURS welcome bonus is illustrative. Actual value depends on platform revenue. HOURS are not cryptocurrency or securities.
        </p>
      </AnimatedText>
    </div>
  );

  // ═══ LOGIN VIEW ═══
  const LoginView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '60px 32px 40px' }}>
      <BackButton to="landing" />

      <AnimatedText delay={0.1}>
        <div style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: T.accent, letterSpacing: 2, textTransform: 'uppercase' }}>Welcome back</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px' }}>
          Log in to OURS
        </h1>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 28px' }}>
          Your HOURS are waiting.
        </p>
      </AnimatedText>

      <AnimatedText delay={0.2}>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
          <input
            type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%', padding: '16px 18px', borderRadius: 14,
              border: `1px solid ${T.border}`, background: T.surface,
              color: T.text, fontSize: 15, fontFamily: "'Outfit', sans-serif", outline: 'none',
            }}
          />
        </div>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <Button onClick={handleSendMagicLink} disabled={!email.includes('@')}>
          ✨ Send Magic Link
        </Button>
      </AnimatedText>

      <Divider />

      <AnimatedText delay={0.4}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { provider: 'Google', icon: '🔵' },
            { provider: 'Apple', icon: '⚫' },
          ].map(s => (
            <button key={s.provider} onClick={() => handleSocialAuth(s.provider)} style={{
              width: '100%', padding: '14px 0', borderRadius: 14,
              border: `1px solid ${T.border}`, background: T.surface,
              color: T.text, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              Continue with {s.provider}
            </button>
          ))}
        </div>
      </AnimatedText>

      <AnimatedText delay={0.5}>
        <p style={{ fontSize: 12, color: T.dim, fontFamily: "'Outfit', sans-serif", textAlign: 'center', marginTop: 24 }}>
          Don't have an account?{' '}
          <span onClick={() => setMode('signup')} style={{ color: T.primary, cursor: 'pointer', fontWeight: 600 }}>Sign up →</span>
        </p>
      </AnimatedText>
    </div>
  );

  // ═══ MAGIC LINK SENT ═══
  const MagicLinkView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 32px', textAlign: 'center' }}>
      <BackButton to="signup" />

      <AnimatedText delay={0.1}>
        <div style={{
          width: 80, height: 80, borderRadius: 24, margin: '0 auto 20px',
          background: `linear-gradient(135deg, ${T.primary}20, ${T.accent}20)`,
          border: `1px solid ${T.primary}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, animation: 'float 3s ease-in-out infinite',
        }}>✉️</div>
      </AnimatedText>

      <AnimatedText delay={0.2}>
        <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 8px' }}>
          Check your email
        </h1>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <p style={{ fontSize: 14, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px', lineHeight: 1.5 }}>
          We sent a magic link to
        </p>
        <p style={{
          fontSize: 16, fontWeight: 700, color: T.primary, fontFamily: "'DM Mono', monospace",
          margin: '0 0 24px', padding: '8px 16px', background: `${T.primary}08`,
          borderRadius: 10, display: 'inline-block',
        }}>
          {email}
        </p>
      </AnimatedText>

      <AnimatedText delay={0.4}>
        <div style={{
          background: T.card, borderRadius: 20, padding: '20px 24px', maxWidth: 320, width: '100%',
          border: `1px solid ${T.border}`, textAlign: 'left', marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.dim, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>How it works</div>
          {[
            { step: '01', text: 'Open the email from OURS', icon: '📧' },
            { step: '02', text: 'Click the magic link', icon: '✨' },
            { step: '03', text: "You're in — no password needed", icon: '🎉' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 2 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: `${T.primary}10`, border: `1px solid ${T.primary}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <span style={{ fontSize: 9, color: T.primary, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{s.step}</span>
                <div style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedText>

      <AnimatedText delay={0.5}>
        <button onClick={() => setMode('verify')} style={{
          padding: '12px 28px', borderRadius: 12, border: `1px solid ${T.border}`,
          background: T.surface, color: T.sub, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Outfit', sans-serif", marginBottom: 12,
        }}>
          I clicked the link ✓
        </button>
      </AnimatedText>

      <AnimatedText delay={0.6}>
        <p style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>
          Didn't get it?{' '}
          <span style={{ color: T.primary, cursor: 'pointer', fontWeight: 600 }}>Resend</span>
          {' '}or{' '}
          <span style={{ color: T.primary, cursor: 'pointer', fontWeight: 600 }}>try another email</span>
        </p>
      </AnimatedText>
    </div>
  );

  // ═══ HUMAN VERIFICATION ═══
  const VerifyView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', padding: '60px 32px 40px' }}>
      <BackButton to="signup" />

      <AnimatedText delay={0.1}>
        <div style={{
          width: 64, height: 64, borderRadius: 20, margin: '0 auto 16px',
          background: `linear-gradient(135deg, ${T.accent}20, ${T.primary}20)`,
          border: `1px solid ${T.accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
        }}>🛡️</div>
      </AnimatedText>

      <AnimatedText delay={0.2}>
        <h1 style={{ fontSize: 22, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px', textAlign: 'center' }}>
          Quick human check
        </h1>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", textAlign: 'center', margin: '0 0 6px', lineHeight: 1.5 }}>
          OURS is for real people. Pick <strong style={{ color: T.accent }}>2 or more</strong> items that make you happy.
        </p>
        <p style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", textAlign: 'center', margin: '0 0 24px' }}>
          There are no wrong answers.
        </p>
      </AnimatedText>

      <AnimatedText delay={0.3}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 320, width: '100%', marginBottom: 24 }}>
          {verifyOptions.map(opt => {
            const selected = verifyImages.includes(opt.id);
            return (
              <button key={opt.id} onClick={() => handleVerifySelect(opt.id)} style={{
                aspectRatio: '1', borderRadius: 18, cursor: 'pointer',
                background: selected ? `${T.accent}15` : T.card,
                border: `2px solid ${selected ? T.accent : T.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                transition: 'all 0.2s ease',
                transform: selected ? 'scale(0.95)' : 'scale(1)',
                boxShadow: selected ? `0 0 16px ${T.accent}20` : 'none',
              }}>
                <span style={{ fontSize: 32, transition: 'transform 0.2s', transform: selected ? 'scale(1.15)' : 'scale(1)' }}>{opt.emoji}</span>
                <span style={{ fontSize: 10, color: selected ? T.accent : T.dim, fontFamily: "'Outfit', sans-serif", fontWeight: selected ? 700 : 400 }}>{opt.label}</span>
                {selected && (
                  <div style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: '#fff', fontWeight: 700,
                  }}>✓</div>
                )}
              </button>
            );
          })}
        </div>
      </AnimatedText>

      <AnimatedText delay={0.4} style={{ width: '100%', maxWidth: 320 }}>
        <Button onClick={handleVerifySubmit} disabled={verifyImages.length < 2} variant="primary">
          I'm human — let me in ({verifyImages.length} selected)
        </Button>
      </AnimatedText>

      <AnimatedText delay={0.5}>
        <div style={{
          marginTop: 20, padding: '12px 18px', borderRadius: 14,
          background: T.card, border: `1px solid ${T.border}`, maxWidth: 320, width: '100%',
        }}>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}>
            <span style={{ fontWeight: 700, color: T.accent }}>Why this matters:</span> Every OURS account is human-verified. No bots. No fake followers. No inflated metrics. Advertisers pay for real humans — and you get paid more because of it.
          </div>
        </div>
      </AnimatedText>
    </div>
  );

  // ═══ VERIFIED / SUCCESS ═══
  const VerifiedView = () => {
    const [confetti, setConfetti] = useState([]);
    useEffect(() => {
      const c = Array.from({ length: 30 }).map((_, i) => ({
        id: i, x: Math.random() * 100, delay: Math.random() * 2,
        color: [T.primary, T.accent, T.gold, T.purple, '#fff'][Math.floor(Math.random() * 5)],
        size: Math.random() * 6 + 3, speed: Math.random() * 2 + 2,
      }));
      setConfetti(c);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '40px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Confetti */}
        {confetti.map(c => (
          <div key={c.id} style={{
            position: 'absolute', top: -10, left: `${c.x}%`,
            width: c.size, height: c.size, borderRadius: c.size > 5 ? 2 : '50%',
            background: c.color,
            animation: `fall ${c.speed}s ease-in ${c.delay}s forwards`,
            opacity: 0.8,
          }} />
        ))}

        <AnimatedText delay={0.1}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%', margin: '0 auto 16px',
            background: `linear-gradient(135deg, ${T.accent}25, ${T.primary}25)`,
            border: `2px solid ${T.accent}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, boxShadow: `0 0 40px ${T.accent}20`,
          }}>✅</div>
        </AnimatedText>

        <AnimatedText delay={0.3}>
          <h1 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px' }}>
            You're verified!
          </h1>
        </AnimatedText>

        <AnimatedText delay={0.4}>
          <p style={{ fontSize: 14, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 24px', lineHeight: 1.5 }}>
            Welcome to OURS. You've been confirmed as a real human.<br/>
            That already makes you more valuable than most social media accounts.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.5}>
          <div style={{
            display: 'flex', gap: 12, marginBottom: 28, padding: '16px 24px',
            background: T.card, borderRadius: 18, border: `1px solid ${T.border}`,
          }}>
            {[
              { icon: '🛡️', label: 'Trust Score', value: '80', color: T.accent },
              { icon: '🏅', label: 'Level', value: '1', color: T.primary },
              { icon: '👤', label: 'Status', value: 'Human', color: T.gold },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{s.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedText>

        <AnimatedText delay={0.6} style={{ width: '100%', maxWidth: 340 }}>
          <Button variant="gold">
            🎁 Claim Your 10 HOURS → Onboarding
          </Button>
          <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 12, lineHeight: 1.6 }}>
            *HOURS welcome bonus is a one-time reward. Estimated value depends on platform revenue. This is not cryptocurrency or a security. Trust score starts at 80 and adjusts based on authentic engagement.
          </p>
        </AnimatedText>
      </div>
    );
  };

  // ═══ RENDER ═══
  const views = {
    landing: LandingView,
    signup: SignupView,
    login: LoginView,
    magiclink: MagicLinkView,
    verify: VerifyView,
    verified: VerifiedView,
  };

  const CurrentView = views[mode] || LandingView;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh', background: T.bg, color: T.text,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes drift {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-20px) rotate(360deg); opacity: 0; }
        }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        input::placeholder { color: rgba(138,157,195,0.4); }
        button:hover:not(:disabled) { filter: brightness(1.08); }
      `}</style>

      {/* Background gradient orbs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute',
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.primary}12, transparent 70%)`,
          left: `${mousePos.x * 0.3}%`, top: `${mousePos.y * 0.3}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 2s ease, top 2s ease',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          width: 300, height: 300, borderRadius: '50%',
          background: `radial-gradient(circle, ${T.accent}08, transparent 70%)`,
          right: `${(100 - mousePos.x) * 0.2}%`, bottom: `${(100 - mousePos.y) * 0.2}%`,
          transform: 'translate(50%, 50%)',
          transition: 'right 3s ease, bottom 3s ease',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'fixed', left: `${p.x}%`, bottom: -10,
          width: p.size, height: p.size, borderRadius: '50%',
          background: T.primary, opacity: p.opacity,
          animation: `drift ${p.speed}s linear ${p.delay}s infinite`,
          pointerEvents: 'none', zIndex: 0,
        }} />
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: 440, margin: '0 auto', minHeight: '100vh',
      }}>
        <CurrentView />
      </div>
    </div>
  );
};

export default OursAuth;
