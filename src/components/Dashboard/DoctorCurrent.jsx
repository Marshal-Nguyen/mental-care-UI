import React from "react";

const DoctorCurrent = () => {
  return (
    <div className="grid relative grid-cols-5 grid-rows-5 h-full">
      {/* Phần tiêu đề chào buổi sáng */}
      <div className="flex gap-2 col-span-5 items-center mb-2">
        <h1 className="text-xl font-mono font-semibold">Good Morning</h1>
        <span className="font-bold text-2xl text-[#0c0f99]">Malak!</span>
      </div>

      {/* Phần chính với background gradient */}
      <div
        className=" col-span-5 row-span-4 row-start-2 bg-[linear-gradient(54deg,#51c8ff_0%,#6109ee_100%)] 
                      grid grid-cols-6 grid-rows-5 md:gap-2 rounded-2xl p-4">
        <div className="col-span-4 row-span-3 rounded-xl flex flex-col">
          <span className="font-thin text-[40px] text-white">
            Nguyen Hong Ngoc
          </span>
          <span className="font-mono text-[20px] text-white">
            ⭐ ⭐ ⭐ ⭐ ⭐
          </span>
        </div>
        <div className="col-span-2 row-span-2 col-start-1 row-start-4 bg-[#ffffff9a] shadow-md rounded-xl p-1 px-3">
          <span className="font-mono">Process</span>
          <h1 className="font-bold text-[30px]">15</h1>
        </div>
        <div className="col-span-2 row-span-2 col-start-3 row-start-4 bg-[#ffffff9a] shadow-md rounded-xl p-1 px-3">
          <span className="font-mono">Number Test</span>
          <h1 className="font-bold text-[30px]">45</h1>
        </div>
        <div className="col-span-2 row-span-5 col-start-5 row-start-1 rounded-xl flex justify-center items-center">
          <img
            className="w-full absolute bottom-0 h-full object-cover object-[0%_35%] "
            src="/doctor.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorCurrent;
