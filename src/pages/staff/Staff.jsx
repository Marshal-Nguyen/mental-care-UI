// import React from 'react';
import React, { useState, useRef } from "react";

import Navbar from "../../components/staff/navbar/navbar";
import Tab from '../../components/manager/tab/tab';
// import { RiAccountCircleLine } from "react-icons/ri";
import { Outlet } from 'react-router-dom';
// import { FaExclamationCircle } from 'react-icons/fa';
export default function Manager() {
    // useEffect(() => {
    //     const Authorization = localStorage.getItem('token');
    //     const role = localStorage.getItem('role');
    //     if (!Authorization || role !== 'manager') {
    //         navigate('/login');
    //     }
    // }, [navigate]);
    const [history, setHistory] = React.useState(["Dashboard"]);
    const [activeTab, setActiveTab] = React.useState("Dashboard");
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
            {/* <div className="w-full flex h-[100vh] bg-gray-100">
                <Navbar/>
                <div className="flex-auto  overflow-y-auto relative">
                    <div>
                        <div className="fixed top-0 left-0 w-full bg-white z-10 pl-72">
                            <Tab
                                history={history}
                                setHistory={setHistory}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div>
                        <div className="pt-[60px]">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div> */}
            <Navbar />
        </>
    );
}
