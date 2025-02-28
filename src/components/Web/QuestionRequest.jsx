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
    <div className="flex flex-col items-center w-full h-screen mt-20  ">
      <span className={`${styles.sourceSerif} text-2xl font-semibold mt-7`}>
        GOT QUESTION?
      </span>
      <h1
        className={`${styles.sourceSerif} text-5xl text-[#4F258A] font-bold text-center mt-5`}>
        FREQUENTLYS ASKED QUESTIONS
      </h1>
      <span className="font-thin  text-[16px] mt-2 italic">
        Find answers about EmoEase model, tools, and processes...
      </span>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {question.map((q) => (
          <>
            <div
              key={q.id}
              className="relative py-4 border border-dashed rounded-lg shadow flex justify-between items-center">
              <span className=" font-semibold px-6">{q.Question}</span>
              <button
                className="p-2 border mr-6 rounded-full w-8 h-8 flex items-center justify-center"
                onClick={() =>
                  setOpenQuestion(openQuestion === q.id ? null : q.id)
                }>
                {openQuestion === q.id ? "−" : "+"}
              </button>
              {openQuestion === q.id && (
                <div className="absolute border-[3px] border-[#000] p-3 text-[16px] italic mt-2 text-white bg-[#914dc9]  top-15 z-30">
                  {q.Answer}
                </div>
              )}
            </div>
          </>
        ))}
      </div>
      <div className="flex-col flex justify-center items-center mt-6">
        <span className={`${styles.sourceSerif} my-2 font-bold text-xl`}>
          Didn't find in here?
        </span>
        <button class="relative border rounded-3xl bg-[#4a2580] max-w-48 h-13 px-3 font-mono font-thin text-white transition-colors duration-10000 ease-linear before:absolute before:right-20 before:top-6 before:-z-[1] before:h-3/4 before:w-2/3 before:origin-center before:-translate-y-1/2 before:translate-x-1/2 before:animate-ping before:rounded-xl before:bg-[#8566b1] hover:bg-[#8566b1] hover:before:bg-[#8566b1]">
          Talk to our team
        </button>
      </div>
    </div>
  );
};

export default QuestionRequest;
