import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/Web/QuestionFlow.module.css";
import WavyLine from "./WavyLine";

const questions = [
  "Hello! Welcome to our site! 😊",
  "What's your name?",
  "What brings you here today?",
  "Do you want to explore more?",
];

const QuestionFlow = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");

  const nextStep = () => {
    if (step === 1 && name.trim() === "") return;
    if (step < questions.length - 1) setStep(step + 1);
    else onFinish(name);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className={styles.content}>
          <h1>{questions[step]}</h1>

          {step === 1 && (
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          )}

          <button onClick={nextStep} className={styles.button}>
            {step < questions.length - 1 ? "Next" : "Finish"}
          </button>
        </motion.div>
      </AnimatePresence>
      <WavyLine
        className="absolute bottom-0.5"
        step={step}
        totalSteps={questions.length}
      />
    </div>
  );
};

export default QuestionFlow;
