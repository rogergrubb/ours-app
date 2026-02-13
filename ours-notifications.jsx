import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// OURS — NOTIFICATIONS & SUBSCRIPTIONS
// "Never miss a moment from the people you care about."
//
// Creator Subscriptions • Live Alerts • SMS/Push/In-App Notifications
// Notification Center • Smart Preferences • Live Banners
// Subscribe once. Get notified YOUR way.
// ═══════════════════════════════════════════════════════════════════════════

const OursNotifications = () => {
  const [view, setView] = useState('center'); // center | preferences | subscribe | liveAlert
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showLiveBanner, setShowLiveBanner] = useState(true);
  const [showSubscribeSheet, setShowSubscribeSheet] = useState(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [readNotifs, setReadNotifs] = useState({});
  const [dismissedBanners, setDismissedBanners] = useState({});
  const [expandedNotif, setExpandedNotif] = useState(null);

  // Subscription state per creator
  const [subscriptions, setSubscriptions] = useState({
    '@mayachen': { following: true, notify: true, sms: false, push: true, inApp: true, tier: 'all' },
    '@alexrivera': { following: true, notify: true, sms: true, push: true, inApp: true, tier: 'all' },
    '@samtorres': { following: true, notify: false, sms: false, push: false, inApp: true, tier: 'live' },
    '@drsarahliu': { following: true, notify: true, sms: false, push: true, inApp: true, tier: 'content' },
    '@jordanblake': { following: false, notify: false, sms: false, push: false, inApp: false, tier: 'none' },
  });

  // Global notification preferences
  const [globalPrefs, setGlobalPrefs] = useState({
    liveAlerts: true,
    tipsReceived: true,
    comments: true,
    mentions: true,
    governance: true,
    milestones: true,
    weeklyDigest: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
    smsEnabled: true,
    pushEnabled: true,
    emailDigest: true,
    soundEnabled: true,
    vibrate: true,
    showPreviews: true,
    groupByCreator: true,
    phoneNumber: '+1 (510) ***-**42',
  });

  useEffect(() => { setMounted(true); }, []);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.18)', glow: 'rgba(14,165,233,0.06)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    lime: '#84cc16', teal: '#2dd4bf', rose: '#fb7185', indigo: '#818cf8',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
    glass: 'rgba(10,17,34,0.88)',
  };

  const f = (family = 'body') => ({
    body: "'Outfit', sans-serif",
    mono: "'DM Mono', monospace",
    display: "'Playfair Display', serif",
  }[family]);

  // ═══ CREATORS DATA ═══
  const creators = {
    '@mayachen': { name: 'Maya Chen', avatar: '🎨', verified: true, followers: '45.2K', zone: 'Explore', bio: 'Digital artist. Painting on OURS.', liveFreq: '3x/week', lastLive: '2h ago', isLive: true, streamTitle: 'Painting to lo-fi — come chill', viewers: 312, mood: 'chill' },
    '@alexrivera': { name: 'Alex Rivera', avatar: '🎬', verified: true, followers: '67.8K', zone: 'Watch', bio: 'Filmmaker. Storyteller. Builder.', liveFreq: '2x/week', lastLive: '1 day ago', isLive: false },
    '@samtorres': { name: 'Sam Torres', avatar: '🎵', verified: true, followers: '34.2K', zone: 'Listen', bio: 'Audio rooms & conversations.', liveFreq: 'Daily', lastLive: '45m ago', isLive: true, streamTitle: 'Creator Roundtable: How ownership changes everything', viewers: 189, mood: 'conversational' },
    '@drsarahliu': { name: 'Dr. Sarah Liu', avatar: '🧠', verified: true, followers: '23.4K', zone: 'Read', bio: 'Researcher. Writer. Educator.', liveFreq: 'Weekly', lastLive: '3 days ago', isLive: false },
    '@jordanblake': { name: 'Jordan Blake', avatar: '💡', verified: false, followers: '12.3K', zone: 'Feed', bio: 'Thinking out loud.', liveFreq: 'Sporadic', lastLive: '32m ago', isLive: true, streamTitle: "I quit my 6-figure job for OURS — here's what happened", viewers: 534, mood: 'raw' },
    '@jadekim': { name: 'Jade Kim', avatar: '📸', verified: true, followers: '23.4K', zone: 'Explore', bio: 'Photographer. Wanderer.', liveFreq: 'Weekly', lastLive: '20m ago', isLive: true, streamTitle: 'Sunset from my rooftop — Tokyo 🌅', viewers: 421, mood: 'ambient' },
  };

  // ═══ NOTIFICATIONS DATA ═══
  const notifications = [
    // Live alerts (highest priority)
    { id: 'n1', type: 'live', creator: '@mayachen', time: '2m ago', priority: 'high',
      title: 'Maya Chen is live!', body: 'Painting to lo-fi — come chill', viewers: 312,
      actionLabel: 'Watch Now', actionColor: T.red },
    { id: 'n2', type: 'live', creator: '@samtorres', time: '45m ago', priority: 'high',
      title: 'Sam Torres is live!', body: 'Creator Roundtable: How ownership changes everything', viewers: 189,
      actionLabel: 'Join Room', actionColor: T.orange },
    { id: 'n3', type: 'live', creator: '@jordanblake', time: '32m ago', priority: 'high',
      title: 'Jordan Blake is live!', body: "I quit my 6-figure job for OURS — here's what happened", viewers: 534,
      actionLabel: 'Watch Now', actionColor: T.red },

    // Tips
    { id: 'n4', type: 'tip', time: '15m ago', priority: 'high',
      title: 'You received a tip!', body: 'Maya Chen tipped you 5.0 HOURS on your article "The Future of..."',
      icon: '⏣', color: T.gold, amount: 5.0 },
    { id: 'n5', type: 'tip', time: '2h ago', priority: 'medium',
      title: '3 tips on your last stream', body: 'Luna Nova (10 HRS), Dev Patel (5 HRS), Jade Kim (2 HRS)',
      icon: '⏣', color: T.gold, amount: 17.0 },

    // Engagement
    { id: 'n6', type: 'like', time: '20m ago', priority: 'low',
      title: '89 new likes', body: 'Your post "Hot take: The reason social media feels broken..." is trending 🔥',
      icon: '❤️', color: T.red, count: 89 },
    { id: 'n7', type: 'comment', time: '35m ago', priority: 'medium',
      title: 'Alex Rivera replied', body: '"This perfectly captures why I moved here. The incentive shift changes everything."',
      icon: '💬', color: T.primary, creator: '@alexrivera' },
    { id: 'n8', type: 'mention', time: '1h ago', priority: 'medium',
      title: 'Sam Torres mentioned you', body: 'In audio room "Building in Public — Creator Stories"',
      icon: '🔊', color: T.orange, creator: '@samtorres' },

    // Governance
    { id: 'n9', type: 'governance', time: '2h ago', priority: 'medium',
      title: 'Proposal #47 update', body: 'Community Vote on "slow feed" mode — quorum reached! 19,370 votes cast.',
      icon: '🗳️', color: T.gold },
    { id: 'n10', type: 'governance', time: '3h ago', priority: 'low',
      title: 'Your vote was counted', body: 'Proposal #47: You voted "Optional toggle only" — currently leading at 46%',
      icon: '✅', color: T.accent },

    // Milestones
    { id: 'n11', type: 'milestone', time: '4h ago', priority: 'medium',
      title: 'Milestone unlocked! 🎉', body: "You've earned 100 HOURS total on OURS. Keep creating, keep earning.*",
      icon: '🏆', color: T.gold },

    // Following activity
    { id: 'n12', type: 'content', creator: '@drsarahliu', time: '5h ago', priority: 'low',
      title: 'Dr. Sarah Liu published', body: '"The Ownership Effect: How Platform Equity Changes Creator Behavior" — 12 min read',
      icon: '📝', color: T.cyan },
    { id: 'n13', type: 'follow', time: '6h ago', priority: 'low',
      title: '12 new followers', body: 'Including Dr. Sarah Liu and 11 others',
      icon: '👥', color: T.purple, count: 12 },

    // Upcoming
    { id: 'n14', type: 'upcoming', creator: '@alexrivera', time: '8h ago', priority: 'low',
      title: 'Reminder: Alex Rivera goes live tomorrow', body: '"Behind the lens — a filmmaker\'s process" at 2:00 PM',
      icon: '🔔', color: T.primary, scheduledTime: 'Tomorrow, 2:00 PM' },

    // System
    { id: 'n15', type: 'system', time: '1d ago', priority: 'low',
      title: 'Weekly Digest', body: 'You earned 42.5 HOURS this week (+18% vs last week). Your top post reached 89.2K views.',
      icon: '📊', color: T.primary },
  ];

  const filterTypes = [
    { id: 'all', label: 'All', icon: '📬' },
    { id: 'live', label: 'Live', icon: '🔴' },
    { id: 'tip', label: 'Tips', icon: '⏣' },
    { id: 'engagement', label: 'Social', icon: '💬', types: ['like', 'comment', 'mention', 'follow'] },
    { id: 'governance', label: 'Govern', icon: '🗳️' },
    { id: 'content', label: 'Content', icon: '📝', types: ['content', 'upcoming'] },
  ];

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => {
        const filter = filterTypes.find(f => f.id === activeFilter);
        if (filter.types) return filter.types.includes(n.type);
        return n.type === activeFilter;
      });

  const unreadCount = notifications.filter(n => !readNotifs[n.id]).length;

  const markRead = (id) => setReadNotifs(prev => ({ ...prev, [id]: true }));
  const markAllRead = () => {
    const all = {};
    notifications.forEach(n => all[n.id] = true);
    setReadNotifs(all);
  };

  const toggleSubPref = (handle, key) => {
    setSubscriptions(prev => ({
      ...prev,
      [handle]: { ...prev[handle], [key]: !prev[handle]?.[key] }
    }));
  };

  const setSubTier = (handle, tier) => {
    setSubscriptions(prev => ({
      ...prev,
      [handle]: { ...prev[handle], tier }
    }));
  };

  // ═══ STYLES ═══
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
    @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes slideRight { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes livePulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); } 50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(14,165,233,0.2); } 50% { box-shadow: 0 0 20px rgba(14,165,233,0.4); } }
    @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.02); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes bannerSlide { from { transform: translateY(-100%); } to { transform: translateY(0); } }
    @keyframes ring { 0% { transform: rotate(0deg); } 10% { transform: rotate(15deg); } 20% { transform: rotate(-15deg); } 30% { transform: rotate(10deg); } 40% { transform: rotate(-10deg); } 50% { transform: rotate(0deg); } 100% { transform: rotate(0deg); } }
    button { cursor: pointer; font-family: 'Outfit', sans-serif; }
    button:hover:not(:disabled) { filter: brightness(1.06); }
  `;

  // ═══ LIVE BANNER (top of screen when someone goes live) ═══
  const LiveBanner = () => {
    const liveCreators = Object.entries(creators).filter(([handle, c]) =>
      c.isLive && subscriptions[handle]?.notify && !dismissedBanners[handle]
    );

    if (liveCreators.length === 0) return null;
    const [handle, creator] = liveCreators[0]; // Show most recent

    return (
      <div style={{
        position: 'sticky', top: 0, zIndex: 60,
        animation: 'bannerSlide 0.4s ease',
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${T.red}20, ${T.orange}15)`,
          borderBottom: `1px solid ${T.red}30`,
          backdropFilter: 'blur(20px)',
          padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {/* Live indicator */}
          <div style={{
            width: 42, height: 42, borderRadius: 12, position: 'relative',
            background: T.card, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 20, flexShrink: 0,
            border: `2px solid ${T.red}60`,
          }}>
            {creator.avatar}
            <div style={{
              position: 'absolute', top: -3, right: -3, width: 14, height: 14,
              borderRadius: '50%', background: T.red, border: `2px solid ${T.bg}`,
              animation: 'livePulse 2s infinite',
            }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f() }}>{creator.name}</span>
              {creator.verified && <span style={{ fontSize: 8, color: T.primary }}>✓</span>}
              <span style={{
                fontSize: 9, fontWeight: 700, color: T.red, fontFamily: f('mono'),
                background: `${T.red}20`, padding: '1px 6px', borderRadius: 4,
              }}>LIVE</span>
            </div>
            <div style={{
              fontSize: 11, color: T.sub, fontFamily: f(), marginTop: 1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{creator.streamTitle}</div>
            <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 2 }}>
              👁️ {creator.viewers} watching
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button style={{
              padding: '8px 14px', borderRadius: 10, border: 'none',
              background: T.red, fontSize: 11, fontWeight: 700,
              color: '#fff', fontFamily: f(),
            }}>Watch</button>
            <button onClick={() => setDismissedBanners(prev => ({ ...prev, [handle]: true }))} style={{
              width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`,
              background: 'rgba(0,0,0,0.3)', fontSize: 12, color: T.dim,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>
        </div>

        {/* Additional live creators count */}
        {liveCreators.length > 1 && (
          <div style={{
            padding: '4px 14px', background: `${T.surface}ee`,
            borderBottom: `1px solid ${T.border}`,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{ display: 'flex', gap: -4 }}>
              {liveCreators.slice(1, 4).map(([h, c]) => (
                <div key={h} style={{
                  width: 20, height: 20, borderRadius: '50%', background: T.card,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, border: `2px solid ${T.bg}`, marginLeft: -4,
                }}>{c.avatar}</div>
              ))}
            </div>
            <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>
              +{liveCreators.length - 1} more creators are live
            </span>
          </div>
        )}
      </div>
    );
  };

  // ═══ NOTIFICATION CARD ═══
  const NotificationCard = ({ notif, index }) => {
    const isRead = readNotifs[notif.id];
    const isExpanded = expandedNotif === notif.id;
    const creator = notif.creator ? creators[notif.creator] : null;
    const sub = notif.creator ? subscriptions[notif.creator] : null;

    const typeStyles = {
      live: { accent: T.red, bg: `${T.red}08`, icon: '🔴', borderColor: `${T.red}25` },
      tip: { accent: T.gold, bg: `${T.gold}06`, icon: notif.icon || '⏣', borderColor: `${T.gold}20` },
      like: { accent: T.red, bg: 'transparent', icon: '❤️', borderColor: T.border },
      comment: { accent: T.primary, bg: 'transparent', icon: '💬', borderColor: T.border },
      mention: { accent: T.orange, bg: `${T.orange}05`, icon: '🔊', borderColor: `${T.orange}15` },
      governance: { accent: T.gold, bg: `${T.gold}05`, icon: notif.icon || '🗳️', borderColor: `${T.gold}15` },
      milestone: { accent: T.gold, bg: `${T.gold}06`, icon: '🏆', borderColor: `${T.gold}20` },
      content: { accent: T.cyan, bg: 'transparent', icon: notif.icon || '📝', borderColor: T.border },
      follow: { accent: T.purple, bg: 'transparent', icon: '👥', borderColor: T.border },
      upcoming: { accent: T.primary, bg: `${T.primary}05`, icon: '🔔', borderColor: `${T.primary}15` },
      system: { accent: T.primary, bg: 'transparent', icon: '📊', borderColor: T.border },
    };

    const style = typeStyles[notif.type] || typeStyles.system;

    return (
      <div
        onClick={() => {
          markRead(notif.id);
          setExpandedNotif(isExpanded ? null : notif.id);
        }}
        style={{
          padding: '12px 14px', borderRadius: 14,
          background: isRead ? 'transparent' : style.bg,
          border: `1px solid ${isRead ? T.border : style.borderColor}`,
          cursor: 'pointer', transition: 'all 0.2s',
          animation: `slideUp 0.3s ease ${index * 0.04}s both`,
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Unread dot */}
        {!isRead && (
          <div style={{
            position: 'absolute', top: 14, left: 6, width: 6, height: 6,
            borderRadius: '50%', background: style.accent,
          }} />
        )}

        <div style={{ display: 'flex', gap: 10, marginLeft: isRead ? 0 : 10 }}>
          {/* Icon / Avatar */}
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: notif.type === 'live' ? `${T.red}15` : T.card,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            border: notif.type === 'live' ? `2px solid ${T.red}40` : `1px solid ${T.border}`,
            ...(notif.type === 'live' ? { animation: 'livePulse 2s infinite' } : {}),
          }}>
            {creator ? creator.avatar : style.icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: T.text, fontFamily: f(),
              lineHeight: 1.3, marginBottom: 2,
            }}>{notif.title}</div>
            <div style={{
              fontSize: 11, color: T.sub, fontFamily: f(), lineHeight: 1.4,
              ...(isExpanded ? {} : {
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }),
            }}>{notif.body}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>{notif.time}</span>
              {notif.amount && (
                <span style={{ fontSize: 10, color: T.gold, fontFamily: f('mono'), fontWeight: 600 }}>
                  +{notif.amount} HRS
                </span>
              )}
              {notif.viewers && (
                <span style={{ fontSize: 10, color: T.dim, fontFamily: f('mono') }}>
                  👁️ {notif.viewers}
                </span>
              )}
            </div>
          </div>

          {/* Action button for live */}
          {notif.type === 'live' && (
            <button style={{
              padding: '6px 12px', borderRadius: 8, border: 'none',
              background: notif.actionColor || T.red,
              fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: f(),
              alignSelf: 'center', whiteSpace: 'nowrap',
            }}>{notif.actionLabel || 'Watch'}</button>
          )}

          {/* Upcoming reminder */}
          {notif.type === 'upcoming' && notif.scheduledTime && (
            <div style={{
              padding: '4px 8px', borderRadius: 6, alignSelf: 'center',
              background: `${T.primary}10`, border: `1px solid ${T.primary}20`,
            }}>
              <span style={{ fontSize: 9, color: T.primary, fontFamily: f('mono') }}>{notif.scheduledTime}</span>
            </div>
          )}
        </div>

        {/* Expanded: subscription management */}
        {isExpanded && notif.creator && (
          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`,
            animation: 'slideUp 0.2s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(), letterSpacing: 1, textTransform: 'uppercase' }}>
                Notification settings for {creator?.name}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[
                { key: 'push', label: '📱 Push', desc: 'Phone notification' },
                { key: 'sms', label: '💬 SMS', desc: 'Text message' },
                { key: 'inApp', label: '🔔 In-App', desc: 'Notification center' },
              ].map(pref => (
                <button key={pref.key} onClick={(e) => { e.stopPropagation(); toggleSubPref(notif.creator, pref.key); }} style={{
                  padding: '6px 12px', borderRadius: 8,
                  background: sub?.[pref.key] ? `${T.primary}15` : T.card,
                  border: `1px solid ${sub?.[pref.key] ? T.primary + '40' : T.border}`,
                  fontSize: 10, fontWeight: 600, fontFamily: f(),
                  color: sub?.[pref.key] ? T.primary : T.dim,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>{pref.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ═══ SUBSCRIBE SHEET ═══
  const SubscribeSheet = () => {
    const handle = showSubscribeSheet;
    if (!handle) return null;
    const creator = creators[handle];
    const sub = subscriptions[handle] || {};

    const notifyTiers = [
      { id: 'all', label: 'Everything', desc: 'Live streams, posts, articles, products, audio rooms', icon: '🔔' },
      { id: 'live', label: 'Live Only', desc: 'Only when they go live', icon: '🔴' },
      { id: 'content', label: 'Content Only', desc: 'Posts, articles, videos — no live alerts', icon: '📝' },
      { id: 'none', label: 'Following Only', desc: "See their content in your feed, no notifications", icon: '👁️' },
    ];

    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div onClick={() => setShowSubscribeSheet(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
        <div style={{
          position: 'relative', width: '100%', maxWidth: 440,
          background: T.surface, borderRadius: '20px 20px 0 0',
          border: `1px solid ${T.border}`, padding: 20,
          maxHeight: '85vh', overflowY: 'auto',
          animation: 'slideUp 0.3s ease',
        }}>
          {/* Creator header */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: T.card, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 26, border: `2px solid ${T.border}`,
            }}>{creator?.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: f() }}>{creator?.name}</span>
                {creator?.verified && <span style={{ fontSize: 10, color: T.primary }}>✓</span>}
              </div>
              <span style={{ fontSize: 11, color: T.sub, fontFamily: f() }}>{handle} · {creator?.followers} followers</span>
              {creator?.isLive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.red, animation: 'pulse 1.5s infinite' }} />
                  <span style={{ fontSize: 10, color: T.red, fontFamily: f('mono'), fontWeight: 600 }}>Live now · {creator.viewers} watching</span>
                </div>
              )}
            </div>
            <button onClick={() => {
              setSubscriptions(prev => ({
                ...prev,
                [handle]: { ...prev[handle], following: !prev[handle]?.following }
              }));
            }} style={{
              padding: '8px 16px', borderRadius: 10,
              border: `1px solid ${sub.following ? T.border : T.primary}`,
              background: sub.following ? T.card : `${T.primary}15`,
              fontSize: 12, fontWeight: 700,
              color: sub.following ? T.sub : T.primary, fontFamily: f(),
            }}>{sub.following ? '✓ Following' : 'Follow'}</button>
          </div>

          {/* Notification tier */}
          <div style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
            }}>What to notify me about</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {notifyTiers.map(tier => (
                <button key={tier.id} onClick={() => setSubTier(handle, tier.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 12, textAlign: 'left',
                  background: sub.tier === tier.id ? `${T.primary}10` : T.card,
                  border: `1px solid ${sub.tier === tier.id ? T.primary + '40' : T.border}`,
                  transition: 'all 0.2s',
                }}>
                  <span style={{ fontSize: 18 }}>{tier.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: sub.tier === tier.id ? T.primary : T.text, fontFamily: f() }}>{tier.label}</div>
                    <div style={{ fontSize: 10, color: T.dim, fontFamily: f(), marginTop: 1 }}>{tier.desc}</div>
                  </div>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    border: `2px solid ${sub.tier === tier.id ? T.primary : T.dim}`,
                    background: sub.tier === tier.id ? T.primary : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {sub.tier === tier.id && <span style={{ fontSize: 10, color: '#fff' }}>✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery method */}
          {sub.tier !== 'none' && (
            <div style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
                letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
              }}>How to reach me</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { key: 'push', icon: '📱', label: 'Push Notification', desc: 'Instant alert on your phone', alwaysAvailable: true },
                  { key: 'sms', icon: '💬', label: 'SMS Text Message', desc: `Sent to ${globalPrefs.phoneNumber}`, note: 'Standard messaging rates may apply' },
                  { key: 'inApp', icon: '🔔', label: 'In-App Notification', desc: 'Shows in your notification center', alwaysAvailable: true },
                ].map(method => (
                  <div key={method.key} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', borderRadius: 12,
                    background: T.card, border: `1px solid ${T.border}`,
                  }}>
                    <span style={{ fontSize: 18 }}>{method.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{method.label}</div>
                      <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{method.desc}</div>
                      {method.note && (
                        <div style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), marginTop: 2 }}>{method.note}</div>
                      )}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); toggleSubPref(handle, method.key); }} style={{
                      width: 44, height: 24, borderRadius: 12, border: 'none',
                      background: sub[method.key] ? T.accent : T.elevated,
                      position: 'relative', transition: 'background 0.2s',
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: '50%', background: '#fff',
                        position: 'absolute', top: 3,
                        left: sub[method.key] ? 23 : 3,
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live frequency info */}
          {creator?.liveFreq && (
            <div style={{
              padding: '8px 12px', borderRadius: 10,
              background: `${T.primary}06`, border: `1px solid ${T.primary}12`,
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              <span style={{ fontSize: 14 }}>📡</span>
              <div>
                <span style={{ fontSize: 10, color: T.sub, fontFamily: f() }}>
                  {creator.name} typically goes live <strong style={{ color: T.primary }}>{creator.liveFreq}</strong>
                </span>
                <div style={{ fontSize: 9, color: T.dim, fontFamily: f('mono'), marginTop: 2 }}>Last live: {creator.lastLive}</div>
              </div>
            </div>
          )}

          <button onClick={() => setShowSubscribeSheet(null)} style={{
            width: '100%', padding: 14, borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: f(),
          }}>Save Preferences</button>
        </div>
      </div>
    );
  };

  // ═══ GLOBAL PREFERENCES ═══
  const PreferencesSheet = () => showPreferences && (
    <div style={{ position: 'fixed', inset: 0, zIndex: 90, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <div onClick={() => setShowPreferences(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: 440,
        background: T.surface, borderRadius: '20px 20px 0 0',
        border: `1px solid ${T.border}`, padding: 20,
        maxHeight: '85vh', overflowY: 'auto',
        animation: 'slideUp 0.3s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.text, fontFamily: f() }}>Notification Preferences</span>
          <button onClick={() => setShowPreferences(false)} style={{
            background: 'none', border: 'none', fontSize: 18, color: T.dim,
          }}>✕</button>
        </div>

        {/* Notify me about */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
          }}>Notify me about</div>
          {[
            { key: 'liveAlerts', icon: '🔴', label: 'Live Alerts', desc: 'When creators I follow go live' },
            { key: 'tipsReceived', icon: '⏣', label: 'Tips Received', desc: 'When someone tips me HOURS' },
            { key: 'comments', icon: '💬', label: 'Comments & Replies', desc: 'Responses to my posts and comments' },
            { key: 'mentions', icon: '🔊', label: 'Mentions', desc: 'When someone mentions me' },
            { key: 'governance', icon: '🗳️', label: 'Governance', desc: 'Proposals, votes, and results' },
            { key: 'milestones', icon: '🏆', label: 'Milestones', desc: 'Achievement and earning milestones' },
            { key: 'weeklyDigest', icon: '📊', label: 'Weekly Digest', desc: 'Summary of your week on OURS' },
          ].map(pref => (
            <div key={pref.key} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{pref.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{pref.label}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{pref.desc}</div>
              </div>
              <button onClick={() => setGlobalPrefs(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))} style={{
                width: 44, height: 24, borderRadius: 12, border: 'none',
                background: globalPrefs[pref.key] ? T.accent : T.elevated,
                position: 'relative', transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: 3,
                  left: globalPrefs[pref.key] ? 23 : 3,
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Delivery channels */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
          }}>Delivery Channels</div>
          {[
            { key: 'pushEnabled', icon: '📱', label: 'Push Notifications', desc: 'Mobile app alerts' },
            { key: 'smsEnabled', icon: '💬', label: 'SMS Alerts', desc: `${globalPrefs.phoneNumber} · Standard rates apply` },
            { key: 'emailDigest', icon: '📧', label: 'Email Digest', desc: 'Weekly summary email' },
          ].map(pref => (
            <div key={pref.key} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
              borderBottom: `1px solid ${T.border}`,
            }}>
              <span style={{ fontSize: 16, width: 24, textAlign: 'center' }}>{pref.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>{pref.label}</div>
                <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>{pref.desc}</div>
              </div>
              <button onClick={() => setGlobalPrefs(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))} style={{
                width: 44, height: 24, borderRadius: 12, border: 'none',
                background: globalPrefs[pref.key] ? T.accent : T.elevated,
                position: 'relative', transition: 'background 0.2s',
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: 3,
                  left: globalPrefs[pref.key] ? 23 : 3,
                  transition: 'left 0.2s',
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Quiet Hours */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
          }}>Quiet Hours</div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
            borderRadius: 12, background: T.card, border: `1px solid ${T.border}`,
          }}>
            <span style={{ fontSize: 18 }}>🌙</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.text, fontFamily: f() }}>Do Not Disturb</div>
              <div style={{ fontSize: 10, color: T.dim, fontFamily: f() }}>
                {globalPrefs.quietHours ? `${globalPrefs.quietStart} — ${globalPrefs.quietEnd}` : 'No quiet hours set'}
              </div>
            </div>
            <button onClick={() => setGlobalPrefs(prev => ({ ...prev, quietHours: !prev.quietHours }))} style={{
              width: 44, height: 24, borderRadius: 12, border: 'none',
              background: globalPrefs.quietHours ? T.accent : T.elevated,
              position: 'relative', transition: 'background 0.2s',
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                position: 'absolute', top: 3,
                left: globalPrefs.quietHours ? 23 : 3,
                transition: 'left 0.2s',
              }} />
            </button>
          </div>
        </div>

        {/* Sound & haptics */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
          }}>Sound & Haptics</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { key: 'soundEnabled', icon: '🔊', label: 'Sound' },
              { key: 'vibrate', icon: '📳', label: 'Vibrate' },
              { key: 'showPreviews', icon: '👁️', label: 'Preview' },
            ].map(pref => (
              <button key={pref.key} onClick={() => setGlobalPrefs(prev => ({ ...prev, [pref.key]: !prev[pref.key] }))} style={{
                flex: 1, padding: '10px', borderRadius: 12, textAlign: 'center',
                background: globalPrefs[pref.key] ? `${T.primary}12` : T.card,
                border: `1px solid ${globalPrefs[pref.key] ? T.primary + '30' : T.border}`,
              }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{pref.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: globalPrefs[pref.key] ? T.primary : T.dim, fontFamily: f() }}>{pref.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ SUBSCRIPTIONS LIST ═══
  const SubscriptionsList = () => (
    <div style={{ padding: '0 16px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Your Subscriptions</span>
        <span style={{ fontSize: 10, color: T.primary, fontFamily: f(), fontWeight: 600, cursor: 'pointer' }}>Manage all</span>
      </div>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {Object.entries(creators).filter(([h]) => subscriptions[h]?.following).map(([handle, creator], i) => (
          <div key={handle} onClick={() => setShowSubscribeSheet(handle)} style={{
            minWidth: 100, padding: '10px', borderRadius: 14,
            background: T.surface, border: `1px solid ${creator.isLive ? T.red + '40' : T.border}`,
            textAlign: 'center', cursor: 'pointer',
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
            position: 'relative',
          }}>
            {creator.isLive && (
              <div style={{
                position: 'absolute', top: 6, right: 6,
                width: 8, height: 8, borderRadius: '50%', background: T.red,
                animation: 'pulse 1.5s infinite',
              }} />
            )}
            <div style={{
              width: 40, height: 40, borderRadius: 12, margin: '0 auto 6px',
              background: T.card, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 20,
              border: `2px solid ${creator.isLive ? T.red + '60' : T.border}`,
            }}>{creator.avatar}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.text, fontFamily: f(), marginBottom: 2 }}>{creator.name.split(' ')[0]}</div>
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              {subscriptions[handle]?.push && <span style={{ fontSize: 8 }}>📱</span>}
              {subscriptions[handle]?.sms && <span style={{ fontSize: 8 }}>💬</span>}
              {subscriptions[handle]?.inApp && <span style={{ fontSize: 8 }}>🔔</span>}
            </div>
            {creator.isLive && (
              <div style={{
                marginTop: 4, fontSize: 8, color: T.red, fontFamily: f('mono'), fontWeight: 700,
              }}>● LIVE</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // ═══ NOTIFICATION CENTER ═══
  const NotificationCenter = () => (
    <div style={{ maxWidth: 440, margin: '0 auto', minHeight: '100vh' }}>
      {/* Live banners */}
      <LiveBanner />

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.border}`, padding: '12px 16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <span style={{ fontSize: 18, fontWeight: 800, color: T.text, fontFamily: f() }}>Notifications</span>
            {unreadCount > 0 && (
              <span style={{
                marginLeft: 8, padding: '2px 8px', borderRadius: 8,
                background: `${T.red}20`, fontSize: 11, fontWeight: 700,
                color: T.red, fontFamily: f('mono'),
              }}>{unreadCount} new</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={markAllRead} style={{
              padding: '6px 12px', borderRadius: 8, border: `1px solid ${T.border}`,
              background: T.surface, fontSize: 10, fontWeight: 600,
              color: T.sub, fontFamily: f(),
            }}>Mark all read</button>
            <button onClick={() => setShowPreferences(true)} style={{
              width: 34, height: 34, borderRadius: 10, border: `1px solid ${T.border}`,
              background: T.surface, fontSize: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>⚙️</button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {filterTypes.map(filter => {
            const count = filter.id === 'all'
              ? notifications.length
              : notifications.filter(n => filter.types ? filter.types.includes(n.type) : n.type === filter.id).length;
            return (
              <button key={filter.id} onClick={() => setActiveFilter(filter.id)} style={{
                padding: '5px 10px', borderRadius: 8, border: 'none', whiteSpace: 'nowrap',
                background: activeFilter === filter.id ? `${T.primary}15` : T.surface,
                border: `1px solid ${activeFilter === filter.id ? T.primary + '40' : T.border}`,
                fontSize: 11, fontWeight: 600, fontFamily: f(),
                color: activeFilter === filter.id ? T.primary : T.dim,
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ fontSize: 11 }}>{filter.icon}</span>
                {filter.label}
                <span style={{
                  fontSize: 9, fontFamily: f('mono'),
                  color: activeFilter === filter.id ? T.primary : T.dim,
                  opacity: 0.6,
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subscriptions bar */}
      <div style={{ paddingTop: 12 }}>
        <SubscriptionsList />
      </div>

      {/* Notifications list */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 6, paddingBottom: 40 }}>
        {/* Today section */}
        <div style={{
          fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
          letterSpacing: 1.5, textTransform: 'uppercase', padding: '8px 0 4px',
        }}>Today</div>
        {filteredNotifications.filter(n => !n.time.includes('d')).map((notif, i) => (
          <NotificationCard key={notif.id} notif={notif} index={i} />
        ))}

        {/* Earlier section */}
        {filteredNotifications.some(n => n.time.includes('d')) && (
          <>
            <div style={{
              fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: f(),
              letterSpacing: 1.5, textTransform: 'uppercase', padding: '12px 0 4px',
            }}>Earlier</div>
            {filteredNotifications.filter(n => n.time.includes('d')).map((notif, i) => (
              <NotificationCard key={notif.id} notif={notif} index={i + 10} />
            ))}
          </>
        )}

        {filteredNotifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔕</div>
            <div style={{ fontSize: 13, color: T.sub, fontFamily: f() }}>No notifications in this category</div>
          </div>
        )}
      </div>

      {/* Disclaimers */}
      <div style={{ padding: '10px 16px 20px' }}>
        <p style={{ fontSize: 8, color: T.dim, fontFamily: f('mono'), lineHeight: 1.5, textAlign: 'center' }}>
          *All HOURS values shown are illustrative, not guaranteed. HOURS are not cryptocurrency, securities, or fiat currency. SMS notifications use standard carrier messaging rates. Notification delivery depends on device settings and network availability.
        </p>
      </div>
    </div>
  );

  // ═══ MAIN RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <style>{globalStyles}</style>
      <NotificationCenter />
      <SubscribeSheet />
      <PreferencesSheet />
    </div>
  );
};

export default OursNotifications;
