import React, { useState } from 'react';

const OursMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };

  const conversations = [
    { id: 1, name: 'Maya Chen', handle: '@mayac', avatar: '👩‍🎤', lastMsg: 'Love the AI agent article! Want to collab?', time: '2m', unread: 2, trust: 97, online: true, type: 'dm' },
    { id: 2, name: 'Tech Builders', avatar: '⚡', lastMsg: 'CodeStream: Anyone tried the new API?', time: '15m', unread: 8, members: 2400, type: 'group' },
    { id: 3, name: 'Jordan Lee', handle: '@jordanl', avatar: '🎨', lastMsg: 'The design looks amazing 🔥', time: '1h', unread: 0, trust: 94, online: false, type: 'dm' },
    { id: 4, name: 'Creative Studio', avatar: '🎨', lastMsg: 'New challenge posted — 48hr sprint', time: '3h', unread: 3, members: 1800, type: 'group' },
    { id: 5, name: 'CryptoMind', handle: '@cryptomind', avatar: '🧠', lastMsg: 'Sent you 5.0 HOURS 💰', time: '1d', unread: 1, trust: 89, online: true, type: 'dm' },
    { id: 6, name: 'PhotoMaster', handle: '@photomaster', avatar: '📸', lastMsg: 'Thanks for the tip! 🙏', time: '2d', unread: 0, trust: 91, online: false, type: 'dm' },
  ];

  const chatMessages = [
    { id: 1, sender: 'them', text: 'Hey Roger! Just read your AI agent article.', time: '2:30 PM' },
    { id: 2, sender: 'them', text: 'The part about SENTINEL was fascinating. How did you get 148K agents connected?', time: '2:31 PM' },
    { id: 3, sender: 'me', text: "Thanks Maya! It's actually monitoring MoltBook's public API. The agents are already there — I just built the intelligence layer on top.", time: '2:35 PM' },
    { id: 4, sender: 'them', text: 'That\'s brilliant. I\'m working on something similar for content curation. Want to collab?', time: '2:36 PM' },
    { id: 5, sender: 'them', text: 'Love the AI agent article! Want to collab?', time: '2:37 PM', tip: { amount: 2.0 } },
    { id: 6, sender: 'system', text: '💎 Maya Chen tipped you 2.0 HOURS', time: '2:37 PM' },
  ];

  const filtered = filter === 'all' ? conversations : filter === 'unread' ? conversations.filter(c => c.unread > 0) : conversations.filter(c => c.type === filter);

  // ═══ CHAT VIEW ═══
  if (selectedChat) {
    const chat = conversations.find(c => c.id === selectedChat);
    return (
      <div style={{ minHeight: '100vh', background: T.bg, color: T.text, display: 'flex', flexDirection: 'column' }}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); }`}</style>
        <div style={{ maxWidth: 480, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Chat header */}
          <div style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${T.border}`, background: `${T.bg}ee`, backdropFilter: 'blur(20px)' }}>
            <button onClick={() => setSelectedChat(null)} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 16, cursor: 'pointer' }}>←</button>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${T.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, position: 'relative' }}>
              {chat.avatar}
              {chat.online && <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderRadius: '50%', background: T.accent, border: `2px solid ${T.bg}` }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{chat.name}</div>
              <div style={{ fontSize: 10, color: chat.online ? T.accent : T.dim, fontFamily: "'DM Mono', monospace" }}>{chat.online ? 'Online' : 'Last seen 1h ago'}{chat.trust ? ` • 🛡️ ${chat.trust}` : ` • ${chat.members} members`}</div>
            </div>
            <button style={{ padding: '6px 12px', borderRadius: 8, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, color: T.gold, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>💎 Tip</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto' }}>
            {chatMessages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : msg.sender === 'system' ? 'center' : 'flex-start', marginBottom: 12 }}>
                {msg.sender === 'system' ? (
                  <div style={{ padding: '6px 14px', borderRadius: 10, background: `${T.gold}08`, border: `1px solid ${T.gold}15`, fontSize: 11, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{msg.text}</div>
                ) : (
                  <div style={{ maxWidth: '75%' }}>
                    <div style={{ padding: '10px 14px', borderRadius: 16, borderBottomLeftRadius: msg.sender === 'them' ? 4 : 16, borderBottomRightRadius: msg.sender === 'me' ? 4 : 16, background: msg.sender === 'me' ? `linear-gradient(135deg, ${T.primary}30, ${T.accent}20)` : T.card, border: `1px solid ${msg.sender === 'me' ? T.primary + '20' : T.border}` }}>
                      <div style={{ fontSize: 13, color: T.text, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>{msg.text}</div>
                      {msg.tip && <div style={{ marginTop: 6, padding: '4px 10px', borderRadius: 8, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, fontSize: 10, color: T.gold, fontFamily: "'DM Mono', monospace", display: 'inline-block' }}>💎 Tipped {msg.tip.amount} HOURS</div>}
                    </div>
                    <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 2, textAlign: msg.sender === 'me' ? 'right' : 'left' }}>{msg.time}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 20px', borderTop: `1px solid ${T.border}`, background: `${T.bg}ee`, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <button style={{ width: 36, height: 36, borderRadius: 10, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer', fontSize: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📎</button>
            <div style={{ flex: 1, position: 'relative' }}>
              <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." style={{ width: '100%', padding: '10px 14px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
            </div>
            <button style={{ width: 36, height: 36, borderRadius: 10, background: message ? `linear-gradient(135deg, ${T.primary}, ${T.accent})` : T.card, border: message ? 'none' : `1px solid ${T.border}`, cursor: 'pointer', fontSize: 14, color: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>↑</button>
          </div>
        </div>
      </div>
    );
  }

  // ═══ INBOX VIEW ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; margin: 0; } button:hover:not(:disabled) { filter: brightness(1.08); }`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>💬 Messages</span>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✏️</button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 20px' }}>
          <input placeholder="🔍  Search messages..." style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, padding: '0 20px 12px', overflowX: 'auto' }}>
          {[{ id: 'all', l: 'All' }, { id: 'unread', l: 'Unread' }, { id: 'dm', l: 'Direct' }, { id: 'group', l: 'Groups' }].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 14px', borderRadius: 10, cursor: 'pointer', background: filter === f.id ? `${T.primary}15` : T.card, border: `1px solid ${filter === f.id ? T.primary + '30' : T.border}`, color: filter === f.id ? T.primary : T.dim, fontSize: 11, fontWeight: filter === f.id ? 700 : 400, fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap' }}>{f.l}</button>
          ))}
        </div>

        {/* Conversation list */}
        <div style={{ padding: '0 20px' }}>
          {filtered.map(conv => (
            <button key={conv.id} onClick={() => setSelectedChat(conv.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0',
              borderBottom: `1px solid ${T.border}`, cursor: 'pointer',
              background: 'none', border: 'none', borderBottom: `1px solid ${T.border}`,
              width: '100%', textAlign: 'left',
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.primary}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, position: 'relative', flexShrink: 0 }}>
                {conv.avatar}
                {conv.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: T.accent, border: `2px solid ${T.bg}` }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: conv.unread ? 800 : 600, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{conv.name}</span>
                    {conv.type === 'group' && <span style={{ fontSize: 8, padding: '1px 6px', borderRadius: 4, background: `${T.purple}15`, color: T.purple }}>GROUP</span>}
                  </div>
                  <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{conv.time}</span>
                </div>
                <div style={{ fontSize: 12, color: conv.unread ? T.text : T.dim, fontFamily: "'Outfit', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: conv.unread ? 500 : 400 }}>{conv.lastMsg}</div>
              </div>
              {conv.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: '50%', background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, flexShrink: 0 }}>{conv.unread}</div>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OursMessages;
