import React from "react";
import { Link } from "react-router-dom";

const NavigaForWeb = () => {
  return (
    <nav className="p-4 bg-red-500 w-screen">
      <Link to="/Home" className="mr-4">
        Home
      </Link>
      <Link to="/TestEmo">About</Link>
    </nav>
  );
};

export default NavigaForWeb;
