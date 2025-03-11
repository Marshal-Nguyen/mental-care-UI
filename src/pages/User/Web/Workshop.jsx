import React from "react";

const WorkshopIntro = () => {
    const activities = [
        {
            text: "📢 Chia sẻ từ chuyên gia tâm lý",
            image: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg",
            date: "Thứ Hai, 21/07/2025",
            time: "10:00 - 12:00",
            location: "Phòng họp A, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
            detail: "Buổi chia sẻ từ chuyên gia tâm lý giúp bạn hiểu rõ hơn về cách kiểm soát căng thẳng, tăng cường sức khỏe tinh thần và cải thiện các mối quan hệ cá nhân."
        },
        {
            text: "🤝 Trò chuyện và hỗ trợ nhóm",
            image: "https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg",
            date: "Thứ Ba, 22/07/2025",
            time: "14:00 - 16:00",
            location: "Phòng họp B, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
            detail: "Một không gian mở để bạn có thể chia sẻ câu chuyện của mình, lắng nghe và nhận được sự hỗ trợ từ những người có cùng trải nghiệm."
        },
        {
            text: "🧘‍♂️ Thiền và thực hành chánh niệm",
            image: "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg",
            date: "Thứ Tư, 23/07/2025",
            time: "08:00 - 10:00",
            location: "Sân vườn, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
            detail: "Buổi thực hành chánh niệm và thiền định giúp bạn thư giãn, tập trung vào hiện tại và cải thiện sức khỏe tâm lý tổng thể."
        },
        {
            text: "🎨 Hoạt động sáng tạo giúp giảm căng thẳng",
            image: "https://images.pexels.com/photos/3817587/pexels-photo-3817587.jpeg",
            date: "Thứ Năm, 24/07/2025",
            time: "16:00 - 18:00",
            location: "Phòng nghệ thuật, Trung tâm Hội nghị ABC, Quận 1, TP. HCM",
            detail: "Tham gia vào các hoạt động sáng tạo như vẽ tranh, viết lách giúp bạn giải tỏa căng thẳng, thể hiện cảm xúc và cải thiện tinh thần."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-8 text-center">
                <h1 className="text-4xl font-bold text-blue-700">Workshop: Cùng nhau chăm sóc sức khỏe tâm lý</h1>
                <p className="text-gray-600 mt-4">Tham gia cộng đồng để cùng nhau chia sẻ, học hỏi và nâng cao sức khỏe tinh thần.</p>

                <img
                    src="https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg"
                    alt="Workshop"
                    className="w-full h-64 object-cover rounded-lg mt-6"
                />

                <div className="mt-8 text-left">
                    <h2 className="text-2xl font-semibold text-gray-800">Hoạt động nổi bật:</h2>
                    <ul className="mt-5 space-y-6">
                        {activities.map((activity, index) => (
                            <li key={index} className="flex items-start space-x-6 bg-gray-100 p-4 rounded-lg shadow-sm">
                                <img src={activity.image} alt={activity.text} className="w-24 h-24 rounded-lg object-cover" />
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600">{activity.text}</h3>
                                    <p className="text-gray-700"><strong>📅 Ngày:</strong> {activity.date}</p>
                                    <p className="text-gray-700"><strong>⏰ Thời gian:</strong> {activity.time}</p>
                                    <p className="text-gray-700"><strong>📍 Địa điểm:</strong> {activity.location}</p>
                                    <p className="text-gray-700"><strong>ℹ️ Chi tiết:</strong> {activity.detail}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <button className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-800 transition text-lg font-medium">
                    Đăng ký ngay
                </button>
            </div>
        </div>
    );
};

export default WorkshopIntro;