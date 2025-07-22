// src/App.tsx
import React, { useState } from 'react';
import MultiStepFormLayout from './Components/MultiStepFormLayout';
import Step1PersonalInfo from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3Addons from './Steps/Step3';
import Step4Summary from './Steps/Step4';
import Step5ThankYou from './Steps/ThankYou'; // وارد کردن کامپوننت جدید

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

  const goToNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const goToPrevStep = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const goToPlanSelection = () => {
    setCurrentStep(2);
  };

  const handleConfirm = () => {
    console.log('Form data submitted:', formData);
    // اینجا میتوانید درخواست HTTP POST به بک‌اند برای ارسال formData ارسال کنید.
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
          <Step2
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
      case 5:
        return <Step5ThankYou />; // اینجا کامپوننت تشکر را رندر می‌کنیم
      default:
        return (
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-blue-800">
                Unknown Step {currentStep}
              </h2>
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