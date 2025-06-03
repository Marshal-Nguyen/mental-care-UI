import React, { useState, useEffect } from "react";
import axios from "axios";
import MedicalProfile from "../Patient/MedicalProfile";

export default function MedicalRecordsList({ profileId }) {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeRecord, setActiveRecord] = useState(null);
  const VITE_API_PROFILE_URL = import.meta.env.VITE_API_PROFILE_URL;
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${VITE_API_PROFILE_URL}/medical-records`,
          {
            params: {
              PageIndex: 1,
              PageSize: 10,
              SortBy: "CreatedAt",
              SortOrder: "desc",
              DoctorId: profileId,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("response", response.data);

        // Lọc chỉ lấy hồ sơ có status là "Processing"
        const processedRecords = response.data.medicalRecords.data.filter(
          (record) => getStatusBadge(record.status) === "Processing"
        );

        setMedicalRecords(processedRecords);

        // Nếu có hồ sơ, tự động chọn hồ sơ đầu tiên
        if (processedRecords.length > 0) {
          const firstRecord = processedRecords[0];
          setSelectedPatientId(firstRecord.patientProfileId);
          setActiveRecord(firstRecord.id);
        }

        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu hồ sơ y tế");
        setLoading(false);
        console.error("Error fetching medical records:", err);
      }
    };

    fetchMedicalRecords();
  }, [profileId]);

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

  if (loading) {
    return <div className="p-4">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Phần 1: Danh sách hồ sơ y tế */}
        <div className="border-r border-gray-200">
          <h2 className="px-4 py-2 text-lg font-medium border-b border-gray-200">
            Ongoing Treatment Records
          </h2>

          {medicalRecords.length === 0 ? (
            <div className="p-4">
              No medical records are currently being processed.
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[460px]">
              {medicalRecords.map((record) => (
                <div
                  key={record.id}
                  onClick={() =>
                    handleViewPatientDetails(record.patientProfileId, record.id)
                  }
                  className={`border-l-4 cursor-pointer hover:bg-gray-50 ${
                    activeRecord === record.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-transparent"
                  }`}>
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">
                        {getStatusBadge(record.status)}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {formatDate(record.createdAt)}
                      </div>
                    </div>
                    <div className="mb-1">ID: {truncateId(record.id)}</div>
                    <div className="text-gray-600 text-sm line-clamp-2">
                      {record.notes ||
                        "Patient diagnosed with depression, ongoing therapy."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phần 2: Thông tin chi tiết bệnh nhân */}
        <div className="px-2">
          {selectedPatientId ? (
            <MedicalProfile patientId={selectedPatientId} />
          ) : (
            <div className="text-center text-gray-500 p-8">
              Please select a patient to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
