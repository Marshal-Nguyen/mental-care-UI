import React, { useState } from "react";
import Footer from "../../../components/Web/Footer";
const WorkshopIntro = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const activities = [
    {
      title: "Share",
      text: "📢 Chia sẻ từ chuyên gia tâm lý",
      image:
        "https://mindfulcare.vn/wp-content/uploads/2023/07/tu-van-tam-ly-online-6.png",
      date: "Thứ Hai, 21/07/2025",
      time: "10:00 - 12:00",
      location: "Phòng họp A, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
      detail:
        "Buổi chia sẻ từ chuyên gia tâm lý giúp bạn hiểu rõ hơn về cách kiểm soát căng thẳng, tăng cường sức khỏe tinh thần và cải thiện các mối quan hệ cá nhân.",
    },
    {
      title: "Talk",
      text: "🤝 Trò chuyện và hỗ trợ nhóm",
      image:
        "https://fastdo.vn/wp-content/uploads/2021/10/ky-nang-lam-viec-nhom-la-gi-4.jpg",
      date: "Thứ Ba, 22/07/2025",
      time: "14:00 - 16:00",
      location: "Phòng họp B, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
      detail:
        "Một không gian mở để bạn có thể chia sẻ câu chuyện của mình, lắng nghe và nhận được sự hỗ trợ từ những người có cùng trải nghiệm.",
    },
    {
      title: "Meditation",
      text: "🧘‍♂️ Thiền và thực hành chánh niệm",
      image:
        "https://tamlyvietphap.vn/wp-content/uploads/2025/01/thien-chanh-niem-va-tri-tue-cam-xuc-3_1206153009.jpg",
      date: "Thứ Tư, 23/07/2025",
      time: "08:00 - 10:00",
      location: "Sân vườn, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
      detail:
        "Buổi thực hành chánh niệm và thiền định giúp bạn thư giãn, tập trung vào hiện tại và cải thiện sức khỏe tâm lý tổng thể.",
    },
    {
      title: "Activities",
      text: "🎨 Hoạt động sáng tạo giúp giảm căng thẳng",
      image:
        "https://cdn-images.vtv.vn/zoom/640_400/66349b6076cb4dee98746cf1/2024/07/02/creative-hobby2-75810268468836822864564-33716137030369617133993.jpg",
      date: "Thứ Năm, 24/07/2025",
      time: "16:00 - 18:00",
      location: "Phòng nghệ thuật, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
      detail:
        "Tham gia vào các hoạt động sáng tạo như vẽ tranh, viết lách giúp bạn giải tỏa căng thẳng, thể hiện cảm xúc và cải thiện tinh thần.",
    },
  ];

  const benefits = [
    {
      title: "Cải thiện sức khỏe tinh thần",
      description: "Học các kỹ thuật hiệu quả để giảm căng thẳng và lo âu",
    },
    {
      title: "Xây dựng mối quan hệ",
      description: "Kết nối với những người có cùng mục tiêu và trải nghiệm",
    },
    {
      title: "Phát triển kỹ năng mới",
      description:
        "Học cách thiền định, chánh niệm và các phương pháp tự chăm sóc",
    },
    {
      title: "Hỗ trợ chuyên nghiệp",
      description: "Được hướng dẫn bởi các chuyên gia tâm lý hàng đầu",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      quote:
        "Workshop đã thay đổi hoàn toàn cách tôi nhìn nhận sức khỏe tinh thần của mình.",
      position: "Nhân viên văn phòng",
    },
    {
      name: "Trần Thị B",
      quote:
        "Những kỹ thuật thiền định tôi học được đã giúp tôi đối phó với căng thẳng hàng ngày hiệu quả hơn rất nhiều.",
      position: "Giáo viên",
    },
    {
      name: "Lê Văn C",
      quote: "Tôi đã tìm thấy một cộng đồng hỗ trợ tuyệt vời qua workshop này.",
      position: "Chuyên viên IT",
    },
  ];

  const RegistrationModal = () => (
    <div className="fixed inset-0 bg-[#00000048] w-full bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Đăng ký tham gia workshop
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Nhập họ và tên của bạn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="0xxxxxxxxx"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn hoạt động quan tâm
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="">-- Chọn hoạt động --</option>
              {activities.map((activity, idx) => (
                <option key={idx} value={activity.text}>
                  {activity.text}
                </option>
              ))}
              <option value="all">Tất cả hoạt động</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowModal(false)}>
              Hủy
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-md hover:from-blue-700 hover:to-indigo-800"
              onClick={() => setShowModal(false)}>
              Xác nhận đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#4A2580] to-[#804ac2]

 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Workshop: Cùng nhau chăm sóc sức khỏe tâm lý
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Hành trình khám phá và nâng cao sức khỏe tinh thần cùng cộng đồng
            những người đồng hành.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-white text-[#4a2580] rounded-full text-lg font-bold shadow-lg hover:bg-blue-50 transform transition hover:-translate-y-1">
              Đăng ký ngay
            </button>
            <a
              href="#activities"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white hover:text-black hover:bg-opacity-10 transform transition hover:-translate-y-1">
              Xem hoạt động
            </a>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Lợi ích khi tham gia
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section */}
      <div
        id="activities"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Các hoạt động nổi bật
        </h2>
        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-12">
          Chương trình được thiết kế bởi các chuyên gia tâm lý với nhiều hoạt
          động đa dạng, phù hợp với mọi đối tượng.
        </p>

        {/* Activity Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {activities.map((activity, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 w-30 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === idx
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-200"
              }`}>
              {activity.title}
            </button>
          ))}
        </div>

        {/* Active Activity Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={activities[activeTab].image}
                alt={activities[activeTab].text}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">
                {activities[activeTab].text}
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-indigo-500 mr-3">📅</span>
                  <div>
                    <p className="font-medium text-gray-900">Ngày</p>
                    <p className="text-gray-600">
                      {activities[activeTab].date}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-indigo-500 mr-3">⏰</span>
                  <div>
                    <p className="font-medium text-gray-900">Thời gian</p>
                    <p className="text-gray-600">
                      {activities[activeTab].time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-indigo-500 mr-3">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Địa điểm</p>
                    <p className="text-gray-600">
                      {activities[activeTab].location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-indigo-500 mr-3">ℹ️</span>
                  <div>
                    <p className="font-medium text-gray-900">Chi tiết</p>
                    <p className="text-gray-600">
                      {activities[activeTab].detail}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transform transition hover:-translate-y-1 shadow-md">
                Đăng ký hoạt động này
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        className="bg-gradient-to-r from-[#4A2580] to-[#6B3FA0]

 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Người tham gia nói gì về chúng tôi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-indigo-700">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Sẵn sàng tham gia cùng chúng tôi?
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto mb-8">
            Đăng ký ngay hôm nay để nhận được ưu đãi đặc biệt và bắt đầu hành
            trình chăm sóc sức khỏe tâm lý.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-white text-indigo-700 rounded-full text-lg font-bold shadow-lg hover:bg-blue-50 transform transition hover:-translate-y-1">
            Đăng ký ngay
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Workshop Sức Khỏe Tâm Lý
              </h3>
              <p className="text-gray-400">
                Nơi chia sẻ, học hỏi và nâng cao chất lượng cuộc sống tinh thần.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
              <p className="text-gray-400">Email: info@workshop.com</p>
              <p className="text-gray-400">Điện thoại: (028) 1234 5678</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Workshop Sức Khỏe Tâm Lý. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer> */}
      <footer>
        <Footer />
      </footer>
      {/* Registration Modal */}
      {showModal && <RegistrationModal />}
    </div>
  );
};

export default WorkshopIntro;
