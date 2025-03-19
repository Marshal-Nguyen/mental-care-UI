import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const ProfileDoctor = () => {
  const id = useSelector((state) => state.auth.profileId);
  // console.log("Test Doctor:", id);
  // const { id } = useParams();
  // const id = "6d95bbbf-32ba-44ff-82b3-a5deea337848";
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

  // Fetch doctor data
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors/${id}`
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
          "https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/specialties"
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
  }, [id]);

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
        `https://psychologysupportprofile-fddah4eef4a7apac.eastasia-01.azurewebsites.net/doctors/${id}`,
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
    return <div className="text-center p-6">Loading doctor data...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl h-[94vh] mx-auto p-6">
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
