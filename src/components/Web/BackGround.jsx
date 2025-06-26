import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Web/BackGround.module.css";
import DownloadSection from "./DownloadSection";
import IntrFPT from "./IntrFPT";
import IssueEmotion from "./IssueEmotion";
import OptionService from "./OptionService";
import ImproveEmotion from "./ImproveEmotion";
import QuestionRequest from "./QuestionRequest";
import GoogleMapComponent from "../GoogleMap/GoogleMapComponent";

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
      <div className="relative w-full h-[150vh] overflow-hidden">
        {/* Nền chính - Không di chuyển */}
        <div className="absolute top-50 left-0 w-full h-screen">
          <img
            // src={`${import.meta.env.VITE_API_CDN_URL}bg_HomeCenter.webp`}
            src="/bg_HomeCenter.webp"
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
          // src={`${import.meta.env.VITE_API_CDN_URL}bg_HomeUnder.webp`}
          src="/bg_HomeUnder.webp"
          alt=""
          animate={{ y: -scrollY * 0.3 }}
          className="absolute top-[30%] left-0 w-full h-[120vh] scale-100 object-cover"
        />

        <motion.img
          // src={`${import.meta.env.VITE_API_CDN_URL}bg_HomeBottomRight.webp`}
          src="/bg_HomeBottomRight.webp"
          alt=""
          animate={{ y: -scrollY * 0.1 }}
          className="absolute top-[21%] left-0 w-full h-[120vh] scale-110 object-cover"
        />
      </div>

      <IntrFPT />
      <IssueEmotion />
      <ImproveEmotion />
      <OptionService />
      <QuestionRequest />
      <GoogleMapComponent />
    </>
  );
};

export default BackGround;
