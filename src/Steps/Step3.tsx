import React, { type FormEvent } from "react";
import type { BillingCycle } from "../types";
import { addOns } from "../data";

interface Step3Props {
    selectedAddOnIds: string[];
    billingCycle: BillingCycle;
    onToggleAddOn: (id: string, isChecked: boolean) => void;
    onNext: () => void;
    onGoBack: () => void;
}

const Step3: React.FC<Step3Props> = ({
    selectedAddOnIds,
    billingCycle,
    onToggleAddOn,
    onNext,
    onGoBack,
}) => {
    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Pick add-ons</h2>
      <p className="text-gray-500 mb-8">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="flex-grow space-y-4">
        {addOns.map((addOn) => {
          const isSelected = selectedAddOnIds.includes(addOn.id);
          const price = billingCycle === 'monthly' ? addOn.priceMonthly : addOn.priceYearly;
          const priceUnit = billingCycle === 'monthly' ? 'mo' : 'yr';

          return (
            <label
              key={addOn.id}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all
                ${isSelected ? 'border-blue-700 bg-blue-50' : 'border-gray-300 hover:border-blue-700'}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => onToggleAddOn(addOn.id, e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-blue-900 text-base">{addOn.name}</h3>
                <p className="text-gray-500 text-sm">{addOn.description}</p>
              </div>
              <span className="text-blue-700 text-sm font-semibold">
                +${price}/{priceUnit}
              </span>
            </label>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-auto pt-8">
        <button
          type="button"
          onClick={onGoBack}
          className="px-6 py-3 text-gray-500 rounded-md hover:text-blue-900 transition-colors"
        >
          Go Back
        </button>
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

export default Step3;
