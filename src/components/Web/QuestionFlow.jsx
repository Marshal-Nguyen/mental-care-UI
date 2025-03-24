import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Web/QuestionFlow.module.css";
import WavyLine from "./WavyLine";
import "animate.css";
import { useNavigate } from "react-router-dom";

const QuestionFlow = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const [sleepQuality, setSleepQuality] = useState("");
  const [stressFactors, setStressFactors] = useState([]);
  const [copingMechanisms, setCopingMechanisms] = useState([]);
  const [supportNeeded, setSupportNeeded] = useState("");

  const navigate = useNavigate();
  const handleNavigae = () => {
    navigate("/EMO");
  };
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNextStep = () => {
    if (step === 1 && name.trim() === "") return;
    setStep(step + 1);
  };
  const handleDelayedClick = () => {
    setTimeout(handleNextStep, 400); // Trì hoãn 2 giây
  };
  const handlePrevStep = (e) => {
    if (e.clientX < 100 && step > 0) setStep(step - 1);
  };

  return (
    <div className={`${styles.container} relative`} onClick={handlePrevStep}>
      <div className="absolute h-[10px] top-5 left-10 font-bold text-white text-xl">
        <h3>SOLTECH</h3>
      </div>
      <div className="absolute h-full w-3/4">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            // className={styles.content}
            className="absolute left-1/2 top-1/7 transform -translate-x-1/2 w-full">
            <div className="flex items-center justify-center h-max">
              {step === 0 && (
                <h1 className={`${styles.welcome} `}>Welcome to EmoEase</h1>
              )}
            </div>

            {step === 1 && (
              <>
                <h1 className={`${styles.nameQuestion} text-[100px] `}>
                  What should I call you?
                </h1>
                <div className="flex justify-center items-center">
                  <input
                    class="bg-zinc-200 h-10 mr-2 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-rose-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-rose-400 dark:shadow-md dark:shadow-white"
                    autocomplete="off"
                    name="text"
                    type="text"
                    placeholder="Enter your name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <button class="cursor-pointer" onClick={handleNextStep}>
                    <div class="w-[83px] h-[83px] bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                      <div class="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]"></div>
                      <label class="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center">
                        <div class="w-8 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            id="Filled"
                            viewBox="0 0 24 24">
                            <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
                          </svg>
                        </div>
                      </label>
                    </div>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="mb-10">
                <h1 className={`${styles.nameQuestion} text-[90px] mb-5`}>
                  How are you feeling today?
                </h1>
                <div className={styles.feedback}>
                  <label
                    className={`${styles.feedbackLabel} ${styles.angry}`}
                    data-label="Angry"
                    onClick={handleDelayedClick}>
                    <input name="feedback" value="1" type="radio" />
                    <div>
                      <svg className={styles.eye + " " + styles.left}></svg>
                      <svg className={styles.eye + " " + styles.right}></svg>
                      <svg className={styles.mouth}></svg>
                    </div>
                  </label>
                  <label
                    className={`${styles.feedbackLabel} ${styles.sad}`}
                    data-label="Sad"
                    onClick={handleDelayedClick}>
                    <input name="feedback" value="2" type="radio" />
                    <div>
                      <svg className={styles.eye + " " + styles.left}></svg>
                      <svg className={styles.eye + " " + styles.right}></svg>
                      <svg className={styles.mouth}></svg>
                    </div>
                  </label>
                  <label
                    className={`${styles.feedbackLabel} ${styles.ok}`}
                    data-label="Ok"
                    onClick={handleDelayedClick}>
                    <input name="feedback" value="3" type="radio" />
                    <div></div>
                  </label>
                  <label
                    className={`${styles.feedbackLabel} ${styles.good}`}
                    data-label="Good"
                    onClick={handleDelayedClick}>
                    <input
                      name="feedback"
                      value="4"
                      type="radio"
                      defaultChecked
                    />
                    <div>
                      <svg className={styles.eye + " " + styles.left}></svg>
                      <svg className={styles.eye + " " + styles.right}></svg>
                      <svg className={styles.mouth}></svg>
                    </div>
                  </label>
                  <label
                    className={`${styles.feedbackLabel} ${styles.happy}`}
                    data-label="Happy"
                    onClick={handleDelayedClick}>
                    <input name="feedback" value="5" type="radio" />
                    <div>
                      <svg className={styles.eye + " " + styles.left}></svg>
                      <svg className={styles.eye + " " + styles.right}></svg>
                    </div>
                  </label>
                  <svg
                    style={{ display: "none" }}
                    xmlns="http://www.w3.org/2000/svg">
                    <symbol id="eye" viewBox="0 0 7 4">
                      <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
                    </symbol>
                    <symbol id="mouth" viewBox="0 0 18 7">
                      <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
                    </symbol>
                  </svg>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mb-6 flex flex-col items-center">
                <h1 className={`${styles.nameQuestion} text-[50px] mb-6`}>
                  How has your sleep been lately?
                </h1>

                <div className="grid grid-cols-2 gap-2 w-full max-w-3xl">
                  <div
                    className={`bg-[#ffffff59] p-5 rounded-xl flex flex-col cursor-pointer transition-all hover:shadow-lg ${
                      sleepQuality === "provider" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                      setSleepQuality("provider");
                      setTimeout(handleNextStep, 400);
                    }}>
                    <div className="mb-3">
                      {/* <div className="bg-[#ffffff] inline-block p-2 rounded-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#E5F0FF" />
                          <path
                            d="M17 4H7C5.89543 4 5 4.89543 5 6V14C5 15.1046 5.89543 16 7 16H17C18.1046 16 19 15.1046 19 14V6C19 4.89543 18.1046 4 17 4Z"
                            stroke="#0066FF"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 16V19"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9 19H15"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10 8H14M10 11H14"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div> */}
                    </div>
                    <h3 className="text-lg text-white font-bold">
                      I sleep well most nights
                    </h3>
                  </div>

                  <div
                    className={`bg-[#ffffff59] p-5 rounded-xl flex flex-col cursor-pointer transition-all hover:shadow-lg relative ${
                      sleepQuality === "agents" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                      setSleepQuality("agents");
                      setTimeout(handleNextStep, 400);
                    }}>
                    <div className="mb-3">
                      {/* <div className="bg-white inline-block p-2 rounded-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#E5F0FF" />
                          <path
                            d="M12 6C7.03 6 3 8.23 3 11V13C3 15.77 7.03 18 12 18C16.97 18 21 15.77 21 13V11C21 8.23 16.97 6 12 6Z"
                            stroke="#0066FF"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 14C13.657 14 15 13.105 15 12C15 10.895 13.657 10 12 10C10.343 10 9 10.895 9 12C9 13.105 10.343 14 12 14Z"
                            stroke="#0066FF"
                            strokeWidth="2"
                          />
                        </svg>
                      </div> */}
                    </div>
                    <h3 className="text-lg text-white font-bold">
                      My sleep is okay, but I wake up tired.
                    </h3>
                  </div>

                  <div
                    className={`bg-[#ffffff59] p-5 rounded-xl flex flex-col cursor-pointer transition-all hover:shadow-lg relative ${
                      sleepQuality === "github" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                      setSleepQuality("github");
                      setTimeout(handleNextStep, 400);
                    }}>
                    <div className="mb-3">
                      {/* <div className="bg-white inline-block p-2 rounded-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#E5F0FF" />
                          <path
                            d="M17 4.5C17 3.4 16.1 2.5 15 2.5H9C7.9 2.5 7 3.4 7 4.5V19.5C7 20.6 7.9 21.5 9 21.5H15C16.1 21.5 17 20.6 17 19.5V4.5Z"
                            stroke="#0066FF"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 18.5H12.01"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M10 7H14M10 11H14"
                            stroke="#0066FF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div> */}
                    </div>
                    <h3 className="text-lg text-white font-bold">
                      I have trouble falling or staying asleep.
                    </h3>
                  </div>

                  <div
                    className={`bg-[#ffffff59] p-5 rounded-xl flex flex-col cursor-pointer transition-all hover:shadow-lg relative ${
                      sleepQuality === "rendering" ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                      setSleepQuality("rendering");
                      setTimeout(handleNextStep, 400);
                    }}>
                    <div className="mb-3">
                      {/* <div className="bg-white inline-block p-2 rounded-lg">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect width="24" height="24" rx="4" fill="#E5F0FF" />
                          <path
                            d="M8 12H16"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M12 8V16"
                            stroke="#0066FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="#0066FF"
                            strokeWidth="2"
                          />
                        </svg>
                      </div> */}
                    </div>
                    <h3 className="text-lg text-white font-bold">Other...</h3>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="mb-10 flex flex-col items-center">
                <h1 className={`${styles.nameQuestion} text-[70px] mb-5`}>
                  Has anything been making you feel stressed recently?
                </h1>
                <div className="w-4/5 max-w-md">
                  <select
                    className="w-full px-4 py-3 rounded-2xl text-lg font-medium bg-white text-blue-800 border border-blue-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 transition-all duration-300"
                    value={stressFactors}
                    onChange={(e) => {
                      setStressFactors(e.target.value);
                      setTimeout(handleNextStep, 400);
                    }}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    {[
                      "📚 Work/Studies",
                      "👨‍👩‍👧‍👦 Family/Friends",
                      "💰 Financial Issues",
                      "🏥 Health Concerns",
                      "🤯 Feeling overwhelmed without a clear reason",
                      "❓ Other",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="mb-10 flex flex-col items-center">
                <h1 className={`${styles.nameQuestion} text-[66px] mb-5`}>
                  When you're feeling stressed, what do you usually do to feel
                  better?
                </h1>
                <div className="w-4/5 max-w-md">
                  <select
                    className="w-full px-4 py-3 rounded-2xl text-lg font-medium bg-white text-blue-800 border border-blue-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 transition-all duration-300"
                    value={copingMechanisms}
                    onChange={(e) => {
                      setCopingMechanisms(e.target.value);
                      setTimeout(handleNextStep, 400);
                    }}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    {[
                      "🎵 Listen to music ",
                      "🎮 Play games",
                      "🚶 Take a walk",
                      "🛏 Sleep more ",
                      "💬 Talk to someone",
                      "🧘 Meditate or do breathing exercises ",
                      "🍕 Eat something I like",
                      "❓ Other",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="mb-10 flex flex-col items-center">
                <h1 className={`${styles.nameQuestion} text-[70px] mb-5`}>
                  What kind of support would you like to receive today?
                </h1>
                <div className="w-4/5 max-w-md">
                  <select
                    className="w-full px-4 py-3 rounded-2xl text-lg font-medium bg-white text-blue-800 border border-blue-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-700 transition-all duration-300"
                    value={supportNeeded}
                    onChange={(e) => {
                      setSupportNeeded(e.target.value);
                      setTimeout(handleNextStep, 400);
                    }}>
                    <option value="" disabled>
                      Select an option
                    </option>
                    {[
                      "💆 I need something to help me relax.",
                      "📝 I want to understand my feelings better.",
                      "🤝 I want to talk to someone.",
                      "🎯 I need a personalized plan to feel better.",
                      "❓ Other",
                    ].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className={`${styles.shareWith}`}>
                  Would you like to share your story with us?
                </h1>
                <button class="cursor-pointer" onClick={handleNavigae}>
                  <div class="w-[83px] h-[83px] bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),_2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center">
                    <div class="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]"></div>
                    <label class="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center">
                      <div class="w-8 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          id="Filled"
                          viewBox="0 0 24 24">
                          <path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"></path>
                        </svg>
                      </div>
                    </label>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <WavyLine step={step} totalSteps={8} className="absolute w-full" />
    </div>
  );
};

export default QuestionFlow;
