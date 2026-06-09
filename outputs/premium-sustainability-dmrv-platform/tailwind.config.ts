import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.08)",
        glow: "0 18px 50px rgba(147, 51, 234, 0.18)"
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2rem"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(147, 51, 234, 0.18), transparent 32%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.14), transparent 28%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
        "dashboard-glow":
          "radial-gradient(circle at top, rgba(147, 51, 234, 0.16), transparent 28%), linear-gradient(180deg, #020617 0%, #0f172a 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
