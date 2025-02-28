import React from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
const OptionService = () => {
  return (
    <div className="flex flex-col items-center w-full mt-7 h-screen bg-[#fff] ">
      <span className="text-xl font-thin mt-10 text-[#000]">
        Subscription Plans
      </span>

      <h1
        className={`${styles.sourceSerif} font-bold text-5xl text-[#000] max-w-[750px] text-center mt-5`}>
        PREDICTABLE PRICING
      </h1>
      <p
        className={`${styles.sourceSerif} text-center mt-5 font-thin text-[#000]`}>
        Pick the Plan That Matches Your Ambition. You're in control :<br />{" "}
        Pause, adjust, or cancel anytime (with no penalties). You Deserve
        Flexibility.
      </p>

      <div className="pt-10 grid grid-cols-5 grid-rows-4 gap-4 justify-center w-full h-screen">
        <div className="row-span-3 col-start-2 bg-[#fff] rounded-xl">
          <div className={styles.card}>
            <span className={styles.title}>
              Pro
              <p className={styles.pricing}>
                $8 <span className={styles.pricingTime}>/ month</span>
              </p>
              <span className={styles.subTitle}>
                Everything on Basic plus:
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                </ul>
                <button className={styles.button}>
                  <span className={styles.textButton}>Get pro now</span>
                </button>
              </span>
            </span>
          </div>
        </div>
        <div className="row-span-3 col-start-3 bg-[#fff] rounded-xl">
          <div className={styles.card}>
            <span className={styles.title}>
              Pro
              <p className={styles.pricing}>
                $8 <span className={styles.pricingTime}>/ month</span>
              </p>
              <span className={styles.subTitle}>
                Everything on Basic plus:
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                </ul>
                <button className={styles.button}>
                  <span className={styles.textButton}>Get pro now</span>
                </button>
              </span>
            </span>
          </div>
        </div>
        <div className="row-span-3 col-start-4  bg-[#fff] rounded-xl">
          <div className={styles.card}>
            <span className={styles.title}>
              Pro
              <p className={styles.pricing}>
                $8 <span className={styles.pricingTime}>/ month</span>
              </p>
              <span className={styles.subTitle}>
                Everything on Basic plus:
                <ul className={styles.list}>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                  <li className={styles.listItem}>
                    <span className={styles.check}>✓</span> Feature
                  </li>
                </ul>
                <button className={styles.button}>
                  <span className={styles.textButton}>Get pro now</span>
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionService;
