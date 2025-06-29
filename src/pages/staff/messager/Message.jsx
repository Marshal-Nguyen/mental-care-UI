import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FiImage } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const fakeConversations = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/50?img=1",
    lastMessage: "Hôm nay thế nào?",
    time: "15 phút",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/50?img=2",
    lastMessage: "OK, mai gặp!",
    time: "30 phút",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/50?img=3",
    lastMessage: "Loading..., đúng rồi!",
    time: "1 giờ",
  },
];

const fakeMessages = [
  { id: uuidv4(), sender: "me", text: "Hello!", time: "10:00" },
  { id: uuidv4(), sender: "other", text: "Chào bạn!", time: "10:01" },
  { id: uuidv4(), sender: "me", text: "Bạn khỏe không?", time: "10:02" },
  { id: uuidv4(), sender: "other", text: "Mình ổn, cảm ơn!", time: "10:03" },
];

export default function MessengerUI() {
  const [messages, setMessages] = useState(fakeMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: uuidv4(),
      sender: "me",
      text: input,
      time: "10:10",
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Đoạn chat</h2>
        {fakeConversations.map((conv) => (
          <div
            key={conv.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <img
              src={conv.avatar}
              alt={conv.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{conv.name}</p>
              <p className="text-sm text-gray-500">{conv.lastMessage}</p>
            </div>
            <span className="text-xs text-gray-400 ml-auto">{conv.time}</span>
          </div>
        ))}
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/50?img=4"
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <p className="font-semibold">Nguyễn Văn A</p>
          </div>
          <BsThreeDots className="text-xl cursor-pointer" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              } mb-2`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="bg-white p-3 flex items-center gap-2 border-t">
          <FiImage className="text-2xl text-gray-500 cursor-pointer" />
          <input
            type="text"
            placeholder="Aa"
            className="flex-1 p-2 border rounded-lg outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg">
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
}
