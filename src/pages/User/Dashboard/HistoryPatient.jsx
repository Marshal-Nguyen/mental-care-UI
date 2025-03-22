import React, { useState, useEffect } from "react";

import HistoryTestResult from "../../../components/Dashboard/Patient/HistoryTestResult";
import HistoryBooking from "../../../components/Dashboard/Patient/HistoryBooking";

const HistoryPatient = () => {
  const [activeTab, setActiveTab] = useState("Result");

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">View History Patient</h2>
      {/* Test List Panel */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("Result")}
          className={`px-4 py-2 -mb-px ${
            activeTab === "Result"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          History Test Result
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("Booking")}
          className={`px-4 py-2 -mb-px ${
            activeTab === "Booking"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}>
          History Booking
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Result" && <HistoryTestResult />}
        {activeTab === "Booking" && <HistoryBooking />}
      </div>
    </div>
  );
};

export default HistoryPatient;
