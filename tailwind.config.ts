import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '320px',
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '1536px',
      '3xl': '2560px',
    },
    extend: {
      boxShadow: {
        'neon-blue': '0 0 15px rgba(59, 130, 246, 0.6), 0 0 5px rgba(59, 130, 246, 0.4)',
      }
    },
  },
  plugins: [],
};

export default config;
