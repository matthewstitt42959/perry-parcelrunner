import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@windmill/react-ui/**/*.{js,ts,jsx,tsx}", // Corrected syntax error
  ],
  theme: {
    extend: {
      colors: {
        background: "lightblue",
        foreground: "var(--foreground)",
        purple: {
          DEFAULT: '#6B46C1', 
        }
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['"Georgia"', 'serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
      },
      lineHeight: {
        normal: '1.5',
        relaxed: '1.625',
        snug: '1.375',
      },
      spacing: {
        button: '1rem 1.5rem', 
      }
    },
  },
  plugins: [],
};

export default config;