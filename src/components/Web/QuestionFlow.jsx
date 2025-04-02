import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Web/QuestionFlow.module.css";
import WavyLine from "./WavyLine";
import "animate.css";
import { useNavigate } from "react-router-dom";
import {
  sleepOptions,
  stressOptions,
  copingOptions,
  supportOptions,
} from "./QuestionOption";
const QuestionFlow = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const [sleepQuality, setSleepQuality] = useState("");
  const [stressFactors, setStressFactors] = useState([]);
  const [copingMechanisms, setCopingMechanisms] = useState([]);
  const [supportNeeded, setSupportNeeded] = useState([]);

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
              <div className="mb-10 flex flex-col items-center">
                <h1
                  className={`${styles.nameQuestion} text-[45px] mb-6 text-center`}>
                  How has your sleep been lately?
                </h1>
                <div className="relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar hide-scrollbar px-10">
                  {sleepOptions.map((option) => (
                    <motion.div
                      key={option.label}
                      className="snap-start py-1 h-[75px] flex items-center"
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      }}
                      viewport={{
                        once: false,
                        amount: 0.8,
                        margin: "-5%",
                      }}>
                      <div
                        onClick={() => {
                          setSleepQuality(`${option.icon} ${option.label}`);
                          setTimeout(handleNextStep, 400);
                        }}
                        className={`
              bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
              transform transition-all duration-300 w-full
              hover:bg-white/20 hover:-translate-y-1
              ${
                sleepQuality === `${option.icon} ${option.label}`
                  ? "ring-2 ring-blue-400 bg-white/30 scale-105"
                  : "hover:scale-[1.02]"
              }
              flex items-center mx-auto h-[60px]
            `}>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-3xl">{option.icon}</span>
                          <div className="text-left flex-1">
                            <h3 className="text-white font-semibold">
                              {option.label}
                            </h3>
                            <p className="text-white/70 text-xs">
                              {option.description}
                            </p>
                          </div>
                          {sleepQuality ===
                            `${option.icon} ${option.label}` && (
                            <span className="text-blue-800 text-xl">✓</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="mb-10 flex flex-col items-center">
                <h1
                  className={`${styles.nameQuestion} text-[45px] mb-6 text-center`}>
                  Has anything been making you feel stressed recently?
                </h1>
                <div
                  className={` relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar hide-scrollbar px-10`}>
                  {stressOptions.map((option, index) => (
                    <motion.div
                      key={option.label}
                      className="snap-start py-1 h-[75px] flex items-center" // Reduced from py-2 to py-1 and height from 120px to 90px
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      }}
                      viewport={{
                        once: false,
                        amount: 0.8,
                        margin: "-10%",
                      }}>
                      <div
                        onClick={() => {
                          const value = `${option.icon} ${option.label}`;
                          setStressFactors((prev) =>
                            prev.includes(value)
                              ? prev.filter((item) => item !== value)
                              : [...prev, value]
                          );
                        }}
                        className={`
    bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
    transform transition-all duration-300 w-full
    hover:bg-white/20 hover:-translate-y-1
    ${
      stressFactors.includes(`${option.icon} ${option.label}`)
        ? "ring-2 ring-blue-400 bg-white/30 scale-105"
        : "hover:scale-[1.02]"
    }
    flex items-center mx-auto h-[60px]
  `}>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-3xl">{option.icon}</span>
                          <div className="text-left flex-1">
                            <h3 className="text-white font-semibold">
                              {option.label}
                            </h3>
                            <p className="text-white/70 text-xs">
                              {option.description}
                            </p>
                          </div>
                          {stressFactors.includes(
                            `${option.icon} ${option.label}`
                          ) && <span className="text-blue-800 text-xl">✓</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {stressFactors.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.03,
                      backdropFilter: "blur(12px)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNextStep()}
                    className="mt-6 px-5 py-3
      bg-[#0099ff]/10 backdrop-blur-md
      border-2 border-[#0099ff]/30
      text-white rounded-xl
      transition-all duration-300
      flex items-center gap-4
      shadow-[0_4px_20px_rgba(0,153,255,0.2)]
      hover:bg-[#0099ff]/20
      hover:border-[#0099ff]/50
      hover:shadow-[0_8px_25px_rgba(0,153,255,0.3)]
      group">
                    <span className="text-lg font-medium tracking-wide">
                      Continue
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="bg-[#ffffff9d] backdrop-blur-md 
        px-3 py-1 rounded-full text-sm text-[#0099ff]
        border border-[#0099ff]/30 font-medium">
                        {stressFactors.length}
                      </span>
                      <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    </div>
                  </motion.button>
                )}
              </div>
            )}
            {step === 5 && (
              <div className="mb-10 flex flex-col items-center">
                <h1
                  className={`${styles.nameQuestion} text-[45px] mb-6 text-center`}>
                  How do you unwind when life gets tough?
                </h1>
                <div className="relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar px-10">
                  {copingOptions.map((option) => (
                    <motion.div
                      key={option.label}
                      className="snap-start py-1 h-[75px] flex items-center"
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      }}
                      viewport={{
                        once: false,
                        amount: 0.8,
                        margin: "-5%",
                      }}>
                      <div
                        onClick={() => {
                          const value = `${option.icon} ${option.label}`;
                          setCopingMechanisms((prev) =>
                            prev.includes(value)
                              ? prev.filter((item) => item !== value)
                              : [...prev, value]
                          );
                        }}
                        className={`
                        bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
                        transform transition-all duration-300 w-full
                        hover:bg-white/20 hover:-translate-y-1
                        ${
                          copingMechanisms.includes(
                            option.icon + " " + option.label
                          )
                            ? "ring-2 ring-blue-400 bg-white/30 scale-105"
                            : "hover:scale-[1.02]"
                        }
                        flex items-center mx-auto h-[60px]
                      `}>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-3xl">{option.icon}</span>
                          <div className="text-left flex-1">
                            <h3 className="text-white font-semibold">
                              {option.label}
                            </h3>
                            <p className="text-white/70 text-xs">
                              {option.description}
                            </p>
                          </div>
                          {copingMechanisms.includes(
                            option.icon + " " + option.label
                          ) && <span className="text-blue-800 text-xl">✓</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {copingMechanisms.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.03,
                      backdropFilter: "blur(12px)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNextStep()}
                    className="mt-6 px-5 py-3
                    bg-[#0099ff]/10 backdrop-blur-md
                    border-2 border-[#0099ff]/30
                    text-white rounded-xl
                    transition-all duration-300
                    flex items-center gap-4
                    shadow-[0_4px_20px_rgba(0,153,255,0.2)]
                    hover:bg-[#0099ff]/20
                    hover:border-[#0099ff]/50
                    hover:shadow-[0_8px_25px_rgba(0,153,255,0.3)]
                    group">
                    <span className="text-lg font-medium tracking-wide">
                      Continue
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="bg-[#ffffff9d] backdrop-blur-md 
                      px-3 py-1 rounded-full text-sm text-[#0099ff]
                      border border-[#0099ff]/30 font-medium">
                        {copingMechanisms.length}
                      </span>
                      <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    </div>
                  </motion.button>
                )}
              </div>
            )}
            {step === 6 && (
              <div className="mb-10 flex flex-col items-center">
                <h1
                  className={`${styles.nameQuestion} text-[45px] mb-6 text-center`}>
                  What kind of support would you like to receive today?
                </h1>
                <div className="relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar hide-scrollbar px-10">
                  {supportOptions.map((option) => (
                    <motion.div
                      key={option.label}
                      className="snap-start py-1 h-[75px] flex items-center"
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        },
                      }}
                      viewport={{
                        once: false,
                        amount: 0.8,
                        margin: "-5%",
                      }}>
                      <div
                        onClick={() => {
                          const value = `${option.icon} ${option.label}`;
                          setSupportNeeded((prev) =>
                            prev.includes(value)
                              ? prev.filter((item) => item !== value)
                              : [...prev, value]
                          );
                        }}
                        className={`
                        bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
                        transform transition-all duration-300 w-full
                        hover:bg-white/20 hover:-translate-y-1
                        ${
                          supportNeeded.includes(
                            `${option.icon} ${option.label}`
                          )
                            ? "ring-2 ring-blue-400 bg-white/30 scale-105"
                            : "hover:scale-[1.02]"
                        }
                        flex items-center mx-auto h-[60px]
                      `}>
                        <div className="flex items-center gap-3 w-full">
                          <span className="text-3xl">{option.icon}</span>
                          <div className="text-left flex-1">
                            <h3 className="text-white font-semibold">
                              {option.label}
                            </h3>
                            <p className="text-white/70 text-xs">
                              {option.description}
                            </p>
                          </div>
                          {supportNeeded.includes(
                            `${option.icon} ${option.label}`
                          ) && <span className="text-blue-800 text-xl">✓</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {supportNeeded.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.03,
                      backdropFilter: "blur(12px)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNextStep()}
                    className="mt-6 px-5 py-3
                    bg-[#0099ff]/10 backdrop-blur-md
                    border-2 border-[#0099ff]/30
                    text-white rounded-xl
                    transition-all duration-300
                    flex items-center gap-4
                    shadow-[0_4px_20px_rgba(0,153,255,0.2)]
                    hover:bg-[#0099ff]/20
                    hover:border-[#0099ff]/50
                    hover:shadow-[0_8px_25px_rgba(0,153,255,0.3)]
                    group">
                    <span className="text-lg font-medium tracking-wide">
                      Continue
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="bg-[#ffffff9d] backdrop-blur-md 
                      px-3 py-1 rounded-full text-sm text-[#0099ff]
                      border border-[#0099ff]/30 font-medium">
                        {supportNeeded.length}
                      </span>
                      <motion.svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    </div>
                  </motion.button>
                )}
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
