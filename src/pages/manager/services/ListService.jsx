
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import Loader from "../../../components/Web/Loader";

const API_URL =
    "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors?PageIndex=1&PageSize=10&SortBy=Rating&SortOrder=asc";

const UpgradePackages = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log("API Response:", response.data);
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

    if (loading) return <Loader />;

    if (error) {
        return <p className="text-center text-red-500 text-xl">{error}</p>;
    }

    return (
        <div className="container mx-auto p-8 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-3xl text-gray-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-100 via-purple-100 to-pink-200 opacity-40 blur-2xl"></div>
            {/* <h2 className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-md">
                🌟 Psychologist List 🌟
            </h2> */}
            <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
                Psychologist List
            </h2>
            <motion.table
                className="w-full border-collapse shadow-xl rounded-xl overflow-hidden bg-white relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                    <tr>
                        <th className="px-6 py-4">#</th>
                        <th className="px-6 py-4">Avatar</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Specialization</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <motion.tr
                            key={doctor.id}
                            className="hover:bg-blue-50 transition-all duration-300 border-b border-gray-300 group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <td className="px-6 py-4 text-center font-bold text-blue-600">{index + 1}</td>

                            {/* Avatar */}
                            <td className="px-6 py-4 text-center">
                                <img
                                    src={doctor.profileImage || "https://cdn-healthcare.hellohealthgroup.com/2023/05/1684813854_646c381ea5d030.57844254.jpg?w=1920&q=100"}
                                    alt={doctor.fullName}
                                    className="w-12 h-12 rounded-full object-cover mx-auto border border-gray-300 shadow-sm"
                                />
                            </td>

                            {/* Tên bác sĩ */}
                            <td className="px-4 py-4 font-semibold text-gray-800">{doctor.fullName}</td>

                            {/* Chuyên môn */}
                            <td className="px-2 py-4 text-pink-500 font-medium">
                                {doctor.specialties.map(s => s.name).join(", ")}
                            </td>

                            {/* Email */}
                            <td className="px-4 py-4 text-green-500 font-medium">{doctor.contactInfo.email}</td>

                            {/* Rating */}
                            <td className="px-6 py-4 text-yellow-500 font-semibold text-center">
                                ⭐ {doctor.rating?.toFixed(1) || "N/A"}
                            </td>

                            {/* Hành động */}
                            <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-4">
                                    <motion.button
                                        className="p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 hover:shadow-2xl transform transition-transform duration-200 group-hover:scale-110"
                                        title="Edit"
                                    >
                                        <AiFillEdit size={24} />
                                    </motion.button>
                                    <motion.button
                                        className="p-3 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transform transition-transform duration-200 group-hover:scale-110"
                                        title="View Detail"
                                    >
                                        <AiFillEye size={24} />
                                    </motion.button>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>
        </div>
    );
};

export default UpgradePackages;
