import { useEffect, useState, useRef } from "react";
import styles from "../../../styles/Web/TestEmotion.module.css";
import arrowDownAnimation from "../../../util/icon/arrowDown.json";
import arler from "../../../util/icon/alertOctagon.json";
import checkMap from "../../../util/icon/checkmark.json";
import Lottie from "lottie-react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../components/Web/Loader";
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
    <div className=" grid grid-cols-7 grid-rows-5 w-full min-h-[calc(100vh-120px)]">
      <div className=" col-span-4 row-span-5 pl-5 py-5 h-full">
        <div className={`h-[650px] overflow-y-scroll `}>
          <div className={` flex flex-col items-center justify-center`}>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-6 rounded-lg text-xl transition-all duration-300 w-full ${
                  index === activeQuestion
                    ? "bg-gray-100 opacity-100"
                    : "bg-gray-50 opacity-50"
                }`}>
                <p className="text-2xl font-semibold mb-4 p-5 text-center italic ">
                  {index + 1}. {question.question}
                </p>
                <div className="flex justify-between items-center w-full px-6">
                  <span className="text-green-500 font-semibold text-xl">
                    Agree
                  </span>
                  <div className="flex space-x-4">
                    {question.options.map((option, optIndex) => (
                      <label key={optIndex} className="relative cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          className="hidden"
                          onChange={() => handleOptionChange(index, option)}
                          checked={answers[index] === option}
                        />
                        <div
                          className={`w-10 h-10 border-4 rounded-full flex items-center justify-center transition-all ${
                            answers[index] === option
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-400 hover:border-gray-600"
                          }`}></div>
                      </label>
                    ))}
                  </div>
                  <span className="text-purple-500 font-semibold text-xl">
                    Disagree
                  </span>
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
          <div className="grid  grid-cols-3 grid-rows-9 gap-4 h-full">
            <div className=" row-span-3">
              <article class={styles.card}>
                <div class={styles.temporaryText}>17</div>
                <div class={styles.cardContent}>
                  <span class={styles.cardTitle}>Depression </span>
                  <span class={styles.cardSubtitle}>
                    <div
                      style={{
                        filter: "invert(1)",
                      }}>
                      <Lottie
                        animationData={arrowDownAnimation}
                        loop={true}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                  </span>
                  <p class={styles.cardDescription}>
                    <span className="text-black font-bold"> Depression </span>{" "}
                    is more than just sadness; it’s a lingering emptiness, a
                    loss of motivation, and constant fatigue. The things you
                    once loved feel meaningless, and even the simplest tasks
                    become a struggle.
                  </p>
                </div>
              </article>
            </div>
            <div className=" row-span-3">
              <article class={styles.card1}>
                <div class={styles.temporaryText1}>20</div>
                <div class={styles.cardContent1}>
                  <span class={styles.cardTitle1}>Anxiety</span>
                  <span class={styles.cardSubtitle1}>
                    <div
                      style={{
                        filter: "invert(1)",
                      }}>
                      <Lottie
                        animationData={arrowDownAnimation}
                        loop={true}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                  </span>
                  <p class={styles.cardDescription1}>
                    <span className="text-black font-bold"> Anxiety </span>{" "}
                    keeps your mind racing with endless worries and fears. A
                    pounding heart, short breaths, and restless thoughts—like
                    your brain is running a marathon with no finish line.
                  </p>
                </div>
              </article>
            </div>
            <div className=" row-span-3">
              <article class={styles.card2}>
                <div class={styles.temporaryText2}>50</div>
                <div class={styles.cardContent2}>
                  <span class={styles.cardTitle2}>Stress</span>
                  <span class={styles.cardSubtitle2}>
                    <div
                      style={{
                        filter: "invert(1)",
                      }}>
                      <Lottie
                        animationData={arrowDownAnimation}
                        loop={true}
                        style={{ width: 20, height: 20 }}
                      />
                    </div>
                  </span>
                  <p class={styles.cardDescription2}>
                    <span className="text-black font-bold">Stress</span> feels
                    like carrying the weight of the world on your shoulders. A
                    little can help you stay focused, but too much can leave you
                    mentally and physically drained.
                  </p>
                </div>
              </article>
            </div>
            <div className=" col-span-3 row-span-6 row-start-4">
              <div class={styles.card3}>
                <div class={styles.topSection}>
                  <div class={styles.border}> Diagnosis Report</div>
                  <div className="p-4 overflow-y-scroll h-[340px]">
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
