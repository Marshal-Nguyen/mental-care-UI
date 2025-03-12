import React, { useState, useEffect } from "react";

const WeeklyPlanner = () => {
  const [activeWeek, setActiveWeek] = useState("WEEK 1");
  const [startDate, setStartDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [taskStatus, setTaskStatus] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  // Initialize with current date and calculate the start of the week
  useEffect(() => {
    const today = new Date();
    // Get Monday of current week (0 = Sunday, 1 = Monday, etc.)
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(today.setDate(diff));
    setStartDate(monday);

    // Initialize with stress reduction tasks
    initializeStressReductionTasks(monday);
  }, []);

  // Initialize stress reduction tasks
  const initializeStressReductionTasks = (monday) => {
    if (!monday) return;

    const stressReductionTasks = {};
    const initialTaskStatus = {};

    // Helper function to create a week's worth of tasks
    const createWeekTasks = (startDay, weekOffset = 0) => {
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startDay);
        currentDay.setDate(startDay.getDate() + i + weekOffset * 7);
        const dayKey = formatDateKey(currentDay);

        // Each day gets around 8-10 stress reduction activities
        stressReductionTasks[dayKey] = [];

        // Add morning meditation
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-1`,
          time: "07:00",
          title: "Thiền buổi sáng",
          duration: "07:00 - 07:20",
          color: "blue",
          description:
            "Ngồi thiền 20 phút để bắt đầu ngày mới với tâm trí tĩnh lặng. Tập trung vào hơi thở và buông bỏ các suy nghĩ lo lắng.",
          benefits: [
            "Giảm cortisol",
            "Tăng cường tập trung",
            "Cải thiện tâm trạng",
          ],
        });

        // Add breathing exercise
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-2`,
          time: "09:30",
          title: "Thở sâu",
          duration: "09:30 - 09:40",
          color: "green",
          description:
            "Thực hiện kỹ thuật thở 4-7-8: hít vào trong 4 giây, giữ trong 7 giây, và thở ra trong 8 giây. Lặp lại 5 lần.",
          benefits: [
            "Giảm căng thẳng ngay lập tức",
            "Hạ huyết áp",
            "Cân bằng hệ thần kinh",
          ],
        });

        // Add stretching
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-3`,
          time: "11:00",
          title: "Giãn cơ tại bàn làm việc",
          duration: "11:00 - 11:10",
          color: "purple",
          description:
            "Thực hiện các động tác giãn cơ nhẹ nhàng tại bàn làm việc: xoay cổ, giãn vai, giãn cánh tay và cổ tay.",
          benefits: ["Giảm căng cơ", "Tăng tuần hoàn", "Giảm mệt mỏi"],
        });

        // Add mindful lunch
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-4`,
          time: "12:30",
          title: "Ăn trưa có ý thức",
          duration: "12:30 - 13:15",
          color: "orange",
          description:
            "Tập trung hoàn toàn vào bữa ăn, cảm nhận từng miếng, hương vị và kết cấu. Không sử dụng điện thoại hoặc máy tính.",
          benefits: [
            "Cải thiện tiêu hóa",
            "Tăng sự hài lòng",
            "Giảm ăn quá nhiều",
          ],
        });

        // Add afternoon break
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-5`,
          time: "14:30",
          title: "Nghỉ ngơi ngắn",
          duration: "14:30 - 14:45",
          color: "teal",
          description:
            "Rời khỏi màn hình, đi dạo ngắn hoặc nhìn ra ngoài cửa sổ tập trung vào thiên nhiên trong 15 phút.",
          benefits: ["Giảm mỏi mắt", "Nạp lại năng lượng", "Tăng sáng tạo"],
        });

        // Add afternoon tea
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-6`,
          time: "16:00",
          title: "Uống trà thảo mộc",
          duration: "16:00 - 16:15",
          color: "green",
          description:
            "Thưởng thức một tách trà thảo mộc (trà hoa cúc, oải hương hoặc bạc hà) trong yên lặng.",
          benefits: [
            "Tăng cường thư giãn",
            "Cung cấp chất chống oxy hóa",
            "Giảm căng thẳng",
          ],
        });

        // Add journaling
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-7`,
          time: "17:30",
          title: "Viết nhật ký biết ơn",
          duration: "17:30 - 17:45",
          color: "pink",
          description:
            "Viết ra 3 điều bạn biết ơn trong ngày hôm nay và cảm xúc tích cực bạn đã trải qua.",
          benefits: [
            "Tăng cảm giác hạnh phúc",
            "Giảm lo âu",
            "Cải thiện tâm trạng",
          ],
        });

        // Add evening exercise
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-8`,
          time: "19:00",
          title: "Tập thể dục nhẹ nhàng",
          duration: "19:00 - 19:30",
          color: "indigo",
          description:
            "Thực hiện 30 phút yoga, đi bộ hoặc bơi lội với cường độ nhẹ đến vừa phải.",
          benefits: [
            "Giải phóng endorphin",
            "Cải thiện giấc ngủ",
            "Giảm căng thẳng",
          ],
        });

        // Add evening wind-down
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-9`,
          time: "21:00",
          title: "Thời gian thư giãn",
          duration: "21:00 - 21:30",
          color: "purple",
          description:
            "Đọc sách, nghe nhạc nhẹ nhàng hoặc tắm nước ấm để chuẩn bị cho giấc ngủ.",
          benefits: [
            "Chuyển đổi sang chế độ thư giãn",
            "Giảm căng thẳng",
            "Chuẩn bị cho giấc ngủ",
          ],
        });

        // Add bedtime meditation
        stressReductionTasks[dayKey].push({
          id: `${dayKey}-10`,
          time: "22:30",
          title: "Thiền trước khi ngủ",
          duration: "22:30 - 22:45",
          color: "blue",
          description:
            "Thực hiện quét cơ thể từ đầu đến chân, thả lỏng từng phần cơ thể và chuẩn bị cho giấc ngủ sâu.",
          benefits: [
            "Cải thiện chất lượng giấc ngủ",
            "Giảm lo âu",
            "Thư giãn cơ bắp",
          ],
        });
      }
    };

    // Create tasks for Week 1 and Week 2
    createWeekTasks(monday, 0);
    createWeekTasks(monday, 1);

    // Initialize task status (all unchecked)
    Object.values(stressReductionTasks)
      .flat()
      .forEach((task) => {
        initialTaskStatus[task.id] = false;
      });

    setTasks(stressReductionTasks);
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
    const days = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
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
      const taskWithId = { ...newTask, id: `${dateKey}-${Date.now()}` };

      updatedTasks[dateKey] = [...updatedTasks[dateKey], taskWithId];

      // Initialize task status
      setTaskStatus((prev) => ({
        ...prev,
        [taskWithId.id]: false,
      }));

      return updatedTasks;
    });
  };

  // Get month name
  const getMonthName = (date) => {
    if (!date) return "";
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return months[date.getMonth()];
  };

  // Show task details
  const showTaskDetails = (task) => {
    setSelectedTask(task);
    setShowTaskDetail(true);
  };

  // Close task details modal
  const closeTaskDetail = () => {
    setShowTaskDetail(false);
    setSelectedTask(null);
  };

  const daysInWeek = getDaysInActiveWeek();

  if (!startDate) return <div>Đang tải...</div>;

  return (
    <div className="max-w-full bg-gray-50 p-4 ">
      {/* Week selection tabs */}
      <div className="flex space-x-4 mb-6 overflow-x-auto">
        {["WEEK 1", "WEEK 2"].map((week) => (
          <button
            key={week}
            className={`py-3 px-8 rounded-lg ${
              activeWeek === week
                ? "bg-purple-600 text-white font-medium"
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
            <div key={index} className="w-90 bg-white rounded-lg shadow-md">
              {/* Day header */}
              <div
                className={`p-4 rounded-t-lg ${
                  isToday(date)
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-800"
                }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{formatDayName(date)}</h3>
                    <p className="text-sm">
                      {date ? `${date.getDate()} ${getMonthName(date)}` : ""}
                    </p>
                  </div>
                  <button
                    className={`text-sm flex items-center px-3 py-1 rounded-lg ${
                      isToday(date)
                        ? "bg-white text-indigo-600"
                        : "bg-indigo-600 text-white"
                    } font-medium`}
                    onClick={() => {
                      const newTask = {
                        time: "12:00",
                        title: "Hoạt động giảm stress mới",
                        duration: "12:00 - 13:00",
                        color: "green",
                        description:
                          "Thêm hoạt động giảm stress mới vào lịch của bạn",
                        benefits: [
                          "Giảm căng thẳng",
                          "Cải thiện sức khỏe tinh thần",
                        ],
                      };
                      addTask(date, newTask);
                    }}>
                    <span className="mr-1">+</span> Thêm
                  </button>
                </div>
              </div>

              {/* Tasks list with vertical scroll */}
              <div className="h-120 overflow-y-auto p-2">
                {getActivitiesForDay(date)
                  .sort((a, b) => {
                    // Sort by time (HH:MM format)
                    const timeA = a.time.split(":").map(Number);
                    const timeB = b.time.split(":").map(Number);
                    return (
                      timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
                    );
                  })
                  .map((activity) => (
                    <div
                      key={activity.id}
                      className={`mb-3 p-3 rounded-lg border-l-4 ${
                        taskStatus[activity.id]
                          ? "bg-gray-100 opacity-70"
                          : "bg-white"
                      }`}
                      style={{
                        borderLeftColor:
                          activity.color === "purple"
                            ? "#9333ea"
                            : activity.color === "blue"
                            ? "#3b82f6"
                            : activity.color === "green"
                            ? "#22c55e"
                            : activity.color === "orange"
                            ? "#f97316"
                            : activity.color === "teal"
                            ? "#14b8a6"
                            : activity.color === "pink"
                            ? "#ec4899"
                            : activity.color === "indigo"
                            ? "#6366f1"
                            : "#9333ea",
                      }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-500">
                              {activity.time}
                            </span>
                            <span className="mx-2">•</span>
                            <p
                              className={`font-medium ${
                                taskStatus[activity.id]
                                  ? "line-through text-gray-500"
                                  : "text-gray-800"
                              }`}>
                              {activity.title}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.duration}
                          </p>
                        </div>
                        <div className="flex space-x-2 items-center">
                          <div
                            className={`w-5 h-5 rounded-md border cursor-pointer flex items-center justify-center ${
                              taskStatus[activity.id]
                                ? "bg-indigo-600 border-indigo-600"
                                : "bg-white border-gray-300"
                            }`}
                            onClick={() => toggleTaskStatus(activity.id)}>
                            {taskStatus[activity.id] && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-white"
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
                          <button
                            className="text-lg font-bold text-gray-500 hover:text-indigo-600 focus:outline-none"
                            onClick={() => showTaskDetails(activity)}>
                            ...
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task detail modal */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-[#00000048] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedTask.title}</h2>
              <button
                onClick={closeTaskDetail}
                className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                {selectedTask.duration}
              </p>
              <p className="text-gray-700 mb-4">{selectedTask.description}</p>

              <h3 className="font-bold text-gray-800 mb-2">Lợi ích:</h3>
              <ul className="list-disc pl-5">
                {selectedTask.benefits.map((benefit, index) => (
                  <li key={index} className="text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeTaskDetail}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlanner;
