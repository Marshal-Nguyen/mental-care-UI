import React, { useState } from "react";
import { Search } from "lucide-react";
import Footer from "../../../components/Web/Footer";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  // Dữ liệu mẫu cho các bài viết
  const articles = [
    {
      id: 1,
      title: "Làm thế nào để vượt qua nỗi buồn?",
      excerpt:
        "Nỗi buồn là một phần tự nhiên của cuộc sống. Trong bài viết này, chúng ta sẽ khám phá những phương pháp lành mạnh để đối mặt và vượt qua nỗi buồn...",
      category: "Đối mặt với cảm xúc",
      date: "10/03/2025",
      imageUrl:
        "https://kenh14cdn.com/zoom/600_315/2020/7/24/facebook-avatar-1595567969438398558616-crop-1595567981602183560055.png",
      author: "Nguyễn Thanh Bình",
      readTime: "5 phút đọc",
    },
    {
      id: 2,
      title: "Thiền định: Con đường dẫn đến sự bình yên nội tâm",
      excerpt:
        "Thiền định không chỉ là một phương pháp thư giãn mà còn là công cụ mạnh mẽ để tìm lại sự cân bằng trong tâm hồn...",
      category: "Phương pháp chữa lành",
      date: "05/03/2025",
      imageUrl: "https://tiki.vn/blog/wp-content/uploads/2023/07/thumb-23.jpg",
      author: "Trần Minh Tâm",
      readTime: "8 phút đọc",
    },
    {
      id: 3,
      title: "Xây dựng thói quen tự chăm sóc bản thân mỗi ngày",
      excerpt:
        "Tự chăm sóc bản thân không phải là ích kỷ. Đó là sự cần thiết để duy trì sức khỏe tinh thần và thể chất của bạn...",
      category: "Tự chăm sóc",
      date: "01/03/2025",
      imageUrl:
        "https://file.hstatic.net/200000288983/file/hoc-cach-yeu-ban-than__1__f2e6520b4d11467f84f0ca53fd976a8e_grande.jpg",
      author: "Lê Thu Hà",
      readTime: "6 phút đọc",
    },
    {
      id: 4,
      title: "Nhật ký biết ơn: Công cụ đơn giản cho hạnh phúc mỗi ngày",
      excerpt:
        "Việc ghi lại những điều bạn biết ơn có thể thay đổi cách bạn nhìn nhận cuộc sống. Hãy khám phá sức mạnh của lòng biết ơn...",
      category: "Thực hành tích cực",
      date: "28/02/2025",
      imageUrl:
        "https://anspace-wp-uploads-production.s3.amazonaws.com/uploads/2022/11/Hinh-blog-1800-%C3%97-1200px-6.png",
      author: "Phạm Văn An",
      readTime: "4 phút đọc",
    },
    {
      id: 5,
      title: "Làm sao để đối thoại hiệu quả với nỗi lo âu của bạn?",
      excerpt:
        "Lo âu có thể là một người bạn đồng hành khó chịu, nhưng chúng ta có thể học cách đối thoại và làm chủ nó...",
      category: "Đối mặt với cảm xúc",
      date: "25/02/2025",
      imageUrl: "https://cdn.tgdd.vn/News/0/roi-loan-lo-au12-800x450.jpg",
      author: "Nguyễn Thanh Bình",
      readTime: "7 phút đọc",
    },
    {
      id: 6,
      title: "Nghệ thuật trị liệu: Khi màu sắc chữa lành tâm hồn",
      excerpt:
        "Khám phá cách mà nghệ thuật có thể trở thành công cụ mạnh mẽ trong hành trình chữa lành và tìm lại bản thân...",
      category: "Phương pháp chữa lành",
      date: "20/02/2025",
      imageUrl:
        "https://image.baophapluat.vn/1200x630/Uploaded/2025/jihvwawbvhfobu/2023_11_25/anh-1-1245.jpg",
      author: "Trần Minh Tâm",
      readTime: "9 phút đọc",
    },
  ];

  // Lấy tất cả các danh mục duy nhất
  const categories = [
    "Tất cả",
    ...new Set(articles.map((article) => article.category)),
  ];

  // Lọc bài viết theo danh mục
  const filteredArticles =
    activeCategory === "Tất cả"
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4A2580] to-[#804ac2] py-16 px-6 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Chữa Lành & Tìm Lại Bình Yên
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Hành trình khám phá nội tâm và chữa lành vết thương tinh thần
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full border-white border text-white  px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
            <button className="absolute right-3 top-3 text-gray-400">
              <Search size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Bài Viết Nổi Bật
          </h3>

          <div className="flex overflow-x-auto pb-4 space-x-4 -mx-2 px-2">
            {articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="flex-shrink-0 w-full md:w-1/3 px-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-xs text-teal-600 font-semibold mb-2">
                      {article.category}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-8 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto space-x-2 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-white text-gray-700 hover:bg-teal-50 border border-gray-200"
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Tất Cả Bài Viết
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-teal-600 font-semibold">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.date}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-800">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                      <span>{article.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-teal-500 text-white rounded-full font-medium hover:bg-teal-600 transition-colors">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#4A2580] to-[#804ac2] text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h3 className="text-2xl font-bold mb-4">
            Nhận những bài viết chữa lành mới nhất
          </h3>
          <p className="mb-8 opacity-90">
            Đăng ký nhận thông báo khi có bài viết mới và những lời khuyên hữu
            ích hàng tuần
          </p>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-1 px-6 py-3 border border-white rounded-lg text-white focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Blog;
