import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import NavigaForWeb from "../../../components/Web/NavigaForWeb";
import LogIn from "../../../components/Web/LogIn";
import Footer from "../../../components/Web/Footer";

const Home = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-4">
        <div className="w-12 h-12"></div>
        <NavigaForWeb />
        <LogIn />
      </header>

      {/* Nội dung chính */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Chỉ render Footer nếu đường dẫn là "/learnAboutEmo" */}
      {location.pathname === "/HomeUser/learnAboutEmo" && <Footer />}
    </div>
  );
};

export default Home;
