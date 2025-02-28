import React, { useState, useEffect, useRef } from "react";

// Danh sách phản hồi mẫu
const feedbacks = [
    {
        id: 1,
        user: "Nguyễn Văn A",
        message: "Tư vấn rất hữu ích, tôi cảm thấy thoải mái hơn sau khi trò chuyện.",
        date: "2025-02-12",
        history: [
            { sender: "user", content: "Tư vấn rất hữu ích.", time: "2025-02-12 10:00" },
            { sender: "admin", content: "Cảm ơn bạn đã phản hồi!", time: "2025-02-12 11:00" },
        ],
    },
    {
        id: 2,
        user: "Trần Thị B",
        message: "Ứng dụng bị lỗi khi tôi thử thanh toán.",
        date: "2025-02-11",
        history: [
            { sender: "user", content: "Ứng dụng bị lỗi khi thanh toán.", time: "2025-02-11 09:30" },
            { sender: "admin", content: "Bạn vui lòng thử lại hoặc gửi chi tiết lỗi giúp mình nhé.", time: "2025-02-11 10:00" },
        ],
    },
];

// Giả lập phản hồi của admin
const simulateAdminReply = (setHistory) => {
    setTimeout(() => {
        setHistory((prev) => [
            ...prev,
            {
                sender: "admin",
                content: "Cảm ơn bạn đã phản hồi, chúng tôi sẽ hỗ trợ bạn ngay!",
                time: new Date().toLocaleString(),
            },
        ]);
    }, 2000);
};

const FeedbackChatbox = ({ feedback, onClose }) => {
    const [reply, setReply] = useState("");
    const [history, setHistory] = useState(feedback.history); // Lưu lịch sử chat
    const chatEndRef = useRef(null);

    // Tự động cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleReply = (e) => {
        e.preventDefault();

        // Thêm tin nhắn user vào lịch sử
        setHistory((prev) => [
            ...prev,
            {
                sender: "user",
                content: reply,
                time: new Date().toLocaleString(),
            },
        ]);

        // Giả lập admin trả lời
        simulateAdminReply(setHistory);

        setReply(""); // Reset input
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Chat với {feedback.user}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Lịch sử chat */}
                <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50">
                    {history.map((chat, index) => (
                        <div
                            key={index}
                            className={`mb-4 ${chat.sender === "admin" ? "text-right" : "text-left"}`}
                        >
                            <p
                                className={`inline-block px-4 py-2 rounded-lg ${chat.sender === "admin"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {chat.content}
                            </p>
                            <span className="block text-sm text-gray-500 mt-1">{chat.time}</span>
                        </div>
                    ))}
                    <div ref={chatEndRef}></div>
                </div>

                {/* Input gửi tin nhắn */}
                <form onSubmit={handleReply} className="mt-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                        >
                            Gửi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FeedbackList = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Phản hồi người dùng
            </h2>

            {/* Danh sách phản hồi */}
            <div className="space-y-4">
                {feedbacks.map((feedback) => (
                    <div
                        key={feedback.id}
                        className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {feedback.user}
                            </h3>
                            <span className="text-sm text-gray-500">{feedback.date}</span>
                        </div>
                        <p className="text-gray-700 mt-2">{feedback.message}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setSelectedFeedback(feedback)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                Xem lịch sử & Trả lời
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hiển thị chatbox */}
            {selectedFeedback && (
                <FeedbackChatbox
                    feedback={selectedFeedback}
                    onClose={() => setSelectedFeedback(null)}
                />
            )}
        </div>
    );
};

export default FeedbackList;
