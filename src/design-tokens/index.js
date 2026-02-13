// ═══════════════════════════════════════════════════════════════════════
// OURS DESIGN TOKEN SYSTEM — Single Source of Truth
// Owner: Chief UX (CUX)
//
// Every page, component, and zone MUST import from here.
// No hardcoded colors, fonts, or spacing anywhere else.
// ═══════════════════════════════════════════════════════════════════════

// ═══ COLORS ═══

export const colors = {
  // Backgrounds (darkest to lightest)
  bg:        '#030712',   // app background
  surface:   '#0a1122',   // cards, panels
  card:      '#0f1a2e',   // elevated cards
  elevated:  '#152240',   // modals, popovers
  overlay:   'rgba(3,7,18,0.6)',  // backdrop overlays
  
  // Borders
  border:    'rgba(56,68,100,0.18)',
  borderHover: 'rgba(56,68,100,0.35)',
  borderActive: 'rgba(56,68,100,0.50)',
  
  // Glow effects
  glow:      'rgba(14,165,233,0.06)',
  glowStrong: 'rgba(14,165,233,0.12)',
  
  // Text
  text:      '#eaf0f9',   // primary text
  sub:       '#8b9dc3',   // secondary text
  dim:       '#4a5b7a',   // tertiary/muted text
  
  // Brand primary
  primary:   '#0ea5e9',   // links, interactive elements
  primaryHover: '#38bdf8',
  primaryMuted: 'rgba(14,165,233,0.12)',
  
  // Semantic
  accent:    '#10b981',   // success, positive
  accentMuted: 'rgba(16,185,129,0.12)',
  gold:      '#fbbf24',   // HOURS, premium, earnings
  goldMuted: 'rgba(251,191,36,0.12)',
  red:       '#ef4444',   // errors, live, destructive
  redMuted:  'rgba(239,68,68,0.12)',
  purple:    '#a78bfa',   // memberships, governance
  purpleMuted: 'rgba(167,139,250,0.12)',
  pink:      '#f472b6',   // social, reactions
  orange:    '#fb923c',   // trending, warnings
  orangeMuted: 'rgba(251,147,60,0.12)',
  cyan:      '#22d3ee',   // info, highlights
  lime:      '#84cc16',   // growth, positive change
  teal:      '#2dd4bf',   // alternative accent
  rose:      '#fb7185',   // warm accent
  indigo:    '#818cf8',   // secondary brand
  
  // Zone-specific accent colors
  zones: {
    watch:     '#ef4444',   // red — video energy
    read:      '#0ea5e9',   // blue — calm, focused
    community: '#a78bfa',   // purple — belonging
    shop:      '#10b981',   // green — commerce, money
    explore:   '#fb923c',   // orange — discovery, adventure
    listen:    '#f472b6',   // pink — music, vibe
    govern:    '#fbbf24',   // gold — power, governance
    arena:     '#22d3ee',   // cyan — competition, energy
  },
};

// ═══ TYPOGRAPHY ═══

export const fonts = {
  body:    "'Outfit', sans-serif",
  mono:    "'DM Mono', monospace",
  display: "'Playfair Display', serif",
  
  // Google Fonts import URL (include in <head> or @import)
  importUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;900&display=swap",
};

export const fontSizes = {
  // Named scale
  xs:    8,
  sm:    10,
  base:  12,
  md:    13,
  lg:    14,
  xl:    16,
  '2xl': 18,
  '3xl': 20,
  '4xl': 24,
  '5xl': 28,
  '6xl': 32,
  hero:  36,
};

export const fontWeights = {
  light:    300,
  normal:   400,
  medium:   500,
  semibold: 600,
  bold:     700,
  extrabold: 800,
  black:    900,
};

export const lineHeights = {
  tight:  1.1,
  snug:   1.2,
  normal: 1.3,
  relaxed: 1.4,
  loose:  1.5,
  body:   1.6,
};

// ═══ SPACING ═══

export const spacing = {
  0:  0,
  1:  2,
  2:  4,
  3:  6,
  4:  8,
  5:  10,
  6:  12,
  7:  14,
  8:  16,
  9:  18,
  10: 20,
  12: 24,
  14: 28,
  16: 32,
  20: 40,
  24: 48,
};

// ═══ RADII ═══

export const radii = {
  sm:   4,
  md:   6,
  base: 8,
  lg:   10,
  xl:   12,
  '2xl': 14,
  '3xl': 16,
  '4xl': 20,
  full: 999,
};

// ═══ SHADOWS ═══

export const shadows = {
  sm:     '0 1px 3px rgba(0,0,0,0.3)',
  md:     '0 4px 12px rgba(0,0,0,0.3)',
  lg:     '0 8px 24px rgba(0,0,0,0.3)',
  glow:   '0 0 20px rgba(14,165,233,0.15)',
  gold:   '0 0 20px rgba(251,191,36,0.15)',
};

// ═══ ANIMATIONS ═══

export const animations = {
  // Keyframe definitions (inject via <style> tag)
  keyframes: `
    @keyframes slideUp {
      from { transform: translateY(16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideDown {
      from { transform: translateY(-16px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes livePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
      50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
    }
    @keyframes heartFloat {
      0% { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-120px) scale(0.4); opacity: 0; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 8px rgba(14,165,233,0.2); }
      50% { box-shadow: 0 0 16px rgba(14,165,233,0.4); }
    }
  `,
  
  // Usage helpers
  slideUp: (delay = 0) => `slideUp 0.3s ease ${delay}s both`,
  fadeIn: (delay = 0) => `fadeIn 0.3s ease ${delay}s both`,
  scaleIn: (delay = 0) => `scaleIn 0.2s ease ${delay}s both`,
  stagger: (index, base = 0.04) => `slideUp 0.3s ease ${index * base}s both`,
};

// ═══ BREAKPOINTS ═══

export const breakpoints = {
  mobile: 375,    // iPhone SE
  app:    440,    // max app width
  tablet: 768,    // future: tablet layout
  desktop: 1024,  // future: desktop layout
};

// ═══ Z-INDEX SCALE ═══

export const zIndex = {
  base:      0,
  card:      1,
  sticky:    10,
  header:    50,
  modal:     60,
  sheet:     70,
  overlay:   80,
  tip:       90,
  toast:     95,
  max:       100,
};

// ═══ HOURS DISPLAY ═══

export const hoursConfig = {
  symbol:     '⏣',
  unit:       'HRS',
  decimals:   1,       // show 1 decimal place (142.5 HRS)
  
  // Tier thresholds (in whole HOURS)
  tiers: {
    observer:    { min: 0,       max: 99,     icon: '👁️', color: colors.dim },
    contributor: { min: 100,     max: 999,    icon: '🌱', color: colors.accent },
    creator:     { min: 1000,    max: 4999,   icon: '🔥', color: colors.orange },
    builder:     { min: 5000,    max: 24999,  icon: '⚡', color: colors.primary },
    architect:   { min: 25000,   max: 99999,  icon: '🏗️', color: colors.purple },
    founder:     { min: 100000,  max: Infinity, icon: '👑', color: colors.gold },
  },
  
  // Legal disclaimer (MUST appear on every HOURS display)
  disclaimer: 'HOURS are internal platform credits, not financial instruments.',
  fullDisclaimer: 'HOURS are internal platform credits, not cryptocurrency, securities, stablecoins, or fiat currency. HOURS have no independent market value and cannot be purchased, sold, or traded outside the OURS platform. All earning rates are illustrative targets, not guarantees.',
};

// ═══ GLOBAL CSS RESET ═══

export const globalCSS = `
  @import url('${fonts.importUrl}');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { 
    background: ${colors.bg}; 
    color: ${colors.text};
    font-family: ${fonts.body};
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 4px; }
  button { cursor: pointer; font-family: ${fonts.body}; }
  button:hover:not(:disabled) { filter: brightness(1.06); }
  input::placeholder, textarea::placeholder { color: rgba(138,157,195,0.3); }
  ${animations.keyframes}
`;

// ═══ CONVENIENCE: LEGACY T OBJECT ═══
// For backward compatibility with existing pages that use T.primary, T.surface, etc.
// New code should import { colors, fonts, etc. } directly.

export const T = {
  ...colors,
  watch: colors.zones.watch,
  read: colors.zones.read,
  community: colors.zones.community,
  shop: colors.zones.shop,
  explore: colors.zones.explore,
  listen: colors.zones.listen,
  govern: colors.zones.govern,
  arena: colors.zones.arena,
};

export const f = (family = 'body') => fonts[family];
