import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import { FaMars, FaVenus, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";
import Loader from "../../../components/Web/Loader";
import { useNavigate } from "react-router-dom";

const API_URL =
  "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/patients?PageIndex=1&PageSize=10&SortBy=Rating&SortOrder=asc";

const PsychologistList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log("API Response:", response.data);
        setCustomers(response.data.paginatedResult.data || []);
      } catch (error) {
        setError("Failed to load customers. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-white shadow-2xl rounded-3xl text-gray-900 min-h-screen relative overflow-hidden">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
        Users List
      </h2>
      <motion.table
        className="w-full border-collapse shadow-xl rounded-xl overflow-hidden bg-white relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg text-left">
          <tr>
            <th className="px-6 py-4">#</th>
            <th className=" py-4 text-center">Avatar</th>
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Gender</th>
            <th className="px-4 py-4">Personality Traits</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <motion.tr
              key={customer.id}
              className="hover:bg-blue-50 transition-all duration-300 border-b border-gray-300 group"
              whileHover={{ scale: 1.02 }}>
              <td className="px-6 py-4  font-bold text-blue-600">
                {index + 1}
              </td>

              <td className=" py-4">
                <img
                  src={
                    customer.profileImage ||
                    "https://cdn-healthcare.hellohealthgroup.com/2023/05/1684813854_646c381ea5d030.57844254.jpg?w=1920&q=100"
                  }
                  alt={customer.fullName}
                  className="w-12 h-12 rounded-full object-cover mx-auto border border-gray-300 shadow-sm "
                />
              </td>

              <td className="px-4 py-4 font-semibold text-gray-800">
                {customer.fullName}
              </td>

              <td
                className="px-4 py-4 font-medium flex items-center gap-2  text-lg"
                style={{
                  color: customer.gender === "Male" ? "#3b82f6" : "#ec4899",
                }}>
                {customer.gender === "Male" ? <FaMars /> : <FaVenus />}{" "}
                {customer.gender}
              </td>
              <td
                className="px-4 pl-10 py-4 font-medium text-blue-500"
                style={{
                  color:
                    customer.personalityTraits === "Extroversion"
                      ? "#f59e0b"
                      : "#8b5cf6",
                }}>
                {/* <FaBrain />  */}
                {customer.personalityTraits}
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    className="p-3 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 hover:shadow-2xl transform transition-transform duration-200 group-hover:scale-110"
                    title="Edit">
                    <AiFillEdit size={24} />
                  </motion.button>
                  <motion.button
                    className="p-3 bg-green-400 text-white rounded-full shadow-lg hover:bg-green-500 hover:shadow-2xl transform transition-transform duration-200 group-hover:scale-110"
                    title="View Detail"
                    onClick={() => navigate(`${customer.id}`)}>
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

export default PsychologistList;
