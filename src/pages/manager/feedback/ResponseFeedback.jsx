import React from "react";

// Mock dữ liệu đánh giá
const reviews = [
    { id: 1, user: "Nguyễn Văn A", rating: 5, comment: "Ứng dụng tuyệt vời!", date: "2025-02-12" },
    { id: 2, user: "Trần Thị B", rating: 4, comment: "Tốt nhưng cần cải thiện giao diện.", date: "2025-02-11" },
    { id: 3, user: "Lê Minh C", rating: 3, comment: "Ứng dụng có lỗi khi sử dụng.", date: "2025-02-10" },
];

const FeedbackOverview = () => {
    const averageRating = (
        reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    ).toFixed(1);

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Đánh giá ứng dụng
            </h2>

            {/* Tổng quan */}
            <div className="mb-6 text-center">
                <p className="text-4xl font-bold text-yellow-500">{averageRating} / 5</p>
                <p className="text-gray-600">{reviews.length} đánh giá</p>
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
                    >
                        <div className="flex items-center mb-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${index < review.rating ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 6.044 1.452 8.319-7.388-3.898-7.388 3.898 1.452-8.319-6.064-6.044 8.332-1.151z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="ml-4 text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                        <p className="text-gray-500 text-sm mt-2">Người dùng: {review.user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackOverview;
