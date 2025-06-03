import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateWeeklyPlanner from "./CreateWeeklyPlanner";

export default function TreatmentActivities({ profileId }) {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [activeRecord, setActiveRecord] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://anhtn.id.vn/profile-service/medical-records`,
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
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-3 h-full gap-2">
        {/* Phần 1: Danh sách hồ sơ y tế */}
        <div className="col-span-1 h-fit overflow-y-auto py-6">
          {/* <h2 className="px-4 py-2 text-lg font-serif border-b border-gray-200">
            Currently Under Treatment Profile
          </h2> */}

          {medicalRecords.length === 0 ? (
            <div className="p-4">
              No medical records are currently being processed.
            </div>
          ) : (
            <div className="overflow-y-auto h-full">
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
        <div className="col-span-2 h-full bg-white rounded-lg shadow overflow-y-auto">
          {selectedPatientId ? (
            <CreateWeeklyPlanner profileId={selectedPatientId} />
          ) : (
            <div className="text-center text-gray-500 p-8">
              Vui lòng chọn một bệnh nhân để xem thông tin chi tiết.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
