import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/Web/Navigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../../store/authSlice"; // Import action mở modal
import { toast } from "react-toastify"; // Import toast
import { Tooltip } from "react-tooltip"; // Thêm import này
import StartButton from "../Chat/StartButton"; // Import StartButton component
const NavigaForWeb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ Lấy role từ Redux
  const userRole = useSelector((state) => state.auth.userRole);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userRole);

  useEffect(() => {
    setIsLoggedIn(!!userRole);
  }, [userRole]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Chặn Doctor, Staff, Manager không được làm test
  const handleTestClick = (event) => {
    if (["Doctor", "Staff", "Manager"].includes(userRole)) {
      event.preventDefault(); // Chặn chuyển trang
      toast.warning("Bạn không thể truy cập vào bài kiểm tra!"); // Hiển thị thông báo
    }
  };

  const handleComingSoon = (e) => {
    e.preventDefault();
    toast.info("Coming Soon! This feature is under development.", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <nav className="ml-8 flex items-center px-6 py-5 rounded-2xl bg-white shadow-[0px_5px_4px_-5px_#00000041]">
      {/* Left Navigation */}
      <div className="flex space-x-10 text-gray-600 font-medium items-center">
        {/* location.pathname === "/HomeUser/TestQuestionList" */}
        <a
          href="#"
          onClick={handleComingSoon}
          className="hover:text-purple-500 cursor-pointer relative group"
          data-tooltip-id="coming-soon-tooltip"
          data-tooltip-content="Coming Soon!">
          Game
          <span className="absolute -top-2 -right-4 bg-yellow-400 text-xs px-1 rounded-full text-white">
            Soon
          </span>
        </a>
        <Link
          to="learnAboutEmo"
          className={`hover:text-purple-500 ${
            location.pathname === "/HomeUser/learnAboutEmo"
              ? "text-purple-500"
              : ""
          }`}>
          Learn about EmoEase
        </Link>
        <a
          href="#"
          onClick={handleComingSoon}
          className="hover:text-purple-500 cursor-pointer relative group"
          data-tooltip-id="coming-soon-tooltip"
          data-tooltip-content="Coming Soon!">
          Therapist
          <span className="absolute -top-2 -right-4 bg-yellow-400 text-xs px-1 rounded-full text-white">
            Soon
          </span>
        </a>
      </div>

      {/* Logo */}
      <div className="flex-grow flex justify-center mx-10">
        <div
          className={`${styles.knewave} text-[#4a2580] font-light text-5xl tracking-widest`}>
          EMOEASE
        </div>
      </div>

      {/* Right Navigation */}
      <div className="flex space-x-15 text-gray-600 font-medium items-center">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block cursor-pointer group"
            data-tooltip-id="coming-soon-tooltip"
            data-tooltip-content="Coming Soon!"
            aria-expanded={isOpen}>
            Extras
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md border z-999">
              <a
                href="#"
                onClick={handleComingSoon}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Workshop
                <span className="ml-2 text-xs text-yellow-600">
                  (Coming Soon)
                </span>
              </a>
              <a
                href="#"
                onClick={handleComingSoon}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Blog
                <span className="ml-2 text-xs text-yellow-600">
                  (Coming Soon)
                </span>
              </a>
            </div>
          )}
        </div>

        <Link to="shop" className="hover:text-purple-500">
          Store
        </Link>

        {/* Test button */}
        {isLoggedIn ? (
          <Link to="/AIChatBoxWithEmo" onClick={handleTestClick}>
            <StartButton />
          </Link>
        ) : (
          <StartButton onClick={() => dispatch(openLoginModal())} />
        )}
      </div>

      <Tooltip id="coming-soon-tooltip" place="top" effect="solid" />
    </nav>
  );
};

export default NavigaForWeb;
