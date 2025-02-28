import { useState } from "react";

const doctors = [
    { id: 1, name: "Dr. Nguyễn Văn A", degree: "Bác sĩ chuyên khoa I", schedule: "Thứ 2 - Thứ 6", profile: "Chuyên khoa tim mạch" },
    { id: 2, name: "Dr. Trần Thị B", degree: "Thạc sĩ Y khoa", schedule: "Thứ 3 - Thứ 7", profile: "Chuyên khoa thần kinh" },
    { id: 3, name: "Dr. Lê Văn C", degree: "Tiến sĩ Y học", schedule: "Thứ 2 - Thứ 5", profile: "Chuyên khoa nội tiết" },
    { id: 4, name: "Dr. Phạm Thị D", degree: "Bác sĩ chuyên khoa II", schedule: "Thứ 4 - Chủ Nhật", profile: "Chuyên khoa da liễu" },
    { id: 5, name: "Dr. Hoàng Minh E", degree: "Thạc sĩ Y học", schedule: "Thứ 3 - Thứ 6", profile: "Chuyên khoa tiêu hóa" },
    { id: 6, name: "Dr. Võ Thị F", degree: "Tiến sĩ Y khoa", schedule: "Thứ 2 - Thứ 7", profile: "Chuyên khoa hô hấp" }
];

export default function DoctorManagement() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý danh sách bác sĩ</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Tên</th>
                        <th className="border p-2">Bằng cấp</th>
                        <th className="border p-2">Chuyên khoa</th>
                        <th className="border p-2">Lịch trình</th>
                        <th className="border p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id} className="border">
                            <td className="border p-2">{doctor.name}</td>
                            <td className="border p-2">{doctor.degree}</td>
                            <td className="border p-2">{doctor.profile}</td>
                            <td className="border p-2">{doctor.schedule}</td>
                            <td className="border p-2 flex gap-2">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedDoctor(doctor)}>
                                    Xem hồ sơ
                                </button>
                                <button className="px-4 py-2 border rounded">
                                    Xem lịch trình
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedDoctor && (
                <div className="mt-6 p-4 border rounded-lg bg-white shadow-lg">
                    <h2 className="text-xl font-bold">Hồ sơ bác sĩ</h2>
                    <p><strong>Tên:</strong> {selectedDoctor.name}</p>
                    <p><strong>Bằng cấp:</strong> {selectedDoctor.degree}</p>
                    <p><strong>Chuyên khoa:</strong> {selectedDoctor.profile}</p>
                    <p><strong>Lịch trình:</strong> {selectedDoctor.schedule}</p>
                    <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedDoctor(null)}>Đóng</button>
                </div>
            )}
        </div>
    );
}
