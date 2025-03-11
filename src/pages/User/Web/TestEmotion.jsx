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
    setActiveQuestion(questionIndex + 1);
    setTimeout(() => {
      if (questionContainerRef.current) {
        const questionElements = questionContainerRef.current.children;
        if (questionElements[questionIndex + 1]) {
          questionElements[questionIndex + 1].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 200);
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    const payload = {
      answers,
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

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className=" grid grid-cols-7 grid-rows-5 w-full">
      <div className=" col-span-4 row-span-5 pl-5 py-5 h-[84%]">
        <div className={`h-[550px] overflow-y-scroll `}>
          <div className="flex flex-col items-center justify-center">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-6 rounded-lg text-xl transition-all duration-300 w-full ${
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" col-span-3 p-5 row-span-5 col-start-5">
        <div className={styles.containerRight}>
          <div className="grid  grid-cols-3 grid-rows-9 gap-4 min-h-[calc(100vh-220px)]">
            <div className=" row-span-3">
              <div class={styles.cardContainerTest}>
                <div class={styles.cardTest}>
                  <div class={styles.frontContentTest}>
                    <p className="w-full">17</p>
                  </div>

                  <div class={styles.contentTest}>
                    <p class={styles.headingTest}>Depression</p>
                    <p className="text-[10px]">
                      is more than just sadness; it’s a lingering emptiness, a
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
            <div className=" row-span-3">
              <div class={styles.cardContainerTest1}>
                <div class={styles.cardTest1}>
                  <div class={styles.frontContentTest1}>
                    <p className="w-full">20</p>
                  </div>

                  <div class={styles.contentTest1}>
                    <p class={styles.headingTest1}>Anxiety</p>
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
            <div className=" row-span-3">
              <div class={styles.cardContainerTest2}>
                <div class={styles.cardTest2}>
                  <div class={styles.frontContentTest2}>
                    <p className="w-full">25</p>
                  </div>

                  <div class={styles.contentTest2}>
                    <p class={styles.headingTest2}>Stress</p>
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
            <div className=" col-span-3 row-span-6 row-start-4">
              <div class={styles.card3}>
                <div class={styles.topSection}>
                  <div class={styles.border}> Diagnosis Report</div>
                  <div className="p-4 overflow-y-scroll h-[280px]">
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
                        ✔ Severe Anxiety: The patient may experience persistent
                        tension, frequent panic episodes, rapid heartbeat, and
                        difficulty controlling worry.
                      </li>
                      <li>
                        ✔ Mild Depression: Possible signs of mild sadness, low
                        motivation, but not significantly impairing daily life.
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
                        ✔ If symptoms persist or worsen, seeking professional
                        psychological support is advised.
                      </li>
                    </ul>
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
