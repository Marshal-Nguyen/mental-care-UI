import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MessageCircle,
  Plus,
  Archive,
  Heart,
  Trash2,
} from "lucide-react";

// API Base URL
const BASE_URL = "https://api.emoease.vn/chatbox-service/api/AIChat";
const TOKEN = localStorage.getItem("token"); // Thay bằng logic lấy token thực tế

const ConversationSidebar = ({
  sessions,
  onConversationSelect,
  onNewChat,
  activeConversation,
  onDeleteConversation,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredConversations = sessions.filter((conv) =>
    conv.name.includes(searchQuery.toLowerCase())
  );

  const getMoodColor = () => "from-[#C8A2C8] to-[#6B728E]"; // Màu dựa trên giao diện mẫu

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  return (
    <motion.div
      className="w-80 h-full bg-gradient-to-b from-[#F8F9FA] via-[#E9ECEF] to-[#DEE2E6] border-r border-[#C8A2C8]/20 flex flex-col shadow-xl"
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.div
        className="p-6 border-b border-[#C8A2C8]/10 relative"
        animate={{
          boxShadow: [
            "0 0 20px rgba(200, 162, 200, 0.1)",
            "0 0 30px rgba(200, 162, 200, 0.2)",
            "0 0 20px rgba(200, 162, 200, 0.1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <motion.button
          onClick={onNewChat}
          className="w-full px-4 py-2 bg-gradient-to-r from-[#C8A2C8] to-[#6B728E] text-white rounded-lg transition-all duration-300 mb-4 group relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            <span>New Conversation</span>
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageCircle className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.button>

        <div className="relative">
          <motion.div
            className="bg-white/90 backdrop-blur-sm shadow-md p-3 flex items-center gap-3"
            whileFocus={{ scale: 1.02 }}>
            <Search className="w-4 h-4 text-gray-400/60" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400/60"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredConversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative cursor-pointer group ${
                activeConversation === conversation.id ? "scale-[1.02]" : ""
              }`}
              onClick={() => onConversationSelect(conversation.id)}>
              <motion.div
                className={`bg-white/90 backdrop-blur-sm shadow-md p-4 transition-all duration-300 ${
                  activeConversation === conversation.id
                    ? "bg-[#C8A2C8]/10 border border-[#C8A2C8]/30"
                    : "hover:bg-white/80"
                }`}
                whileHover={{
                  y: -2,
                  boxShadow: "0 15px 30px -10px rgba(200, 162, 200, 0.3)",
                }}>
                <div className="flex items-start gap-3 mb-2">
                  <motion.div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getMoodColor()} flex items-center justify-center flex-shrink-0`}
                    animate={{
                      scale:
                        activeConversation === conversation.id
                          ? [1, 1.1, 1]
                          : 1,
                    }}
                    transition={{ duration: 0.6 }}>
                    <Heart className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <motion.span
                        className="text-lg"
                        animate={{
                          scale:
                            activeConversation === conversation.id
                              ? [1, 1.2, 1]
                              : 1,
                        }}
                        transition={{ duration: 0.4 }}>
                        💬
                      </motion.span>
                      <h3 className="font-medium text-gray-600 text-sm truncate flex-1">
                        {conversation.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400/60 truncate mb-2">
                      {conversation.initialMessage?.content ||
                        "No messages yet"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400/50">
                        {conversation.initialMessage
                          ? formatTimeAgo(
                              conversation.initialMessage.createdDate
                            )
                          : "New"}
                      </span>
                      <motion.button
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conversation.id);
                        }}>
                        <Trash2 className="w-3 h-3 text-[#C8A2C8]/60" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#C8A2C8]/5 to-[#6B728E]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  layoutId={`hover-${conversation.id}`}
                />
              </motion.div>
              {activeConversation === conversation.id && (
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#C8A2C8] to-[#6B728E] rounded-r-full"
                  layoutId="activeIndicator"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredConversations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-400/60 text-sm">
              {searchQuery ? "No conversations found" : "No conversations yet"}
            </p>
          </motion.div>
        )}
      </div>
      <motion.div
        className="p-4 border-t border-[#C8A2C8]/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400/50">
          <Archive className="w-3 h-3" />
          <span>Your conversations are private & secure</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConversationSidebar;
