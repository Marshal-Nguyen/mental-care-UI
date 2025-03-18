import { motion } from "framer-motion";

const WavyLine = ({ step, totalSteps }) => {
  const stepSpacing = 1000;
  const waveShift = -step * stepSpacing;

  const wavePath =
    "M -90 -110.88 T -90 105.12 T 410 105.12 T 1410 105.12 T 2410 105.12 T 3410 105.12 T 4410 105.12 T 5410 105.12 T 6410 105.12 T 7410 105.12 T 8410 105.12";

  const icons = [
    "waving-hand-svgrepo-com.svg",
    "eye-svgrepo-com.svg",
    "heart-svgrepo-com.svg",
    "sleep-svgrepo-com.svg",
    "share-svgrepo-com.svg",
    "sports-svgrepo-com.svg",
    "health-care-diet-svgrepo-com.svg",
    "heart-svgrepo-com.svg",
  ];

  return (
    <svg
      className="wave-svg "
      viewBox="200 -300 2400 600"
      preserveAspectRatio="none">
      <motion.g
        animate={{ x: waveShift }}
        transition={{ duration: 1.2, ease: "easeInOut" }}>
        <path d={wavePath} fill="transparent" stroke="white" strokeWidth="3" />

        {Array.from({ length: totalSteps }).map((_, i) => {
          const xPos = i * stepSpacing;
          const isActive = i === step;

          return (
            <motion.g key={i}>
              {/* Vòng tròn */}
              <motion.circle
                cx={xPos + 1400}
                cy={105.12}
                r={isActive ? 50 : 40}
                fill="#97D5FF"
                stroke="white"
                strokeWidth={isActive ? 3 : 1}
                animate={{
                  opacity: isActive ? 1 : 1,
                  scale: isActive ? 1.5 : 1,
                  filter: isActive
                    ? "drop-shadow(0px 0px 15px rgba(255, 255, 255, 0.8))"
                    : "none",
                }}
                transition={{ duration: 0.8, ease: "easeIn" }}
              />
              {/* Icon tương ứng từng step */}
              <motion.image
                href={`/IconForIntro/${icons[i % icons.length]}`}
                x={xPos + 1375}
                y={80}
                width={50}
                height={50}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1.2 : 1,
                }}
              />
            </motion.g>
          );
        })}
      </motion.g>
    </svg>
  );
};

export default WavyLine;
