import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Lấy thông tin từ localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole"); // "Patient" hoặc "Doctor"
  const userName = localStorage.getItem("user_name"); // Tên người dùng
  const userId = localStorage.getItem("profileId"); // ID người dùng

  useEffect(() => {
    if (!token) {
      console.error("No token found in localStorage. Please log in.");
      return;
    }

    // Khởi tạo kết nối SignalR với token từ localStorage
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/chatHub", {
        accessTokenFactory: () => token, // Sử dụng token để xác thực
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);
  }, [token]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected to ChatHub");

          // Nhận danh sách người dùng
          connection.on("Users", (users) => {
            setUsers(users);
          });

          // Nhận tin nhắn mới
          connection.on("ReceiveNewMessage", (message) => {
            setMessages((prev) => [...prev, message]);
          });

          // Nhận danh sách tin nhắn cũ
          connection.on("ReceiveMessageList", (messageList) => {
            setMessages(messageList);
          });
        })
        .catch((err) => console.error("Connection failed: ", err));
    }

    // Cleanup khi component unmount
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [connection]);

  const sendMessage = async () => {
    if (connection && selectedUser && messageInput) {
      const message = {
        receiverId: selectedUser.id,
        content: messageInput,
      };
      await connection.invoke("SendMessage", message);
      setMessageInput("");
    }
  };

  const loadMessages = async (userId) => {
    if (connection) {
      const user = users.find((u) => u.id === userId);
      setSelectedUser(user);
      await connection.invoke("LoadMessages", userId);
    }
  };

  return (
    <div>
      <h2>
        Chat {userRole === "Doctor" ? "với Bệnh nhân" : "với Bác sĩ"} - Xin
        chào, {userName}
      </h2>
      <div style={{ display: "flex" }}>
        {/* Danh sách người dùng */}
        <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
          <h3>{userRole === "Doctor" ? "Bệnh nhân" : "Bác sĩ"}</h3>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => loadMessages(user.id)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  background: selectedUser?.id === user.id ? "#eee" : "white",
                }}>
                {user.fullName} ({user.isOnline ? "Online" : "Offline"}) -
                Unread: {user.unreadCount}
              </div>
            ))
          ) : (
            <p>Không có người dùng nào để hiển thị.</p>
          )}
        </div>

        {/* Khu vực chat */}
        <div style={{ width: "70%", padding: "10px" }}>
          {selectedUser ? (
            <>
              <h4>Đang chat với: {selectedUser.fullName}</h4>
              <div
                style={{
                  height: "400px",
                  overflowY: "scroll",
                  border: "1px solid #ccc",
                }}>
                {messages.map((msg) => (
                  <p key={msg.id}>
                    <strong>
                      {msg.senderId === userId
                        ? userName
                        : selectedUser.fullName}
                      :
                    </strong>{" "}
                    {msg.content}
                  </p>
                ))}
              </div>
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                style={{ width: "80%", marginTop: "10px" }}
              />
              <button onClick={sendMessage}>Send</button>
            </>
          ) : (
            <p>Chọn một người dùng để bắt đầu chat.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
