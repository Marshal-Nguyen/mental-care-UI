import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Web/BackGround.module.css";
import DownloadSection from "./DownloadSection";

const BackGround = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-screen h-[160vh] overflow-hidden">
      {/* Nền chính - Không di chuyển */}
      <div className="absolute top-30 left-0 w-full h-screen">
        <img
          src="/2.png"
          alt=""
          className="w-full h-full scale-125 object-cover"
        />
      </div>

      {/* Component DownloadSection nằm chính giữa ảnh nền */}
      <div className="absolute top-1/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <DownloadSection />
      </div>

      {/* Các lớp ảnh di chuyển */}
      <motion.img
        src="/4.png"
        alt=""
        animate={{ y: -scrollY * 0.2 }}
        className="absolute top-[40%] left-[5%] w-full h-[120vh] scale-140 object-cover"
      />

      <motion.img
        src="/3.png"
        alt=""
        animate={{ y: -scrollY * 0.3 }}
        className="absolute top-[40%] left-[-5%] w-full h-[120vh] scale-140 object-cover"
      />

      <motion.img
        src="/5P0yf46mR9Xn8sL5xA0qFSA.avif"
        alt=""
        animate={{ y: -scrollY * 0.4 }}
        className="absolute top-[120%] left-[-5%] w-full h-[120vh] scale-140 object-cover"
      />
    </div>
  );
};

export default BackGround;
