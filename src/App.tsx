// src/App.tsx
import React, { useState } from 'react';
import MultiStepFormLayout from './Components/MultiStepLayout';
import Step1 from './Steps/Step1';
// import Step2SelectPlan from './components/Step2SelectPlan'; // هنوز نساختیم
// import Step3Addons from './components/Step3Addons'; // هنوز نساختیم
// import Step4Summary from './components/Step4Summary'; // هنوز نساختیم
// import Step5ThankYou from './components/Step5ThankYou'; // هنوز نساختیم

import type { FormData, PersonalInfo, PlanType, BillingCycle } from './types'; // وارد کردن Typeها

function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
    },
    plan: null, // فعلاً خالی
    billingCycle: 'monthly', // پیش‌فرض
    selectedAddOnIds: [], // فعلاً خالی
  });

  const handlePersonalInfoUpdate = (info: PersonalInfo) => {
    setFormData(prevData => ({
      ...prevData,
      personalInfo: info,
    }));
  };

  const goToNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            personalInfo={formData.personalInfo}
            onUpdate={handlePersonalInfoUpdate}
            onNext={goToNextStep}
          />
        );
      // case 2:
      //   return <Step2SelectPlan />; // به زودی
      // case 3:
      //   return <Step3Addons />; // به زودی
      // case 4:
      //   return <Step4Summary />; // به زودی
      // case 5:
      //   return <Step5ThankYou />; // به زودی
      default:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">
              Step {currentStep}: Content will go here
            </h2>
            <div className="flex justify-center gap-4 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={goToPrevStep}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Go Back
                </button>
              )}
              {currentStep < 4 && (
                <button
                  onClick={goToNextStep}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next Step
                </button>
              )}
              {currentStep === 4 && (
                <button
                  onClick={() => {
                    setCurrentStep(5); // به مرحله تشکر برویم
                    console.log('Final FormData:', formData);
                  }}
                  className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
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