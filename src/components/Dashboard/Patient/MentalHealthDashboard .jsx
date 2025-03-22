import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const MentalHealthDashboard = () => {
  const [latestTest, setLatestTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileId = useSelector((state) => state.auth.profileId);
  useEffect(() => {
    const fetchLatestTestResult = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://psychologysupport-test.azurewebsites.net/test-results/${profileId}?PageIndex=0&PageSize=10&SortBy=TakenAt&SortOrder=desc`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Get the most recent test (first item in the sorted data)
        if (data.testResults.data && data.testResults.data.length > 0) {
          setLatestTest(data.testResults.data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTestResult();
  }, []);

  // Format the scores to always have 2 digits
  const formatScore = (score) => {
    return score < 10 ? `0${score}` : `${score}`;
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!latestTest)
    return <div className="text-center py-10">No test results found.</div>;

  // Extract needed data from the latest test
  const depressionScore = latestTest.depressionScore.value;
  const anxietyScore = latestTest.anxietyScore.value;
  const stressScore = latestTest.stressScore.value;
  const recommendation =
    latestTest.recommendation || "No specific recommendations provided.";
  const recommendationList = recommendation
    .split(".")
    .filter((item) => item.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-2 bg-[#fff0]">
      {/* Score Cards Container */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Depression Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="bg-indigo-400 p-2 text-center">
            <h3 className="text-white font-bold italic">Depression</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-indigo-500 font-bold italic">
              {formatScore(depressionScore)}
            </span>
          </div>
        </div>

        {/* Anxiety Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white border-2 border-emerald-400">
          <div className="bg-emerald-400 p-2 text-center">
            <h3 className="text-white font-bold italic">Anxiety</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-emerald-600 font-bold italic">
              {formatScore(anxietyScore)}
            </span>
          </div>
        </div>

        {/* Stress Card */}
        <div className="w-40 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="bg-amber-300 p-2 text-center">
            <h3 className="text-white font-bold italic">Stress</h3>
          </div>
          <div className="p-8 flex justify-center items-center">
            <span className="text-6xl text-amber-600 font-bold italic">
              {formatScore(stressScore)}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white rounded-xl px-6 py-3 shadow-sm mt-2">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Initial Recommendations:
        </h2>
        <ol className="list-disc pl-6 space-y-1 h-20 overflow-y-auto italic">
          {recommendation === "Recommendation goes here" ||
          recommendation === "No specific recommendations provided." ? (
            <>
              <li>
                Engage in relaxation techniques (deep breathing, meditation,
                light physical activities).
              </li>
              <li>Adjust lifestyle habits, focusing on sleep and nutrition.</li>
              <li>
                If symptoms persist or worsen, seeking professional
                psychological support is advised.
              </li>
            </>
          ) : (
            recommendationList.map((item, index) => (
              <li key={index}>{item.trim()}.</li>
            ))
          )}
        </ol>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;
