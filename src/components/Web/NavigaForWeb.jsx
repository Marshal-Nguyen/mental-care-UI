import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Web/Navigation.module.css";
const NavigaForWeb = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center px-6 py-5 rounded-2xl bg-white shadow-[0px_5px_4px_-5px_#00000041]">
      {/* Left Navigation */}
      <div className="flex space-x-10 text-gray-600 font-medium items-center">
        <div />
        <Link to="learnAboutEmo" className="hover:text-purple-500">
          Learn about EmoEase
        </Link>
        <Link to="counselor" className="hover:text-purple-500">
          Counselor
        </Link>

      </div>

      {/* Khoảng trống giúp căn giữa logo */}
      <div className="flex-grow flex justify-center mx-10">
        <div
          className={`${styles.knewave} text-[#9553f2] font-light text-5xl tracking-widest`}>
          EMOEASE
        </div>
      </div>

      {/* Right Navigation */}
      <div className="flex space-x-15 text-gray-600 font-medium items-center">
        {/* <Link to="service" className="hover:text-purple-500">
          Services
        </Link> */} <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-purple-500"
          >
            Services
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md border">
              <Link
                to="workshop"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Workshop
              </Link>
              <Link to="shop" className="block px-4 py-2 hover:bg-gray-100">
                Shop
              </Link>
            </div>
          )}
        </div>
        <Link to="blog" className="hover:text-purple-500">
          Blog
        </Link>
        {/* <Link to="workshop" className="hover:text-purple-500">
          Workshop
        </Link>
        <Link to="shop" className="hover:text-purple-500">
          Shop
        </Link> */}
        <Link
          to="testEmotion"
          className="bg-[#9553f2] text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700">
          Take the test
        </Link>
      </div>
    </nav>
  );
};

export default NavigaForWeb;
