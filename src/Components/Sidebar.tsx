import React from "react";
import SidebarIcon from "../assets/images/bg-sidebar-desktop.svg";

interface SidebarProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: "Your Info" },
  { id: 2, title: "Select Plan" },
  { id: 3, title: "Add-Ons" },
  { id: 4, title: "Summary" },
];

const Sidebar: React.FC<SidebarProps> = ({ currentStep }) => {
  return (
    <nav className="flex justify-center md:flex-col gap-4 md:gap-8 pt-8 md:pt-0">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center gap-4">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-white text-white font-bold
              ${currentStep === step.id ? 'bg-blue-200 text-blue-800 border-blue-200' : ''}`}
          >
            {step.id}
          </div>
          <div className="hidden md:block">
            <div className="text-gray-300 text-xs uppercase">Step {step.id}</div>
            <div className="text-white font-bold uppercase text-sm tracking-wider">
              {step.title}
            </div>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
