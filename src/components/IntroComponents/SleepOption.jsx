import React from "react";
import { motion } from "framer-motion";
export const SleepOption = ({
  hours,
  label,
  description,
  isSelected,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center p-5 rounded-xl cursor-pointer transition-all w-48 ${
        isSelected
          ? "bg-[#602985] text-white shadow-lg"
          : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
      }`}>
      <div className="text-3xl mb-2 font-bold">{hours}</div>
      <div className="font-medium">{label}</div>
      <div className="text-xs mt-1 opacity-80">{description}</div>
    </motion.div>
  );
};
export const SleepQuestion = React.forwardRef(
  ({ selectedDuration, onDurationSelect, sleepOptions }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="min-h-screen flex flex-col justify-center items-center p-6 relative z-10">
        <h1 className="text-4xl md:text-6xl text-white font-bold mb-12 text-center">
          Thời lượng giấc ngủ của bạn hôm nay?
        </h1>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {sleepOptions.map((option) => (
            <SleepOption
              key={option.value}
              hours={option.hours}
              label={option.label}
              description={option.description}
              isSelected={selectedDuration === option.value}
              onClick={() => onDurationSelect(option.value)}
            />
          ))}
        </div>
      </motion.div>
    );
  }
);
