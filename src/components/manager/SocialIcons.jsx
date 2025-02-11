import React from "react";
import { FaSpotify, FaPinterest, FaDribbble, FaTelegramPlane } from "react-icons/fa";

const SocialIcons = () => {
    const socialLinks = [
        { icon: <FaSpotify />, label: "Spotify", bg: "bg-green-500" },
        { icon: <FaPinterest />, label: "Pinterest", bg: "bg-red-500" },
        { icon: <FaDribbble />, label: "Dribbble", bg: "bg-pink-500" },
        { icon: <FaTelegramPlane />, label: "Telegram", bg: "bg-blue-500" },
    ];

    return (
        <div className="flex flex-col items-start gap-4 mt-8">
            {socialLinks.map((social, index) => (
                <div
                    key={index}
                    className="relative flex items-center group cursor-pointer"
                >
                    {/* Icon */}
                    <div
                        className={`w-12 h-12 flex justify-center items-center rounded-lg shadow-md transition-all duration-300 bg-white text-gray-800 group-hover:text-white group-hover:${social.bg}`}
                        style={{ backgroundColor: social.bg }}
                    >
                        {social.icon}
                    </div>

                    {/* Label */}
                    <span
                        className="absolute left-16 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 bg-gray-200 text-gray-800 px-4 py-1 rounded-full shadow-md text-sm"
                    >
                        {social.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default SocialIcons;
