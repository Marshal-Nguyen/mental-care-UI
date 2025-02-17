import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const salesData = [
    { name: "Tháng 1", sales: 400 },
    { name: "Tháng 2", sales: 300 },
    { name: "Tháng 3", sales: 500 },
    { name: "Tháng 4", sales: 700 },
    { name: "Tháng 5", sales: 600 },
];

const messageData = [
    { name: "Đã trả lời", value: 120 },
    { name: "Chưa trả lời", value: 30 },
];

const COLORS = ["#4CAF50", "#F44336"];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Dashboard Nhân Viên</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Biểu đồ cột hiển thị sản phẩm bán ra */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-2">Sản phẩm bán ra</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#3B82F6" radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Biểu đồ tròn hiển thị số lượng tin nhắn đã xử lý */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-2">Tình trạng tin nhắn</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={messageData} cx="50%" cy="50%" outerRadius={80} label>
                                    {messageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}