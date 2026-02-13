import React, { useState } from 'react';

const OursWallet = () => {
  const [tab, setTab] = useState('overview');
  const [showSend, setShowSend] = useState(false);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };

  const balance = { total: 142.5, usd: 28.50, earned7d: 22.4, spent7d: 3.2, staked: 15.0 };

  const transactions = [
    { id: 1, type: 'earn', desc: 'Article "AI Agents" — 890 reads', amount: 6.4, time: '2h ago', icon: '📰', color: T.accent },
    { id: 2, type: 'earn', desc: 'Video watch time — 45 min', amount: 4.2, time: '4h ago', icon: '🎬', color: T.accent },
    { id: 3, type: 'spend', desc: 'Tipped @mayac on video', amount: -2.0, time: '5h ago', icon: '💎', color: T.red },
    { id: 4, type: 'earn', desc: 'Community engagement — 12 posts', amount: 2.4, time: '8h ago', icon: '🏛️', color: T.accent },
    { id: 5, type: 'earn', desc: 'Governance vote — Proposal #24', amount: 0.5, time: '1d ago', icon: '🗳️', color: T.accent },
    { id: 6, type: 'spend', desc: 'Proposal stake #25', amount: -1.0, time: '1d ago', icon: '🔒', color: T.orange },
    { id: 7, type: 'earn', desc: 'Quest completion — 5 quests', amount: 5.0, time: '2d ago', icon: '📋', color: T.accent },
    { id: 8, type: 'earn', desc: 'Welcome bonus', amount: 10.0, time: '5d ago', icon: '🎁', color: T.gold },
  ];

  const earningBreakdown = [
    { zone: 'Read', icon: '📰', amount: 45.2, pct: 32, color: T.primary },
    { zone: 'Watch', icon: '🎬', amount: 28.1, pct: 20, color: T.red },
    { zone: 'Community', icon: '🏛️', amount: 24.8, pct: 17, color: T.purple },
    { zone: 'Posts', icon: '📝', amount: 18.3, pct: 13, color: T.cyan },
    { zone: 'Quests', icon: '📋', amount: 12.0, pct: 8, color: T.gold },
    { zone: 'Govern', icon: '🗳️', amount: 4.1, pct: 3, color: T.orange },
    { zone: 'Other', icon: '✨', amount: 10.0, pct: 7, color: T.dim },
  ];

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); }`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 20 }}>💰</span><span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: T.gold }}>HOURS Wallet</span></div>
          <button style={{ padding: '6px 12px', borderRadius: 8, background: T.card, border: `1px solid ${T.border}`, color: T.sub, fontSize: 11, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>⚙️</button>
        </div>

        {/* Balance hero */}
        <div style={{ padding: '20px', background: `linear-gradient(135deg, ${T.gold}08, ${T.orange}04)` }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>Total Balance</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: T.gold, fontFamily: "'DM Mono', monospace", textShadow: `0 0 30px ${T.gold}25` }}>{balance.total}</div>
            <div style={{ fontSize: 14, color: T.sub, fontFamily: "'DM Mono', monospace" }}>≈ ${balance.usd.toFixed(2)} USD*</div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, padding: '10px', borderRadius: 14, background: `${T.accent}10`, border: `1px solid ${T.accent}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>Earned 7d</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.accent, fontFamily: "'DM Mono', monospace" }}>+{balance.earned7d}</div>
            </div>
            <div style={{ flex: 1, padding: '10px', borderRadius: 14, background: `${T.red}10`, border: `1px solid ${T.red}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>Spent 7d</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.red, fontFamily: "'DM Mono', monospace" }}>-{balance.spent7d}</div>
            </div>
            <div style={{ flex: 1, padding: '10px', borderRadius: 14, background: `${T.purple}10`, border: `1px solid ${T.purple}15`, textAlign: 'center' }}>
              <div style={{ fontSize: 8, color: T.dim, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>Staked</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.purple, fontFamily: "'DM Mono', monospace" }}>{balance.staked}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setShowSend(!showSend)} style={{ flex: 1, padding: '14px', borderRadius: 14, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>💸 Send</button>
            <button style={{ flex: 1, padding: '14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}`, color: T.sub, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>📥 Receive</button>
            <button style={{ flex: 1, padding: '14px', borderRadius: 14, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, color: T.gold, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>🏦 Redeem</button>
          </div>
        </div>

        {/* Send modal */}
        {showSend && (
          <div style={{ padding: '16px 20px', background: `${T.primary}06`, borderBottom: `1px solid ${T.primary}15` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.primary, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>Send HOURS</div>
            <input placeholder="@username or wallet address" style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 8 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <input placeholder="Amount" type="number" style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'DM Mono', monospace", outline: 'none' }} />
              <button style={{ padding: '12px 20px', borderRadius: 12, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: 'none', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Send →</button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '12px 20px', borderBottom: `1px solid ${T.border}` }}>
          {[{ id: 'overview', l: '📊 Overview' }, { id: 'history', l: '📜 History' }, { id: 'breakdown', l: '📈 Breakdown' }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 14px', borderRadius: 10, cursor: 'pointer', background: tab === t.id ? `${T.gold}15` : 'transparent', border: `1px solid ${tab === t.id ? T.gold + '30' : 'transparent'}`, color: tab === t.id ? T.gold : T.dim, fontSize: 12, fontWeight: tab === t.id ? 700 : 400, fontFamily: "'Outfit', sans-serif" }}>{t.l}</button>
          ))}
        </div>

        <div style={{ padding: '16px 20px' }}>
          {/* History */}
          {(tab === 'overview' || tab === 'history') && (
            <div>
              {tab === 'overview' && <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>Recent Activity</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(tab === 'overview' ? transactions.slice(0, 5) : transactions).map(tx => (
                  <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${tx.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{tx.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: "'Outfit', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.desc}</div>
                      <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{tx.time}</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: tx.amount > 0 ? T.accent : T.red, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Breakdown */}
          {tab === 'breakdown' && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 16 }}>Earning Sources</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {earningBreakdown.map((e, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{e.icon}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{e.zone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: e.color, fontFamily: "'DM Mono', monospace" }}>{e.amount}</span>
                        <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{e.pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: T.card }}>
                      <div style={{ height: '100%', borderRadius: 3, width: `${e.pct}%`, background: e.color, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Redeem options */}
              <div style={{ marginTop: 24, fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 12 }}>Redeem Options</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '🏦', title: 'Cash Out', desc: 'Convert to USD (min 100 HOURS)', status: '87.5 more needed' },
                  { icon: '🛍️', title: 'Shop Credits', desc: 'Use HOURS in the Shop zone', status: 'Available now' },
                  { icon: '💎', title: 'Tip Creators', desc: 'Send HOURS to support creators', status: 'Available now' },
                  { icon: '🗳️', title: 'Governance Stake', desc: 'Stake to submit proposals', status: 'Available now' },
                ].map((opt, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.gold}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{opt.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{opt.title}</div>
                      <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{opt.desc}</div>
                    </div>
                    <span style={{ fontSize: 9, color: i === 0 ? T.orange : T.accent, fontFamily: "'DM Mono', monospace", alignSelf: 'center' }}>{opt.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: '0 20px 20px' }}>
          <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6, opacity: 0.5 }}>*HOURS are platform credits. Estimated USD value depends on revenue. Min 100 HOURS to redeem. Not cryptocurrency or securities. Redemption subject to Terms of Service.</p>
        </div>
      </div>
    </div>
  );
};
export default OursWallet;
