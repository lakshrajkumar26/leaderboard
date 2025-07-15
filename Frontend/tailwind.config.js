/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
  'animate-fadeIn',
  'text-yellow-300', 'text-green-400', 'text-blue-400',
  'bg-gray-800', 'border-blue-400', 'shadow'
]
}
