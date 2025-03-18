import React from "react";

const NotionPatient = () => {
  return (
    <div className="bg-[#fff] px-4 flex flex-col h-[296px]">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden max-w-md w-full p-5 h-full">
        {/* Daily Notion Section */}
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-800">Daily notion</h3>
        </div>
        {/* Today's Itinerary - Better Centered Content */}
        <div className="bg-gray-50 rounded-lg p-4 h-fit">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Today's itinerary</h4>
            <a href="#" className="text-sm text-purple-600 font-medium">
              See more
            </a>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              You have completed 75% of the task today.
            </p>
            <p className="text-sm text-gray-600">Let's try our best.</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: "75%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionPatient;
