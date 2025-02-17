import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../../styles/Web/Navigation.module.css";
const App = () => {
    return (
        <nav className="w-full bg-white px-10 py-3 rounded-4xl shadow-md">
            <div className="flex justify-between items-center w-full">
                {/* Logo với hiệu ứng chạy từ giữa ra trái */}
                <motion.div
                    initial={{ x: "300%", opacity: 0 }} // Bắt đầu ở giữa, ẩn đi
                    animate={{ x: 0, opacity: 1 }} // Chạy về vị trí cũ
                    transition={{ duration: 2, ease: "easeOut" }} // Chạy trong 1 giây
                    className={`${styles.knewave} text-[#9553f2] font-light text-5xl tracking-widest`}
                >
                    EMOEASE
                </motion.div>

                {/* Left Navigation */}
                <motion.div
                    initial={{ opacity: 0 }} // Bắt đầu ở giữa, ẩn đi
                    animate={{ opacity: 1 }} // Chạy về vị trí cũ
                    transition={{ duration: 2, ease: "easeOut" }} // Chạy trong 1 giây
                    className="flex gap-x-10 text-gray-600 font-medium"
                >
                    <Link to="home" className="hover:text-purple-500">Home</Link>
                    <Link to="dashboard" className="hover:text-purple-500">Dashboard</Link>
                    <Link to="customer" className="hover:text-purple-500">List Of Customer</Link>
                    <Link to="message" className="hover:text-purple-500">Message</Link>
                    <Link to="home" className="hover:text-purple-500">Blog</Link>
                </motion.div>
                {/* <div className="flex gap-x-10 text-gray-600 font-medium">
                    <Link to="home" className="hover:text-purple-500">Home</Link>
                    <Link to="dashboard" className="hover:text-purple-500">Dashboard</Link>
                    <Link to="customer" className="hover:text-purple-500">List Of Customer</Link>
                    <Link to="message" className="hover:text-purple-500">Message</Link>
                    <Link to="home" className="hover:text-purple-500">Blog</Link>
                </div> */}

                {/* Right Navigation */}
                <div className="flex gap-x-10 text-gray-600 font-medium">
                    <Link
                        to="home"
                        className="bg-[#9553f2] text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700"
                    >
                        Take the test
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default App;
