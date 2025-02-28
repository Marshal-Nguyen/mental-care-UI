import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialValue = dayjs("2022-04-17");
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Calender() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  // Giả lập fetch dữ liệu từ server
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    setIsLoading(true);

    setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );
      setHighlightedDays(daysToHighlight);
      setIsLoading(false);
    }, 500);

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // Hủy bỏ yêu cầu khi unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <div className="relative">
      <div className="w-full max-w-sm mx-auto">
        <DatePicker
          selected={initialValue.toDate()}
          onChange={(date) => fetchHighlightedDays(dayjs(date))}
          onMonthChange={handleMonthChange}
          inline
          calendarClassName="border rounded-lg shadow-md"
          dayClassName={(date) => {
            // Thêm lớp CSS đặc biệt cho những ngày được highlight
            if (highlightedDays.includes(date.getDate())) {
              return "bg-blue-500 text-white font-bold"; // Chọn màu khác cho các ngày nổi bật
            }
            return "";
          }}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <span className="text-lg">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Calender;
