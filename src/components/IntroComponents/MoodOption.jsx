import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hiệu ứng gợn sóng khi click - giữ nguyên
const Ripple = ({ isActive, onComplete }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.span
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: "100%", height: "100%", opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            top: 0,
            left: 0,
            transform: "translate(-50%, -50%) scale(2)",
            transformOrigin: "center",
          }}
          onAnimationComplete={onComplete}
        />
      )}
    </AnimatePresence>
  );
};

export const MoodOption = ({ emoji, label, value, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick(value);
    setTimeout(() => setIsClicked(false), 800);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative flex flex-col items-center p-4 md:p-6 rounded-xl cursor-pointer transition-all overflow-hidden ${
        isSelected
          ? "bg-gradient-to-br from-[#602985] to-[#8034bb] text-white shadow-lg"
          : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
      }`}>
      <Ripple isActive={isClicked} onComplete={() => setIsClicked(false)} />
      <motion.div
        className="text-4xl md:text-6xl mb-4"
        animate={{
          rotate: isHovered ? [0, 15, -15, 0] : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          duration: 0.6,
          type: "tween",
          times: [0, 0.3, 0.6, 1],
          loop: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}>
        {emoji}
      </motion.div>
      <motion.div
        className="font-medium text-lg"
        animate={{ scale: isSelected ? 1.1 : 1 }}>
        {label}
      </motion.div>
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-1 w-10 h-1 bg-white rounded-full"
        />
      )}
    </motion.div>
  );
};

export const MoodQuestion = React.forwardRef(
  ({ selectedMoods, onMoodSelect, moodOptions, onConfirm }, ref) => {
    const handleSelectMood = (value) => {
      let updatedMoods = [...(selectedMoods || [])];
      if (updatedMoods.includes(value)) {
        updatedMoods = updatedMoods.filter((mood) => mood !== value); // Bỏ chọn nếu đã chọn
      } else if (updatedMoods.length < 2) {
        updatedMoods.push(value); // Thêm nếu chưa đầy 2
      }
      onMoodSelect(updatedMoods); // Gửi mảng mới lên cha
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen flex flex-col justify-center items-center p-6 relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl text-white font-bold mb-16 text-center relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Hôm nay bạn thấy thế nào?
          </span>
          <motion.div
            className="absolute -bottom-4 left-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-white rounded-full"
            style={{ transform: "translateX(-50%)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "5rem", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl max-h-[70vh] overflow-y-auto">
          {moodOptions.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}>
              <MoodOption
                emoji={option.emoji}
                label={option.label}
                value={option.value}
                isSelected={selectedMoods?.includes(option.value) || false}
                onClick={handleSelectMood}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}>
          <motion.p className="text-white/70 text-center">
            Chọn tối đa 2 biểu tượng mô tả cảm xúc của bạn ngày hôm nay
          </motion.p>

          <motion.div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-[#602985] to-[#7b42b0]"></div>
            <span className="text-white text-sm">
              Đã chọn: {selectedMoods?.length || 0}/2
            </span>
          </motion.div>

          {selectedMoods?.length > 0 && (
            <motion.button
              onClick={onConfirm} // Gọi hàm onConfirm thay vì onMoodSelect
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#602985] to-[#7b42b0] text-white rounded-lg hover:bg-purple-800 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}>
              Xác nhận
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    );
  }
);

export default MoodQuestion;
