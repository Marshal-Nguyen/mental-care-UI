import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Heart } from "lucide-react";
import ConversationSidebar from "../../../components/Chat/ConversationSidebar";
import ChatbotAvatar from "../../../components/Chat/ChatbotAvatar";
import MainLayout from "../../../components/Chat/MainLayout";

// API Base URL
const BASE_URL = "https://api.emoease.vn/chatbox-service/api/AIChat";
const TOKEN = localStorage.getItem("token"); // Thay bằng logic lấy token thực tế

// Component hiển thị tin nhắn
const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 mb-4 overflow-y-auto border border-white/40">
      <AnimatePresence>
        {messages &&
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 mb-4 ${
                message.senderIsEmo ? "justify-start" : "justify-end"
              }`}>
              {message.senderIsEmo && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A2C8] to-[#6B728E] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              )}
              <motion.div
                className={`max-w-xs p-3 rounded-xl ${
                  message.senderIsEmo
                    ? "bg-white/90 text-gray-700 shadow"
                    : "bg-[#C8A2C8] text-white ml-auto shadow"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.createdDate
                    ? new Date(message.createdDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </motion.div>
            </motion.div>
          ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

// Component nhập tin nhắn
const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-lg shadow-xl p-4 rounded-2xl border border-white/40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSubmit(e);
          }}
          placeholder="Share what's on your mind..."
          className="flex-1 px-4 py-3 bg-white/60 border border-[#C8A2C8]/30 rounded-xl focus:outline-none focus:border-[#C8A2C8] transition-colors placeholder-gray-400/60"
          disabled={disabled}
        />
        <motion.button
          type="submit"
          className="px-4 py-3 bg-[#C8A2C8] hover:bg-[#C8A2C8]/80 text-white rounded-xl transition-colors shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={disabled || !message.trim()}>
          <Send className="w-5 h-5" />
        </motion.button>
      </form>
    </motion.div>
  );
};

// Component chính
type Session = {
  id: string;
  name: string;
  [key: string]: any;
};

const AIChatBoxWithEmo = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  type Message = {
    senderIsEmo: boolean;
    content: string;
    createdDate?: string;
    [key: string]: any;
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionName, setSessionName] = useState("Your Zen Companion");

  // Lấy danh sách phiên
  const fetchSessions = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/sessions?PageIndex=1&PageSize=10`,
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      const data = await response.json();
      setSessions(Array.isArray(data.data) ? data.data : []);
      console.log("Fetched conversations AIChat:", data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phiên:", error);
    }
  };

  // Lấy tin nhắn của phiên
  const fetchMessages = async (sessionId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/sessions/${sessionId}/messages?PageIndex=1&PageSize=20`,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      const data = await response.json();
      setMessages(Array.isArray(data.data) ? data.data : []);
      // Đánh dấu tin nhắn đã đọc
      await fetch(`${BASE_URL}/sessions/${sessionId}/messages/read`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
    } catch (error) {
      console.error("Lỗi khi lấy tin nhắn:", error);
    }
  };

  // Tạo phiên mới
  const createSession = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/sessions?sessionName=Đoạn chat mới`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      const data = await response.json();
      setSessions((prev) => [...prev, data]);
      setCurrentSessionId(data.id);
      setSessionName(data.name);
      setMessages(data.initialMessage ? [data.initialMessage] : []);
    } catch (error) {
      console.error("Lỗi khi tạo phiên:", error);
    }
  };

  // Xóa phiên
  const deleteSession = async (sessionId) => {
    try {
      await fetch(`${BASE_URL}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setMessages([]);
        setSessionName("Your Zen Companion");
      }
    } catch (error) {
      console.error("Lỗi khi xóa phiên:", error);
    }
  };

  // Gửi tin nhắn
  const sendMessage = async (message) => {
    if (!currentSessionId) return;
    try {
      const response = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: message,
          sessionId: currentSessionId,
        }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          senderIsEmo: false,
          content: message,
          createdDate: new Date().toISOString(),
        },
        ...(Array.isArray(data) ? data : []),
      ]);
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error);
    }
  };

  // Xử lý chọn phiên
  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    const session = sessions.find((s) => s.id === sessionId);
    setSessionName(session?.name || "Your Zen Companion");
    fetchMessages(sessionId);
  };

  // Tải danh sách phiên khi component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <MainLayout>
      {/* Background image layer */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('public/bg_Question.webp')",
        }}
      />
      {/* Overlay for darken effect */}
      {/* <div className="fixed inset-0 z-10 bg-gradient-to-br from-[#c8a2c8]/40 via-white/30 to-[#6b728e]/40 pointer-events-none" /> */}
      {/* Main chat layout */}
      <div className="relative z-20 flex h-[calc(100vh-120px)] max-w-7xl mx-auto py-8">
        <ConversationSidebar
          sessions={sessions}
          onConversationSelect={handleSelectSession}
          onNewChat={createSession}
          activeConversation={currentSessionId}
          onDeleteConversation={deleteSession}
        />
        <div className="flex-1 flex flex-col px-4 md:px-8">
          {currentSessionId ? (
            <>
              <motion.div
                className="flex items-center gap-4 bg-white/80 backdrop-blur-lg shadow-xl p-6 rounded-2xl mb-4 border border-white/40"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <ChatbotAvatar />
                <div>
                  <h2 className="text-2xl font-bold text-[#6B728E] drop-shadow">
                    {sessionName}
                  </h2>
                  <p className="text-[#C8A2C8]/80 text-base font-medium">
                    Always here to listen and support you
                  </p>
                </div>
              </motion.div>
              <ChatMessages messages={messages} />
              <ChatInput
                onSendMessage={sendMessage}
                disabled={!currentSessionId}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl border border-white/40">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center">
                <Heart className="w-14 h-14 text-[#C8A2C8] mx-auto mb-4 drop-shadow-lg" />
                <p className="text-[#6B728E]/70 text-lg font-semibold">
                  Select or start a new conversation to begin!
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AIChatBoxWithEmo;
