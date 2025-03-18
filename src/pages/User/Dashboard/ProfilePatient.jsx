import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const PhysicalActivitiesRecommendation = ({
  profileId,
  onActivitiesSelected,
  initialSelectedActivities = [],
}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState(
    initialSelectedActivities
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch physical activities from the API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://psychologysupportlifestyles01-dmc2fjc6dqdbfhac.southeastasia-01.azurewebsites.net/physical-activities?pageIndex=${page}&pageSize=10`
        );

        // Mark activities that are already selected
        const loadedActivities = response.data.physicalActivities.data;

        setActivities(loadedActivities);
        setTotalPages(response.data.physicalActivities.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Error fetching activity recommendations. Please try again.");
        setLoading(false);
        console.error("Error fetching physical activities:", err);
      }
    };

    fetchActivities();
  }, [page]);

  // Pass selected activities to parent whenever they change
  useEffect(() => {
    onActivitiesSelected(selectedActivities);
  }, [selectedActivities, onActivitiesSelected]);

  // Initialize with any activities that were already selected
  useEffect(() => {
    if (initialSelectedActivities.length > 0) {
      setSelectedActivities(initialSelectedActivities);
    }
  }, [initialSelectedActivities]);

  // Handle activity selection
  const handleActivitySelection = (activity) => {
    setSelectedActivities((prev) => {
      // Check if already selected
      const alreadySelected = prev.some((item) => item.id === activity.id);

      if (alreadySelected) {
        // Remove from selection
        return prev.filter((item) => item.id !== activity.id);
      } else {
        // Add to selection
        return [...prev, activity];
      }
    });
  };

  // Generate page buttons for pagination
  const renderPageButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // Calculate range of pages to show
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      buttons.push(
        <button
          key="1"
          onClick={() => setPage(1)}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100">
          1
        </button>
      );

      // Add ellipsis if needed
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 border rounded ${
            i === page ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"
          }`}>
          {i}
        </button>
      );
    }

    // Show last page if needed
    if (endPage < totalPages) {
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100">
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  if (loading)
    return (
      <div className="text-center p-4">Loading activity recommendations...</div>
    );
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Recommended Physical Activities
      </h2>
      <p className="text-gray-600 mb-4">
        Select activities that interest you. Our system will use your
        preferences to recommend personalized activities that may help improve
        your wellbeing.
      </p>

      {/* Selected activities summary at the top for better visibility */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-medium mb-2">
          Selected Activities ({selectedActivities.length})
        </h3>
        {selectedActivities.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-1">
            {selectedActivities.map((activity) => (
              <span
                key={activity.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {activity.name}
                <button
                  onClick={() => handleActivitySelection(activity)}
                  className="ml-1 text-blue-600 hover:text-blue-800 font-bold">
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            No activities selected yet
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedActivities.some((item) => item.id === activity.id)
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-50"
            }`}
            onClick={() => handleActivitySelection(activity)}>
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">{activity.name}</h3>
              {selectedActivities.some((item) => item.id === activity.id) && (
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  ✓
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="mr-3">
                <span className="font-medium">Intensity:</span>{" "}
                {activity.intensityLevel}
              </span>
              <span>
                <span className="font-medium">Impact:</span>{" "}
                {activity.impactLevel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Improved Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-2 py-1 border rounded-l ${
              page === 1
                ? "bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100"
            }`}
            aria-label="Previous page">
            ←
          </button>

          <div className="flex space-x-1">{renderPageButtons()}</div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-2 py-1 border rounded-r ${
              page === totalPages
                ? "bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100"
            }`}
            aria-label="Next page">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

// Modified EditProfileForm to include the new component
const EditProfileForm = () => {
  const profileId = useSelector((state) => state.auth.profileId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    allergies: "",
    personalityTraits: "",
    contactInfo: {
      address: "",
      phoneNumber: "",
      email: "",
    },
    recommendedActivities: [],
  });

  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/patients/${profileId}`
        );
        const { patientProfileDto } = response.data;

        // Set form data with patient information
        setFormData({
          fullName: patientProfileDto.fullName,
          gender: patientProfileDto.gender,
          allergies: patientProfileDto.allergies,
          personalityTraits: patientProfileDto.personalityTraits,
          contactInfo: {
            address: patientProfileDto.contactInfo.address,
            phoneNumber: patientProfileDto.contactInfo.phoneNumber,
            email: patientProfileDto.contactInfo.email,
          },
          recommendedActivities: patientProfileDto.recommendedActivities || [],
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching patient data. Please try again.");
        setLoading(false);
        console.error("Error fetching patient data:", err);
      }
    };

    fetchPatientData();
  }, [profileId]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle contact info changes
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        [name]: value,
      },
    });
  };

  // Handle selected activities
  const handleActivitiesSelected = (activities) => {
    setFormData({
      ...formData,
      recommendedActivities: activities,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create the payload to match the expected API structure
      const updatedProfile = {
        patientProfileDto: {
          id: profileId,
          // Include userId from original data to maintain the reference
          userId: null, // This should be replaced with the actual userId from the fetched data
          fullName: formData.fullName,
          gender: formData.gender,
          allergies: formData.allergies,
          personalityTraits: formData.personalityTraits,
          contactInfo: formData.contactInfo,
          // Keep medical history as is - assuming it's not editable in this form
          medicalHistory: null, // This should be replaced with the actual medical history from the fetched data
          medicalRecords: [],
          recommendedActivities: formData.recommendedActivities.map(
            (activity) => ({
              id: activity.id,
              name: activity.name,
              description: activity.description,
              intensityLevel: activity.intensityLevel,
              impactLevel: activity.impactLevel,
            })
          ),
        },
      };

      await axios.put(
        `https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/patients/${profileId}`,
        updatedProfile
      );

      setLoading(false);
      alert("Patient profile updated successfully!");
      navigate(`/patients/${profileId}`); // Navigate to patient details page
    } catch (err) {
      setError("Error updating patient data. Please try again.");
      setLoading(false);
      console.error("Error updating patient data:", err);
    }
  };

  if (loading)
    return <div className="text-center p-6">Loading patient data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 h-[94vh] bg-[#f6e8ff] rounded-2xl">
      <div className="h-full overflow-y-auto p-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Psychology Profile</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Personality Traits
                </label>
                <select
                  name="personalityTraits"
                  value={formData.personalityTraits}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="">Select Personality Trait</option>
                  <option value="Introversion">Introversion</option>
                  <option value="Extroversion">Extroversion</option>
                  <option value="Ambiversion">Ambiversion</option>
                  <option value="Neuroticism">Neuroticism</option>
                  <option value="Conscientiousness">Conscientiousness</option>
                  <option value="Agreeableness">Agreeableness</option>
                  <option value="Openness">Openness</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="List any allergies or enter 'None'"
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.contactInfo.phoneNumber}
                  onChange={handleContactInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.contactInfo.address}
                  onChange={handleContactInfoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                  required></textarea>
              </div>
            </div>
          </div>

          {/* Physical Activities Recommendation Component */}
          <PhysicalActivitiesRecommendation
            profileId={profileId}
            onActivitiesSelected={handleActivitiesSelected}
            initialSelectedActivities={formData.recommendedActivities}
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/patients/${profileId}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
