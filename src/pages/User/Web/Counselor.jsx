import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Giả định Loader component
const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const DoctorList = () => {
  const navigate = useNavigate();
  const isFetched = useRef(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");

  // Refs for specialty scrolling
  const specialtyScrollRef = useRef(null);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors",
          {
            params: {
              PageIndex: 1,
              PageSize: 10,
              SortBy: "Rating",
              SortOrder: "desc",
            },
          }
        );
        setDoctors(response.data.doctorProfiles.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Thực tế cần fetch lại dữ liệu với tham số sort mới
  };

  // Hàm scroll cho thanh specialty
  const scrollSpecialties = (direction) => {
    if (specialtyScrollRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      specialtyScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Improved specialty rendering component with horizontal scroll
  const SpecialtyScroller = ({ specialties = [] }) => {
    if (!specialties || specialties.length === 0) {
      return (
        <div className="h-8 flex items-center justify-center">
          <span className="text-xs text-gray-500">Không có chuyên khoa</span>
        </div>
      );
    }

    return (
      <div className="relative group">
        <div
          ref={specialtyScrollRef}
          className="flex overflow-x-auto pb-2 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex space-x-1 px-1">
            {specialties.map((spec, idx) => (
              <span
                key={idx}
                className="text-xs whitespace-nowrap bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full flex-shrink-0">
                {spec.name}
              </span>
            ))}
          </div>
        </div>

        {specialties.length > 2 && (
          <>
            <button
              onClick={() => scrollSpecialties("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left">
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => scrollSpecialties("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right">
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}
      </div>
    );
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <img
            src={
              doctor.image ||
              "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg?w=1920&q=100"
            }
            alt={doctor.fullName}
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="pt-16 pb-6 px-6 flex-1 flex flex-col">
        <div className="flex justify-center items-center mb-2">
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <Star
              className="w-4 h-4 text-yellow-500 mr-1"
              fill="currentColor"
            />
            <span className="text-sm font-semibold">
              {doctor.rating || "N/A"}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-center text-gray-800 mb-1 line-clamp-1">
          {doctor.fullName}
        </h3>

        <div className="mb-3 mt-1 h-8">
          <SpecialtyScroller specialties={doctor.specialties} />
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{doctor.contactInfo.phoneNumber}</span>
          </div>

          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{doctor.contactInfo.email}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 text-blue-500 mt-1 flex-shrink-0" />
            <span className="text-xs line-clamp-2">
              {doctor.contactInfo?.address || "Không có địa chỉ"}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => navigate(`/HomeUser/booking/${doctor.id}`)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center">
            <Calendar className="w-4 h-4 mr-2" />
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </div>
  );

  const DoctorListItem = ({ doctor }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="flex p-4">
        <div className="mr-4 flex-shrink-0">
          <img
            src={
              doctor.image ||
              "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg?w=1920&q=100"
            }
            alt={doctor.fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-100"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-800 truncate">
                {doctor.fullName}
              </h3>
              <div className="w-full max-w-xs my-1">
                <SpecialtyScroller specialties={doctor.specialties} />
              </div>
            </div>

            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full flex-shrink-0 ml-2">
              <Star
                className="w-4 h-4 text-yellow-500 mr-1"
                fill="currentColor"
              />
              <span className="text-sm font-semibold">
                {doctor.rating || "N/A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" />
              <span className="truncate">{doctor.contactInfo.phoneNumber}</span>
            </div>

            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1 text-blue-500 flex-shrink-0" />
              <span className="truncate">{doctor.contactInfo.email}</span>
            </div>

            <div className="flex items-start col-span-2">
              <MapPin className="w-4 h-4 mr-1 text-blue-500 mt-1 flex-shrink-0" />
              <span className="text-xs line-clamp-1">
                {doctor.contactInfo?.address || "Không có địa chỉ"}
              </span>
            </div>
          </div>
        </div>

        <div className="ml-4 flex items-center flex-shrink-0">
          <button
            onClick={() => navigate(`/HomeUser/booking/${doctor.id}`)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition duration-300 whitespace-nowrap">
            Đặt lịch
          </button>
        </div>
      </div>
    </div>
  );

  // Custom filter để hiển thị các chuyên khoa phổ biến với thanh trượt
  const SpecialtyFilter = () => {
    const filterScrollRef = useRef(null);

    const scrollFilter = (direction) => {
      if (filterScrollRef.current) {
        const scrollAmount = direction === "left" ? -150 : 150;
        filterScrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    return (
      <div className="relative mt-4 group">
        <div
          ref={filterScrollRef}
          className="flex overflow-x-auto py-1 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex space-x-2 px-1">
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex-shrink-0">
              Tất cả
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Tâm lý học
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Tư vấn tâm lý
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Sức khỏe tinh thần
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Trị liệu gia đình
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Trầm cảm
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Lo âu
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm flex-shrink-0">
              Rối loạn giấc ngủ
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollFilter("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => scrollFilter("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Đội ngũ bác sĩ chuyên nghiệp
          </h1>
          <p className="text-gray-600">
            Lựa chọn bác sĩ phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilterChange("rating")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === "rating"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Đánh giá cao nhất
                </div>
              </button>

              <button
                onClick={() => handleFilterChange("specialties")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === "specialties"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  Chuyên khoa
                </div>
              </button>
            </div>

            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {selectedFilter === "specialties" && <SpecialtyFilter />}
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.id || index} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {doctors.map((doctor, index) => (
              <DoctorListItem key={doctor.id || index} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
