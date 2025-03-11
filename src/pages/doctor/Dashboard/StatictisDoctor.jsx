import React from "react";
import MedicalProfile from "../../../components/Dashboard/Patient/MedicalProfile";
const StatictisDoctor = () => {
  return (
    <div>
      <h1 className="text-5xl font-serif text-[#6c2694]">Have a nice day</h1>
      <div className="min-h-[calc(100vh-100px)] grid grid-cols-12 grid-rows-1 gap-4">
        <div className="border col-span-8">
          <div>1</div>
          <div>
            {" "}
            <MedicalProfile />
          </div>
        </div>
        <div className="border col-span-4 col-start-9 space-y-4">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StatictisDoctor;
