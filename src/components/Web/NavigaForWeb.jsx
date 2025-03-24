import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/Web/Navigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../../store/authSlice"; // Import action mở modal

const NavigaForWeb = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  // ✅ Lấy trạng thái đăng nhập từ Redux store
  const userRole = useSelector((state) => state.auth.userRole);
  const [isLoggedIn, setIsLoggedIn] = useState(!!userRole);

  useEffect(() => {
    setIsLoggedIn(!!userRole);
  }, [userRole]); // Theo dõi userRole

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

  return (
    <nav className="ml-8 flex items-center px-6 py-5 rounded-2xl bg-white shadow-[0px_5px_4px_-5px_#00000041]">
      {/* Left Navigation */}
      <div className="flex space-x-10 text-gray-600 font-medium items-center">
        <Link
          to="TestQuestionList"
          className={`hover:text-purple-500 ${
            location.pathname === "/HomeUser/TestQuestionList"
              ? "text-purple-500"
              : ""
          }`}>
          Game
        </Link>
        <Link
          to="learnAboutEmo"
          className={`hover:text-purple-500 ${
            location.pathname === "/HomeUser/learnAboutEmo"
              ? "text-purple-500"
              : ""
          }`}>
          Learn about EmoEase
        </Link>
        <Link
          to="counselor"
          className={`hover:text-purple-500 ${
            location.pathname === "/HomeUser/counselor" ? "text-purple-500" : ""
          }`}>
          Therapist
        </Link>
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
            className={`block cursor-pointer ${
              location.pathname === "/HomeUser/workshop"
                ? "text-purple-500"
                : ""
            }`}
            aria-expanded={isOpen}>
            Extras
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md border z-999">
              <Link
                onClick={() => setIsOpen(false)}
                to="workshop"
                className={`block px-4 py-2 hover:bg-gray-100 ${
                  location.pathname === "/workshop" ? "text-purple-500" : ""
                }`}>
                Workshop
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="shop"
                className={`block px-4 py-2 hover:bg-gray-100 hover:rounded-md ${
                  location.pathname === "/shop" ? "text-purple-500" : ""
                }`}>
                Store
              </Link>
            </div>
          )}
        </div>
        <Link
          to="blog"
          className={`hover:text-purple-500 ${
            location.pathname === "/blog" ? "text-purple-500" : ""
          }`}>
          Blog
        </Link>

        {/* ✅ Check trạng thái đăng nhập */}
        {isLoggedIn ? (
          <Link
            to="testEmotion"
            className="bg-[#9553f2] text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700">
            Take the test
          </Link>
        ) : (
          <button
            onClick={() => dispatch(openLoginModal())}
            className="bg-[#9553f2] text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700">
            Take the test
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavigaForWeb;
