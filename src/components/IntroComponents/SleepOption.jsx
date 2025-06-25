import React from "react";
import { motion } from "framer-motion";

export const SleepQuestion = React.forwardRef(
  (
    {
      currentQuestion,
      formData,
      onOptionSelect,
      options,
      questionText,
      showConfirmButton = false,
      onConfirm,
      isLoading = false,
    },
    ref
  ) => {
    const isOptionSelected =
      formData && formData[currentQuestion] !== undefined;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl text-white font-bold mb-6 text-center relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            {questionText}
          </span>
          <motion.div
            className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-white rounded-full"
            style={{ transform: "translateX(-50%)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "4rem", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          />
        </motion.h1>

        {/* Layout mới theo mẫu */}
        <div className="relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar hide-scrollbar px-4">
          {options.map((option, index) => (
            <motion.div
              key={option.value}
              className="snap-start py-1 h-[75px] flex items-center"
              initial={{ scale: 0.9, opacity: 0.6 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                },
              }}
              viewport={{
                once: false,
                amount: 0.8,
                margin: "-5%",
              }}>
              <div
                onClick={() => onOptionSelect(option.value)}
                className={`
                  bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
                  transform transition-all duration-300 w-full
                  hover:bg-white/20 hover:-translate-y-1
                  ${
                    formData[currentQuestion] === option.value
                      ? "ring-2 ring-blue-400 bg-white/30 scale-105"
                      : "hover:scale-[1.02]"
                  }
                  flex items-center mx-auto h-[60px]
                `}>
                <div className="flex items-center gap-3 w-full">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-semibold">{option.label}</h3>
                    <p className="text-white/70 text-xs">
                      {option.description}
                    </p>
                  </div>
                  {formData[currentQuestion] === option.value && (
                    <span className="text-blue-400 text-xl">✓</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nút xác nhận */}
        {showConfirmButton && isOptionSelected && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.03,
              backdropFilter: "blur(12px)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            disabled={isLoading}
            className="mt-6 px-5 py-3
              bg-[#602985]/10 backdrop-blur-md
              border-2 border-[#602985]/30
              text-white rounded-xl
              transition-all duration-300
              flex items-center gap-4
              shadow-[0_4px_20px_rgba(96,41,133,0.2)]
              hover:bg-[#602985]/20
              hover:border-[#602985]/50
              hover:shadow-[0_8px_25px_rgba(96,41,133,0.3)]
              disabled:opacity-50
              group">
            <span className="text-lg font-medium tracking-wide">
              {isLoading ? "Đang xử lý..." : "Xác nhận"}
            </span>
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            ) : (
              <motion.svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  }
);

export default SleepQuestion;
