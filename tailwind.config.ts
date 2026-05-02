import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-jp)", "var(--font-inter)", "sans-serif"],
      },
      colors: {
        // ダークアクアリウム系（少し明るめに調整）
        ocean: {
          950: "#080d18",
          900: "#0f1729",   // ベース背景: 純黒→深い青みがかった紺に
          800: "#131f35",   // セクション背景
          700: "#1a2a45",   // カード背景
          600: "#1e3456",   // カードホバー
          500: "#2a4a72",   // ボーダー
          400: "#3d6a9e",
          300: "#5a8fc0",
        },
        // シアン（水・光）
        cyan: {
          DEFAULT: "#22d3ee",
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
        },
        // ゴールド（ブランド継承）
        gold: {
          DEFAULT: "#d4af37",
          50: "#fef9e7",
          100: "#fde68a",
          200: "#fbbf24",
          300: "#d4af37",
          400: "#b8860b",
          500: "#9a7209",
        },
        // テキスト
        ink: {
          primary: "#f0f4f8",   // 少し明るめに
          secondary: "#a8b8cc", // 少し明るめに
          muted: "#6b7e96",
        },
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(180deg, #0a0f1e 0%, #0d1526 100%)",
        "cyan-glow": "radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
