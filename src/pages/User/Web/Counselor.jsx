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

const DoctorList = () => {
  const navigate = useNavigate();
  const isFetched = useRef(false);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("rating");
  const [viewMode, setViewMode] = useState("grid");
  // New state for filtering
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // Refs for specialty scrolling
  const specialtyScrollRef = useRef(null);

  const fetchDoctors = async (params = {}) => {
    try {
      setLoading(true);
      const defaultParams = {
        PageIndex: 1,
        PageSize: 10,
        SortBy: "Rating",
        SortOrder: "desc",
      };

      // Merge default params with provided params
      const mergedParams = { ...defaultParams, ...params };

      // Format StartDate and EndDate to match the exact format
      if (startDate && startTime && endDate && endTime) {
        // Create date strings in the format "YYYY-MM-DD HH:mm"
        const formattedStartDate = `${startDate} ${startTime}`;
        const formattedEndDate = `${endDate} ${endTime}`;

        mergedParams.StartDate = formattedStartDate;
        mergedParams.EndDate = formattedEndDate;
      }

      const doctorsResponse = await axios.get(
        "https://psychologysupport-profile.azurewebsites.net/doctors",
        { params: mergedParams }
      );

      setDoctors(doctorsResponse.data.doctorProfiles.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchInitialData = async () => {
      try {
        const specialtiesResponse = await axios.get(
          "https://psychologysupport-profile.azurewebsites.net/specialties",
          {
            params: {
              PageIndex: 1,
              PageSize: 10,
            },
          }
        );

        setSpecialties(specialtiesResponse.data.specialties || []);
        fetchDoctors(); // Initial doctor fetch
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Handle specialty selection
  const handleSpecialtySelect = (specialtyId) => {
    setSelectedSpecialty(specialtyId);
    fetchDoctors({ Specialties: specialtyId });
  };

  // Handle date and time filtering
  const handleDateTimeFilter = () => {
    const params = {};

    // Add specialty to params if selected
    if (selectedSpecialty) {
      params.Specialties = selectedSpecialty;
    }

    fetchDoctors(params);
  };

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
          <span className="text-xs text-gray-500">No specialty</span>
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
            onClick={() => navigate(`/EMO/booking/${doctor.id}`)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center">
            <Calendar className="w-4 h-4 mr-2" />
            Book now
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
            <button
              onClick={() => {
                setSelectedSpecialty("");
                fetchDoctors();
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                !selectedSpecialty
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}>
              Tất cả
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => handleSpecialtySelect(specialty.id)}
                className={`px-3 py-1 rounded-full text-sm flex-shrink-0 ${
                  selectedSpecialty === specialty.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                {specialty.name}
              </button>
            ))}
          </div>
        </div>

        {specialties.length > 6 && (
          <>
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
          </>
        )}
      </div>
    );
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Professional team of doctors
          </h1>
          <p className="text-gray-600">
            Choose the doctor that suits your needs
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
                  Top Rated
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
                  Specialty
                </div>
              </button>
            </div>
          </div>

          {selectedFilter === "specialties" && <SpecialtyFilter />}

          {/* Date and Time Filtering Section */}
          <div className="mt-4 grid grid-cols-4 gap-4 items-end">
            <div className="flex flex-col">
              <label
                htmlFor="start-date"
                className="text-sm font-medium text-gray-700 mb-1.5">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="start-time"
                className="text-sm font-medium text-gray-700 mb-1.5">
                Start Time
              </label>
              <input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="end-date"
                className="text-sm font-medium text-gray-700 mb-1.5">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="end-time"
                className="text-sm font-medium text-gray-700 mb-1.5">
                End Time
              </label>
              <input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleDateTimeFilter}
                className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-md 
      hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
      transition-all duration-300 ease-in-out transform active:scale-95 shadow-md">
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <DoctorCard key={doctor.id || index} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
