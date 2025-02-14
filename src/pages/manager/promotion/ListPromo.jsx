import React from "react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
// import { Button } from "@/components/ui/button";

const discountPrograms = [
    {
        id: 1,
        name: "Mùa xuân yêu thương",
        description: "Giảm giá 10% cho gói AI và 20% cho gói Bác sĩ tâm lý.",
        startDate: "2025-02-01",
        endDate: "2025-02-28",
        applicablePackages: ["AI", "Bác sĩ tâm lý"],
    },
    {
        id: 2,
        name: "Chào hè sôi động",
        description: "Giảm giá 15% cho tất cả các gói.",
        startDate: "2025-05-01",
        endDate: "2025-05-31",
        applicablePackages: ["Free", "AI", "Bác sĩ tâm lý"],
    },
    {
        id: 3,
        name: "Khuyến mãi Tết Nguyên Đán",
        description: "Giảm giá 50% cho gói Bác sĩ tâm lý.",
        startDate: "2025-01-15",
        endDate: "2025-01-30",
        applicablePackages: ["Bác sĩ tâm lý"],
    },
];

const DiscountProgramManagement = () => {
    const handleEdit = (id) => {
        console.log("Edit discount program with ID:", id);
    };

    const handleDelete = (id) => {
        console.log("Delete discount program with ID:", id);
    };

    const handleViewDetails = (id) => {
        console.log("View details of discount program with ID:", id);
    };

    return (
        <div className="container mt-10 p-10 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Quản lý chương trình giảm giá
            </h2>

            {/* <div className="flex justify-end mb-4">
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Thêm chương trình mới
                </Button>
            </div> */}

            <table className="table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Tên chương trình</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Ngày bắt đầu</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Ngày kết thúc</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Gói áp dụng</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {discountPrograms.map((program, index) => (
                        <tr key={program.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{program.name}</td>
                            {/* <td className="border border-gray-300 px-4 py-2">{program.description}</td> */}
                            <td className="border border-gray-300 px-4 py-2">{program.startDate}</td>
                            <td className="border border-gray-300 px-4 py-2">{program.endDate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                {program.applicablePackages.join(", ")}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => handleViewDetails(program.id)}
                                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        title="Xem chi tiết"
                                    >
                                        <AiFillEye size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(program.id)}
                                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        title="Chỉnh sửa"
                                    >
                                        <AiFillEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(program.id)}
                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        title="Xóa"
                                    >
                                        <AiFillDelete size={18} />
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

export default DiscountProgramManagement;
