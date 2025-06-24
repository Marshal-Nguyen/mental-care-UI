import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodQuestion } from "../../../components/IntroComponents/MoodOption";
import { SleepQuestion } from "../../../components/IntroComponents/SleepOption";
import { WelcomePopup } from "../../../components/IntroComponents/WelcomePopup";
import { MOOD_OPTIONS, SLEEP_OPTIONS } from "../../../constants/introData";
import { useAudio } from "../../../hooks/useAudio";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";

const Intro = () => {
  const questionRef = useRef(null);
  const question2Ref = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_LIFESTYLE_URL;
  const { currentStep, formData, goToNext, updateFormData } =
    useMultiStepForm(3);
  const {
    playing,
    muted,
    toggle: toggleAudio,
    toggleMute,
  } = useAudio("/sounds/chill.mp3");

  const closeWelcomeAndStart = () => {
    setShowWelcomePopup(false);
    if (!playing) toggleAudio();

    setTimeout(() => {
      if (questionRef.current) {
        questionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 500);
  };

  // Hàm này chỉ cập nhật state, KHÔNG gửi API và chuyển câu hỏi
  const handleMoodSelect = (moods) => {
    setSelectedMoods(moods); // Chỉ cập nhật mảng mood đã chọn
  };

  // Hàm mới để xử lý sự kiện khi người dùng nhấn nút Xác nhận
  const handleMoodConfirm = async () => {
    await sendEmotionData(); // Gửi API khi người dùng nhấn xác nhận
    goToNext(); // Chuyển sang câu hỏi 2

    setTimeout(() => {
      if (question2Ref.current) {
        question2Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleSleepSelect = (duration) => {
    updateFormData("sleepDuration", duration);
    goToNext();
  };

  const sendEmotionData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/current-emotions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientProfileId: localStorage.getItem("profileId"),
          emotion1: selectedMoods[0] || null,
          emotion2: selectedMoods[1] || null,
        }),
      });
      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error sending emotion data:", error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center h-screen relative"
      style={{
        backgroundImage: `url('/bg_Question.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      {!showWelcomePopup && (
        <MuteButton isMuted={muted} onToggle={toggleMute} />
      )}

      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50">
            <WelcomePopup onClose={closeWelcomeAndStart} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showWelcomePopup && currentStep === 0 && (
        <MoodQuestion
          ref={questionRef}
          selectedMoods={selectedMoods}
          onMoodSelect={handleMoodSelect}
          onConfirm={handleMoodConfirm} // Truyền hàm xử lý xác nhận mới
          moodOptions={MOOD_OPTIONS}
        />
      )}

      {!showWelcomePopup && currentStep === 1 && (
        <SleepQuestion
          ref={question2Ref}
          selectedDuration={formData.sleepDuration}
          onDurationSelect={handleSleepSelect}
          sleepOptions={SLEEP_OPTIONS}
        />
      )}
    </div>
  );
};

const MuteButton = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all">
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            clipRule="evenodd"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  );
};

export default Intro;
