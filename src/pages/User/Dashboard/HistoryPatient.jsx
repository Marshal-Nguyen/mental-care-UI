import React, { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { useSelector } from "react-redux";

const HistoryPatient = () => {
  const [testResults, setTestResults] = useState([]);
  const [selectedTestIndex, setSelectedTestIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileId = useSelector((state) => state.auth.profileId);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://psychologysupporttest-cmekh5gahsd2c9h7.eastasia-01.azurewebsites.net/test-results/${profileId}?PageIndex=0&PageSize=10&SortBy=TakenAt&SortOrder=desc`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTestResults(data.testResults.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

  const getScoreCategory = (score, type) => {
    if (type === "depression") {
      if (score <= 9) return "Normal";
      if (score <= 13) return "Mild";
      if (score <= 20) return "Moderate";
      if (score <= 27) return "Severe";
      return "Extremely Severe";
    } else if (type === "anxiety") {
      if (score <= 7) return "Normal";
      if (score <= 9) return "Mild";
      if (score <= 14) return "Moderate";
      if (score <= 19) return "Severe";
      return "Extremely Severe";
    } else if (type === "stress") {
      if (score <= 14) return "Normal";
      if (score <= 18) return "Mild";
      if (score <= 25) return "Moderate";
      if (score <= 33) return "Severe";
      return "Extremely Severe";
    }
    return "Unknown";
  };

  const getColorForCategory = (category) => {
    switch (category) {
      case "Normal":
        return "green";
      case "Mild":
        return "yellow";
      case "Moderate":
        return "orange";
      case "Severe":
        return "red";
      case "Extremely Severe":
        return "purple";
      default:
        return "gray";
    }
  };

  const getProgressPercentage = (score, type) => {
    const maxScores = {
      depression: 42,
      anxiety: 42,
      stress: 42,
    };
    return Math.min((score / maxScores[type]) * 100, 100);
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!testResults || testResults.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        No test results found.
      </div>
    );

  const selectedTest = testResults[selectedTestIndex];

  return (
    <div className="flex h-full bg-gray-100">
      {/* Test List Panel */}
      <div className="w-1/3 bg-white shadow-md h-full p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Test History</h2>
        <div className="space-y-2">
          {testResults.map((test, index) => (
            <div
              key={`${test.id}-${index}`}
              className={`p-3 rounded cursor-pointer ${
                selectedTestIndex === index
                  ? "bg-blue-100 border-l-4 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedTestIndex(index)}>
              <div className="font-medium">
                Test on {formatDate(test.takenAt)}
              </div>
              <div className="text-sm text-gray-600">
                Level: {test.severityLevel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Details Panel */}
      <div className="w-2/3 p-6 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Test Details</h2>

        {/* Depression Score */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Depression</h3>
            <span className="text-sm text-gray-600">DASS-21</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className={`bg-${getColorForCategory(
                getScoreCategory(
                  selectedTest.depressionScore.value,
                  "depression"
                )
              )}-500 h-2.5 rounded-full`}
              style={{
                width: `${getProgressPercentage(
                  selectedTest.depressionScore.value,
                  "depression"
                )}%`,
              }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Score: {selectedTest.depressionScore.value}
            </span>
            <span
              className={`text-${getColorForCategory(
                getScoreCategory(
                  selectedTest.depressionScore.value,
                  "depression"
                )
              )}-500`}>
              {getScoreCategory(
                selectedTest.depressionScore.value,
                "depression"
              )}
            </span>
          </div>
        </div>

        {/* Anxiety Score */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Anxiety</h3>
            <span className="text-sm text-gray-600">DASS-21</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className={`bg-${getColorForCategory(
                getScoreCategory(selectedTest.anxietyScore.value, "anxiety")
              )}-500 h-2.5 rounded-full`}
              style={{
                width: `${getProgressPercentage(
                  selectedTest.anxietyScore.value,
                  "anxiety"
                )}%`,
              }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Score: {selectedTest.anxietyScore.value}
            </span>
            <span
              className={`text-${getColorForCategory(
                getScoreCategory(selectedTest.anxietyScore.value, "anxiety")
              )}-500`}>
              {getScoreCategory(selectedTest.anxietyScore.value, "anxiety")}
            </span>
          </div>
        </div>

        {/* Stress Score */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Stress</h3>
            <span className="text-sm text-gray-600">DASS-21</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className={`bg-${getColorForCategory(
                getScoreCategory(selectedTest.stressScore.value, "stress")
              )}-500 h-2.5 rounded-full`}
              style={{
                width: `${getProgressPercentage(
                  selectedTest.stressScore.value,
                  "stress"
                )}%`,
              }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">
              Score: {selectedTest.stressScore.value}
            </span>
            <span
              className={`text-${getColorForCategory(
                getScoreCategory(selectedTest.stressScore.value, "stress")
              )}-500`}>
              {getScoreCategory(selectedTest.stressScore.value, "stress")}
            </span>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white rounded-lg p-4 shadow border-l-4 border-yellow-500">
          <div className="flex items-start">
            <div className="mr-3">
              <Info size={24} className="text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Important Note</h3>
              <p className="text-gray-700">
                {selectedTest.recommendation || "No recommendation provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPatient;
