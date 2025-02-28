import { useState } from "react";
import { motion } from "framer-motion";

const profiles = [
  { id: 1, name: "Person 1", img: "/doctor.png" },
  { id: 2, name: "Person 2", img: "/2.png" },
  { id: 3, name: "Person 3", img: "/2.png" },
  { id: 4, name: "Person 4", img: "/2.png" },
  { id: 5, name: "Person 5", img: "/2.png" },
  { id: 6, name: "Person 6", img: "/2.png" },
  { id: 7, name: "Person 7", img: "/2.png" },
  { id: 8, name: "Person 8", img: "/2.png" },
  { id: 9, name: "Person 9", img: "/2.png" },
  { id: 1, name: "Person 1", img: "/2.png" },
  { id: 2, name: "Person 2", img: "/2.png" },
  { id: 3, name: "Person 3", img: "/2.png" },
  { id: 4, name: "Person 4", img: "/2.png" },
];

export default function Process() {
  const [selected, setSelected] = useState(profiles[0]);
  const baseRadius = 150;
  const baseSize = 64;
  const maxProfiles = 10;

  const adjustedRadius =
    baseRadius + (profiles.length > 6 ? (profiles.length - 6) * 10 : 0);
  const adjustedSize =
    baseSize -
    (profiles.length > maxProfiles ? (profiles.length - maxProfiles) * 5 : 0);

  const handleClick = (profile) => {
    setSelected(profile);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-220px)] text-white relative">
      <div className=" bg-amber-300 flex items-center justify-center ">
        {/* Vòng tròn chính */}
        <div className="absolute w-90 h-90 shadow-xl rounded-full border-4 border-white overflow-hidden flex items-center justify-center">
          <img
            src={selected.img}
            alt={selected.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        {/* Các vòng tròn nhỏ xoay quanh tâm */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}>
          {profiles.map((profile, index) => {
            const angle = index * (360 / profiles.length);
            const x = adjustedRadius * Math.cos(angle * (Math.PI / 180));
            const y = adjustedRadius * Math.sin(angle * (Math.PI / 180));
            return (
              <motion.div
                key={profile.id}
                className="absolute rounded-full overflow-hidden border-2 border-white cursor-pointer bg-gray-800 flex items-center justify-center"
                style={{
                  width: `${adjustedSize}px`,
                  height: `${adjustedSize}px`,
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => handleClick(profile)}>
                <img
                  src={profile.img}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
