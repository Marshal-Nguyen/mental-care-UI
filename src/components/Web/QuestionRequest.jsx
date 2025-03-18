import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Web/IntroFPT.module.css";

const QuestionRequest = () => {
  const [question, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    axios
      .get("https://663ad093fee6744a6e9f7076.mockapi.io/QuestionForUser")
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Chỉ mở một câu hỏi tại một thời điểm
  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  // Xử lý đóng popup khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openQuestion !== null && !event.target.closest(".question-item")) {
        setOpenQuestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openQuestion]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        <p>Something went wrong. Please try again later.</p>
        <p className="text-sm mt-2">Error: {error}</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-16 bg-white">
      <span className="text-xl font-thin text-purple-700 uppercase">
        Have Questions?
      </span>
      <h1
        className={`${styles.sourceSerif} text-5xl text-[#3d1085] font-bold text-center mt-4 mb-4`}>
        Frequently Asked Questions
      </h1>
      <p className="font-normal text-gray-600 text-center max-w-2xl mb-12">
        Find answers about EmoEase services, mental wellness tools, and how we
        can support your journey to better mental health.
      </p>

      <div className="w-full max-w-4xl px-4 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {question.map((q) => (
            <div
              key={q.id}
              className="question-item relative bg-white rounded-xl shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center p-5 cursor-pointer">
                <h3 className="font-medium text-purple-900 pr-4">
                  {q.Question}
                </h3>
                <button
                  className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors duration-200"
                  onClick={() => toggleQuestion(q.id)}>
                  {openQuestion === q.id ? "−" : "+"}
                </button>
              </div>

              {/* Popup trả lời */}
              {openQuestion === q.id && (
                <div className="absolute z-20 left-0 right-0 md:left-auto md:right-0 md:w-full mt-2 bg-white border-2 border-purple-300 rounded-lg shadow-xl p-4 animate-fadeIn">
                  <div className="bg-purple-50 p-4 rounded-md italic text-gray-700">
                    {q.Answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-purple-100 to-purple-200 p-8 rounded-2xl shadow-md max-w-3xl">
        <h3
          className={`${styles.sourceSerif} text-2xl font-semibold text-purple-800 mb-4`}>
          Didn't find your answer here?
        </h3>
        <p className="text-gray-700 mb-6">
          Our team is ready to provide personalized support for your mental
          wellness journey.
        </p>
        <button class=" cursor-pointer relative border rounded-xl bg-[#492580] max-w-48 h-13 px-3 font-mono font-thin text-white transition-colors duration-10000 ease-linear before:absolute before:right-20 before:top-6 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-center before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-xl before:bg-[#8566b1] hover:bg-[#8566b1] hover:before:bg-[#8566b1] z-2">
          Talk to our team
        </button>
      </div>

      {/* Thêm CSS animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default QuestionRequest;
