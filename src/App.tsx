// src/App.tsx
import React, { useState } from 'react';
import MultiStepFormLayout from './Components/MultiStepLayout';
import Step1PersonalInfo from './Steps/Step1';
import Step2SelectPlan from './Steps/Step2'; // وارد کردن کامپوننت جدید
// import Step3Addons from './components/Step3Addons';
// import Step4Summary from './components/Step4Summary';
// import Step5ThankYou from './components/Step5ThankYou';

import type { FormData, PersonalInfo, PlanType, BillingCycle } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
    },
    plan: null,
    billingCycle: 'monthly',
    selectedAddOnIds: [],
  });

  const handlePersonalInfoUpdate = (info: PersonalInfo) => {
    setFormData(prevData => ({
      ...prevData,
      personalInfo: info,
    }));
  };

  const handlePlanSelection = (planType: PlanType) => {
    setFormData(prevData => ({
      ...prevData,
      plan: planType,
    }));
  };

  const handleBillingCycleToggle = (cycle: BillingCycle) => {
    setFormData(prevData => ({
      ...prevData,
      billingCycle: cycle,
    }));
  };

  const goToNextStep = () => {
    // منطق اعتبارسنجی را اینجا برای هر مرحله اضافه کنید
    if (currentStep === 1) {
      // Step1PersonalInfo خودش اعتبارسنجی را انجام میدهد و onNext را صدا میزند
      setCurrentStep(prevStep => prevStep + 1);
    } else if (currentStep === 2) {
      if (!formData.plan) {
        alert('Please select a plan to continue.');
        return;
      }
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1PersonalInfo
            personalInfo={formData.personalInfo}
            onUpdate={handlePersonalInfoUpdate}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <Step2SelectPlan
            selectedPlan={formData.plan}
            billingCycle={formData.billingCycle}
            onPlanSelect={handlePlanSelection}
            onToggleBillingCycle={handleBillingCycleToggle}
            onNext={goToNextStep}
            onGoBack={goToPrevStep}
          />
        );
      // case 3:
      //   return <Step3Addons />;
      // case 4:
      //   return <Step4Summary />;
      // case 5:
      //   return <Step5ThankYou />;
      default:
        // این بخش برای زمانی است که هنوز کامپوننت‌های مراحل بعدی را نساخته‌ایم
        // و یک صفحه ساده با دکمه‌های ناوبری عمومی را نشان می‌دهد.
        // در نهایت این بخش حذف خواهد شد و هر currentStep به کامپوننت مخصوص خود ارجاع میدهد.
        return (
          <div className="h-full flex flex-col justify-between"> {/* h-full و flex برای حفظ layout */}
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-800">
                Step {currentStep}: Content will go here
              </h2>
            </div>
            {/* Navigation Buttons for placeholder */}
            <div className="flex justify-between mt-auto pt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-3 text-gray-500 rounded-md hover:text-blue-900 transition-colors"
                >
                  Go Back
                </button>
              )}
              {currentStep < 4 ? (
                <button
                  type="button" // Type submit نیست چون در Step1 و Step2 خودشان دکمه submit دارند
                  onClick={goToNextStep}
                  className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors ml-auto"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(5);
                    console.log('Final FormData:', formData);
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ml-auto"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <MultiStepFormLayout currentStep={currentStep}>
      {renderStepContent()}
    </MultiStepFormLayout>
  );
}

export default App;