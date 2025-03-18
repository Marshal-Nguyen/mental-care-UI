import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

class ChatService {
  constructor() {
    this.connection = null;
    this.callbacks = {
      receiveMessage: () => {},
      receiveMessageList: () => {},
      notifyTyping: () => {},
      userConnected: () => {},
      usersList: () => {},
      connectionClosed: () => {},
    };
  }

  async connect(token, receiverId = "") {
    try {
      // Tạo connection với backend
      this.connection = new HubConnectionBuilder()
        .withUrl(`/hubs/chat?receiverId=${receiverId}`, {
          accessTokenFactory: () => token,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      // Đăng ký các event từ server
      this.registerServerEvents();

      // Bắt đầu kết nối
      await this.connection.start();
      console.log("Connected to chat hub");
      return true;
    } catch (error) {
      console.error("Error connecting to hub:", error);
      return false;
    }
  }

  registerServerEvents() {
    // Nhận tin nhắn mới
    this.connection.on("ReceiveNewMessage", (message) => {
      this.callbacks.receiveMessage(message);
    });

    // Nhận danh sách tin nhắn
    this.connection.on("ReceiveMessageList", (messages) => {
      this.callbacks.receiveMessageList(messages);
    });

    // Thông báo người dùng đang gõ
    this.connection.on("NotifyTypingToUser", (userId) => {
      this.callbacks.notifyTyping(userId);
    });

    // Thông báo người dùng kết nối
    this.connection.on("NotifyUserConnected", (user) => {
      this.callbacks.userConnected(user);
    });

    // Nhận danh sách người dùng
    this.connection.on("Users", (users) => {
      this.callbacks.usersList(users);
    });

    // Xử lý khi connection bị đóng
    this.connection.onclose(() => {
      this.callbacks.connectionClosed();
    });
  }

  // Gửi tin nhắn đến người nhận
  async sendMessage(receiverId, content) {
    if (this.connection && this.connection.state === "Connected") {
      try {
        const message = {
          receiverId: receiverId,
          content: content,
        };
        await this.connection.invoke("SendMessage", message);
        return true;
      } catch (error) {
        console.error("Error sending message:", error);
        return false;
      }
    }
    return false;
  }

  // Thông báo đang gõ
  async notifyTyping(receiverId) {
    if (this.connection && this.connection.state === "Connected") {
      try {
        await this.connection.invoke("NotifyTyping", receiverId);
        return true;
      } catch (error) {
        console.error("Error notifying typing:", error);
        return false;
      }
    }
    return false;
  }

  // Tải tin nhắn cũ
  async loadMessages(receiverId, pageNumber = 1) {
    if (this.connection && this.connection.state === "Connected") {
      try {
        await this.connection.invoke("LoadMessages", receiverId, pageNumber);
        return true;
      } catch (error) {
        console.error("Error loading messages:", error);
        return false;
      }
    }
    return false;
  }

  // Đăng ký callbacks từ component
  onReceiveMessage(callback) {
    this.callbacks.receiveMessage = callback;
  }

  onReceiveMessageList(callback) {
    this.callbacks.receiveMessageList = callback;
  }

  onNotifyTyping(callback) {
    this.callbacks.notifyTyping = callback;
  }

  onUserConnected(callback) {
    this.callbacks.userConnected = callback;
  }

  onUsersList(callback) {
    this.callbacks.usersList = callback;
  }

  onConnectionClosed(callback) {
    this.callbacks.connectionClosed = callback;
  }

  // Ngắt kết nối
  async disconnect() {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log("Disconnected from chat hub");
        return true;
      } catch (error) {
        console.error("Error disconnecting:", error);
        return false;
      }
    }
    return true;
  }
}

// Export single instance
const chatService = new ChatService();
export default chatService;
