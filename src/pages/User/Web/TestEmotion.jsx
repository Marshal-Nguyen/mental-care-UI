import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import arrowDownAnimation from "../../../util/icon/arrowDown.json";
import alertIcon from "../../../util/icon/alertOctagon.json";

// Color mappings for UI consistency
const colorMap = {
  "Did not apply to me at all": "bg-teal-400 border-teal-600",
  "Applied to me to some degree": "bg-amber-400 border-amber-600",
  "Applied to me to a considerable degree": "bg-orange-400 border-orange-600",
  "Applied to me very much": "bg-rose-400 border-rose-600",
};

const textColorMap = {
  "Did not apply to me at all": "text-white",
  "Applied to me to some degree": "text-white",
  "Applied to me to a considerable degree": "text-white",
  "Applied to me very much": "text-white",
};

// Helper functions for score visualization
const getScoreColor = (type, score) => {
  const typeKey =
    type === "trầm cảm"
      ? "depression"
      : type === "lo âu"
      ? "anxiety"
      : type === "căng thẳng"
      ? "stress"
      : type;

  const severityLevels = {
    depression: [
      { max: 9, color: "bg-teal-400" },
      { max: 13, color: "bg-amber-400" },
      { max: 20, color: "bg-orange-400" },
      { max: 42, color: "bg-rose-400" },
    ],
    anxiety: [
      { max: 7, color: "bg-teal-400" },
      { max: 9, color: "bg-amber-400" },
      { max: 14, color: "bg-orange-400" },
      { max: 42, color: "bg-rose-400" },
    ],
    stress: [
      { max: 14, color: "bg-teal-400" },
      { max: 18, color: "bg-amber-400" },
      { max: 25, color: "bg-orange-400" },
      { max: 42, color: "bg-rose-400" },
    ],
  };

  return (
    severityLevels[typeKey]?.find((level) => score <= level.max)?.color ||
    "bg-rose-400"
  );
};

const getScoreLevel = (type, score) => {
  const typeKey =
    type === "trầm cảm"
      ? "depression"
      : type === "lo âu"
      ? "anxiety"
      : type === "căng thẳng"
      ? "stress"
      : type;

  const severityLabels = {
    depression: [
      { max: 9, label: "Bình thường" },
      { max: 13, label: "Nhẹ" },
      { max: 20, label: "Trung bình" },
      { max: 27, label: "Nặng" },
      { max: 42, label: "Rất nặng" },
    ],
    anxiety: [
      { max: 7, label: "Bình thường" },
      { max: 9, label: "Nhẹ" },
      { max: 14, label: "Trung bình" },
      { max: 19, label: "Nặng" },
      { max: 42, label: "Rất nặng" },
    ],
    stress: [
      { max: 14, label: "Bình thường" },
      { max: 18, label: "Nhẹ" },
      { max: 25, label: "Trung bình" },
      { max: 33, label: "Nặng" },
      { max: 42, label: "Rất nặng" },
    ],
  };

  return (
    severityLabels[typeKey]?.find((level) => score <= level.max)?.label ||
    "Rất nặng"
  );
};

// ScoreCard Component
const ScoreCard = ({ type, score, compact }) => {
  // Đã bỏ iconMap, chỉ giữ borderColorMap
  const borderColorMap = {
    "trầm cảm": "border-blue-300",
    "lo âu": "border-yellow-300",
    "căng thẳng": "border-pink-300",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white ${
        compact ? "p-3" : "p-5"
      } rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-8 ${
        borderColorMap[type] || "border-indigo-200"
      } flex flex-col items-center justify-center`}>
      <h3
        className={`font-semibold text-gray-800 mb-1 flex items-center capitalize ${
          compact ? "text-base" : "text-lg"
        }`}>
        {/* Đã xóa icon */}
        {type}
      </h3>
      <div className="text-2xl font-bold text-indigo-700 mb-1">{score}</div>
      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
        DASS-21
      </span>
      <span
        className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getScoreColor(
          type,
          score
        ).replace("bg-", "bg-opacity-20 text-")}`}>
        {getScoreLevel(type, score)}
      </span>
    </motion.div>
  );
};

// TestInfoCard Component
const TestInfoCard = ({
  testId,
  patientId,
  takenAt,
  severityLevel,
  patientName,
}) => {
  let formattedDate = "";
  if (takenAt) {
    try {
      formattedDate = new Date(takenAt).toLocaleString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      formattedDate = takenAt;
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-2xl shadow-lg border-l-4 border-indigo-500">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Thông tin bài kiểm tra
      </h3>
      <div className="space-y-3 text-sm text-gray-700">
        {patientName && (
          <p>
            <span className="font-medium">Tên bệnh nhân:</span> {patientName}
          </p>
        )}
        <p>
          <span className="font-medium">Mã bài kiểm tra:</span> {testId}
        </p>
        <p>
          <span className="font-medium">Mã người dùng:</span> {patientId}
        </p>
        <p>
          <span className="font-medium">Thời gian thực hiện:</span>{" "}
          {formattedDate}
        </p>
        <p>
          <span className="font-medium">Mức độ nghiêm trọng:</span>{" "}
          <span
            className={`px-3 py-1 rounded-full ${
              severityLevel === "Rất nặng"
                ? "bg-rose-100 text-rose-700"
                : severityLevel === "Nặng"
                ? "bg-rose-100 text-rose-700"
                : severityLevel === "Trung bình"
                ? "bg-orange-100 text-orange-700"
                : severityLevel === "Nhẹ"
                ? "bg-amber-100 text-amber-700"
                : "bg-teal-100 text-teal-700"
            }`}>
            {severityLevel}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

const RecommendationSection = ({ recommendation }) => {
  // Nếu recommendation là string (lỗi hoặc không có), chỉ hiển thị thông báo
  if (!recommendation || typeof recommendation === "string") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-amber-500">
        <div className="flex items-center mb-3">
          <Lottie
            animationData={alertIcon}
            loop={true}
            style={{
              width: 28,
              height: 28,
              filter:
                "brightness(0) saturate(100%) invert(14%) sepia(93%) saturate(7481%) hue-rotate(1deg) brightness(92%) contrast(119%)",
            }}
          />
          <p className="text-lg font-semibold text-gray-800 ml-3">Lời khuyên</p>
        </div>
        <p className="text-sm text-gray-600">
          {typeof recommendation === "string"
            ? recommendation
            : "Đang phân tích kết quả, vui lòng đợi..."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {recommendation.overview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-2xl shadow-lg border-l-4 border-purple-500">
          <p className="text-sm text-gray-700 leading-relaxed">
            {recommendation.overview}
          </p>
        </motion.div>
      )}
      {recommendation.emotionAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-2xl shadow-lg">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <span className="mr-2">🧠</span>Phân tích cảm xúc
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {recommendation.emotionAnalysis}
          </p>
        </motion.div>
      )}
      {Array.isArray(recommendation.personalizedSuggestions) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-2xl shadow-lg">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
            <span className="mr-2">🎯</span>Gợi ý cải thiện cá nhân hóa
          </h3>
          <div className="space-y-4">
            {recommendation.personalizedSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-purple-100 hover:shadow-md transition-shadow bg-gradient-to-r from-purple-50 to-white">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">
                    {suggestion.icon || "✨"}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 font-medium">
                      {suggestion.description}
                    </p>
                    {Array.isArray(suggestion.tips) && (
                      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                        {suggestion.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    )}
                    {suggestion.reference && (
                      <p className="text-xs text-gray-500 mt-2 italic">
                        {suggestion.reference}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      {recommendation.closing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-teal-50 to-white p-5 rounded-2xl shadow-lg border-t-4 border-teal-500">
          <p className="text-sm text-gray-700 leading-relaxed">
            💌 {recommendation.closing}
          </p>
        </motion.div>
      )}
    </div>
  );
};

const IncompleteAssessment = ({ currentIndex, totalQuestions }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-purple-50 rounded-2xl p-12">
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
      <Lottie
        animationData={arrowDownAnimation}
        loop={true}
        style={{ width: 24, height: 24 }}
      />
    </motion.div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
      Bài kiểm tra chưa hoàn thành
    </h3>
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full max-w-md">
      <div className="flex items-center mb-3">
        <div className="bg-indigo-100 p-2 rounded-full mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="font-medium text-gray-700">
          Còn lại {totalQuestions - currentIndex} / {totalQuestions} câu hỏi
        </p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
          className="bg-teal-500 h-3 rounded-full transition-all duration-500"
        />
      </div>
      <p className="text-sm text-gray-600">
        Vui lòng trả lời tất cả câu hỏi để nhận kết quả đánh giá cá nhân hóa.
      </p>
    </div>
    <div className="space-y-4 w-full max-w-md">
      <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-indigo-500">
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium text-gray-700">DASS-21 là gì?</p>
        </div>
        <p className="text-sm text-gray-600">
          Thang đo Trầm cảm, Lo âu và Căng thẳng (DASS-21) là một công cụ được
          xác nhận để đo lường các triệu chứng của trầm cảm, lo âu và căng
          thẳng.
        </p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-lg border-l-4 border-teal-500">
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-teal-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="font-medium text-gray-700">Bảo mật thông tin</p>
        </div>
        <p className="text-sm text-gray-600">
          Câu trả lời của bạn được bảo mật và không được lưu trữ dưới dạng cá
          nhân.
        </p>
      </div>
    </div>
  </motion.div>
);

const RecommendationModal = ({ open, onClose, recommendation }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-6 md:p-10 relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute hover:cursor-pointer top-3 right-3 text-gray-400 hover:text-purple-600 text-2xl font-bold"
          aria-label="Đóng">
          &times;
        </button>
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
          Báo cáo cá nhân hóa
        </h2>
        <RecommendationSection recommendation={recommendation} />
      </motion.div>
    </div>
  );
};

const TestEmotion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [scores, setScores] = useState({
    depression: 0,
    anxiety: 0,
    stress: 0,
  });
  const [testInfo, setTestInfo] = useState({
    testId: "",
    patientId: "",
    takenAt: "",
    severityLevel: "",
    patientName: "",
  });
  const [showRecommendation, setShowRecommendation] = useState(false);
  const patientId = useSelector((state) => state.auth.profileId);
  const testId = "8fc88dbb-daee-4b17-9eca-de6cfe886097";
  const API_TEST = import.meta.env.VITE_API_TEST_URL;
  const YOUR_TOKEN = localStorage.getItem("token");

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_TEST}/test-questions/${testId}?pageSize=21`,
          {
            headers: { Authorization: `Bearer ${YOUR_TOKEN}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch questions");
        const data = await response.json();
        const sortedQuestions = data.testQuestions.data.sort(
          (a, b) => a.order - b.order
        );
        setQuestions(sortedQuestions);
        setTotalQuestions(sortedQuestions.length);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [API_TEST, testId, YOUR_TOKEN]);

  // Handle option selection
  const handleOptionChange = useCallback(
    (optionContent) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: optionContent,
      }));
      if (currentQuestionIndex + 1 < totalQuestions) {
        setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 400);
      }
    },
    [currentQuestionIndex, totalQuestions]
  );

  // Handle test submission
  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    const selectedOptionIds = Object.entries(answers)
      .map(([index, selectedOption]) => {
        const question = questions[parseInt(index)];
        const found = question.options.find(
          (opt) => opt.content === selectedOption
        );
        return found ? found.id : null;
      })
      .filter(Boolean); // loại bỏ null nếu có
    const payload = { patientId, testId, selectedOptionIds };
    try {
      const response = await fetch(`${API_TEST}/test-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${YOUR_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const result = data.testResult;
      setScores({
        depression: result.depressionScore?.value ?? 0,
        anxiety: result.anxietyScore?.value ?? 0,
        stress: result.stressScore?.value ?? 0,
      });
      setTestInfo({
        testId: result.testId,
        patientId: result.patientId,
        takenAt: result.takenAt,
        severityLevel: result.severityLevel,
        patientName: result.patientName,
      });
      setRecommendation(
        result.recommendation || "Không có khuyến nghị cho kết quả này."
      );
    } catch (error) {
      console.error("Error submitting test:", error);
      setRecommendation("Đã xảy ra lỗi khi lấy kết quả. Vui lòng thử lại sau.");
    }
  }, [answers, questions, patientId, testId, API_TEST, YOUR_TOKEN]);

  // Reset test
  const handleTestAgain = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScores({ depression: 0, anxiety: 0, stress: 0 });
    setTestInfo({
      testId: "",
      patientId: "",
      takenAt: "",
      severityLevel: "",
      patientName: "",
    });
    setRecommendation(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-t-2 border-b-2 border-teal-500 rounded-full"
        />
        <p className="mt-3 text-gray-600 font-medium">Đang tải...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-teal-50 to-purple-50 p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-8 max-w-7xl mx-auto">
        {/* Question Section */}
        <div className="col-span-1 md:col-span-4">
          <div className="flex flex-col h-full">
            {currentQuestion && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-white p-4 md:p-8 rounded-2xl shadow-lg">
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-8 text-center italic">
                    Câu {currentQuestionIndex + 1}/{totalQuestions}:{" "}
                    {currentQuestion.content}
                  </motion.p>
                  <motion.div
                    className="flex flex-col w-full space-y-3 md:space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}>
                    {currentQuestion.options.map((option) => (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOptionChange(option.content)}
                        className={`p-3 md:p-4 rounded-lg text-left transition-all duration-300 text-base font-medium ${
                          answers[currentQuestionIndex] === option.content
                            ? `${colorMap[option.content]} ${
                                textColorMap[option.content]
                              } shadow-md`
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}>
                        {option.content}
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
            <div className="mt-6 md:mt-8 flex justify-center">
              {isLastQuestion && !submitted && (
                <motion.button
                  onClick={handleSubmit}
                  disabled={!answers[currentQuestionIndex]}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                    answers[currentQuestionIndex]
                      ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}>
                  Nộp bài
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.button>
              )}
              {submitted && (
                <motion.button
                  onClick={handleTestAgain}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg transition-all duration-300">
                  Thử lại
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h5m-5 0a7 7 0 1110.392 2.056M4 9a7 7 0 0110.392-2.056"
                    />
                  </svg>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-3 md:p-4 flex flex-col gap-2 w-full max-w-4xl mx-auto">
            {submitted ? (
              <>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2 text-center">
                  Kết quả đánh giá của bạn
                </h2>
                <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                  <div className="flex-shrink-0">
                    <TestInfoCard
                      testId={testInfo.testId}
                      patientId={testInfo.patientId}
                      takenAt={testInfo.takenAt}
                      severityLevel={testInfo.severityLevel}
                      patientName={testInfo.patientName}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-shrink-0">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}>
                      <ScoreCard
                        type="trầm cảm"
                        score={scores.depression}
                        compact
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}>
                      <ScoreCard type="lo âu" score={scores.anxiety} compact />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}>
                      <ScoreCard
                        type="căng thẳng"
                        score={scores.stress}
                        compact
                      />
                    </motion.div>
                  </div>
                  {/* <div className="flex-1 min-h-0 flex flex-col justify-end"> */}
                  <button
                    onClick={() => setShowRecommendation(true)}
                    className="w-full hover:cursor-pointer py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-base shadow-md hover:scale-105 transition-all duration-300">
                    Xem báo cáo chi tiết
                  </button>
                  {/* </div> */}
                </div>
              </>
            ) : (
              <IncompleteAssessment
                currentIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
              />
            )}
          </div>
        </div>
      </div>
      {/* Recommendation Modal */}
      <RecommendationModal
        open={showRecommendation}
        onClose={() => setShowRecommendation(false)}
        recommendation={recommendation}
      />
    </div>
  );
};

export default TestEmotion;
