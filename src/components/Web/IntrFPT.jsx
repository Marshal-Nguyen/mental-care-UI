import React from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
const IntrFPT = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen mt-2">
      <span className="text-xl font-thin">Get to know Emo</span>

      <h1
        className={`${styles.sourceSerif} text-5xl text-[#4F258A] max-w-[750px] text-center mt-7`}>
        We exist to support lifelong mental well-being and resilience.
      </h1>

      <div className="grid grid-cols-2 px-20 mt-10 w-full ">
        <div className="flex flex-col items-center justify-center ">
          <div className={styles.buttonParrot}>
            <button className={styles.button}>
              Stories by Emo
              <div className={styles.parrot}></div>
              <div className={styles.parrot}></div>
              <div className={styles.parrot}></div>
              <div className={styles.parrot}></div>
              <div className={styles.parrot}></div>
              <div className={styles.parrot}></div>
            </button>
          </div>
          <p
            data-aos="zoom-out"
            className="mt-10 ml-5 max-w-2xl text-[20px] font-thin">
            EmoEase is a mental health support and counseling application
            specifically designed for FPT University students. Leveraging the
            power of Artificial Intelligence (AI), EmoEase creates personalized
            mental health improvement plans, helping students maintain a
            positive psychological state through tailored assessments,
            customized activities, and professional counseling services.
          </p>
        </div>
        <div
          data-aos="zoom-in-up"
          className="flex justify-center items-center text-lg">
          <div className="relative w-[400px]">
            {/* Hình ảnh chính */}
            <div className="w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <img
                // src={import.meta.env.VITE_API_CDN_URL + "fpt.jpeg"}
                src="/fpt.jpeg"
                alt="FPT Campus"
                className="w-full h-full object-cover object-left border-white rounded-2xl border-[10px]"
              />
            </div>

            {/* Hình ảnh nhỏ (overlay) */}
            <div className="absolute bottom-[-60px] right-[-100px] w-[250px] h-[250px] rounded-xl shadow-md overflow-hidden">
              <img
                // src={
                //   import.meta.env.VITE_API_CDN_URL + "image_IntroduceExe.webp"
                // }
                src="/image_IntroduceExe.webp"
                alt="Trải nghiệm khởi nghiệp"
                className="w-full h-full object-cover object-left border-white rounded-2xl border-[10px] "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntrFPT;
