import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ChatbotAvatar = React.memo(() => {
  const [isHovered, setIsHovered] = useState(false);

  const expressions = ["😊", "😌", "🤗", "😇", "☺️"];
  const [currentExpression, setCurrentExpression] = useState(expressions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newExpression =
        expressions[Math.floor(Math.random() * expressions.length)];
      setCurrentExpression(newExpression);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? [0, 5, -5, 0] : 0,
      }}
      transition={{
        duration: 0.3,
        rotate: { duration: 0.6, ease: "easeInOut" },
      }}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8A2C8]/40 to-[#6B728E]/40 animate-pulse -z-10 blur-lg scale-110" />
      <motion.div
        className="w-16 h-16 bg-white/90 backdrop-blur-sm shadow-md rounded-full flex items-center justify-center text-3xl cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <motion.span
          key={currentExpression}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}>
          {currentExpression}
        </motion.span>
      </motion.div>
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#F06292] text-sm"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.random() * 60 - 30,
                y: -40 - Math.random() * 20,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{ duration: 2, delay: i * 0.2, ease: "easeOut" }}
              style={{ left: "50%", top: "50%" }}>
              💕
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );
});

export default ChatbotAvatar;
