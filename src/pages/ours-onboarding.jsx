import React, { useState, useEffect } from 'react';

const OursOnboarding = () => {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState([]);
  const [feedPref, setFeedPref] = useState(35);
  const [zoneIndex, setZoneIndex] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [hours, setHours] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981',
    gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6',
    orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const allInterests = [
    { id: 'video', emoji: '🎬', label: 'Video', color: T.red },
    { id: 'articles', emoji: '📰', label: 'Articles', color: T.primary },
    { id: 'communities', emoji: '🏛️', label: 'Communities', color: T.purple },
    { id: 'shopping', emoji: '🛍️', label: 'Shopping', color: T.pink },
    { id: 'music', emoji: '🎵', label: 'Music', color: T.cyan },
    { id: 'gaming', emoji: '🎮', label: 'Gaming', color: T.accent },
    { id: 'art', emoji: '🎨', label: 'Art & Design', color: T.orange },
    { id: 'tech', emoji: '💻', label: 'Technology', color: T.primary },
    { id: 'fitness', emoji: '💪', label: 'Fitness', color: T.red },
    { id: 'food', emoji: '🍕', label: 'Food', color: T.gold },
    { id: 'travel', emoji: '✈️', label: 'Travel', color: T.cyan },
    { id: 'finance', emoji: '📈', label: 'Finance', color: T.accent },
    { id: 'books', emoji: '📚', label: 'Books', color: T.purple },
    { id: 'photo', emoji: '📸', label: 'Photography', color: T.pink },
    { id: 'science', emoji: '🔬', label: 'Science', color: T.primary },
    { id: 'politics', emoji: '🗳️', label: 'Politics', color: T.orange },
  ];

  const zones = [
    { icon: '🎬', name: 'Watch', desc: 'Short clips, long films, live streams. Earn +0.3 HOURS per minute.', color: T.red, earning: '+0.3/min' },
    { icon: '📰', name: 'Read', desc: 'Articles, essays, journals from real creators. Earn +0.8 per article.', color: T.primary, earning: '+0.8/article' },
    { icon: '🏛️', name: 'Community', desc: 'Groups with shared treasuries. Participation builds collective wealth.', color: T.purple, earning: '+0.2/engage' },
    { icon: '🛍️', name: 'Shop', desc: 'Creators keep ~95% of every sale. Buy and sell without gouging.', color: T.pink, earning: '~95% to creator' },
    { icon: '✨', name: 'Explore', desc: 'Discover new creators and content. Save what you love, earn browsing.', color: T.gold, earning: '+0.1/save' },
    { icon: '🎙️', name: 'Listen', desc: 'Live rooms, podcasts, playlists. Audio that pays to listen.', color: T.cyan, earning: '+0.2/listen' },
    { icon: '🗳️', name: 'Govern', desc: 'Vote on platform decisions with HOURS. Real democratic power.', color: T.orange, earning: '+0.5/vote' },
    { icon: '🏆', name: 'Arena', desc: 'Challenges, competitions, leaderboards. Compete for multiplied rewards.', color: T.accent, earning: 'up to 50x' },
  ];

  const goNext = () => { if (step < 4) { setTransitioning(true); setTimeout(() => { setStep(step + 1); setTransitioning(false); }, 300); } };
  const goBack = () => { if (step > 1) { setTransitioning(true); setTimeout(() => { setStep(step - 1); setTransitioning(false); }, 300); } };
  const toggleInterest = (id) => setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleClaim = () => { setClaimed(true); let c = 0; const iv = setInterval(() => { c += 0.5; setHours(c); if (c >= 10) clearInterval(iv); }, 50); };

  const ProgressBar = () => (
    <div style={{ padding: '20px 32px 0', display: 'flex', gap: 6 }}>
      {[1,2,3,4].map(s => (
        <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: s <= step ? `linear-gradient(90deg, ${T.primary}, ${T.accent})` : `${T.dim}30`, transition: 'all 0.5s', boxShadow: s === step ? `0 0 8px ${T.primary}40` : 'none' }} />
      ))}
    </div>
  );

  const InterestsStep = () => (
    <div style={{ padding: '0 28px 32px' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase' }}>Step 1 of 4</span>
      <h1 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '4px 0 4px', lineHeight: 1.15 }}>What lights you up?</h1>
      <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 20px', lineHeight: 1.5 }}>Pick <strong style={{ color: T.accent }}>5 or more</strong> to personalize your Candy Store.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
        {allInterests.map(item => {
          const sel = interests.includes(item.id);
          return (
            <button key={item.id} onClick={() => toggleInterest(item.id)} style={{ padding: '14px 4px 10px', borderRadius: 16, cursor: 'pointer', background: sel ? `${item.color}15` : T.card, border: `2px solid ${sel ? item.color : T.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, transition: 'all 0.2s', transform: sel ? 'scale(0.95)' : 'scale(1)', position: 'relative' }}>
              <span style={{ fontSize: 24, transition: 'transform 0.2s', transform: sel ? 'scale(1.2)' : 'scale(1)' }}>{item.emoji}</span>
              <span style={{ fontSize: 9, color: sel ? item.color : T.dim, fontFamily: "'Outfit', sans-serif", fontWeight: sel ? 700 : 400 }}>{item.label}</span>
              {sel && <div style={{ position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: '#fff' }}>✓</div>}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: interests.length >= 5 ? T.accent : T.dim, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{interests.length}/5 minimum {interests.length >= 5 ? '✓' : ''}</span>
        <span style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", cursor: 'pointer' }} onClick={() => setInterests(allInterests.map(i => i.id))}>Select all</span>
      </div>
      <button onClick={goNext} disabled={interests.length < 5} style={{ width: '100%', padding: '15px 0', borderRadius: 14, background: interests.length >= 5 ? `linear-gradient(135deg, ${T.primary}, ${T.accent})` : T.card, border: 'none', color: '#fff', fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", cursor: interests.length >= 5 ? 'pointer' : 'not-allowed', opacity: interests.length >= 5 ? 1 : 0.4, transition: 'all 0.3s' }}>Continue →</button>
    </div>
  );

  const FeedStep = () => (
    <div style={{ padding: '0 28px 32px' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase' }}>Step 2 of 4</span>
      <h1 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '4px 0 4px' }}>Your feed, your rules.</h1>
      <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 28px', lineHeight: 1.5 }}>Unlike other platforms, you control the algorithm.</p>
      <div style={{ marginBottom: 28 }}>
        <div style={{ position: 'relative', height: 50, marginBottom: 12 }}>
          <div style={{ position: 'absolute', top: 20, left: 0, right: 0, height: 10, borderRadius: 5, background: T.card, border: `1px solid ${T.border}` }}>
            <div style={{ position: 'absolute', top: -1, left: -1, height: 10, borderRadius: 5, width: `${feedPref}%`, background: `linear-gradient(90deg, ${T.primary}, ${T.accent})`, transition: 'width 0.1s' }} />
          </div>
          <input type="range" min="0" max="100" value={feedPref} onChange={e => setFeedPref(parseInt(e.target.value))} style={{ position: 'absolute', top: 10, left: 0, right: 0, width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', height: 30 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: 12, fontWeight: 700, color: feedPref < 50 ? T.primary : T.dim, fontFamily: "'Outfit', sans-serif" }}>📅 Chronological</div><div style={{ fontSize: 10, color: T.dim }}>Newest first</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 12, fontWeight: 700, color: feedPref >= 50 ? T.accent : T.dim, fontFamily: "'Outfit', sans-serif" }}>✨ Discovery</div><div style={{ fontSize: 10, color: T.dim }}>Curated for you</div></div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {[{ icon: '🔍', title: 'Transparent', desc: 'We show why each piece of content appears.' }, { icon: '🎚️', title: 'Adjustable', desc: 'Change anytime. No algorithm overrides.' }, { icon: '🚫', title: 'No dark patterns', desc: 'No infinite scroll traps or engagement bait.' }].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div><div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{item.title}</div><div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>{item.desc}</div></div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={goBack} style={{ padding: '15px 20px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>←</button>
        <button onClick={goNext} style={{ flex: 1, padding: '15px 0', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Continue →</button>
      </div>
    </div>
  );

  const ZoneTourStep = () => (
    <div style={{ padding: '0 28px 32px' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: T.primary, fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase' }}>Step 3 of 4</span>
      <h1 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '4px 0 4px' }}>Your Candy Store awaits.</h1>
      <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 20px', lineHeight: 1.5 }}>8 zones. Every one pays you HOURS.</p>
      <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 16, background: `linear-gradient(135deg, ${zones[zoneIndex].color}15, ${T.card})`, border: `1px solid ${zones[zoneIndex].color}25`, padding: '28px 24px', textAlign: 'center', transition: 'all 0.4s', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 12, filter: `drop-shadow(0 0 20px ${zones[zoneIndex].color}40)` }}>{zones[zoneIndex].icon}</div>
        <h2 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 8px', color: zones[zoneIndex].color }}>{zones[zoneIndex].name}</h2>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5, maxWidth: 280 }}>{zones[zoneIndex].desc}</p>
        <div style={{ marginTop: 12, padding: '6px 14px', borderRadius: 10, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{zones[zoneIndex].earning}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        {zones.map((z, i) => <button key={i} onClick={() => setZoneIndex(i)} style={{ width: i === zoneIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === zoneIndex ? zones[i].color : `${T.dim}40`, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 24 }}>
        {zones.map((z, i) => (
          <button key={i} onClick={() => setZoneIndex(i)} style={{ padding: '10px 4px', borderRadius: 12, cursor: 'pointer', background: i === zoneIndex ? `${z.color}15` : T.card, border: `1px solid ${i === zoneIndex ? z.color : T.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, transition: 'all 0.2s' }}>
            <span style={{ fontSize: 18 }}>{z.icon}</span>
            <span style={{ fontSize: 8, color: i === zoneIndex ? z.color : T.dim, fontFamily: "'Outfit', sans-serif", fontWeight: i === zoneIndex ? 700 : 400 }}>{z.name}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={goBack} style={{ padding: '15px 20px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>←</button>
        <button onClick={goNext} style={{ flex: 1, padding: '15px 0', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Almost there →</button>
      </div>
    </div>
  );

  const RewardStep = () => (
    <div style={{ padding: '0 28px 32px', textAlign: 'center' }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase' }}>Step 4 of 4</span>
      <h1 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '4px 0 4px' }}>{claimed ? "You're all set!" : 'Claim your first HOURS'}</h1>
      <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 24px' }}>{claimed ? 'Your Candy Store is ready. Go explore.' : 'Your welcome bonus is waiting.'}</p>
      <div style={{ borderRadius: 24, padding: '32px 24px', marginBottom: 24, background: claimed ? `linear-gradient(135deg, ${T.accent}15, ${T.gold}10)` : `linear-gradient(135deg, ${T.gold}10, ${T.orange}08)`, border: `1px solid ${claimed ? T.accent : T.gold}20`, transition: 'all 0.5s' }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>{claimed ? '🎉' : '🎁'}</div>
        <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "'DM Mono', monospace", color: T.gold, textShadow: `0 0 30px ${T.gold}40`, marginBottom: 4 }}>{claimed ? hours.toFixed(1) : '10.0'}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.gold, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>HOURS</div>
        <div style={{ fontSize: 11, color: T.dim, fontFamily: "'DM Mono', monospace" }}>≈ ${claimed ? (hours * 2).toFixed(2) : '2.00'} estimated*</div>
        {!claimed && <button onClick={handleClaim} style={{ marginTop: 20, padding: '14px 40px', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, color: '#000', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", boxShadow: `0 4px 24px ${T.gold}40` }}>🎁 Claim 10 HOURS</button>}
      </div>
      {claimed && <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24, textAlign: 'left' }}>
          {[{ icon: '📝', text: 'Create your first post — earn 2x HOURS', color: T.primary }, { icon: '👋', text: 'Complete your profile — +5 HOURS bonus', color: T.accent }, { icon: '🏛️', text: 'Join a community — earn together', color: T.purple }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: item.color, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>{item.text}</span>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', padding: '16px 0', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>🍬 Enter the Candy Store →</button>
      </>}
      <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 20, lineHeight: 1.6, opacity: 0.5 }}>*HOURS estimated value is illustrative. Not cryptocurrency or securities. Actual value depends on platform revenue.</p>
    </div>
  );

  const steps = { 1: InterestsStep, 2: FeedStep, 3: ZoneTourStep, 4: RewardStep };
  const CurrentStep = steps[step];

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, position: 'relative', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, ${T.primary}, ${T.accent}); border: 3px solid #fff; cursor: pointer; box-shadow: 0 2px 10px ${T.primary}50; }
        button:hover:not(:disabled) { filter: brightness(1.08); }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${T.primary}10, transparent 70%)`, top: -100, right: -80, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: `radial-gradient(circle, ${T.accent}08, transparent 70%)`, bottom: -50, left: -60, filter: 'blur(80px)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 440, margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ProgressBar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 0', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateX(-20px)' : 'translateX(0)', transition: 'all 0.3s' }}>
          <CurrentStep />
        </div>
      </div>
    </div>
  );
};

export default OursOnboarding;
