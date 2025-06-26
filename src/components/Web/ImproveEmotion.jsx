import React from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
const ImproveEmotion = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen mt-10">
      <span className="text-xl font-thin">Small steps, big changes</span>

      <h1
        className={`${styles.sourceSerif} text-5xl text-[#4F258A] max-w-[750px] text-center mt-7`}>
        Live Lightly Every Day with Us
      </h1>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="flex gap-15 mt-15">
        <div className=" mt-10 w-[300px] h-[400px] bg-[#efe89a] rounded-2xl">
          <h1 className={`${styles.listenYour} py-5 px-13`}>
            Listen to Your Breath, Free Your Mind.
          </h1>
          <p className="box-border px-4 ">
            Try deep breathing, meditation, or yoga to relieve stress. Just a
            few minutes each day can bring noticeable positive changes to your
            mind and body.
          </p>
          <img
            // src={`${import.meta.env.VITE_API_CDN_URL}FreeYourMind.png`}
            src="/FreeYourMind.png"
            alt=""
            className="scale-150 mt-5"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className=" w-[300px] h-[400px] bg-[#AAE2F6] rounded-2xl">
          <h1 className={`${styles.listenYour} py-5 px-13`}>
            Share to Lighten the Burden
          </h1>
          <p className="box-border px-4 ">
            When you feel overwhelmed, talking to friends or loved ones or
            keeping a journal can help ease your emotional load. Don’t bottle
            everything up – let your words set you free!
          </p>
          <img
            // src={`${import.meta.env.VITE_API_CDN_URL}SharetoLighten.png`}
            src="/SharetoLighten.png"
            alt=""
            className="scale-150 mt-5"
          />
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className=" mt-10 w-[300px] h-[400px] bg-[#E4C1F9] rounded-2xl">
          <h1 className={`${styles.listenYour} py-5 px-13`}>
            A Healthy Life for a Peaceful Mind
          </h1>
          <p className="box-border px-4 ">
            Maintaining a regular sleep schedule, a balanced diet, and limiting
            caffeine intake can help you manage your emotions better
          </p>
          <img
            // src={`${import.meta.env.VITE_API_CDN_URL}AHealthyLife.png`}
            src="/AHealthyLife.png"
            alt=""
            className="scale-150 mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ImproveEmotion;
