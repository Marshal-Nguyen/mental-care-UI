import React from "react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";

const psychologistData = [
    { id: 1, name: "Dr. John Doe", specialization: "Cognitive Therapy", email: "john.doe@example.com" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Behavioral Therapy", email: "jane.smith@example.com" },
    { id: 3, name: "Dr. Alice Johnson", specialization: "Psychodynamic Therapy", email: "alice.johnson@example.com" },
];

const PsychologistList = () => {
    const handleEdit = (id) => {
        console.log("Edit psychologist with ID:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete psychologist with ID:", id);
    };

    const handleViewDetail = (id) => {
        console.log("View details of psychologist with ID:", id);
    };

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
                    {psychologistData.map((psychologist, index) => (
                        <tr key={psychologist.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{psychologist.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{psychologist.specialization}</td>
                            <td className="border border-gray-300 px-4 py-2">{psychologist.email}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(psychologist.id)}
                                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        title="Edit"
                                    >
                                        <AiFillEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(psychologist.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Delete"
                                    >
                                        <AiFillDelete size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleViewDetail(psychologist.id)}
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
