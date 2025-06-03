import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useDebounce } from "use-debounce";
import axios from "axios";
const PhysicalActivitiesRecommendation = ({
  profileId,
  onActivitiesSelected,
  initialSelectedActivities = [],
}) => {
  const [activitiesCache, setActivitiesCache] = useState({}); // Cache data for each page
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false); // Separate loading state for page changes
  const [error, setError] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState(
    initialSelectedActivities
  );
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filterIntensity, setFilterIntensity] = useState("");
  const VITE_API_LIFESTYLE_URL = import.meta.env.VITE_API_LIFESTYLE_URL;
  // Sync selectedActivities with initialSelectedActivities only on mount
  useEffect(() => {
    setSelectedActivities(initialSelectedActivities);
  }, [initialSelectedActivities]);

  // Function to fetch a specific page of activities
  const fetchActivitiesPage = async (pageIndex, signal) => {
    // Check if data is already in cache
    if (activitiesCache[pageIndex]) {
      return activitiesCache[pageIndex];
    }
    try {
      const response = await axios.get(
        `${VITE_API_LIFESTYLE_URL}/physical-activities?pageIndex=${
          pageIndex + 1
        }&pageSize=10`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const pageData = {
        data: response.data.physicalActivities.data,
        totalPages: response.data.physicalActivities.totalPages,
        totalCount: response.data.physicalActivities.totalCount,
      };

      // Add to cache
      const MAX_CACHE_SIZE = 5;
      setActivitiesCache((prev) => {
        const newCache = { ...prev, [pageIndex]: pageData };
        if (Object.keys(newCache).length > MAX_CACHE_SIZE) {
          const oldestPage = Math.min(...Object.keys(newCache).map(Number));
          delete newCache[oldestPage];
        }
        return newCache;
      });

      return pageData;
    } catch (err) {
      if (err.name === "AbortError") return; // Bỏ qua lỗi hủy
      throw new Error("Error fetching activity recommendations.");
    }
  };

  // Fetch current page data
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const loadCurrentPage = async () => {
      try {
        setPageLoading(true);

        const pageData = await fetchActivitiesPage(page, controller.signal);

        if (mounted) {
          setActivities(pageData.data);
          setTotalPages(pageData.totalPages);
          setLoading(false);
          setPageLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || "Error fetching activities");
          setLoading(false);
          setPageLoading(false);
        }
      }
    };

    loadCurrentPage();

    // Preload next page if exists
    if (page < totalPages - 1) {
      fetchActivitiesPage(page + 1).catch(() => {}); // Silently catch errors for preload
    }

    return () => {
      mounted = false;
    };
  }, [page]);

  const handleSaveActivities = () => {
    onActivitiesSelected(selectedActivities);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Reset sau 2 giây
  };

  const handleActivitySelection = (activity) => {
    setSelectedActivities((prev) => {
      const alreadySelected = prev.some((item) => item.id === activity.id);
      return alreadySelected
        ? prev.filter((item) => item.id !== activity.id)
        : [...prev, activity];
    });
  };

  // Optimized page change handler
  const handlePageClick = async (data) => {
    const newPage = data.selected;
    if (newPage === page) return;

    setPage(newPage);
    setPageLoading(true); // Bật loading ngay lập tức để người dùng thấy phản hồi

    try {
      const pageData = await fetchActivitiesPage(newPage);
      setActivities(pageData.data);
      setTotalPages(pageData.totalPages);
      setPageLoading(false);
    } catch (err) {
      setError(err.message || "Error fetching activities");
      setPageLoading(false);
    }
  };
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const pageData = await fetchActivitiesPage(0);
        setActivities(pageData.data);
        setTotalPages(pageData.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);
  // Filter activities by search term and intensity
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      debouncedSearchTerm === "" ||
      activity.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      activity.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());

    const matchesIntensity =
      filterIntensity === "" ||
      activity.intensityLevel.toLowerCase() === filterIntensity.toLowerCase();

    return matchesSearch && matchesIntensity;
  });

  // Initial loading state
  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            loadCurrentPage();
          }}
          className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">
          Thử lại
        </button>
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Select Activities That Interest You
        </h2>
        <div className="h-1 w-20 bg-[#854dc5] rounded"></div>
        <p className="text-gray-600 mt-4">
          Our system will use your preferences to recommend personalized
          activities that may help improve your wellbeing.
        </p>
      </div>

      {/* Selected Activities */}
      <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <h3 className="font-medium text-lg text-blue-800 mb-3 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          Selected Activities ({selectedActivities.length})
        </h3>
        {selectedActivities.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-1">
            {selectedActivities.map((activity) => (
              <span
                key={activity.id}
                className="bg-white border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-sm flex items-center shadow-sm transition-all hover:shadow">
                {activity.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivitySelection(activity);
                  }}
                  className="ml-2 text-blue-600 hover:text-red-600 font-bold transition-colors">
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            No activities selected yet
          </p>
        )}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        <div className="md:w-1/4">
          <select
            value={filterIntensity}
            onChange={(e) => setFilterIntensity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white cursor-pointer">
            <option value="">All Intensities</option>
            <option value="Low">Low Intensity</option>
            <option value="Medium">Medium Intensity</option>
            <option value="High">High Intensity</option>
          </select>
        </div>
      </div>

      {/* Page Loading Indicator (overlay) */}
      {pageLoading && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {/* Activity Cards */}
      {!pageLoading && filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 min-h-[400px]">
          {filteredActivities.map((activity) => {
            const isSelected = selectedActivities.some(
              (item) => item.id === activity.id
            );
            return (
              <div
                key={activity.id}
                className={`border rounded-xl p-5 cursor-pointer transition-all transform hover:-translate-y-1 ${
                  isSelected
                    ? "bg-blue-50 border-blue-300 shadow-md"
                    : "hover:bg-gray-50 hover:shadow-md"
                }`}
                onClick={() => handleActivitySelection(activity)}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {activity.name}
                  </h3>
                  {isSelected ? (
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm shadow">
                      ✓
                    </span>
                  ) : (
                    <span className="border-2 border-dashed border-gray-300 rounded-full w-6 h-6 flex items-center justify-center opacity-50"></span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {activity.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      activity.intensityLevel === "High"
                        ? "bg-red-100 text-red-700"
                        : activity.intensityLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                    {activity.intensityLevel} Intensity
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {activity.impactLevel} Impact
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : !pageLoading && filteredActivities.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg min-h-[400px] flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p className="mt-2 text-gray-500">
            No activities match your search criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterIntensity("");
            }}
            className="mt-3 text-blue-600 hover:text-blue-800 text-sm underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="min-h-[400px]"></div> // Placeholder to maintain layout during loading
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 border-t pt-4">
        <ReactPaginate
          previousLabel={
            <button
              disabled={pageLoading || page === 0}
              className="flex items-center text-gray-700 hover:text-blue-600 disabled:opacity-50">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"></path>
              </svg>
              Prev
            </button>
          }
          nextLabel={
            <button
              disabled={pageLoading || page === totalPages - 1}
              className="flex items-center text-gray-700 hover:text-blue-600 disabled:opacity-50">
              Next
              <svg
                className="w-5 h-5 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          }
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex items-center space-x-1"
          pageClassName="px-3 py-1 cursor-pointer border rounded hover:bg-gray-100 text-sm"
          previousClassName={`px-3 py-1 border rounded ${
            page === 0 || pageLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
          nextClassName={`px-3 py-1 border rounded ${
            page === totalPages - 1 || pageLoading
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
          activeClassName="bg-gradient-to-b from-[#925FE2] to-[#7042C0] text-white"
          disabledClassName="opacity-50 cursor-not-allowed"
          forcePage={page}
        />
        <div className="text-sm text-gray-600">
          Trang {page + 1} / {totalPages}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSaveActivities}
          disabled={selectedActivities.length === 0}
          className={`px-6 py-2.5 rounded-lg flex items-center font-medium text-lg shadow-md transition-all ${
            selectedActivities.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5"
          }`}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          Save Selected Activities ({selectedActivities.length})
        </button>
      </div>
    </div>
  );
};
export default PhysicalActivitiesRecommendation;
