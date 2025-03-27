import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";

const Shopping = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Personal Therapy Journal",
      price: 199000,
      image:
        "https://channel.vcmedia.vn/2020/10/30/arttherapyco1197946373333644611139322277352363798263268n-16040296983902133940147.jpg",
      description:
        "A journey of self-discovery and healing, helping you connect deeply with your emotions and thoughts.",
      categories: ["Self-Development", "Mental Health"],
    },
    {
      id: 2,
      name: "Online Self-Development Course",
      price: 499000,
      image: "https://static.tnex.com.vn/uploads/2021/09/NANG-CAP-BAN-THAN.png",
      description:
        "A comprehensive training program that helps you explore and develop your potential.",
      categories: ["Skill Development", "Coaching"],
    },
    {
      id: 3,
      name: "Online Music Therapy",
      price: 2990000,
      image:
        "https://salt.tkbcdn.com/ts/ds/25/e6/b4/d79786df1e38c39beabe33c462cc381e.jpg",
      description:
        "Experience soul-healing through music, reducing stress and enhancing mental well-being.",
      categories: ["Relaxation", "Mental Health"],
    },
    {
      id: 4,
      name: "Home Meditation & Yoga Kit",
      price: 349000,
      image:
        "https://pushfitnessyoga.com/wp-content/uploads/2022/09/ngoi-thien-nhat-ban.jpg",
      description:
        "A professional meditation and yoga kit to support your practice and improve overall well-being.",
      categories: ["Physical Health", "Mindfulness"],
    },
  ]);

  return (
    <div className="min-h-full bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700 mb-2">
            Mental Wellness Products
          </h1>
          <p className="text-gray-600 text-base italic">
            Each product is carefully selected to support your journey of
            self-development and mental well-being.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition hover:shadow-lg">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5 hover:bg-white transition">
                  <HeartIcon className="text-purple-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-purple-600">
                    {product.price.toLocaleString()}đ
                  </span>
                  <button className="bg-purple-600 text-white px-3 py-1.5 rounded-md hover:bg-purple-700 transition flex items-center">
                    <ShoppingCartIcon size={16} className="mr-1" />
                    Mua Ngay
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {product.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shopping;
