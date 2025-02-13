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
    <>
      <div>
        <DownloadSection />
      </div>
      <div
        className={`${styles.background} relative w-screen h-screen overflow-hidden`}>
        {/* Ảnh 1 - Xa nhất, di chuyển ít nhất */}
        <motion.img
          src="/2.png"
          alt=""
          animate={{ y: -scrollY * 0.1 }}
          className={`${styles.layer} absolute top-0 left-0 w-full h-[120vh] object-cover`}
        />
        {/* Ảnh 2 - Gần hơn, di chuyển nhanh hơn */}
        <motion.img
          src="/4.png"
          alt=""
          animate={{ y: -scrollY * 0.2 }}
          className={`${styles.layer} absolute top-[40%] left-[5%] w-full h-[120vh] scale-120 object-cover`}
        />
        {/* Ảnh 3 - Gần nhất, di chuyển nhanh nhất */}
        <motion.img
          src="/3.png"
          alt=""
          animate={{ y: -scrollY * 0.3 }}
          className={`${styles.layer} absolute top-[30%] left-[-5%] w-full h-[120vh] scale-135 object-cover`}
        />

        {/* Lớp phủ tối màu để tránh lộ khoảng trống */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
    </>
  );
};

export default BackGround;
