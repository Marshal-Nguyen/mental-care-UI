import React from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
const IssueEmotion = () => {
  return (
    <div className="w-full h-screen flex flex-col mt-5">
      {/* Tiêu đề (chiếm ít không gian) */}
      <div className="flex-none flex flex-col items-center justify-center py-10">
        <h1
          className={`${styles.sourceSerif} text-5xl text-[#4F258A] max-w-[750px] text-center mt-7`}>
          When Does Your Mental Health Need Care?
        </h1>
      </div>

      {/* Grid Layout (chiếm toàn bộ không gian còn lại) */}
      <div className="flexw-full">
        <div className="relative text-center w-full flex justify-center">
          <img
            src="/IssueCenter.png"
            alt="FPT Campus"
            className="w-[50%] h-full object-cover object-left"
          />
          <div
            data-aos="fade-right"
            className="absolute w-[230px] h-[280px] rounded-2xl top-[-10%] left-[17%] border border-[#3d1085]"></div>
          <div
            data-aos="fade-right"
            className="absolute w-[340px] h-[200px] rounded-2xl bottom-[-15%] left-[5%] border border-[#3d1085]"></div>
          <div
            data-aos="fade-left"
            className="absolute w-[340px] h-[200px] rounded-2xl top-[-10%] right-[5%] border border-[#3d1085]"></div>
          <div
            data-aos="fade-left"
            className="absolute w-[230px] h-[280px] rounded-2xl bottom-[-15%] right-[17%] border border-[#3d1085]"></div>
        </div>
      </div>
    </div>
  );
};

export default IssueEmotion;
