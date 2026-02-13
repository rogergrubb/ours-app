import React, { useState, useEffect } from 'react';

const OursCommunity = () => {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupTab, setGroupTab] = useState('feed');
  const [joined, setJoined] = useState({ 'g1': true });
  const [liked, setLiked] = useState({});
  const [mounted, setMounted] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showTreasury, setShowTreasury] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a', community: '#a78bfa' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace", display: "'Playfair Display', serif" }[fam]);
  const fmt = (n) => typeof n === 'string' ? n : n >= 1000000 ? `${(n/1000000).toFixed(1)}M` : n >= 1000 ? `${(n/1000).toFixed(1)}K` : String(n);

  const groups = [
    { id: 'g1', name: 'Indie Builders', icon: '🔨', banner: `linear-gradient(135deg, #6366f1, #8b5cf6)`, members: 4200, posts: 890, description: 'Building in public. Share WIPs, get feedback, celebrate launches. No pitch decks, no VC talk — just makers making things.', category: 'Tech', treasury: 12400, treasuryGoal: 25000, mods: ['@sarahbuilds', '@devnotes'], rules: ['Be constructive', 'No self-promo spam', 'Share context with WIPs', 'Celebrate others\'s wins'], events: [{ title: 'Show & Tell Friday', when: 'Every Friday 5PM', attendees: 120 }, { title: 'Build-a-thon March', when: 'Mar 1-7', attendees: 340 }],
      feed: [
        { id: 'gp1', author: '@alexdev', avatar: '👨‍💻', text: 'Just shipped v2 of my API monitoring tool. 3 months of work, 400 commits, and a lot of coffee. What do you all think?', likes: 89, comments: 34, tips: 12, time: '2h ago', image: true },
        { id: 'gp2', author: '@jess_makes', avatar: '🎨', text: 'Milestone: first paying customer! Only $9/month but it feels like a million dollars. Don\'t give up, builders.', likes: 234, comments: 67, tips: 45, time: '4h ago', pinned: true },
        { id: 'gp3', author: '@tomcodes', avatar: '🧑‍🔬', text: 'Hot take: the best marketing is just building something people actually want. No growth hacks needed.', likes: 156, comments: 89, tips: 8, time: '6h ago' },
        { id: 'gp4', author: '@nina_builds', avatar: '🏗️', text: 'Week 8 update on my SaaS: MRR hit $450. Not ramen profitable yet but the curve is pointing up. Full breakdown in the thread →', likes: 312, comments: 123, tips: 34, time: '8h ago' },
      ] },
    { id: 'g2', name: 'Creator Economy Hub', icon: '💰', banner: `linear-gradient(135deg, #f59e0b, #f97316)`, members: 8900, posts: 2300, description: 'News, strategies, and discussions about the creator economy. Platform updates, monetization tactics, and industry analysis.', category: 'Business', treasury: 34200, treasuryGoal: 50000, mods: ['@growthlabs', '@priyacooks'], rules: ['Cite sources', 'No MLM/spam', 'Data > opinions'],
      events: [{ title: 'Monthly AMA: Platform Founders', when: 'Last Thursday', attendees: 450 }],
      feed: [
        { id: 'gp5', author: '@growthlabs', avatar: '📈', text: 'New data: creator earnings on OURS are 14x higher per-follower than traditional platforms. Full analysis dropping tomorrow.', likes: 567, comments: 234, tips: 89, time: '1h ago' },
        { id: 'gp6', author: '@revenue_sarah', avatar: '💵', text: 'Crossed 10K HOURS in my first 90 days. Here\'s exactly what I did (no shortcuts, no tricks).', likes: 890, comments: 456, tips: 120, time: '3h ago' },
      ] },
    { id: 'g3', name: 'Design Collective', icon: '🎨', banner: `linear-gradient(135deg, #ec4899, #f43f5e)`, members: 3100, posts: 670, description: 'Designers helping designers. Portfolio reviews, design critiques, tool recommendations, and career advice.', category: 'Design', treasury: 8900, treasuryGoal: 15000, mods: ['@alexdesigns'], rules: ['Give constructive feedback', 'Credit original work'],
      events: [{ title: 'Portfolio Roast Night', when: 'Bi-weekly Wed', attendees: 80 }],
      feed: [
        { id: 'gp7', author: '@alexdesigns', avatar: '🎨', text: 'Unpopular opinion: Figma variables are overengineered for 90% of projects. Fight me.', likes: 234, comments: 189, tips: 12, time: '5h ago' },
      ] },
    { id: 'g4', name: 'Fitness & Nutrition', icon: '💪', banner: `linear-gradient(135deg, #10b981, #059669)`, members: 12400, posts: 4500, description: 'Evidence-based fitness and nutrition. No bro-science, no fads. Just proven methods and supportive accountability.', category: 'Health', treasury: 45000, treasuryGoal: 60000, mods: ['@marcusfitness'], rules: ['Cite studies', 'No body shaming', 'No supplement spam'],
      events: [{ title: '30-Day Challenge', when: 'Starts Monday', attendees: 890 }, { title: 'Weekly Weigh-In', when: 'Every Monday', attendees: 2100 }],
      feed: [] },
    { id: 'g5', name: 'Philosophy & Ethics', icon: '🧠', banner: `linear-gradient(135deg, #0891b2, #0e7490)`, members: 1800, posts: 340, description: 'Thoughtful discussions about philosophy, ethics, technology, and the human condition. Long-form discourse welcome.', category: 'Culture', treasury: 3200, treasuryGoal: 10000, mods: ['@marcusj'], rules: ['Argue ideas, not people', 'Long replies welcome', 'Steel-man opposing views'],
      events: [{ title: 'Book Club: "The Alignment Problem"', when: 'Monthly', attendees: 45 }],
      feed: [] },
    { id: 'g6', name: 'Music Producers', icon: '🎵', banner: `linear-gradient(135deg, #8b5cf6, #a78bfa)`, members: 5600, posts: 1200, description: 'Producers, beatmakers, and audio engineers. Share your work, collab, trade samples, and learn from each other.', category: 'Creative', treasury: 18900, treasuryGoal: 30000, mods: ['@melodylab'], rules: ['Credit samples', 'Constructive feedback', 'No selling beats in feed'],
      events: [{ title: 'Beat Battle', when: 'Bi-weekly Sat', attendees: 200 }],
      feed: [] },
  ];

  const categoryList = ['All', 'Tech', 'Business', 'Design', 'Health', 'Creative', 'Culture'];
  const [catFilter, setCatFilter] = useState('All');
  const filteredGroups = catFilter === 'All' ? groups : groups.filter(g => g.category === catFilter);
  const myGroups = groups.filter(g => joined[g.id]);
  const g = selectedGroup ? groups.find(gr => gr.id === selectedGroup) : null;

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  const GroupCard = ({ group, index = 0 }) => (
    <div onClick={() => { setSelectedGroup(group.id); setView('group'); setGroupTab('feed'); }} style={{ padding: 14, borderRadius: 16, background: T.surface, border: `1px solid ${T.border}`, cursor: 'pointer', animation: `slideUp 0.3s ease ${index * 0.04}s both` }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: group.banner, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{group.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>{group.name}</div>
          <div style={{ fontSize: 10, color: T.sub, fontFamily: f(), lineHeight: 1.3, marginTop: 2 }}>{group.description.slice(0, 80)}...</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>👥 {fmt(group.members)}</span>
            <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>📝 {fmt(group.posts)} posts</span>
            <span style={{ fontSize: 9, color: T.gold, fontFamily: f('mono') }}>⏣ {fmt(group.treasury)}</span>
          </div>
        </div>
        {joined[group.id] ? <span style={{ fontSize: 8, fontWeight: 700, color: T.community, background: `${T.community}15`, padding: '3px 8px', borderRadius: 6, fontFamily: f('mono') }}>✓ Joined</span> : <span style={{ fontSize: 12, color: T.dim }}>→</span>}
      </div>
    </div>
  );

  // ═══ HOME VIEW ═══
  const HomeView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.community}, ${T.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Community</span>
          <button onClick={() => setShowCreate(true)} style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: T.community, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f() }}>+ Create</button>
        </div>
        <div style={{ display: 'flex', padding: '0 16px', gap: 4 }}>
          {[{ id: 'discover', label: 'Discover' }, { id: 'my', label: 'My Groups' }, { id: 'events', label: '📅 Events' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 12px', border: 'none', background: 'none', fontFamily: f(), fontSize: 12, fontWeight: activeTab === tab.id ? 700 : 500, color: activeTab === tab.id ? T.text : T.dim, borderBottom: `2px solid ${activeTab === tab.id ? T.community : 'transparent'}` }}>{tab.label}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px', paddingBottom: 100 }}>
        {/* Category filter */}
        {activeTab === 'discover' && (
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 14 }}>
            {categoryList.map(cat => (
              <button key={cat} onClick={() => setCatFilter(cat)} style={{ padding: '6px 12px', borderRadius: 10, whiteSpace: 'nowrap', background: catFilter === cat ? T.community : T.surface, border: `1px solid ${catFilter === cat ? T.community : T.border}`, fontSize: 11, fontWeight: 600, color: catFilter === cat ? '#fff' : T.sub, fontFamily: f() }}>{cat}</button>
            ))}
          </div>
        )}
        {/* Treasury leaderboard */}
        {activeTab === 'discover' && (
          <div style={{ padding: 14, borderRadius: 16, background: `${T.gold}08`, border: `1px solid ${T.gold}20`, marginBottom: 14, animation: 'slideUp 0.3s ease both' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f(), marginBottom: 6 }}>🏆 Top Community Treasuries*</div>
            {groups.sort((a,b) => b.treasury - a.treasury).slice(0, 3).map((g, i) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: i === 0 ? T.gold : T.dim, fontFamily: f('mono'), width: 18 }}>#{i+1}</span>
                <span style={{ fontSize: 16 }}>{g.icon}</span>
                <span style={{ flex: 1, fontSize: 11, color: T.text, fontFamily: f() }}>{g.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ {fmt(g.treasury)}</span>
              </div>
            ))}
            <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), display: 'block', marginTop: 6 }}>*HOURS are internal credits, not currency.</span>
          </div>
        )}
        {/* Groups list */}
        {activeTab === 'discover' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{filteredGroups.map((g, i) => <GroupCard key={g.id} group={g} index={i} />)}</div>}
        {activeTab === 'my' && <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{myGroups.length ? myGroups.map((g, i) => <GroupCard key={g.id} group={g} index={i} />) : <div style={{ textAlign: 'center', padding: 40, color: T.dim, fontSize: 12 }}>Join a group to get started</div>}</div>}
        {/* Events */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {groups.flatMap(g => (g.events || []).map(e => ({ ...e, groupName: g.name, groupIcon: g.icon, groupId: g.id }))).map((e, i) => (
              <div key={i} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{e.groupIcon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{e.title}</div>
                    <div style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>{e.groupName}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 9, color: T.community, fontFamily: f('mono') }}>📅 {e.when}</span>
                      <span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}>👥 {e.attendees} attending</span>
                    </div>
                  </div>
                  <button style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.community}`, background: 'transparent', fontSize: 10, fontWeight: 700, color: T.community, fontFamily: f() }}>RSVP</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ═══ GROUP VIEW ═══
  const GroupView = () => {
    if (!g) return null;
    const treasuryPct = Math.round((g.treasury / g.treasuryGoal) * 100);
    return (
      <div>
        <div style={{ width: '100%', height: 80, background: g.banner, position: 'relative' }}>
          <button onClick={() => { setView('home'); setSelectedGroup(null); }} style={{ position: 'absolute', top: 10, left: 10, width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(0,0,0,0.4)', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        </div>
        <div style={{ padding: '0 16px', marginTop: -20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 10 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, border: `3px solid ${T.bg}` }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.text, fontFamily: f() }}>{g.name}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{g.category}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
            <div><span style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{fmt(g.members)}</span><span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}> members</span></div>
            <div><span style={{ fontSize: 14, fontWeight: 800, color: T.text, fontFamily: f('mono') }}>{fmt(g.posts)}</span><span style={{ fontSize: 9, color: T.dim, fontFamily: f() }}> posts</span></div>
          </div>
          <p style={{ fontSize: 12, color: T.sub, fontFamily: f(), lineHeight: 1.5, marginBottom: 10 }}>{g.description}</p>
          {/* Treasury bar */}
          <div onClick={() => setShowTreasury(true)} style={{ padding: 10, borderRadius: 12, background: `${T.gold}08`, border: `1px solid ${T.gold}20`, marginBottom: 10, cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f() }}>⏣ Community Treasury*</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>{fmt(g.treasury)} / {fmt(g.treasuryGoal)} HRS</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: T.card, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(treasuryPct, 100)}%`, background: `linear-gradient(90deg, ${T.gold}, ${T.orange})`, borderRadius: 3 }} />
            </div>
            <span style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), marginTop: 2, display: 'block' }}>*HOURS are internal credits. Tap for details.</span>
          </div>
          {/* Join/Leave */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button onClick={() => setJoined(p => ({ ...p, [g.id]: !joined[g.id] }))} style={{ flex: 1, padding: '10px 0', borderRadius: 12, border: joined[g.id] ? `1px solid ${T.border}` : 'none', background: joined[g.id] ? T.card : T.community, fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: f() }}>{joined[g.id] ? '✓ Joined' : 'Join Group'}</button>
            <button style={{ padding: '10px 16px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.card, fontSize: 13, fontFamily: f() }}>🔔</button>
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
            {['feed', 'events', 'members', 'rules'].map(tab => (
              <button key={tab} onClick={() => setGroupTab(tab)} style={{ flex: 1, padding: '10px 0', border: 'none', background: 'none', fontFamily: f(), fontSize: 12, fontWeight: groupTab === tab ? 700 : 500, color: groupTab === tab ? T.text : T.dim, borderBottom: `2px solid ${groupTab === tab ? T.community : 'transparent'}`, textTransform: 'capitalize' }}>{tab}</button>
            ))}
          </div>
          {/* Feed */}
          {groupTab === 'feed' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
              {g.feed?.length ? g.feed.map((post, i) => (
                <div key={post.id} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${post.pinned ? `${T.community}30` : T.border}`, animation: `slideUp 0.3s ease ${i * 0.04}s both` }}>
                  {post.pinned && <span style={{ fontSize: 8, fontWeight: 700, color: T.community, fontFamily: f('mono'), display: 'block', marginBottom: 4 }}>📌 Pinned</span>}
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{post.avatar}</div>
                    <div style={{ flex: 1 }}><span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{post.author}</span><span style={{ fontSize: 9, color: T.dim, fontFamily: f('mono') }}> · {post.time}</span></div>
                  </div>
                  <p style={{ fontSize: 12, color: T.text, fontFamily: f(), lineHeight: 1.5, marginBottom: 8 }}>{post.text}</p>
                  {post.image && <div style={{ height: 120, borderRadius: 12, background: T.card, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: T.dim }}>📷 Image attachment</div>}
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setLiked(p => ({ ...p, [post.id]: !p[post.id] }))} style={{ background: 'none', border: 'none', fontSize: 10, color: liked[post.id] ? T.red : T.dim, fontFamily: f('mono') }}>{liked[post.id] ? '❤️' : '🤍'} {post.likes + (liked[post.id] ? 1 : 0)}</button>
                    <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>💬 {post.comments}</span>
                    {post.tips > 0 && <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono') }}>⏣ {post.tips}</span>}
                  </div>
                </div>
              )) : <div style={{ textAlign: 'center', padding: 30, color: T.dim, fontSize: 12, fontFamily: f() }}>No posts yet — be the first!</div>}
            </div>
          )}
          {/* Events */}
          {groupTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 40 }}>
              {(g.events || []).map((e, i) => (
                <div key={i} style={{ padding: 14, borderRadius: 14, background: T.surface, border: `1px solid ${T.border}`, animation: `slideUp 0.3s ease ${i*0.04}s both` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: f() }}>{e.title}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 10, color: T.community, fontFamily: f('mono') }}>📅 {e.when}</span>
                    <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>👥 {e.attendees}</span>
                  </div>
                  <button style={{ marginTop: 8, padding: '6px 14px', borderRadius: 8, border: 'none', background: T.community, fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f() }}>RSVP</button>
                </div>
              ))}
            </div>
          )}
          {/* Members */}
          {groupTab === 'members' && (
            <div style={{ paddingBottom: 40 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), marginBottom: 6, display: 'block' }}>MODERATORS</span>
              {g.mods.map((mod, i) => (
                <div key={mod} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🛡️</div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{mod}</span>
                  <span style={{ fontSize: 9, color: T.community, fontFamily: f('mono'), marginLeft: 'auto' }}>Moderator</span>
                </div>
              ))}
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), display: 'block', marginTop: 12 }}>+ {fmt(g.members - g.mods.length)} more members</span>
            </div>
          )}
          {/* Rules */}
          {groupTab === 'rules' && (
            <div style={{ paddingBottom: 40 }}>
              {g.rules.map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: T.community, fontFamily: f('mono'), width: 20 }}>{i+1}</span>
                  <span style={{ fontSize: 12, color: T.text, fontFamily: f() }}>{rule}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ═══ CREATE GROUP SHEET ═══
  const CreateSheet = () => showCreate && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowCreate(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 12 }}>Create a Community</div>
        {[{ label: 'Name', placeholder: 'e.g. "Web3 Skeptics Club"' }, { label: 'Description', placeholder: 'What is this group about?' }, { label: 'Category', placeholder: 'Tech, Design, Health...' }].map(field => (
          <div key={field.label} style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: T.sub, fontFamily: f(), display: 'block', marginBottom: 4 }}>{field.label}</label>
            <input placeholder={field.placeholder} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.card, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none' }} />
          </div>
        ))}
        <div style={{ padding: 10, borderRadius: 10, background: `${T.gold}08`, border: `1px solid ${T.gold}15`, marginBottom: 12, fontSize: 10, color: T.sub, fontFamily: f() }}>Creating a community costs <span style={{ color: T.gold, fontWeight: 700, fontFamily: f('mono') }}>⏣ 10 HOURS</span> — this seeds your group treasury.*</div>
        <button style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.community, fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f() }}>Create · ⏣ 10 HOURS</button>
        <span style={{ display: 'block', textAlign: 'center', marginTop: 4, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</span>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'home' && <HomeView />}
      {view === 'group' && <GroupView />}
      <CreateSheet />
    </div>
  );
};

export default OursCommunity;
