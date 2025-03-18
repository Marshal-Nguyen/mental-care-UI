import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import chatService from "./ChatService";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Lấy thông tin từ Redux store
  const token = useSelector((state) => state.auth.token);
  const profileId = useSelector((state) => state.auth.profileId);

  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState({});
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Kết nối đến SignalR hub khi token thay đổi
  useEffect(() => {
    if (token) {
      connectToHub();
    } else {
      // Ngắt kết nối khi đăng xuất
      chatService.disconnect();
      setConnected(false);
    }

    return () => {
      chatService.disconnect();
    };
  }, [token]);

  // Kết nối đến SignalR hub
  const connectToHub = async (receiverId = "") => {
    setLoading(true);
    const result = await chatService.connect(token, receiverId);
    setConnected(result);
    setLoading(false);

    // Cài đặt các callbacks
    setupCallbacks();
  };

  // Cài đặt các callback từ SignalR
  const setupCallbacks = () => {
    // Nhận tin nhắn mới
    chatService.onReceiveMessage((message) => {
      setMessages((prev) => {
        const chatId = getChatId(message.senderId, message.receiverId);
        const existingMessages = prev[chatId] || [];
        return {
          ...prev,
          [chatId]: [...existingMessages, message],
        };
      });
    });

    // Nhận danh sách tin nhắn
    chatService.onReceiveMessageList((messageList) => {
      if (messageList && messageList.length > 0) {
        const firstMsg = messageList[0];
        const chatId = getChatId(firstMsg.senderId, firstMsg.receiverId);

        setMessages((prev) => ({
          ...prev,
          [chatId]: messageList,
        }));
      }
    });

    // Nhận thông báo đang gõ
    chatService.onNotifyTyping((userId) => {
      setTypingUsers((prev) => ({
        ...prev,
        [userId]: Date.now(),
      }));

      // Xóa trạng thái đang gõ sau 3 giây
      setTimeout(() => {
        setTypingUsers((prev) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      }, 3000);
    });

    // Nhận thông báo người dùng kết nối
    chatService.onUserConnected((user) => {
      setUsers((prev) => {
        const existingIndex = prev.findIndex((u) => u.id === user.id);
        if (existingIndex >= 0) {
          const updatedUsers = [...prev];
          updatedUsers[existingIndex] = {
            ...updatedUsers[existingIndex],
            isOnline: true,
          };
          return updatedUsers;
        }
        return [...prev, { ...user, isOnline: true }];
      });
    });

    // Nhận danh sách người dùng
    chatService.onUsersList((usersList) => {
      setUsers(usersList);
    });

    // Xử lý khi kết nối bị đóng
    chatService.onConnectionClosed(() => {
      setConnected(false);
    });
  };

  // Gửi tin nhắn
  const sendMessage = async (receiverId, content) => {
    if (!content.trim()) return false;

    const result = await chatService.sendMessage(receiverId, content);
    return result;
  };

  // Thông báo đang gõ
  const notifyTyping = async (receiverId) => {
    await chatService.notifyTyping(receiverId);
  };

  // Tải tin nhắn với một người dùng
  const loadMessages = async (receiverId, pageNumber = 1) => {
    setLoading(true);
    await chatService.loadMessages(receiverId, pageNumber);
    setLoading(false);
  };

  // Chọn người dùng để chat
  const selectUser = async (user) => {
    setSelectedUser(user);
    if (user && user.id) {
      // Reset trang khi chọn người dùng mới
      setPage(1);
      await loadMessages(user.id);
    }
  };

  // Helper function để lấy id cho cuộc trò chuyện
  const getChatId = (userId1, userId2) => {
    // Sử dụng profileId từ Redux
    const currentUserId = profileId || "currentUserId";
    return [userId1, userId2].sort().join("-");
  };

  // Lấy tin nhắn cho người dùng đã chọn
  const getSelectedUserMessages = () => {
    if (!selectedUser) return [];
    const chatId = getChatId(selectedUser.id, profileId);
    return messages[chatId] || [];
  };

  // State cho phân trang
  const [page, setPage] = useState(1);

  // Tải thêm tin nhắn
  const loadMoreMessages = async () => {
    if (selectedUser) {
      const nextPage = page + 1;
      await loadMessages(selectedUser.id, nextPage);
      setPage(nextPage);
    }
  };

  // Giá trị context
  const value = {
    connected,
    loading,
    users,
    typingUsers,
    selectedUser,
    profileId,
    messages: getSelectedUserMessages(),
    selectUser,
    sendMessage,
    notifyTyping,
    loadMessages,
    loadMoreMessages,
    page,
  };

  // Chỉ render children khi có token
  if (!token) {
    return children; // Để ứng dụng vẫn hoạt động khi chưa đăng nhập
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Custom hook để sử dụng chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
