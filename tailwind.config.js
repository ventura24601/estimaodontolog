/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        base: '#F7F4EF',
        sand: '#E9E1D6',
        stone: '#CFC6B8',
        ink: { DEFAULT: '#1C1C1A', soft: '#4A4843', mute: '#5F5B54' },
        // Dourado do logo da Estima — usado com parcimônia
        accent: { DEFAULT: '#C8A161', deep: '#7E5F2C', light: '#E4CC9F' },
        navy: '#232B4F',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(3.5rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        h1: ['clamp(2.75rem, 5.5vw, 5.25rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        h2: ['clamp(2.25rem, 4.2vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h3: ['clamp(1.6rem, 2.4vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        body: ['1.0625rem', { lineHeight: '1.7' }],
        lead: ['clamp(1.125rem, 1.4vw, 1.3rem)', { lineHeight: '1.65' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      maxWidth: { site: '1440px' },
      borderRadius: { media: '24px' },
      transitionTimingFunction: { expo: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
