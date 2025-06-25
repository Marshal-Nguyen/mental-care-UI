import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import arrowDownAnimation from "../../../util/icon/arrowDown.json";
import alertIcon from "../../../util/icon/alertOctagon.json";

// Color mappings for UI consistency
const colorMap = {
  "Did not apply to me at all": "bg-green-500 border-green-700",
  "Applied to me to some degree": "bg-yellow-500 border-yellow-700",
  "Applied to me to a considerable degree": "bg-orange-500 border-orange-700",
  "Applied to me very much": "bg-red-500 border-red-700",
};

const textColorMap = {
  "Did not apply to me at all": "text-white",
  "Applied to me to some degree": "text-white",
  "Applied to me to a considerable degree": "text-white",
  "Applied to me very much": "text-white",
};

// Helper functions for score visualization
const getScoreColor = (type, score) => {
  // Ánh xạ loại tiếng Việt sang tiếng Anh
  const typeKey =
    type === "trầm cảm"
      ? "depression"
      : type === "lo âu"
      ? "anxiety"
      : type === "căng thẳng"
      ? "stress"
      : type; // Sử dụng giá trị gốc nếu không phải các loại đã biết

  const severityLevels = {
    depression: [
      { max: 9, color: "bg-green-500" },
      { max: 13, color: "bg-yellow-500" },
      { max: 20, color: "bg-orange-500" },
      { max: 42, color: "bg-red-500" },
    ],
    anxiety: [
      { max: 7, color: "bg-green-500" },
      { max: 9, color: "bg-yellow-500" },
      { max: 14, color: "bg-orange-500" },
      { max: 42, color: "bg-red-500" },
    ],
    stress: [
      { max: 14, color: "bg-green-500" },
      { max: 18, color: "bg-yellow-500" },
      { max: 25, color: "bg-orange-500" },
      { max: 42, color: "bg-red-500" },
    ],
  };

  // Thêm optional chaining (?) để tránh lỗi khi key không tồn tại
  return (
    severityLevels[typeKey]?.find((level) => score <= level.max)?.color ||
    "bg-red-500"
  );
};

const getScoreLevel = (type, score) => {
  // Ánh xạ loại tiếng Việt sang tiếng Anh
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
      { max: 9, label: "Normal" },
      { max: 13, label: "Mild" },
      { max: 20, label: "Moderate" },
      { max: 27, label: "Severe" },
      { max: 42, label: "Extremely Severe" },
    ],
    anxiety: [
      { max: 7, label: "Normal" },
      { max: 9, label: "Mild" },
      { max: 14, label: "Moderate" },
      { max: 19, label: "Severe" },
      { max: 42, label: "Extremely Severe" },
    ],
    stress: [
      { max: 14, label: "Normal" },
      { max: 18, label: "Mild" },
      { max: 25, label: "Moderate" },
      { max: 33, label: "Severe" },
      { max: 42, label: "Extremely Severe" },
    ],
  };

  // Thêm optional chaining (?) để tránh lỗi khi key không tồn tại
  return (
    severityLabels[typeKey]?.find((level) => score <= level.max)?.label ||
    "Extremely Severe"
  );
};

// Component to display individual score
const ScoreCard = ({ type, score, maxScore = 42 }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center capitalize">
      {type}
      <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
        DASS-21
      </span>
    </h3>
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div
        className={`h-2 rounded-full ${getScoreColor(
          type,
          score
        )} transition-all duration-500`}
        style={{ width: `${Math.min(100, (score / maxScore) * 100)}%` }}
      />
    </div>
    <div className="flex justify-between text-sm font-medium">
      <span className="text-gray-700">Điểm: {score}</span>
      <span
        className={`px-2 py-1 rounded-lg ${getScoreColor(type, score).replace(
          "bg-",
          "bg-opacity-20 text-"
        )}`}>
        {getScoreLevel(type, score)}
      </span>
    </div>
  </div>
);

// Component to display test information
const TestInfoCard = ({ testId, patientId, takenAt, severityLevel }) => {
  const formattedDate = new Date(takenAt).toLocaleString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-indigo-400">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
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
        Thông tin bài kiểm tra
      </h3>
      <div className="space-y-2 text-sm text-gray-700">
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
          <span className="font-medium">Mức độ nghiêm trọng tổng thể:</span>{" "}
          <span
            className={`px-2 py-1 rounded-lg ${
              severityLevel === "Severe"
                ? "bg-red-100 text-red-700"
                : severityLevel === "Moderate"
                ? "bg-orange-100 text-orange-700"
                : severityLevel === "Mild"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}>
            {severityLevel}
          </span>
        </p>
      </div>
    </div>
  );
};

// Component to display recommendation
const RecommendationSection = ({ formattedRecommendation, recommend }) => {
  if (!formattedRecommendation) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-400">
        <div className="flex items-center mb-2">
          <Lottie
            animationData={alertIcon}
            loop={true}
            style={{
              width: 24,
              height: 24,
              filter:
                "brightness(0) saturate(100%) invert(14%) sepia(93%) saturate(7481%) hue-rotate(1deg) brightness(92%) contrast(119%)",
            }}
          />
          <p className="text-lg font-semibold text-gray-700 ml-2">Lời khuyên</p>
        </div>
        <p className="text-sm text-gray-600">
          {recommend || "Đang phân tích kết quả, vui lòng đợi..."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {formattedRecommendation.intro && (
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-400">
          <p className="text-sm text-gray-700 leading-relaxed">
            {formattedRecommendation.intro}
          </p>
        </div>
      )}
      {formattedRecommendation.analysis && (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <span className="mr-2">🧠</span>Phân tích cảm xúc
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {formattedRecommendation.analysis}
          </p>
        </div>
      )}
      {formattedRecommendation.suggestions && (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <span className="mr-2">🎯</span>Gợi ý cải thiện cá nhân hóa
          </h3>
          <div className="space-y-3">
            {formattedRecommendation.suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg border border-purple-100 hover:shadow-sm transition-shadow">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">{suggestion.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-700 mt-1">
                      {suggestion.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {suggestion.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {formattedRecommendation.outro && (
        <div className="bg-white p-4 rounded-xl shadow-sm border-t-4 border-purple-400">
          <p className="text-sm text-gray-700 leading-relaxed">
            💌 {formattedRecommendation.outro}
          </p>
        </div>
      )}
    </div>
  );
};

// Component to display incomplete assessment
const IncompleteAssessment = ({ currentIndex, totalQuestions }) => (
  <div className="h-full flex flex-col items-center justify-center bg-purple-50 rounded-xl p-6">
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
      <Lottie
        animationData={arrowDownAnimation}
        loop={true}
        style={{ width: 20, height: 20 }}
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Bài kiểm tra chưa hoàn thành
    </h3>
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-full max-w-sm">
      <div className="flex items-center mb-2">
        <div className="bg-indigo-100 p-2 rounded-full mr-2">
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
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-purple-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">
        Vui lòng trả lời tất cả câu hỏi để nhận kết quả đánh giá cá nhân hóa.
      </p>
    </div>
    <div className="space-y-3 w-full max-w-sm">
      <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-400">
        <div className="flex items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
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
      <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-400">
        <div className="flex items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 mr-2"
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
  </div>
);

const TestEmotion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [recommend, setRecommend] = useState(null);
  const [formattedRecommendation, setFormattedRecommendation] = useState(null);
  // Thêm state totalQuestions
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
  });
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
        setTotalQuestions(sortedQuestions.length); // Giờ đã có state để lưu trữ
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [API_TEST, testId, YOUR_TOKEN]);

  // Format recommendation
  const formatRecommendation = useCallback((rawRecommendation) => {
    if (!rawRecommendation) return null;
    const sections = {};
    const introMatch = rawRecommendation.match(/🌿 Chào.*?\n\n(.*?)(?=🧠)/s);
    if (introMatch && introMatch[1]) sections.intro = introMatch[1].trim();
    const analysisMatch = rawRecommendation.match(
      /🧠 \*\*Phân tích cảm xúc\*\*\n\n(.*?)(?=🎯)/s
    );
    if (analysisMatch && analysisMatch[1])
      sections.analysis = analysisMatch[1].trim();
    const suggestionsMatch = rawRecommendation.match(
      /🎯 \*\*3 Gợi ý cải thiện cá nhân hóa\*\*\n\n(.*?)(?=💌)/s
    );
    if (suggestionsMatch && suggestionsMatch[1]) {
      const suggestions = suggestionsMatch[1].trim().split(/\n\n(?=[✨🧘🌙])/);
      sections.suggestions = suggestions.map((suggestion) => {
        const suggestionParts = suggestion.match(
          /([✨🧘🌙]) \*\*(.*?)\*\* - (.*?)(?:\n\s*\*\s*)(.*)/s
        );
        return suggestionParts
          ? {
              icon: suggestionParts[1],
              title: suggestionParts[2],
              subtitle: suggestionParts[3],
              content: suggestionParts[4],
            }
          : { icon: "✨", title: "Gợi ý", subtitle: "", content: suggestion };
      });
    }
    const outroMatch = rawRecommendation.match(
      /💌 \*\*Lời chúc cuối:\*\*\n\n(.*?)$/s
    );
    if (outroMatch && outroMatch[1]) sections.outro = outroMatch[1].trim();
    return sections;
  }, []);

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
    const selectedOptionIds = Object.entries(answers).map(
      ([index, selectedOption]) => {
        const question = questions[parseInt(index)];
        return question.options.find((opt) => opt.content === selectedOption)
          .id;
      }
    );
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
      const resultResponse = await fetch(
        `${API_TEST}/test-result/${data.testResultId}`,
        {
          headers: { Authorization: `Bearer ${YOUR_TOKEN}` },
        }
      );
      const resultData = await resultResponse.json();
      setScores({
        depression: resultData.testResult.depressionScore.value,
        anxiety: resultData.testResult.anxietyScore.value,
        stress: resultData.testResult.stressScore.value,
      });
      setTestInfo({
        testId: resultData.testId,
        patientId: resultData.patientId,
        takenAt: resultData.takenAt,
        severityLevel: resultData.severityLevel,
      });
      if (resultData.testResult.recommendation) {
        setRecommend(resultData.testResult.recommendation);
        setFormattedRecommendation(
          formatRecommendation(resultData.testResult.recommendation)
        );
      } else {
        setRecommend("Không có khuyến nghị cho kết quả này.");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      setRecommend("Đã xảy ra lỗi khi lấy kết quả. Vui lòng thử lại sau.");
    }
  }, [
    answers,
    questions,
    patientId,
    testId,
    API_TEST,
    YOUR_TOKEN,
    formatRecommendation,
  ]);

  // Reset test
  const handleTestAgain = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScores({ depression: 0, anxiety: 0, stress: 0 });
    setTestInfo({ testId: "", patientId: "", takenAt: "", severityLevel: "" });
    setRecommend(null);
    setFormattedRecommendation(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-2 text-gray-600">Đang tải...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="grid grid-cols-7 min-h-[calc(100vh-110px)] bg-gray-50">
      {/* Question Section */}
      <div className="col-span-4 p-6">
        <div className="flex flex-col h-full">
          {currentQuestion && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col items-center p-6 rounded-xl bg-white shadow-lg">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-xl font-semibold text-gray-800 mb-6 text-center italic">
                  {currentQuestionIndex + 1}. {currentQuestion.content}
                </motion.p>
                <motion.div
                  className="flex flex-col w-full space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    staggerChildren: 0.1,
                    delayChildren: 0.3,
                  }}>
                  {currentQuestion.options.map((option) => (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionChange(option.content)}
                      className={`p-3 rounded-lg text-left transition-all duration-300 ${
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
          <div className="mt-auto flex justify-center mb-4">
            {isLastQuestion && !submitted && (
              <button
                onClick={handleSubmit}
                disabled={!answers[currentQuestionIndex]}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  answers[currentQuestionIndex]
                    ? "bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:scale-105 shadow-md"
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
              </button>
            )}
            {submitted && (
              <button
                onClick={handleTestAgain}
                className="flex items-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-blue-300 text-white hover:scale-105 transition-all duration-300 shadow-md">
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
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="col-span-3 p-6 bg-white rounded-xl shadow-lg">
        {submitted ? (
          <div className="h-[calc(100vh-150px)] bg-purple-50 p-6 rounded-xl overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Kết quả đánh giá của bạn
            </h2>
            <div className="space-y-4 mb-6">
              <TestInfoCard
                testId={testInfo.testId}
                patientId={testInfo.patientId}
                takenAt={testInfo.takenAt}
                severityLevel={testInfo.severityLevel}
              />
              <ScoreCard type="trầm cảm" score={scores.depression} />
              <ScoreCard type="lo âu" score={scores.anxiety} />
              <ScoreCard type="căng thẳng" score={scores.stress} />
            </div>
            <RecommendationSection
              formattedRecommendation={formattedRecommendation}
              recommend={recommend}
            />
          </div>
        ) : (
          <IncompleteAssessment
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
        )}
      </div>
    </div>
  );
};

export default TestEmotion;
