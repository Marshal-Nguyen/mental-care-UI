import React from 'react';
import SildebarManager from '../../components/manager/SildebarLeftManager';
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


    return (
        <>
            <div className="w-full flex h-[100vh] bg-gray-100">
                <SildebarManager />
                <div className="flex-auto border overflow-y-auto">
                    <div>
                        <div className="fixed top-0 left-0 w-full flex justify-end space-x-2 px-[30px] py-[5px] bg-white border border-gray-300 z-10">
                            <span className="text-blue-800 text-lg font-medium">{localStorage.getItem("name")} (Manager)</span>
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
