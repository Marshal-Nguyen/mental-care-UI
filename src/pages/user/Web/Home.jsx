import React from "react";
import NavigaForWeb from "../../../components/Web/NavigaForWeb";
import LogIn from "../../../components/Web/LogIn";
import BackGround from "../../../components/Web/BackGround";
import Footer from "../../../components/Web/Footer";

const Home = () => {
  return (
    <div className="w-screen min-h-[200vh]">
      {" "}
      {/* Kéo dài trang 200% màn hình */}
      {/* Header */}
      <div className="flex justify-between items-center px-10 py-4">
        <div className="w-12 h-12"></div>

        <NavigaForWeb />
        <LogIn />
      </div>
      {/* Background */}
      <BackGround />
      {/* Content để tăng chiều dài */}
      <div className="p-10">
        <h1 className="text-4xl font-bold">Nội dung chính</h1>
        <p className="mt-4 text-lg">
          Đây là một đoạn text dài để trang có thể scroll xuống và thấy hiệu ứng
          rõ ràng hơn.
        </p>
        <div className="h-[100vh]"></div> {/* Chèn thêm khoảng trống */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
