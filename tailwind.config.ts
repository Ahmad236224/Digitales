import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Derived strictly from the Digitales logo. No palette expansion.
        purple: {
          DEFAULT: "#6B2D8B", // Brand Purple — CTAs, links, icon fills
          deep: "#3D1450",    // Deep Purple — glows, gradients
          glow: "#8B3DB0",    // Lifted purple for hero glow / accents
          link: "#C9A8E8",    // Light purple link text on dark
        },
        gold: {
          DEFAULT: "#F0B428", // Brand Gold — eyebrows, icons, stats, badges
        },
        // Dark-theme surfaces (page is dark-first)
        night: {
          DEFAULT: "#0A0610", // Page base
          surface: "#15101E", // Cards
          raised: "#1E1629",  // Hover / elevated
        },
        muted: "#A89FB5",      // Body copy on dark
        paper: "#F8F5FC",      // Reserved for any light contexts
        ink: "#555555",
        // Sub-brand accents (used only on their own pages)
        relief: "#0FB5B5",     // Relief OS teal overlay
        dartx: "#0D0A12",      // DartX near-black
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.3)",
        "card-hover": "0 16px 40px rgba(0,0,0,0.45)",
        nav: "0 8px 24px rgba(0,0,0,0.4)",
        glow: "0 0 80px rgba(139,61,176,0.45)",
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "16px",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-1000" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 38s linear infinite",
        "dash-flow": "dash-flow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
