// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // مثلاً، فرض کنید نقطه شکست مورد نظر شما 992px است.
        // می‌توانید نام دلخواهی برای آن انتخاب کنید، مثلاً 'my-breakpoint' یا 'desktop-layout'.
        'custom-lg': '992px', // این یک نام دلخواه است
        // می‌توانید سایر breakpoints پیش‌فرض را هم داشته باشید یا فقط از همین استفاده کنید.
        // 'sm': '640px',
        // 'md': '768px',
        // 'lg': '1024px', // اگر میخواهید پیش فرض رو تغییر بدید
        // 'xl': '1280px',
      },
      // اگر از فونت خاصی استفاده می‌کنید، می‌توانید اینجا تعریف کنید
      // fontFamily: {
      //   ubuntu: ['Ubuntu', 'sans-serif'],
      // },
      // اگر رنگ‌های سفارشی دارید
      colors: {
        // ...
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}