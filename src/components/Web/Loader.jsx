import React from "react";
import styles from "../../styles/Web/Loader.module.css";
const Loader = () => {
  return (
    <div class={styles.loader}>
      <span class={styles.loader_text}>loading</span>
      <span class={styles.load}></span>
    </div>
  );
};

export default Loader;
