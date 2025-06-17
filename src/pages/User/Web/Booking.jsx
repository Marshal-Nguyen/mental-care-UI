import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  Briefcase,
  Info,
  Heart,
  Users,
  Star,
  BadgeInfo,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export default function Booking() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDateListOpen, setIsDateListOpen] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [promoCode, setPromoCode] = useState("");
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toLocaleString("en-US", { month: "long", year: "numeric" })
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [availableSlots, setAvailableSlots] = useState([]);

  const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const profileId = useSelector((state) => state.auth.profileId);
  const API_SCHEDULING_SERVICE = import.meta.env.VITE_API_SCHEDULE_URL;
  const API_PROFILE_SERVICE = import.meta.env.VITE_API_PROFILE_URL;
  // Hàm lấy số ngày trong tháng (cải tiến)
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
    setSelectedTimeSlot(null); // Reset time slot khi chọn ngày mới
  };
  // Xử lý khi chọn time slot
  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
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
  // Lấy lịch trống khi thay đổi ngày
  useEffect(() => {
    if (!selectedDate) return;

    const fetchSchedule = async () => {
      try {
        const formattedDate = selectedDate
          .toLocaleDateString("en-CA")
          .split("T")[0]; // Format: YYYY-MM-DD
        const response = await axios.get(
          `${API_SCHEDULING_SERVICE}/doctor-schedule/${doctorId}/${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAvailableSlots(response.data.timeSlots || []);
      } catch (error) {
        console.error("Lỗi lấy lịch trình:", error);
        setAvailableSlots([]);
      }
    };

    fetchSchedule();
  }, [selectedDate, doctorId]);
  // Tính toán thời gian trong phút
  const calculateDurationInMinutes = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    return endTotalMinutes - startTotalMinutes;
  };
  // Lấy thông tin bác sĩ
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        const response = await axios.get(
          `${API_PROFILE_SERVICE}/doctors/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDoctor(response.data.doctorProfileDto);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
        setError("Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);

  // Xử lý khi ấn nút tiếp tục đặt lịch
  const handleBookingContinue = async () => {
    // Check if user is logged in by verifying token existence in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Show toast notification for unauthenticated user
      toast.error("Please log in to book a consultation");
      return;
    }

    if (!selectedTimeSlot) {
      alert("Please select a time for the consultation");
      return;
    }

    try {
      // Extract the start time from the selected time slot
      const startTime = selectedTimeSlot.startTime || selectedTimeSlot;
      const duration = calculateDurationInMinutes(
        selectedTimeSlot.startTime,
        selectedTimeSlot.endTime
      );
      // Create the booking data object according to the required format
      const bookingData = {
        bookingDto: {
          doctorId: doctorId,
          patientId: profileId, // Using the value from the image
          date: selectedDate.toLocaleDateString("en-CA").split("T")[0], // Format: YYYY-MM-DD
          startTime: startTime,
          duration: duration, // Default to 60 if not available
          price: 200000,
          promoCode: promoCode.trim() || null,
          giftCodeId: null, // As specified, set to null
          paymentMethod: "PayOS", // Using the payment method from the image
        },
        returnUrl: "/payments/callback",
        // returnUrl: "https://emo-rouge.vercel.app/payments/callback",
      };

      // Make API call to create the booking
      console.log("bookingData", JSON.stringify(bookingData, null, 2));
      const response = await axios.post(
        `${API_SCHEDULING_SERVICE}/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      toast.error(
        error.response?.data?.message ||
          "Đã xảy ra lỗi khi đặt lịch. Vui lòng thử lại sau."
      );
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate("/EMO/counselor")}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Quay lại trang danh sách bác sĩ
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen w-full flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        {/* Header với nút Back */}
        <button
          onClick={() => navigate("/EMO/counselor")}
          className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back to list of doctors</span>
        </button>

        {/* Thông tin bác sĩ */}
        {doctor && (
          <div className="flex items-center justify-between border-b border-purple-100 pb-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={
                    doctor.image ||
                    "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg"
                  }
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-200 shadow-md transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 bg-[#fa8a95] text-gray-800 px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                  <span className="mr-1">⭐</span>
                  {doctor.rating}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {doctor.fullName}
                </h3>
                <p className="text-md text-purple-600 font-medium mb-2">
                  {doctor.specialties?.map((spec) => spec.name).join(", ")}
                </p>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2 text-purple-500" />
                    <span>{doctor.contactInfo?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2 text-purple-500" />
                    <span>{doctor.contactInfo?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex space-x-6">
              <div className="text-center">
                <div className="flex items-center justify-center bg-purple-100 w-12 h-12 rounded-full mx-auto mb-2">
                  <Users size={20} className="text-purple-600" />
                </div>
                <p className="font-bold text-gray-800">132+</p>
                <p className="text-xs text-gray-500">Patients</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center bg-purple-100 w-12 h-12 rounded-full mx-auto mb-2">
                  <Star size={20} className="text-purple-600" />
                </div>
                <p className="font-bold text-gray-800">324</p>
                <p className="text-xs text-gray-500">Evaluate</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center bg-purple-100 w-12 h-12 rounded-full mx-auto mb-2">
                  <Heart size={20} className="text-purple-600" />
                </div>
                <p className="font-bold text-gray-800">
                  {doctor.yearsOfExperience}
                </p>
                <p className="text-xs text-gray-500">YOE</p>
              </div>
            </div>
          </div>
        )}

        {/* Nội dung chính */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Thông tin chi tiết bác sĩ */}
          <div className="md:w-3/5 bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-md border border-purple-100">
            <h3 className="text-xl font-semibold text-purple-800 mb-6 pb-2 border-b border-purple-100 flex items-center">
              <Info size={20} className="mr-2" />
              Details
            </h3>

            <div className="space-y-4">
              <div className="flex items-start ml-10">
                <MapPin
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">Work Address</p>
                  <p className="text-gray-600">
                    {doctor.contactInfo?.address || "Chưa cập nhật địa chỉ"}
                  </p>
                </div>
              </div>

              <div className="flex items-start ml-10">
                <Award
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">
                    Degrees & Certificates
                  </p>
                  <p className="text-gray-600">
                    {doctor.qualifications || "Chưa cập nhật thông tin"}
                  </p>
                </div>
              </div>

              <div className="flex items-start ml-10">
                <Briefcase
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">
                    Years of Experience
                  </p>
                  <p className="text-gray-600">
                    {doctor.yearsOfExperience
                      ? `${doctor.yearsOfExperience} năm kinh nghiệm`
                      : "Chưa cập nhật thông tin"}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-100">
                <p className="text-xl font-semibold text-purple-800 mb-6 pb-2 border-b border-purple-100 flex items-center">
                  <BadgeInfo size={20} className="mr-2" /> Introduce
                </p>
                <div className="ml-10">
                  <p className="text-gray-600 leading-relaxed italic">
                    <span className="ml-8 font-medium">{doctor.fullName}</span>{" "}
                    has over{" "}
                    <span className="font-medium">
                      {doctor.yearsOfExperience}
                    </span>{" "}
                    years of experience in{" "}
                    {doctor.specialties?.map((spec) => spec.name).join(", ")}.
                  </p>

                  <p className="text-gray-600 leading-relaxed mt-2 italic">
                    <span className="ml-8"></span> He is currently working at{" "}
                    <span className="font-medium">
                      {doctor.contactInfo?.address || "Address not updated"}
                    </span>{" "}
                    and serves as a lecturer at the University of Medicine and
                    Pharmacy in Ho Chi Minh City.
                  </p>

                  <p className="text-gray-600 leading-relaxed mt-2 italic">
                    <span className="ml-8"></span> Specializing in the treatment
                    of anxiety, depression, psychological trauma, and family
                    conflicts, {doctor.fullName} is dedicated to providing
                    evidence-based and personalized care.
                  </p>

                  <p className="text-gray-600 leading-relaxed mt-2 italic">
                    <span className="ml-8"></span> Over the years, he has helped
                    thousands of individuals and families overcome psychological
                    challenges.
                  </p>

                  <p className="text-gray-600 leading-relaxed mt-2 italic">
                    <span className="ml-8"></span>
                    {doctor.bio || "Biography not updated."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phần đặt lịch */}
          <div className="md:w-2/5 flex flex-col bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden h-full max-h-screen sticky top-6">
            {/* Header lịch */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-4">
              <h3 className="text-xl font-bold flex items-center">
                <CalendarIcon size={20} className="mr-2" />
                Schedule a consultation
              </h3>
              <p className="text-purple-100 text-sm mt-1">
                Choose a date and time that suits you
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

                  const currentDate = new Date(
                    currentYear,
                    currentMonthIndex,
                    day
                  );
                  const todayDate = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                  );
                  const isPastDate = currentDate < todayDate;
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
                        ${
                          isPastDate
                            ? "text-gray-400 cursor-not-allowed"
                            : "cursor-pointer hover:bg-purple-100 transition-colors duration-200"
                        }
                        ${
                          isSelectedDate
                            ? "bg-purple-600 text-white font-medium"
                            : ""
                        }
                        ${
                          isTodayDate && !isSelectedDate
                            ? "border border-purple-500 font-medium"
                            : ""
                        }
                      `}
                      onClick={() => !isPastDate && handleDateClick(day)}>
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Chọn thời gian */}
              <div className="mt-4">
                <h4 className="font-medium text-purple-800 flex items-center mb-3">
                  <Clock size={18} className="mr-2" />
                  Choose a time
                </h4>

                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, i) => (
                      <button
                        key={i}
                        className={`p-3 border rounded-xl text-sm font-medium transition-all duration-200
                          ${
                            slot.status === "Available"
                              ? selectedTimeSlot === slot
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        disabled={slot.status !== "Available"}
                        onClick={() =>
                          slot.status === "Available" &&
                          handleTimeSlotClick(slot)
                        }>
                        {`${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(
                          0,
                          5
                        )}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-700">
                      There are no available schedules for this date.
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      Please select another date
                    </p>
                  </div>
                )}
              </div>

              {/* Giá tiền */}
              <div className="mt-6 bg-purple-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Consulting fee:
                </span>
                <span className="text-xl font-bold text-purple-800">
                  200.000 đ
                </span>
              </div>

              {/* Nút đặt lịch */}
              <div className="mt-6">
                <h4 className="font-medium text-purple-800 flex items-center mb-3">
                  <BadgeInfo size={18} className="mr-2" />
                  Promo Code
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full p-3 border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter promo code (if available)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={`w-full py-4 rounded-xl mt-6 font-bold text-white shadow-md transition-all duration-300 
                  ${
                    selectedTimeSlot
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 hover:shadow-lg"
                      : "bg-gray-400"
                  }`}
                onClick={handleBookingContinue}
                disabled={!selectedTimeSlot}>
                {selectedTimeSlot ? "Continue booking" : "Please select a time"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Feedback */}
      <div className="max-w-6xl mt-5 w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <p className="font-medium text-gray-700 mb-4">Featured Reviews</p>

        <div className="space-y-4">
          {/* {doctor.reviewsHighlights?.map((review, index) => ( */}
          <div
            // key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Nguyen Van Giang</p>
              {/* <p className="font-medium">{review.name}</p> */}

              <div className="flex items-center">
                {/* {Array(review.rating)
                            .fill()
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="text-yellow-400 fill-current"
                              />
                            ))} */}
                <Star size={14} className="text-yellow-400 fill-current" />
                <Star size={14} className="text-yellow-400 fill-current" />
                <Star size={14} className="text-yellow-400 fill-current" />
                <Star size={14} className="text-yellow-400 fill-current" />
                <Star size={14} className="text-yellow-400 fill-current" />
              </div>
            </div>
            <p className="text-gray-600 text-sm">Hay</p>
            {/* <p className="text-gray-600 text-sm">{review.comment}</p> */}
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}
