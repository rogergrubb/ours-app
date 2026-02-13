import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// OURS — UNIVERSAL CREATOR
// "The Candy Store of Creation"
// Every content type. Every zone. One beautiful flow.
// Post → Video → Article → Community → Product → Audio → Proposal
// ═══════════════════════════════════════════════════════════════

const OursCreator = () => {
  const [view, setView] = useState('picker'); // picker | compose | preview | success
  const [contentType, setContentType] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);

  // Post state
  const [postText, setPostText] = useState('');
  const [postMedia, setPostMedia] = useState([]);
  const [postPoll, setPostPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [postScheduled, setPostScheduled] = useState(false);

  // Article state
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [articleTags, setArticleTags] = useState([]);
  const [articleCover, setArticleCover] = useState(false);

  // Video state
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoType, setVideoType] = useState('short'); // short | long | live
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(false);

  // Product state
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productFiles, setProductFiles] = useState(false);

  // Community state
  const [communityTarget, setCommunityTarget] = useState('');
  const [communityText, setCommunityText] = useState('');
  const [communityType, setCommunityType] = useState('discussion'); // discussion | question | event | poll

  // Audio state
  const [audioTitle, setAudioTitle] = useState('');
  const [audioDesc, setAudioDesc] = useState('');
  const [audioType, setAudioType] = useState('room'); // room | podcast | playlist

  // Governance state
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalBody, setProposalBody] = useState('');
  const [proposalCategory, setProposalCategory] = useState('');
  const [proposalOptions, setProposalOptions] = useState(['', '', '']);

  // Challenge state
  const [challengeEntry, setChallengeEntry] = useState('');
  const [challengeMedia, setChallengeMedia] = useState(false);

  // Explore state
  const [exploreCaption, setExploreCaption] = useState('');
  const [exploreMedia, setExploreMedia] = useState([]);
  const [exploreCollection, setExploreCollection] = useState('');

  useEffect(() => { setMounted(true); }, []);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', glow: 'rgba(14,165,233,0.08)',
    primary: '#0ea5e9', accent: '#10b981', gold: '#fbbf24', red: '#ef4444',
    purple: '#a78bfa', pink: '#f472b6', orange: '#fb923c', cyan: '#22d3ee',
    text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const contentTypes = [
    {
      id: 'post', icon: '📝', title: 'Quick Post', desc: 'Text, photos, polls — the everyday share',
      gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', zone: 'Feed',
      earnings: '+0.2–2.0 HRS based on engagement*', color: T.primary,
    },
    {
      id: 'video', icon: '🎬', title: 'Video', desc: 'Shorts, long-form, or go live',
      gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', zone: 'Watch',
      earnings: '+0.3/min watched by others*', color: '#8b5cf6',
    },
    {
      id: 'article', icon: '📰', title: 'Article', desc: 'Long-form writing that earns forever',
      gradient: 'linear-gradient(135deg, #0ea5e9, #0891b2)', zone: 'Read',
      earnings: '+0.8 HRS per reader*', color: '#0891b2',
    },
    {
      id: 'community', icon: '🏛️', title: 'Community Post', desc: 'Discussions, questions, events for your groups',
      gradient: 'linear-gradient(135deg, #10b981, #059669)', zone: 'Community',
      earnings: '+0.2 HRS per engagement*', color: T.accent,
    },
    {
      id: 'product', icon: '🛍️', title: 'Product', desc: 'Courses, templates, digital goods — keep ~95%',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)', zone: 'Shop',
      earnings: 'Keep up to ~95% of every sale*', color: T.orange,
    },
    {
      id: 'explore', icon: '✨', title: 'Visual Post', desc: 'Photos, infographics, moodboards for discovery',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)', zone: 'Explore',
      earnings: '+0.1 HRS per save*', color: T.pink,
    },
    {
      id: 'audio', icon: '🎙️', title: 'Audio', desc: 'Start a room, upload a podcast, make a playlist',
      gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', zone: 'Listen',
      earnings: '+0.2 HRS per listener*', color: T.purple,
    },
    {
      id: 'proposal', icon: '🗳️', title: 'Governance Proposal', desc: 'Propose changes to the platform',
      gradient: 'linear-gradient(135deg, #0891b2, #0e7490)', zone: 'Govern',
      earnings: '+2.0 HRS if proposal passes*', color: T.cyan,
    },
    {
      id: 'challenge', icon: '🏆', title: 'Challenge Entry', desc: 'Submit to active challenges and competitions',
      gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', zone: 'Arena',
      earnings: 'Up to 50x HRS bonus*', color: T.gold,
    },
  ];

  // Mock data
  const myGroups = [
    { id: 'g1', name: 'Indie Hackers Bay Area', icon: '🚀' },
    { id: 'g2', name: 'AI Builders Club', icon: '🤖' },
    { id: 'g3', name: 'Solopreneur Kitchen', icon: '🍕' },
    { id: 'g4', name: 'Creative Writing Circle', icon: '✍️' },
  ];

  const activeChallenges = [
    { id: 'c1', name: '7-Day Content Challenge', reward: '+50 HRS', deadline: '3 days' },
    { id: 'c2', name: 'Best Tutorial of the Week', reward: '+100 HRS', deadline: '5 days' },
    { id: 'c3', name: 'Price Tag Challenge', reward: '+25 HRS', deadline: '1 day' },
  ];

  const categories = ['Education', 'Fitness', 'Design', 'Marketing', 'Food', 'Wellness', 'Tech', 'Music', 'Business', 'Art'];
  const govCategories = ['Feature Request', 'Policy Change', 'Moderation Rules', 'Revenue Model', 'Community Standards', 'Platform Design'];

  const tagSuggestions = ['AI', 'Creator Economy', 'Tutorial', 'Opinion', 'Guide', 'Personal', 'Business', 'Tech', 'Health', 'Finance'];

  // ═══ SHARED COMPONENTS ═══

  const TopBar = ({ title, onBack, right }) => (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100, padding: '12px 16px',
      background: `${T.bg}ee`, backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${T.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && <button onClick={onBack} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 20, cursor: 'pointer', padding: 0 }}>←</button>}
        <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.text }}>{title}</span>
      </div>
      {right}
    </div>
  );

  const Input = ({ label, placeholder, value, onChange, multiline = false, rows = 1, maxLength, helper }) => (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>{label}</span>
          {maxLength && <span style={{ fontWeight: 400, color: T.dim }}>{(value || '').length}/{maxLength}</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          rows={rows} maxLength={maxLength}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: `1px solid ${T.border}`, background: T.surface,
            color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif",
            outline: 'none', resize: 'vertical', minHeight: rows * 24 + 28,
            lineHeight: 1.6,
          }}
        />
      ) : (
        <input
          placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          maxLength={maxLength}
          style={{
            width: '100%', padding: '14px 16px', borderRadius: 14,
            border: `1px solid ${T.border}`, background: T.surface,
            color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif",
            outline: 'none',
          }}
        />
      )}
      {helper && <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", marginTop: 4, paddingLeft: 2 }}>{helper}</div>}
    </div>
  );

  const MediaUpload = ({ label = 'Add Media', multiple = true, uploaded, onUpload, accept = 'image' }) => (
    <div onClick={() => onUpload(true)} style={{
      border: `2px dashed ${uploaded ? T.accent : T.border}`,
      borderRadius: 16, padding: uploaded ? '12px 16px' : '28px 16px',
      textAlign: 'center', cursor: 'pointer', marginBottom: 16,
      background: uploaded ? `${T.accent}06` : 'transparent',
      transition: 'all 0.2s',
    }}>
      {uploaded ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>{accept === 'video' ? '🎬' : accept === 'audio' ? '🎙️' : '📎'}</span>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: T.accent }}>File uploaded ✓</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Tap to change</div>
          </div>
          <span style={{ fontSize: 10, color: T.dim }}>✕</span>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{accept === 'video' ? '🎬' : accept === 'audio' ? '🎙️' : '📸'}</div>
          <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: T.sub }}>{label}</div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", marginTop: 2 }}>
            {accept === 'video' ? 'MP4, MOV up to 2GB' : accept === 'audio' ? 'MP3, WAV up to 500MB' : 'JPG, PNG, GIF up to 20MB'}
          </div>
        </>
      )}
    </div>
  );

  const ChipSelect = ({ options, selected, onSelect, multi = false, color = T.primary }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
      {options.map(opt => {
        const isObj = typeof opt === 'object';
        const val = isObj ? opt.id : opt;
        const label = isObj ? (opt.icon ? `${opt.icon} ${opt.name}` : opt.name) : opt;
        const sel = multi ? (selected || []).includes(val) : selected === val;
        return (
          <button key={val} onClick={() => {
            if (multi) {
              onSelect(sel ? selected.filter(s => s !== val) : [...(selected || []), val]);
            } else {
              onSelect(val);
            }
          }} style={{
            padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
            background: sel ? `${color}18` : T.surface,
            border: `1px solid ${sel ? `${color}50` : T.border}`,
            color: sel ? color : T.dim,
            transition: 'all 0.15s',
          }}>{label}</button>
        );
      })}
    </div>
  );

  const EarningsPreview = ({ type }) => {
    const ct = contentTypes.find(c => c.id === type);
    if (!ct) return null;
    return (
      <div style={{
        background: `${ct.color}08`, border: `1px solid ${ct.color}18`,
        borderRadius: 14, padding: '10px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>{ct.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: ct.color }}>Potential Earnings</div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{ct.earnings}</div>
        </div>
        <button onClick={() => setShowEarnings(!showEarnings)} style={{
          background: 'none', border: 'none', fontSize: 10, color: T.primary,
          cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600,
        }}>{showEarnings ? 'Hide ▲' : 'How? ▼'}</button>
      </div>
    );
  };

  const EarningsBreakdown = ({ type }) => {
    if (!showEarnings) return null;
    const breakdowns = {
      post: [
        { label: 'Base post reward', amount: '+0.2 HRS' },
        { label: 'Per like received', amount: '+0.01 HRS' },
        { label: 'Per comment received', amount: '+0.02 HRS' },
        { label: 'Per share/repost', amount: '+0.05 HRS' },
        { label: 'Viral bonus (1K+ likes)', amount: '+1.0 HRS' },
      ],
      video: [
        { label: 'Upload bonus', amount: '+0.5 HRS' },
        { label: 'Per minute watched (by others)', amount: '+0.3 HRS' },
        { label: 'Per like received', amount: '+0.01 HRS' },
        { label: 'Per comment', amount: '+0.02 HRS' },
        { label: 'Trending bonus', amount: '+5.0 HRS' },
      ],
      article: [
        { label: 'Publish bonus', amount: '+0.5 HRS' },
        { label: 'Per full read', amount: '+0.8 HRS' },
        { label: 'Per highlight/save', amount: '+0.1 HRS' },
        { label: 'Evergreen monthly bonus', amount: '+0.05/read' },
        { label: 'Newsletter subscriber earned', amount: '+0.2 HRS' },
      ],
      product: [
        { label: 'Listing bonus', amount: '+0.5 HRS' },
        { label: 'Per sale (you keep ~95%)', amount: 'Price × 0.95*' },
        { label: 'Per verified review', amount: '+0.1 HRS' },
        { label: 'Repeat customer bonus', amount: '+0.5 HRS' },
      ],
      community: [
        { label: 'Post in group', amount: '+0.1 HRS' },
        { label: 'Per reply received', amount: '+0.02 HRS' },
        { label: 'Helpful answer voted', amount: '+0.3 HRS' },
        { label: 'Event organized', amount: '+1.0 HRS' },
      ],
      explore: [
        { label: 'Upload bonus', amount: '+0.2 HRS' },
        { label: 'Per save by others', amount: '+0.1 HRS' },
        { label: 'Per collection add', amount: '+0.05 HRS' },
        { label: 'Featured on Explore', amount: '+2.0 HRS' },
      ],
      audio: [
        { label: 'Host room/upload', amount: '+0.5 HRS' },
        { label: 'Per listener minute', amount: '+0.2 HRS' },
        { label: 'Per tip received', amount: 'Tip amount' },
        { label: 'Regular show bonus', amount: '+1.0 HRS/week' },
      ],
      proposal: [
        { label: 'Proposal submission', amount: '+0.5 HRS' },
        { label: 'If proposal passes vote', amount: '+2.0 HRS' },
        { label: 'Community discussion generated', amount: '+0.1/comment' },
      ],
      challenge: [
        { label: 'Entry submission', amount: '+0.5 HRS' },
        { label: 'Completion bonus', amount: 'Varies by challenge' },
        { label: 'Winner prize', amount: 'Up to 50x HRS*' },
        { label: 'Community vote bonus', amount: '+0.1/vote received' },
      ],
    };
    const items = breakdowns[type] || [];
    return (
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
        padding: '12px 14px', marginBottom: 16, marginTop: -8,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Earnings Breakdown</div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: i < items.length - 1 ? `1px solid ${T.border}` : 'none' }}>
            <span style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{item.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{item.amount}</span>
          </div>
        ))}
        <div style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 8, lineHeight: 1.5 }}>
          *All earnings are estimates based on platform targets. Actual amounts depend on ad revenue, engagement, and platform growth. Not guaranteed.
        </div>
      </div>
    );
  };

  const PublishButton = ({ label = 'Publish', onClick, disabled = false, color = T.primary }) => (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: '16px 0', borderRadius: 14, border: 'none',
      fontSize: 16, fontWeight: 800, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: "'Outfit', sans-serif",
      background: disabled ? T.elevated : `linear-gradient(135deg, ${color}, ${color}cc)`,
      color: disabled ? T.dim : '#fff',
      boxShadow: disabled ? 'none' : `0 4px 20px ${color}30`,
      transition: 'all 0.2s', opacity: disabled ? 0.5 : 1,
    }}>{label}</button>
  );

  const Disclaimer = () => (
    <div style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", lineHeight: 1.6, padding: '12px 0', textAlign: 'center' }}>
      *All HOURS earnings are illustrative estimates. Actual earnings depend on platform ad revenue, audience size, engagement quality, and other factors. HOURS are not cryptocurrency, securities, or investments. Revenue percentages are targets, not guarantees. Individual results vary.
    </div>
  );

  // ═══════════════════════════════════════
  // CONTENT TYPE PICKER
  // ═══════════════════════════════════════
  const TypePicker = () => (
    <div>
      <TopBar
        title="✨ Create"
        onBack={null}
      />
      <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
        {/* Hero prompt */}
        <div style={{
          textAlign: 'center', padding: '20px 0 16px',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.5s ease',
        }}>
          <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 6px' }}>
            What do you want to create?
          </h1>
          <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: 0 }}>
            Everything you make earns HOURS. Pick your canvas.
          </p>
        </div>

        {/* Content type grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {contentTypes.map((ct, i) => (
            <div
              key={ct.id}
              onClick={() => { setContentType(ct.id); setView('compose'); setShowEarnings(false); }}
              style={{
                borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
                background: T.card, border: `1px solid ${T.border}`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 0.4s ease ${i * 0.06}s`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Color strip */}
                <div style={{
                  width: 56, background: ct.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>{ct.icon}</div>

                <div style={{ flex: 1, padding: '12px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.text }}>{ct.title}</div>
                      <div style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif", marginTop: 1 }}>{ct.desc}</div>
                    </div>
                    <div style={{
                      fontSize: 9, fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                      color: ct.color, background: `${ct.color}12`,
                      padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap',
                      marginLeft: 8, flexShrink: 0,
                    }}>{ct.zone}</div>
                  </div>
                  <div style={{ fontSize: 10, color: T.gold, fontFamily: "'DM Mono', monospace", fontWeight: 600, marginTop: 6 }}>
                    {ct.earnings}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: T.dim, fontSize: 16,
                }}>→</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick create shortcut */}
        <div style={{
          marginTop: 16, padding: '14px 16px', borderRadius: 16,
          background: `${T.primary}06`, border: `1px solid ${T.primary}15`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: T.primary }}>Quick Post</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Tap to instantly share text, photos, or a thought</div>
          </div>
          <button onClick={() => { setContentType('post'); setView('compose'); }} style={{
            background: T.primary, border: 'none', borderRadius: 10,
            padding: '8px 14px', color: '#fff', fontSize: 11, fontWeight: 700,
            cursor: 'pointer', fontFamily: "'Outfit', sans-serif", flexShrink: 0,
          }}>+</button>
        </div>

        <Disclaimer />
      </div>
    </div>
  );

  // ═══════════════════════════════════════
  // COMPOSE VIEWS (per content type)
  // ═══════════════════════════════════════

  // ─── QUICK POST ───
  const ComposePost = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="post" />
      <EarningsBreakdown type="post" />

      {/* Composer */}
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 18,
        padding: '16px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}>🧠</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Roger</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>@rogergrubb • 🛡️ 94 Trust</div>
          </div>
        </div>

        <textarea
          placeholder="What's on your mind? Share a thought, a win, a question..."
          value={postText}
          onChange={e => setPostText(e.target.value)}
          rows={4}
          style={{
            width: '100%', padding: 0, border: 'none', background: 'transparent',
            color: T.text, fontSize: 16, fontFamily: "'Outfit', sans-serif",
            outline: 'none', resize: 'none', lineHeight: 1.6, minHeight: 100,
          }}
        />

        {/* Character count */}
        <div style={{ textAlign: 'right', fontSize: 10, color: postText.length > 280 ? T.gold : T.dim, fontFamily: "'DM Mono', monospace" }}>
          {postText.length}/500
        </div>

        {/* Media preview */}
        {postMedia.length > 0 && (
          <div style={{
            display: 'grid', gridTemplateColumns: postMedia.length > 1 ? '1fr 1fr' : '1fr',
            gap: 6, marginTop: 10,
          }}>
            {postMedia.map((_, i) => (
              <div key={i} style={{
                height: 100, borderRadius: 12, background: `linear-gradient(135deg, ${T.elevated}, ${T.surface})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <span style={{ fontSize: 24 }}>📷</span>
                <button onClick={() => setPostMedia(postMedia.filter((_, j) => j !== i))} style={{
                  position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: 10, cursor: 'pointer',
                }}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Poll */}
        {postPoll && (
          <div style={{ marginTop: 12, padding: '12px', borderRadius: 12, background: T.surface, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Poll Options</div>
            {pollOptions.map((opt, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                <input
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={e => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 10,
                    border: `1px solid ${T.border}`, background: T.card,
                    color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none',
                  }}
                />
                {pollOptions.length > 2 && (
                  <button onClick={() => setPollOptions(pollOptions.filter((_, j) => j !== i))} style={{
                    background: 'none', border: `1px solid ${T.border}`, borderRadius: 8, padding: '0 8px',
                    color: T.dim, fontSize: 12, cursor: 'pointer',
                  }}>✕</button>
                )}
              </div>
            ))}
            {pollOptions.length < 4 && (
              <button onClick={() => setPollOptions([...pollOptions, ''])} style={{
                background: 'none', border: `1px dashed ${T.border}`, borderRadius: 8,
                padding: '8px', width: '100%', color: T.primary, fontSize: 11,
                fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
              }}>+ Add option</button>
            )}
          </div>
        )}
      </div>

      {/* Action bar */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap',
      }}>
        {[
          { icon: '📷', label: 'Photo', action: () => setPostMedia([...postMedia, 'img']) },
          { icon: '🎬', label: 'Video', action: () => setPostMedia([...postMedia, 'vid']) },
          { icon: '📊', label: postPoll ? 'Remove Poll' : 'Poll', action: () => setPostPoll(!postPoll) },
          { icon: '🔗', label: 'Link', action: () => {} },
          { icon: '📅', label: postScheduled ? 'Scheduled ✓' : 'Schedule', action: () => setPostScheduled(!postScheduled) },
        ].map((a, i) => (
          <button key={i} onClick={a.action} style={{
            padding: '8px 12px', borderRadius: 10,
            border: `1px solid ${T.border}`, background: T.surface,
            color: T.sub, fontSize: 11, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 14 }}>{a.icon}</span> {a.label}
          </button>
        ))}
      </div>

      <PublishButton
        label={postScheduled ? '📅 Schedule Post' : '✨ Publish Post'}
        onClick={() => setView('success')}
        disabled={postText.length === 0 && postMedia.length === 0}
        color={T.primary}
      />
      <Disclaimer />
    </div>
  );

  // ─── VIDEO ───
  const ComposeVideo = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="video" />
      <EarningsBreakdown type="video" />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Video Type</div>
      <ChipSelect
        options={[
          { id: 'short', name: '⚡ Short (< 60s)' },
          { id: 'long', name: '📺 Long Form' },
          { id: 'live', name: '🔴 Go Live' },
        ]}
        selected={videoType} onSelect={setVideoType} color="#8b5cf6"
      />

      {videoType === 'live' ? (
        <div style={{
          background: `${T.red}08`, border: `1px solid ${T.red}18`, borderRadius: 18,
          padding: 24, textAlign: 'center', marginBottom: 16,
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔴</div>
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>Go Live</div>
          <div style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 16 }}>Stream to your followers. HOURS multiplied 2x during live.*</div>
          <Input label="Stream Title" placeholder="What are you streaming about?" value={videoTitle} onChange={setVideoTitle} />
          <Input label="Description" placeholder="Brief description..." value={videoDesc} onChange={setVideoDesc} multiline rows={2} />
          <PublishButton label="🔴 Start Live Stream" onClick={() => setView('success')} disabled={!videoTitle} color={T.red} />
        </div>
      ) : (
        <>
          <MediaUpload label={videoType === 'short' ? 'Upload Short Video (< 60s)' : 'Upload Video'} uploaded={videoUploaded} onUpload={setVideoUploaded} accept="video" />
          <Input label="Title" placeholder="Give your video a catchy title" value={videoTitle} onChange={setVideoTitle} maxLength={100} />
          <Input label="Description" placeholder="What's this video about?" value={videoDesc} onChange={setVideoDesc} multiline rows={3} maxLength={2000} />

          <MediaUpload label="Custom Thumbnail (optional)" uploaded={videoThumbnail} onUpload={setVideoThumbnail} accept="image" />

          <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tags</div>
          <ChipSelect options={tagSuggestions} selected={articleTags} onSelect={setArticleTags} multi color="#8b5cf6" />

          <PublishButton label="🎬 Publish Video" onClick={() => setView('success')} disabled={!videoTitle || !videoUploaded} color="#8b5cf6" />
        </>
      )}
      <Disclaimer />
    </div>
  );

  // ─── ARTICLE ───
  const ComposeArticle = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="article" />
      <EarningsBreakdown type="article" />

      <MediaUpload label="Cover Image (recommended)" uploaded={articleCover} onUpload={setArticleCover} />

      <Input label="Title" placeholder="Your article title" value={articleTitle} onChange={setArticleTitle} maxLength={120} />

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Article Body</label>
        {/* Toolbar */}
        <div style={{
          display: 'flex', gap: 2, padding: '6px 8px', borderRadius: '14px 14px 0 0',
          background: T.surface, border: `1px solid ${T.border}`, borderBottom: 'none',
        }}>
          {['B', 'I', 'U', 'H1', 'H2', '""', '—', '🔗', '📷', '< >'].map((tool, i) => (
            <button key={i} style={{
              padding: '4px 8px', borderRadius: 6, background: 'none', border: 'none',
              color: T.sub, fontSize: 11, fontWeight: tool === 'B' ? 800 : tool === 'I' ? 400 : 600,
              cursor: 'pointer', fontFamily: tool === 'B' || tool === 'I' || tool === 'U' ? 'serif' : "'Outfit', sans-serif",
              fontStyle: tool === 'I' ? 'italic' : 'normal',
              textDecoration: tool === 'U' ? 'underline' : 'none',
            }}>{tool}</button>
          ))}
        </div>
        <textarea
          placeholder="Start writing your article... &#10;&#10;Use the toolbar above for formatting. Your article earns HOURS every time someone reads it — forever.*"
          value={articleBody}
          onChange={e => setArticleBody(e.target.value)}
          rows={12}
          style={{
            width: '100%', padding: '16px', borderRadius: '0 0 14px 14px',
            border: `1px solid ${T.border}`, background: T.card,
            color: T.text, fontSize: 15, fontFamily: "'Outfit', sans-serif",
            outline: 'none', resize: 'vertical', lineHeight: 1.8, minHeight: 280,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, fontFamily: "'DM Mono', monospace" }}>
          <span style={{ color: T.dim }}>{articleBody.split(/\s+/).filter(Boolean).length} words</span>
          <span style={{ color: T.dim }}>~{Math.max(1, Math.ceil(articleBody.split(/\s+/).filter(Boolean).length / 200))} min read</span>
        </div>
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tags (choose up to 5)</div>
      <ChipSelect options={tagSuggestions} selected={articleTags} onSelect={setArticleTags} multi color="#0891b2" />

      {/* Newsletter option */}
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 14,
        padding: '12px 14px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>📬</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Send to newsletter subscribers</div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>0 subscribers</div>
        </div>
        <div style={{ width: 36, height: 20, borderRadius: 10, background: T.elevated, cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: 2 }} />
        </div>
      </div>

      <PublishButton label="📰 Publish Article" onClick={() => setView('success')} disabled={!articleTitle || articleBody.length < 50} color="#0891b2" />
      <Disclaimer />
    </div>
  );

  // ─── COMMUNITY POST ───
  const ComposeCommunity = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="community" />
      <EarningsBreakdown type="community" />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Post to Group</div>
      <ChipSelect options={myGroups} selected={communityTarget} onSelect={setCommunityTarget} color={T.accent} />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Post Type</div>
      <ChipSelect
        options={[
          { id: 'discussion', name: '💬 Discussion' },
          { id: 'question', name: '❓ Question' },
          { id: 'event', name: '📅 Event' },
          { id: 'poll', name: '📊 Poll' },
        ]}
        selected={communityType} onSelect={setCommunityType} color={T.accent}
      />

      {communityType === 'event' && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Date</label>
            <input type="date" style={{ width: '100%', padding: '12px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Time</label>
            <input type="time" style={{ width: '100%', padding: '12px', borderRadius: 12, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
          </div>
        </div>
      )}

      <Input label="Post Content" placeholder={communityType === 'question' ? 'What do you want to ask the group?' : communityType === 'event' ? 'Describe the event...' : 'Share your thoughts with the group...'} value={communityText} onChange={setCommunityText} multiline rows={4} maxLength={2000} />

      {communityType === 'poll' && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Poll Options</div>
          {pollOptions.map((opt, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
              <input placeholder={`Option ${i + 1}`} value={opt} onChange={e => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }}
                style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
            </div>
          ))}
          {pollOptions.length < 4 && (
            <button onClick={() => setPollOptions([...pollOptions, ''])} style={{ background: 'none', border: `1px dashed ${T.border}`, borderRadius: 8, padding: '8px', width: '100%', color: T.accent, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>+ Add option</button>
          )}
        </div>
      )}

      <PublishButton label="🏛️ Post to Group" onClick={() => setView('success')} disabled={!communityTarget || !communityText} color={T.accent} />
      <Disclaimer />
    </div>
  );

  // ─── PRODUCT LISTING ───
  const ComposeProduct = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="product" />
      <EarningsBreakdown type="product" />

      <Input label="Product Name" placeholder="What are you selling?" value={productName} onChange={setProductName} maxLength={80} />
      <Input label="Description" placeholder="Describe your product in detail..." value={productDesc} onChange={setProductDesc} multiline rows={4} maxLength={2000} />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Category</div>
      <ChipSelect options={categories} selected={productCategory} onSelect={setProductCategory} color={T.orange} />

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Price (USD)</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.dim, fontSize: 16, fontWeight: 700 }}>$</span>
            <input type="number" placeholder="0.00" value={productPrice} onChange={e => setProductPrice(e.target.value)}
              style={{ width: '100%', padding: '14px 14px 14px 30px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontWeight: 700, fontFamily: "'DM Mono', monospace", outline: 'none' }} />
          </div>
        </div>
        {productPrice && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ background: `${T.accent}08`, border: `1px solid ${T.accent}18`, borderRadius: 14, padding: '10px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'Outfit', sans-serif", textTransform: 'uppercase', letterSpacing: 1 }}>You keep*</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.accent, fontFamily: "'DM Mono', monospace" }}>${(parseFloat(productPrice) * 0.95).toFixed(2)}</div>
              <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>~95% of ${productPrice || '0'}</div>
            </div>
          </div>
        )}
      </div>

      <MediaUpload label="Product Cover Image" uploaded={articleCover} onUpload={setArticleCover} />
      <MediaUpload label="Product Files (deliverables)" uploaded={productFiles} onUpload={setProductFiles} accept="files" />

      {/* Preview card */}
      {productName && (
        <div style={{
          background: T.card, border: `1px solid ${T.border}`, borderRadius: 18,
          padding: 16, marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Preview</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: T.elevated, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🛍️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>{productName}</div>
              <div style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>by @rogergrubb</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: T.accent, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{productPrice ? `$${productPrice}` : 'Free'}</div>
            </div>
          </div>
        </div>
      )}

      <PublishButton label="🛍️ List Product" onClick={() => setView('success')} disabled={!productName || !productPrice} color={T.orange} />
      <Disclaimer />
    </div>
  );

  // ─── VISUAL / EXPLORE ───
  const ComposeExplore = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="explore" />
      <EarningsBreakdown type="explore" />

      <MediaUpload label="Upload Photos / Visuals" uploaded={exploreMedia.length > 0} onUpload={() => setExploreMedia(['img'])} />

      {/* Grid preview */}
      {exploreMedia.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }}>
          {[...exploreMedia, 'add'].map((m, i) => (
            <div key={i} onClick={() => m === 'add' && setExploreMedia([...exploreMedia, 'img'])} style={{
              width: 80, height: 80, borderRadius: 12, flexShrink: 0,
              background: m === 'add' ? 'transparent' : `linear-gradient(135deg, ${T.elevated}, ${T.card})`,
              border: `${m === 'add' ? '2px dashed' : '1px solid'} ${T.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: m === 'add' ? 18 : 24, color: m === 'add' ? T.dim : T.text }}>{m === 'add' ? '+' : '📷'}</span>
            </div>
          ))}
        </div>
      )}

      <Input label="Caption" placeholder="Describe your visual..." value={exploreCaption} onChange={setExploreCaption} multiline rows={2} maxLength={500} />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Add to Collection</div>
      <ChipSelect
        options={[
          { id: 'new', name: '+ New Collection' },
          { id: 'fav', name: '⭐ Favorites' },
          { id: 'inspo', name: '💡 Inspiration' },
          { id: 'work', name: '💼 Work' },
        ]}
        selected={exploreCollection} onSelect={setExploreCollection} color={T.pink}
      />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tags</div>
      <ChipSelect options={['Photography', 'Design', 'Art', 'Architecture', 'Nature', 'Fashion', 'Food', 'Travel']} selected={articleTags} onSelect={setArticleTags} multi color={T.pink} />

      <PublishButton label="✨ Publish to Explore" onClick={() => setView('success')} disabled={exploreMedia.length === 0} color={T.pink} />
      <Disclaimer />
    </div>
  );

  // ─── AUDIO ───
  const ComposeAudio = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="audio" />
      <EarningsBreakdown type="audio" />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Audio Type</div>
      <ChipSelect
        options={[
          { id: 'room', name: '🔴 Live Room' },
          { id: 'podcast', name: '🎧 Podcast Episode' },
          { id: 'playlist', name: '🎵 Playlist' },
        ]}
        selected={audioType} onSelect={setAudioType} color={T.purple}
      />

      <Input label="Title" placeholder={audioType === 'room' ? 'What are we talking about?' : audioType === 'podcast' ? 'Episode title' : 'Playlist name'} value={audioTitle} onChange={setAudioTitle} maxLength={100} />

      <Input label="Description" placeholder="Brief description..." value={audioDesc} onChange={setAudioDesc} multiline rows={2} maxLength={500} />

      {audioType === 'room' && (
        <div style={{ background: `${T.red}08`, border: `1px solid ${T.red}18`, borderRadius: 16, padding: 16, marginBottom: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 6 }}>🔴</div>
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Ready to go live?</div>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>Listeners earn HOURS too. Everyone benefits.*</div>
          <div style={{
            display: 'flex', gap: 8, justifyContent: 'center',
          }}>
            {['🔇 Muted start', '🔊 Open mic'].map((opt, i) => (
              <button key={i} style={{
                padding: '8px 14px', borderRadius: 10,
                border: `1px solid ${T.border}`, background: T.card,
                color: T.sub, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Outfit', sans-serif",
              }}>{opt}</button>
            ))}
          </div>
        </div>
      )}

      {audioType === 'podcast' && (
        <MediaUpload label="Upload Audio File" uploaded={videoUploaded} onUpload={setVideoUploaded} accept="audio" />
      )}

      {audioType === 'playlist' && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Outfit', sans-serif", color: T.sub, marginBottom: 8 }}>Add tracks from your library or search:</div>
          <input placeholder="Search for tracks..." style={{ width: '100%', padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif", marginTop: 8, textAlign: 'center' }}>0 tracks added</div>
        </div>
      )}

      <PublishButton
        label={audioType === 'room' ? '🔴 Start Live Room' : audioType === 'podcast' ? '🎧 Publish Episode' : '🎵 Create Playlist'}
        onClick={() => setView('success')}
        disabled={!audioTitle}
        color={T.purple}
      />
      <Disclaimer />
    </div>
  );

  // ─── GOVERNANCE PROPOSAL ───
  const ComposeProposal = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="proposal" />
      <EarningsBreakdown type="proposal" />

      <div style={{
        background: `${T.cyan}08`, border: `1px solid ${T.cyan}18`, borderRadius: 14,
        padding: '10px 14px', marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700, color: T.cyan }}>Your HOURS = your voting power.*</span> Proposals need 100+ votes to be reviewed. Platform retains operational authority.
        </div>
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Category</div>
      <ChipSelect options={govCategories} selected={proposalCategory} onSelect={setProposalCategory} color={T.cyan} />

      <Input label="Proposal Title" placeholder="What change are you proposing?" value={proposalTitle} onChange={setProposalTitle} maxLength={120} />

      <Input label="Detailed Description" placeholder="Explain the problem, your proposed solution, and why this matters to the community..." value={proposalBody} onChange={setProposalBody} multiline rows={6} maxLength={5000} helper="Be specific. Proposals with clear problem statements and solutions get more votes." />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Voting Options</div>
      {proposalOptions.map((opt, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          <input placeholder={`Option ${i + 1}${i === 0 ? ' (e.g., "Yes, implement this")' : i === 1 ? ' (e.g., "No, keep current")' : ' (e.g., "Modified approach")'}`}
            value={opt} onChange={e => { const n = [...proposalOptions]; n[i] = e.target.value; setProposalOptions(n); }}
            style={{ flex: 1, padding: '12px', borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
        </div>
      ))}

      <PublishButton label="🗳️ Submit Proposal" onClick={() => setView('success')} disabled={!proposalTitle || !proposalBody || !proposalCategory} color={T.cyan} />
      <Disclaimer text="*Governance is aspirational. OURS retains full operational authority for legal compliance, safety, and platform integrity regardless of community votes. Governance structures may evolve." />
    </div>
  );

  // ─── CHALLENGE ENTRY ───
  const ComposeChallenge = () => (
    <div style={{ padding: '8px 14px 80px', maxWidth: 520, margin: '0 auto' }}>
      <EarningsPreview type="challenge" />
      <EarningsBreakdown type="challenge" />

      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Active Challenges</div>
      {activeChallenges.map(ch => (
        <div key={ch.id} onClick={() => setCommunityTarget(ch.id)} style={{
          background: communityTarget === ch.id ? `${T.gold}10` : T.card,
          border: `1px solid ${communityTarget === ch.id ? T.gold : T.border}`,
          borderRadius: 14, padding: '12px 14px', marginBottom: 8, cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{ch.name}</div>
            <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{ch.deadline} left</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{ch.reward}</div>
            {communityTarget === ch.id && <span style={{ fontSize: 10, color: T.accent }}>Selected ✓</span>}
          </div>
        </div>
      ))}

      <Input label="Your Entry" placeholder="Describe your challenge submission..." value={challengeEntry} onChange={setChallengeEntry} multiline rows={4} maxLength={2000} />

      <MediaUpload label="Attach Media (optional)" uploaded={challengeMedia} onUpload={setChallengeMedia} />

      <PublishButton label="🏆 Submit Entry" onClick={() => setView('success')} disabled={!communityTarget || !challengeEntry} color={T.gold} />
      <Disclaimer />
    </div>
  );

  // ═══════════════════════════════════════
  // SUCCESS VIEW
  // ═══════════════════════════════════════
  const SuccessView = () => {
    const ct = contentTypes.find(c => c.id === contentType);
    const [confetti, setConfetti] = useState([]);
    useEffect(() => {
      setConfetti(Array.from({ length: 25 }).map((_, i) => ({
        id: i, x: Math.random() * 100, delay: Math.random() * 1.5,
        color: [T.primary, T.accent, T.gold, T.purple, T.pink][Math.floor(Math.random() * 5)],
        size: Math.random() * 5 + 3, speed: Math.random() * 2 + 2,
      })));
    }, []);

    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {confetti.map(c => (
          <div key={c.id} style={{
            position: 'absolute', top: -10, left: `${c.x}%`,
            width: c.size, height: c.size, borderRadius: c.size > 5 ? 2 : '50%',
            background: c.color, animation: `fall ${c.speed}s ease-in ${c.delay}s forwards`, opacity: 0.8,
          }} />
        ))}

        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: `${ct.color}20`, border: `2px solid ${ct.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, marginBottom: 16, boxShadow: `0 0 40px ${ct.color}20`,
        }}>✨</div>

        <h1 style={{ fontSize: 26, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 8px' }}>Published!</h1>
        <p style={{ fontSize: 14, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: '0 0 24px', lineHeight: 1.5 }}>
          Your {ct.title.toLowerCase()} is live and earning HOURS.*
        </p>

        {/* Earnings animation */}
        <div style={{
          background: `${T.gold}08`, border: `1px solid ${T.gold}18`, borderRadius: 18,
          padding: '16px 28px', marginBottom: 24,
        }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: T.dim, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>Instant Reward</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: T.gold, fontFamily: "'DM Mono', monospace" }}>
            +{contentType === 'post' ? '0.2' : contentType === 'article' ? '0.5' : contentType === 'product' ? '0.5' : '0.3'} HRS
          </div>
          <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>+ more as people engage*</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 300 }}>
          <button onClick={() => setView('success')} style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${ct.color}, ${ct.color}cc)`,
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
          }}>View {ct.title}</button>

          <button onClick={() => { setView('picker'); setContentType(null); resetForms(); }} style={{
            width: '100%', padding: '14px', borderRadius: 14,
            border: `1px solid ${T.border}`, background: T.surface,
            color: T.sub, fontSize: 14, fontWeight: 600, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
          }}>Create something else →</button>

          <button onClick={() => {}} style={{
            width: '100%', padding: '14px', borderRadius: 14,
            border: `1px solid ${T.border}`, background: 'transparent',
            color: T.dim, fontSize: 13, cursor: 'pointer',
            fontFamily: "'Outfit', sans-serif",
          }}>← Back to Candy Store</button>
        </div>

        <div style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 20, maxWidth: 280, lineHeight: 1.6 }}>
          *HOURS rewards are estimates. Actual earnings depend on engagement, platform revenue, and other factors.
        </div>
      </div>
    );
  };

  const resetForms = () => {
    setPostText(''); setPostMedia([]); setPostPoll(false); setPollOptions(['', '']); setPostScheduled(false);
    setArticleTitle(''); setArticleBody(''); setArticleTags([]); setArticleCover(false);
    setVideoTitle(''); setVideoDesc(''); setVideoType('short'); setVideoUploaded(false); setVideoThumbnail(false);
    setProductName(''); setProductDesc(''); setProductPrice(''); setProductCategory(''); setProductFiles(false);
    setCommunityTarget(''); setCommunityText(''); setCommunityType('discussion');
    setAudioTitle(''); setAudioDesc(''); setAudioType('room');
    setProposalTitle(''); setProposalBody(''); setProposalCategory(''); setProposalOptions(['', '', '']);
    setChallengeEntry(''); setChallengeMedia(false);
    setExploreCaption(''); setExploreMedia([]); setExploreCollection('');
    setShowEarnings(false);
  };

  // ═══ COMPOSE ROUTER ═══
  const composeViews = {
    post: ComposePost,
    video: ComposeVideo,
    article: ComposeArticle,
    community: ComposeCommunity,
    product: ComposeProduct,
    explore: ComposeExplore,
    audio: ComposeAudio,
    proposal: ComposeProposal,
    challenge: ComposeChallenge,
  };

  const ComposeView = composeViews[contentType];
  const ct = contentTypes.find(c => c.id === contentType);

  // ═══ MAIN RENDER ═══
  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity:1; } 100% { transform: translateY(100vh) rotate(720deg); opacity:0; } }
        input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.35); }
        button:hover:not(:disabled) { filter: brightness(1.06); }
        input[type="date"], input[type="time"] { color-scheme: dark; }
      `}</style>

      {view === 'picker' && <TypePicker />}
      {view === 'compose' && (
        <div>
          <TopBar
            title={ct ? `${ct.icon} ${ct.title}` : 'Create'}
            onBack={() => { setView('picker'); setContentType(null); resetForms(); }}
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>142.5</span>
                <span style={{ fontSize: 9, color: T.dim }}>HRS</span>
              </div>
            }
          />
          {ComposeView && <ComposeView />}
        </div>
      )}
      {view === 'success' && <SuccessView />}
    </div>
  );
};

export default OursCreator;
