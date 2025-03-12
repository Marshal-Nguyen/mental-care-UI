import { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Web/TestEmotion.module.css";
import arrowDownAnimation from "../../../util/icon/arrowDown.json";
import arler from "../../../util/icon/alertOctagon.json";
import checkMap from "../../../util/icon/checkmark.json";
import Lottie from "lottie-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../components/Web/Loader";
const colorMap = {
  Never: "bg-green-500 border-green-700",
  Sometimes: "bg-yellow-500 border-yellow-700",
  Often: "bg-orange-500 border-orange-700",
  Always: "bg-red-500 border-red-700",
};

const TestEmotion = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const questionContainerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState({
    depression: 0,
    anxiety: 0,
    stress: 0,
  });

  useEffect(() => {
    fetch("https://665986e6de346625136ccb12.mockapi.io/list_item/api/Item")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleOptionChange = (questionIndex, option) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionIndex]: option }));

    // Set the next question as active
    if (questionIndex + 1 < questions.length) {
      setActiveQuestion(questionIndex + 1);

      // Scroll to the next question with a slight delay for better UX
      setTimeout(() => {
        const questionElements = document.querySelectorAll(`.question-item`);
        if (questionElements[questionIndex + 1]) {
          questionElements[questionIndex + 1].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 300);
    }
  };

  // Calculate scores based on answers
  const calculateScores = (answersObj) => {
    // Value map for scoring
    const valueMap = {
      Never: 0,
      Sometimes: 1,
      Often: 2,
      Always: 3,
    };

    // DASS-21 categorizes questions by type
    const depressionQuestions = [2, 4, 10, 13, 15, 17, 20]; // Example indices (adjust based on your actual questions)
    const anxietyQuestions = [1, 3, 6, 9, 12, 14, 18]; // Example indices
    const stressQuestions = [0, 5, 7, 8, 11, 16, 19]; // Example indices

    // Calculate scores
    let depressionScore = 0;
    let anxietyScore = 0;
    let stressScore = 0;

    Object.entries(answersObj).forEach(([index, answer]) => {
      const questionIndex = parseInt(index);
      const value = valueMap[answer];

      if (depressionQuestions.includes(questionIndex)) {
        depressionScore += value;
      } else if (anxietyQuestions.includes(questionIndex)) {
        anxietyScore += value;
      } else if (stressQuestions.includes(questionIndex)) {
        stressScore += value;
      }
    });

    // Multiply by 2 to match DASS-21 scoring
    return {
      depression: depressionScore * 2,
      anxiety: anxietyScore * 2,
      stress: stressScore * 2,
    };
  };

  const handleSubmit = () => {
    // Calculate the scores
    const calculatedScores = calculateScores(answers);
    setScores(calculatedScores);
    setSubmitted(true);

    console.log("Submitted answers:", answers);
    console.log("Calculated scores:", calculatedScores);

    const payload = {
      answers,
      scores: calculatedScores,
    };

    fetch("https://665986e6de346625136ccb12.mockapi.io/list_item/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Submission successful:", data);
      })
      .catch((error) => {
        console.error("Error submitting answers:", error);
      });
  };

  const handleTestAgain = () => {
    // Reset all states to initial values
    setAnswers({});
    setScores({
      depression: 0,
      anxiety: 0,
      stress: 0,
    });
    setSubmitted(false);
    setActiveQuestion(0);

    // Scroll to the top of the questions
    setTimeout(() => {
      const questionElements = document.querySelectorAll(`.question-item`);
      if (questionElements[0]) {
        questionElements[0].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 300);
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-7 grid-rows-5 w-full">
      <div className="col-span-4 row-span-5 pl-5 py-5 h-[84%]">
        <div
          className={`h-[550px] overflow-y-scroll`}
          ref={questionContainerRef}>
          <div className="flex flex-col items-center justify-center">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`question-item flex flex-col items-center p-6 rounded-lg text-xl transition-all duration-300 w-full ${
                  index === activeQuestion
                    ? "bg-gray-100 opacity-100"
                    : "bg-gray-50 opacity-50"
                }`}>
                <p className="text-2xl font-semibold mb-4 p-5 text-center italic">
                  {index + 1}. {question.question}
                </p>
                <div className="flex justify-between items-center w-full px-6">
                  {question.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className="relative cursor-pointer flex flex-col items-center">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        className="hidden"
                        onChange={() => handleOptionChange(index, option)}
                        checked={answers[index] === option}
                      />
                      <div
                        className={`w-14 h-14 border-4 rounded-full flex items-center justify-center transition-all ${
                          answers[index] === option
                            ? colorMap[option]
                            : "border-gray-400 hover:border-gray-600"
                        }`}></div>
                      <span className="mt-2 text-sm text-gray-700 font-semibold">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.bottomSectionQuestion}>
            <div className="w-full flex justify-center gap-10 mb-5">
              <div className="flex justify-center mt-6">
                {!submitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < questions.length}
                    className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
                    <span className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>
                    <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(214,8%,36%)] via-[hsl(217,33%,73%)] to-[hsl(215,9%,40%)]"></span>
                    <div className="relative w-[150px] flex items-center justify-between py-3 px-6 text-lg text-black rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#a277df] to-[#e6d4ff] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                      <span className="select-none">Submit</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1">
                        <path
                          clipRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          fillRule="evenodd"></path>
                      </svg>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleTestAgain}
                    className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
                    <span className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px"></span>
                    <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(214,8%,36%)] via-[hsl(217,33%,73%)] to-[hsl(215,9%,40%)]"></span>
                    <div className="relative w-[150px] flex items-center justify-between py-3 px-6 text-lg text-black rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#a277df] to-[#e6d4ff] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
                      <span className="select-none">Again</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1">
                        <path
                          clipRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          fillRule="evenodd"></path>
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 p-5 row-span-5 col-start-5">
        <div className={styles.containerRight}>
          <div className="grid grid-cols-3 grid-rows-9 gap-4 min-h-[calc(100vh-220px)]">
            <div className="row-span-3">
              <div className={styles.cardContainerTest}>
                <div className={styles.cardTest}>
                  <div className={styles.frontContentTest}>
                    <p className="w-full">
                      {submitted ? scores.depression : "0"}
                    </p>
                  </div>

                  <div className={styles.contentTest}>
                    <p className={styles.headingTest}>Depression</p>
                    <p className="text-[10px]">
                      is more than just sadness; it's a lingering emptiness, a
                      loss of motivation, and constant fatigue. The things you
                      once loved feel meaningless.
                    </p>
                    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        style={{
                          filter: "invert(0)",
                        }}>
                        <Lottie
                          animationData={arrowDownAnimation}
                          loop={true}
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-3">
              <div className={styles.cardContainerTest1}>
                <div className={styles.cardTest1}>
                  <div className={styles.frontContentTest1}>
                    <p className="w-full">{submitted ? scores.anxiety : "0"}</p>
                  </div>

                  <div className={styles.contentTest1}>
                    <p className={styles.headingTest1}>Anxiety</p>
                    <p className="text-[10px]">
                      keeps your mind racing with endless worries and fears. A
                      pounding heart, short breaths, and restless thoughts—like
                      your brain is running a marathon with no finish line.
                    </p>
                    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        style={{
                          filter: "invert(0)",
                        }}>
                        <Lottie
                          animationData={arrowDownAnimation}
                          loop={true}
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-span-3">
              <div className={styles.cardContainerTest2}>
                <div className={styles.cardTest2}>
                  <div className={styles.frontContentTest2}>
                    <p className="w-full">{submitted ? scores.stress : "0"}</p>
                  </div>

                  <div className={styles.contentTest2}>
                    <p className={styles.headingTest2}>Stress</p>
                    <p className="text-[10px]">
                      feels like carrying the weight of the world on your
                      shoulders. A little can help you stay focused, but too
                      much can leave you mentally and physically drained.
                    </p>
                    <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        style={{
                          filter: "invert(0)",
                        }}>
                        <Lottie
                          animationData={arrowDownAnimation}
                          loop={true}
                          style={{ width: 20, height: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3 row-span-6 row-start-4">
              <div className={styles.card3}>
                <div className={styles.topSection}>
                  <div className={styles.border}> Diagnosis Report</div>
                  <div className="p-4 overflow-y-scroll h-[280px] relative">
                    {submitted ? (
                      <>
                        <div
                          className={`${styles.title1} flex items-center text-[20px]`}>
                          <div
                            style={{
                              filter:
                                "invert(19%) sepia(96%) saturate(7498%) hue-rotate(359deg) brightness(95%) contrast(112%)",
                            }}>
                            <Lottie
                              animationData={arler}
                              loop={true}
                              style={{ width: 40, height: 40 }}
                            />
                          </div>
                          <span
                            className="text-[#3A3A3A]"
                            style={{ filter: "none" }}>
                            Diagnosis:
                          </span>
                        </div>
                        <ul className="">
                          <li>
                            ✔ Severe Anxiety: The patient may experience
                            persistent tension, frequent panic episodes, rapid
                            heartbeat, and difficulty controlling worry.
                          </li>
                          <li>
                            ✔ Mild Depression: Possible signs of mild sadness,
                            low motivation, but not significantly impairing
                            daily life.
                          </li>
                          <li>
                            ✔ Extremely Severe Stress: The patient may feel
                            overwhelmed, easily agitated, and struggle to relax,
                            significantly affecting daily activities.
                          </li>
                        </ul>
                        <div
                          className={`${styles.title1} flex items-center text-[20px]`}>
                          <div
                            style={{
                              filter:
                                "invert(19%) sepia(96%) saturate(7498%) hue-rotate(359deg) brightness(95%) contrast(112%)",
                            }}>
                            <Lottie
                              animationData={arler}
                              loop={true}
                              style={{ width: 40, height: 40 }}
                            />
                          </div>
                          <span
                            className="text-[#3A3A3A]"
                            style={{ filter: "none" }}>
                            Initial Recommendations:
                          </span>
                        </div>
                        <ul className="">
                          <li>
                            ✔ Engage in relaxation techniques (deep breathing,
                            meditation, light physical activities).
                          </li>
                          <li>
                            ✔ Adjust lifestyle habits, focusing on sleep and
                            nutrition.
                          </li>
                          <li>
                            ✔ If symptoms persist or worsen, seeking
                            professional psychological support is advised.
                          </li>
                        </ul>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 text-center p-4">
                        <div className="w-16 h-16 mb-4">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="#9370DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 16V12"
                              stroke="#9370DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8H12.01"
                              stroke="#9370DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-purple-700">
                          Unlock now
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Get the full report to unlock these personalized
                          insights.
                        </p>
                        <button
                          onClick={handleSubmit}
                          disabled={
                            Object.keys(answers).length < questions.length
                          }
                          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium shadow-md transition-colors duration-300">
                          Get access now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEmotion;
