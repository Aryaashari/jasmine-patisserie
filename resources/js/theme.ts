/**
 * Velvet & Gold — Design System Theme
 *
 * Centralized design tokens for the Jasmine Patisserie cake store.
 * Modify values here to re-theme the entire application.
 */

export const theme = {
  /* ──────────────────────── Colors ──────────────────────── */
  colors: {
    // Surface hierarchy
    surface: '#fff8f7',
    'surface-dim': '#e3d7d7',
    'surface-bright': '#fff8f7',
    'surface-container-lowest': '#ffffff',
    'surface-container-low': '#fdf1f0',
    'surface-container': '#f7ebeb',
    'surface-container-high': '#f1e6e5',
    'surface-container-highest': '#ebe0df',

    // On-surface (text on light backgrounds)
    'on-surface': '#201a1a',
    'on-surface-variant': '#4d4635',

    // Inverse (dark backgrounds)
    'inverse-surface': '#352f2f',
    'inverse-on-surface': '#faeeee',

    // Outlines & borders
    outline: '#7f7663',
    'outline-variant': '#d0c5af',

    // Primary — Gold
    'surface-tint': '#735c00',
    primary: '#735c00',
    'on-primary': '#ffffff',
    'primary-container': '#d4af37',
    'on-primary-container': '#554300',
    'inverse-primary': '#e9c349',

    // Secondary — Pink / Magenta
    secondary: '#ac2471',
    'on-secondary': '#ffffff',
    'secondary-container': '#fd68b3',
    'on-secondary-container': '#6c0042',

    // Tertiary — Warm neutral
    tertiary: '#70585b',
    'on-tertiary': '#ffffff',
    'tertiary-container': '#c9acaf',
    'on-tertiary-container': '#554042',

    // Error
    error: '#ba1a1a',
    'on-error': '#ffffff',
    'error-container': '#ffdad6',
    'on-error-container': '#93000a',

    // Fixed palettes
    'primary-fixed': '#ffe088',
    'primary-fixed-dim': '#e9c349',
    'on-primary-fixed': '#241a00',
    'on-primary-fixed-variant': '#574500',

    'secondary-fixed': '#ffd8e6',
    'secondary-fixed-dim': '#ffb0d0',
    'on-secondary-fixed': '#3d0024',
    'on-secondary-fixed-variant': '#8c0058',

    'tertiary-fixed': '#fbdbde',
    'tertiary-fixed-dim': '#debfc2',
    'on-tertiary-fixed': '#281719',
    'on-tertiary-fixed-variant': '#574144',

    // Background (alias)
    background: '#fff8f7',
    'on-background': '#201a1a',
    'surface-variant': '#ebe0df',
  },

  /* ──────────────────── Typography ──────────────────── */
  fonts: {
    display: 'Epilogue',
    body: 'Inter',
  },

  typography: {
    'display-lg': {
      fontFamily: 'Epilogue',
      fontSize: '48px',
      fontWeight: '700',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
    },
    'headline-lg': {
      fontFamily: 'Epilogue',
      fontSize: '32px',
      fontWeight: '600',
      lineHeight: '40px',
      letterSpacing: '0',
    },
    'headline-lg-mobile': {
      fontFamily: 'Epilogue',
      fontSize: '28px',
      fontWeight: '600',
      lineHeight: '34px',
      letterSpacing: '0',
    },
    'title-md': {
      fontFamily: 'Epilogue',
      fontSize: '20px',
      fontWeight: '500',
      lineHeight: '28px',
      letterSpacing: '0',
    },
    'body-lg': {
      fontFamily: 'Inter',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '28px',
      letterSpacing: '0',
    },
    'body-md': {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
      letterSpacing: '0',
    },
    'label-sm': {
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '16px',
      letterSpacing: '0.05em',
    },
  },

  /* ──────────────────── Border Radius ──────────────────── */
  rounded: {
    sm: '0.25rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },

  /* ──────────────────── Spacing ──────────────────── */
  spacing: {
    base: '8px',
    xs: '4px',
    sm: '12px',
    md: '24px',
    lg: '48px',
    xl: '80px',
    gutter: '24px',
    'margin-mobile': '16px',
    'margin-desktop': '64px',
  },

  /* ──────────────────── Gradients ──────────────────── */
  gradients: {
    // Signature gradient for hero & primary buttons
    primary: 'linear-gradient(135deg, #ac2471 0%, #8b008b 50%, #d4af37 100%)',
    // Soft hero background
    heroBackdrop: 'linear-gradient(135deg, #e91e8c 0%, #8b008b 40%, #ffb6c1 100%)',
    // Button gradient
    button: 'linear-gradient(135deg, #ac2471 0%, #8b008b 100%)',
  },

  /* ──────────────────── Shadows ──────────────────── */
  shadows: {
    glow: '0 0 30px rgba(139, 0, 139, 0.08)',
    'glow-gold': '0 0 30px rgba(212, 175, 55, 0.12)',
    card: '0 4px 24px rgba(139, 0, 139, 0.06)',
    elevated: '0 8px 40px rgba(139, 0, 139, 0.1)',
  },
} as const;

export type Theme = typeof theme;
export default theme;
