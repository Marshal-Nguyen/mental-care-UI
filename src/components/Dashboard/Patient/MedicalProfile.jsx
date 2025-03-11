import React from "react";

const MedicalProfile = () => {
  return (
    <div className="bg-white px-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden max-w-md w-[332px] h-[372px]">
        {/* Header */}
        <div className="px-6 pt-6 flex items-center relative">
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center mr-4 border-2 border-teal-100">
            <span className="text-teal-800 text-xl font-bold">TG</span>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-medium text-gray-800">Truong Giang</h2>
            <p className="text-gray-500 text-sm">Male - 28 Years 3 Months</p>
          </div>

          <button className="text-gray-400 hover:text-gray-600 transition">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="19" cy="12" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Symptoms */}
        <div className="px-6 pt-4 pb-2 flex justify-evenly">
          <div className="flex flex-col items-center">
            <img src="/MedicalHistory/fever.png" className="w-[40px]" />
            <span className="text-sm font-medium text-gray-700">Fever</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/MedicalHistory/heart.png" className="w-[40px]" />
            <span className="text-sm font-medium text-gray-700">
              Heart Burn
            </span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/MedicalHistory/sick.png" className="w-[40px]" />
            <span className="text-sm font-medium text-gray-700">Sick</span>
          </div>
        </div>

        <div className="mx-4 h-px bg-[#8a8c8f]"></div>
        <div className="overflow-y-auto max-h-50">
          {/* Medical History */}
          <SectionItem title="Medical History" content="Not Define" />
          {/* Notes */}
          <SectionItem
            title="Notes"
            content="Patient experiencing mild anxiety symptoms"
          />
          {/* Mental Disorders */}
          <div className="px-6 py-2">
            <h3 className="font-bold text-[#000000c0] text-[15px] pb-1">
              Specific Mental Disorders
            </h3>
            <ol className="list-disc px-6 space-y-1 italic text-[13px]">
              <li className="text-gray-600">Eating Disorders - Subtype</li>
              <li className="text-gray-600">
                Borderline Personality Disorder - Subtype
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const SectionItem = ({ title, content }) => (
  <div className="px-6 pt-2">
    <h3 className="font-bold text-[#000000c0] text-[15px]">{title}</h3>
    <p className="text-gray-600 italic text-[13px]">{content}</p>
  </div>
);

export default MedicalProfile;
