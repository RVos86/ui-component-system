import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        primary: {
          DEFAULT: '#2563eb', // blue-600
          hover: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#e5e7eb', // gray-200
          hover: '#d1d5db',
        },
        danger: '#db493b',
        muted: '#e3e6ed',
        success: '#2b925a',
        warning: '#f3d77b',
      },

      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },

      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },

      fontSize: {
        sm: ['14px', '20px'],
        md: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
    },
  },
  plugins: [],
} satisfies Config;
