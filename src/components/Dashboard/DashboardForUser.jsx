import React from "react";
import NavigaForDash from "./NavigaForDash";
import Calender from "./Calender";
import DoctorCurrent from "./DoctorCurrent";
import PatientRecord from "./PatientRecord";
import Profile from "./Profile";

const DashboardForUser = () => {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex items-center justify-center w-[80%] min-h-[calc(100vh-40px)] bg-[linear-gradient(54deg,#51c8ff_0%,#6109ee_100%)] m-5 rounded-2xl">
        <div className="w-[5%]">
          <NavigaForDash />
        </div>
        <div className="grid grid-cols-9 grid-rows-8 gap-4 w-[95%] bg-[#fff] min-h-[calc(100vh-80px)] m-5 rounded-2xl p-5">
          {/* DoctorCurrent chiếm phần trên cùng */}
          <div className="col-span-6 row-span-4">
            <DoctorCurrent />
          </div>
          {/* Profile được dời lên trên  */}
          <div className=" col-span-3 row-span-6 col-start-7 h-full overflow-y-auto">
            <Profile />
          </div>
          {/* Calender dời lên, lấp khoảng trống */}
          <div className="col-span-3 row-span-4 bg-white rounded-2xl">
            <Calender />
          </div>
          {/* PatientRecord được đẩy lên */}
          <div className="rounded-2xl col-span-3 row-span-4 col-start-4 bg-white">
            <PatientRecord />
          </div>
          {/* Ô cuối cùng vẫn giữ nguyên */}
          <div className="border col-span-3 row-span-2 col-start-7 bg-white rounded-2xl">
            6
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardForUser;
