/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1E4B9B",
        secondary: "#10B981",
      },
      fontFamily: {
        // Roboto
        sans: ["Roboto-Regular", "sans-serif"],
        "sans-medium": ["Roboto-Medium", "sans-serif"],
        "sans-bold": ["Roboto-Bold", "sans-serif"],

        // Poppins
        poppins: ["Poppins-Regular", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-extrabold": ["Poppins-ExtraBold", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["48px", "56px"],
        "display-xl": ["36px", "44px"],
        "display-lg": ["32px", "40px"],
        "display-md": ["28px", "36px"],
        body: ["16px", "24px"],
      },
    },
  },
  plugins: [],
};
