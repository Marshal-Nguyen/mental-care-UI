import { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarIcon,
  Clock,
  ArrowLeft,
  Users,
  XCircle,
  CheckCircle,
} from "lucide-react";

export default function DoctorScheduleViewer({ doctorId }) {
  console.log("thang bac si", doctorId);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toLocaleString("en-US", { month: "long", year: "numeric" })
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [scheduledSlots, setScheduledSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Kiểm tra xem ngày đã chọn có sau ngày hiện tại 3 ngày không
  const isDateEligibleForUpdate = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const eligibleDate = new Date(currentDate);
    eligibleDate.setDate(currentDate.getDate() + 7);

    return date >= eligibleDate;
  };

  // Hàm lấy số ngày trong tháng
  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: totalDays }, (_, i) => i + 1),
    ];
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);

  // Xử lý khi chọn ngày
  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonthIndex, day);
    setSelectedDate(newDate);
    setSelectedSlots([]);
    setUpdateMessage({ type: "", text: "" });
  };

  // Xử lý khi thay đổi tháng
  const changeMonth = (step) => {
    let newMonth = currentMonthIndex + step;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    setCurrentMonthIndex(newMonth);
    setCurrentYear(newYear);
    setCurrentMonth(
      new Date(newYear, newMonth, 1).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    );
    setSelectedSlots([]);
    setUpdateMessage({ type: "", text: "" });
  };

  // Xử lý khi chọn slot
  const handleSlotSelection = (slot) => {
    if (slot.status !== "Available") return;

    if (!isDateEligibleForUpdate(selectedDate)) {
      setUpdateMessage({
        type: "error",
        text: "Only time slots at least 3 days in the future can be modified.",
      });
      return;
    }

    setSelectedSlots((prev) => {
      const isAlreadySelected = prev.some(
        (s) => s.startTime === slot.startTime
      );
      if (isAlreadySelected) {
        return prev.filter((s) => s.startTime !== slot.startTime);
      } else {
        return [...prev, slot];
      }
    });

    setUpdateMessage({ type: "", text: "" });
  };

  // Gửi yêu cầu cập nhật trạng thái slots
  const updateSlotAvailability = async () => {
    if (selectedSlots.length === 0) {
      setUpdateMessage({
        type: "warning",
        text: "Please select at least one available time slot.",
      });
      return;
    }

    setIsUpdating(true);
    setUpdateMessage({ type: "", text: "" });

    try {
      const formattedDate = selectedDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      const startTimes = selectedSlots.map((slot) => slot.startTime);

      const response = await axios.post(
        "https://psychologysupport-scheduling.azurewebsites.net/doctor-availabilities",
        {
          doctorAvailabilityCreate: {
            doctorId: doctorId,
            date: formattedDate,
            startTimes: startTimes,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setUpdateMessage({
          type: "success",
          text: "Time slots have been successfully updated.",
        });

        // Cập nhật lại danh sách slots
        fetchSchedule(selectedDate);
        setSelectedSlots([]);
      } else {
        setUpdateMessage({
          type: "error",
          text: "Failed to update time slots. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      setUpdateMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "An error occurred while updating time slots.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Lấy lịch đã đặt khi thay đổi ngày
  const fetchSchedule = async (date) => {
    setIsLoading(true);
    try {
      const formattedDate = date.toLocaleDateString("en-CA").split("T")[0]; // Format: YYYY-MM-DD
      const response = await axios.get(
        `https://psychologysupport-scheduling.azurewebsites.net/doctor-schedule/${doctorId}/${formattedDate}`
      );
      setScheduledSlots(response.data.timeSlots || []);
    } catch (error) {
      console.error("Lỗi khi lấy lịch trình:", error);
      setScheduledSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedDate || !doctorId) return;
    fetchSchedule(selectedDate);
  }, [selectedDate, doctorId]);

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden h-full">
      {/* Header lịch */}
      <div className="bg-gradient-to-br from-[#8047db] to-[#c2a6ee] text-white p-4">
        <h3 className="text-xl font-bold flex items-center">
          <CalendarIcon size={20} className="mr-2" />
          Consultation Schedule
        </h3>
        <p className="text-purple-100 text-sm mt-1">
          View and update your appointment availability
        </p>
      </div>

      {/* Calendar */}
      <div className="p-4 bg-white overflow-y-auto">
        {/* Chọn tháng */}
        <div className="flex justify-between items-center mb-4">
          <button
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
            onClick={() => changeMonth(-1)}>
            <ArrowLeft size={18} className="text-purple-600" />
          </button>
          <h4 className="font-medium text-lg text-purple-800">
            {currentMonth}
          </h4>
          <button
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors duration-200"
            onClick={() => changeMonth(1)}>
            <ArrowLeft
              size={18}
              className="text-purple-600 transform rotate-180"
            />
          </button>
        </div>

        {/* Ngày trong tuần */}
        <div className="grid grid-cols-7 text-sm mb-2">
          {daysOfWeek.map((day, idx) => (
            <span
              key={idx}
              className="text-center font-medium text-purple-800 py-2">
              {day}
            </span>
          ))}
        </div>

        {/* Lịch ngày */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysInMonth.map((day, idx) => {
            if (!day) return <div key={idx} className="h-10"></div>;

            const currentDate = new Date(currentYear, currentMonthIndex, day);
            const todayDate = new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            );
            const isSelectedDate =
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonthIndex &&
              selectedDate.getFullYear() === currentYear;
            const isTodayDate =
              currentDate.getDate() === todayDate.getDate() &&
              currentDate.getMonth() === todayDate.getMonth() &&
              currentDate.getFullYear() === todayDate.getFullYear();

            // Kiểm tra xem ngày này có đủ điều kiện để cập nhật không
            const isEligible = isDateEligibleForUpdate(currentDate);

            return (
              <div
                key={idx}
                className={`flex justify-center items-center h-10 rounded-full
                  cursor-pointer transition-colors duration-200
                  ${isEligible ? "hover:bg-purple-100" : "opacity-70"}
                  ${
                    isSelectedDate ? "bg-purple-600 text-white font-medium" : ""
                  }
                  ${
                    isTodayDate && !isSelectedDate
                      ? "border border-purple-500 font-medium"
                      : ""
                  }
                  ${
                    !isEligible && !isSelectedDate && !isTodayDate
                      ? "text-gray-400"
                      : ""
                  }
                `}
                onClick={() => handleDateClick(day)}>
                {day}
              </div>
            );
          })}
        </div>

        {/* Hiển thị thông báo */}
        {updateMessage.text && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              updateMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : updateMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
            {updateMessage.text}
          </div>
        )}

        {/* Hiển thị lịch hẹn */}
        <div className="mt-4">
          <h4 className="font-medium text-purple-800 flex items-center mb-3">
            <Users size={18} className="mr-2" />
            Scheduled Appointments for {selectedDate.toLocaleDateString()}
          </h4>

          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            </div>
          ) : scheduledSlots.length > 0 ? (
            <div className="space-y-2">
              {scheduledSlots.map((slot, i) => {
                const isSelected = selectedSlots.some(
                  (s) => s.startTime === slot.startTime
                );

                return (
                  <div
                    key={i}
                    className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer
                      ${
                        slot.status === "Unavailable"
                          ? "bg-red-50 border-red-200"
                          : slot.status === "Booked"
                          ? "bg-blue-50 border-blue-200"
                          : isSelected
                          ? "bg-purple-100 border-purple-300"
                          : "bg-green-50 border-green-200"
                      }
                    `}
                    onClick={() => handleSlotSelection(slot)}>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-gray-600" />
                      <span className="font-medium">
                        {`${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(
                          0,
                          5
                        )}`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium mr-2
                        ${
                          slot.status === "Unavailable"
                            ? "bg-red-100 text-red-800"
                            : slot.status === "Booked"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      `}>
                        {slot.status}
                      </span>

                      {slot.status === "Available" &&
                        isDateEligibleForUpdate(selectedDate) &&
                        (isSelected ? (
                          <CheckCircle size={18} className="text-purple-600" />
                        ) : (
                          <XCircle size={18} className="text-gray-400" />
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-blue-700">
                No appointments scheduled for this date.
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Select another date to view appointments
              </p>
            </div>
          )}
        </div>

        {/* Nút cập nhật */}
        {isDateEligibleForUpdate(selectedDate) &&
          scheduledSlots.some((slot) => slot.status === "Available") && (
            <div className="mt-4">
              <button
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                onClick={updateSlotAvailability}
                disabled={isUpdating || selectedSlots.length === 0}>
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  `Set ${selectedSlots.length} Selected Slots as Unavailable`
                )}
              </button>
            </div>
          )}

        {/* Thống kê */}
        <div className="mt-6 bg-purple-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-purple-800">Schedule Summary</h4>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Booked appointments:</span>
            <span className="font-bold text-blue-600">
              {scheduledSlots.filter((slot) => slot.status === "Booked").length}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Available slots:</span>
            <span className="font-bold text-green-600">
              {
                scheduledSlots.filter((slot) => slot.status === "Available")
                  .length
              }
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Unavailable slots:</span>
            <span className="font-bold text-red-600">
              {
                scheduledSlots.filter((slot) => slot.status === "Unavailable")
                  .length
              }
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total time slots:</span>
            <span className="font-bold text-purple-800">
              {scheduledSlots.length}
            </span>
          </div>

          {selectedSlots.length > 0 && (
            <div className="flex justify-between items-center pt-2 border-t border-purple-200">
              <span className="text-gray-700">Selected to update:</span>
              <span className="font-bold text-purple-600">
                {selectedSlots.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
