import React, { useState } from "react";
import Navbar from "../../components/staff/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Manager() {

    return (
        <div className="w-full h-screen flex flex-col bg-gray-100">
            {/* Navbar cố định trên */}
            <Navbar className=" fixed top-0 left-0 bg-white shadow-md z-10" />

            {/* Nội dung chính (Outlet) có margin-top để tránh bị navbar che mất */}
            <div className="flex-auto overflow-y-auto  ">
                <Outlet />
            </div>
        </div>
    );
}
