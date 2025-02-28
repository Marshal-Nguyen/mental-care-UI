import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    // Dữ liệu giả (mock data)
    const [user, setUser] = useState({
        id: "550e8400-e29b-41d4-a716-446655440000",
        username: "john_doe",
        fullName: "John Doe",
        email: "johndoe@example.com",
        role: "Admin",
        allergies: "None",
        gender: "Male",
        createdAt: "2024-02-10",
        avatar: "https://i.pravatar.cc/150?img=3",
        phoneNumber: "+123456789",
        emailConfirmed: true,
        twoFactorEnabled: false,
    });

    // State để bật/tắt chế độ chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState(user);

    // Xử lý thay đổi input
    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    // Lưu cập nhật
    const handleSave = () => {
        setUser(updatedUser);
        setIsEditing(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">

            {/* Avatar + Tên */}
            <div className="flex items-center space-x-4">
                <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full border-4 border-blue-500"
                />
                <div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={updatedUser.fullName}
                            onChange={handleChange}
                            className="text-xl font-semibold text-gray-800 border p-1 rounded"
                        />
                    ) : (
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {user.fullName}
                        </h2>
                    )}
                    <p className="text-gray-500">@{user.username}</p>
                </div>
            </div>

            {/* Thông tin cá nhân */}
            <div className="mt-6 space-y-3">
                <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleChange}
                            className="border p-1 rounded"
                        />
                    ) : (
                        user.email
                    )}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Vai trò:</span>{" "}
                    {user.role}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Giới tính:</span>{" "}
                    {isEditing ? (
                        <select
                            name="gender"
                            value={updatedUser.gender}
                            onChange={handleChange}
                            className="border p-1 rounded"
                        >
                            <option value="Male">Nam</option>
                            <option value="Female">Nữ</option>
                            <option value="Other">Khác</option>
                        </select>
                    ) : (
                        user.gender
                    )}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Số điện thoại:</span>{" "}
                    {isEditing ? (
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedUser.phoneNumber}
                            onChange={handleChange}
                            className="border p-1 rounded"
                        />
                    ) : (
                        user.phoneNumber
                    )}
                </p>
                <p>
                    <span className="font-medium text-gray-700">Ngày tạo:</span>{" "}
                    {user.createdAt}
                </p>
            </div>

            {/* Trạng thái tài khoản */}
            <div className="mt-6">
                <p className="text-gray-700">
                    <span className="font-medium">Email xác nhận:</span>{" "}
                    {user.emailConfirmed ? "✅ Đã xác nhận" : "❌ Chưa xác nhận"}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">Xác thực 2 lớp:</span>{" "}
                    {user.twoFactorEnabled ? "✅ Bật" : "❌ Tắt"}
                </p>
            </div>

            {/* Nút Update */}
            <div className="mt-6 flex space-x-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        {/* Nút Back */}
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-4"
                        >
                            ← Back
                        </button>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
                        >
                            Update
                        </button>
                    </>

                )}
            </div>
        </div>
    );
};

export default Profile;
