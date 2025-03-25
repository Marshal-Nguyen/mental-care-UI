import React from "react";
import styles from "../../styles/Web/Loader.module.css";
const Loader = () => {
  return (
    <div className="text-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      <p className="mt-2 text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
