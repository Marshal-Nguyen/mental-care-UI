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
            className="absolute w-[230px] text-[#3d1085]  h-[280px] rounded-2xl top-[-10%] left-[17%] border border-[#3d1085]">
            <span className="text-xl font-semibold text-white bg-gradient-to-b from-pink-300 to-purple-500 px-2 py-1 rounded-md shadow-sm border border-[#3d1085]">
              🔹 Mood Swings
            </span>
            <p className="mt-2 text-md p-2">Easily irritated, feeling sad without reason, or losing interest in activities.</p>
          </div>

          <div
            data-aos="fade-right"
            className="absolute w-[340px] h-[200px] text-[#3d1085] rounded-2xl bottom-[-15%] left-[5%] border border-[#3d1085]">
            <span className="text-xl font-semibold text-white bg-gradient-to-b from-pink-300 to-purple-500 px-2 py-1 rounded-md shadow-sm border border-[#3d1085]">🔹 Stress and Burnout</span>
            <p className="mt-2 text-md p-2">Feeling overwhelmed, drained, and struggling to focus on tasks.</p>
          </div>
          <div
            data-aos="fade-left"
            className="absolute w-[340px] h-[200px] text-[#3d1085]  rounded-2xl top-[-10%] right-[5%] border border-[#3d1085]">
            <span className="text-xl font-semibold text-white bg-gradient-to-b from-pink-300 to-purple-500 px-2 py-1 rounded-md shadow-sm border border-[#3d1085]">🔹 Sleep and Eating Disorders</span>
            <p className="mt-2 text-md p-2">Experiencing insomnia, oversleeping, irregular eating habits, or sudden weight changes.</p>
          </div>
          <div
            data-aos="fade-left"
            className="absolute w-[270px] h-[280px] text-[#3d1085]  rounded-2xl bottom-[-15%] right-[13%] border border-[#3d1085]">
            <span className="text-xl font-semibold text-white bg-gradient-to-b from-pink-300 to-purple-500 px-2 py-1 rounded-md shadow-sm border border-[#3d1085]">🔹 Social Withdrawal</span>
            <p className="mt-2 text-md p-2">Avoiding interactions, isolating yourself, and feeling lonely even around others.</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueEmotion;
