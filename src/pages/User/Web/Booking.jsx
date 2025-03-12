import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Web/Loader";
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
} from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    today.toLocaleString("en-US", { month: "long", year: "numeric" })
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Dữ liệu mẫu cho bác sĩ
  const sampleDoctor = {
    fullName: "TS. Nguyễn Minh Tâm",
    image:
      "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg",
    rating: 4.9,
    specialties: [
      { name: "Tâm lý học lâm sàng" },
      { name: "Trị liệu gia đình" },
    ],
    contactInfo: {
      phoneNumber: "090 123 4567",
      email: "minhtam@psychology.vn",
      address: "Tòa nhà Sunrise, 23 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    },
    gender: "Nam",
    qualifications:
      "Tiến sĩ Tâm lý học (ĐH Stanford), Chứng chỉ Trị liệu Nhận thức Hành vi (CBT), Chứng chỉ Trị liệu Gia đình Hệ thống",
    yearsOfExperience: 12,
    bio: "TS. Nguyễn Minh Tâm có hơn 12 năm kinh nghiệm trong lĩnh vực tâm lý học lâm sàng và tư vấn gia đình. Ông từng làm việc tại Trung tâm Sức khỏe Tâm thần Harvard và hiện là giảng viên tại Đại học Y Dược TP.HCM. Ông chuyên điều trị các vấn đề lo âu, trầm cảm, sang chấn tâm lý và xung đột gia đình. Với phương pháp tiếp cận dựa trên bằng chứng và cá nhân hóa, ông đã giúp hàng nghìn cá nhân và gia đình vượt qua khủng hoảng tâm lý.",
    patientCount: 1250,
    reviewCount: 342,
    reviewsHighlights: [
      {
        name: "Nguyễn Văn A",
        rating: 5,
        comment: "Bác sĩ rất tận tâm và chuyên nghiệp",
      },
      {
        name: "Trần Thị B",
        rating: 5,
        comment: "Tôi đã cảm thấy tốt hơn rất nhiều sau liệu trình",
      },
    ],
  };

  // Dữ liệu mẫu cho time slots
  const sampleTimeSlots = [
    { startTime: "08:00", endTime: "09:00", status: "Available" },
    { startTime: "09:00", endTime: "10:00", status: "Available" },
    { startTime: "10:00", endTime: "11:00", status: "Booked" },
    { startTime: "13:00", endTime: "14:00", status: "Available" },
    { startTime: "14:00", endTime: "15:00", status: "Available" },
    { startTime: "15:00", endTime: "16:00", status: "Booked" },
    { startTime: "16:00", endTime: "17:00", status: "Available" },
    { startTime: "17:00", endTime: "18:00", status: "Available" },
  ];

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
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        // Trong môi trường thực tế, dùng API call
        // const response = await axios.get(
        //   `https://psychologysupportscheduling-g0efgxc5bwhbhjgc.southeastasia-01.azurewebsites.net/doctor-schedule/${doctorId}/${formattedDate}`
        // );
        // setAvailableSlots(response.data.timeSlots || []);

        // Đối với demo, sử dụng dữ liệu mẫu
        setTimeout(() => {
          setAvailableSlots(sampleTimeSlots);
        }, 300);
      } catch (error) {
        console.error("Lỗi lấy lịch trình:", error);
        setAvailableSlots([]);
      }
    };

    fetchSchedule();
  }, [selectedDate, doctorId]);

  // Lấy thông tin bác sĩ
  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        // Trong môi trường thực tế, dùng API call
        // const response = await axios.get(
        //   `https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors/${doctorId}`
        // );
        // setDoctor(response.data.doctorProfileDto);

        // Đối với demo, sử dụng dữ liệu mẫu
        setTimeout(() => {
          setDoctor(sampleDoctor);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
        setError("Không thể tải thông tin bác sĩ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchDoctorInfo();
  }, [doctorId]);

  // Xử lý khi ấn nút tiếp tục đặt lịch
  const handleBookingContinue = () => {
    if (!selectedTimeSlot) {
      alert("Vui lòng chọn thời gian cho buổi tư vấn");
      return;
    }

    // Tạo object chứa thông tin đặt lịch
    const bookingInfo = {
      doctorId,
      doctorName: doctor?.fullName,
      date: selectedDate.toISOString().split("T")[0],
      timeSlot: selectedTimeSlot,
    };

    // Lưu thông tin đặt lịch vào localStorage hoặc state management solution
    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));

    // Chuyển hướng đến trang xác nhận đặt lịch
    navigate("/HomeUser/booking-confirm");
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate("/HomeUser/counselor")}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Quay lại trang danh sách bác sĩ
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col items-center">
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        {/* Header với nút Back */}
        <button
          onClick={() => navigate("/HomeUser/counselor")}
          className="flex items-center text-purple-700 hover:text-purple-900 mb-6 transition-colors duration-200">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Quay lại danh sách bác sĩ</span>
        </button>

        {/* Thông tin bác sĩ */}
        {doctor && (
          <div className="flex items-center justify-between border-b border-purple-100 pb-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-200 shadow-md transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
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
                <p className="font-bold text-gray-800">
                  {doctor.patientCount}+
                </p>
                <p className="text-xs text-gray-500">Bệnh nhân</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center bg-purple-100 w-12 h-12 rounded-full mx-auto mb-2">
                  <Star size={20} className="text-purple-600" />
                </div>
                <p className="font-bold text-gray-800">{doctor.reviewCount}</p>
                <p className="text-xs text-gray-500">Đánh giá</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center bg-purple-100 w-12 h-12 rounded-full mx-auto mb-2">
                  <Heart size={20} className="text-purple-600" />
                </div>
                <p className="font-bold text-gray-800">
                  {doctor.yearsOfExperience}
                </p>
                <p className="text-xs text-gray-500">Năm KN</p>
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
              Thông tin chi tiết
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">Địa chỉ làm việc</p>
                  <p className="text-gray-600">{doctor.contactInfo?.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Award
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">
                    Bằng cấp & Chứng chỉ
                  </p>
                  <p className="text-gray-600">{doctor.qualifications}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase
                  className="text-purple-600 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <div>
                  <p className="font-medium text-gray-700">
                    Kinh nghiệm làm việc
                  </p>
                  <p className="text-gray-600">
                    {doctor.yearsOfExperience} năm kinh nghiệm
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-100">
                <p className="font-medium text-gray-700 mb-2">Giới thiệu</p>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Đánh giá nổi bật */}
              <div className="mt-6 pt-4 border-t border-purple-100">
                <p className="font-medium text-gray-700 mb-4">
                  Đánh giá nổi bật
                </p>

                <div className="space-y-4">
                  {doctor.reviewsHighlights?.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">{review.name}</p>
                        <div className="flex items-center">
                          {Array(review.rating)
                            .fill()
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="text-yellow-400 fill-current"
                              />
                            ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Phần đặt lịch - FIXED HEIGHT để tránh vỡ layout */}
          <div className="md:w-2/5 flex flex-col bg-white rounded-2xl shadow-lg border border-purple-200 overflow-hidden h-full max-h-screen sticky top-6">
            {/* Header lịch */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-4">
              <h3 className="text-xl font-bold flex items-center">
                <CalendarIcon size={20} className="mr-2" />
                Đặt lịch tư vấn
              </h3>
              <p className="text-purple-100 text-sm mt-1">
                Chọn ngày và giờ phù hợp với bạn
              </p>
            </div>

            {/* Calendar Container với fixed height và scroll */}
            <div
              className="p-4 bg-white overflow-y-auto flex-grow"
              style={{ maxHeight: "calc(100vh - 250px)" }}>
              {/* Chọn tháng */}
              <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2">
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
                <h4 className="font-medium text-purple-800 flex items-center mb-3 sticky top-16 bg-white z-10 pb-2">
                  <Clock size={18} className="mr-2" />
                  Chọn thời gian ({selectedDate.toLocaleDateString()})
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
                        {`${slot.startTime} - ${slot.endTime}`}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-700">
                      Không có lịch trống cho ngày này
                    </p>
                    <p className="text-sm text-yellow-600 mt-1">
                      Vui lòng chọn ngày khác
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer cho phần đặt lịch - sticky */}
            <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 shadow-inner">
              {/* Giá tiền */}
              <div className="mb-4 bg-purple-50 rounded-lg p-4 flex justify-between items-center">
                <span className="text-gray-700 font-medium">Phí tư vấn:</span>
                <span className="text-xl font-bold text-purple-800">
                  200.000 đ
                </span>
              </div>

              {/* Nút đặt lịch */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-white shadow-md transition-all duration-300 
                  ${
                    selectedTimeSlot
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 hover:shadow-lg"
                      : "bg-gray-400"
                  }`}
                onClick={handleBookingContinue}
                disabled={!selectedTimeSlot}>
                {selectedTimeSlot
                  ? "Tiếp tục đặt lịch"
                  : "Vui lòng chọn thời gian"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
