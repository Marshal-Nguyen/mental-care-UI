import React from "react";
import styles from "../../../styles/Dashboard/Patients/Navigation.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Map, FileText, User } from "lucide-react";
const Navigation = () => {
  const navigate = useNavigate();
  const NavItem = ({ icon, text, to }) => {
    return (
      <Link
        to={to}
        className="flex items-center gap-3 cursor-pointer hover:text-white transition">
        {icon}
        <span>{text}</span>
      </Link>
    );
  };
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 grid-rows-8 h-full text-center">
        <div className=" row-span-2 flex items-center justify-center">
          <div className="w-35 flex justify-center items-center h-35 bg-gradient-to-b from-[#925FE2] to-[#7042C0] rounded-4xl ">
            <img src="/LogoForDashboard.png" alt="Logo" className="w-[70%]" />
          </div>
        </div>
        <div className="row-span-5 row-start-3 mt-5 flex justify-center">
          <nav className="flex flex-col gap-7 text-white font-light">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              to="StatictisPatient"
            />
            <NavItem icon={<Map size={20} />} text="Roadmap" to="Roadmap" />
            <NavItem
              icon={<FileText size={20} />}
              text="History"
              to="History"
            />
            <NavItem
              icon={<User size={20} />}
              text="ProfilePatient"
              to="ProfilePatient"
            />
          </nav>
        </div>
        <div className="row-start-8 flex justify-center gap-3 items-center text-white">
          <LogOut size={20} />
          <button
            type="button"
            onClick={() => {
              navigate("/HomeUser");
            }}
            className="cursor-pointer">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
