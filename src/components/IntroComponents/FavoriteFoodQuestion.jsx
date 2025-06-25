import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import debounce from "lodash/debounce";

export const FavoriteFoodQuestion = React.forwardRef(
  ({ selectedFoods, onFoodSelect, onSubmit, isLoading = false }, ref) => {
    const [foods, setFoods] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [selectedFoodsState, setSelectedFoodsState] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch foods for the current page
    const fetchFoods = useCallback(async (page) => {
      try {
        setIsFetching(page === 1);
        setIsLoadingMore(page > 1);
        const response = await fetch(
          `https://api.emoease.vn/lifestyle-service/food-activities?PageIndex=${page}&PageSize=10`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch food activities");
        }
        const data = await response.json();
        const newFoods = data.foodActivities.data.map((food) => ({
          value: food.id,
          label: food.name,
          description: food.description || "Không có mô tả",
          mealTime: food.mealTime || "Không xác định",
          nutrients: food.foodNutrients || [],
          categories: food.foodCategories || [],
        }));
        setFoods((prev) => (page === 1 ? newFoods : [...prev, ...newFoods]));
        setFilteredFoods((prev) =>
          page === 1 ? newFoods : [...prev, ...newFoods]
        );
        setTotalPages(data.foodActivities.totalPages);
        setIsFetching(false);
        setIsLoadingMore(false);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError(err.message);
        setIsFetching(false);
        setIsLoadingMore(false);
      }
    }, []);

    // Initial fetch
    useEffect(() => {
      fetchFoods(1);
    }, [fetchFoods]);

    // Sync internal state with props
    useEffect(() => {
      if (selectedFoods) {
        setSelectedFoodsState(
          Array.isArray(selectedFoods) ? selectedFoods : [selectedFoods]
        );
      } else {
        setSelectedFoodsState([]);
      }
    }, [selectedFoods]);

    // Search handler with debounce
    const handleSearch = useCallback(
      debounce((query) => {
        const lowerQuery = query.toLowerCase();
        const filtered = foods.filter(
          (food) =>
            food.label.toLowerCase().includes(lowerQuery) ||
            food.description.toLowerCase().includes(lowerQuery) ||
            food.mealTime.toLowerCase().includes(lowerQuery) ||
            food.nutrients.some((nutrient) =>
              nutrient.toLowerCase().includes(lowerQuery)
            ) ||
            food.categories.some((category) =>
              category.toLowerCase().includes(lowerQuery)
            )
        );
        setFilteredFoods(filtered);
      }, 300),
      [foods]
    );

    // Update search query and trigger filtering
    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      handleSearch(query);
    };

    // Select food handler (no limit)
    const handleSelectFood = (value) => {
      let updatedFoods;
      if (selectedFoodsState.includes(value)) {
        updatedFoods = selectedFoodsState.filter((id) => id !== value);
      } else {
        updatedFoods = [...selectedFoodsState, value];
      }
      setSelectedFoodsState(updatedFoods);
      onFoodSelect(updatedFoods);
    };

    // Load more foods
    const handleLoadMore = () => {
      if (pageIndex < totalPages) {
        fetchFoods(pageIndex + 1);
        setPageIndex(pageIndex + 1);
      }
    };

    // Submit handler
    const handleSubmit = () => {
      if (selectedFoodsState.length === 0 && foods.length > 0) {
        const defaultFood = [foods[0].value];
        setSelectedFoodsState(defaultFood);
        onFoodSelect(defaultFood);
      }
      if (onSubmit) {
        onSubmit();
      }
    };

    if (isFetching && pageIndex === 1) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-3 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-3 text-sm">Đang tải món ăn...</p>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
          <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-lg">
            <p className="text-white text-center text-sm">
              <span className="font-bold">Lỗi:</span> {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-3 py-1.5 bg-white text-red-600 rounded-lg hover:bg-gray-100 text-sm">
              Thử lại
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-screen flex flex-col justify-center items-center p-4 relative z-10">
        <motion.h1
          className="text-2xl sm:text-3xl text-white font-bold mb-4 text-center relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Món ăn mà bạn yêu thích là gì?
          </span>
          <motion.div
            className="absolute -bottom-2 left-1/2 w-16 h-0.5 bg-gradient-to-r from-purple-400 to-white rounded-full"
            style={{ transform: "translateX(-50%)" }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "4rem", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-4/5 max-w-3xl mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm món ăn, danh mục, hoặc chất dinh dưỡng..."
            className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </motion.div>

        <div className="relative w-4/5 max-w-3xl h-[255px] overflow-y-auto custom-scrollbar hide-scrollbar px-4">
          {filteredFoods.map((food) => (
            <motion.div
              key={food.value}
              className="snap-start py-1 h-[85px] flex items-center"
              initial={{ scale: 0.9, opacity: 0.6 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                },
              }}
              viewport={{
                once: false,
                amount: 0.8,
                margin: "-5%",
              }}>
              <div
                onClick={() => handleSelectFood(food.value)}
                className={`
                  bg-white/10 backdrop-blur-sm p-3 rounded-lg cursor-pointer
                  transform transition-all duration-300 w-full
                  hover:bg-white/20 hover:-translate-y-1
                  ${
                    selectedFoodsState.includes(food.value)
                      ? "ring-2 ring-blue-400 bg-white/30 scale-105"
                      : "hover:scale-[1.02]"
                  }
                  flex items-center mx-auto h-[75px]
                `}>
                <div className="flex items-center gap-3 w-full">
                  <span className="text-3xl">
                    {getFoodIcon(food.categories)}
                  </span>
                  <div className="text-left flex-1">
                    <h3 className="text-white font-semibold">{food.label}</h3>
                    <p className="text-white/70 text-xs line-clamp-1">
                      {food.description}
                    </p>
                    <p className="text-white/60 text-xs line-clamp-1">
                      {food.mealTime} |{" "}
                      {food.nutrients.join(", ") || "Không có chất dinh dưỡng"}{" "}
                      | {food.categories.join(", ") || "Không có danh mục"}
                    </p>
                  </div>
                  {selectedFoodsState.includes(food.value) && (
                    <span className="text-blue-400 text-xl">✓</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {pageIndex < totalPages && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="mt-4 px-4 py-2 bg-white/20 text-white rounded-lg transition-all disabled:opacity-50">
            {isLoadingMore ? (
              <>
                <span>Đang tải...</span>
                <div className="inline-block h-4 w-4 ml-2 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Tải thêm"
            )}
          </motion.button>
        )}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.03,
            backdropFilter: "blur(12px)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-6 px-5 py-3
            bg-[#602985]/10 backdrop-blur-md
            border-2 border-[#602985]/30
            text-white rounded-xl
            transition-all duration-300
            flex items-center gap-4
            shadow-[0_4px_20px_rgba(96,41,133,0.2)]
            hover:bg-[#602985]/20
            hover:border-[#602985]/50
            hover:shadow-[0_8px_25px_rgba(96,41,133,0.3)]
            disabled:opacity-50
            group">
          <span className="text-lg font-medium tracking-wide">
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="bg-[#ffffff9d] backdrop-blur-md 
              px-3 py-1 rounded-full text-sm text-[#602985]
              border border-[#602985]/30 font-medium">
              {selectedFoodsState.length}
            </span>
            {!isLoading && (
              <motion.svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            )}
            {isLoading && (
              <div className="h-5 w-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </motion.button>
      </motion.div>
    );
  }
);

// Helper function to map food categories to icons
const getFoodIcon = (categories) => {
  if (!categories || categories.length === 0) return "🍽️";
  const category = categories[0].toLowerCase();
  if (category.includes("vegetarian")) return "🥗";
  if (
    category.includes("meat") ||
    category.includes("beef") ||
    category.includes("pork")
  )
    return "🍖";
  if (category.includes("seafood")) return "🦐";
  if (category.includes("dessert") || category.includes("sweet")) return "🍰";
  if (category.includes("snack")) return "🥜";
  return "🍽️";
};

export default FavoriteFoodQuestion;
