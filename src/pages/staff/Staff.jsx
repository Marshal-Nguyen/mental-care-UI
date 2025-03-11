import React, { useState, useEffect } from "react";
import Navbar from "../../components/staff/navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Staff() {
    const navigate = useNavigate();
    useEffect(() => {
        const Authorization = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (!Authorization || role !== 'Staff') {
            navigate('/HomeUser');
        }
    }, [navigate]);
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-center py-4">
                <Navbar />
            </header>
            <main className="flex-auto overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
