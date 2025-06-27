import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoodQuestion } from "../../../components/IntroComponents/MoodOption";
import { SleepQuestion } from "../../../components/IntroComponents/SleepOption";
import { ImprovementGoalQuestion } from "../../../components/IntroComponents/ImprovementGoalQuestion";
import { EntertainmentQuestion } from "../../../components/IntroComponents/EntertainmentQuestion";
import { FavoriteFoodQuestion } from "../../../components/IntroComponents/FavoriteFoodQuestion";
import { PhysicalActivityQuestion } from "../../../components/IntroComponents/PhysicalActivityQuestion";
import { TherapeuticActivityQuestion } from "../../../components/IntroComponents/TherapeuticActivityQuestion";
import { IndustryQuestion } from "../../../components/IntroComponents/IndustryQuestion";
import { PersonalityQuestion } from "../../../components/IntroComponents/PersonalityQuestion";
import { AllergiesQuestion } from "../../../components/IntroComponents/AllergiesQuestion";
import { BirthDateQuestion } from "../../../components/IntroComponents/BirthDateQuestion";
import { AddressQuestion } from "../../../components/IntroComponents/AddressQuestion";
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
  const question10Ref = useRef(null);
  const question11Ref = useRef(null);
  const question12Ref = useRef(null);
  const question13Ref = useRef(null);
  const thankYouRef = useRef(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitError, setSubmitError] = useState(null);
  const [isFetchingProfile, setIsFetchingProfile] = useState(true);
  const [fetchProfileError, setFetchProfileError] = useState(null);
  const [hasFetchedProfile, setHasFetchedProfile] = useState(false);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_LIFESTYLE_URL;
  const PROFILE_URL =
    import.meta.env.VITE_API_PROFILE_URL ||
    "https://api.emoease.vn/profile-service";
  const { currentStep, formData, goToNext, goToPrevious, updateFormData } =
    useMultiStepForm(15);
  const {
    playing,
    muted,
    toggle: toggleAudio,
    toggleMute,
  } = useAudio("/sounds/chill.mp3");

  // Fetch patient profile only once
  const fetchPatientProfile = useCallback(async () => {
    if (hasFetchedProfile) return;

    try {
      setIsFetchingProfile(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${PROFILE_URL}/patients/${localStorage.getItem("profileId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Patient profile API returned status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Patient profile API response:", data);
      const { patientProfileDto } = data;
      updateFormData("fullName", patientProfileDto.fullName || "");
      updateFormData("gender", patientProfileDto.gender || "");
      updateFormData("email", patientProfileDto.contactInfo?.email || "");
      updateFormData(
        "phoneNumber",
        patientProfileDto.contactInfo?.phoneNumber || ""
      );
      if (patientProfileDto.jobId) setSelectedJobId(patientProfileDto.jobId);
      setHasFetchedProfile(true);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
      setFetchProfileError(error.message);
    } finally {
      setIsFetchingProfile(false);
    }
  }, [hasFetchedProfile, updateFormData]);

  useEffect(() => {
    fetchPatientProfile();
  }, [fetchPatientProfile]);

  // Fetch jobs based on industryId
  const fetchJobsByIndustry = useCallback(async (industryId) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${PROFILE_URL}/industries/${industryId}/jobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Jobs API returned status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Jobs API response:", data);
      setAvailableJobs(data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setAvailableJobs([]);
    }
  }, []);

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
        throw new Error(
          `Improvement goals API returned status: ${response.status}`
        );
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
        throw new Error(
          `Entertainment API returned status: ${response.status}`
        );
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

      const response = await fetch(`${BASE_URL}/patient-food-activities`, {
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
        throw new Error(
          `Physical activities API returned status: ${response.status}`
        );
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

  const updatePatientProfile = async () => {
    try {
      console.log("Updating patient profile:", {
        fullName: formData.fullName,
        gender: formData.gender,
        allergies: formData.allergies ?? "",
        personalityTraits: formData.personalityTraits || "None",
        contactInfo: {
          address: formData.address,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        },
        jobId: selectedJobId,
        birthDate: formData.birthDate,
      });
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `${PROFILE_URL}/patients/${localStorage.getItem("profileId")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            patientProfileUpdate: {
              fullName:
                formData.fullName ||
                localStorage.getItem("username") ||
                "Unknown",
              gender: formData.gender || "Unknown",
              allergies: formData.allergies ?? "",
              personalityTraits: formData.personalityTraits || "None",
              contactInfo: {
                address: formData.address || null,
                email: formData.email || null,
                phoneNumber: formData.phoneNumber || null,
              },
              jobId: selectedJobId || null,
              birthDate: formData.birthDate || null,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Profile update API returned status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Profile update API response:", data);
      return true;
    } catch (error) {
      console.error("Error updating patient profile:", error);
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
      {
        name: "Entertainment Activities",
        function: sendEntertainmentActivities,
      },
      { name: "Food Activities", function: sendFoodActivities },
      { name: "Physical Activities", function: sendPhysicalActivities },
      { name: "Therapeutic Activities", function: sendTherapeuticActivities },
      { name: "Patient Profile Update", function: updatePatientProfile },
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

      console.log("All data submitted successfully, moving to step 15");
      goToNext(); // Đảm bảo chuyển sang bước 15
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
      field !== "therapeuticActivities" &&
      field !== "industry" &&
      field !== "personalityTraits" &&
      field !== "allergies" &&
      field !== "birthDate" &&
      field !== "address"
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
            : currentStepBeforeChange === 8
            ? question10Ref
            : currentStepBeforeChange === 9
            ? question11Ref
            : currentStepBeforeChange === 10
            ? question12Ref
            : currentStepBeforeChange === 11
            ? question13Ref
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
    goToNext();
    setTimeout(() => {
      if (question10Ref.current) {
        question10Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleIndustrySubmit = (industryId) => {
    fetchJobsByIndustry(industryId);
    updateFormData("industry", industryId);
    goToNext();
    setTimeout(() => {
      if (question11Ref.current) {
        question11Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId);
    goToNext();
    setTimeout(() => {
      if (question12Ref.current) {
        question12Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handlePersonalitySubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question13Ref.current) {
        question13Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleAllergiesSubmit = () => {
    goToNext();
    setTimeout(() => {
      if (question13Ref.current) {
        question13Ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleBirthDateSubmit = () => {
    goToNext();
    setTimeout(() => {
      if (thankYouRef.current) {
        thankYouRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  const handleAddressSubmit = () => {
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
              <h3 className="text-xl font-bold text-white mb-2">
                Đã xảy ra lỗi
              </h3>
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
              <h3 className="text-xl font-bold text-white">
                Đang gửi dữ liệu...
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Vui lòng đợi trong khi chúng tôi đang xử lý các câu trả lời của
                bạn
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isFetchingProfile) {
    return (
      <div className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-3 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-3 text-sm">Đang tải thông tin hồ sơ...</p>
        </div>
      </div>
    );
  }

  if (fetchProfileError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
        <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-lg">
          <p className="text-white text-center text-sm">
            <span className="font-bold">Lỗi:</span> {fetchProfileError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1.5 bg-white text-red-600 rounded-lg hover:bg-gray-100 text-sm">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url('/bg_Question.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <ProgressIndicator currentStep={currentStep} totalSteps={15} />
      {!showWelcomePopup && (
        <MuteButton isMuted={muted} onToggle={toggleMute} />
      )}
      {currentStep > 0 && currentStep < 15 && !showWelcomePopup && (
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
              isLoading={false}
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
            key="industry"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <IndustryQuestion
              ref={question10Ref}
              selectedIndustry={formData.industry}
              onIndustrySelect={handleIndustrySubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 10 && (
          <motion.div
            key="job-selection"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <SleepQuestion
              ref={question11Ref}
              currentQuestion="jobId"
              formData={{ jobId: selectedJobId }}
              onOptionSelect={handleJobSelect}
              options={availableJobs.map((job) => ({
                value: job.id,
                label: job.jobTitle,
              }))}
              questionText="Chọn công việc của bạn:"
              showConfirmButton={true}
              onConfirm={() => handleJobSelect(selectedJobId)}
              isLoading={availableJobs.length === 0}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 11 && (
          <motion.div
            key="personality"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <PersonalityQuestion
              ref={question12Ref}
              selectedPersonality={formData.personalityTraits}
              onPersonalitySelect={(value) =>
                handleOptionSelect("personalityTraits", value)
              }
              onSubmit={handlePersonalitySubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 12 && (
          <motion.div
            key="allergies"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <AllergiesQuestion
              ref={question13Ref}
              allergies={formData.allergies}
              onAllergiesChange={(value) =>
                handleOptionSelect("allergies", value)
              }
              onSubmit={handleAllergiesSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 13 && (
          <motion.div
            key="birthDate"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <BirthDateQuestion
              ref={question13Ref}
              birthDate={formData.birthDate}
              onBirthDateChange={(value) =>
                handleOptionSelect("birthDate", value)
              }
              onSubmit={handleBirthDateSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 14 && (
          <motion.div
            key="address"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}>
            <AddressQuestion
              ref={thankYouRef}
              address={formData.address}
              onAddressChange={(value) => handleOptionSelect("address", value)}
              onSubmit={handleAddressSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        )}

        {!showWelcomePopup && currentStep === 15 && (
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
