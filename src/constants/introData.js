// src/constants/introData.js
export const MOOD_OPTIONS = [
  { emoji: "😊", label: "Hạnh phúc", value: "Happy" },
  { emoji: "😔", label: "Buồn bã", value: "Sad" },
  { emoji: "😡", label: "Tức giận", value: "Angry" },
  { emoji: "😨", label: "Lo lắng", value: "Anxious" },
  { emoji: "🙂", label: "Bình yên", value: "Calm" },
  { emoji: "😴", label: "Mệt mỏi", value: "Tired" },
  { emoji: "💪", label: "Động lực", value: "Motivated" },
  { emoji: "😢", label: "Cô đơn", value: "Lonely" },
  { emoji: "🤔", label: "Bối rối", value: "Confused" },
  { emoji: "🙏", label: "Biết ơn", value: "Grateful" },
];

export const SLEEP_OPTIONS = [
  {
    hours: "< 4",
    label: "Dưới 4 giờ",
    description: "Thiếu ngủ nghiêm trọng",
    value: "Dưới 4 giờ",
  },
  {
    hours: "4-5",
    label: "4-5 giờ",
    description: "Ngủ ít, cần cải thiện",
    value: "4-5 giờ",
  },
  {
    hours: "6-7",
    label: "6-7 giờ",
    description: "Ngủ trung bình, ổn định",
    value: "6-7 giờ",
  },
  {
    hours: "8+",
    label: "8 giờ trở lên",
    description: "Ngủ đủ, sức khỏe tốt",
    value: "8+ giờ",
  },
];
