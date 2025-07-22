// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // فایل HTML اصلی
    "./src/**/*.{js,ts,jsx,tsx}", // تمام فایل‌های JS, TS, JSX, TSX در پوشه src
  ],
  theme: {
    extend: {}, // اینجا می‌توانید تم سفارشی خود را اضافه کنید (مثل رنگ‌ها، فونت‌ها)
  },
  plugins: [  
    require('@tailwindcss/forms'),],
}