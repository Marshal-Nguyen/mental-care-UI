import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodQuestion } from "../../../components/IntroComponents/MoodOption";
import { SleepQuestion } from "../../../components/IntroComponents/SleepOption";
import { ImprovementGoalQuestion } from "../../../components/IntroComponents/ImprovementGoalQuestion";
import { EntertainmentQuestion } from "../../../components/IntroComponents/EntertainmentQuestion";
import { FavoriteFoodQuestion } from "../../../components/IntroComponents/FavoriteFoodQuestion";
import { PhysicalActivityQuestion } from "../../../components/IntroComponents/PhysicalActivityQuestion";
import { TherapeuticActivityQuestion } from "../../../components/IntroComponents/TherapeuticActivityQuestion";
import { ThankYouScreen } from "../../../components/IntroComponents/ThankYouScreen";
import { WelcomePopup } from "../../../components/IntroComponents/WelcomePopup";
import {
  AvailableTimePerDay,
  SleepHoursLevel,
  ExerciseFrequency,
} from "../../../constants/introData";
import { useAudio } from "../../../hooks/useAudio";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";

const Intro = () => {
  const questionRef = useRef(null);
  const question2Ref = useRef(null);
  const question3Ref = useRef(null);
  const question4Ref = useRef(null);
  const question5Ref = useRef(null);
  const question6Ref = useRef(null);
  const question7Ref = useRef(null);
  const question8Ref = useRef(null);
  const question9Ref = useRef(null);
  const thankYouRef = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitError, setSubmitError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_LIFESTYLE_URL;
  const { currentStep, formData, goToNext, goToPrevious, updateFormData } =
    useMultiStepForm(10);
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

  const handleMoodSelect = (moods) => {
    setSelectedMoods(moods);
  };

  const sendEmotionData = async () => {
    try {
      console.log("Sending emotions:", selectedMoods);
      const emotions = selectedMoods.map((emotionId) => ({
        emotionId: emotionId,
        intensity: 0,
        rank: 0,
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${BASE_URL}/patients/${localStorage.getItem(
          "profileId"
        )}/emotion-checkpoints`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            emotions: emotions,
            logDate: new Date().toISOString(),
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Emotion API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Emotion API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending emotion data:", error);
      throw error;
    }
  };

  const sendLifestyleData = async () => {
    try {
      console.log("Sending lifestyle data:", formData);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BASE_URL}/lifestyle-logs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientProfileId: localStorage.getItem("profileId"),
          logDate: new Date().toISOString(),
          sleepHours: formData.sleepHours,
          exerciseFrequency: formData.exerciseFrequency,
          availableTimePerDay: formData.availableTimePerDay,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Lifestyle API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Lifestyle API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending lifestyle data:", error);
      throw error;
    }
  };

  const sendImprovementGoals = async () => {
    try {
      console.log("Sending improvement goals:", formData.improvementGoal);
      const goalIds = Array.isArray(formData.improvementGoal)
        ? formData.improvementGoal.slice(0, 2).map((id) => `${id}`)
        : [formData.improvementGoal].slice(0, 2).map((id) => `${id}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BASE_URL}/patient-improvement-goals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          patientProfileId: localStorage.getItem("profileId"),
          goalIds: goalIds,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Improvement goals API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Improvement goals API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending improvement goals:", error);
      throw error;
    }
  };

  const sendEntertainmentActivities = async () => {
    try {
      console.log(
        "Sending entertainment activities:",
        formData.entertainmentActivities
      );
      const activities = Array.isArray(formData.entertainmentActivities)
        ? formData.entertainmentActivities
        : [formData.entertainmentActivities];

      const payload = {
        patientProfileId: localStorage.getItem("profileId"),
        activities: activities.map((id) => ({
          entertainmentActivityId: id,
          preferenceLevel: "like",
        })),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${BASE_URL}/patient-entertainment-activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Entertainment API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Entertainment activities API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending entertainment activities:", error);
      throw error;
    }
  };

  const sendFoodActivities = async () => {
    try {
      console.log("Sending food activities:", formData.foodActivities);
      const activities = Array.isArray(formData.foodActivities)
        ? formData.foodActivities
        : [formData.foodActivities];

      const payload = {
        patientProfileId: localStorage.getItem("profileId"),
        activities: activities.map((id) => ({
          foodActivityId: id,
          preferenceLevel: "like",
        })),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BASE_URL}/patient-Food-activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Food API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Food activities API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending food activities:", error);
      throw error;
    }
  };

  const sendPhysicalActivities = async () => {
    try {
      console.log("Sending physical activities:", formData.physicalActivities);
      const activities = Array.isArray(formData.physicalActivities)
        ? formData.physicalActivities
        : [formData.physicalActivities];

      const payload = {
        patientProfileId: localStorage.getItem("profileId"),
        activities: activities.map((id) => ({
          physicalActivityId: id,
          preferenceLevel: "like",
        })),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${BASE_URL}/patient-physical-activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Physical activities API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Physical activities API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending physical activities:", error);
      throw error;
    }
  };

  const sendTherapeuticActivities = async () => {
    try {
      console.log(
        "Sending therapeutic activities:",
        formData.therapeuticActivities
      );
      const activities = Array.isArray(formData.therapeuticActivities)
        ? formData.therapeuticActivities
        : [formData.therapeuticActivities];

      const payload = {
        patientProfileId: localStorage.getItem("profileId"),
        activities: activities.map((id) => ({
          therapeuticActivityId: id,
          preferenceLevel: "like",
        })),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${BASE_URL}/patient-therapeutic-activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Therapeutic API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Therapeutic activities API response:", data);
      return true;
    } catch (error) {
      console.error("Error sending therapeutic activities:", error);
      throw error;
    }
  };

  const submitAllData = async () => {
    setIsSubmitting(true);
    setSubmitProgress(0);
    setSubmitError(null);
    
    const apiCalls = [
      { name: "Emotion Data", function: sendEmotionData },
      { name: "Lifestyle Data", function: sendLifestyleData },
      { name: "Improvement Goals", function: sendImprovementGoals },
      { name: "Entertainment Activities", function: sendEntertainmentActivities },
      { name: "Food Activities", function: sendFoodActivities },
      { name: "Physical Activities", function: sendPhysicalActivities },
      { name: "Therapeutic Activities", function: sendTherapeuticActivities }
    ];
    
    const totalCalls = apiCalls.length;
    let completedCalls = 0;
    
    try {
      for (const api of apiCalls) {
        try {
          console.log(`Sending ${api.name}...`);
          await api.function();
          completedCalls++;
          setSubmitProgress(Math.round((completedCalls / totalCalls) * 100));
        } catch (error) {
          console.error(`Error when submitting ${api.name}:`, error);
          throw new Error(`Failed to submit ${api.name}: ${error.message}`);
        }
      }
      
      console.log("All data submitted successfully!");
      goToNext();
      setTimeout(() => {
        if (thankYouRef.current) {
          thankYouRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    } catch (error) {
      console.error("Error during data submission:", error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMoodConfirm = () => {
    goToNext();
    setTimeout(() => {
      if (question2Ref.current) {
        question2Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleOptionSelect = (field, value) => {
    updateFormData(field, value);
    
    if (
      field !== "exerciseFrequency" &&
      field !== "improvementGoal" &&
      field !== "entertainmentActivities" &&
      field !== "foodActivities" &&
      field !== "physicalActivities" &&
      field !== "therapeuticActivities"
    ) {
      const currentStepBeforeChange = currentStep;
      goToNext();

      setTimeout(() => {
        const nextRef =
          currentStepBeforeChange === 0
            ? question2Ref
            : currentStepBeforeChange === 1
            ? question3Ref
            : currentStepBeforeChange === 2
            ? question4Ref
            : currentStepBeforeChange === 3
            ? question5Ref
            : currentStepBeforeChange === 4
            ? question6Ref
            : currentStepBeforeChange === 5
            ? question7Ref
            : currentStepBeforeChange === 6
            ? question8Ref
            : currentStepBeforeChange === 7
            ? question9Ref
            : thankYouRef;
        if (nextRef.current) {
          nextRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  };

  const handleExerciseConfirm = () => {
    goToNext();
    setTimeout(() => {
      if (question5Ref.current) {
        question5Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleGoalSubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question6Ref.current) {
        question6Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleEntertainmentSubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question7Ref.current) {
        question7Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleFoodSubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question8Ref.current) {
        question8Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handlePhysicalActivitySubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question9Ref.current) {
        question9Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleTherapeuticActivitySubmit = () => {
    submitAllData();
  };

  const SubmitProgressOverlay = ({ isSubmitting, progress, error }) => {
    if (!isSubmitting && !error) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl max-w-md w-full">
          {error ? (
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-3">❌</div>
              <h3 className="text-xl font-bold text-white mb-2">Đã xảy ra lỗi</h3>
              <p className="text-white/80 mb-4">{error}</p>
              <button 
                onClick={() => setSubmitError(null)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all">
                Thử lại
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4 relative">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-white mt-2">{progress}% hoàn thành</p>
              </div>
              <h3 className="text-xl font-bold text-white">Đang gửi dữ liệu...</h3>
              <p className="text-white/70 text-sm mt-2">
                Vui lòng đợi trong khi chúng tôi đang xử lý các câu trả lời của bạn
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/bg_Question.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <ProgressIndicator currentStep={currentStep} totalSteps={10} />
      {!showWelcomePopup && (
        <MuteButton isMuted={muted} onToggle={toggleMute} />
      )}
      {currentStep > 0 && currentStep < 9 && !showWelcomePopup && (
        <motion.button
          onClick={goToPrevious}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-4 left-4 bg-white/20 text-white px-4 py-2 rounded-lg flex items-center gap-2 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Quay lại
        </motion.button>
      )}

      <div className="absolute inset-0 bg-black/20 z-10"></div>

      <AnimatePresence mode="wait">
        {showWelcomePopup && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50">
            <WelcomePopup onClose={closeWelcomeAndStart} />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 0 && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <MoodQuestion
              ref={questionRef}
              selectedMoods={selectedMoods}
              onMoodSelect={handleMoodSelect}
              onConfirm={handleMoodConfirm}
              isLoading={false} // Không cần loading vì không gọi API
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 1 && (
          <motion.div
            key="available-time"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <SleepQuestion
              ref={question2Ref}
              currentQuestion="availableTimePerDay"
              formData={formData}
              onOptionSelect={(value) =>
                handleOptionSelect("availableTimePerDay", value)
              }
              options={AvailableTimePerDay}
              questionText="Bạn có bao nhiêu thời gian rảnh mỗi ngày?"
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 2 && (
          <motion.div
            key="sleep-hours"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <SleepQuestion
              ref={question3Ref}
              currentQuestion="sleepHours"
              formData={formData}
              onOptionSelect={(value) =>
                handleOptionSelect("sleepHours", value)
              }
              options={SleepHoursLevel}
              questionText="Bạn ngủ bao nhiêu giờ mỗi ngày?"
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 3 && (
          <motion.div
            key="exercise-frequency"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <SleepQuestion
              ref={question4Ref}
              currentQuestion="exerciseFrequency"
              formData={formData}
              onOptionSelect={(value) =>
                handleOptionSelect("exerciseFrequency", value)
              }
              options={ExerciseFrequency}
              questionText="Tần suất tập thể dục của bạn là bao nhiêu?"
              showConfirmButton={true}
              onConfirm={handleExerciseConfirm}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 4 && (
          <motion.div
            key="improvement-goal"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <ImprovementGoalQuestion
              ref={question5Ref}
              selectedGoal={formData.improvementGoal}
              onGoalSelect={(value) =>
                handleOptionSelect("improvementGoal", value)
              }
              onSubmit={handleGoalSubmit}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 5 && (
          <motion.div
            key="entertainment-activities"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <EntertainmentQuestion
              ref={question6Ref}
              selectedActivities={formData.entertainmentActivities}
              onActivitySelect={(value) =>
                handleOptionSelect("entertainmentActivities", value)
              }
              onSubmit={handleEntertainmentSubmit}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 6 && (
          <motion.div
            key="food-activities"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <FavoriteFoodQuestion
              ref={question7Ref}
              selectedFoods={formData.foodActivities}
              onFoodSelect={(value) =>
                handleOptionSelect("foodActivities", value)
              }
              onSubmit={handleFoodSubmit}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 7 && (
          <motion.div
            key="physical-activities"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <PhysicalActivityQuestion
              ref={question8Ref}
              selectedActivities={formData.physicalActivities}
              onActivitySelect={(value) =>
                handleOptionSelect("physicalActivities", value)
              }
              onSubmit={handlePhysicalActivitySubmit}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 8 && (
          <motion.div
            key="therapeutic-activities"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <TherapeuticActivityQuestion
              ref={question9Ref}
              selectedActivities={formData.therapeuticActivities}
              onActivitySelect={(value) =>
                handleOptionSelect("therapeuticActivities", value)
              }
              onSubmit={handleTherapeuticActivitySubmit}
              isLoading={false}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 9 && (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <ThankYouScreen ref={thankYouRef} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <SubmitProgressOverlay 
        isSubmitting={isSubmitting} 
        progress={submitProgress}
        error={submitError} 
      />
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

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: index <= currentStep ? 1.2 : 1, opacity: 1 }}
          className={`w-3 h-3 rounded-full transition-all ${
            index <= currentStep ? "bg-white" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
};

export default Intro;
