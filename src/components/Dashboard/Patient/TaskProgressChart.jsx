import React, { useState, useEffect } from "react";

const TaskProgressChart = () => {
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [animatedBars, setAnimatedBars] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);

  // Sample data for weeks
  const weeksData = {
    "Week 1": {
      bars: [
        { day: "Monday", percentage: 35, tasks: 12, completed: 4 },
        { day: "Tuesday", percentage: 80, tasks: 15, completed: 12 },
        { day: "Wednesday", percentage: 65, tasks: 10, completed: 6 },
        { day: "Thursday", percentage: 38, tasks: 8, completed: 3 },
        { day: "Friday", percentage: 55, tasks: 12, completed: 7 },
        { day: "Saturday", percentage: 72, tasks: 9, completed: 6 },
        { day: "Sunday", percentage: 38, tasks: 5, completed: 2 },
      ],
      metrics: [
        { label: "Time spent", value: "18h", percentage: 120 },
        { label: "Lesson Learnt", value: "15h", percentage: 120 },
        { label: "Exams Passed", value: "2h", percentage: 100 },
      ],
    },
    "Week 2": {
      bars: [
        { day: "Monday", percentage: 42, tasks: 14, completed: 6 },
        { day: "Tuesday", percentage: 65, tasks: 12, completed: 8 },
        { day: "Wednesday", percentage: 78, tasks: 15, completed: 12 },
        { day: "Thursday", percentage: 50, tasks: 10, completed: 5 },
        { day: "Friday", percentage: 62, tasks: 13, completed: 8 },
        { day: "Saturday", percentage: 85, tasks: 8, completed: 7 },
        { day: "Sunday", percentage: 45, tasks: 6, completed: 3 },
      ],
      metrics: [
        { label: "Time spent", value: "20h", percentage: 130 },
        { label: "Lesson Learnt", value: "17h", percentage: 125 },
        { label: "Exams Passed", value: "3h", percentage: 110 },
      ],
    },
  };

  // Get current data based on selected week
  const currentData = weeksData[selectedWeek];

  // Percentage scale labels
  const percentageScaleLabels = ["0", "20%", "40%", "60%", "80%", "100%"];

  // Animation effect for bars when data changes
  useEffect(() => {
    // Reset bars to 0 height first
    setAnimatedBars(currentData.bars.map((bar) => ({ ...bar, percentage: 0 })));

    // Use setTimeout to trigger the animation after a small delay
    const timer = setTimeout(() => {
      // Animate to actual height
      setAnimatedBars(currentData.bars);
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedWeek]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectWeek = (week) => {
    setSelectedWeek(week);
    setIsDropdownOpen(false);
  };

  const handleMouseEnter = (item, index) => {
    setHoverInfo({
      item,
      index,
      x: index * 40 + 20, // Approximate position
    });
  };

  const handleMouseLeave = () => {
    setHoverInfo(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-semibold text-gray-800">Tasks Progress</h1>
        <div className="relative inline-block">
          <button
            className="flex items-center bg-gray-100 border-none rounded-lg px-4 py-2 text-sm text-gray-800"
            onClick={toggleDropdown}>
            {selectedWeek}
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              {Object.keys(weeksData).map((week) => (
                <div
                  key={week}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => selectWeek(week)}>
                  {week}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Percentage scale */}
        <div className="w-10 mr-2 flex flex-col justify-between h-56 text-xs text-gray-500">
          {percentageScaleLabels.reverse().map((label, index) => (
            <div key={index} className="flex items-center">
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Chart container */}
        <div className="w-9/12 pr-6">
          <div className="flex h-64 items-end justify-between relative">
            {/* Horizontal guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {percentageScaleLabels.map((_, index) => (
                <div
                  key={index}
                  className="w-full border-t border-gray-200 h-0"></div>
              ))}
            </div>

            {/* Bars */}
            {animatedBars.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-5 z-10"
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={handleMouseLeave}>
                <div className="w-full h-56 bg-purple-100 rounded-2xl relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-purple-700 rounded-2xl transition-all duration-1000 ease-out"
                    style={{ height: `${item.percentage}%` }}></div>
                </div>
                <div className="mt-2 text-sm text-gray-500">{item.day}</div>
              </div>
            ))}

            {/* Hover tooltip */}
            {hoverInfo && (
              <div
                className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-20 text-xs"
                style={{
                  bottom: `${hoverInfo.item.percentage + 5}%`,
                  left: `${hoverInfo.index * 40}px`,
                }}>
                <div className="font-bold">{hoverInfo.item.day}</div>
                <div>Completion: {hoverInfo.item.percentage}%</div>
                <div>Tasks: {hoverInfo.item.tasks}</div>
                <div>Completed: {hoverInfo.item.completed}</div>
              </div>
            )}
          </div>
        </div>

        {/* Metrics container */}
        <div className="w-2/12 flex flex-col justify-center space-y-6 ml-15">
          {currentData.metrics.map((metric, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="text-sm text-gray-500">{metric.label}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold text-gray-800">
                  {metric.value}
                </div>
                {/* <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden ml-4">
                  <div
                    className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${metric.percentage}%` }}></div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskProgressChart;
