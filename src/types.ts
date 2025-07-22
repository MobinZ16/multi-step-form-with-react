// src/types.ts

// Type برای اطلاعات شخصی
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

// Type برای خطاهای اطلاعات شخصی
export interface PersonalInfoErrors {
  name?: string; // علامت سوال یعنی اختیاری (ممکن است خطا نداشته باشد)
  email?: string;
  phone?: string;
}

// Type برای طرح انتخابی
export type PlanType = 'Arcade' | 'Advanced' | 'Pro';
export type BillingCycle = 'monthly' | 'yearly';

export interface Plan {
  type: PlanType;
  priceMonthly: number; // قیمت ماهانه
  priceYearly: number;  // قیمت سالانه
}

// Type برای افزودنی‌ها
export interface AddOn {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
}

// Type برای وضعیت کلی فرم
export interface FormData {
  personalInfo: PersonalInfo;
  plan: PlanType | null; // فقط نوع طرح (Arcade, Advanced, Pro) را نگه میداریم، قیمت‌ها از داده‌های ثابت می آیند
  billingCycle: BillingCycle;
  selectedAddOnIds: string[]; // فقط ID افزودنی‌های انتخاب شده
}