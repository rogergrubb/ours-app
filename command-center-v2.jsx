import React, { useState, useEffect } from 'react';

const OneBillionDashboard = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [activeTab, setActiveTab] = useState('map');
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPulsePhase(p => (p + 1) % 60), 1000);
    return () => clearInterval(interval);
  }, []);

  // ─── EMPIRE PROJECTS ───
  const projects = [
    {
      id: 'sentinel',
      name: 'SENTINEL',
      status: 'active',
      type: 'intelligence',
      description: 'AI-powered crypto trading intelligence. Monitors 148K+ MoltBook agents for pump signals.',
      url: 'sentinel-dashboard-phi.vercel.app',
      revenue: '$0',
      potential: '$18K/yr (12 subs × $1,500/mo)',
      stack: 'FastAPI + Vercel + DexScreener + MoltBook API',
      metrics: { signals: '2 confirmed', accuracy: '100%', agents: '148K+' },
      color: '#ef4444',
    },
    {
      id: 'ours',
      name: 'OURS',
      status: 'building',
      type: 'platform',
      description: 'Social platform that pays users. Revenue-sharing via HOURS tokens. Groups + Marketplace + Storefronts.',
      url: 'ours-landing-cyan.vercel.app',
      revenue: '$0',
      potential: '$1B+ (platform)',
      stack: 'Next.js + Vercel + Supabase',
      metrics: { phase: 'MVP Architecture', users: '0', features: '4 core' },
      color: '#10b981',
    },
    {
      id: 'bookempire',
      name: 'Book Empire',
      status: 'active',
      type: 'affiliate',
      description: '100-domain book affiliate network. Amazon Associates tag: bookwormgui0d-20.',
      url: 'readingorder.online',
      revenue: '$0',
      potential: '$50K/yr (at scale)',
      stack: 'Static HTML + Vercel + Amazon Associates',
      metrics: { domains: '6 live', tag: 'bookwormgui0d-20', sales: '0/3 qualifying' },
      color: '#8b5cf6',
    },
    {
      id: 'goldenneedle',
      name: 'Golden Needle Finder',
      status: 'approved',
      type: 'saas',
      description: 'Probate property finder for Contra Costa County. Auto-identifies distressed properties.',
      url: null,
      revenue: '$0',
      potential: '$1M ARR',
      stack: 'Python + RecorderWorks + CCMap + HUD/USPS',
      metrics: { county: 'Contra Costa', dataSource: 'Public records', tier: '3 price tiers' },
      color: '#f59e0b',
    },
    {
      id: 'minime',
      name: 'MiniMe / ClawdBot',
      status: 'active',
      type: 'infrastructure',
      description: 'Local autonomous AI assistant. Multi-LLM backend, Telegram bot, file ops, memory system.',
      url: 't.me/MiniMeeeeeeeBot',
      revenue: '$0',
      potential: 'Force multiplier',
      stack: 'Windows 11 Pro + Multi-LLM + Telegram',
      metrics: { bot: '@MiniMeeeeeeeBot', backend: 'Claude Opus 4.5', restart: 'clawdbot gateway run' },
      color: '#06b6d4',
    },
  ];

  const statusColors = {
    active: { bg: '#065f46', text: '#34d399', label: 'ACTIVE', dot: '#10b981' },
    building: { bg: '#1e3a5f', text: '#60a5fa', label: 'BUILDING', dot: '#3b82f6' },
    approved: { bg: '#78350f', text: '#fbbf24', label: 'APPROVED', dot: '#f59e0b' },
    planned: { bg: '#1f2937', text: '#9ca3af', label: 'PLANNED', dot: '#6b7280' },
  };

  // ─── PIPELINE VIEW ───
  const pipelineStages = [
    { id: 'discovery', label: 'DISCOVERY', icon: '🔍', items: ['Market Scanner', 'Trend Analyzer', 'Competitor Watch'] },
    { id: 'inbox', label: 'INBOX', icon: '📥', items: ['VoiceLink', 'MapAndMingle', 'ClaimSnap'] },
    { id: 'evaluating', label: 'EVALUATING', icon: '⚖️', items: [] },
    { id: 'approved', label: 'APPROVED', icon: '✅', items: ['OURS Platform', 'Golden Needle Finder'] },
    { id: 'building', label: 'BUILDING', icon: '🔨', items: ['OURS MVP'] },
    { id: 'live', label: 'LIVE', icon: '🟢', items: ['SENTINEL', 'Book Empire', 'MiniMe'] },
  ];

  // ─── AGENT REGISTRY ───
  const agents = [
    { name: 'MoltBook Collector', project: 'SENTINEL', status: 'active', schedule: 'Every 5 min', type: 'Data Collection' },
    { name: 'Price Tracker', project: 'SENTINEL', status: 'active', schedule: 'Every 2 min', type: 'Data Collection' },
    { name: 'Signal Generator', project: 'SENTINEL', status: 'active', schedule: 'Real-time', type: 'Analysis' },
    { name: 'MiniMe Core', project: 'ClawdBot', status: 'active', schedule: '24/7', type: 'Orchestrator' },
    { name: 'Telegram Relay', project: 'ClawdBot', status: 'active', schedule: '24/7', type: 'Communication' },
    { name: 'Content Generator', project: 'Book Empire', status: 'planned', schedule: 'On demand', type: 'Builder' },
    { name: 'SEO Optimizer', project: 'Book Empire', status: 'planned', schedule: 'Weekly', type: 'Optimization' },
    { name: 'Probate Scanner', project: 'Golden Needle', status: 'planned', schedule: 'Daily', type: 'Data Collection' },
    { name: 'Property Enricher', project: 'Golden Needle', status: 'planned', schedule: 'On match', type: 'Analysis' },
    { name: 'HOURS Calculator', project: 'OURS', status: 'planned', schedule: 'Real-time', type: 'Core Engine' },
    { name: 'Revenue Distributor', project: 'OURS', status: 'planned', schedule: 'Daily', type: 'Financial' },
    { name: 'Price Tag Calculator', project: 'OURS', status: 'building', schedule: 'User-triggered', type: 'Viral Hook' },
  ];

  const activeCount = agents.filter(a => a.status === 'active').length;
  const buildingCount = agents.filter(a => a.status === 'building').length;

  const selected = selectedNode ? projects.find(p => p.id === selectedNode) : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace',",
      color: '#e2e8f0',
      padding: '16px',
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ─── HEADER ─── */}
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            <h1 style={{
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              letterSpacing: -1,
            }}>
              $1B
            </h1>
            <p style={{ color: '#64748b', fontSize: 12, margin: '4px 0 0' }}>
              Autonomous Empire • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{
              background: pulsePhase % 3 === 0 ? '#065f46' : '#064e3b',
              color: '#34d399',
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              transition: 'background 0.5s',
            }}>
              ● {activeCount} agents online
            </span>
            <span style={{
              background: '#1e3a5f',
              color: '#60a5fa',
              padding: '4px 10px',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
            }}>
              ◉ {buildingCount} building
            </span>
          </div>
        </div>

        {/* ─── STATS BAR ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 8,
          marginBottom: 16,
        }}>
          {[
            { label: 'Projects', value: projects.length, color: '#60a5fa' },
            { label: 'Live', value: projects.filter(p => p.status === 'active').length, color: '#34d399' },
            { label: 'Agents', value: agents.length, color: '#a78bfa' },
            { label: 'Revenue', value: '$0', color: '#fbbf24' },
            { label: 'Deployments', value: '40+', color: '#f472b6' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: 8,
              padding: '12px 8px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ─── TAB NAV ─── */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {[
            { id: 'map', label: '🗺️ Empire Map' },
            { id: 'pipeline', label: '📊 Pipeline' },
            { id: 'agents', label: '🤖 Agent Registry' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: 'none',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                background: activeTab === tab.id ? 'rgba(96, 165, 250, 0.15)' : 'rgba(30, 41, 59, 0.3)',
                color: activeTab === tab.id ? '#60a5fa' : '#64748b',
                borderBottom: activeTab === tab.id ? '2px solid #60a5fa' : '2px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── EMPIRE MAP TAB ─── */}
        {activeTab === 'map' && (
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 10,
              }}>
                {projects.map(project => {
                  const sc = statusColors[project.status];
                  const isSelected = selectedNode === project.id;
                  return (
                    <div
                      key={project.id}
                      onClick={() => setSelectedNode(isSelected ? null : project.id)}
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${project.color}22, ${project.color}11)`
                          : 'rgba(15, 23, 42, 0.8)',
                        border: `1px solid ${isSelected ? project.color : 'rgba(71, 85, 105, 0.3)'}`,
                        borderRadius: 10,
                        padding: 14,
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Status indicator */}
                      <div style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: sc.dot,
                        boxShadow: project.status === 'active' ? `0 0 8px ${sc.dot}` : 'none',
                        animation: project.status === 'active' ? 'none' : 'none',
                      }} />

                      <div style={{
                        fontSize: 16,
                        fontWeight: 700,
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: project.color,
                        marginBottom: 4,
                      }}>
                        {project.name}
                      </div>

                      <span style={{
                        display: 'inline-block',
                        background: sc.bg,
                        color: sc.text,
                        padding: '2px 8px',
                        borderRadius: 10,
                        fontSize: 9,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        marginBottom: 8,
                      }}>
                        {sc.label}
                      </span>

                      <p style={{
                        fontSize: 11,
                        color: '#94a3b8',
                        lineHeight: 1.4,
                        margin: '8px 0 0',
                      }}>
                        {project.description.substring(0, 80)}...
                      </p>

                      <div style={{
                        marginTop: 10,
                        borderTop: '1px solid rgba(71, 85, 105, 0.2)',
                        paddingTop: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 10,
                        color: '#64748b',
                      }}>
                        <span>Potential</span>
                        <span style={{ color: '#fbbf24', fontWeight: 600 }}>{project.potential.split(' ')[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── DETAIL PANEL ─── */}
            <div style={{
              width: 280,
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(71, 85, 105, 0.3)',
              borderRadius: 10,
              padding: 16,
              minHeight: 300,
            }}>
              {selected ? (
                <div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: selected.color,
                    marginBottom: 4,
                  }}>
                    {selected.name}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    background: statusColors[selected.status].bg,
                    color: statusColors[selected.status].text,
                    padding: '2px 8px',
                    borderRadius: 10,
                    fontSize: 9,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}>
                    {statusColors[selected.status].label}
                  </span>

                  <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5, margin: '12px 0' }}>
                    {selected.description}
                  </p>

                  {selected.url && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>URL</div>
                      <div style={{ fontSize: 11, color: '#60a5fa', wordBreak: 'break-all' }}>{selected.url}</div>
                    </div>
                  )}

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Stack</div>
                    <div style={{ fontSize: 11, color: '#e2e8f0' }}>{selected.stack}</div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 10, color: '#64748b', marginBottom: 2 }}>Revenue Potential</div>
                    <div style={{ fontSize: 14, color: '#fbbf24', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{selected.potential}</div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(71, 85, 105, 0.3)', paddingTop: 10 }}>
                    <div style={{ fontSize: 10, color: '#64748b', marginBottom: 6 }}>Metrics</div>
                    {Object.entries(selected.metrics).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{key}</span>
                        <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ color: '#64748b', fontSize: 12 }}>
                  <p style={{ marginBottom: 16 }}>👈 Select a project for details</p>
                  <div style={{ borderTop: '1px solid rgba(71, 85, 105, 0.2)', paddingTop: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#e2e8f0', marginBottom: 10 }}>Empire Summary</div>
                    {[
                      ['Total Projects', projects.length, '#60a5fa'],
                      ['Active', projects.filter(p => p.status === 'active').length, '#34d399'],
                      ['Building', projects.filter(p => p.status === 'building').length, '#60a5fa'],
                      ['Approved', projects.filter(p => p.status === 'approved').length, '#fbbf24'],
                      ['Agents Online', activeCount, '#a78bfa'],
                      ['Vercel Deploys', '40+', '#f472b6'],
                      ['Revenue', '$0 (pre-revenue)', '#64748b'],
                    ].map(([label, val, color], i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                        <span style={{ color: '#94a3b8' }}>{label}</span>
                        <span style={{ color, fontWeight: 600 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── PIPELINE TAB ─── */}
        {activeTab === 'pipeline' && (
          <div style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 8,
          }}>
            {pipelineStages.map((stage, i) => (
              <div key={stage.id} style={{
                minWidth: 160,
                flex: 1,
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(71, 85, 105, 0.3)',
                borderRadius: 10,
                padding: 12,
              }}>
                <div style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  <span>{stage.icon}</span>
                  <span>{stage.label}</span>
                  <span style={{
                    marginLeft: 'auto',
                    background: 'rgba(71, 85, 105, 0.3)',
                    padding: '1px 6px',
                    borderRadius: 8,
                    fontSize: 9,
                  }}>
                    {stage.items.length}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {stage.items.map((item, j) => {
                    const isLive = stage.id === 'live';
                    const isBuilding = stage.id === 'building';
                    return (
                      <div key={j} style={{
                        background: isLive
                          ? 'rgba(16, 185, 129, 0.1)'
                          : isBuilding
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'rgba(30, 41, 59, 0.5)',
                        border: `1px solid ${isLive ? 'rgba(16, 185, 129, 0.2)' : isBuilding ? 'rgba(59, 130, 246, 0.2)' : 'rgba(71, 85, 105, 0.15)'}`,
                        borderRadius: 6,
                        padding: '6px 8px',
                        fontSize: 11,
                        color: isLive ? '#34d399' : isBuilding ? '#60a5fa' : '#94a3b8',
                        fontWeight: 500,
                      }}>
                        {isLive && '● '}{item}
                      </div>
                    );
                  })}
                  {stage.items.length === 0 && (
                    <div style={{
                      fontSize: 10,
                      color: '#475569',
                      fontStyle: 'italic',
                      padding: '8px 0',
                    }}>
                      Empty
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── AGENT REGISTRY TAB ─── */}
        {activeTab === 'agents' && (
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(71, 85, 105, 0.3)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr 1fr',
              padding: '10px 14px',
              background: 'rgba(30, 41, 59, 0.5)',
              borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
              fontSize: 10,
              fontWeight: 700,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              <span>Agent</span>
              <span>Project</span>
              <span>Status</span>
              <span>Schedule</span>
              <span>Type</span>
            </div>
            {/* Rows */}
            {agents.map((agent, i) => {
              const sc = statusColors[agent.status] || statusColors.planned;
              return (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1.5fr 1fr 1.5fr 1fr',
                  padding: '8px 14px',
                  borderBottom: '1px solid rgba(71, 85, 105, 0.1)',
                  fontSize: 11,
                  alignItems: 'center',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(30, 41, 59, 0.15)',
                }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{agent.name}</span>
                  <span style={{ color: '#94a3b8' }}>{agent.project}</span>
                  <span>
                    <span style={{
                      display: 'inline-block',
                      background: sc.bg,
                      color: sc.text,
                      padding: '1px 6px',
                      borderRadius: 8,
                      fontSize: 9,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}>
                      {sc.label}
                    </span>
                  </span>
                  <span style={{ color: '#64748b' }}>{agent.schedule}</span>
                  <span style={{ color: '#64748b' }}>{agent.type}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── FOOTER ─── */}
        <div style={{
          marginTop: 16,
          padding: '12px 16px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(71, 85, 105, 0.2)',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 11,
          color: '#475569',
        }}>
          <span>Vercel Team: team_h4aVKRrQ17g4dZCH1XgVsMR5</span>
          <span>MiniMe: @MiniMeeeeeeeBot</span>
          <span>SENTINEL: port 7000 via ngrok</span>
          <span style={{ color: '#34d399' }}>● Systems nominal</span>
        </div>
      </div>
    </div>
  );
};

export default OneBillionDashboard;
