import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PremiumChatPopup = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "👋 Xin chào! Tôi có thể giúp gì cho bạn hôm nay. Vui lòng mô tả yêu cầu của bạn chi tiết.",
      sender: "shop",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [projectData, setProjectData] = useState(""); // Lưu nội dung file dự án
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_API_GPT_KEY; // API Key từ .env

  // Nội dung file dự án (được hardcode tạm thời, bạn có thể thay bằng fetch từ file)
  const projectContent = `
    **1. Start-up**

    **1.1. Introduce startup**
    SolTech with the goal to adopt modern technology, and take it as a core solution to solve real-time challenges in life. Alw finding and implementing innovative solutions to meet the actual needs of users. Ensuring the transparency of information provided to customers while delivering high-quality and sustainable products. This enhances the trustworthiness of the product and service that the startup offers, reflecting its commitment to social responsibility. Additionally, SolTech prioritizes building strong relationships with partners to create the best possible value.

    **1.2. Introduce service idea**
    EmoEase, an AI-integrated application, provides a comprehensive stress treatment solution for students. EmoEase is created as a user’s companion, providing a personalized roadmap based on an analysis of the user's stress level and needs for relief. The application uses AI to suggest relaxation exercises, physical activities, and advice on diet and sleep, creating the most suitable roadmap for each individual.

    EmoEase is a bridge to connect users with psychological experts. Students can easily share problems and receive dedicated advice and support from experts right on the application. The friendly interface makes EmoEase easy to use anytime, anywhere, on both phones and computers. EmoEase not only helps reduce stress and anxiety, but also improves mental health, enhances learning and work performance. The app also creates a community for users to connect, share experiences with each other. EmoEase is an ideal choice for the young, especially students facing pressure of studying and exams, people looking for balance in life, and anyone concerned about mental health.

    **2. Key Features**

    **2.1. AI Consulting and Improvement Roadmap**
    Students undertake preliminary mental health assessment tests like GAD-7, PHQ-9. AI algorithms processes these results and suggests activities in a roadmap that lasts for 1-2 weeks with the purpose of improving their mental health. One prominent feature of the application is that it guides students in performing the aim of the activity on a daily basis. The roadmap is adjusted according to student feedback upon completion of 1-2 weeks of activities.

    **2.2. Detailed Daily Itinerary**
    - **Nutrition:** Provides daily meals most beneficial in averting stress and containing: omega-3, magnesium, and vitamin B.
    - **Exercise:** Mentions calming exercises like Yoga, Meditation, Breathing exercises to calm anxiety.
    - **Psychological solutions:** Provides techniques to talk a person through a problem using Psychological medicine like CBT technique – Cognitive Behavioral Therapy and mindfulness technique.
    - **Activity schedule:** Reminds students to sleep properly, don’t use electronic devices a few hours before bedtime.
    - **Mood tracking diary:** Guiders to track mood and think positively via journaling.

    **2.3. Different from other applications**
    - **Tailored AI Application:** Unlike traditional psychological applications which offers broad advice, the software's AI system tailors the itinerary schedule for each student on a daily basis based on their feedback.
    - **Implementation Monitoring:** A checklist tool that is implemented into the program ensures students stick to their plans.
    - **Comprehensive Counseling Aid:** Students can consult directly with a psychologist in person or online in addition to the AI roadmap provided by the application.
    - **Blending Learning and Self Management:** The application aids learners to not only develop and maintain mental health, but also supervises them on time allocation and work-life integration.

    **2.4. Periodically Implemented Questioned & Progress Tracking**
    - Students are prompted to perform monthly surveys which are automatically assigned by the system.
    - An AI system monitors a student’s mental state change over a certain period.
    - The dashboard monitors students’ self evaluations of their mental health.

    **2.5. Free & Paid Accounts**
    - **Free account:**
      Access the application 2 or 3 times utilizing the basic improvement roadmap.
      Always partake in periodic surveys and receive automated summary feedback.
    - **Paid account:**
      In-depth personalized roadmap, automated changes depending on daily feedback.
      A comprehensive computerized structure allows booking online or attending in-person consultations with a psychologist.

    **2.6. Online & Direct Consulting Services**
    - Students with paid accounts may book appointments with a psychologist.
    - Consultation types:
      **Online:** Video call or chat
      **In Person:** The system provides a list of psychologists in the vicinity of the student's location.

    **2.7. Management and Reporting**
    - Self-manage personal files and mental health records.
    - Capture the students’ feedback for comments and improve AI roadmaps.
    - Dashboard indicates the mental wellness status of the students.

    **2.8. Benefits of the Application**
    - **For students:** Automated support and guidance to improve mental health is more accessible and effective.
    - **For lecturers and schools:** Proactive monitoring of student mental health enables prompt assistive actions.
    - **For psychologists:** provides a more straightforward approach to students and use it to provide consultation services.
  `;

  // Tải nội dung file khi component mount (tạm thời hardcode, có thể thay bằng fetch)
  useEffect(() => {
    setProjectData(projectContent);
    // Nếu muốn đọc từ file thực tế trong thư mục public:
    // fetch("/project-data.txt")
    //   .then((response) => response.text())
    //   .then((text) => setProjectData(text))
    //   .catch((error) => console.error("Lỗi khi đọc file:", error));
  }, []);

  // Kiểm tra kích thước màn hình để responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Gửi tin nhắn và nhận phản hồi từ ChatGPT
  const sendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");

      if (!API_KEY) {
        console.error("API Key không được tìm thấy!");
        const errorResponse = {
          id: (Date.now() + 1).toString(),
          text: "Lỗi: API Key không hợp lệ!",
          sender: "shop",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
        return;
      }

      try {
        // Kiểm tra nếu câu hỏi liên quan đến dự án
        const isProjectRelated =
          input.toLowerCase().includes("dự án") ||
          input.toLowerCase().includes("project") ||
          input.toLowerCase().includes("emoease") ||
          input.toLowerCase().includes("soltech");

        const systemPrompt = isProjectRelated
          ? `Bạn là một trợ lý thông minh, hãy trả lời dựa trên thông tin từ tài liệu dự án sau đây:\n\n${projectData}\n\nNếu không tìm thấy thông tin trong tài liệu, hãy nói "Thông tin không có trong tài liệu dự án."`
          : "Bạn là một trợ lý thân thiện và hữu ích.";

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: input },
            ],
            max_tokens: 200, // Tăng max_tokens để trả lời chi tiết hơn nếu cần
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const botReply = response.data.choices[0].message.content;
        const shopResponse = {
          id: (Date.now() + 1).toString(),
          text: botReply,
          sender: "shop",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, shopResponse]);
      } catch (error) {
        console.error("Lỗi khi gọi API ChatGPT:", error);
        const errorResponse = {
          id: (Date.now() + 1).toString(),
          text: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
          sender: "shop",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorResponse]);
      }
    }
  };

  const formatTime = (date) => {
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút Chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-[#602985] text-white shadow-lg hover:bg-gray-800 focus:outline-none transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Modal Chat */}
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Modal */}
          <div
            className={`fixed ${
              isMobileView
                ? "inset-x-2 inset-y-2"
                : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            } bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col ${
              isMobileView ? "w-auto h-[95vh]" : "w-[800px] h-[66vh]"
            } transition-all duration-300 ease-in-out z-50`}
            style={{
              maxHeight: isMobileView ? "95vh" : "800px",
            }}>
            {/* Header */}
            <div className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-[#602985] flex items-center justify-center mr-3">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-white">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg> */}
                  <img
                    src="/emo.webp"
                    alt="Logo"
                    className="w-10 h-10 rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">EMO</h3>
                  <div className="text-xs text-gray-500">
                    Nhân viên trực tuyến
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className="flex-1 p-4 overflow-y-auto bg-white relative"
              style={{
                backgroundImage: `url('public/doctor.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}>
              {/* Add an overlay div for blur effect */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

              {/* Messages container with relative positioning */}
              <div className="relative z-10">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}>
                    {message.sender === "shop" && (
                      <div className="h-8 w-8 rounded-full bg-gray-100/90 backdrop-blur-sm flex items-center justify-center mr-2">
                        <span className="text-sm">AI</span>
                      </div>
                    )}
                    <div
                      className={`max-w-3/4 rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-black/90 backdrop-blur-sm text-white"
                          : "bg-gray-100/90 backdrop-blur-sm text-gray-800"
                      }`}>
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-gray-300"
                            : "text-gray-500"
                        }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="h-8 w-8 rounded-full bg-gray-100/90 backdrop-blur-sm flex items-center justify-center ml-2">
                        <span className="text-sm">Bạn</span>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-100 flex items-center">
              <label className="mr-2 text-gray-500 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Nhập tin nhắn..."
                  className="w-full bg-gray-100 rounded-full px-4 py-2 pr-10 focus:outline-none text-sm"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                className="ml-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PremiumChatPopup;
