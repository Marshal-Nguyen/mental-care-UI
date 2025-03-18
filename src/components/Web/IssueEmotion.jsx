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
            data-aos="fade-down"
            className="absolute w-[230px] text-[#3d1085] h-[280px] rounded-2xl top-[-10%] left-[17%] border border-[#3d1085] p-4 flex flex-col justify-center items-center text-center">
            <h3 className={`${styles.listenYour} font-bold text-lg`}>
              When You Feel Overwhelmed
            </h3>
            <p className="text-sm mt-2 italic">
              "Don’t let your mind become an overflowing cup. Pause, breathe,
              and let go of what’s unnecessary."
            </p>
          </div>

          <div
            data-aos="fade-right"
            className="absolute w-[340px] h-[200px] text-[#3d1085] rounded-2xl bottom-[-15%] left-[5%] border border-[#3d1085] p-4 flex flex-col justify-center items-center text-center">
            <h3 className={`${styles.listenYour} font-bold text-lg`}>
              When You Lose Connection
            </h3>
            <p className="text-sm mt-2 italic">
              "We spend so much time understanding others but forget to ask:
              ‘What do I truly want?’"
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="absolute w-[340px] h-[200px] text-[#3d1085] rounded-2xl top-[-10%] right-[5%] border border-[#3d1085] p-4 flex flex-col justify-center items-center text-center">
            <h3 className={`${styles.listenYour} font-bold text-lg`}>
              When Small Joys Fade
            </h3>
            <p className="text-sm mt-2 italic">
              "Life hasn’t lost its colors—your eyes are just tired."
            </p>
          </div>

          <div
            data-aos="fade-up"
            className="absolute w-[230px] h-[280px] text-[#3d1085] rounded-2xl bottom-[-15%] right-[13%] border border-[#3d1085] p-4 flex flex-col justify-center items-center text-center">
            <h3 className={`${styles.listenYour} font-bold text-lg`}>
              When Emotions Take Over
            </h3>
            <p className="text-sm mt-2 italic">
              "Your emotions aren’t the enemy—they are messages from your
              heart."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueEmotion;
