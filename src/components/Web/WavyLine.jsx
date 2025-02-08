import { motion } from "framer-motion";

const WavyLine = ({ step, totalSteps }) => {
  const stepSpacing = 300; // Khoảng cách giữa các step
  const waveShift = -step * stepSpacing; // Dịch chuyển sóng khi đổi step

  // Tạo sóng dài hơn với biên độ và tần số đều nhau
  const wavePath =
    "M -750 62 Q -650 112 -500 112 T -250 62 T 0 12 T 250 62 T 500 112 T 750 62 T 1000 12 T 1250 62 T 1500 112 T 1750 62 T 2000 12 T 2250 62 T 2500 112 T 2750 62";

  // Tính vị trí X của từng step trên sóng
  const stepPositions = Array.from(
    { length: totalSteps },
    (_, i) => i * stepSpacing
  );

  return (
    <svg className="wave-svg" viewBox="0 0 2250 300" preserveAspectRatio="none">
      {/* Nhóm chứa sóng và vòng tròn, di chuyển ngang khi đổi step */}
      <motion.g
        animate={{ x: waveShift }}
        transition={{ duration: 0.6, ease: "easeInOut" }}>
        {/* Đường sóng */}
        <path d={wavePath} fill="transparent" stroke="white" strokeWidth="3" />

        {/* Các vòng tròn step nằm trên sóng */}
        {stepPositions.map((xPos, i) => {
          const isActive = i === step;
          const size = isActive ? 60 : 40; // Step hiện tại lớn nhất
          const opacity = isActive ? 1 : 0.5;
          const yPos = 150; // Vòng tròn nằm đúng trên sóng

          return (
            <motion.circle
              key={i}
              cx={xPos}
              cy={yPos}
              r={size}
              fill="white"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth={4}
              animate={{ opacity, scale: isActive ? 1.2 : 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
};

export default WavyLine;
