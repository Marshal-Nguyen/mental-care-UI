import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import CreateMedical from "../../../components/Dashboard/Doctor/CreateMedical";
import { useSelector } from "react-redux";
const PatientBooking = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
    totalPages: 1,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const profileId = useSelector((state) => state.auth.profileId);
  console.log("profileId Doctor", profileId);
  // Hàm fetch danh sách bệnh nhân từ API
  const fetchPatients = async (pageIndex = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://anhtn.id.vn/scheduling-service/bookings?PageIndex=${pageIndex}&PageSize=10&SortBy=date&SortOrder=asc&DoctorId=${profileId}&Status=AwaitMeeting`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { bookings } = response.data;
      setPatients(bookings.data);
      setPagination({
        pageIndex: bookings.pageIndex,
        pageSize: bookings.pageSize,
        totalPages: bookings.totalPages,
      });
    } catch (error) {
      console.error("Lỗi tải danh sách bệnh nhân:", error);
      setError("Không thể tải danh sách bệnh nhân. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm fetch chi tiết bệnh nhân
  const fetchPatientDetails = async (patientId) => {
    if (!patientId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://anhtn.id.vn/profile-service/patients/${patientId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSelectedPatientDetails(response.data.patientProfileDto);
    } catch (error) {
      console.error("Lỗi tải thông tin bệnh nhân:", error);
      setError("Không thể tải thông tin chi tiết bệnh nhân.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý chọn bệnh nhân
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    fetchPatientDetails(patient.patientId);
  };

  // Hàm xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchPatients(newPage);
    }
  };

  // Hàm lọc bệnh nhân theo từ khóa tìm kiếm
  const filteredPatients = patients.filter((patient) =>
    patient.bookingCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gọi API khi component mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // Component tạo hồ sơ bệnh án với thông tin chi tiết bệnh nhân

  return (
    <div className="flex h-screen bg-gray-50 py-6 px-2 gap-1">
      {/* Patient List Section */}
      <div className="w-1/3">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Waiting For Examination
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by booking code..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.bookingCode}
                        className={`hover:bg-gray-50 transition-colors duration-150 ${
                          selectedPatient?.bookingCode === patient.bookingCode
                            ? "bg-purple-50"
                            : ""
                        }`}>
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                          {patient.bookingCode?.split("-")[1]}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {patient.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {patient.startTime}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                              selectedPatient?.bookingCode ===
                              patient.bookingCode
                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                            }`}
                            onClick={() => handleSelectPatient(patient)}>
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50">
                <button
                  className="px-4 py-2 flex items-center text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(pagination.pageIndex - 1)}
                  disabled={pagination.pageIndex === 1}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Pre
                </button>
                <span className="text-sm text-gray-700">
                  Page {pagination.pageIndex} / {pagination.totalPages}
                </span>
                <button
                  className="px-4 py-2 flex items-center text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handlePageChange(pagination.pageIndex + 1)}
                  disabled={pagination.pageIndex === pagination.totalPages}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Medical Record Creation Section */}
      <div className="w-2/3">
        <CreateMedical
          selectedPatient={selectedPatient}
          patientDetails={selectedPatientDetails}
          profileId={profileId}
        />
      </div>
    </div>
  );
};

export default PatientBooking;
