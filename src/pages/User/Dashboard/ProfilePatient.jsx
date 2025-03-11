import React, { useState } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: "Mehrab Bozorgi",
    email: "Mehrabbozorgi.business@gmail.com",
    address: "33062 Zboncak isle",
    contactNumber: "58077.79",
    gender: "Male",
    password: "sbdfbnd65sfdvb s",
  });

  const [sections, setSections] = useState({
    personalActivities: {
      expanded: false,
      enabled: true,
    },
    entertainmentActivity: {
      expanded: false,
      enabled: true,
    },
    underlyingDisease: {
      expanded: false,
      enabled: true,
    },
  });

  // Hoạt động cá nhân
  const [personalActivities, setPersonalActivities] = useState([
    { id: 1, name: "Gardening", frequency: null, color: "bg-white" },
    { id: 2, name: "Reading", frequency: null, color: "bg-purple-400" },
    { id: 3, name: "Cooking", frequency: null, color: "bg-white" },
    { id: 4, name: "Meditation", frequency: null, color: "bg-teal-500" },
    { id: 5, name: "Writing", frequency: null, color: "bg-white" },
    { id: 6, name: "Studying", frequency: null, color: "bg-amber-400" },
    { id: 7, name: "Volunteering", frequency: null, color: "bg-white" },
  ]);

  // Hoạt động giải trí
  const [entertainmentActivities, setEntertainmentActivities] = useState([
    { id: 1, name: "Soccer", frequency: null, color: "bg-purple-400" },
    { id: 2, name: "Tennis", frequency: null, color: "bg-purple-400" },
    { id: 3, name: "Swimming", frequency: null, color: "bg-white" },
    { id: 4, name: "Walk", frequency: null, color: "bg-white" },
    { id: 5, name: "Rowing", frequency: null, color: "bg-teal-500" },
    { id: 6, name: "Basketball", frequency: null, color: "bg-amber-400" },
    { id: 7, name: "Yoga", frequency: null, color: "bg-white" },
    { id: 8, name: "Golf", frequency: null, color: "bg-purple-400" },
    { id: 9, name: "Boxing", frequency: null, color: "bg-white" },
  ]);

  // Bệnh lý nền
  const [underlyingDiseases, setUnderlyingDiseases] = useState([
    { id: 1, name: "Hypertension", severity: null, color: "bg-white" },
    { id: 2, name: "Diabetes", severity: null, color: "bg-purple-400" },
    { id: 3, name: "Asthma", severity: null, color: "bg-teal-500" },
    { id: 4, name: "Arthritis", severity: null, color: "bg-white" },
    { id: 5, name: "Heart Disease", severity: null, color: "bg-amber-400" },
    { id: 6, name: "Allergies", severity: null, color: "bg-white" },
    { id: 7, name: "Migraine", severity: null, color: "bg-purple-400" },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showFrequencyPopup, setShowFrequencyPopup] = useState(false);
  const [showSeverityPopup, setShowSeverityPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        expanded: !prevState[section].expanded,
      },
    }));
  };

  const handleItemClick = (item, section) => {
    setSelectedItem(item);
    setSelectedSection(section);

    if (section === "underlyingDisease") {
      setShowSeverityPopup(true);
    } else {
      setShowFrequencyPopup(true);
    }
  };

  const handleFrequencySelect = (frequency) => {
    if (selectedSection === "personalActivities") {
      setPersonalActivities((prevActivities) =>
        prevActivities.map((act) =>
          act.id === selectedItem.id
            ? {
                ...act,
                frequency,
                color:
                  frequency === "daily"
                    ? "bg-purple-400"
                    : frequency === "weekly"
                    ? "bg-teal-500"
                    : frequency === "monthly"
                    ? "bg-amber-400"
                    : "bg-white",
              }
            : act
        )
      );
    } else if (selectedSection === "entertainmentActivity") {
      setEntertainmentActivities((prevActivities) =>
        prevActivities.map((act) =>
          act.id === selectedItem.id
            ? {
                ...act,
                frequency,
                color:
                  frequency === "daily"
                    ? "bg-purple-400"
                    : frequency === "weekly"
                    ? "bg-teal-500"
                    : frequency === "monthly"
                    ? "bg-amber-400"
                    : "bg-white",
              }
            : act
        )
      );
    }
    setShowFrequencyPopup(false);
  };

  const handleSeveritySelect = (severity) => {
    setUnderlyingDiseases((prevDiseases) =>
      prevDiseases.map((disease) =>
        disease.id === selectedItem.id
          ? {
              ...disease,
              severity,
              color:
                severity === "mild"
                  ? "bg-purple-400"
                  : severity === "moderate"
                  ? "bg-teal-500"
                  : severity === "severe"
                  ? "bg-amber-400"
                  : "bg-white",
            }
          : disease
      )
    );
    setShowSeverityPopup(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Gender</label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded appearance-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4 mt-4 bg-gray-50 p-4 rounded">
            {/* Personal activities */}
            <div className="bg-white rounded shadow-sm">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection("personalActivities")}>
                <div className="flex items-center">
                  <div className="mr-3 text-indigo-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Personal activities</span>
                </div>
                <div className="text-purple-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>

              {sections.personalActivities.expanded && (
                <div className="p-4 border-t border-gray-100 relative">
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {personalActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`${
                          activity.color
                        } rounded-full px-4 py-1 text-sm cursor-pointer ${
                          activity.color !== "bg-white"
                            ? "text-white"
                            : "text-black border border-gray-200"
                        }`}
                        onClick={() =>
                          handleItemClick(activity, "personalActivities")
                        }>
                        {activity.name}
                      </div>
                    ))}
                  </div>
                  <div className="absolute right-4 h-full top-0 flex items-center">
                    <div className="w-1 h-24 bg-purple-500 rounded"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Entertainment Activity */}
            <div className="bg-white rounded shadow-sm">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection("entertainmentActivity")}>
                <div className="flex items-center">
                  <div className="mr-3 text-indigo-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Entertainment Activity</span>
                </div>
                <div className="text-purple-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>

              {sections.entertainmentActivity.expanded && (
                <div className="p-4 border-t border-gray-100 relative">
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {entertainmentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className={`${
                          activity.color
                        } rounded-full px-4 py-1 text-sm cursor-pointer ${
                          activity.color !== "bg-white"
                            ? "text-white"
                            : "text-black border border-gray-200"
                        }`}
                        onClick={() =>
                          handleItemClick(activity, "entertainmentActivity")
                        }>
                        {activity.name}
                      </div>
                    ))}
                  </div>
                  <div className="absolute right-4 h-full top-0 flex items-center">
                    <div className="w-1 h-24 bg-purple-500 rounded"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Underlying disease */}
            <div className="bg-white rounded shadow-sm">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection("underlyingDisease")}>
                <div className="flex items-center">
                  <div className="mr-3 text-indigo-500">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="font-medium">Underlying disease</span>
                </div>
                <div className="text-purple-600">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>

              {sections.underlyingDisease.expanded && (
                <div className="p-4 border-t border-gray-100 relative">
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {underlyingDiseases.map((disease) => (
                      <div
                        key={disease.id}
                        className={`${
                          disease.color
                        } rounded-full px-4 py-1 text-sm cursor-pointer ${
                          disease.color !== "bg-white"
                            ? "text-white"
                            : "text-black border border-gray-200"
                        }`}
                        onClick={() =>
                          handleItemClick(disease, "underlyingDisease")
                        }>
                        {disease.name}
                      </div>
                    ))}
                  </div>
                  <div className="absolute right-4 h-full top-0 flex items-center">
                    <div className="w-1 h-24 bg-purple-500 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-6 space-x-4">
        <button className="px-6 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Save
        </button>
      </div>

      {/* Frequency selection popup */}
      {showFrequencyPopup && (
        <div className="fixed inset-0 bg-[#00000025] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h3 className="text-lg font-medium mb-4">
              Select frequency for {selectedItem.name}
            </h3>
            <div className="space-y-3">
              <button
                className="w-full py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
                onClick={() => handleFrequencySelect("daily")}>
                Daily
              </button>
              <button
                className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={() => handleFrequencySelect("weekly")}>
                Weekly
              </button>
              <button
                className="w-full py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
                onClick={() => handleFrequencySelect("monthly")}>
                Monthly
              </button>
              <button
                className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowFrequencyPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Severity selection popup */}
      {showSeverityPopup && (
        <div className="fixed inset-0 bg-[#00000025] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-72">
            <h3 className="text-lg font-medium mb-4">
              Select severity for {selectedItem.name}
            </h3>
            <div className="space-y-3">
              <button
                className="w-full py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
                onClick={() => handleSeveritySelect("mild")}>
                Mild
              </button>
              <button
                className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                onClick={() => handleSeveritySelect("moderate")}>
                Moderate
              </button>
              <button
                className="w-full py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
                onClick={() => handleSeveritySelect("severe")}>
                Severe
              </button>
              <button
                className="w-full py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowSeverityPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfileForm;
