// src/components/Step2.tsx
import React, { type FormEvent } from "react"; // FormEvent رو وارد کردید، عالیه
import type { PlanType, BillingCycle } from "../types";
import { plans } from "../data";

import ArcadeIcon from '../assets/images/icon-arcade.svg';
import AdvancedIcon from '../assets/images/icon-advanced.svg';
import ProIcon from '../assets/images/icon-pro.svg';

const PlanIcons: Record<PlanType, string> = {
    Arcade: ArcadeIcon,
    Advanced: AdvancedIcon,
    Pro: ProIcon,
};

interface Step2Props {
    selectedPlan: PlanType | null;
    billingCycle: BillingCycle;
    // شما دو prop برای انتخاب طرح دارید: onPlanSelect و onSelectPlan.
    // بهتره یکی از اون‌ها رو نگه دارید تا گیج کننده نباشه.
    // در کد App.tsx قبلی من از onSelectPlan استفاده کرده بودم.
    // اگر می‌خواهید نامش onPlanSelect باشه، باید در App.tsx هم اون رو تغییر بدید.
    // فعلاً فرض می‌کنم onSelectPlan رو حذف کردید و فقط onPlanSelect رو دارید.
    onPlanSelect: (plan: PlanType) => void;
    // onSelectPlan: (plan: PlanType) => void; // این رو حذف کنید
    onToggleBillingCycle: (cycle: BillingCycle) => void;
    onNext: () => void; // این تابع برای رفتن به مرحله بعدی
    onGoBack: () => void;
}

const Step2: React.FC<Step2Props> = ({
    selectedPlan,
    billingCycle,
    onPlanSelect, // نام prop اینجا
    onToggleBillingCycle,
    onNext,
    onGoBack,
}) => {
    // اصلاح تابع handleSubmit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // از رفتار پیش‌فرض فرم (refresh صفحه) جلوگیری می‌کند

        // اعتبارسنجی برای اطمینان از انتخاب یک طرح
        if (selectedPlan) {
            onNext(); // اگر طرحی انتخاب شده بود، به مرحله بعدی برو
        } else {
            alert('Please select a plan to continue.'); // پیام خطا به کاربر
        }
    };

     return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Select your plan</h2>
      <p className="text-gray-500 mb-8">
        You have the option of monthly or yearly billing.
      </p>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className={`flex flex-col border rounded-lg p-4 cursor-pointer hover:border-blue-700 transition-colors
              ${selectedPlan === plan.type ? 'border-blue-700 bg-blue-50' : 'border-gray-300'}
              lg:flex-1`}
            onClick={() => onPlanSelect(plan.type)}
          >
            <img src={PlanIcons[plan.type]} alt={`${plan.type} icon`} className="w-10 h-10 mb-10" />
            <h3 className="font-bold text-blue-900 text-lg">{plan.type}</h3>
            <p className="text-gray-500 text-sm">
              ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}/
              {billingCycle === 'monthly' ? 'mo' : 'yr'}
            </p>
            {billingCycle === 'yearly' && (
              <p className="text-blue-900 text-xs mt-1">2 months free</p>
            )}
          </div>
        ))}
      </div>

      {/* Monthly/Yearly Toggle */}
      <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-center gap-6 mb-8">
        <span
          className={`font-semibold ${billingCycle === 'monthly' ? 'text-blue-900' : 'text-gray-500'}`}
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={billingCycle === 'yearly'}
            onChange={() => onToggleBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          />
          <div
            className={`w-10 h-5 bg-blue-900 rounded-full peer peer-focus:outline-none
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all
              ${billingCycle === 'yearly' ? 'after:translate-x-full' : ''}`}
          ></div>
        </label>
        <span
          className={`font-semibold ${billingCycle === 'yearly' ? 'text-blue-900' : 'text-gray-500'}`}
        >
          Yearly
        </span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-auto pt-8">
        <button
          type="button" // Type submit نیست، چون در Step1 و Step2 خودشان دکمه submit دارند
          onClick={onGoBack}
          className="px-6 py-3 text-gray-500 rounded-md hover:text-blue-900 transition-colors"
        >
          Go Back
        </button>
        <button
          type="submit" // این دکمه submit فرم است
          className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default Step2; // اگر نام کامپوننت را به Step2 تغییر دادید