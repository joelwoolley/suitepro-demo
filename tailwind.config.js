/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#c9a84c',
        secondary: '#1a1a2e',
        accent: '#f5e6c8',
        success: '#37b34a',
        dark: '#0d1117',
        muted: '#6c757d',
      },
      borderRadius: {
        card: '14px',
        btn: '8px',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
