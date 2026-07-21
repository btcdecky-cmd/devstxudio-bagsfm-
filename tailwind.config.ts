import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0f0f0f',
          800: '#1a1a1a',
          700: '#262626',
          600: '#404040',
          500: '#525252',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f4e4c1',
          dark: '#b89c3f',
        },
        brand: {
          primary: '#d4af37',
          secondary: '#fbbf24',
          accent: '#f59e0b',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Iowan Old Style', 'serif'],
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
        '5xl': ['48px', '48px'],
      },
      spacing: {
        safe: 'env(safe-area-inset-bottom)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.2)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'fade-in': 'fade-in 300ms ease-out',
      },
      screens: {
        xs: '320px',
      },
    },
  },
  plugins: [],
};

export default config;
