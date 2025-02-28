// // import React from 'react';
// import React, { useState, useRef } from "react";

// import SildebarManager from '../../components/manager/sildebarLeft/SildebarLeft';
// import Tab from '../../components/manager/tab/tab';
// // import { RiAccountCircleLine } from "react-icons/ri";
// import { Outlet } from 'react-router-dom';
// // import { FaExclamationCircle } from 'react-icons/fa';
// export default function Manager() {
//     // useEffect(() => {
//     //     const Authorization = localStorage.getItem('token');
//     //     const role = localStorage.getItem('role');
//     //     if (!Authorization || role !== 'manager') {
//     //         navigate('/login');
//     //     }
//     // }, [navigate]);
//     const [history, setHistory] = React.useState(["Dashboard"]);
//     const [activeTab, setActiveTab] = React.useState("Dashboard");
//     const handleMenuClick = (menuText) => {
//         setActiveTab(menuText);
//         setHistory((prevHistory) => {
//             if (!prevHistory.includes(menuText)) {
//                 return [...prevHistory, menuText];
//             }
//             return prevHistory;
//         });
//     };

//     return (
//         <>
//             <div className="w-full flex h-[100vh] bg-gray-100">
//                 {/* <SildebarManager /> */}
//                 <SildebarManager onMenuClick={handleMenuClick} />
//                 <div className="flex-auto overflow-y-auto relative">
//                     <div>
//                         {/* Thanh Manager */}
//                         {/* <div className="fixed top-0 py-2  left-0 w-full border border-gray-200 bg-white z-20 ml-56 ">
//                             <span className="text-blue-800 text-lg font-medium ">
//                                 Manager Dashboard
//                             </span>
//                         </div> */}
//                         <div className="fixed top-0 py-2 left-0 w-full border border-gray-200 bg-white z-20 ml-56">
//                             <div className="flex justify-end items-center space-x-2 mr-58">
//                                 <span className="text-blue-800 text-lg font-medium">
//                                     Manager name avatar
//                                 </span>
//                                 {/* Icon */}
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="h-6 w-6 text-blue-800"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     strokeWidth={2}
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         d="M4 6h16M4 12h16m-7 6h7"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Thanh Tab */}
//                         <div className="fixed top-11 border border-gray-200 left-0 w-full bg-white z-10 pl-56 ">
//                             <Tab
//                                 history={history}
//                                 setHistory={setHistory}
//                                 activeTab={activeTab}
//                                 setActiveTab={setActiveTab}
//                             />
//                         </div>

//                         {/* Nội dung bên dưới */}
//                         <div className="pt-[120px]">
//                             <Outlet />
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </>
//     );
// }
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SildebarManager from '../../components/manager/sildebarLeft/SildebarLeft';
import Tab from '../../components/manager/tab/tab';

export default function Manager() {
    const navigate = useNavigate();
    const [history, setHistory] = useState(["Dashboard"]);
    const [activeTab, setActiveTab] = useState("Dashboard");

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
