/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wingLeft: {
          '0%, 100%': { transform: 'translate(-20px, -50%) rotate(-12deg)' },
          '50%': { transform: 'translate(-40px, -50%) rotate(-15deg)' },
        },
        wingRight: {
          '0%, 100%': { transform: 'translate(20px, -50%) rotate(12deg)' },
          '50%': { transform: 'translate(40px, -50%) rotate(15deg)' },
        },
        cloudDrift1: {
          '0%, 100%': { transform: 'translateX(-10%) scale(1.1)' },
          '50%': { transform: 'translateX(10%) scale(0.9)' },
        },
        cloudDrift2: {
          '0%, 100%': { transform: 'translateX(10%) scale(0.9)' },
          '50%': { transform: 'translateX(-10%) scale(1.1)' },
        },
        cloudWave: {
          '0%': { transform: 'translateX(-20%) scale(1)' },
          '100%': { transform: 'translateX(20%) scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'wing-left': 'wingLeft 3s ease-in-out infinite',
        'wing-right': 'wingRight 3s ease-in-out infinite',
        'cloud-drift-slow': 'pulse 8s ease-in-out infinite',
        'cloud-drift-1': 'cloudDrift1 15s ease-in-out infinite',
        'cloud-drift-2': 'cloudDrift2 20s ease-in-out infinite',
        'cloud-wave': 'cloudWave 25s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}