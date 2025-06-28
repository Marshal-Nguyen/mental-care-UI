import React from "react";
import { motion } from "framer-motion";

const FloatingParticles = () => {
  console.log("FloatingParticles component rendered");

  const particles = [
    { size: "w-3 h-3", color: "bg-[#C8A2C8]/30", delay: 0 },
    { size: "w-2 h-2", color: "bg-[#6B728E]/40", delay: 1 },
    { size: "w-4 h-4", color: "bg-[#F06292]/25", delay: 2 },
    { size: "w-2 h-2", color: "bg-[#C8A2C8]/20", delay: 3 },
    { size: "w-3 h-3", color: "bg-[#6B728E]/30", delay: 4 },
    { size: "w-5 h-5", color: "bg-[#F06292]/20", delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${particle.size} ${particle.color}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.7, 0.4, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 25}%`,
            fontSize: "4rem",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          ☁️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
