import React, { useState, useEffect, useRef } from "react";
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
} from "@microsoft/signalr";
import { MessageCircle, User, Send, Circle } from "lucide-react";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const VITE_API_CHAT_URL = import.meta.env.VITE_API_CHAT_URL;
  useEffect(() => {
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const connect = new HubConnectionBuilder()
      .withUrl(`${VITE_API_CHAT_URL}/chatHub`, {
        accessTokenFactory: () => token,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(connect);

    return () => {
      if (connect) connect.stop();
    };
  }, [token]);

  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("Connected to ChatHub");
      } catch (err) {
        console.error("Connection failed: ", err);
      }
    };

    startConnection();
  }, [connection]);

  useEffect(() => {
    if (!connection) return;

    connection.on("Users", (users) => {
      console.log("Users received:", users);
      setUsers(users);
    });

    connection.on("ReceiveNewMessage", (message) => {
      console.log("Received new message:", message);
      console.log("Current userId:", userId);
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    connection.on("ReceiveMessageList", (messageList) => {
      console.log("Received message list:", messageList);
      console.log("Current userId:", userId);
      setMessages(messageList);
    });

    connection.on("NotifyTypingToUser", (senderId) => {
      console.log("Typing from:", senderId);
      if (selectedUser && senderId === selectedUser.id) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    });

    return () => {
      connection.off("Users");
      connection.off("ReceiveNewMessage");
      connection.off("ReceiveMessageList");
      connection.off("NotifyTypingToUser");
    };
  }, [connection, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!connection || !selectedUser || !messageInput.trim()) return;

    const message = {
      receiverId: selectedUser.id,
      senderId: userId,
      content: messageInput,
    };

    try {
      await connection.invoke("SendMessage", message);
      setMessageInput("");

      // Load lại tin nhắn ngay sau khi gửi thành công
      const recipientId = selectedUser.id.toString();
      await connection.invoke("LoadMessages", recipientId, 1);
    } catch (err) {
      console.error("Failed to send message: ", err);
    }
  };

  const loadMessages = async (userId) => {
    if (!connection) return;

    const user = users.find((u) => u.id === userId);
    if (!user) return;

    setSelectedUser(user);

    try {
      const recipientId = userId.toString();
      await connection.invoke("LoadMessages", recipientId, 1);
    } catch (err) {
      console.error("Failed to load messages: ", err);
    }
  };

  const notifyTyping = async () => {
    if (!connection || !selectedUser) return;

    try {
      await connection.invoke("NotifyTyping", selectedUser.id);
    } catch (err) {
      console.error("Failed to notify typing: ", err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 bg-white border-r shadow-lg">
        <div className="p-6 border-b flex items-center space-x-3">
          <MessageCircle className="w-8 h-8 text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            {userRole === "Doctor" ? "Patient Chat" : "Doctor Chat"}
          </h2>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            {userRole === "Doctor" ? "Patients" : "Doctors"}
          </h3>
          <div className="space-y-2">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => loadMessages(user.id)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                    selectedUser?.id === user.id
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                  }`}>
                  <User className="w-6 h-6 mr-3" />
                  <div className="flex-grow">
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-xs text-gray-500">
                      {user.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                  {user.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No users available</p>
            )}
          </div>
        </div>
      </div>
      {selectedUser ? (
        <div className="flex-grow flex flex-col">
          <div className="bg-white p-4 shadow-sm flex items-center">
            <User className="w-8 h-8 mr-3" />
            <div>
              <h4 className="font-semibold text-lg">{selectedUser.fullName}</h4>
              <div className="flex items-center text-sm text-gray-500">
                <Circle
                  className={`w-2 h-2 mr-2 ${
                    selectedUser.isOnline ? "text-green-500" : "text-gray-400"
                  }`}
                />
                {selectedUser.isOnline ? "Online" : "Offline"}
                {isTyping && (
                  <span className="ml-2 text-xs italic">Typing...</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === userId ? "justify-end" : "justify-start"
                }`}>
                <div
                  className={`max-w-md p-3 rounded-lg ${
                    msg.senderId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 shadow-sm"
                  }`}>
                  {msg.content}
                  <span className="block text-xs opacity-75 mt-1">
                    {new Date(msg.createdDate).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="bg-white p-4 border-t flex items-center space-x-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
                notifyTyping();
              }}
              placeholder="Type a message..."
              className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-50 text-gray-500">
          <p>Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
