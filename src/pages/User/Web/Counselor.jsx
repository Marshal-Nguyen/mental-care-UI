import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Web/Loader";
export default function DoctorList() {
  const navigate = useNavigate();
  const isFetched = useRef(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFetched.current) return; // Ngăn fetch lại
    isFetched.current = true; // Đánh dấu đã fetch
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors",
          {
            params: {
              PageIndex: 1,
              PageSize: 10,
              SortBy: "Rating",
              SortOrder: "asc",
            },
          }
        );
        console.log("Danh sách bác sĩ:", response.data.doctorProfiles.data);
        setDoctors(response.data.doctorProfiles.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <p className="text-center text-gray-600">Đang tải danh sách bác sĩ...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="relative bg-white p-4 rounded-2xl shadow-lg border border-gray-200"
            >
              {/* Hiển thị rating ở góc trên bên phải */}
              <div className="absolute top-2 right-2 text-sm font-bold px-2 py-1 rounded-lg">
                ⭐ {doctor.rating || "N/A"}
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={doctor.image || "https://cdn-healthcare.hellohealthgroup.com/2023/09/1695616991_65110fdf078417.49245494.jpg?w=1920&q=100"}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {doctor.fullName}
                </h3>

                {/* Hiển thị danh sách chuyên khoa */}
                <p className="text-sm text-gray-600 text-center">
                  {doctor.specialties?.map((spec) => spec.name).join(", ") || "Không có chuyên khoa"}
                </p>
                <p className="text-sm text-blue-500 flex items-center mt-2">
                  📞 {doctor.contactInfo.phoneNumber}
                </p>
                <p className="text-sm text-blue-500 flex items-center mt-2">
                  📧 {doctor.contactInfo.email}

                </p>
              </div>

              <div className="mt-4 bg-gray-100 p-3 rounded-xl">
                <p className="text-sm text-gray-700 flex items-center">
                  📍 {doctor.contactInfo?.address || "Không có địa chỉ"}
                </p>
              </div>

              <button
                onClick={() => navigate(`/HomeUser/booking/${doctor.id}`)}
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-medium"
              >
                Đặt lịch bác sĩ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
