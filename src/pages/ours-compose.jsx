import React, { useState, useEffect } from 'react';

const OursCompose = () => {
  const [mode, setMode] = useState('picker'); // picker | post | video | article | discussion | product | audio | proposal
  const [postText, setPostText] = useState('');
  const [mediaAttached, setMediaAttached] = useState([]);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalBody, setProposalBody] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const T = {
    bg: '#030712', surface: '#0a1122', card: '#0f1a2e', elevated: '#152240',
    border: 'rgba(56,68,100,0.22)', primary: '#0ea5e9', accent: '#10b981',
    gold: '#fbbf24', red: '#ef4444', purple: '#a78bfa', pink: '#f472b6',
    orange: '#fb923c', cyan: '#22d3ee', text: '#eaf0f9', sub: '#8b9dc3', dim: '#4a5b7a',
  };

  const createTypes = [
    { id: 'post', icon: '✏️', label: 'Quick Post', desc: 'Text, photos, polls', color: T.primary, zone: 'Feed', earning: '+0.5 HRS', hotkey: 'P' },
    { id: 'video', icon: '🎬', label: 'Video', desc: 'Upload or record', color: T.red, zone: 'Watch', earning: '+2.0 HRS', hotkey: 'V' },
    { id: 'article', icon: '📝', label: 'Article', desc: 'Long-form writing', color: T.cyan, zone: 'Read', earning: '+3.0 HRS', hotkey: 'A' },
    { id: 'discussion', icon: '💬', label: 'Discussion', desc: 'Start a group thread', color: T.purple, zone: 'Community', earning: '+1.0 HRS', hotkey: 'D' },
    { id: 'product', icon: '🛍️', label: 'Product', desc: 'List something to sell', color: T.pink, zone: 'Shop', earning: '~95% rev', hotkey: 'S' },
    { id: 'audio', icon: '🎙️', label: 'Audio Room', desc: 'Host a live room', color: T.orange, zone: 'Listen', earning: '+1.5 HRS', hotkey: 'L' },
    { id: 'proposal', icon: '🗳️', label: 'Proposal', desc: 'Submit a governance vote', color: T.gold, zone: 'Govern', earning: '+2.0 HRS', hotkey: 'G' },
  ];

  const trendingTags = ['#technology', '#creative', '#music', '#photography', '#wellness', '#finance', '#gaming', '#food', '#travel', '#science'];

  const toggleTag = (tag) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : prev.length < 5 ? [...prev, tag] : prev);

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => { setPublishing(false); setPublished(true); }, 1500);
  };

  const resetCompose = () => {
    setMode('picker'); setPostText(''); setMediaAttached([]); setArticleTitle('');
    setArticleBody(''); setProductName(''); setProductPrice(''); setProductDesc('');
    setProposalTitle(''); setProposalBody(''); setSelectedTags([]); setPublished(false);
  };

  // ═══ SHARED UI ═══
  const TopBar = ({ title, color }) => (
    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${T.border}`, backdropFilter: 'blur(20px)', background: `${T.bg}dd`, position: 'sticky', top: 0, zIndex: 10 }}>
      <button onClick={() => published ? resetCompose() : setMode('picker')} style={{ background: 'none', border: 'none', color: T.sub, fontSize: 14, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
        ← {published ? 'New' : 'Back'}
      </button>
      <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: color || T.text }}>{title}</span>
      <div style={{ width: 60 }} />
    </div>
  );

  const MediaDropZone = ({ compact = false }) => (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); setMediaAttached([...mediaAttached, { id: Date.now(), type: 'image', name: 'photo.jpg' }]); }}
      onClick={() => setMediaAttached([...mediaAttached, { id: Date.now(), type: 'image', name: `photo_${mediaAttached.length + 1}.jpg` }])}
      style={{
        border: `2px dashed ${dragOver ? T.primary : T.border}`,
        borderRadius: compact ? 12 : 20, padding: compact ? '16px' : '28px 20px',
        textAlign: 'center', cursor: 'pointer',
        background: dragOver ? `${T.primary}08` : 'transparent',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ fontSize: compact ? 24 : 32, marginBottom: compact ? 4 : 8 }}>📎</div>
      <div style={{ fontSize: compact ? 11 : 13, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>
        {compact ? 'Add media' : 'Drop files or tap to add photos, videos, files'}
      </div>
      {!compact && <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>Max 50MB • JPG, PNG, GIF, MP4, PDF</div>}
    </div>
  );

  const AttachedMedia = () => mediaAttached.length > 0 && (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
      {mediaAttached.map(m => (
        <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 10, background: T.card, border: `1px solid ${T.border}` }}>
          <span style={{ fontSize: 12 }}>🖼️</span>
          <span style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{m.name}</span>
          <button onClick={(e) => { e.stopPropagation(); setMediaAttached(mediaAttached.filter(x => x.id !== m.id)); }} style={{ background: 'none', border: 'none', color: T.dim, fontSize: 12, cursor: 'pointer', padding: 0 }}>×</button>
        </div>
      ))}
    </div>
  );

  const TagSelector = () => (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>Tags (up to 5)</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {trendingTags.map(tag => {
          const sel = selectedTags.includes(tag);
          return (
            <button key={tag} onClick={() => toggleTag(tag)} style={{
              padding: '5px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
              background: sel ? `${T.primary}20` : T.card,
              border: `1px solid ${sel ? T.primary : T.border}`,
              color: sel ? T.primary : T.sub,
              fontFamily: "'Outfit', sans-serif", fontWeight: sel ? 600 : 400, transition: 'all 0.2s',
            }}>{tag}</button>
          );
        })}
      </div>
    </div>
  );

  const PublishButton = ({ label = 'Publish', disabled = false, earning = '+0.5 HRS' }) => (
    <div style={{ padding: '16px 20px', borderTop: `1px solid ${T.border}`, background: `${T.bg}ee`, backdropFilter: 'blur(20px)', position: 'sticky', bottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>Estimated earning</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{earning}</span>
      </div>
      <button onClick={handlePublish} disabled={disabled || publishing} style={{
        width: '100%', padding: '15px 0', borderRadius: 14, border: 'none',
        background: disabled ? T.card : `linear-gradient(135deg, ${T.primary}, ${T.accent})`,
        color: '#fff', fontSize: 15, fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: "'Outfit', sans-serif", opacity: disabled ? 0.4 : 1,
        boxShadow: disabled ? 'none' : `0 4px 20px ${T.primary}30`,
        transition: 'all 0.2s',
      }}>
        {publishing ? '⏳ Publishing...' : `${label} →`}
      </button>
      <p style={{ fontSize: 8, color: T.dim, fontFamily: "'DM Mono', monospace", textAlign: 'center', marginTop: 8, opacity: 0.5 }}>
        *HOURS earnings are estimates based on platform targets. Actual amounts may vary.
      </p>
    </div>
  );

  // ═══ SUCCESS VIEW ═══
  const SuccessView = ({ type }) => {
    const info = createTypes.find(t => t.id === type) || createTypes[0];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 8px' }}>Published!</h1>
        <p style={{ fontSize: 14, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 8 }}>Your {info.label.toLowerCase()} is now live in the {info.zone} zone.</p>
        <div style={{ padding: '8px 18px', borderRadius: 12, background: `${T.gold}12`, border: `1px solid ${T.gold}20`, fontSize: 14, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>{info.earning} earned*</div>
        <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 300 }}>
          <button onClick={resetCompose} style={{ flex: 1, padding: '14px 0', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.sub, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>Create another</button>
          <button style={{ flex: 1, padding: '14px 0', borderRadius: 14, border: 'none', background: `linear-gradient(135deg, ${T.primary}, ${T.accent})`, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>View it →</button>
        </div>
        <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}`, maxWidth: 300, width: '100%' }}>
          <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>Share your creation</div>
          <div style={{ display: 'flex', gap: 10, marginTop: 8, justifyContent: 'center' }}>
            {['📋 Copy link', '💬 Message', '📱 Share'].map(s => (
              <button key={s} style={{ padding: '6px 12px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}`, color: T.sub, fontSize: 10, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>{s}</button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ═══ TYPE PICKER ═══
  const TypePicker = () => (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ padding: '20px 24px 8px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: '0 0 4px' }}>Create</h1>
        <p style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif", margin: 0 }}>What are you making today?</p>
      </div>
      <div style={{ padding: '12px 20px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {createTypes.map(type => (
            <button key={type.id} onClick={() => setMode(type.id)} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
              borderRadius: 18, background: T.card, border: `1px solid ${T.border}`,
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              width: '100%',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: `${type.color}15`, border: `1px solid ${type.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}>{type.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{type.label}</span>
                  <span style={{ fontSize: 9, color: type.color, fontFamily: "'DM Mono', monospace", padding: '2px 6px', borderRadius: 6, background: `${type.color}10` }}>{type.zone}</span>
                </div>
                <div style={{ fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", marginTop: 1 }}>{type.desc}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, fontFamily: "'DM Mono', monospace" }}>{type.earning}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick action shortcuts */}
        <div style={{ marginTop: 20, padding: '16px 18px', borderRadius: 18, background: T.surface, border: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Quick start</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { icon: '📷', label: 'Photo', action: () => { setMode('post'); setMediaAttached([{ id: 1, type: 'image', name: 'photo.jpg' }]); } },
              { icon: '🎥', label: 'Record', action: () => setMode('video') },
              { icon: '📊', label: 'Poll', action: () => setMode('post') },
              { icon: '🔴', label: 'Go Live', action: () => setMode('audio') },
            ].map(s => (
              <button key={s.label} onClick={s.action} style={{
                padding: '12px 4px', borderRadius: 14, cursor: 'pointer',
                background: T.card, border: `1px solid ${T.border}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ fontSize: 9, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Earning tip */}
        <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 14, background: `${T.gold}06`, border: `1px solid ${T.gold}12` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ fontSize: 11, color: T.gold, fontFamily: "'Outfit', sans-serif", lineHeight: 1.5 }}>
              <strong>Tip:</strong> Articles earn the most HOURS upfront. Videos earn over time as viewers watch. Posts are fastest to publish.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══ QUICK POST COMPOSER ═══
  const PostComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Quick Post" color={T.primary} />
      {published ? <SuccessView type="post" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* User avatar + textarea */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${T.primary}30, ${T.accent}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🧠</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 2 }}>Roger <span style={{ fontSize: 10, color: T.dim, fontWeight: 400 }}>@rogergrubb</span></div>
                <textarea
                  placeholder="What's on your mind?"
                  value={postText}
                  onChange={e => { setPostText(e.target.value); setCharCount(e.target.value.length); }}
                  style={{
                    width: '100%', minHeight: 120, padding: '12px 0', border: 'none',
                    background: 'transparent', color: T.text, fontSize: 16,
                    fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none',
                    lineHeight: 1.6,
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: charCount > 500 ? T.red : T.dim, fontFamily: "'DM Mono', monospace" }}>{charCount}/500</span>
              {charCount > 0 && <span style={{ fontSize: 10, color: T.accent, fontFamily: "'Outfit', sans-serif" }}>✓ Good to publish</span>}
            </div>

            <AttachedMedia />
            <MediaDropZone compact />

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
              {[{ icon: '📷', label: 'Photo' }, { icon: '🎥', label: 'Video' }, { icon: '📊', label: 'Poll' }, { icon: '🔗', label: 'Link' }, { icon: '📍', label: 'Location' }].map(tool => (
                <button key={tool.label} onClick={() => tool.label === 'Photo' && setMediaAttached([...mediaAttached, { id: Date.now(), type: 'image', name: 'photo.jpg' }])} style={{
                  padding: '8px 12px', borderRadius: 10, background: T.card, border: `1px solid ${T.border}`,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ fontSize: 14 }}>{tool.icon}</span>
                  <span style={{ fontSize: 10, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{tool.label}</span>
                </button>
              ))}
            </div>

            <TagSelector />
          </div>
          <PublishButton disabled={postText.length === 0} earning="+0.5 HRS" />
        </div>
      )}
    </div>
  );

  // ═══ VIDEO UPLOAD ═══
  const VideoComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Upload Video" color={T.red} />
      {published ? <SuccessView type="video" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Video upload area */}
            <div style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 16, border: `2px dashed ${T.border}`, padding: '40px 20px', textAlign: 'center', background: `${T.red}05`, cursor: 'pointer' }}
              onClick={() => setMediaAttached([{ id: 1, type: 'video', name: 'video.mp4' }])}>
              {mediaAttached.some(m => m.type === 'video') ? (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🎬</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text, fontFamily: "'Outfit', sans-serif" }}>video.mp4 attached</div>
                  <div style={{ fontSize: 11, color: T.accent, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>Ready to publish</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🎥</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>Tap to upload or record video</div>
                  <div style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>MP4, MOV, WebM • Max 500MB • Up to 30 min</div>
                </div>
              )}
            </div>

            {/* Title */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Title</label>
              <input value={postText} onChange={e => setPostText(e.target.value)} placeholder="Give your video a title" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Description</label>
              <textarea placeholder="What's this video about?" style={{ width: '100%', minHeight: 80, padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.5 }} />
            </div>

            {/* Thumbnail */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Thumbnail</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ width: 80, height: 45, borderRadius: 10, background: `${T.card}`, border: `1px solid ${i === 1 ? T.primary : T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <span style={{ fontSize: 10, color: T.dim, fontFamily: "'DM Mono', monospace" }}>:{String(i*10).padStart(2,'0')}</span>
                  </div>
                ))}
                <div style={{ width: 80, height: 45, borderRadius: 10, border: `1px dashed ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 14 }}>📷</span>
                </div>
              </div>
            </div>

            <TagSelector />

            {/* Earning breakdown */}
            <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 16, background: `${T.gold}06`, border: `1px solid ${T.gold}12` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Earning potential</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>
                <span>Upload bonus</span><span style={{ color: T.gold, fontFamily: "'DM Mono', monospace" }}>+2.0 HRS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>
                <span>Per viewer minute</span><span style={{ color: T.gold, fontFamily: "'DM Mono', monospace" }}>+0.01 HRS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>
                <span>Per tip received</span><span style={{ color: T.gold, fontFamily: "'DM Mono', monospace" }}>varies</span>
              </div>
            </div>
          </div>
          <PublishButton label="Upload" disabled={!mediaAttached.some(m => m.type === 'video') || !postText} earning="+2.0 HRS" />
        </div>
      )}
    </div>
  );

  // ═══ ARTICLE EDITOR ═══
  const ArticleComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Write Article" color={T.cyan} />
      {published ? <SuccessView type="article" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Cover image */}
            <div style={{ borderRadius: 18, overflow: 'hidden', marginBottom: 16, border: `1px dashed ${T.border}`, padding: '24px 20px', textAlign: 'center', background: `${T.cyan}05`, cursor: 'pointer' }}
              onClick={() => setMediaAttached([{ id: 1, type: 'image', name: 'cover.jpg' }])}>
              {mediaAttached.length > 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>🖼️</span>
                  <span style={{ fontSize: 12, color: T.accent, fontFamily: "'Outfit', sans-serif" }}>Cover image attached</span>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: 24 }}>🖼️</span>
                  <div style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif", marginTop: 4 }}>Add a cover image (optional)</div>
                </div>
              )}
            </div>

            {/* Title */}
            <input value={articleTitle} onChange={e => setArticleTitle(e.target.value)} placeholder="Title your article" style={{ width: '100%', padding: '4px 0', border: 'none', background: 'transparent', color: T.text, fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 4 }} />
            <input placeholder="Add a subtitle (optional)" style={{ width: '100%', padding: '4px 0', border: 'none', background: 'transparent', color: T.sub, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 16 }} />

            {/* Body */}
            <textarea value={articleBody} onChange={e => setArticleBody(e.target.value)} placeholder="Start writing your article..." style={{ width: '100%', minHeight: 250, padding: 0, border: 'none', background: 'transparent', color: T.text, fontSize: 15, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.8 }} />

            {/* Formatting toolbar */}
            <div style={{ display: 'flex', gap: 4, padding: '10px 0', borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, marginBottom: 12 }}>
              {['B', 'I', 'H1', 'H2', '—', '❝', '🔗', '📷', '🎥', '< >'].map(tool => (
                <button key={tool} style={{ padding: '6px 10px', borderRadius: 8, background: T.card, border: `1px solid ${T.border}`, color: T.sub, fontSize: 11, fontWeight: tool === 'B' ? 900 : tool === 'I' ? 400 : 600, fontStyle: tool === 'I' ? 'italic' : 'normal', cursor: 'pointer', fontFamily: "'DM Mono', monospace" }}>{tool}</button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{articleBody.split(' ').filter(Boolean).length} words • ~{Math.ceil(articleBody.split(' ').filter(Boolean).length / 200)} min read</span>
            </div>

            <TagSelector />
          </div>
          <PublishButton label="Publish Article" disabled={!articleTitle || articleBody.length < 50} earning="+3.0 HRS" />
        </div>
      )}
    </div>
  );

  // ═══ DISCUSSION COMPOSER ═══
  const DiscussionComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Start Discussion" color={T.purple} />
      {published ? <SuccessView type="discussion" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Group selector */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Post to group</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[{ name: 'Tech Builders', emoji: '⚡', members: '2.4K' }, { name: 'Creative Studio', emoji: '🎨', members: '1.8K' }, { name: 'Crypto Minds', emoji: '🧠', members: '3.1K' }].map((g, i) => (
                  <button key={i} style={{ padding: '10px 14px', borderRadius: 14, background: i === 0 ? `${T.purple}15` : T.card, border: `1px solid ${i === 0 ? T.purple : T.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 16 }}>{g.emoji}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? T.purple : T.sub, fontFamily: "'Outfit', sans-serif" }}>{g.name}</div>
                      <div style={{ fontSize: 9, color: T.dim, fontFamily: "'DM Mono', monospace" }}>{g.members}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Thread title */}
            <input value={postText} onChange={e => setPostText(e.target.value)} placeholder="Discussion title" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 12 }} />

            {/* Body */}
            <textarea placeholder="Share your thoughts, questions, or ideas with the group..." style={{ width: '100%', minHeight: 150, padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.6 }} />

            <AttachedMedia />
            <div style={{ marginTop: 12 }}><MediaDropZone compact /></div>
            <TagSelector />
          </div>
          <PublishButton label="Start Discussion" disabled={!postText} earning="+1.0 HRS" />
        </div>
      )}
    </div>
  );

  // ═══ PRODUCT LISTING ═══
  const ProductComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="List Product" color={T.pink} />
      {published ? <SuccessView type="product" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Product images */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Product photos</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} onClick={() => setMediaAttached([...mediaAttached, { id: Date.now() + i, type: 'image', name: `product_${i+1}.jpg` }])} style={{
                    width: 72, height: 72, borderRadius: 14, cursor: 'pointer',
                    background: i < mediaAttached.length ? `${T.pink}15` : T.card,
                    border: `1px ${i < mediaAttached.length ? 'solid' : 'dashed'} ${i < mediaAttached.length ? T.pink : T.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: i < mediaAttached.length ? 24 : 18, color: T.dim }}>{i < mediaAttached.length ? '🖼️' : '+'}</span>
                  </div>
                ))}
              </div>
            </div>

            <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="Product name" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 12 }} />

            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Price</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: T.dim }}>$</span>
                  <input value={productPrice} onChange={e => setProductPrice(e.target.value)} placeholder="0.00" type="number" style={{ width: '100%', padding: '14px 16px 14px 28px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontFamily: "'DM Mono', monospace", outline: 'none' }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Category</label>
                <select style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none' }}>
                  <option>Digital</option><option>Physical</option><option>Service</option><option>Course</option>
                </select>
              </div>
            </div>

            <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Describe your product..." style={{ width: '100%', minHeight: 100, padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.5, marginBottom: 12 }} />

            {/* Revenue split preview */}
            {productPrice && (
              <div style={{ padding: '14px 16px', borderRadius: 16, background: `${T.accent}06`, border: `1px solid ${T.accent}12`, marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.accent, fontFamily: "'Outfit', sans-serif", letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Revenue split</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>You keep (~95%)*</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: T.accent, fontFamily: "'DM Mono', monospace" }}>${(parseFloat(productPrice) * 0.95).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>Platform (~5%)*</span>
                  <span style={{ fontSize: 12, color: T.dim, fontFamily: "'DM Mono', monospace" }}>${(parseFloat(productPrice) * 0.05).toFixed(2)}</span>
                </div>
              </div>
            )}

            <TagSelector />
          </div>
          <PublishButton label="List Product" disabled={!productName || !productPrice} earning="~95% revenue" />
        </div>
      )}
    </div>
  );

  // ═══ AUDIO ROOM ═══
  const AudioComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Host Audio Room" color={T.orange} />
      {published ? <SuccessView type="audio" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Live indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '10px 16px', borderRadius: 14, background: `${T.red}10`, border: `1px solid ${T.red}20` }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: T.red, boxShadow: `0 0 8px ${T.red}` }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.red, fontFamily: "'Outfit', sans-serif" }}>You'll go live when you publish</span>
            </div>

            <input value={postText} onChange={e => setPostText(e.target.value)} placeholder="Room title" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 12 }} />

            <textarea placeholder="What will you discuss? (helps people decide to join)" style={{ width: '100%', minHeight: 80, padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 13, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.5, marginBottom: 16 }} />

            {/* Room settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Allow audience to speak', desc: 'Listeners can request to join stage', default: true },
                { label: 'Record room', desc: 'Save as podcast episode', default: false },
                { label: 'Invite co-hosts', desc: 'Add up to 4 co-hosts', default: false },
              ].map((setting, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 14, background: T.card, border: `1px solid ${T.border}` }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: "'Outfit', sans-serif" }}>{setting.label}</div>
                    <div style={{ fontSize: 10, color: T.dim, fontFamily: "'Outfit', sans-serif" }}>{setting.desc}</div>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: setting.default ? T.accent : T.dim, padding: 2, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: setting.default ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.2s' }} />
                  </div>
                </div>
              ))}
            </div>

            <TagSelector />

            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 14, background: `${T.gold}06`, border: `1px solid ${T.gold}12` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🔥</span>
                <div style={{ fontSize: 11, color: T.gold, fontFamily: "'Outfit', sans-serif" }}>
                  <strong>Live rooms earn 2x HOURS</strong> — both you and your listeners earn while you talk!
                </div>
              </div>
            </div>
          </div>
          <PublishButton label="🔴 Go Live" disabled={!postText} earning="+1.5 HRS/hr" />
        </div>
      )}
    </div>
  );

  // ═══ GOVERNANCE PROPOSAL ═══
  const ProposalComposer = () => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar title="Submit Proposal" color={T.gold} />
      {published ? <SuccessView type="proposal" /> : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, padding: '16px 20px' }}>
            {/* Requirements notice */}
            <div style={{ padding: '12px 16px', borderRadius: 14, background: `${T.gold}06`, border: `1px solid ${T.gold}12`, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.gold, fontFamily: "'Outfit', sans-serif", lineHeight: 1.6 }}>
                <strong>📋 Proposal requirements:</strong> Trust score ≥ 85, Level ≥ 5, and 50 HOURS minimum stake to submit. Your stake is returned after voting ends.
              </div>
            </div>

            <input value={proposalTitle} onChange={e => setProposalTitle(e.target.value)} placeholder="Proposal title" style={{ width: '100%', padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", outline: 'none', marginBottom: 12 }} />

            {/* Type selector */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Proposal type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Feature Request', 'Policy Change', 'Budget Allocation', 'Community Rule'].map((type, i) => (
                  <button key={type} style={{ padding: '8px 14px', borderRadius: 12, fontSize: 11, background: i === 0 ? `${T.gold}15` : T.card, border: `1px solid ${i === 0 ? T.gold : T.border}`, color: i === 0 ? T.gold : T.sub, cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: i === 0 ? 600 : 400 }}>{type}</button>
                ))}
              </div>
            </div>

            <textarea value={proposalBody} onChange={e => setProposalBody(e.target.value)} placeholder="Describe your proposal in detail. Include the problem, proposed solution, and expected impact..." style={{ width: '100%', minHeight: 160, padding: '14px 16px', borderRadius: 14, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: 14, fontFamily: "'Outfit', sans-serif", resize: 'none', outline: 'none', lineHeight: 1.6, marginBottom: 12 }} />

            {/* Voting options */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Voting options</label>
              {['Approve', 'Reject', 'Needs revision'].map((opt, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 12, background: T.card, border: `1px solid ${T.border}`, marginBottom: 6 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${T.dim}`, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: T.sub, fontFamily: "'Outfit', sans-serif" }}>{opt}</span>
                </div>
              ))}
            </div>

            {/* Duration */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: T.dim, fontFamily: "'Outfit', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Voting period</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['3 days', '7 days', '14 days', '30 days'].map((d, i) => (
                  <button key={d} style={{ padding: '8px 14px', borderRadius: 12, fontSize: 11, background: i === 1 ? `${T.gold}15` : T.card, border: `1px solid ${i === 1 ? T.gold : T.border}`, color: i === 1 ? T.gold : T.sub, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}>{d}</button>
                ))}
              </div>
            </div>
          </div>
          <PublishButton label="Submit Proposal (50 HRS stake)" disabled={!proposalTitle || proposalBody.length < 100} earning="+2.0 HRS" />
        </div>
      )}
    </div>
  );

  // ═══ RENDER ═══
  const views = {
    picker: TypePicker, post: PostComposer, video: VideoComposer,
    article: ArticleComposer, discussion: DiscussionComposer,
    product: ProductComposer, audio: AudioComposer, proposal: ProposalComposer,
  };
  const CurrentView = views[mode] || TypePicker;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text, position: 'relative' }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; }
        button:hover:not(:disabled) { filter: brightness(1.08); }
        input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.4); }
        select { appearance: none; }
      `}</style>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: `radial-gradient(circle, ${T.primary}08, transparent 70%)`, top: -100, right: -80, filter: 'blur(80px)' }} />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
        <CurrentView />
      </div>
    </div>
  );
};

export default OursCompose;
