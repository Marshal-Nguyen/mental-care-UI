import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import PhysicalActivitiesRecommendation from "../../../components/Dashboard/Patient/PhysicalActivitiesRecommendation";
import TherapeuticActivitiesRecommendation from "../../../components/Dashboard/Patient/TherapeuticActivitiesRecommendation";

// Modified EditProfileForm to include avatar functionality
const EditProfileForm = () => {
  const profileId = useSelector((state) => state.auth.profileId);
  const userId = localStorage.getItem("userId");
  console.log("Test Profile", profileId);
  console.log("Test User", userId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("physical");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);
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
  const VITE_API_PROFILE_URL = import.meta.env.VITE_API_PROFILE_URL;
  const VITE_API_IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;
  // Fetch patient data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${VITE_API_PROFILE_URL}/patients/${profileId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
    fetchAvatar();
  }, [profileId]);

  // Fetch avatar image
  const fetchAvatar = async () => {
    try {
      const avatarResponse = await axios.get(
        `${VITE_API_IMAGE_URL}/image/get?ownerType=User&ownerId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Create object URL from the blob response

      console.log("Avatar URL:", avatarResponse.data);
      setAvatarUrl(avatarResponse.data.url);
    } catch (err) {
      console.log("No avatar found or error fetching avatar:", err);
      // Not setting an error as avatar might not exist yet
    }
  };

  // Handle uploading or updating avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG)");
      return;
    }

    // Maximum file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setAvatarLoading(true);

      // Create FormData object
      const formDataImg = new FormData();
      formDataImg.append("file", file);
      formDataImg.append("ownerType", "User");
      formDataImg.append("ownerId", userId);

      // Determine if we need to upload a new image or update existing one
      const endpoint = avatarUrl
        ? `${VITE_API_IMAGE_URL}/image/update`
        : `${VITE_API_IMAGE_URL}/image/upload`;

      const method = avatarUrl ? axios.put : axios.post;
      await method(endpoint, formDataImg, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("FomeData:", formDataImg);
      // Refresh avatar
      await fetchAvatar();
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      console.error("Error updating avatar:", err);
      toast.error("Failed to update profile picture. Please try again.");
    } finally {
      setAvatarLoading(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

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
        patientProfileUpdate: {
          fullName: formData.fullName,
          gender: formData.gender,
          allergies: formData.allergies,
          personalityTraits: formData.personalityTraits,
          contactInfo: formData.contactInfo,
        },
      };

      await axios.put(
        `${VITE_API_PROFILE_URL}/patients/${profileId}`,
        updatedProfile,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      toast.success("Patient profile updated successfully!");
    } catch (err) {
      setError("Error updating patient data. Please try again.");
      setLoading(false);
      console.error("Error updating patient data:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 h-[94vh] bg-[#f6e8ff] rounded-2xl">
      <div className="h-full overflow-y-auto p-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}

          <div className="bg-white shadow-md rounded-lg p-6">
            {/* <h2 className="text-xl font-semibold mb-4">Profile Picture</h2> */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {/* Tăng kích thước và thêm styles cho container */}
                <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-purple-200 shadow-lg">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20" // Tăng kích thước icon
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  {avatarLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
                    </div>
                  )}
                </div>
                {/* Điều chỉnh vị trí và kích thước nút upload */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="absolute bottom-2 right-2 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none transform hover:scale-110 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/jpeg, image/png, image/gif"
                className="hidden"
              />
              <p className="mt-4 text-sm text-gray-500 font-medium">
                Click to {avatarUrl ? "change" : "upload"} profile picture
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: JPEG, PNG (max. 5MB)
              </p>
            </div>
          </div>
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
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/patients/${profileId}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#9284e0] to-[#5849b1] text-white rounded-md hover:bg-blue-700"
              disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recommended Activities
            </h2>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab("physical")}
                className={`px-4 py-2 -mb-px ${
                  activeTab === "physical"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                Physical Activities
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("therapeutic")}
                className={`px-4 py-2 -mb-px ${
                  activeTab === "therapeutic"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}>
                Therapeutic Activities
              </button>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "physical" && (
                <PhysicalActivitiesRecommendation
                  profileId={profileId}
                  onActivitiesSelected={handleActivitiesSelected}
                  initialSelectedActivities={formData.recommendedActivities}
                />
              )}
              {activeTab === "therapeutic" && (
                <TherapeuticActivitiesRecommendation
                  profileId={profileId}
                  onActivitiesSelected={handleActivitiesSelected}
                  initialSelectedActivities={formData.recommendedActivities}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
