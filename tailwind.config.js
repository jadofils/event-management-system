/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // existing variable
        foreground: "var(--foreground)", // existing variable
        'soft-white': '#F8FAFC',
        'ivory': '#F3F4F6',
        'cream': '#FDFDFD',
        'light-gray': '#E5E7EB',
        'cool-gray': '#D1D5DB',
        'slate-gray': '#9CA3AF',
        'muted-blue': '#BFDBFE',
        'soft-green': '#D1FAE5',
        'pale-lavender': '#E0EAFF',
        'charcoal': '#374151',
        'deep-slate': '#1F2937',
        'rich-black': '#111827',
      },
    },
  },
  plugins: [],
};
