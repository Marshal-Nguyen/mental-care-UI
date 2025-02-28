import { useState } from "react";
import { Send } from "lucide-react";

export default function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isUser, setIsUser] = useState(true);

    const sendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, sender: isUser ? "user" : "bot" }]);
            setInput("");
            setIsUser(!isUser);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-[500px] border rounded-lg shadow-lg p-4 bg-white">
            <div className="flex-1 overflow-y-auto space-y-2 p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start mr-auto"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 p-2 border-t">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
}
