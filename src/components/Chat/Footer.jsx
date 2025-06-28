import React from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Clock } from "lucide-react";

const Footer = () => {
  console.log("Footer component rendered");

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative z-20 mt-auto p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm shadow-md p-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400/70">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#F06292]" />
                <span>Always caring</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6B728E]" />
                <span>100% private</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C8A2C8]" />
                <span>24/7 available</span>
              </div>
            </div>
            <div className="text-sm text-gray-400/60">
              <p>© 2024 Mental Health Companion</p>
            </div>
          </div>
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-4 pt-4 border-t border-[#C8A2C8]/10">
            <p className="text-sm text-gray-400/60">
              Remember: Seeking help is a sign of strength, not weakness. You
              matter. 💙
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
