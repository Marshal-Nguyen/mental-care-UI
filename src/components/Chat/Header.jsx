import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart, Home, MessageCircle } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative z-30 p-4 md:p-6 bg-gradient-to-r from-white via-[#f8f4fa] to-white shadow-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ scale: 1.12, rotate: 12 }}>
            <img
              src="public/emo.webp"
              alt="Logo"
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#6B728E] flex items-center justify-center text-white shadow-lg"
            />
          </motion.div>
          <div>
            <h1 className="font-bold text-2xl text-gray-700 group-hover:text-[#795596] transition-colors tracking-tight">
              EmoEase – Ở đây để bạn được là chính mình
            </h1>
            <p className="text-xs text-gray-600/80 font-light italic">
              Nơi an toàn cho mọi cảm xúc lên tiếng
            </p>
          </div>
        </Link>

        {/* Menu Items */}
        <div className="flex items-center gap-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              location.pathname === "/"
                ? "bg-[#C8A2C8]/20 text-[#C8A2C8] shadow"
                : "text-gray-400/80 hover:text-[#C8A2C8] hover:bg-[#C8A2C8]/10"
            }`}>
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
