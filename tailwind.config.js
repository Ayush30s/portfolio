/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"], // Add Bebas Neue
        montserrat: ["Montserrat", "sans-serif"], // Add Montserrat
        lcase: ["DM Sans", "sans-serif"],
        rcase: ["Orbitron", "sans-serif"]
      },
      screens: {
        sm: "640px", // Small devices (phones)
        md: "768px", // Medium devices (tablets)
        lg: "1024px", // Large devices (laptops/desktops)
        xl: "1280px", // Extra large devices (large desktops)
        "2xl": "1536px", // 2X large devices (very large desktops)
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path based on your project structure
  ],
  plugins: [],
};
