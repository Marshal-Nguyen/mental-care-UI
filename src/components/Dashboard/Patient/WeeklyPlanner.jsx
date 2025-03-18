import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const WeeklyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activities, setActivities] = useState([]);
  const [taskStatus, setTaskStatus] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const profileId = useSelector((state) => state.auth.profileId);

  // API endpoints
  const BASE_URL =
    "https://psychologysupportscheduling-g0efgxc5bwhbhjgc.southeastasia-01.azurewebsites.net";
  const SCHEDULES_ENDPOINT = `${BASE_URL}/schedules`;
  const ACTIVITIES_ENDPOINT = `${BASE_URL}/schedule-activities`;

  // Format date to use as object key (YYYY-MM-DD)
  const formatDateKey = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  // Only fetch sessions once when component mounts
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        console.log("Fetching sessions data...");
        const scheduleResponse = await axios.get(
          `${SCHEDULES_ENDPOINT}?PageIndex=1&PageSize=10&SortBy=startDate&SortOrder=asc&PatientId=${profileId}`
        );
        console.log("Schedule Response:", scheduleResponse.data);

        const sessionsData =
          scheduleResponse.data.schedules.data[0]?.sessions || [];
        setSessions(sessionsData);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [profileId]);

  // Fetch activities only for the selected date
  useEffect(() => {
    const fetchActivitiesForDate = async () => {
      try {
        setLoading(true);
        const dateKey = formatDateKey(selectedDate);
        console.log(`Fetching activities for date: ${dateKey}`);

        // Find session for the selected date
        const sessionForDate = sessions.find((session) => {
          const sessionDate = new Date(session.startDate);
          return formatDateKey(sessionDate) === dateKey;
        });

        let activitiesForDate = [];

        if (sessionForDate) {
          console.log(
            `Found session ID: ${sessionForDate.id} for date: ${dateKey}`
          );
          const activityResponse = await axios.get(
            `${ACTIVITIES_ENDPOINT}/${sessionForDate.id}`
          );
          console.log(
            `Activities for session ${sessionForDate.id}:`,
            activityResponse.data
          );

          activitiesForDate = activityResponse.data.scheduleActivities.map(
            (activity) => {
              return createActivityObject(
                activity,
                new Date(activity.timeRange),
                sessionForDate.id
              );
            }
          );
        } else {
          console.log(
            `No session found for date: ${dateKey}, using default activities`
          );
          // Use default activities if no session exists for this date
          activitiesForDate = getDefaultActivities(selectedDate);
        }

        setActivities(activitiesForDate);

        // Initialize task status for these activities
        const initialTaskStatus = {};
        activitiesForDate.forEach((activity) => {
          initialTaskStatus[activity.id] = false;
        });

        setTaskStatus(initialTaskStatus);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities for date:", error);
        setLoading(false);
      }
    };

    if (sessions.length > 0) {
      fetchActivitiesForDate();
    }
  }, [selectedDate, sessions]);

  // Create a standardized activity object from API data
  const createActivityObject = (activity, time, sessionId) => {
    let title = "Hoạt động";
    let description = "Không có mô tả";
    let color = "blue";
    let benefits = [];

    if (activity.foodActivity) {
      title = `Bữa ăn: ${activity.foodActivity.name}`;
      description = activity.foodActivity.description;
      color = "green";
      benefits = [
        `Thời gian: ${activity.foodActivity.mealTime}`,
        `Dinh dưỡng: ${activity.foodActivity.foodNutrients.join(", ")}`,
        `Cường độ: ${activity.foodActivity.intensityLevel}`,
      ];
    } else if (activity.physicalActivity) {
      title = `Hoạt động thể chất: ${activity.physicalActivity.name}`;
      description = activity.physicalActivity.description;
      color = "indigo";
      benefits = [
        `Cường độ: ${activity.physicalActivity.intensityLevel}`,
        `Mức độ tác động: ${activity.physicalActivity.impactLevel}`,
      ];
    } else if (activity.entertainmentActivity) {
      title = `Giải trí: ${activity.entertainmentActivity.name}`;
      description = activity.entertainmentActivity.description;
      color = "purple";
      benefits = [
        `Cường độ: ${activity.entertainmentActivity.intensityLevel}`,
        `Mức độ tác động: ${activity.entertainmentActivity.impactLevel}`,
      ];
    } else if (activity.therapeuticActivity) {
      title = `Trị liệu: ${activity.therapeuticActivity.name}`;
      description = activity.therapeuticActivity.description;
      color = "orange";
      benefits = [
        `Cường độ: ${activity.therapeuticActivity.intensityLevel}`,
        `Mức độ tác động: ${activity.therapeuticActivity.impactLevel}`,
        `Hướng dẫn: ${activity.therapeuticActivity.instructions}`,
      ];
    }

    const timeString =
      time.getHours().toString().padStart(2, "0") +
      ":" +
      time.getMinutes().toString().padStart(2, "0");

    // Calculate end time based on duration
    const endTime = new Date(time);
    const durationMinutes = parseInt(activity.duration?.split(" ")[0] || "30");
    endTime.setMinutes(endTime.getMinutes() + durationMinutes);

    const endTimeString =
      endTime.getHours().toString().padStart(2, "0") +
      ":" +
      endTime.getMinutes().toString().padStart(2, "0");

    return {
      id: `${sessionId}-${time.getTime()}`,
      time: timeString,
      title: title,
      duration: `${timeString} - ${endTimeString}`,
      color: color,
      description: description,
      benefits: benefits,
      status: activity.status,
    };
  };

  // Get default stress reduction activities
  const getDefaultActivities = (date) => {
    const dateKey = formatDateKey(date);

    return [
      {
        id: `default-${dateKey}-1`,
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
        status: "Pending",
      },
      {
        id: `default-${dateKey}-2`,
        time: "12:30",
        title: "Tư vấn tâm lý",
        duration: "12:30 - 13:30",
        color: "orange",
        description:
          "Buổi tư vấn tâm lý với chuyên gia để đánh giá tiến triển và điều chỉnh lộ trình điều trị.",
        benefits: ["Giảm lo âu", "Cải thiện tâm trạng", "Học kỹ năng đối phó"],
        status: "Pending",
      },
      {
        id: `default-${dateKey}-3`,
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
        status: "Pending",
      },
    ];
  };

  // Toggle task completion status
  const toggleTaskStatus = (taskId) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));
  };

  // Check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format day name - MODIFIED to start with Monday
  const formatDayName = (date) => {
    // Reordered array to make Monday the first day
    const days = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ nhật",
    ];
    // Get day index (0-6), where 0 is Monday, 6 is Sunday
    const dayIndex = (date.getDay() + 6) % 7;
    return days[dayIndex];
  };

  // Get month name
  const getMonthName = (date) => {
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

  // Generate dates for TWO weeks (14 days) navigation - MODIFIED to start with Monday
  // Update the generateTwoWeekDates function to start from the first session date
  const generateTwoWeekDates = () => {
    // Find the earliest session date from the API
    let startDate;

    if (sessions && sessions.length > 0) {
      // Sort sessions by startDate to find the earliest one
      const sortedSessions = [...sessions].sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });

      startDate = new Date(sortedSessions[0].startDate);
    } else {
      // If no sessions available, use the current date
      startDate = new Date();
    }

    // Generate 14 days starting from the first session date
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
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

  // Calculate progress percentage
  const calculateProgress = () => {
    if (activities.length === 0) return 0;

    const completedTasks = activities.filter(
      (task) => taskStatus[task.id]
    ).length;

    return Math.round((completedTasks / activities.length) * 100);
  };

  // Using the new two week dates function
  const twoWeekDates = generateTwoWeekDates();

  return (
    <div className="max-w-full bg-gray-50 p-4">
      {/* Date navigation */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Lịch hoạt động</h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {twoWeekDates.map((date) => (
              <button
                key={formatDateKey(date)}
                className={`flex flex-col items-center p-3 min-w-16 rounded-lg ${
                  formatDateKey(date) === formatDateKey(selectedDate)
                    ? "bg-purple-600 text-white"
                    : "bg-white border"
                } ${
                  isToday(date) &&
                  formatDateKey(date) !== formatDateKey(selectedDate)
                    ? "border-purple-500"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedDate(date)}>
                <span className="text-xs font-medium">
                  {formatDayName(date)}
                </span>
                <span className="text-lg font-bold">{date.getDate()}</span>
                <span className="text-xs">{getMonthName(date)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current date display */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              {formatDayName(selectedDate)}, {selectedDate.getDate()}{" "}
              {getMonthName(selectedDate)}
            </h3>
            {isToday(selectedDate) && (
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Hôm nay
              </span>
            )}
          </div>
          <button
            className="text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
            onClick={() => setSelectedDate(new Date())}>
            Hôm nay
          </button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">Tiến độ hôm nay</h3>
          <span className="text-sm text-gray-500">
            {activities.filter((task) => taskStatus[task.id]).length}/
            {activities.length} hoạt động
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${calculateProgress()}%` }}></div>
        </div>
      </div>

      {/* Activities list */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">Hoạt động trong ngày</h3>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Đang tải...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              Không có hoạt động nào được lên lịch cho ngày này
            </p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Thêm hoạt động mới
            </button>
          </div>
        ) : (
          activities
            .sort((a, b) => {
              const timeA = a.time.split(":").map(Number);
              const timeB = b.time.split(":").map(Number);
              return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
            })
            .map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="mr-4">
                    <input
                      type="checkbox"
                      checked={taskStatus[activity.id] || false}
                      onChange={() => toggleTaskStatus(activity.id)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{activity.title}</h4>
                        <p className="text-sm text-gray-500">
                          {activity.duration}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            activity.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : activity.status === "Missed"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {activity.status === "Completed"
                            ? "Hoàn thành"
                            : activity.status === "Missed"
                            ? "Bỏ lỡ"
                            : "Đang chờ"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                  <button
                    className="text-purple-600 text-sm font-medium"
                    onClick={() => showTaskDetails(activity)}>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Task Detail Modal */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{selectedTask.title}</h3>
                <button
                  onClick={closeTaskDetail}
                  className="text-gray-400 hover:text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500">Thời gian:</p>
                <p className="font-medium">{selectedTask.duration}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Mô tả:</p>
                <p className="text-gray-700">{selectedTask.description}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Lợi ích:</p>
                <ul className="list-disc list-inside">
                  {selectedTask.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Trạng thái:</p>
                <div className="flex items-center mt-1">
                  <input
                    type="checkbox"
                    checked={taskStatus[selectedTask.id] || false}
                    onChange={() => toggleTaskStatus(selectedTask.id)}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 mr-2"
                  />
                  <span>Đánh dấu là hoàn thành</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeTaskDetail}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2 hover:bg-gray-300">
                Đóng
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyPlanner;
