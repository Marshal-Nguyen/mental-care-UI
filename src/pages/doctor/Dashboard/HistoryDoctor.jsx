import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PatientMedicalRecord from "../../../components/Dashboard/Doctor/PatientMedicalRecord";

export default function CompletedMedicalRecordsList() {
  const profileId = useSelector((state) => state.auth.profileId);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeRecord, setActiveRecord] = useState(null);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchMedicalRecords(currentPage);
  }, [profileId, currentPage]);

  const fetchMedicalRecords = async (pageIndex) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://psychologysupport-profile.azurewebsites.net/medical-records`,
        {
          params: {
            PageIndex: pageIndex,
            PageSize: pageSize,
            SortBy: "CreatedAt",
            SortOrder: "desc",
            DoctorId: profileId,
          },
        }
      );

      console.log("response", response.data);

      // Lọc chỉ lấy hồ sơ có status là "Done"
      const completedRecords = response.data.medicalRecords.data.filter(
        (record) => getStatusBadge(record.status) === "Done"
      );

      setMedicalRecords(completedRecords);

      // Cập nhật thông tin phân trang
      const totalDoneRecords = response.data.medicalRecords.data.filter(
        (record) => getStatusBadge(record.status) === "Done"
      ).length;

      // Sử dụng số lượng records đã lọc để tính tổng số trang
      setTotalRecords(totalDoneRecords);
      setTotalPages(Math.max(1, Math.ceil(totalDoneRecords / pageSize)));

      // Nếu trang hiện tại vượt quá tổng số trang, quay lại trang 1
      if (pageIndex > Math.max(1, Math.ceil(totalDoneRecords / pageSize))) {
        setCurrentPage(1);
      }

      // Nếu có hồ sơ, tự động chọn hồ sơ đầu tiên
      if (completedRecords.length > 0) {
        const firstRecord = completedRecords[0];
        setSelectedPatientId(firstRecord.patientProfileId);
        setActiveRecord(firstRecord.id);
      } else {
        // Nếu không có hồ sơ, reset
        setSelectedPatientId(null);
        setActiveRecord(null);
      }

      setLoading(false);
    } catch (err) {
      setError("**Unable to load completed medical profile data.**");
      setLoading(false);
      console.error("Error fetching completed medical records:", err);
    }
  };

  const handleViewPatientDetails = (patientId, recordId) => {
    console.log("patientId", patientId);
    console.log("recordId", recordId);

    setSelectedPatientId(patientId);
    setActiveRecord(recordId);
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
      case "đang điều trị":
        return "Processing";
      case "completed":
      case "hoàn thành":
      case "done":
        return "Done";
      case "pending":
      case "chờ xử lý":
        return "Processing";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleString("en-GB", options);
  };

  // Truncate ID to first 8 characters
  const truncateId = (id) => {
    if (!id) return "";
    return id.substring(0, 8) + "...";
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Tạo các nút phân trang
  const renderPagination = () => {
    // Nếu chỉ có 1 trang, không hiển thị phân trang
    if (totalPages <= 1) {
      return null;
    }

    const pageButtons = [];

    // Nút Previous
    pageButtons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}>
        &laquo;
      </button>
    );

    // Hiển thị các nút trang
    const maxButtonsToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

    if (endPage - startPage + 1 < maxButtonsToShow) {
      startPage = Math.max(1, endPage - maxButtonsToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}>
          {i}
        </button>
      );
    }

    // Nút Next
    pageButtons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}>
        &raquo;
      </button>
    );

    return pageButtons;
  };

  if (loading && currentPage === 1) {
    return <div className="p-4">Loading data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-4">
        {/* Phần 1: Danh sách hồ sơ y tế đã hoàn thành */}
        <div className="border-r border-gray-200">
          <h2 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
            Profile completed
          </h2>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : medicalRecords.length === 0 ? (
            <div className="p-4">No medical profiles have been completed.</div>
          ) : (
            <>
              <div className="overflow-y-auto max-h-[420px]">
                {medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    onClick={() =>
                      handleViewPatientDetails(
                        record.patientProfileId,
                        record.id
                      )
                    }
                    className={`border-l-4 cursor-pointer hover:bg-gray-50 ${
                      activeRecord === record.id
                        ? "border-green-600 bg-green-50"
                        : "border-transparent"
                    }`}>
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between mb-2">
                        <div className="font-medium text-green-600">
                          {getStatusBadge(record.status)}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {formatDate(record.createdAt)}
                        </div>
                      </div>
                      <div className="mb-1">ID: {truncateId(record.id)}</div>
                      <div className="text-gray-600 text-sm line-clamp-2">
                        {record.notes || "Treatment completed successfully."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Phân trang - chỉ hiển thị khi có nhiều hơn 1 trang */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center p-4 border-t border-gray-200">
                  {renderPagination()}
                </div>
              )}

              <div className="text-center text-sm text-gray-500 p-2">
                {totalRecords > 0
                  ? `Displaying ${medicalRecords.length} out of ${totalRecords} completed records`
                  : "No completed records available"}
              </div>
            </>
          )}
        </div>

        {/* Phần 2: Thông tin chi tiết bệnh nhân */}
        <div className="col-span-3">
          {selectedPatientId ? (
            <PatientMedicalRecord patientId={selectedPatientId} />
          ) : (
            <div className="text-center text-gray-500 p-8">
              Please select a patient to view detailed information.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
