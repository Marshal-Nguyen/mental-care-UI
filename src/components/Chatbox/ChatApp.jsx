import React, { useState, useEffect, useRef } from "react";
import { useChat } from "./ChatContext";
import { useSelector } from "react-redux";
import "../../styles/Web/ChatApp.css";

const ChatApp = () => {
  const profileId = useSelector((state) => state.auth.profileId);

  const {
    connected,
    loading,
    users,
    typingUsers,
    selectedUser,
    messages,
    selectUser,
    sendMessage,
    notifyTyping,
    loadMoreMessages,
  } = useChat();

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Cuộn xuống cuối danh sách tin nhắn khi có tin nhắn mới
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Xử lý khi thay đổi nội dung tin nhắn
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);

    // Thông báo đang gõ nếu đã chọn người dùng
    if (selectedUser && e.target.value.trim() !== "") {
      notifyTyping(selectedUser.id);
    }
  };

  // Xử lý khi gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!selectedUser || !newMessage.trim()) return;

    const success = await sendMessage(selectedUser.id, newMessage);
    if (success) {
      setNewMessage("");
    }
  };

  // Kiểm tra xem người dùng có đang gõ không
  const isUserTyping = (userId) => {
    return typingUsers[userId] && Date.now() - typingUsers[userId] < 3000;
  };

  // Hiển thị danh sách người dùng (loại bỏ người dùng hiện tại)
  const renderUsersList = () => {
    const filteredUsers = users.filter((user) => user.id !== profileId);

    return (
      <div className="users-list">
        <h3>Người dùng</h3>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-item ${
                selectedUser?.id === user.id ? "selected" : ""
              }`}
              onClick={() => selectUser(user)}>
              <div
                className={`user-status ${
                  user.isOnline ? "online" : "offline"
                }`}></div>
              <div className="user-info">
                <div className="user-name">
                  {user.fullName || user.userName}
                </div>
                {user.unreadCount > 0 && (
                  <span className="unread-count">{user.unreadCount}</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-users">Không có người dùng trực tuyến</div>
        )}
      </div>
    );
  };

  // Hiển thị tin nhắn
  const renderMessages = () => {
    if (!selectedUser) {
      return (
        <div className="empty-chat">
          Chọn một người dùng để bắt đầu trò chuyện
        </div>
      );
    }

    return (
      <div className="messages-container">
        <div className="messages-header">
          <div className="selected-user">
            <span>{selectedUser.fullName || selectedUser.userName}</span>
            {isUserTyping(selectedUser.id) && (
              <div className="typing-indicator">đang gõ...</div>
            )}
          </div>
        </div>

        <div className="messages-list">
          <button
            className="load-more"
            onClick={loadMoreMessages}
            disabled={loading}>
            {loading ? "Đang tải..." : "Tải thêm tin nhắn cũ"}
          </button>

          {messages.map((msg, index) => {
            const isCurrentUser = msg.senderId === profileId;
            return (
              <div
                key={msg.id || index}
                className={`message-item ${
                  isCurrentUser ? "my-message" : "other-message"
                }`}>
                <div className="message-content">{msg.content}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Nhập tin nhắn..."
            disabled={!selectedUser || !connected}
          />
          <button
            type="submit"
            disabled={!selectedUser || !newMessage.trim() || !connected}>
            Gửi
          </button>
        </form>
      </div>
    );
  };

  // Hiển thị trạng thái kết nối
  const renderConnectionStatus = () => {
    if (!connected) {
      return <div className="connection-status offline">Mất kết nối</div>;
    }
    return null;
  };

  return (
    <div className="chat-app">
      {renderConnectionStatus()}
      <div className="chat-container">
        {renderUsersList()}
        {renderMessages()}
      </div>
    </div>
  );
};

export default ChatApp;
