import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import NavigaForWeb from "../../../components/Web/NavigaForWeb";
import LogIn from "../../../components/Web/LogIn";
import Footer from "../../../components/Web/Footer";
import Social from "../../../components/Web/Social";
import Chatbox from "../../../components/staff/Chatbox";
import PremiumChatPopup from "../../../components/Web/ChatPopUp";

const Home = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      {location.pathname !== "/HomeUser/dashboardUser" && (
        <header className="flex justify-between items-center px-10 pt-4">
          <div className="w-12 h-12"></div>
          <NavigaForWeb />
          <LogIn />
        </header>
      )}
      {/* Nội dung chính */}
      <main className="flex justify-center">
        <Outlet />
      </main>
      <div className=" bottom-[35%] fixed z-50">
        {location.pathname === "/HomeUser/learnAboutEmo" && <Social />}
      </div>
      <div className=" bottom-[15%] fixed z-50">
        {location.pathname === "/HomeUser/learnAboutEmo" && (
          <PremiumChatPopup />
        )}
      </div>
      {/* Chỉ render Footer nếu đường dẫn là "/learnAboutEmo" */}
      {location.pathname === "/HomeUser/learnAboutEmo" && <Footer />}
    </div>
  );
};

export default Home;
