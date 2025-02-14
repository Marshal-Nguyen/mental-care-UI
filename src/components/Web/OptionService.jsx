import React from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
const OptionService = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen mt-10 ">
      <span className="text-xl font-thin">Get to know Emo</span>

      <h1
        className={`${styles.sourceSerif} text-5xl text-[#4F258A] max-w-[750px] text-center mt-7`}>
        We exist to support lifelong mental well-being and resilience.
      </h1>
    </div>
  );
};

export default OptionService;
