import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

const posts = [

  {
    id: 10,
    user: "duonghoa",
    avatar: "https://i.pravatar.cc/150?img=7",
    content: "Mình đã học cách kiểm soát hơi thở khi lo lắng. Hít vào thật sâu, giữ trong 4 giây và thở ra từ từ. Điều này giúp mình bình tĩnh hơn trong những lúc căng thẳng! 🌬️",
    image: "https://images.pexels.com/photos/3757374/pexels-photo-3757374.jpeg",
    likes: 21,
    comments: 5,
  },
  {
    id: 11,
    user: "minhtuan",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "Âm nhạc có thể chữa lành tâm hồn! Khi căng thẳng, mình thường nghe nhạc nhẹ hoặc tiếng mưa rơi, cảm giác thật thư giãn. Mọi người có bài nhạc nào yêu thích không? 🎶",
    image: "https://images.pexels.com/photos/164743/pexels-photo-164743.jpeg",
    likes: 28,
    comments: 12,
  },
  {
    id: 12,
    user: "nguyenvana",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Hôm nay mình thử dành một ngày không mạng xã hội và thật sự thấy tâm trí thoải mái hơn. Dành thời gian cho bản thân là điều rất cần thiết! 📵",
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    likes: 33,
    comments: 14,
  },
  {
    id: 13,
    user: "trangngoc",
    avatar: "https://i.pravatar.cc/150?img=9",
    content: "Việc nuôi thú cưng giúp mình cảm thấy bớt căng thẳng hơn. Chỉ cần chơi với chúng một chút cũng đủ làm mình vui cả ngày! 🐶🐱",
    image: "https://images.pexels.com/photos/4587953/pexels-photo-4587953.jpeg",
    likes: 37,
    comments: 16,
  },
  {
    id: 14,
    user: "hoangminh",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "Một cuốn sách hay có thể thay đổi tâm trạng của mình. Gần đây mình đọc một cuốn về tư duy tích cực và cảm thấy tinh thần cải thiện rõ rệt! 📚✨",
    image: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg",
    likes: 29,
    comments: 13,
  },
  {
    id: 15,
    user: "phamvanh",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Tự viết thư cho chính mình trong tương lai là một cách hay để động viên bản thân. Mình viết về những điều mình mong muốn và những điều mình đã cố gắng. Rất ý nghĩa! 💌",
    image: "https://images.pexels.com/photos/5473957/pexels-photo-5473957.jpeg",
    likes: 26,
    comments: 8,
  },
  {
    id: 16,
    user: "tranthib",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Có lúc mình cảm thấy quá tải với công việc, nhưng mình đã thử chia nhỏ công việc và đặt mục tiêu nhỏ hơn. Dần dần mọi thứ cũng dễ thở hơn rất nhiều! 🎯",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg",
    likes: 31,
    comments: 10,
  },
  {
    id: 17,
    user: "lananh",
    avatar: "https://i.pravatar.cc/150?img=6",
    content: "Cười nhiều hơn mỗi ngày giúp mình cảm thấy vui vẻ hơn. Hãy thử xem một bộ phim hài hoặc nói chuyện với một người bạn vui tính nhé! 😂💖",
    image: "https://images.pexels.com/photos/4065071/pexels-photo-4065071.jpeg",
    likes: 35,
    comments: 15,
  },
  {
    id: 18,
    user: "duonghoa",
    avatar: "https://i.pravatar.cc/150?img=7",
    content: "Mình nhận ra rằng đôi khi mình cần học cách buông bỏ những điều không thể kiểm soát. Tập trung vào những gì mình có thể làm tốt hơn là lo lắng quá nhiều! ☀️",
    image: "https://images.pexels.com/photos/302904/pexels-photo-302904.jpeg",
    likes: 38,
    comments: 17,
  },
  {
    id: 19,
    user: "minhtuan",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "Hãy thử gửi một tin nhắn động viên đến ai đó hôm nay. Một câu nói tích cực có thể làm nên điều kỳ diệu cho tâm trạng của họ (và cả bạn nữa)! 💌😊",
    image: "https://images.pexels.com/photos/302904/pexels-photo-302904.jpeg",
    likes: 42,
    comments: 20,
  }
];


export default function Feed() {
  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
            <span className="font-semibold">{post.user}</span>
          </div>

          {/* Post Content */}
          <p className="mt-2 text-gray-700">{post.content}</p>
          {post.image && <img src={post.image} alt="Post" className="mt-2 rounded-lg" />}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500">
              <Heart size={20} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <MessageCircle size={20} />
              <span>{post.comments}</span>
            </button>
            <button className="hover:text-green-500">
              <Repeat2 size={20} />
            </button>
            <button className="hover:text-blue-500">
              <Send size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
