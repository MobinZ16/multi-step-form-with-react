import React from "react";
import Sidebar from "./Sidebar";

interface MultiStepLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const MultiStepFormLayout: React.FC<MultiStepLayoutProps> = ({ currentStep, children }) => {
    return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 md:p-4">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-4xl h-full md:h-[600px] overflow-hidden">
        {/* Sidebar */}
        <div className="relative md:w-1/3 p-6 md:p-8 bg-cover bg-no-repeat bg-center rounded-t-xl md:rounded-l-xl md:rounded-t-none"
             style={{ backgroundImage: "url('/src/assets/images/bg-sidebar-desktop.svg')" }}> {/* مسیر بک‌گراند رو بعداً تنظیم می‌کنیم */}
          <Sidebar currentStep={currentStep} />
        </div>

        {/* Form Content Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex-grow">
            {children} {/* اینجا محتوای مرحله فعلی قرار میگیرد */}
          </div>
          {/* دکمه‌های ناوبری در اینجا نیستند، آنها را در خود مراحل قرار خواهیم داد */}
        </div>
      </div>
    </div>
  );
};

export default MultiStepFormLayout;