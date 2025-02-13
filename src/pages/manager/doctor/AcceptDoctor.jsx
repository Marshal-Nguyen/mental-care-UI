import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const requestData = [
    { id: 1, doctorName: "Dr. John Doe", reason: "Request for joining the system", date: "2025-02-10" },
    { id: 2, doctorName: "Dr. Jane Smith", reason: "Request for account activation", date: "2025-02-11" },
    { id: 3, doctorName: "Dr. Alice Johnson", reason: "Update profile information", date: "2025-02-12" },
];

const ApprovalRequests = () => {
    const handleApprove = (id) => {
        console.log("Approve request with ID:", id);
    };

    const handleReject = (id) => {
        console.log("Reject request with ID:", id);
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Doctor Approval Requests
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Doctor Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Reason</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requestData.map((request, index) => (
                        <tr key={request.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{request.doctorName}</td>
                            <td className="border border-gray-300 px-4 py-2">{request.reason}</td>
                            <td className="border border-gray-300 px-4 py-2">{request.date}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleApprove(request.id)}
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        title="Approve"
                                    >
                                        <AiFillCheckCircle size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Reject"
                                    >
                                        <AiFillCloseCircle size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovalRequests;
