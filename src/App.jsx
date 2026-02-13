import React, { lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// Lazy load all pages
const Homepage = lazy(() => import('./pages/ours-homepage'))
const Auth = lazy(() => import('./pages/ours-auth'))
const Feed = lazy(() => import('./pages/ours-feed'))
const Live = lazy(() => import('./pages/ours-live'))
const Notifications = lazy(() => import('./pages/ours-notifications'))
const HoursEconomy = lazy(() => import('./pages/ours-hours-economy'))
const CandyStore = lazy(() => import('./pages/ours-candy-store'))
const Creator = lazy(() => import('./pages/ours-creator'))
const Compose = lazy(() => import('./pages/ours-compose'))
const Onboarding = lazy(() => import('./pages/ours-onboarding'))
const Profile = lazy(() => import('./pages/ours-profile'))
const Search = lazy(() => import('./pages/ours-search'))
const Messages = lazy(() => import('./pages/ours-messages'))
const Wallet = lazy(() => import('./pages/ours-wallet'))
const Watch = lazy(() => import('./pages/ours-watch'))
const LoggedInHome = lazy(() => import('./pages/ours-logged-in-home'))
const SiteArchitecture = lazy(() => import('./pages/ours-site-architecture'))
const MvpBlueprint = lazy(() => import('./pages/ours-mvp-v2'))
const FullApp = lazy(() => import('./pages/ours-app'))
const Complete = lazy(() => import('./pages/ours-complete'))

const Loading = () => (
  <div style={{
    minHeight: '100vh', background: '#030712',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: 12,
  }}>
    <div style={{ fontSize: 32, animation: 'pulse 1.5s infinite' }}>⏣</div>
    <div style={{
      fontSize: 13, color: '#8b9dc3',
      fontFamily: "'Outfit', sans-serif",
    }}>Loading...</div>
    <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
  </div>
)

// ═══ PROTOTYPE DIRECTORY ═══
const Directory = () => {
  const pages = [
    { section: 'PUBLIC FACING', items: [
      { path: '/homepage', name: 'Homepage', desc: 'Editorial manifesto landing page', icon: '🏠', lines: '700+', status: 'complete' },
      { path: '/auth', name: 'Auth Flow', desc: '6 screens: magic link, OAuth, human verification', icon: '🔐', lines: '800+', status: 'complete' },
    ]},
    { section: 'CORE EXPERIENCE', items: [
      { path: '/feed', name: 'Social Feed', desc: '9 post types, stories, reactions, comments, tipping', icon: '📱', lines: '1,482', status: 'complete' },
      { path: '/live', name: 'Live Streaming', desc: 'Building in public, podcasts, coworking, ambient', icon: '📡', lines: '1,126', status: 'complete' },
      { path: '/notifications', name: 'Notifications', desc: 'Per-creator subs, SMS/push/in-app, live banners', icon: '🔔', lines: '928', status: 'complete' },
      { path: '/hours', name: 'HOURS Economy', desc: 'Earning, spending, tiers, revenue sharing, simulator', icon: '⏣', lines: '990', status: 'complete' },
    ]},
    { section: 'ZONES & NAVIGATION', items: [
      { path: '/complete', name: '🆕 Complete Candy Store', desc: 'V3: All 8 zones deep + waitlist + onboarding', icon: '🍬', lines: '2,050', status: 'complete' },
      { path: '/candy-store', name: 'Candy Store Home', desc: 'Zone-based logged-in experience', icon: '🍬', lines: '600+', status: 'complete' },
      { path: '/logged-in-home', name: 'Logged-In Home', desc: 'Dashboard after authentication', icon: '🏡', lines: '686', status: 'complete' },
      { path: '/watch', name: 'Watch Zone', desc: 'Video content zone', icon: '🎬', lines: '154', status: 'prototype' },
      { path: '/search', name: 'Search', desc: 'Discovery & search', icon: '🔍', lines: '153', status: 'prototype' },
    ]},
    { section: 'CREATOR TOOLS', items: [
      { path: '/creator', name: 'Creator Studio', desc: 'Universal content creator — 8 types', icon: '🎨', lines: '1,154', status: 'complete' },
      { path: '/compose', name: 'Quick Compose', desc: 'Fast post creation flow', icon: '✏️', lines: '653', status: 'complete' },
    ]},
    { section: 'USER PAGES', items: [
      { path: '/profile', name: 'Profile', desc: 'User profile page', icon: '👤', lines: '221', status: 'prototype' },
      { path: '/messages', name: 'Messages', desc: 'Messaging system', icon: '💬', lines: '138', status: 'prototype' },
      { path: '/wallet', name: 'Wallet', desc: 'HOURS wallet & transactions', icon: '💰', lines: '169', status: 'prototype' },
      { path: '/onboarding', name: 'Onboarding', desc: 'New user setup flow', icon: '👋', lines: '201', status: 'prototype' },
    ]},
    { section: 'PLANNING & STRATEGY', items: [
      { path: '/architecture', name: 'Site Architecture', desc: 'Interactive 80+ page sitemap', icon: '🗺️', lines: '800+', status: 'complete' },
      { path: '/blueprint', name: 'MVP Blueprint', desc: '20×20 product strategy', icon: '📋', lines: '700+', status: 'complete' },
      { path: '/full-app', name: 'Full App Prototype', desc: '18-page clickable prototype', icon: '📱', lines: '1,000+', status: 'complete' },
    ]},
  ]

  return (
    <div style={{
      minHeight: '100vh', background: '#030712', padding: '0 16px',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 8px rgba(251,191,36,0.2); } 50% { box-shadow: 0 0 24px rgba(251,191,36,0.4); } }
      `}</style>

      <div style={{ maxWidth: 520, margin: '0 auto', paddingBottom: 60 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 0 30px' }}>
          <div style={{ fontSize: 48, marginBottom: 8, animation: 'float 3s ease-in-out infinite' }}>⏣</div>
          <h1 style={{
            fontSize: 36, fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 6,
          }}>OURS</h1>
          <p style={{ fontSize: 14, color: '#8b9dc3', fontWeight: 500 }}>The Platform That Pays You Back</p>
          <p style={{ fontSize: 11, color: '#4a5b7a', marginTop: 4 }}>Prototype Directory — {pages.reduce((sum, s) => sum + s.items.length, 0)} pages</p>
        </div>

        {/* Total stats */}
        <div style={{
          display: 'flex', gap: 8, marginBottom: 24,
        }}>
          {[
            { label: 'Pages', value: '19', color: '#0ea5e9' },
            { label: 'Lines', value: '13,236', color: '#10b981' },
            { label: 'Post Types', value: '9', color: '#fbbf24' },
            { label: 'Zones', value: '8', color: '#a78bfa' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, padding: '12px 8px', borderRadius: 14, textAlign: 'center',
              background: '#0a1122', border: '1px solid rgba(56,68,100,0.18)',
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: stat.color, fontFamily: "'DM Mono', monospace" }}>{stat.value}</div>
              <div style={{ fontSize: 9, color: '#4a5b7a', fontFamily: "'DM Mono', monospace" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Page sections */}
        {pages.map((section, si) => (
          <div key={si} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#4a5b7a',
              letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8,
              paddingLeft: 2,
            }}>{section.section}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {section.items.map((page, pi) => (
                <Link key={page.path} to={page.path} style={{
                  display: 'flex', gap: 12, padding: '12px 14px',
                  borderRadius: 14, background: '#0a1122',
                  border: '1px solid rgba(56,68,100,0.18)',
                  transition: 'all 0.2s',
                  animation: `slideUp 0.3s ease ${(si * 0.1) + (pi * 0.04)}s both`,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    background: '#0f1a2e', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 20,
                    border: '1px solid rgba(56,68,100,0.18)',
                  }}>{page.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#eaf0f9' }}>{page.name}</span>
                      <span style={{
                        fontSize: 8, fontWeight: 600, padding: '1px 6px', borderRadius: 4,
                        background: page.status === 'complete' ? 'rgba(16,185,129,0.12)' : 'rgba(251,191,36,0.12)',
                        color: page.status === 'complete' ? '#10b981' : '#fbbf24',
                        fontFamily: "'DM Mono', monospace",
                      }}>{page.status === 'complete' ? '✓ Complete' : '◐ Prototype'}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#8b9dc3', marginTop: 2 }}>{page.desc}</div>
                  </div>
                  <div style={{
                    fontSize: 10, color: '#4a5b7a', fontFamily: "'DM Mono', monospace",
                    alignSelf: 'center', flexShrink: 0,
                  }}>{page.lines} loc</div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Footer */}
        <div style={{
          textAlign: 'center', padding: '20px 0', borderTop: '1px solid rgba(56,68,100,0.18)',
          marginTop: 20,
        }}>
          <p style={{ fontSize: 9, color: '#4a5b7a', fontFamily: "'DM Mono', monospace", lineHeight: 1.6 }}>
            OURS — User-owned social media. © 2026 SellFast.Now<br/>
            All HOURS values are illustrative targets, not guarantees.
          </p>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Directory />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/live" element={<Live />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/hours" element={<HoursEconomy />} />
        <Route path="/candy-store" element={<CandyStore />} />
        <Route path="/logged-in-home" element={<LoggedInHome />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/creator" element={<Creator />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/architecture" element={<SiteArchitecture />} />
        <Route path="/blueprint" element={<MvpBlueprint />} />
        <Route path="/full-app" element={<FullApp />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="*" element={<Directory />} />
      </Routes>
    </Suspense>
  )
}

export default App
