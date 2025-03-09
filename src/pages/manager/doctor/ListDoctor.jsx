import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";

const API_URL =
    "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors?PageIndex=1&PageSize=10&SortBy=Rating&SortOrder=asc";

const PsychologistList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log("API Response:", response.data); // Kiểm tra dữ liệu API trả về

                // Kiểm tra nếu API trả về object chứa danh sách bác sĩ
                setDoctors(response.data.doctorProfiles.data || []);
            } catch (error) {
                setError("Failed to load doctors. Please try again.");
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleEdit = (id) => {
        console.log("Edit psychologist with ID:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete psychologist with ID:", id);
    };

    const handleViewDetail = (id) => {
        console.log("View details of psychologist with ID:", id);
    };

    if (loading) {
        return <p className="text-center text-gray-600">Loading doctors...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Psychologist List
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Specialization</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={doctor.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{doctor.fullName}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {doctor.specialties.map(s => s.name).join(", ")}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{doctor.contactInfo.email}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(doctor.id)}
                                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        title="Edit"
                                    >
                                        <AiFillEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(doctor.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Delete"
                                    >
                                        <AiFillDelete size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetail(doctor.id)}
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        title="View Detail"
                                    >
                                        <AiFillEye size={18} />
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

export default PsychologistList;
