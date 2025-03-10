import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SildebarManager from '../../components/manager/sildebarLeft/SildebarLeft';
import Tab from '../../components/manager/tab/tab';

export default function Manager() {
    const navigate = useNavigate();
    const [history, setHistory] = useState(["Dashboard"]);
    const [activeTab, setActiveTab] = useState("Dashboard");
    useEffect(() => {
        const Authorization = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (!Authorization || role !== 'Manager') {
            navigate('/HomeUser');
        }
    }, [navigate]);
    const handleMenuClick = (menuText) => {
        setActiveTab(menuText);
        setHistory((prevHistory) => {
            if (!prevHistory.includes(menuText)) {
                return [...prevHistory, menuText];
            }
            return prevHistory;
        });
    };

    return (
        <>
            <div className="w-full flex h-[100vh] bg-gray-100">
                <SildebarManager onMenuClick={handleMenuClick} />
                <div className="flex-auto overflow-y-auto relative">
                    <div>
                        {/* Thanh Manager */}
                        <div className="fixed top-0 py-2 left-0 w-full border border-gray-200 bg-white z-20 ml-56">
                            <div className="flex justify-end items-center space-x-2 mr-58">
                                <span className="text-blue-800 text-lg font-medium">
                                    Manager Name
                                </span>
                                <button onClick={() => navigate("/manager/profile")}>
                                    <img
                                        src={"https://i.pravatar.cc/150?img=4"}
                                        alt="Avatar"
                                        className="w-7 h-7 rounded-full border-4 border-blue-500"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Thanh Tab */}
                        <div className="fixed top-11 border border-gray-200 left-0 w-full bg-white z-10 pl-56">
                            <Tab
                                history={history}
                                setHistory={setHistory}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>

                        {/* Nội dung bên dưới */}
                        <div className="pt-[120px]">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
