import React, { useState, useEffect } from 'react';

const OursArena = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('challenges');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [questsDone, setQuestsDone] = useState({ q1: true });
  const [streak, setStreak] = useState(7);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a', arena: '#fbbf24' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const challenges = [
    { id: 'ch1', title: '7-Day Content Marathon', icon: '🏃', status: 'active', prize: 50, participants: 890, deadline: '3 days left', description: 'Post at least one piece of original content every day for 7 consecutive days. Quality over quantity — each post must receive at least 5 engagements.', rules: ['Post 1 original content piece per day', 'Each post needs 5+ engagements', 'No reposts or low-effort content', 'Any zone counts'], difficulty: 'Medium', submissions: 234, winners: 'Top 50',
      leaderboard: [
        { rank: 1, name: '@sarahbuilds', avatar: '👩‍💻', score: 7, detail: '7/7 days · 234 engagements' },
        { rank: 2, name: '@devnotes', avatar: '💻', score: 7, detail: '7/7 days · 189 engagements' },
        { rank: 3, name: '@priyacooks', avatar: '🍳', score: 6, detail: '6/7 days · 312 engagements' },
        { rank: 4, name: '@alexdesigns', avatar: '🎨', score: 6, detail: '6/7 days · 156 engagements' },
        { rank: 5, name: '@growthlabs', avatar: '📈', score: 5, detail: '5/7 days · 890 engagements' },
      ] },
    { id: 'ch2', title: 'Best Tutorial of the Week', icon: '📚', status: 'active', prize: 100, participants: 342, deadline: '5 days left', description: 'Create the most helpful tutorial. Community votes determine the winner. Any topic, any format (video, article, thread).', rules: ['One submission per person', 'Must be original content', 'Community votes determine winner', 'Minimum 3 minutes of content'], difficulty: 'Hard', submissions: 89, winners: 'Top 3',
      leaderboard: [
        { rank: 1, name: '@devnotes', avatar: '💻', score: 456, detail: '456 votes · "WebSocket Deep Dive"' },
        { rank: 2, name: '@sarahbuilds', avatar: '👩‍💻', score: 389, detail: '389 votes · "React Patterns"' },
        { rank: 3, name: '@marcusfitness', avatar: '💪', score: 234, detail: '234 votes · "Home Gym Setup"' },
      ] },
    { id: 'ch3', title: 'Community Helper Badge', icon: '🤝', status: 'active', prize: 25, participants: 1200, deadline: 'Ongoing', description: 'Leave 50 helpful comments on other creators\' content this month. Genuine engagement only — copy-paste or low-effort comments don\'t count.', rules: ['50 helpful comments in 30 days', 'Must be substantive (10+ words)', 'No copy-paste', 'Different creators preferred'], difficulty: 'Easy', submissions: 890, winners: 'All qualifiers' },
    { id: 'ch4', title: 'Build in Public Challenge', icon: '🔨', status: 'upcoming', prize: 200, participants: 0, deadline: 'Starts Monday', description: 'Document your project build process for 14 days. Daily updates with screenshots, decisions, and learnings. Community votes on most transparent journey.', rules: ['Daily update for 14 days', 'Include screenshots or demos', 'Share real numbers and decisions', 'Be transparent about failures'], difficulty: 'Hard', submissions: 0, winners: 'Top 10' },
    { id: 'ch5', title: 'Viral Short Competition', icon: '🎬', status: 'completed', prize: 150, participants: 567, deadline: 'Completed', description: 'Create a short video (under 60 seconds) that gets the most views in the Watch zone. Creativity and originality scored.', difficulty: 'Medium', submissions: 234, winners: 'Top 5',
      leaderboard: [
        { rank: 1, name: '@creativejoe', avatar: '🎥', score: '45.2K', detail: '45.2K views · "Day in a Life of a Builder"' },
        { rank: 2, name: '@melodylab', avatar: '🎵', score: '38.9K', detail: '38.9K views · "Making a Beat in 60 Seconds"' },
        { rank: 3, name: '@priyacooks', avatar: '🍳', score: '34.1K', detail: '34.1K views · "One-Minute Ramen"' },
      ] },
  ];

  const dailyQuests = [
    { id: 'q1', title: 'Log in today', reward: 0.25, icon: '👋', done: true },
    { id: 'q2', title: 'Like 3 posts', reward: 0.5, icon: '❤️', done: false, progress: '1/3' },
    { id: 'q3', title: 'Watch 5 minutes of video', reward: 1.0, icon: '🎬', done: false, progress: '2:30/5:00' },
    { id: 'q4', title: 'Leave a comment', reward: 0.5, icon: '💬', done: false },
    { id: 'q5', title: 'Save something to collection', reward: 0.5, icon: '📌', done: false },
    { id: 'q6', title: 'Visit 3 different zones', reward: 0.75, icon: '🗺️', done: false, progress: '1/3' },
  ];

  const badges = [
    { id: 'b1', title: 'First Post', icon: '✍️', earned: true, description: 'Published your first content' },
    { id: 'b2', title: 'Streak Master', icon: '🔥', earned: true, description: '7-day login streak', level: 1 },
    { id: 'b3', title: 'Social Butterfly', icon: '🦋', earned: true, description: 'Made 100 comments' },
    { id: 'b4', title: 'Tipping King', icon: '👑', earned: false, description: 'Tipped 50 different creators', progress: '23/50' },
    { id: 'b5', title: 'Content Machine', icon: '⚡', earned: false, description: 'Published 50 pieces of content', progress: '12/50' },
    { id: 'b6', title: 'Community Pillar', icon: '🏛️', earned: false, description: 'Helped moderate 100 reports', progress: '0/100' },
    { id: 'b7', title: 'Arena Champion', icon: '🏆', earned: false, description: 'Won a challenge with 100+ participants', progress: '0/1' },
    { id: 'b8', title: 'Whale', icon: '🐋', earned: false, description: 'Reach 100,000 HOURS', progress: '2,400/100K' },
  ];

  const globalLeaderboard = [
    { rank: 1, name: '@devnotes', avatar: '💻', hours: '42,000', tier: '🏗️ Architect', earned: '+2.4K this week' },
    { rank: 2, name: '@growthlabs', avatar: '📈', hours: '28,400', tier: '🏗️ Architect', earned: '+1.8K this week' },
    { rank: 3, name: '@marcusfitness', avatar: '💪', hours: '28,900', tier: '🏗️ Architect', earned: '+1.6K this week' },
    { rank: 4, name: '@alexdesigns', avatar: '🎨', hours: '32,400', tier: '🏗️ Architect', earned: '+1.5K this week' },
    { rank: 5, name: '@sarahbuilds', avatar: '👩‍💻', hours: '18,200', tier: '⚡ Builder', earned: '+1.2K this week' },
    { rank: 6, name: '@melodylab', avatar: '🎵', hours: '15,600', tier: '⚡ Builder', earned: '+980 this week' },
    { rank: 7, name: '@priyacooks', avatar: '🍳', hours: '8,900', tier: '⚡ Builder', earned: '+870 this week' },
    { rank: 8, name: '@growthhacker', avatar: '📊', hours: '8,400', tier: '⚡ Builder', earned: '+650 this week' },
  ];

  const totalQuestReward = dailyQuests.reduce((sum, q) => sum + q.reward, 0);
  const completedQuests = dailyQuests.filter(q => q.done || questsDone[q.id]).length;

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 5px ${T.gold}30} 50%{box-shadow:0 0 20px ${T.gold}50} }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  // ═══ HOME ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.arena}, ${T.orange})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Arena</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: T.orange, fontFamily: f('mono'), animation: 'pulse 2s ease infinite' }}>🔥 {streak}</span>
            <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>day streak</span>
          </div>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', gap: 4 }}>
          {[{ id: 'challenges', label: '⚔️ Challenges' }, { id: 'quests', label: '📋 Quests' }, { id: 'badges', label: '🏅 Badges' }, { id: 'leaderboard', label: '🏆 Leaders' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 10px', border: 'none', background: 'none', whiteSpace: 'nowrap', fontFamily: f(), fontSize: 11, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.arena : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: 80 }}>

        {/* CHALLENGES */}
        {activeTab === 'challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {challenges.map((ch, i) => {
              const statusColor = ch.status === 'active' ? T.accent : ch.status === 'upcoming' ? T.primary : T.dim;
              return (
                <div key={ch.id} onClick={() => { setSelectedChallenge(ch); setView('challenge'); }} style={{ padding: 14, borderRadius: 16, background: T.surface, border: `1px solid ${ch.status === 'active' ? `${T.arena}20` : T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 28 }}>{ch.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f(), lineHeight: 1.3 }}>{ch.title}</div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                          <span style={{ fontSize: 8, fontWeight: 700, color: statusColor, fontFamily: f('mono'), textTransform: 'uppercase' }}>{ch.status}</span>
                          <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>{ch.difficulty}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 900, color: T.arena, fontFamily: f('mono') }}>⏣ {ch.prize}*</div>
                      <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono') }}>prize pool</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 6 }}>
                    <span>👥 {fmt(ch.participants)}</span>
                    <span>📝 {ch.submissions} entries</span>
                    <span>🏆 {ch.winners}</span>
                    <span style={{ color: statusColor }}>{ch.deadline}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DAILY QUESTS */}
        {activeTab === 'quests' && (
          <div>
            <div style={{ padding: 14, borderRadius: 16, background: `${T.arena}08`, border: `1px solid ${T.arena}20`, marginBottom: 14, animation: 'slideUp 0.3s ease both' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.arena, fontFamily: f() }}>Daily Quests</span>
                <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>Resets in 14h 23m</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{completedQuests}/{dailyQuests.length} completed</span>
                <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>⏣ {totalQuestReward.toFixed(2)} HRS available*</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: T.card, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(completedQuests / dailyQuests.length) * 100}%`, background: `linear-gradient(90deg, ${T.arena}, ${T.orange})`, borderRadius: 3 }} />
              </div>
            </div>
            {dailyQuests.map((q, i) => {
              const done = q.done || questsDone[q.id];
              return (
                <div key={q.id} onClick={() => !done && setQuestsDone(p => ({ ...p, [q.id]: true }))} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${T.border}`, cursor: done ? 'default' : 'pointer', opacity: done ? 0.5 : 1, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: done ? `${T.accent}15` : T.card, border: `1px solid ${done ? T.accent : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{done ? '✅' : q.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: done ? T.dim : T.text, fontFamily: f(), textDecoration: done ? 'line-through' : 'none' }}>{q.title}</div>
                    {q.progress && !done && <div style={{ fontSize: 9, color: T.sub, fontFamily: f('mono'), marginTop: 1 }}>{q.progress}</div>}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: done ? T.dim : T.gold, fontFamily: f('mono') }}>+{q.reward}*</span>
                </div>
              );
            })}
            <div style={{ marginTop: 8, fontSize: 8, color: T.dim, fontFamily: f('mono'), textAlign: 'center' }}>*HOURS are internal credits, not currency. Earning rates illustrative.</div>
          </div>
        )}

        {/* BADGES */}
        {activeTab === 'badges' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f() }}>{badges.filter(b => b.earned).length}/{badges.length} earned</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {badges.map((badge, i) => (
                <div key={badge.id} style={{ padding: 14, borderRadius: 14, background: badge.earned ? `${T.arena}08` : T.surface, border: `1px solid ${badge.earned ? `${T.arena}25` : T.border}`, textAlign: 'center', opacity: badge.earned ? 1 : 0.6, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  <div style={{ fontSize: 32, marginBottom: 4, filter: badge.earned ? 'none' : 'grayscale(1)' }}>{badge.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f() }}>{badge.title}</div>
                  <div style={{ fontSize: 9, color: T.sub, fontFamily: f(), marginTop: 2, lineHeight: 1.3 }}>{badge.description}</div>
                  {badge.progress && <div style={{ fontSize: 9, color: T.arena, fontFamily: f('mono'), marginTop: 4 }}>{badge.progress}</div>}
                  {badge.earned && <div style={{ fontSize: 8, color: T.accent, fontFamily: f('mono'), marginTop: 4 }}>✓ Earned</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {['Weekly', 'Monthly', 'All Time'].map(period => (
                <button key={period} style={{ flex: 1, padding: '8px 0', borderRadius: 10, border: `1px solid ${period === 'Weekly' ? T.arena : T.border}`, background: period === 'Weekly' ? `${T.arena}15` : T.surface, fontSize: 10, fontWeight: 600, color: period === 'Weekly' ? T.arena : T.sub, fontFamily: f() }}>{period}</button>
              ))}
            </div>
            {/* Top 3 podium */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 16, padding: '0 10px' }}>
              {[globalLeaderboard[1], globalLeaderboard[0], globalLeaderboard[2]].map((u, i) => {
                const heights = [100, 130, 80];
                const medals = ['🥈', '🥇', '🥉'];
                return (
                  <div key={u.rank} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{u.avatar}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.text, fontFamily: f() }}>{u.name}</div>
                    <div style={{ height: heights[i], background: `linear-gradient(180deg, ${T.arena}30, ${T.arena}05)`, borderRadius: '8px 8px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 4, border: `1px solid ${T.arena}20`, borderBottom: 'none' }}>
                      <span style={{ fontSize: 20 }}>{medals[i]}</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: T.gold, fontFamily: f('mono') }}>⏣ {u.hours}*</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Rest of leaderboard */}
            {globalLeaderboard.slice(3).map((u, i) => (
              <div key={u.rank} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: T.dim, fontFamily: f('mono'), width: 24, textAlign: 'center' }}>#{u.rank}</span>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{u.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{u.name}</div>
                  <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{u.tier}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ {u.hours}*</div>
                  <div style={{ fontSize: 8, color: T.accent, fontFamily: f('mono') }}>{u.earned}</div>
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', marginTop: 8, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
          </div>
        )}
      </div>
    </div>
  );

  // ═══ CHALLENGE DETAIL ═══
  const ChallengeView = () => {
    if (!selectedChallenge) return null;
    const ch = selectedChallenge;
    return (
      <div>
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.border}` }}>
          <button onClick={() => { setView('home'); setSelectedChallenge(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>Challenge</span>
        </div>
        <div style={{ padding: '16px', paddingBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{ch.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: T.text, fontFamily: f('display'), lineHeight: 1.2 }}>{ch.title}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: ch.status === 'active' ? T.accent : T.dim, fontFamily: f('mono'), textTransform: 'uppercase' }}>{ch.status}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{ch.difficulty}</span>
              <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{ch.deadline}</span>
            </div>
          </div>
          <div style={{ padding: 14, borderRadius: 14, background: `${T.arena}08`, border: `1px solid ${T.arena}20`, textAlign: 'center', marginBottom: 16, animation: 'glow 3s ease infinite' }}>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>PRIZE POOL</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: T.arena, fontFamily: f('mono') }}>⏣ {ch.prize} HOURS*</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>Split among {ch.winners}</div>
          </div>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: f(), lineHeight: 1.6, marginBottom: 14 }}>{ch.description}</p>
          {/* Rules */}
          {ch.rules && (
            <div style={{ padding: 12, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: f(), marginBottom: 6 }}>Rules</div>
              {ch.rules.map((rule, i) => <div key={i} style={{ fontSize: 11, color: T.sub, fontFamily: f(), padding: '3px 0' }}>• {rule}</div>)}
            </div>
          )}
          {/* Stats */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            {[{ l: 'Participants', v: fmt(ch.participants), c: T.text }, { l: 'Entries', v: ch.submissions, c: T.primary }, { l: 'Winners', v: ch.winners, c: T.arena }].map(s => (
              <div key={s.l} style={{ flex: 1, padding: 10, borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: s.c, fontFamily: f('mono') }}>{s.v}</div>
                <div style={{ fontSize: 8, color: T.dim }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Leaderboard */}
          {ch.leaderboard && (
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.sub, fontFamily: f(), letterSpacing: 1, display: 'block', marginBottom: 8 }}>🏆 LEADERBOARD</span>
              {ch.leaderboard.map((entry, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: i < 3 ? T.arena : T.dim, fontFamily: f('mono'), width: 24 }}>#{entry.rank}</span>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{entry.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{entry.name}</div>
                    <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>{entry.detail}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.arena, fontFamily: f('mono') }}>{entry.score}</span>
                </div>
              ))}
            </div>
          )}
          {/* Join button */}
          {ch.status === 'active' && (
            <button style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.arena}, ${T.orange})`, fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f() }}>⚔️ Join Challenge</button>
          )}
          <div style={{ textAlign: 'center', marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'challenge' && <ChallengeView />}
    </div>
  );
};

export default OursArena;
