import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarIcon, Clock, ArrowLeft, Users } from "lucide-react";

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

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

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
  };

  // Lấy lịch đã đặt khi thay đổi ngày
  useEffect(() => {
    if (!selectedDate || !doctorId) return;

    const fetchSchedule = async () => {
      setIsLoading(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        const response = await axios.get(
          `https://psychologysupportscheduling-g0efgxc5bwhbhjgc.southeastasia-01.azurewebsites.net/doctor-schedule/${doctorId}/${formattedDate}`
        );
        setScheduledSlots(response.data.timeSlots || []);
      } catch (error) {
        console.error("Lỗi khi lấy lịch trình:", error);
        setScheduledSlots([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
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
          View your scheduled appointments
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

            return (
              <div
                key={idx}
                className={`flex justify-center items-center h-10 rounded-full
                  cursor-pointer hover:bg-purple-100 transition-colors duration-200
                  ${
                    isSelectedDate ? "bg-purple-600 text-white font-medium" : ""
                  }
                  ${
                    isTodayDate && !isSelectedDate
                      ? "border border-purple-500 font-medium"
                      : ""
                  }
                `}
                onClick={() => handleDateClick(day)}>
                {day}
              </div>
            );
          })}
        </div>

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
              {scheduledSlots.map((slot, i) => (
                <div
                  key={i}
                  className={`p-3 border rounded-lg flex justify-between items-center
                    ${
                      slot.status === "Booked"
                        ? "bg-red-50 border-red-200"
                        : "bg-green-50 border-green-200"
                    }
                  `}>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-600" />
                    <span className="font-medium">
                      {`${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(
                        0,
                        5
                      )}`}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      slot.status === "Booked"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }
                  `}>
                    {slot.status}
                  </span>
                </div>
              ))}
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

        {/* Thống kê */}
        <div className="mt-6 bg-purple-50 rounded-lg p-4 space-y-3">
          <h4 className="font-medium text-purple-800">Schedule Summary</h4>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">Booked appointments:</span>
            <span className="font-bold text-red-600">
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
            <span className="text-gray-700">Total time slots:</span>
            <span className="font-bold text-purple-800">
              {scheduledSlots.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
