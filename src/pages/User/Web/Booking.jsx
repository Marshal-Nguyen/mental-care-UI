import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Web/Loader";
import { ArrowLeft } from "lucide-react"; // Nếu dùng icon từ thư viện
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Booking() {
    const navigate = useNavigate();
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Hiển thị danh sách thời gian
    const [isDateListOpen, setIsDateListOpen] = useState(false);
    const toggleDateList = () => setIsDateListOpen(!isDateListOpen);
    //
    const today = new Date();
    // Lấy tháng + năm hiện tại
    const [currentMonth, setCurrentMonth] = useState(today.toLocaleString("en-US", { month: "long", year: "numeric" }));
    const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth()); // Tháng từ 0 - 11
    const [selectedDate, setSelectedDate] = useState(today);
    const [availableSlots, setAvailableSlots] = useState([]);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Lấy số ngày trong tháng hiện tại
    const getDaysInMonth = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay(); // Thứ của ngày 1 (0 = CN, 6 = Thứ 7)
        const totalDays = new Date(year, month + 1, 0).getDate(); // Số ngày trong tháng

        return [
            ...Array(firstDay).fill(null), // Thêm các ô trống cho đến ngày 1
            ...Array.from({ length: totalDays }, (_, i) => i + 1) // Thêm ngày trong tháng
        ];
    };

    const daysInMonth = getDaysInMonth(today.getFullYear(), currentMonthIndex);



    // Khi chọn ngày -> cập nhật state
    const handleDateClick = (day) => {
        const newDate = new Date(today.getFullYear(), currentMonthIndex, day);
        console.log("Ngày đã chọn:", day, newDate);
        setSelectedDate(newDate);
    };

    // Chuyển đổi tháng
    const changeMonth = (step) => {
        const newMonth = currentMonthIndex + step;
        const newDate = new Date(today.getFullYear(), newMonth, 1);
        setCurrentMonthIndex(newMonth);
        setCurrentMonth(newDate.toLocaleString("en-US", { month: "long", year: "numeric" }));
    };

    // Gọi API khi thay đổi `selectedDate`
    useEffect(() => {
        if (!selectedDate) return;

        const fetchSchedule = async () => {
            try {
                const formattedDate = selectedDate.toLocaleDateString('sv-SE');
                console.log("Ngày đã chọn:", formattedDate);
                const response = await axios.get(
                    `https://psychologysupportscheduling-g0efgxc5bwhbhjgc.southeastasia-01.azurewebsites.net/doctor-schedule/${doctorId}/${formattedDate}`
                );
                setAvailableSlots(response.data.timeSlots || []);
            } catch (error) {
                console.error("Lỗi lấy lịch trình:", error);
            }
        };

        fetchSchedule();
    }, [selectedDate]);

    useEffect(() => {
        axios.get(`https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors/${doctorId}`)
            .then((response) => {
                setDoctor(response.data.doctorProfileDto);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu bác sĩ:", error);
                setError("Không thể tải thông tin bác sĩ.");
                setLoading(false);
            });
    }, [doctorId]);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="max-w-6xl w-full bg-white rounded-xl shadow-lg p-6">
                {/* Nút Back */}
                <button
                    onClick={() => navigate("/HomeUser/counselor")}
                    className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={20} className="mr-2" />Back
                </button>

                {/* Thanh ngang trên */}
                {doctor && (
                    <div className="flex items-center justify-between border-b pb-4 mb-6">
                        <div className="flex items-center gap-6">
                            <div>
                                <img
                                    src={doctor.image || "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg"}
                                    alt={doctor.fullName}
                                    className="w-20 h-20 rounded-full border"
                                />
                                <p className="text-lg font-bold text-yellow-500 pl-1">⭐ {doctor.rating || "N/A"}</p>

                            </div>


                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{doctor.fullName}</h3>
                                <p className="text-sm text-gray-600">{doctor.specialties?.map((spec) => spec.name).join(", ") || "Không có chuyên khoa"}</p>
                                <p className="text-sm text-blue-500">📞 {doctor.contactInfo?.phoneNumber || "Không có số điện thoại"}</p>
                                <p className="text-sm text-blue-500">📧 {doctor.contactInfo?.email || "Không có email"}</p>
                            </div>
                        </div>
                        {/* <div className="text-right">
                            <p className="text-lg font-bold text-yellow-500">⭐ {doctor.rating || "N/A"}</p>
                        </div> */}
                    </div>
                )}

                {/* Nội dung chia thành 2 phần */}
                <div className="flex gap-7">
                    {/* 2/3 hiển thị thông tin bác sĩ */}
                    <div className="w-4/7 bg-gray-50 p-6 rounded-lg shadow-md border">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin bác sĩ</h3>
                        <p className="text-sm text-gray-700"><strong>Địa chỉ:</strong> {doctor.contactInfo?.address || "Không có địa chỉ"}</p>
                        <p className="text-sm text-gray-700"><strong>Giới tính:</strong> {doctor.gender || "Không có thông tin"}</p>
                        <p className="text-sm text-gray-700"><strong>Bằng cấp:</strong> {doctor.qualifications || "Không có thông tin"}</p>
                        <p className="text-sm text-gray-700"><strong>Kinh nghiệm:</strong> {doctor.yearsOfExperience || "Không có thông tin"} năm</p>
                        <p className="text-sm text-gray-700"><strong>Tiểu sử:</strong> {doctor.bio || "Không có thông tin"}</p>
                    </div>

                    {/* 1/3 đặt lịch */}
                    <div className=" w-3/7 p-2 w-80 rounded-2xl shadow-lg border border-purple-300">
                        <div className="px-4 py-1 bg-gradient-to-b from-white to-pink-100 rounded-2xl shadow-lg">
                            {/* Header Calendar */}
                            <div className="flex justify-between items-center font-semibold">
                                <h3 className="text-lg">Calendar</h3>
                                <button className="text-sm flex items-center gap-1" onClick={toggleDateList}>
                                    {selectedDate.toLocaleDateString()} {/* Hiển thị ngày đang chọn */}
                                    {isDateListOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            </div>
                            {isDateListOpen && (
                                <div>
                                    {/* Chọn tháng */}
                                    < div className="flex justify-between items-center mt-4">
                                        <button className="p-2 rounded-full bg-purple-200" onClick={() => changeMonth(-1)}>
                                            <FaChevronLeft className="text-purple-600" />
                                        </button>
                                        <h4 className=" font-medium text-lg">{currentMonth}</h4>
                                        <button className="p-2 rounded-full bg-purple-200" onClick={() => changeMonth(1)}>
                                            <FaChevronRight className="text-purple-600" />
                                        </button>
                                    </div>
                                    {/* Ngày trong tuần */}
                                    <div className="grid grid-cols-7 text-sm  mt-4">
                                        {daysOfWeek.map((day, idx) => (
                                            <span key={idx} className="text-center font-medium">{day}</span>
                                        ))}
                                    </div>
                                    {/* Lịch ngày */}
                                    <div className="grid grid-cols-7 text-sm mt-4">
                                        {daysInMonth.map((day, idx) => {
                                            if (!day) return <div key={idx}></div>; // Không hiển thị nếu null

                                            const currentDate = new Date(today.getFullYear(), currentMonthIndex, day);
                                            const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                                            const isPastDate = currentDate < todayDate; // So sánh chỉ ngày, tháng, năm

                                            return (
                                                <div
                                                    key={idx}
                                                    className={`relative flex justify-center items-center w-10 h-10 rounded-full 
                ${isPastDate ? "text-gray-400 cursor-not-allowed" : "cursor-pointer hover:bg-pink-200"} 
                ${selectedDate.getDate() === day && selectedDate.getMonth() === currentMonthIndex ? "bg-red-300" : ""}`}
                                                    onClick={() => !isPastDate && handleDateClick(day)} // Chỉ chọn ngày hợp lệ
                                                >
                                                    {day}
                                                </div>
                                            );
                                        })}
                                    </div>


                                </div>
                            )}


                        </div>

                        {/* Chọn thời gian */}
                        <div className="p-2, pt-6">
                            <h4 className=" font-medium text-md">Chọn thời gian</h4>
                            <div className="grid grid-cols-2 gap-3 mt-3">
                                {availableSlots.length > 0 ? (
                                    availableSlots.map((slot, i) => (
                                        <button
                                            key={i}
                                            className={`p-3 border rounded-xl shadow-md w-full
                                                  ${slot.status === "Available"
                                                    ? "bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            disabled={slot.status !== "Available"}
                                        >
                                            {`${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Không có lịch trống</p>
                                )}


                            </div>
                        </div>

                        {/* Giá tiền */}
                        <div className="mt-6 text-center">
                            <p className="text-xl font-semibold text-green-600">💰 200.000 đ</p>
                        </div>

                        {/* Nút đặt lịch */}
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl mt-6 font-medium shadow-md">
                            Tiếp tục đặt lịch
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}
