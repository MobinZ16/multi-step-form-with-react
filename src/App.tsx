// src/App.tsx
import React, { useState } from 'react';
import MultiStepFormLayout from './Components/MultiStepFormLayout';
import Step1PersonalInfo from './Steps/Step1';
import Step2SelectPlan from './Steps/Step2';
import Step3Addons from './Steps/Step3';
import Step4Summary from './Steps/Step4'; // وارد کردن کامپوننت جدید
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

  // توابع به روزرسانی فرم دیتا
  const handlePersonalInfoUpdate = (info: PersonalInfo) => {
    setFormData(prevData => ({
      ...prevData,
      personalInfo: info,
    }));
  };

  const handlePlanSelection = (planType: PlanType) => { // این خط مهم است
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

  const handleAddOnToggle = (id: string, isChecked: boolean) => {
    setFormData(prevData => {
      const currentAddOns = prevData.selectedAddOnIds;
      if (isChecked) {
        return {
          ...prevData,
          selectedAddOnIds: [...currentAddOns, id],
        };
      } else {
        return {
          ...prevData,
          selectedAddOnIds: currentAddOns.filter(addOnId => addOnId !== id),
        };
      }
    });
  };

  // توابع ناوبری بین مراحل
  const goToNextStep = () => {
    // اعتبارسنجی ساده برای مرحله 2 (انتخاب طرح) در اینجا
    if (currentStep === 2 && !formData.plan) {
      alert('Please select a plan to continue.');
      return;
    }
    setCurrentStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const goToPlanSelection = () => {
    setCurrentStep(2); // مستقیماً به مرحله 2 (انتخاب طرح) برو
  };

  const handleConfirm = () => {
    // اینجا می‌توانید اطلاعات نهایی formData را به سرور ارسال کنید
    console.log('Form data submitted:', formData);
    setCurrentStep(5); // برو به صفحه تشکر
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
      case 3:
        return (
          <Step3Addons
            selectedAddOnIds={formData.selectedAddOnIds}
            billingCycle={formData.billingCycle}
            onToggleAddOn={handleAddOnToggle}
            onNext={goToNextStep}
            onGoBack={goToPrevStep}
          />
        );
      case 4:
        return (
          <Step4Summary
            formData={formData}
            onGoBack={goToPrevStep}
            onConfirm={handleConfirm}
            onChangePlan={goToPlanSelection}
          />
        );
      // case 5:
      //   return <Step5ThankYou />; // به زودی
      default:
        // این بخش به محض ساختن Step5 Thank You حذف خواهد شد
        return (
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-800">
                Step {currentStep}: Content will go here (Default fallback)
              </h2>
            </div>
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
              {/* دکمه Next/Confirm فقط برای حالت دیفالت، چون در مراحل خودشان دکمه دارند */}
              {currentStep < 5 && ( // اگر مرحله 5 نیست (مرحله تشکر)
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors ml-auto"
                >
                  Next Step (from default)
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