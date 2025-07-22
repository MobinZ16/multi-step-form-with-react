// src/components/Step5ThankYou.tsx
import React from 'react';

// آیکون تشکر را وارد کنید. مطمئن شوید که فایل در مسیر صحیح قرار دارد.
// مثلاً icon-thank-you.svg را در src/assets/ یا public/assets/ قرار دهید.
import thankYouIcon from '../assets/images/icon-thank-you.svg'; // مسیر را بر اساس مکان فایل شما تنظیم کنید

interface ThankYouProps {
  // این کامپوننت پراپ خاصی نیاز ندارد، مگر اینکه بخواهید
  // پیامی شخصی‌سازی شده با نام کاربر نمایش دهید.
}

const ThankYou: React.FC<ThankYouProps> = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-4">
      <img src={thankYouIcon} alt="Thank you icon" className="w-20 h-20 mb-8" />
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank you!</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free
        to email us at support@loremgaming.com.
      </p>
      {/* دکمه برای شروع دوباره فرم (اختیاری) */}
      {/* <button
        onClick={() => window.location.reload()} // یک راه ساده برای ریست فرم
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Start New Form
      </button> */}
    </div>
  );
};

export default ThankYou;