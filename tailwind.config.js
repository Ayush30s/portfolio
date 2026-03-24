/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"], // Custom font Bebas Neue
        montserrat: ["Montserrat", "sans-serif"], // Custom font Montserrat
        lcase: ["DM Sans", "sans-serif"], // Custom font DM Sans
        rcase: ["Orbitron", "sans-serif"], // Custom font Orbitron
        sans: ["Inter", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
      },
      screens: {
        sm: "640px", // Small devices (phones)
        md: "900px", // Medium devices (tablets)
        lg: "1024px", // Large devices (laptops/desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // 2X large devices (very large desktops)
      },
      writingMode: {
        "vertical-lr": "vertical-lr",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 20s linear infinite", // normal speed
        scrollFast: "scroll 10s linear infinite", // faster speed
      },
      colors: {
        accent: "#3b82f6", // Modern Electric Blue
        primary: "#007bff", // The signature blue from the target site
        secondary: "#6c757d",
        darkBg: "#111827",
        cardBg: "#1f2937",
      },
    },
  },
  content: [
    "./index.html", // Main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // All JavaScript/TypeScript files in src directory
  ],
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".writing-mode-vertical-lr": {
          "writing-mode": "vertical-lr",
        },
      });
    },
  ],
};
