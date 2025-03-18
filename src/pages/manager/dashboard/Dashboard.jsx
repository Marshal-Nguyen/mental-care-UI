import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { motion } from "framer-motion";
import { Users, Briefcase, ShoppingCart, DollarSign, TrendingUp, Calendar } from "lucide-react";

const data = [...Array(12)].map((_, i) => ({
    name: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
    value: Math.floor(Math.random() * 1000) + 300,
}));

const pieData = [
    { name: "Group A", value: 500 },
    { name: "Group B", value: 350 },
    { name: "Group C", value: 450 },
    { name: "Group D", value: 300 },
];

const radarData = [
    { subject: "Users", A: 120, B: 110, fullMark: 150 },
    { subject: "Doctors", A: 98, B: 130, fullMark: 150 },
    { subject: "Sales", A: 86, B: 130, fullMark: 150 },
    { subject: "Revenue", A: 99, B: 100, fullMark: 150 },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
            <motion.h1
                className="text-4xl font-bold text-gray-800 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Modern Analytics Dashboard
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {[{ icon: Users, label: "Total Users", value: "15,456" },
                { icon: Briefcase, label: "Total Doctors", value: "320" },
                { icon: ShoppingCart, label: "Total Products Sold", value: "2,540" },
                { icon: DollarSign, label: "Total Revenue", value: "$200K" },
                { icon: TrendingUp, label: "Growth Rate", value: "+15%" },
                { icon: Calendar, label: "Monthly New Users", value: "1,800" }].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="p-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-md flex items-center gap-4 hover:scale-105 transition duration-300"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}>
                        <stat.icon className="text-white w-12 h-12" />
                        <div>
                            <p className="text-white text-sm font-light">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
                <div className="p-5 bg-white rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-3">Sales Overview</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="#333" />
                            <YAxis stroke="#333" />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#FF6384" strokeWidth={3} dot={{ fill: "#FF6384", r: 5 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-5 bg-white rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-3">Revenue Growth</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" stroke="#333" />
                            <YAxis stroke="#333" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#36A2EB" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="p-5 bg-white rounded-xl shadow-lg">
                    <h2 className="text-lg font-semibold mb-3">User Distribution</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-5 bg-white rounded-xl shadow-lg mt-6 w-full max-w-6xl">
                <h2 className="text-lg font-semibold mb-3">Performance Analysis</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart outerRadius={90} data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" stroke="#333" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#333" />
                        <Radar name="Current" dataKey="A" stroke="#4BC0C0" fill="#4BC0C0" fillOpacity={0.6} />
                        <Radar name="Previous" dataKey="B" stroke="#FF6384" fill="#FF6384" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}