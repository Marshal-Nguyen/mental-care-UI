import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Web/Navigation.module.css";
const NavigaForWeb = () => {
  return (
    <nav className="flex items-center px-6 py-5  bg-white   rounded-4xl ">
      {/* Left Navigation */}
      <div className="flex space-x-20 text-gray-600 font-medium items-center">
        <Link to="/TestEmo" className="text-[#9553f2]">
          <img src="public/eye-svgrepo-com.svg" alt="" className="h-10" />
        </Link>
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
      <div className="flex space-x-20 text-gray-600 font-medium items-center">
        <Link to="service" className="hover:text-purple-500">
          Services
        </Link>
        <Link to="blog" className="hover:text-purple-500">
          Blog
        </Link>
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
