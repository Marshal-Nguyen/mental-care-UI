import React from "react";

const MentalHealthDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-2 bg-[#fff0]">
      {/* Score Cards Container */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Depression Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="bg-indigo-400 p-2 text-center">
            <h3 className="text-white font-bold italic">Depression</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-indigo-500 font-bold italic">
              17
            </span>
          </div>
        </div>

        {/* Anxiety Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white border-2 border-emerald-400">
          <div className="bg-emerald-400 p-2 text-center">
            <h3 className="text-white font-bold italic">Anxiety</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-emerald-600 font-bold italic">
              09
            </span>
          </div>
        </div>

        {/* Stress Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="bg-amber-300 p-2 text-center">
            <h3 className="text-white font-bold italic">Stress</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-amber-600 font-bold italic">32</span>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-xl px-6 py-3 shadow-sm mt-2">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Initial Recommendations:
        </h2>
        <ol className="list-disc pl-6 space-y-1 h-20 overflow-y-auto italic">
          <li>
            Engage in relaxation techniques (deep breathing, meditation, light
            physical activities).
          </li>
          <li>Adjust lifestyle habits, focusing on sleep and nutrition.</li>
          <li>
            If symptoms persist or worsen, seeking professional psychological
            support is advised.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;
