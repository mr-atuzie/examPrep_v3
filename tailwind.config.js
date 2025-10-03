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
        "display-2xl": ["32px", "40px"], // reduced from 48px
        "display-xl": ["28px", "36px"], // reduced from 36px
        "display-lg": ["24px", "32px"], // reduced from 32px
        "display-md": ["20px", "28px"], // reduced from 28px
        "display-sm": ["18px", "24px"],
        body: ["16px", "24px"],
      },
    },
  },
  plugins: [],
};
