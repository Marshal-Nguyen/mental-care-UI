import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileDoctor = () => {
  const id = useSelector((state) => state.auth.profileId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    contactInfo: {
      address: "",
      phoneNumber: "",
      email: "",
    },
    specialties: [],
    qualifications: "",
    yearsOfExperience: 0,
    bio: "",
  });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef(null);
  const userId = useSelector((state) => state.auth.userId);
  // Add fetchAvatar function
  const fetchAvatar = async () => {
    try {
      const avatarResponse = await axios.get(
        `https://psychologysupport-image.azurewebsites.net/image/get?ownerType=User&ownerId=${userId}`
        // { responseType: "blob" }
      );

      // Create object URL from the blob response

      console.log("Avatar URL:", avatarResponse.data);
      setAvatarUrl(avatarResponse.data.url);
    } catch (err) {
      console.log("No avatar found or error fetching avatar:", err);
      // Not setting an error as avatar might not exist yet
    }
  };

  // Add handleAvatarChange function
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
        ? "https://psychologysupport-image.azurewebsites.net/image/update"
        : "https://psychologysupport-image.azurewebsites.net/image/upload";

      const method = avatarUrl ? axios.put : axios.post;
      await method(endpoint, formDataImg, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  // Add triggerFileInput function
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  // Fetch doctor data
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://psychologysupport-profile.azurewebsites.net/doctors/${id}`
        );
        const { doctorProfileDto } = response.data;

        // Set form data with doctor information
        setFormData({
          fullName: doctorProfileDto.fullName,
          gender: doctorProfileDto.gender,
          contactInfo: {
            address: doctorProfileDto.contactInfo.address,
            phoneNumber: doctorProfileDto.contactInfo.phoneNumber,
            email: doctorProfileDto.contactInfo.email,
          },
          specialties: doctorProfileDto.specialties.map(
            (specialty) => specialty.id
          ),
          qualifications: doctorProfileDto.qualifications,
          yearsOfExperience: doctorProfileDto.yearsOfExperience,
          bio: doctorProfileDto.bio,
        });
        setLoading(false);
      } catch (err) {
        setError("Error fetching doctor data. Please try again.");
        setLoading(false);
        console.error("Error fetching doctor data:", err);
      }
    };

    // Fetch available specialties (assume there's an API endpoint for this)
    const fetchSpecialties = async () => {
      try {
        // Note: This is a placeholder. You would need to replace with your actual API endpoint
        const response = await axios.get(
          "https://psychologysupport-profile.azurewebsites.net/specialties"
        );
        setSpecialtiesList(response.data);
      } catch (err) {
        console.error("Error fetching specialties:", err);
        // Fallback specialties based on the example data
        setSpecialtiesList([
          {
            id: "8704cf2c-e7ec-4ece-a057-883653578ae6",
            name: "Behavioral Therapy",
          },
          { id: "ddf4b47a-65d1-451f-a297-41606caacfe2", name: "Neurology" },
          { id: "3", name: "Cognitive Psychology" },
          { id: "4", name: "Child Psychology" },
          { id: "5", name: "Clinical Psychology" },
        ]);
      }
    };

    fetchDoctorData();
    fetchSpecialties();
    fetchAvatar(); // Add this line
  }, [id, userId]);

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

  // Handle specialty selection
  const handleSpecialtyChange = (e) => {
    const specialtyId = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialtyId],
      });
    } else {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter((id) => id !== specialtyId),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Create the payload to match the expected API structure
      const updatedProfile = {
        doctorProfileUpdate: {
          fullName: formData.fullName,
          gender: formData.gender,
          contactInfo: formData.contactInfo,
          specialtyIds: formData.specialties.map((id) => ({ id })),
          qualifications: formData.qualifications,
          yearsOfExperience: parseInt(formData.yearsOfExperience),
          bio: formData.bio,
        },
      };

      console.log("updatedProfileDoctor", updatedProfile);
      await axios.put(
        `https://psychologysupport-profile.azurewebsites.net/doctors/${id}`,
        updatedProfile
      );

      setLoading(false);
      toast.success("Patient profile updated successfully!");
    } catch (err) {
      toast.error("Error updating doctor");
      setLoading(false);
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
    <div className="max-w-7xl h-[94vh] mx-auto p-6">
      <div className="h-full overflow-y-auto p-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
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
                Supported formats: JPEG, PNG, GIF (max. 5MB)
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
            <h2 className="text-xl font-semibold mb-4">
              Professional Information
            </h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications
                </label>
                <input
                  type="text"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., MD, PhD in Psychology, MSc in Cognitive Neuroscience"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="0"
                  max="70"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Provide a brief description of your experience, approach to therapy, and specialization areas"
                  required></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Specialties</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialtiesList.map((specialty) => (
                <div key={specialty.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`specialty-${specialty.id}`}
                    value={specialty.id}
                    checked={formData.specialties.includes(specialty.id)}
                    onChange={handleSpecialtyChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`specialty-${specialty.id}`}
                    className="ml-2 text-sm text-gray-700">
                    {specialty.name}
                  </label>
                </div>
              ))}
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
              onClick={() => navigate(`/doctors/${id}`)}
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

export default ProfileDoctor;
