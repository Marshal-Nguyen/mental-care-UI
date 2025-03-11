import React, { useState, useEffect } from "react";

const WeeklyPlanner = () => {
  const [activeWeek, setActiveWeek] = useState("WEEK 1");
  const [startDate, setStartDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [taskStatus, setTaskStatus] = useState({});

  // Initialize with current date and calculate the start of the week
  useEffect(() => {
    const today = new Date();
    // Get Monday of current week (0 = Sunday, 1 = Monday, etc.)
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(today.setDate(diff));
    setStartDate(monday);

    // Initialize with some example tasks
    initializeSampleTasks(monday);
  }, []);

  // Initialize sample tasks for demo purposes
  const initializeSampleTasks = (monday) => {
    if (!monday) return;

    const sampleTasks = {};
    const initialTaskStatus = {};

    // Create tasks for specific dates
    // Monday's tasks
    const mondayKey = formatDateKey(monday);
    sampleTasks[mondayKey] = [
      {
        id: 1,
        time: "09:00",
        title: "Họp nhóm",
        duration: "09:00am - 10:30am",
        color: "purple",
      },
      {
        id: 2,
        time: "14:00",
        title: "Thiết kế UI",
        duration: "14:00pm - 16:00pm",
        color: "purple",
      },
    ];

    // Tuesday's tasks
    const tuesday = new Date(monday);
    tuesday.setDate(monday.getDate() + 1);
    const tuesdayKey = formatDateKey(tuesday);
    sampleTasks[tuesdayKey] = [
      {
        id: 3,
        time: "10:00",
        title: "Gặp khách hàng",
        duration: "10:00am - 11:30am",
        color: "purple",
      },
    ];

    // Wednesday's tasks
    const wednesday = new Date(monday);
    wednesday.setDate(monday.getDate() + 2);
    const wednesdayKey = formatDateKey(wednesday);
    sampleTasks[wednesdayKey] = [
      {
        id: 4,
        time: "08:00",
        title: "Animation Review",
        duration: "08:00am - 09:00am",
        color: "purple",
      },
      {
        id: 5,
        time: "13:00",
        title: "Phát triển Backend",
        duration: "13:00pm - 17:00pm",
        color: "purple",
      },
      {
        id: 12,
        time: "20:00",
        title: "Học tập online",
        duration: "20:00pm - 22:00pm",
        color: "purple",
      },
    ];

    // Thursday's tasks
    const thursday = new Date(monday);
    thursday.setDate(monday.getDate() + 3);
    const thursdayKey = formatDateKey(thursday);
    sampleTasks[thursdayKey] = [
      {
        id: 6,
        time: "11:00",
        title: "Họp dự án",
        duration: "11:00am - 12:00pm",
        color: "purple",
      },
    ];

    // Friday's tasks
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);
    const fridayKey = formatDateKey(friday);
    sampleTasks[fridayKey] = [
      {
        id: 7,
        time: "10:00",
        title: "UI Motion",
        duration: "10:00am - 12:00pm",
        color: "purple",
      },
      {
        id: 8,
        time: "15:00",
        title: "Tổng kết tuần",
        duration: "15:00pm - 16:30pm",
        color: "purple",
      },
      {
        id: 11,
        time: "19:00",
        title: "Team building",
        duration: "19:00pm - 21:00pm",
        color: "purple",
      },
    ];

    // Add tasks for week 2 as well
    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);
    const nextMondayKey = formatDateKey(nextMonday);
    sampleTasks[nextMondayKey] = [
      {
        id: 9,
        time: "09:00",
        title: "Lập kế hoạch tuần",
        duration: "09:00am - 10:00am",
        color: "purple",
      },
      {
        id: 10,
        time: "22:00",
        title: "Chuẩn bị tài liệu",
        duration: "22:00pm - 23:30pm",
        color: "purple",
      },
    ];

    // Initialize task status (all unchecked)
    Object.values(sampleTasks)
      .flat()
      .forEach((task) => {
        initialTaskStatus[task.id] = false;
      });

    setTasks(sampleTasks);
    setTaskStatus(initialTaskStatus);
  };

  // Toggle task completion status
  const toggleTaskStatus = (taskId) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));
  };

  // Format date to use as object key (YYYY-MM-DD)
  const formatDateKey = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  // Generate week start dates
  const getWeekStartDate = (weekOffset) => {
    if (!startDate) return null;

    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + weekOffset * 7);
    return newDate;
  };

  // Get week number from active week string
  const getWeekOffset = () => {
    return parseInt(activeWeek.split(" ")[1]) - 1;
  };

  // Get array of 7 dates for the active week
  const getDaysInActiveWeek = () => {
    if (!startDate) return Array(7).fill(null);

    const weekStartDate = getWeekStartDate(getWeekOffset());
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekStartDate);
      date.setDate(weekStartDate.getDate() + i);
      return date;
    });
  };

  // Format day name
  const formatDayName = (date) => {
    if (!date) return "";
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return days[date.getDay()];
  };

  // Check if a date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Generate time slots from 07:00 to 00:00
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  // Get activities for a specific date
  const getActivitiesForDay = (date) => {
    if (!date) return [];

    const dateKey = formatDateKey(date);
    return tasks[dateKey] || [];
  };

  // Add a new task
  const addTask = (date, newTask) => {
    if (!date) return;

    const dateKey = formatDateKey(date);

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      if (!updatedTasks[dateKey]) {
        updatedTasks[dateKey] = [];
      }

      // Generate a unique ID
      const newId =
        Math.max(
          ...Object.values(updatedTasks)
            .flat()
            .map((task) => task.id),
          0
        ) + 1;
      const taskWithId = { ...newTask, id: newId };

      updatedTasks[dateKey] = [...updatedTasks[dateKey], taskWithId];

      // Initialize task status
      setTaskStatus((prev) => ({
        ...prev,
        [newId]: false,
      }));

      return updatedTasks;
    });
  };

  // Get month name
  const getMonthName = (date) => {
    if (!date) return "";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[date.getMonth()];
  };

  const daysInWeek = getDaysInActiveWeek();

  if (!startDate) return <div>Loading...</div>;

  return (
    <div className="max-w-full bg-gray-50 p-4">
      {/* Week selection tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["WEEK 1", "WEEK 2"].map((week) => (
          <button
            key={week}
            className={`py-3 px-8 rounded-lg ${
              activeWeek === week
                ? "bg-purple-300 text-black font-medium"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveWeek(week)}>
            {week}
          </button>
        ))}
      </div>

      {/* Calendar view with horizontal scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4" style={{ minWidth: "max-content" }}>
          {daysInWeek.map((date, index) => (
            <div key={index} className="w-77 bg-white rounded-lg shadow-sm p-2">
              {/* Month and Add Task header */}
              <div className="flex justify-between items-center p-3 bg-[#e4d6fd] rounded-t-xl">
                <h3 className="font-serif">{getMonthName(date)}</h3>
                <button
                  className="text-purple-600 text-sm flex items-center bg-white p-1 rounded-sm font-medium"
                  onClick={() => {
                    // In a real app, you would open a modal or form here
                    const mockTask = {
                      time: "12:00",
                      title: "Nhiệm vụ mới",
                      duration: "12:00pm - 13:00pm",
                      color: "purple",
                    };
                    addTask(date, mockTask);
                  }}>
                  <span className="mr-1">+</span> Add Task
                </button>
              </div>

              {/* Days of the week */}
              <div className="flex justify-between px-3 py-3 bg-[#e4d6fd] rounded-b-xl">
                {daysInWeek.map((d, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 flex flex-col font-bold items-center justify-center rounded-md text-xs
                      ${
                        index === i
                          ? isToday(d)
                            ? "bg-[#1411d1] py-5 px-2 text-white"
                            : "bg-white py-5 px-2 text-gray-800 font-medium"
                          : "text-gray-500 py-5 px-2 font-thin"
                      }`}>
                    <span className="mb-0.5">{d ? d.getDate() : ""}</span>
                    <span>{formatDayName(d)}</span>
                  </div>
                ))}
              </div>

              {/* Time slots and activities with vertical scroll */}
              <div className="h-112 overflow-y-auto">
                {timeSlots.map((time) => {
                  const dayActivities = getActivitiesForDay(date);
                  const activity = dayActivities.find((a) => a.time === time);

                  return (
                    <div key={time} className="relative border-b">
                      <div className="text-xs text-gray-500 pl-3 py-2">
                        {time}
                      </div>

                      {/* Show activity if exists for this time slot */}
                      {activity && (
                        <div className="pl-3 pr-1 pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex">
                              <div
                                className={`w-1 bg-purple-600 mr-2 rounded-full`}></div>
                              <div>
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-xs text-gray-500">
                                  {activity.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-center space-x-1">
                              <div
                                className={`w-5 h-5 rounded border border-gray-300 cursor-pointer flex items-center justify-center ${
                                  taskStatus[activity.id]
                                    ? "bg-purple-600"
                                    : "bg-white"
                                }`}
                                onClick={() => toggleTaskStatus(activity.id)}>
                                {taskStatus[activity.id] && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <button className="text-lg font-bold">...</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
