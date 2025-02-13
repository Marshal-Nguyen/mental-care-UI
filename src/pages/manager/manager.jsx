// import React from 'react';
import React, { useState, useRef } from "react";

import SildebarManager from '../../components/manager/sildebarLeft/SildebarLeft';
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
            <div className="w-full flex h-[100vh] bg-gray-100">
                {/* <SildebarManager /> */}
                <SildebarManager onMenuClick={handleMenuClick} />
                <div className="flex-auto  overflow-y-auto relative">
                    <div>
                        {/* <div className="fixed top-0 left-0 w-full flex justify-end space-x-2 px-[30px] py-[5px] bg-white  z-10">
                             <span className="text-blue-800 text-lg font-medium">{localStorage.getItem("name")} (Manager)</span> 
                          
                            <Tab
                                history={history}
                                setHistory={setHistory}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        </div> */}
                        <div className="fixed top-0 left-0 w-full bg-white z-10 pl-72">
                            {/* <span className="text-blue-800 text-lg font-medium">{localStorage.getItem("name")} (Manager)</span> */}
                            {/* <Tab /> */}
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
            </div>

        </>
    );
}
