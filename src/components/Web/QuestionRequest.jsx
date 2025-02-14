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

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="flex flex-col items-center w-full h-screen mt-20 border ">
      <span className={`${styles.sourceSerif} text-2xl font-semibold mt-10`}>
        GOT QUESTION?
      </span>

      <h1
        className={`${styles.sourceSerif} text-5xl text-[#4F258A] font-bold text-center mt-7`}>
        FREQUENTLYS ASKED QUESTIONS
      </h1>
      <span className="font-thin mt-2 text-xl italic">
        Find answers about EmoEase model, tools, and processes...
      </span>
      <div className="grid grid-cols-2 gap-4">
        {question.map((q) => (
          <div
            key={q.id}
            className="p-2 border rounded-lg shadow flex justify-between items-center">
            <span className="font-semibold">{q.Question}</span>
            <button
              className="p-2 border rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() =>
                setOpenQuestion(openQuestion === q.id ? null : q.id)
              }>
              {openQuestion === q.id ? "−" : "+"}
            </button>
            {openQuestion === q.id && (
              <p className="col-span-2 mt-2">{q.Answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionRequest;
