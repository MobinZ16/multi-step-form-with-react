// src/components/Step1PersonalInfo.tsx
import React, { useState, useEffect } from 'react';
import type { PersonalInfo, PersonalInfoErrors } from '../types'; // وارد کردن Typeها

interface Step1Props {
  personalInfo: PersonalInfo;
  onUpdate: (info: PersonalInfo) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ personalInfo, onUpdate, onNext }) => {
  const [errors, setErrors] = useState<PersonalInfoErrors>({});

  // تابع اعتبارسنجی
  const validate = () => {
    let newErrors: PersonalInfoErrors = {};
    if (!personalInfo.name.trim()) {
      newErrors.name = 'This field is required';
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!personalInfo.phone.trim()) {
      newErrors.phone = 'This field is required';
    } else if (!/^\+?\d{10,15}$/.test(personalInfo.phone)) { // مثال: حداقل 10 تا 15 رقم، با یا بدون +
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // اگر هیچ خطایی نباشد، true برمی‌گرداند
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ ...personalInfo, [name]: value });
    // می‌توانید اینجا هم اعتبارسنجی لحظه‌ای را اضافه کنید تا خطاها بلافاصله ناپدید شوند
    if (errors[name as keyof PersonalInfoErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Personal info</h2>
      <p className="text-gray-500 mb-8">
        Please provide your name, email address, and phone number.
      </p>

      <div className="flex-grow space-y-6">
        {/* Name Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="name" className="text-blue-900 text-sm font-medium">
              Name
            </label>
            {errors.name && (
              <span className="text-red-500 text-xs font-semibold">{errors.name}</span>
            )}
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. Stephen King"
            value={personalInfo.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                        ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {/* Email Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="email" className="text-blue-900 text-sm font-medium">
              Email Address
            </label>
            {errors.email && (
              <span className="text-red-500 text-xs font-semibold">{errors.email}</span>
            )}
          </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="e.g. stephenking@lorem.com"
            value={personalInfo.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                        ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>

        {/* Phone Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="phone" className="text-blue-900 text-sm font-medium">
              Phone Number
            </label>
            {errors.phone && (
              <span className="text-red-500 text-xs font-semibold">{errors.phone}</span>
            )}
          </div>
          <input
            type="tel" // یا text اگر میخواهید هر فرمتی وارد شود
            id="phone"
            name="phone"
            placeholder="e.g. +1 234 567 890"
            value={personalInfo.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500
                        ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
      </div>

      {/* Navigation Buttons (Next Step) */}
      <div className="flex justify-end mt-auto pt-8"> {/* mt-auto برای هل دادن به پایین */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  );
};

export default Step1;