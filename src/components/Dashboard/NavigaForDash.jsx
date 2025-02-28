import React from "react";
import { useNavigate } from "react-router-dom";
const NavigaForDash = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/HomeUser/learnAboutEmo");
  };
  return (
    <div className="flex justify-center">
      <div
        class="group relative flex size-10 items-center justify-center gap-1 rounded-lg border border-white"
        onClick={handleGoHome}>
        <div class="size-1 rounded-full bg-white duration-300 group-hover:opacity-0"></div>
        <div class="relative size-1 origin-center rounded-full bg-white duration-300 before:absolute before:right-[2px] before:h-1 before:origin-right before:rounded-full before:bg-white before:delay-300 before:duration-300 after:absolute after:right-[2px] after:h-1 after:origin-right after:rounded-full after:bg-white after:delay-300 after:duration-300 group-hover:w-6 group-hover:before:w-3.5 group-hover:before:-rotate-45 group-hover:after:w-3.5 group-hover:after:rotate-45"></div>
        <div class="size-1 rounded-full bg-white duration-300 group-hover:opacity-0"></div>
      </div>
    </div>
  );
};

export default NavigaForDash;
