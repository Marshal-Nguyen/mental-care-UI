import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.png'
import { sidebarMenuManager } from '../../util/menu/MenuManage'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

// import { BiLogOut } from "react-icons/bi";// logout

const SildebarManager = () => {
    const [isReportOpen, setIsReportOpen] = useState(null);
    const [isExpanded, setIsExpanded] = useState(true);
    const handleReportOpenToggle = (menuItem) => {
        setIsReportOpen((prevState) => {
            if (prevState === menuItem) {
                return null;
            } else {
                return menuItem;
            }
        });
    };
    const handleLogOut = () => {
        localStorage.clear();

    }
    return (
        // <div className="bg-white text-black flex flex-col w-60 h-full">
        //     <div className="w-full mb-14 h-20 py-12 flex flex-col gap-2 font-serif text-blue-800 text-2xl justify-center items-center ">
        //         {/* <img className="mt-12 w-24 object-contain" src={logo} alt="Logo" /> */}
        //         <span className='font-bold' >Jewelry Store</span>
        //     </div>
        //     <div className="flex flex-col h-full">
        //         <div className="flex-grow">
        //             {sidebarMenuManager.map(item => (
        //                 <div key={item.path} className='my-2'>
        //                     <NavLink
        //                         to={item.path}
        //                         end={item.end}
        //                         value={item.text}
        //                         className={({ isActive }) => isActive && (item.text !== 'Report' && item.text !== 'Manage' && item.text !== 'Material Price' && item.text !== 'Promotion' && item.text !== 'Product' && item.text !== 'Warehouse') ? 'text-blue-600 font-bold' : 'text-black'}
        //                         onClick={
        //                             item.text === 'Report'
        //                                 ? () => handleReportOpenToggle('report')
        //                                 : item.text === 'Warehouse'
        //                                     ? () => handleReportOpenToggle('warehouseManager')
        //                                     : item.text === 'Promotion'
        //                                         ? () => handleReportOpenToggle('promotion')
        //                                         : () => handleReportOpenToggle('')
        //                         }
        //                     >
        //                         <div className="flex items-center w-full p-2 hover:bg-gray-100 rounded">
        //                             {item.iconAdmin}
        //                             <span className="ml-4 text-lg">{item.text}</span>
        //                             <span className='ml-auto'>
        //                                 {isReportOpen === 'report' && item.text === 'Report'
        //                                     ? item.iconAdmin3
        //                                     : isReportOpen === 'warehouseManager' && item.text === 'Warehouse'
        //                                         ? item.iconAdmin3
        //                                         : isReportOpen === 'promotion' && item.text === 'Promotion'
        //                                             ? item.iconAdmin3
        //                                             : item.iconAdmin2}
        //                             </span>
        //                         </div>

        //                     </NavLink>
        //                     <div
        //                         className={`transition-all duration-1000 ease-in-out overflow-hidden
        //          ${isReportOpen === 'report' && item.text === 'Report' ? 'max-h-screen opacity-100 delay-2000' : 'max-h-0 opacity-0 delay-2000'}`}
        //                     >
        //                         {isReportOpen === 'report' && item.text === 'Report' && item.subMenu.length > 0 && (
        //                             <div className="pl-8">
        //                                 {item.subMenu.map(subItem => (
        //                                     <NavLink
        //                                         to={subItem.path}
        //                                         key={subItem.path}
        //                                         className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-black'}
        //                                     >
        //                                         <div className="flex items-center my-4 px-2 hover:bg-gray-100 rounded">
        //                                             {subItem.iconAdmin}
        //                                             <span className="ml-4">{subItem.text}</span>
        //                                         </div>
        //                                     </NavLink>
        //                                 ))}
        //                             </div>
        //                         )}
        //                     </div>
        //                     <div
        //                         className={`transition-all duration-1000 ease-in-out overflow-hidden
        //          ${isReportOpen === 'materialPrice' && item.text === 'Material Price' ? 'max-h-screen opacity-100 delay-2000' : 'max-h-0 opacity-0 delay-2000'}`}
        //                     >
        //                         {isReportOpen === 'materialPrice' && item.text === 'Material Price' && item.subMenu.length > 0 && (
        //                             <div className="pl-8">
        //                                 {item.subMenu.map(subItem => (
        //                                     <NavLink
        //                                         to={subItem.path}
        //                                         key={subItem.path}
        //                                         className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-black'}
        //                                     >
        //                                         <div className="flex items-center my-4 px-2 hover:bg-gray-100 rounded">
        //                                             {subItem.iconAdmin}
        //                                             <span className="ml-4">{subItem.text}</span>
        //                                         </div>
        //                                     </NavLink>
        //                                 ))}
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>
        //         <NavLink
        //             to="/login"
        //             onClick={handleLogOut}
        //             className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'text-black')}
        //         >
        //             <div className="flex items-center w-full p-2 my-3 hover:bg-gray-100 rounded">
        //                 <span className="ml-4 text-lg">Logout</span>
        //             </div>
        //         </NavLink>
        //     </div>

        // </div >
        <div
            className={`bg-white text-black flex flex-col h-full z-20 ${isExpanded ? "w-60" : "w-16"
                } transition-all duration-300 border-r border-gray-300 relative`}
        >
            {/* Nút thu nhỏ/mở rộng */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute top-4 -right-3 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-sm text-gray-600 shadow-md hover:bg-gray-400 transition"
            >
                {isExpanded ? "<" : ">"}
            </button>

            {/* Logo */}
            <div className="w-full mb-14 h-20 py-12 flex flex-col gap-2 font-serif text-blue-800 text-2xl justify-center items-center ">
                <img
                    className={`object-contain ${isExpanded ? "w-24" : "w-12"
                        } transition-all duration-300`}
                    src={logo}
                    alt="Logo"
                />
                <span className={`font-bold ${isExpanded ? "block" : "hidden"}`} >Jewelry Store</span>
            </div>


            {/* Menu Items */}
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    {sidebarMenuManager.map((item) => (
                        <div key={item.path} className="my-2">
                            <NavLink
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) =>
                                    isActive ? "text-blue-600 font-bold" : "text-black"
                                }
                                onClick={
                                    item.text === "Report"
                                        ? () => handleReportOpenToggle("report")
                                        : item.text === "Warehouse"
                                            ? () => handleReportOpenToggle("warehouseManager")
                                            : item.text === "Promotion"
                                                ? () => handleReportOpenToggle("promotion")
                                                : () => handleReportOpenToggle("")
                                }
                            >
                                <div className="flex items-center w-full p-2 hover:bg-gray-100 rounded">
                                    {/* Icon */}
                                    <div className="flex items-center justify-center w-6 h-6 text-lg">
                                        <FaUserDoctor />
                                    </div>

                                    {/* Text */}
                                    <span
                                        className={`ml-4 text-lg transition-all duration-300 ${isExpanded ? "block" : "hidden"
                                            }`}
                                    >
                                        {item.text}
                                    </span>
                                </div>
                            </NavLink>

                            {/* Submenu (nếu có) */}
                            {item.subMenu?.length > 0 && (
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isReportOpen === item.text.toLowerCase()
                                        ? "max-h-screen opacity-100"
                                        : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {isReportOpen === item.text.toLowerCase() && (
                                        <div className={`pl-8 ${isExpanded ? "block" : "hidden"}`}>
                                            {item.subMenu.map((subItem) => (
                                                <NavLink
                                                    to={subItem.path}
                                                    key={subItem.path}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "text-blue-600 font-bold"
                                                            : "text-black"
                                                    }
                                                >
                                                    <div className="flex items-center my-4 px-2 hover:bg-gray-100 rounded">
                                                        <div className="flex items-center justify-center w-6 h-6 text-lg">
                                                            {subItem.iconAdmin}
                                                        </div>
                                                        <span className="ml-4">{subItem.text}</span>
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Logout */}
                <NavLink
                    to="/login"
                    onClick={handleLogOut}
                    className={({ isActive }) =>
                        isActive ? "text-blue-600 font-bold" : "text-black"
                    }
                >
                    <div className="flex items-center w-full p-2 my-3 hover:bg-gray-100 rounded">
                        <div className="flex items-center justify-center w-6 h-6 text-lg">
                            <CiLogout />
                        </div>
                        <span
                            className={`ml-4 text-lg transition-all duration-300 ${isExpanded ? "block" : "hidden"
                                }`}
                        >
                            Logout
                        </span>
                    </div>
                </NavLink>
            </div>
        </div>

    )
}
export default SildebarManager
