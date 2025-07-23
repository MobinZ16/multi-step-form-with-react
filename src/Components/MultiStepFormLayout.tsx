// src/components/MultiStepFormLayout.tsx
import React from 'react';

// آیکون‌های sidebar را وارد کنید. مطمئن شوید در مسیر صحیح قرار دارند.
import BgSidebarDesktop from '../assets/images/bg-sidebar-desktop.svg'; // مسیر را تنظیم کنید
import BgSidebarMobile from '../assets/images/bg-sidebar-mobile.svg';   // مسیر را تنظیم کنید

interface MultiStepFormLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const MultiStepFormLayout: React.FC<MultiStepFormLayoutProps> = ({ currentStep, children }) => {
  const steps = [
    { number: 1, name: 'YOUR INFO' },
    { number: 2, name: 'SELECT PLAN' },
    { number: 3, name: 'ADD-ONS' },
    { number: 4, name: 'SUMMARY' },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 lg:p-0"> {/* padding در موبایل */}
      <div className="relative bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-full max-w-4xl min-h-[600px] lg:min-h-[unset] lg:max-h-[650px]"> {/* min-h در موبایل */}

        {/* Sidebar (برای دسکتاپ) */}
        <div
          className="hidden lg:block w-full lg:w-1/3 p-8 rounded-xl bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(src/assets/images/bg-sidebar-desktop.svg)` }} // آیکون دسکتاپ
        >
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-white font-bold
                    ${currentStep === step.number ? 'bg-blue-200 border-blue-200 text-blue-900' : 'border-white'}`}
                >
                  {step.number}
                </div>
                <div className="hidden lg:block"> {/* این متن در موبایل پنهان است */}
                  <p className="text-gray-300 text-xs uppercase">Step {step.number}</p>
                  <p className="text-white font-bold uppercase text-sm">{step.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar / Header */}
        <div
          className="lg:hidden w-full h-[172px] absolute top-0 left-0 bg-cover bg-no-repeat rounded-t-xl"
          style={{ backgroundImage: `url(src/assets/images/bg-sidebar-mobile.svg)` }} // آیکون موبایل
        >
          <div className="flex justify-center pt-8 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-white font-bold
                    ${currentStep === step.number ? 'bg-blue-200 border-blue-200 text-blue-900' : 'border-white'}`}
                >
                  {step.number}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 lg:p-8 flex flex-col justify-between relative mt-[172px] lg:mt-0"> {/* mt در موبایل */}
            {children}
        </div>
      </div>
    </div>
  );
};

export default MultiStepFormLayout;