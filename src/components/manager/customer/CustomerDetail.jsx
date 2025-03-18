import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaMapMarkerAlt, FaHeartbeat, FaHistory, FaVenusMars, FaAllergies, FaBrain, FaNotesMedical, FaCalendarAlt } from "react-icons/fa";
import { FaMars, FaVenus } from "react-icons/fa";

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/patients/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setCustomer(data.patientProfileDto);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, [id]);

    if (loading) return <div className="text-center text-cyan-500 text-2xl font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 text-2xl font-semibold">Error: {error}</div>;
    if (!customer) return <div className="text-center text-gray-500 text-2xl font-semibold">Customer not found!</div>;

    return (
        <motion.div
            // className="container mx-auto p-8 bg-white shadow-2xl rounded-3xl text-gray-900 relative overflow-hidden"
            className="container mx-auto px-8 mt-5 py-6 text-gray-900 bg-white  grid grid-cols-1 md:grid-cols-3 gap-2 "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="col-span-1 space-y-6 product-card bg-gradient-to-br from-cyan-50 to-pink-50 rounded-md shadow-xl overflow-hidden relative cursor-pointer snap-start shrink-0 flex flex-col items-center pt-20 gap-3 transition-all duration-300 group">
                <div className="absolute -left-[25%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-170">
                    <div className="flex gap-1">
                        <svg
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth={1}
                            fill="none"
                            viewBox="0 0 24 24"
                            className={`rotate-[24deg] ${customer.gender === "Male" ? "fill-blue-300" : customer.gender === "Female" ? "fill-pink-300" : "fill-gray-300"}`}
                            height={200}
                            width={200}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </div>
                </div>
                <div
                    className={`absolute rounded-full z-10 left-1/2 top-[30%] h-[120%] w-[120%] -translate-x-1/2 group-hover:top-[40%] transition-all duration-300 
                               ${customer.gender === "Male" ? "bg-blue-400" : customer.gender === "Female" ? "bg-pink-400" : "bg-gray-400"}`}
                />
                <div className="para uppercase text-center leading-none z-15">
                    <p className="text-black font-semibold text-xs font-serif">Profile</p>
                    <p className="font-bold text-xl tracking-wider text-gray-500">Customer</p>
                </div>
                <img
                    src={"https://cdn-healthcare.hellohealthgroup.com/2023/05/1684813854_646c381ea5d030.57844254.jpg?w=1920&q=100"}
                    // alt={customer.fullName}
                    className="w-32 h-32 rounded-full object-cover mx-auto border border-gray-300 shadow-md z-15 "
                />

                <div className="btm-_container z-15 flex flex-row justify-between items-end gap-10">
                    <div className="flex flex-col items-start gap-1">
                        <div className="inline-flex gap-2 items-center justify-center text-2xl ">
                            <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                <FaUser className={customer.gender === "Male" ? "text-blue-400" : customer.gender === "Female" ? "text-pink-400" : "text-gray-500"} />
                            </div>
                            <p className="font-semibold text-white">{customer.fullName}</p>
                        </div>
                        <div className="inline-flex gap-3 items-center justify-center p-2 mt-4">
                            <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                <FaPhone className="text-green-500" />
                            </div>
                            <p className="font-semibold text-xs text-white">{customer.contactInfo.phoneNumber}</p>
                        </div>
                        <div className="inline-flex gap-3 items-center justify-center p-2">
                            <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                <FaEnvelope className="text-yellow-500" />
                            </div>
                            <p className="font-semibold text-xs text-white">{customer.contactInfo.email}</p>
                        </div>
                        <div className="inline-flex gap-3 items-center justify-center p-2">
                            <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                <FaMapMarkerAlt className="text-red-500" />
                            </div>
                            <p className="font-semibold text-xs text-white">{customer.contactInfo.address}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col-span-2 space-y-2">
                <div className="bg-white p-2 pl-6 rounded-xl shadow-md border border-gray-300">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-pink-500">
                        <FaHeartbeat /> Medical History
                    </h3>
                    <motion.div
                        // key={record.id}
                        className="p-4 rounded-lg  transition-transform hover:scale-105 hover:border-gray-200 hover:border  hover:bg-gray-50 "
                        whileHover={{ scale: 1.02 }}
                    >
                        <p className="flex items-center gap-2"><FaCalendarAlt className="text-green-500" /><strong>Diagnosed At:</strong> {new Date(customer.medicalHistory.diagnosedAt).toLocaleString()}</p>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">Specific Mental Disorders:</p>
                                <ul className="list-disc ml-6 text-gray-700">
                                    {customer.medicalHistory.specificMentalDisorders.map((disorder) => (
                                        <li key={disorder.id} className="flex items-center gap-2"><FaBrain className="text-red-500" /><strong>{disorder.name}</strong>: {disorder.description}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold">Physical Symptoms:</p>
                                <ul className="list-disc ml-6 text-gray-700">
                                    {customer.medicalHistory.physicalSymptoms.map((symptom) => (
                                        <li key={symptom.id} className="flex items-center gap-2"><FaHeartbeat className="text-pink-500" /><strong>{symptom.name}</strong>: {symptom.description}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="font-semibold">Allergy: </span>
                                <ul className="list-disc ml-6 text-gray-700">
                                    <li className="flex items-center gap-2"> <FaAllergies className="text-green-500" /><strong> {customer.allergies}</strong></li>


                                </ul>
                            </div>

                        </div>
                    </motion.div>
                </div>

                <div className="bg-white p-2 pl-6 rounded-xl shadow-md border border-gray-300">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-600">
                        <FaHistory className="text-purple-500" />
                        Medical Records
                    </h3>
                    <div className="space-y-4">
                        {customer.medicalRecords.map((record) => (
                            <motion.div
                                key={record.id}
                                className="p-4 rounded-lg  transition-transform hover:scale-105 hover:border-gray-200 hover:border  hover:bg-gray-50 "
                                whileHover={{ scale: 1.02 }}
                            >
                                <p className="flex items-center gap-2 text-gray-900">
                                    <FaNotesMedical className="text-blue-500 text-lg" />
                                    <strong className="text-gray-700">Notes:</strong>
                                    {record.notes}
                                </p>
                                <p className="flex items-center gap-2">
                                    <FaHeartbeat className={`text-lg ${record.status === "Processing" ? "text-yellow-500" : "text-green-500"}`} />
                                    <strong className="text-gray-700">Status:</strong>
                                    <span className={`${record.status === "Processing" ? "text-yellow-600" : "text-green-600"} font-medium`}>
                                        {record.status}
                                    </span>
                                </p>
                                <p className="flex items-center gap-2 text-gray-900">
                                    <FaCalendarAlt className="text-yellow-500 text-lg" />
                                    <strong className="text-gray-700">Created At:</strong>
                                    {new Date(record.createdAt).toLocaleString()}
                                </p>

                                {/* Hiển thị danh sách specificMentalDisorders */}
                                {record.specificMentalDisorders?.length > 0 && (
                                    <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                                        <h4 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
                                            <FaBrain className="text-purple-500 text-xl" />
                                            Mental Disorders:
                                        </h4>
                                        <ul className="mt-2 space-y-2">
                                            {record.specificMentalDisorders.map((disorder) => (
                                                <li key={disorder.id} className="flex items-start gap-2 p-2 bg-gray-100 rounded-md">
                                                    <FaCheckCircle className="text-green-500 text-lg" />
                                                    <div>
                                                        <span className="font-semibold text-gray-900">{disorder.name}</span>
                                                        <p className="text-gray-700 text-sm">{disorder.description}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>


            <motion.button
                onClick={() => navigate("/manager/viewCustomer")}
                className="px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform col-span-3 mx-auto"
                whileHover={{ scale: 1.05 }}
            >
                Back
            </motion.button>
        </motion.div >
    );
};

export default CustomerDetail;
