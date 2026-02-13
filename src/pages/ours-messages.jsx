import React, { useState, useEffect, useRef } from 'react';

const OursMessages = () => {
  const [view, setView] = useState('list');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [typing, setTyping] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const scrollRef = useRef(null);

  const T = { bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240', border: 'rgba(56,68,100,0.18)', primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a' };
  const f = (fam = 'body') => ({ body: "'Outfit', sans-serif", mono: "'DM Mono', monospace" }[fam]);

  const conversations = [
    { id: 'c1', name: 'Sarah Builds', handle: '@sarahbuilds', avatar: '👩‍💻', online: true, lastMessage: 'That HOURS integration looks amazing! Can we collab on a tutorial?', time: '2m ago', unread: 2,
      history: [
        { id: 'm1', from: 'them', text: 'Hey! Saw the OURS launch 🚀', time: '10:30 AM' },
        { id: 'm2', from: 'me', text: 'Thanks! Been building non-stop for weeks', time: '10:32 AM' },
        { id: 'm3', from: 'them', text: 'That HOURS integration looks amazing! Can we collab on a tutorial?', time: '10:34 AM' },
      ] },
    { id: 'c2', name: 'Dev Notes', handle: '@devnotes', avatar: '💻', online: true, lastMessage: 'The WebSocket architecture doc is ready for review', time: '1h ago', unread: 0,
      history: [
        { id: 'm4', from: 'me', text: 'How\'s the architecture doc coming?', time: '9:00 AM' },
        { id: 'm5', from: 'them', text: 'Almost done! Added the scaling section', time: '9:15 AM' },
        { id: 'm6', from: 'them', text: 'The WebSocket architecture doc is ready for review', time: '10:00 AM' },
      ] },
    { id: 'c3', name: 'Growth Labs', handle: '@growthlabs', avatar: '📈', online: false, lastMessage: 'Revenue share proposal got 12K votes 🗳️', time: '3h ago', unread: 1,
      history: [
        { id: 'm7', from: 'them', text: 'The 75% revenue share proposal is gaining traction', time: '8:00 AM' },
        { id: 'm8', from: 'me', text: 'How many votes so far?', time: '8:05 AM' },
        { id: 'm9', from: 'them', text: 'Revenue share proposal got 12K votes 🗳️', time: '8:10 AM' },
      ] },
    { id: 'c4', name: 'Priya Sharma', handle: '@priyacooks', avatar: '🍳', online: false, lastMessage: 'Would love to set up a food creator zone within Shop!', time: '1d ago', unread: 0,
      history: [
        { id: 'm10', from: 'them', text: 'Would love to set up a food creator zone within Shop!', time: 'Yesterday' },
      ] },
    { id: 'c5', name: 'Alex Designs', handle: '@alexdesigns', avatar: '🎨', online: true, lastMessage: 'New design system tokens look clean 👌', time: '2d ago', unread: 0,
      history: [
        { id: 'm11', from: 'them', text: 'New design system tokens look clean 👌', time: '2 days ago' },
      ] },
    { id: 'c6', name: 'OURS Team', handle: '@oursteam', avatar: '🎯', online: true, lastMessage: '📢 Platform update: Govern zone is live!', time: '3d ago', unread: 0, isGroup: true,
      history: [
        { id: 'm12', from: 'them', text: '📢 Platform update: Govern zone is live! Community proposals are now open for voting.', time: '3 days ago' },
      ] },
  ];

  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    const newMsg = { id: `m${Date.now()}`, from: 'me', text: message, time: 'Just now' };
    setMessages(prev => ({ ...prev, [selectedChat.id]: [...(prev[selectedChat.id] || selectedChat.history), newMsg] }));
    setMessage('');
    // Simulate typing
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = { id: `m${Date.now() + 1}`, from: 'them', text: ['Sounds great! 🙌', 'Let me think about that...', 'Love it! ⏣', '100% agree 🔥', 'On it! 💪'][Math.floor(Math.random() * 5)], time: 'Just now' };
      setMessages(prev => ({ ...prev, [selectedChat.id]: [...(prev[selectedChat.id] || selectedChat.history), reply] }));
    }, 1500);
  };

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const chatMessages = selectedChat ? (messages[selectedChat.id] || selectedChat.history) : [];

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; } body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes typingDot { 0%,100%{opacity:0.3} 50%{opacity:1} }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; } button:hover:not(:disabled) { filter: brightness(1.06); }
    input::placeholder { color: ${T.dim}; }
  `;

  // ═══ CONVERSATION LIST ═══
  const ListView = () => (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}`, padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 900, fontFamily: f(), background: `linear-gradient(135deg, ${T.primary}, ${T.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Messages</span>
          <button style={{ padding: '6px 12px', borderRadius: 10, border: 'none', background: T.primary, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: f() }}>+ New</button>
        </div>
        <input placeholder="Search conversations..." style={{ width: '100%', padding: '10px 14px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none' }} />
      </div>
      <div style={{ paddingBottom: 80 }}>
        {conversations.map((conv, i) => (
          <div key={conv.id} onClick={() => { setSelectedChat(conv); setView('chat'); }} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${T.border}`, cursor: 'pointer', background: conv.unread > 0 ? `${T.primary}05` : 'transparent', animation: `slideUp 0.3s ease ${i * 0.03}s both` }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{conv.avatar}</div>
              {conv.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: T.accent, border: `2px solid ${T.bg}` }} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: conv.unread > 0 ? 800 : 600, color: T.text, fontFamily: f() }}>{conv.name}</span>
                  {conv.isGroup && <span style={{ fontSize: 7, color: T.purple, fontFamily: f('mono'), background: `${T.purple}15`, padding: '1px 4px', borderRadius: 3 }}>GROUP</span>}
                </div>
                <span style={{ fontSize: 9, color: conv.unread > 0 ? T.primary : T.dim, fontFamily: f('mono') }}>{conv.time}</span>
              </div>
              <div style={{ fontSize: 11, color: conv.unread > 0 ? T.sub : T.dim, fontFamily: f(), whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{conv.lastMessage}</div>
            </div>
            {conv.unread > 0 && <div style={{ width: 18, height: 18, borderRadius: '50%', background: T.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', fontFamily: f('mono') }}>{conv.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );

  // ═══ CHAT VIEW ═══
  const ChatView = () => {
    if (!selectedChat) return null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {/* Header */}
        <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.border}`, background: `${T.bg}ee`, backdropFilter: 'blur(20px)' }}>
          <button onClick={() => { setView('list'); setSelectedChat(null); }} style={{ width: 32, height: 32, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 14, color: T.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: T.card, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{selectedChat.avatar}</div>
            {selectedChat.online && <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderRadius: '50%', background: T.accent, border: `1.5px solid ${T.bg}` }} />}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.text, fontFamily: f() }}>{selectedChat.name}</div>
            <div style={{ fontSize: 9, color: selectedChat.online ? T.accent : T.dim, fontFamily: f('mono') }}>{selectedChat.online ? 'Online' : 'Offline'}</div>
          </div>
          <button onClick={() => setShowTip(true)} style={{ padding: '5px 10px', borderRadius: 8, border: `1px solid ${T.gold}30`, background: `${T.gold}08`, fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ Tip</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
          {chatMessages.map((msg, i) => {
            const isMine = msg.from === 'me';
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start', marginBottom: 6, animation: `fadeIn 0.2s ease ${i * 0.02}s both` }}>
                <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: isMine ? T.primary : T.card, border: isMine ? 'none' : `1px solid ${T.border}` }}>
                  <p style={{ fontSize: 12, color: isMine ? '#fff' : T.text, fontFamily: f(), lineHeight: 1.5 }}>{msg.text}</p>
                  <div style={{ fontSize: 8, color: isMine ? 'rgba(255,255,255,0.5)' : T.dim, fontFamily: f('mono'), marginTop: 3, textAlign: 'right' }}>
                    {msg.time} {isMine && '✓✓'}
                  </div>
                </div>
              </div>
            );
          })}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 6 }}>
              <div style={{ padding: '10px 18px', borderRadius: '16px 16px 16px 4px', background: T.card, border: `1px solid ${T.border}` }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: T.dim, animation: `typingDot 1s ease ${i * 0.2}s infinite` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '8px 16px 12px', borderTop: `1px solid ${T.border}`, background: T.bg }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📎</button>
            <input value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 12, fontFamily: f(), outline: 'none' }} />
            <button onClick={sendMessage} disabled={!message.trim()} style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: message.trim() ? T.primary : T.card, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: message.trim() ? 1 : 0.5 }}>➤</button>
          </div>
        </div>
      </div>
    );
  };

  // ═══ TIP SHEET ═══
  const TipSheet = () => showTip && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowTip(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, background: T.surface, borderRadius: '20px 20px 0 0', border: `1px solid ${T.border}`, padding: 20, animation: 'slideUp 0.3s ease' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: T.text, fontFamily: f(), marginBottom: 4 }}>Tip {selectedChat?.name}</div>
        <div style={{ fontSize: 10, color: T.dim, fontFamily: f('mono'), marginBottom: 12 }}>Send HOURS directly*</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[1, 5, 10, 25, 50].map(amount => (
            <button key={amount} style={{ flex: 1, padding: '12px 0', borderRadius: 12, border: `1px solid ${T.gold}30`, background: `${T.gold}08`, fontSize: 13, fontWeight: 700, color: T.gold, fontFamily: f('mono') }}>⏣ {amount}</button>
          ))}
        </div>
        <button onClick={() => setShowTip(false)} style={{ width: '100%', padding: 14, borderRadius: 14, border: 'none', background: T.gold, fontSize: 14, fontWeight: 700, color: T.bg, fontFamily: f() }}>Send Tip</button>
        <div style={{ textAlign: 'center', marginTop: 6, fontSize: 8, color: T.dim, fontFamily: f('mono') }}>*HOURS are internal credits, not currency.</div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, maxWidth: 440, margin: '0 auto' }}>
      <style>{globalStyles}</style>
      {view === 'list' && <ListView />}
      {view === 'chat' && <ChatView />}
      <TipSheet />
    </div>
  );
};

export default OursMessages;
