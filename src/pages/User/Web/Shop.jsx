import React, { useState } from "react";

const Shop = () => {
  // All products data
  const allProducts = [
    // First page
    {
      id: 1,
      name: "Nước hoa Lavender Dreams",
      creator: "PerfumeArt",
      image:
        "https://product.hstatic.net/200000468851/product/kr-lavender-30ml_46b14ad336404f46956baa22ecc9c45d.png",
      color: "bg-purple-100",
      price: 350000,
      description:
        "Hương thơm oải hương nhẹ nhàng giúp thư giãn và cải thiện giấc ngủ. Được chiết xuất từ 100% tinh dầu tự nhiên.",
      inStock: true,
    },
    {
      id: 2,
      name: "Bộ nến thơm Harmony",
      creator: "CandleStudio",
      image:
        "https://product.hstatic.net/200000455999/product/lemon___lavender_mockup_55598558943d43c8a28690681fa82f58_grande.jpg",
      color: "bg-orange-100",
      price: 420000,
      description:
        "Bộ 3 nến thơm với các mùi hương khác nhau giúp tạo không gian thư giãn lý tưởng. Thời gian cháy lên đến 40 giờ.",
      inStock: true,
    },
    {
      id: 3,
      name: "Gối ôm Memory Foam Premium",
      creator: "ComfortDesign",
      image:
        "https://inoacliving.vn/wp-content/uploads/2022/04/img-goi-om-nhat-ban-hachiko-5.jpg",
      color: "bg-gray-100",
      price: 850000,
      description:
        "Gối ôm cao cấp với chất liệu memory foam, giúp nâng đỡ cơ thể và mang lại giấc ngủ thoải mái.",
      inStock: true,
    },
    {
      id: 4,
      name: "Tinh dầu Eucalyptus",
      creator: "NaturalEssence",
      image: "https://cf.shopee.vn/file/609ad085429f09ed9e08e6793cb0c66c",
      color: "bg-green-100",
      price: 280000,
      description:
        "Tinh dầu bạch đàn nguyên chất giúp thông mũi, làm sạch không khí và tạo cảm giác thư thái.",
      inStock: true,
    },
    {
      id: 5,
      name: "Đèn xông tinh dầu Ceramic",
      creator: "LightAroma",
      image:
        "https://idangcap.vn/wp-content/uploads/2019/12/den-xong-bat-trang.jpg",
      color: "bg-yellow-100",
      price: 520000,
      description:
        "Đèn xông tinh dầu bằng gốm sứ cao cấp, tích hợp đèn LED 7 màu tạo không gian thư giãn tối ưu.",
      inStock: true,
    },
    {
      id: 6,
      name: "Nến thơm Vanilla Comfort",
      creator: "WarmGlow",
      image:
        "https://file.hstatic.net/200000666175/article/huong-dan-su-dung-nen-thom-dung-cach-cho-nguoi-bat-dau_ee0c287c03144f02abac1aa1287cee5f.jpg",
      color: "bg-amber-100",
      price: 380000,
      description:
        "Nến thơm vanilla giúp tạo cảm giác ấm áp, thoải mái. Thời gian cháy lên đến 50 giờ.",
      inStock: true,
    },
    {
      id: 7,
      name: "Gối massage cổ Electric",
      creator: "RelaxTech",
      image:
        "https://boba.vn/static/san-pham/thiet-bi-y-te/thiet-bi-massage/goi-massage/goi-massage-vong-co-chu-u-da-nang-j154/o1cn01psyt.jpg",
      color: "bg-blue-100",
      price: 950000,
      description:
        "Gối massage cổ với nhiều chế độ rung khác nhau, giúp giảm đau mỏi vai gáy hiệu quả.",
      inStock: false,
    },
    {
      id: 8,
      name: "Bộ sưu tập nước hoa Serenity",
      creator: "LuxScent",
      image: "https://dailycomma.com.vn/wp-content/uploads/2023/03/st.jpeg",
      color: "bg-rose-100",
      price: 1200000,
      description:
        "Bộ sưu tập 5 loại nước hoa mini với các hương thơm nhẹ nhàng, phù hợp cho mọi dịp.",
      inStock: true,
    },
    // Second page
    {
      id: 9,
      name: "Mặt nạ trị liệu Collagen",
      creator: "BeautyRelax",
      image:
        "https://kenh14cdn.com/203336854389633024/2024/1/15/photo-1-1705320936493432188860.jpg",
      color: "bg-pink-100",
      price: 320000,
      description:
        "Mặt nạ chứa collagen tự nhiên, giúp phục hồi da mệt mỏi và làm mờ nếp nhăn.",
      inStock: true,
    },
    {
      id: 10,
      name: "Máy tạo ẩm siêu âm",
      creator: "PureAir",
      image:
        "https://cdn8.web4s.vn/media/news/334146377_154203667443006_8093310783065486695_n.jpg",
      color: "bg-blue-100",
      price: 890000,
      description:
        "Máy tạo ẩm không gian với công nghệ siêu âm, hoạt động êm ái và tiết kiệm điện.",
      inStock: true,
    },
    {
      id: 11,
      name: "Bình lọc nước thủy tinh",
      creator: "ClearLife",
      image: "https://cf.shopee.vn/file/ffa987cc32a244bd8bab5b9ef2cb57d0",
      color: "bg-cyan-100",
      price: 450000,
      description:
        "Bình lọc nước bằng thủy tinh cao cấp với lõi lọc than hoạt tính và khoáng đá.",
      inStock: true,
    },
    {
      id: 12,
      name: "Đèn đọc sách thông minh",
      creator: "SmartLighting",
      image: "https://cf.shopee.vn/file/5ad0bac25453c26973d4d136ad457e36",
      color: "bg-purple-100",
      price: 750000,
      description:
        "Đèn đọc sách thông minh với 5 chế độ ánh sáng, bảo vệ mắt tối ưu.",
      inStock: true,
    },
    {
      id: 13,
      name: "Set chăm sóc tóc Organic",
      creator: "NatureHair",
      image:
        "https://annshop.vn/wp-content/uploads/post-app-3520-z4923325035864-be9d1c1b30e2402430ce6b61dbe1b7b0.jpg",
      color: "bg-green-100",
      price: 650000,
      description:
        "Bộ sản phẩm chăm sóc tóc từ nguyên liệu hữu cơ, không hóa chất độc hại.",
      inStock: true,
    },
    {
      id: 14,
      name: "Nến thơm hình học",
      creator: "GeoCandle",
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7qve8-lfar8u1q5t865c",
      color: "bg-amber-100",
      price: 390000,
      description:
        "Bộ nến thơm với thiết kế hình học độc đáo, trang trí không gian sống thêm phần nghệ thuật.",
      inStock: true,
    },
    {
      id: 15,
      name: "Tinh dầu hoa hồng",
      creator: "RoseEssence",
      image: "https://cf.shopee.vn/file/609ad085429f09ed9e08e6793cb0c66c",
      color: "bg-red-100",
      price: 310000,
      description:
        "Tinh dầu hoa hồng nguyên chất, giúp cân bằng cảm xúc và làm dịu da.",
      inStock: true,
    },
    {
      id: 16,
      name: "Đèn ngủ treo tường",
      creator: "DreamLight",
      image:
        "https://noithatmanhhe.vn/media/33033/den-ngu-treo-tuong-mau-3.jpg",
      color: "bg-yellow-100",
      price: 580000,
      description:
        "Đèn ngủ treo tường với ánh sáng dịu nhẹ, lý tưởng cho phòng ngủ và không gian thư giãn.",
      inStock: false,
    },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 8;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Calculate current products to display
  const currentProducts = allProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Navigation functions
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Open product detail modal
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  // Close product detail modal
  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="bg-white text-white w-full min-h-screen">
      {/* Header */}
      <header
        className="pt-12 bg-gradient-to-r from-[#4A2580] to-[#804ac2]
 pb-8 px-6 text-center">
        <h2 className="text-xl opacity-80 mb-2 text-[#ffffff]">
          Welcome to EmoRelax
        </h2>
        <h1 className="text-5xl font-bold mb-4 text-[#ffffff]">
          Explore a Relaxing Space
        </h1>
        <p className="mb-8 opacity-80 max-w-3xl mx-auto text-[#ffffff]">
          We carefully select premium products to help you relax and regain
          mental balance in your daily life.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="border border-[#ffffff] py-2 px-6 rounded-full font-medium text-white">
            Discover more
          </button>
        </div>
      </header>

      {/* Products Grid */}
      <div className="px-4 py-8">
        {/* Page indicator */}
        <div className="mb-4 text-center text-[#4A2580]">
          Trang {currentPage + 1} / {totalPages}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="relative group overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openProductDetail(product)}>
              <div
                className={`aspect-square ${product.color} flex items-center justify-center overflow-hidden`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center mt-3 gap-4">
                <div className="w-8 h-8 bg-[#000] rounded-full flex items-center justify-center text-white text-xs mr-2">
                  SR
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-[#4a2878] ">
                      {product.name}
                    </span>
                    <span className="ml-1 text-orange-500">•</span>
                  </div>
                  <div className="text-sm opacity-70 text-[#000]">
                    Thiết kế bởi {product.creator}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="fixed top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-10 pointer-events-none">
        <button
          onClick={prevPage}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg pointer-events-auto hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={nextPage}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg pointer-events-auto hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#ffffff4b] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-black">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={closeProductDetail}
                className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Product image */}
                <div className={`w-full md:w-1/2 ${selectedProduct.color} p-6`}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                {/* Product info */}
                <div className="w-full md:w-1/2 p-6">
                  <h2 className="text-2xl font-bold text-[#4a2878] mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Thiết kế bởi {selectedProduct.creator}
                  </p>
                  <div className="text-xl font-bold text-[#4a2878] mb-4">
                    {formatPrice(selectedProduct.price)}
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Mô tả sản phẩm:</h3>
                    <p className="text-gray-700">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Tình trạng:</h3>
                    <p
                      className={
                        selectedProduct.inStock
                          ? "text-green-600"
                          : "text-red-600"
                      }>
                      {selectedProduct.inStock ? "Còn hàng" : "Hết hàng"}
                    </p>
                  </div>

                  {selectedProduct.inStock && (
                    <>
                      <div className="mb-6">
                        <h3 className="font-medium mb-2">Số lượng:</h3>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              setQuantity(Math.max(1, quantity - 1))
                            }
                            className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-l">
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-12 h-8 text-center border-t border-b"
                          />
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 bg-gray-200 flex items-center justify-center rounded-r">
                            +
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <button className="bg-[#4A2580] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#3a1c68] transition-colors">
                          Thêm vào giỏ hàng
                        </button>
                        <button className="bg-[#804ac2] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6b3eac] transition-colors">
                          Mua ngay
                        </button>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="font-medium mb-2">
                          Phương thức thanh toán:
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          <div className="border border-gray-300 rounded-md px-4 py-2 text-sm">
                            Thẻ tín dụng
                          </div>
                          <div className="border border-gray-300 rounded-md px-4 py-2 text-sm">
                            Chuyển khoản
                          </div>
                          <div className="border border-gray-300 rounded-md px-4 py-2 text-sm">
                            Thanh toán khi nhận hàng
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {!selectedProduct.inStock && (
                    <button className="bg-gray-400 text-white py-3 px-6 rounded-lg font-medium w-full cursor-not-allowed">
                      Sản phẩm đã hết hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
