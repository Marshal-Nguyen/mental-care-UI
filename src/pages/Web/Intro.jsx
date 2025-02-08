import React from "react";
import styles from "../../styles/Web/Intro.module.css";
import QuestionFlow from "../../components/Web/QuestionFlow";
const Intro = () => {
  const handleFinish = (name) => {
    alert(`Welcome, ${name}!`);
  };
  return (
    <>
      <QuestionFlow onFinish={handleFinish} />
    </>
  );
};

export default Intro;
