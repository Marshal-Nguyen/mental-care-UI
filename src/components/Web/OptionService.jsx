import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import styles from "../../styles/Web/IntroFPT.module.css";

export default function Pricing() {
  const [promoCodes, setPromoCodes] = useState({
    1: "", // Basic/Student plan
    2: "", // Plus/Basic plan
    3: "", // Pro/Premium plan
  });
  const [loadingStates, setLoadingStates] = useState({
    1: false,
    2: false,
    3: false,
  });
  const profileId = useSelector((state) => state.auth.profileId);

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Student Plan",
      price: "40000",
      description: "Discounted mental health support for students",
      durationDays: "30",
      features: [
        "Access to the DAS21 psychological test for evaluating anxiety, stress, and tension levels",
        "Insights into mental well-being through blog articles",
        "Shopping for mental health-related products",
        "Viewing a list of trusted psychological consultants",
        "Booking appointments with licensed therapists",
      ],
      buttonText: "Kế hoạch hiện tại của bạn",
      buttonDisabled: true,
      color: "from-purple-100 to-purple-200",
      borderColor: "border-purple-300",
    },
    {
      id: 2,
      name: "Basic Plan",
      price: "100000",
      description: "Access to basic mental health resources",
      durationDays: "30",
      features: [
        "Access to the DAS21 psychological test for evaluating anxiety, stress, and tension levels",
        "Insights into mental well-being through blog articles",
        "Viewing full detailed test results",
        "Personalized 2-week mental health improvement plan based on preferences, food, and activities",
        "Shopping for mental health-related products",
        "Viewing a list of trusted psychological consultants",
        "Booking appointments with licensed therapists",
      ],
      buttonText: "Upgrade to Plus",
      buttonDisabled: false,
      color: "from-violet-100 to-purple-300",
      borderColor: "border-purple-500",
      isPopular: true,
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "500000",
      description: "Advanced support with personal therapist sessions",
      durationDays: "30",
      features: [
        "Personalized 1-month mental health improvement plan based on preferences, food, and activities",
        "Regular reminders to follow the personalized improvement plan",
        "AI chatbox for daily emotional support and conversations",
        "Discounts on therapist bookings",
        "Unlimited access to the psychological test",
        "Sharing personal stories on the blog",
      ],
      buttonText: "Upgrade to Pro",
      buttonDisabled: false,
      color: "from-purple-200 to-purple-500",
      borderColor: "border-purple-600",
    },
  ]);

  // When fetching the packages from the API, keep track of the actual IDs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://psychologysupportsubscription-azb9d4hfameeengd.southeastasia-01.azurewebsites.net/service-packages?PageIndex=1&PageSize=10"
        );

        const activePackages =
          response.data?.servicePackages?.data?.filter((pkg) => pkg.isActive) ||
          [];
        const sortedPackages = activePackages.sort((a, b) => a.price - b.price);

        setPackages((prevPackages) =>
          prevPackages.map((pkg, index) => {
            const updatedPkg = sortedPackages[index];
            return updatedPkg
              ? {
                  ...pkg,
                  name: updatedPkg.name,
                  price: updatedPkg.price,
                  description: updatedPkg.description,
                  durationDays: updatedPkg.durationDays,
                  serviceId: updatedPkg.id, // Store the actual API ID here
                }
              : pkg;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Then update your handleBuyService function
  const handleBuyService = async (packageIndexId) => {
    // Don't proceed if button is disabled
    if (packages.find((pkg) => pkg.id === packageIndexId)?.buttonDisabled) {
      return;
    }

    const selectedPackage = packages.find((pkg) => pkg.id === packageIndexId);
    if (!selectedPackage || !selectedPackage.serviceId) {
      console.error("Package not found or missing service ID");
      return;
    }

    // Update loading state for this specific package
    setLoadingStates((prev) => ({
      ...prev,
      [packageIndexId]: true,
    }));

    try {
      const currentDate = new Date().toISOString();

      const payloadData = {
        userSubscription: {
          patientId: profileId,
          servicePackageId: selectedPackage.serviceId, // Use the actual API ID here
          promoCode: promoCodes[packageIndexId] || null,
          giftId: null,
          startDate: currentDate,
          endDate: currentDate,
          paymentMethodName: "VNPay",
        },
      };

      console.log("payloadData", payloadData);
      const response = await axios.post(
        "https://psychologysupportsubscription-azb9d4hfameeengd.southeastasia-01.azurewebsites.net/user-subscriptions",
        payloadData
      );

      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      console.error("Error purchasing subscription:", error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [packageIndexId]: false,
      }));
    }
  };

  const handlePromoCodeChange = (packageId, value) => {
    setPromoCodes((prev) => ({
      ...prev,
      [packageId]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 bg-gradient-to-b from-white to-purple-50">
      <span className="text-xl font-thin text-purple-700">
        Subscription Plans
      </span>
      <h1
        className={`${styles.sourceSerif} font-bold text-5xl text-[#3d1085] max-w-[750px] text-center mt-5 mb-4`}>
        Find Your Perfect Plan
      </h1>

      <p
        className={`${styles.sourceSerif} text-center font-normal text-gray-600 max-w-2xl mb-12`}>
        Every journey to better mental health is unique. Choose the support
        level that matches your needs. Pause, adjust, or cancel anytime — your
        wellbeing journey, your way.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {packages.map((plan, index) => (
          <div
            key={plan.id}
            className={`bg-gradient-to-b ${
              plan.color
            } rounded-3xl shadow-xl p-8 text-center border-2 ${
              plan.isPopular
                ? `${plan.borderColor} scale-105 transform -translate-y-2`
                : plan.borderColor
            } transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden`}>
            {plan.isPopular && (
              <div className="absolute top-0 right-0">
                <div className="bg-purple-600 text-white text-xs font-bold px-6 py-1 transform rotate-45 translate-x-5 translate-y-3">
                  POPULAR
                </div>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-purple-800 mb-2">
                {plan.name}
              </h2>
              <p className="text-purple-600 mb-6 h-12">{plan.description}</p>
              <p className="text-5xl font-bold text-purple-900 mb-2">
                {parseInt(plan.price).toLocaleString()}
                <span className="text-lg font-medium text-gray-600">VNĐ</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">per month</p>
            </div>

            <div className="mb-6 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 px-2">
              <ul className={`${styles.sourceSerif} space-y-3 text-left`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-gray-800">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 mb-4">
              <input
                type="text"
                placeholder="Nhập mã khuyến mãi"
                className="w-full p-3 mb-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={promoCodes[plan.id]}
                onChange={(e) => handlePromoCodeChange(plan.id, e.target.value)}
              />
              <button
                className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  plan.buttonDisabled || loadingStates[plan.id]
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : plan.id === 2
                    ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
                    : plan.id === 3
                    ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                disabled={plan.buttonDisabled || loadingStates[plan.id]}
                onClick={() => handleBuyService(plan.id)}>
                {loadingStates[plan.id] ? "Đang xử lý..." : plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center max-w-2xl">
        <h3
          className={`${styles.sourceSerif} text-2xl font-semibold text-purple-800 mb-4`}>
          Your Story Matters. Find Comfort in Every Conversation.
        </h3>
        <p className="text-gray-600 mb-6">
          Join thousands of people who've found peace and support through our
          community.
        </p>
      </div>
    </div>
  );
}
