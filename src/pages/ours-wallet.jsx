import React, { useState, useEffect } from 'react';

const OursWallet = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [sendAmount, setSendAmount] = useState('');

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const wallet = {
    balance: 2400.0, earned: 340.5, spent: 89.2, tipped: 45.0,
    tier: '🔥 Creator', tierColor: T.orange, nextTier: '⚡ Builder', nextThreshold: 5000,
    weeklyEarning: 89.3, monthlyEarning: 342.1,
    earningBreakdown: [
      { source: 'Content Views', amount: 142.5, pct: 42, icon: '👁️', color: T.primary },
      { source: 'Tips Received', amount: 89.2, pct: 26, icon: '🎁', color: T.gold },
      { source: 'Shop Sales', amount: 67.8, pct: 20, icon: '🛍️', color: T.accent },
      { source: 'Challenges Won', amount: 24.0, pct: 7, icon: '🏆', color: T.orange },
      { source: 'Daily Quests', amount: 18.6, pct: 5, icon: '📋', color: T.purple },
    ],
  };

  const transactions = [
    { id: 't1', type: 'earned', description: 'Watch zone: 3 videos viewed', amount: '+2.4', time: '12m ago', icon: '🎬' },
    { id: 't2', type: 'earned', description: 'Tip from @sarahbuilds', amount: '+5.0', time: '1h ago', icon: '🎁' },
    { id: 't3', type: 'spent', description: 'Tipped @devnotes', amount: '-3.0', time: '2h ago', icon: '💸' },
    { id: 't4', type: 'earned', description: 'Daily quest: Log in', amount: '+0.25', time: '3h ago', icon: '📋' },
    { id: 't5', type: 'earned', description: 'Article: "Why OURS" — 234 reads', amount: '+12.4', time: '5h ago', icon: '📰' },
    { id: 't6', type: 'spent', description: 'Purchased: Design Templates Pack', amount: '-15.0', time: '1d ago', icon: '🛍️' },
    { id: 't7', type: 'earned', description: 'Content marathon challenge', amount: '+50.0', time: '2d ago', icon: '🏆' },
    { id: 't8', type: 'earned', description: 'Daily quest: Watch 5 min video', amount: '+1.0', time: '2d ago', icon: '📋' },
    { id: 't9', type: 'earned', description: 'Welcome bonus', amount: '+10.0', time: '1w ago', icon: '🎉' },
    { id: 't10', type: 'spent', description: 'Created community: Builders Club', amount: '-10.0', time: '1w ago', icon: '🏛️' },
  ];

  const tiers = [
    { name: '👁️ Observer', min: 0, max: 100, color: T.dim },
    { name: '📝 Contributor', min: 100, max: 500, color: T.sub },
    { name: '🔥 Creator', min: 500, max: 5000, color: T.orange },
    { name: '⚡ Builder', min: 5000, max: 25000, color: T.primary },
    { name: '🏗️ Architect', min: 25000, max: 100000, color: T.purple },
  ];

  const progressPct = ((wallet.balance - 500) / (5000 - 500)) * 100;

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes glow { 0%,100%{box-shadow:0 0 10px ${T.gold}15} 50%{box-shadow:0 0 30px ${T.gold}30} }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>

      {/* Header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.gold}, ${T.orange})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Wallet</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: wallet.tierColor, fontFamily: f('mono'), background: `${wallet.tierColor}15`, padding: '3px 8px', borderRadius: 6 }}>{wallet.tier}</span>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', gap: 4 }}>
          {[{ id: 'overview', label: '💰 Overview' }, { id: 'history', label: '📜 History' }, { id: 'earnings', label: '📊 Earnings' }, { id: 'tiers', label: '🏅 Tiers' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 10px', border: 'none', background: 'none', whiteSpace: 'nowrap', fontFamily: f(), fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.gold : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px', paddingBottom: 80 }}>
        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Balance card */}
            <div style={{ padding: 20, borderRadius: 20, background: `linear-gradient(135deg, ${T.gold}12, ${T.orange}08)`, border: `1px solid ${T.gold}20`, marginBottom: 14, textAlign: 'center', animation: 'glow 4s ease infinite, slideUp 0.3s ease both' }}>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), letterSpacing: 2, marginBottom: 4 }}>TOTAL BALANCE*</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: T.gold, fontFamily: f('mono'), lineHeight: 1 }}>⏣ {wallet.balance.toFixed(1)}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f(), marginTop: 6 }}>
                <span style={{ color: T.accent }}>+{wallet.weeklyEarning}</span> this week
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              <button onClick={() => setShowSend(true)} style={{ flex: 1, padding: 14, borderRadius: 14, border: 'none', background: T.primary, textAlign: 'center' }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>↗</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f() }}>Send</div>
              </button>
              <button onClick={() => setShowReceive(true)} style={{ flex: 1, padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>↙</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>Receive</div>
              </button>
              <button style={{ flex: 1, padding: 14, borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>📊</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>Stats</div>
              </button>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {[{ l: 'Earned', v: wallet.earned, c: T.accent, prefix: '+' }, { l: 'Spent', v: wallet.spent, c: T.red, prefix: '-' }, { l: 'Tipped', v: wallet.tipped, c: T.gold, prefix: '' }].map(s => (
                <div key={s.l} style={{ flex: 1, padding: 10, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: s.c, fontFamily: f('mono') }}>{s.prefix}{s.v}</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* Tier progress */}
            <div style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: wallet.tierColor, fontFamily: f() }}>{wallet.tier}</span>
                <span style={{ fontSize: 11, color: T.dim, fontFamily: f('mono') }}>{wallet.nextTier}: {fmt(wallet.nextThreshold)} HRS</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: T.card, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(progressPct, 100)}%`, background: `linear-gradient(90deg, ${wallet.tierColor}, ${T.gold})`, borderRadius: 4, transition: 'width 1s ease' }} />
              </div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 4 }}>{(wallet.nextThreshold - wallet.balance).toFixed(0)} HRS to next tier</div>
            </div>

            {/* Recent transactions preview */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1 }}>RECENT</span>
                <button onClick={() => setActiveTab('history')} style={{ background: 'none', border: 'none', fontSize: 10, color: T.primary, fontFamily: f() }}>See all →</button>
              </div>
              {transactions.slice(0, 4).map((tx, i) => (
                <div key={tx.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.type === 'earned' ? `${T.accent}10` : `${T.red}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{tx.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{tx.description}</div>
                    <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{tx.time}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: tx.type === 'earned' ? T.accent : T.red, fontFamily: f('mono') }}>{tx.amount}*</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORY */}
        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {['All', 'Earned', 'Spent'].map(fil => (
                <button key={fil} style={{ padding: '6px 14px', borderRadius: 8, border: `1px solid ${fil === 'All' ? T.gold : T.border}`, background: fil === 'All' ? `${T.gold}10` : T.surface, fontSize: 10, fontWeight: 600, color: fil === 'All' ? T.gold : T.sub, fontFamily: f() }}>{fil}</button>
              ))}
            </div>
            {transactions.map((tx, i) => (
              <div key={tx.id} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.03}s both` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: tx.type === 'earned' ? `${T.accent}10` : `${T.red}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{tx.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f() }}>{tx.description}</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{tx.time}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: tx.type === 'earned' ? T.accent : T.red, fontFamily: f('mono') }}>{tx.amount}*</span>
              </div>
            ))}
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === 'earnings' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              <div style={{ flex: 1, padding: 12, borderRadius: 14, background: `${T.accent}08`, border: `1px solid ${T.accent}20`, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: T.accent, fontFamily: f('mono') }}>+{wallet.weeklyEarning}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>This Week</div>
              </div>
              <div style={{ flex: 1, padding: 12, borderRadius: 14, background: `${T.primary}08`, border: `1px solid ${T.primary}20`, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: T.primary, fontFamily: f('mono') }}>+{wallet.monthlyEarning}</div>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: f() }}>This Month</div>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>EARNINGS BY SOURCE</span>
            {wallet.earningBreakdown.map((src, i) => (
              <div key={src.source} style={{ marginBottom: 10, animation: `slideUp 0.3s ease ${i * 0.05}s both` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.text, fontFamily: f() }}>{src.icon} {src.source}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: src.color, fontFamily: f('mono') }}>+{src.amount} HRS ({src.pct}%)*</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: T.card, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${src.pct}%`, background: src.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
            <div style={{ padding: 12, borderRadius: 12, background: `${T.gold}06`, border: `1px solid ${T.gold}15`, marginTop: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>REVENUE SHARE</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: T.gold, fontFamily: f('mono') }}>70%</div>
              <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>Creators get 70% of platform revenue*</div>
            </div>
          </div>
        )}

        {/* TIERS */}
        {activeTab === 'tiers' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 14, padding: 14, borderRadius: 16, background: `${wallet.tierColor}08`, border: `1px solid ${wallet.tierColor}20` }}>
              <div style={{ fontSize: 28 }}>🔥</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: wallet.tierColor, fontFamily: f() }}>Creator</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>Your current tier</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: f('mono'), marginTop: 4 }}>⏣ {wallet.balance.toFixed(1)} / {fmt(wallet.nextThreshold)}*</div>
            </div>
            {tiers.map((tier, i) => {
              const isCurrent = tier.name.includes('Creator');
              const isPast = wallet.balance >= tier.max;
              return (
                <div key={tier.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 12, borderRadius: 12, background: isCurrent ? `${tier.color}08` : T.surface, border: `1px solid ${isCurrent ? `${tier.color}25` : T.border}`, marginBottom: 6, opacity: isPast && !isCurrent ? 0.5 : 1, animation: `slideUp 0.3s ease ${i * 0.05}s both` }}>
                  <div style={{ width: 36, textAlign: 'center' }}>
                    <span style={{ fontSize: 18 }}>{tier.name.split(' ')[0]}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isCurrent ? tier.color : T.text, fontFamily: f() }}>{tier.name.split(' ').slice(1).join(' ')}</div>
                    <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{fmt(tier.min)} – {fmt(tier.max)} HOURS</div>
                  </div>
                  {isCurrent && <span style={{ fontSize: 9, fontWeight: 700, color: tier.color, fontFamily: f('mono'), background: `${tier.color}15`, padding: '2px 8px', borderRadius: 4 }}>CURRENT</span>}
                  {isPast && !isCurrent && <span style={{ fontSize: 9, color: T.accent, fontFamily: f('mono') }}>✓</span>}
                </div>
              );
            })}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal platform credits, not currency. Values illustrative.</div>
      </div>

      {/* Send sheet */}
      {showSend && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setShowSend(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 12 }}>Send HOURS*</div>
            <input placeholder="@username" style={{ width: '100%', padding: 12, borderRadius: 12, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 13, fontFamily: f(), outline: 'none', marginBottom: 8 }} />
            <input value={sendAmount} onChange={e => setSendAmount(e.target.value)} placeholder="Amount" type="number" style={{ width: '100%', padding: 12, borderRadius: 12, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 13, fontFamily: f('mono'), outline: 'none', marginBottom: 8 }} />
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {[5, 10, 25, 50, 100].map(a => (
                <button key={a} onClick={() => setSendAmount(String(a))} style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: `1px solid ${T.gold}25`, background: `${T.gold}06`, fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>{a}</button>
              ))}
            </div>
            <button onClick={() => setShowSend(false)} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.primary, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Send ⏣ {sendAmount || '0'} HOURS</button>
            <div style={{ textAlign: 'center', marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
          </div>
        </div>
      )}

      {/* Receive sheet */}
      {showReceive && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={() => setShowReceive(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, textAlign: 'center', animation: 'slideUp 0.3s ease' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>Receive HOURS*</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), marginBottom: 12 }}>Share your handle to receive tips</div>
            <div style={{ padding: 20, borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, marginBottom: 12 }}>
              <div style={{ width: 80, height: 80, borderRadius: 20, background: `${T.gold}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, margin: '0 auto 8px' }}>🚀</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>@rogergrubb</div>
            </div>
            <button onClick={() => setShowReceive(false)} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.gold, fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f() }}>Copy Handle</button>
            <div style={{ marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OursWallet;
