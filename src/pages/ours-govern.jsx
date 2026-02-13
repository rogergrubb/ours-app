import React, { useState, useEffect } from 'react';

const OursGovern = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('active');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [voted, setVoted] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a', govern: '#0891b2' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const myHours = 2400;
  const myTier = '🔥 Creator';

  const proposals = [
    { id: 'prop1', title: 'Add Dark Mode Toggle for All Zones', type: 'feature', status: 'active', author: '@sarahbuilds', authorAvatar: '👩‍💻', created: '3d ago', deadline: '4 days left', description: 'Implement a global dark/light mode toggle accessible from settings and the top navigation bar. Currently OURS is dark-only. Many users have requested a light mode option for daytime use.', votesFor: 8900, votesAgainst: 2100, totalVoters: 342, hoursStaked: 45000, quorum: 50000,
      arguments: { for: ['Better accessibility for users with visual preferences', 'Industry standard — every major app has it', 'Increases daytime usage and engagement'], against: ['Dark mode IS the brand identity', 'Engineering effort better spent on new features', 'Splits the design system complexity'] } },
    { id: 'prop2', title: 'Increase Creator Revenue Share to 75%', type: 'economic', status: 'active', author: '@growthlabs', authorAvatar: '📈', created: '5d ago', deadline: '2 days left', description: 'Raise the creator pool from 70% to 75% of platform revenue, reducing operations allocation from 20% to 15%. This makes OURS the highest-paying creator platform by revenue share percentage.', votesFor: 12400, votesAgainst: 3200, totalVoters: 567, hoursStaked: 78000, quorum: 50000,
      arguments: { for: ['Attracts top creators from competing platforms', 'Demonstrates commitment to creator-first ethos', '5% shift is meaningful to individual creators'], against: ['Operations needs funding for growth', '15% ops budget may be unsustainable', 'Should wait until revenue is proven'] } },
    { id: 'prop3', title: 'Elect Q2 Community Moderators', type: 'election', status: 'active', author: '@oursteam', authorAvatar: '🎯', created: '1w ago', deadline: '1 week left', description: 'Elect 5 community moderators for Q2 2026. Moderators earn 1.0 HRS/hour and have the ability to flag content, mute users temporarily, and escalate reports.', votesFor: 3892, votesAgainst: 0, totalVoters: 890, hoursStaked: 34000, quorum: 25000,
      candidates: [
        { name: '@trustguard', avatar: '🛡️', hours: 12400, votes: 1200, bio: 'Active in Community zone since day 1. 200+ helpful reports filed.' },
        { name: '@fairplay', avatar: '⚖️', hours: 8900, votes: 980, bio: 'Former Reddit mod. Believes in transparency and due process.' },
        { name: '@peacekeeper', avatar: '🕊️', hours: 5600, votes: 890, bio: 'Conflict resolution specialist. Zero drama tolerance.' },
        { name: '@watchdog', avatar: '👁️', hours: 15200, votes: 540, bio: 'Builder tier. Passionate about keeping OURS spam-free.' },
        { name: '@commvoice', avatar: '📢', hours: 3400, votes: 282, bio: 'New but active. Represents the newest creator perspective.' },
      ] },
    { id: 'prop4', title: 'Launch OURS Mobile App (iOS + Android)', type: 'feature', status: 'passed', author: '@devnotes', authorAvatar: '💻', created: '2w ago', deadline: 'Passed', description: 'Build and launch native mobile apps for iOS and Android with full feature parity to the web app.', votesFor: 23400, votesAgainst: 1200, totalVoters: 1200, hoursStaked: 120000, quorum: 50000 },
    { id: 'prop5', title: 'Ban AI-Generated Content Without Disclosure', type: 'policy', status: 'passed', author: '@marcusj', authorAvatar: '🧠', created: '3w ago', deadline: 'Passed', description: 'Require all AI-generated or AI-assisted content to be clearly labeled. Unlabeled AI content will be flagged and may result in HOURS penalties.', votesFor: 18900, votesAgainst: 4500, totalVoters: 980, hoursStaked: 95000, quorum: 50000 },
    { id: 'prop6', title: 'Remove Downvote Button from Feed', type: 'feature', status: 'rejected', author: '@positivevibes', authorAvatar: '✨', created: '4w ago', deadline: 'Rejected', description: 'Remove the ability to downvote content. Only likes, tips, and saves should remain.', votesFor: 3400, votesAgainst: 15600, totalVoters: 780, hoursStaked: 67000, quorum: 50000 },
  ];

  const constitution = [
    { article: 1, title: 'Creator Ownership', text: 'Creators own their content. OURS is a platform, not a publisher. Content can be exported at any time.' },
    { article: 2, title: 'Revenue Transparency', text: 'All platform revenue and distribution is published quarterly. No hidden fees, no shadow algorithms.' },
    { article: 3, title: 'Democratic Governance', text: 'Major platform decisions require community vote. HOURS-weighted voting ensures engaged members have proportional influence.' },
    { article: 4, title: 'Human-First', text: 'Real humans are prioritized. Bots, spam accounts, and engagement farming are actively combated.' },
    { article: 5, title: 'No Algorithmic Suppression', text: 'OURS will never suppress content to force paid promotion. Organic reach is a right, not a privilege.' },
  ];

  const stats = { totalProposals: 24, passed: 15, rejected: 6, active: 3, totalVoters: 4200, totalHoursStaked: '890K' };
  const filtered = activeTab === 'active' ? proposals.filter(p => p.status === 'active') : activeTab === 'passed' ? proposals.filter(p => p.status === 'passed') : activeTab === 'rejected' ? proposals.filter(p => p.status === 'rejected') : proposals;

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  const ProposalCard = ({ proposal, index = 0 }) => {
    const forPct = Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100);
    const quorumPct = Math.min(Math.round((proposal.hoursStaked / proposal.quorum) * 100), 100);
    const typeColors = { feature: T.primary, economic: T.gold, policy: T.purple, election: T.govern };
    return (
      <div onClick={() => { setSelectedProposal(proposal); setView('proposal'); }} style={{ padding: 14, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${index * 0.04}s both` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: typeColors[proposal.type] || T.primary, background: `${typeColors[proposal.type] || T.primary}15`, padding: '2px 8px', borderRadius: 4, fontFamily: f('mono'), textTransform: 'uppercase' }}>{proposal.type}</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: proposal.status === 'active' ? T.accent : proposal.status === 'passed' ? T.primary : T.red, fontFamily: f('mono') }}>{proposal.status === 'active' ? `⏱️ ${proposal.deadline}` : proposal.status === 'passed' ? '✅ Passed' : '❌ Rejected'}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3, marginBottom: 6 }}>{proposal.title}</div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>{proposal.authorAvatar}</span>
          <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{proposal.author} · {proposal.created}</span>
        </div>
        {/* Vote bar */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.accent, fontFamily: f('mono') }}>For {forPct}%</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: T.red, fontFamily: f('mono') }}>Against {100 - forPct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: `${T.red}30`, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${forPct}%`, background: T.accent, borderRadius: 3 }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 9, color: T.dim, fontFamily: f('mono') }}>
          <span>👥 {proposal.totalVoters} voters</span>
          <span>⏣ {fmt(proposal.hoursStaked)} staked*</span>
          <span>Quorum: {quorumPct}%</span>
        </div>
      </div>
    );
  };

  // ═══ HOME ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.govern}, ${T.primary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Govern</span>
          <button onClick={() => setShowCreate(true)} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: T.govern, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f() }}>+ Proposal</button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', gap: 4 }}>
          {[{ id: 'active', label: '🗳️ Active' }, { id: 'passed', label: '✅ Passed' }, { id: 'rejected', label: '❌ Rejected' }, { id: 'constitution', label: '📜 Constitution' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 10px', border: 'none', background: 'none', whiteSpace: 'nowrap', fontFamily: f(), fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.govern : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: 80 }}>
        {/* Your voting power */}
        <div style={{ padding: 12, borderRadius: 14, background: `${T.govern}08`, border: `1px solid ${T.govern}20`, marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'slideUp 0.3s ease both' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.govern, fontFamily: f() }}>Your Voting Power*</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{myTier} · Based on HOURS balance</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: T.gold, fontFamily: f('mono') }}>⏣ {fmt(myHours)}</div>
            <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>weight</div>
          </div>
        </div>
        {/* Stats */}
        {activeTab !== 'constitution' && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[{ l: 'Total', v: stats.totalProposals, c: T.text }, { l: 'Passed', v: stats.passed, c: T.accent }, { l: 'Active', v: stats.active, c: T.govern }, { l: 'Voters', v: fmt(stats.totalVoters), c: T.primary }].map(s => (
              <div key={s.l} style={{ flex: 1, padding: 8, borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.c, fontFamily: f('mono') }}>{s.v}</div>
                <div style={{ fontSize: 8, color: T.dim, fontFamily: f() }}>{s.l}</div>
              </div>
            ))}
          </div>
        )}
        {/* Proposals */}
        {activeTab !== 'constitution' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((p, i) => <ProposalCard key={p.id} proposal={p} index={i} />)}
          </div>
        )}
        {/* Constitution */}
        {activeTab === 'constitution' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 16, animation: 'slideUp 0.3s ease both' }}>
              <div style={{ fontSize: 36, marginBottom: 6 }}>📜</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f('display') }}>The OURS Constitution</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>Ratified by community vote · Living document</div>
            </div>
            {constitution.map((art, i) => (
              <div key={art.article} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 8, animation: `slideUp 0.3s ease ${i * 0.06}s both` }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: T.govern, fontFamily: f('mono'), letterSpacing: 1, marginBottom: 4 }}>ARTICLE {art.article}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>{art.title}</div>
                <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5 }}>{art.text}</p>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*Amendments require 2/3 supermajority community vote.</div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ PROPOSAL DETAIL ═══
  const ProposalView = () => {
    if (!selectedProposal) return null;
    const p = selectedProposal;
    const forPct = Math.round((p.votesFor / (p.votesFor + p.votesAgainst)) * 100);
    const quorumPct = Math.min(Math.round((p.hoursStaked / p.quorum) * 100), 100);
    const myVote = voted[p.id];
    const isElection = p.type === 'election';
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedProposal(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>Proposal Detail</span>
        </div>
        <div style={{ padding: '16px', paddingBottom: 80 }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2, marginBottom: 8 }}>{p.title}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 20 }}>{p.authorAvatar}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{p.author}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>Posted {p.created}</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: f(), lineHeight: 1.6, marginBottom: 16 }}>{p.description}</p>

          {/* Vote results */}
          <div style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.accent, fontFamily: f() }}>✅ For: {fmt(p.votesFor)} HRS ({forPct}%)</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.red, fontFamily: f() }}>❌ Against: {fmt(p.votesAgainst)} HRS ({100-forPct}%)</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: `${T.red}30`, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${forPct}%`, background: `linear-gradient(90deg, ${T.accent}, ${T.primary})`, borderRadius: 5 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>👥 {p.totalVoters} voters</span>
              <span style={{ fontSize: 9, color: quorumPct >= 100 ? T.accent : T.orange, fontFamily: f('mono') }}>Quorum: {quorumPct}% {quorumPct >= 100 ? '✓' : ''}</span>
            </div>
          </div>

          {/* Election candidates */}
          {isElection && p.candidates && (
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>🗳️ CANDIDATES</span>
              {p.candidates.map((c, i) => (
                <div key={c.name} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 12, borderRadius: 12, background: T.surface, border: `1px solid ${voted[`${p.id}-${c.name}`] ? `${T.govern}40` : T.border}`, marginBottom: 6, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{c.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.3 }}>{c.bio}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                      <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono') }}>⏣ {fmt(c.hours)} HRS</span>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{fmt(c.votes)} votes</span>
                    </div>
                  </div>
                  <button onClick={() => setVoted(v => ({ ...v, [`${p.id}-${c.name}`]: true }))} style={{ padding: '6px 12px', borderRadius: 8, border: 'none', background: voted[`${p.id}-${c.name}`] ? `${T.govern}20` : T.govern, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>{voted[`${p.id}-${c.name}`] ? '✓' : 'Vote'}</button>
                </div>
              ))}
            </div>
          )}

          {/* Arguments */}
          {p.arguments && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ padding: 12, borderRadius: 12, background: `${T.accent}08`, border: `1px solid ${T.accent}20`, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.accent, fontFamily: f(), display: 'block', marginBottom: 6 }}>✅ Arguments For</span>
                {p.arguments.for.map((arg, i) => <div key={i} style={{ fontSize: 11, color: T.sub, fontFamily: f(), padding: '3px 0', lineHeight: 1.4 }}>• {arg}</div>)}
              </div>
              <div style={{ padding: 12, borderRadius: 12, background: `${T.red}08`, border: `1px solid ${T.red}20` }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.red, fontFamily: f(), display: 'block', marginBottom: 6 }}>❌ Arguments Against</span>
                {p.arguments.against.map((arg, i) => <div key={i} style={{ fontSize: 11, color: T.sub, fontFamily: f(), padding: '3px 0', lineHeight: 1.4 }}>• {arg}</div>)}
              </div>
            </div>
          )}

          {/* Vote buttons */}
          {p.status === 'active' && !isElection && (
            <div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f(), marginBottom: 6 }}>Your vote weight: ⏣ {fmt(myHours)} HOURS*</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setVoted(v => ({ ...v, [p.id]: 'for' }))} style={{ flex: 1, padding: 14, borderRadius: 14, border: myVote === 'for' ? `2px solid ${T.accent}` : 'none', background: myVote === 'for' ? `${T.accent}15` : T.accent, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>{myVote === 'for' ? '✅ Voted For' : '✅ Vote For'}</button>
                <button onClick={() => setVoted(v => ({ ...v, [p.id]: 'against' }))} style={{ flex: 1, padding: 14, borderRadius: 14, border: myVote === 'against' ? `2px solid ${T.red}` : 'none', background: myVote === 'against' ? `${T.red}15` : `${T.red}80`, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>{myVote === 'against' ? '❌ Voted Against' : '❌ Vote Against'}</button>
              </div>
              <div style={{ textAlign: 'center', marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits. Voting does not spend HOURS. +0.5 HRS reward per vote.*</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══ CREATE PROPOSAL SHEET ═══
  const CreateSheet = () => showCreate && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowCreate(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, maxHeight: '85vh', overflowY: 'auto', background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 12 }}>Create Proposal</div>
        {[{ label: 'Title', placeholder: 'What do you propose?' }, { label: 'Description', placeholder: 'Explain your proposal in detail...' }].map(field => (
          <div key={field.label} style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f(), display: 'block', marginBottom: 4 }}>{field.label}</label>
            {field.label === 'Description' ? <textarea placeholder={field.placeholder} rows={4} style={{ width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none', resize: 'none' }} /> : <input placeholder={field.placeholder} style={{ width: '100%', padding: 10, borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none' }} />}
          </div>
        ))}
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f(), display: 'block', marginBottom: 4 }}>Type</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Feature', 'Policy', 'Economic', 'Election'].map(t => (
              <button key={t} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.border}`, background: T.card, fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f() }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: 10, borderRadius: 10, background: `${T.gold}08`, border: `1px solid ${T.gold}15`, marginBottom: 12, fontSize: 10, color: T.sub, fontFamily: f() }}>Creating a proposal costs <span style={{ color: T.gold, fontWeight: 700, fontFamily: f('mono') }}>⏣ 2 HOURS</span> to prevent spam.*</div>
        <button style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.govern, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Submit Proposal · ⏣ 2 HOURS</button>
        <span style={{ display: 'block', textAlign: 'center', marginTop: 4, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'proposal' && <ProposalView />}
      <CreateSheet />
    </div>
  );
};

export default OursGovern;
