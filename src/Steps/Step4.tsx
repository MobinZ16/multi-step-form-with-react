import React, {useMemo} from "react";
import type { FormData, Plan, AddOn } from "../types";
import {plans, addOns} from '../data';

interface Step4Props{
    formData: FormData;
    onGoBack: () => void;
    onConfirm: () => void;
    onChangePlan: () => void;
}

const Step4: React.FC<Step4Props> = ({
    formData,
    onGoBack,
    onConfirm,
    onChangePlan,
}) => {
    const {personalInfo, plan: selectedPlanType, billingCycle, selectedAddOnIds} = formData;

    const selectedPlanDetails = useMemo(() => {
        return plans.find(plan => plan.type === selectedPlanType);
    }, [selectedPlanType]);

    const selectedAddOnDetails = useMemo(() => {
        return addOns.filter(ao => selectedAddOnIds.includes(ao.id));
    }, [selectedAddOnIds]);

    const totalCost = useMemo(() => {
        let cost = 0;
        if (selectedPlanDetails) {
            cost += billingCycle === "monthly" ? selectedPlanDetails.priceMonthly : selectedPlanDetails.priceYearly;
        }
        selectedAddOnDetails.forEach(ao => {
            cost += billingCycle === "monthly" ? ao.priceMonthly : ao.priceYearly;
        });
        return cost;
    }, [billingCycle, selectedPlanDetails, selectedAddOnDetails]);

    const billingUnit = billingCycle === "monthly" ? "mo" : "yr";

    return (
    <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }} className="h-full flex flex-col">
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Finishing up</h2>
      <p className="text-gray-500 mb-8">
        Double-check everything looks OK before confirming.
      </p>

      <div className="flex-grow bg-blue-50 p-6 rounded-lg mb-8">
        {/* Plan Summary */}
        {selectedPlanDetails && (
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
            <div>
              <h3 className="font-bold text-blue-900">
                {selectedPlanDetails.type} ({billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})
              </h3>
              <button
                type="button"
                onClick={onChangePlan}
                className="text-gray-500 text-sm underline hover:text-blue-700 transition-colors"
              >
                Change
              </button>
            </div>
            <span className="font-bold text-blue-900">
              ${billingCycle === 'monthly' ? selectedPlanDetails.priceMonthly : selectedPlanDetails.priceYearly}/{billingUnit}
            </span>
          </div>
        )}

        {/* Add-ons Summary */}
        <div className="space-y-3">
          {selectedAddOnDetails.map(addOn => (
            <div key={addOn.id} className="flex justify-between items-center text-gray-500">
              <span>{addOn.name}</span>
              <span>+${billingCycle === 'monthly' ? addOn.priceMonthly : addOn.priceYearly}/{billingUnit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Cost */}
      <div className="flex justify-between items-center p-6 mt-auto">
        <span className="text-gray-500">Total (per {billingCycle === 'monthly' ? 'month' : 'year'})</span>
        <span className="text-blue-700 text-xl font-bold">
          ${totalCost}/{billingUnit}
        </span>
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
          type="submit" // این دکمه نهایی است
          className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Step4;