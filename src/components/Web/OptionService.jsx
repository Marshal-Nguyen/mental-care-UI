import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Web/IntroFPT.module.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../../store/authSlice";

export default function Pricing() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const profileId = useSelector((state) => state.auth.profileId);

  const [promoCodes, setPromoCodes] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedUpgradePackage, setSelectedUpgradePackage] = useState(null);

  const [packages, setPackages] = useState([]);
  const packageServices = [
    {
      packageName: "Student Plan",
      services: [
        "1 consultation session per month",
        "Basic mental health assessment",
        "Email support (1-2 business days response)",
        "Access to self-help resources",
        "Weekly mental wellness newsletter",
      ],
    },
    {
      packageName: "Basic Plan",
      services: [
        "2 consultation sessions per month",
        "Comprehensive mental health assessment",
        "Priority email support (24-hour response)",
        "Access to self-help resources and online workshops",
        "Monthly progress tracking",
        "Personalized coping strategy guide",
        "Crisis support chat",
      ],
    },
    {
      packageName: "Premium Plan",
      services: [
        "4 consultation sessions per month",
        "In-depth mental health comprehensive assessment",
        "Immediate email and chat support",
        "Unlimited access to online workshops and webinars",
        "Personalized mental wellness plan",
        "Bi-weekly progress review",
        "Priority scheduling",
        "24/7 crisis support",
        "Optional family/relationship counseling session",
        "Digital mental health journal and tracking tool",
      ],
    },
  ];
  const API_BASE = import.meta.env.VITE_API_SUBSCRIPTION_URL;
  const fetchData = async () => {
    try {
      const baseUrl = `${API_BASE}/service-packages`;
      const url = profileId
        ? `${baseUrl}?PageIndex=1&PageSize=10&patientId=${profileId}`
        : `${baseUrl}?PageIndex=1&PageSize=10`;

      const response = await axios.get(url);

      // Filter and sort active packages
      const activePackages = response.data?.servicePackages?.data
        ?.filter((pkg) => pkg.isActive)
        .sort((a, b) => a.price - b.price);

      // Create loading states and promo codes for active packages
      const initialLoadingStates = {};
      const initialPromoCodes = {};

      activePackages.forEach((pkg) => {
        initialLoadingStates[pkg.id] = false;
        initialPromoCodes[pkg.id] = "";
      });

      setLoadingStates(initialLoadingStates);
      setPromoCodes(initialPromoCodes);
      setPackages(activePackages);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải danh sách gói dịch vụ");
    }
  };

  useEffect(() => {
    if (token && profileId) {
      fetchData();
    }
  }, [token, profileId]);

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleBuyService = async (packageId) => {
    if (!token) {
      dispatch(openLoginModal());
      return;
    }

    const selectedPackage = packages.find((pkg) => pkg.id === packageId);

    // Check if the package is already purchased
    if (selectedPackage.isPurchased) {
      toast.info("Bạn đã sở hữu gói này.");
      return;
    }

    // Find the currently purchased package
    const purchasedPackage = packages.find((pkg) => pkg.isPurchased);

    if (purchasedPackage) {
      // If the new package is more expensive, show upgrade modal
      if (selectedPackage.price > purchasedPackage.price) {
        setSelectedUpgradePackage(selectedPackage);
        setUpgradeModalOpen(true);
        return;
      }

      // If the new package is cheaper or equal, prevent purchase
      if (selectedPackage.price <= purchasedPackage.price) {
        toast.error("You cannot switch to a plan with a lower or equal price.");
        return;
      }
    }

    // Proceed with package purchase if no issues
    await proceedWithPurchase(selectedPackage);
  };

  const proceedWithPurchase = async (selectedPackage) => {
    if (!selectedPackage) {
      console.error("Package not found");
      return;
    }

    setLoadingStates((prev) => ({
      ...prev,
      [selectedPackage.id]: true,
    }));

    try {
      const currentDate = new Date();
      const startDate = currentDate.toISOString();
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + selectedPackage.durationDays);
      const endDateISO = endDate.toISOString();

      const payloadData = {
        userSubscription: {
          patientId: profileId,
          servicePackageId: selectedPackage.id,
          promoCode: promoCodes[selectedPackage.id] || null,
          giftId: null,
          startDate: startDate,
          endDate: endDateISO,
          paymentMethodName: "VNPay",
        },
        returnUrl: "/payments/callback",
      };

      const response = await axios.post(
        `${API_BASE}/user-subscriptions`,
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xử lý yêu cầu.");
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [selectedPackage.id]: false,
      }));
    }
  };

  const handleUpgradeConfirm = async () => {
    if (selectedUpgradePackage) {
      try {
        const currentDate = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD

        const upgradePayload = {
          upgradeUserSubscriptionDto: {
            patientId: profileId,
            newServicePackageId: selectedUpgradePackage.id,
            promoCode: promoCodes[selectedUpgradePackage.id] || null,
            giftId: null,
            startDate: currentDate,
            paymentMethodName: "VNPay",
          },
          returnUrl: "/payments/callback",
        };

        const response = await axios.post(
          "https://anhtn.id.vn/subscription-service/user-subscriptions/upgrade",
          upgradePayload,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data && response.data.paymentUrl) {
          window.location.href = response.data.paymentUrl;
        }
      } catch (error) {
        console.error("Error upgrading subscription:", error);
        toast.error("Failed to upgrade subscription. Please try again.");
      } finally {
        setUpgradeModalOpen(false);
      }
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
        {packages.map((plan) => {
          // Tìm services tương ứng với package
          const currentPackageServices =
            packageServices.find((pkg) => pkg.packageName === plan.name)
              ?.services || [];

          return (
            <div
              key={plan.id}
              className={`bg-gradient-to-b ${
                plan.purchaseStatus === "Purchased"
                  ? "from-green-100 to-green-200 border-green-300"
                  : plan.purchaseStatus === "PendingPayment"
                  ? "from-yellow-100 to-orange-200 border-yellow-400"
                  : "from-violet-100 to-purple-300 border-purple-500"
              } rounded-3xl shadow-xl p-8 text-center border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden`}>
              {plan.purchaseStatus === "Purchased" && (
                <div className="absolute top-0 right-0">
                  <div className="bg-green-600 text-white text-xs font-bold px-6 py-1 transform rotate-45 translate-x-5 translate-y-3">
                    CURRENT PLAN
                  </div>
                </div>
              )}
              {plan.purchaseStatus === "PendingPayment" && (
                <div className="absolute top-0 right-0">
                  <div className="bg-yellow-600 text-white text-xs font-bold px-6 py-1 transform rotate-45 translate-x-5 translate-y-3">
                    PENDING PAYMENT
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                  {plan.name}
                </h2>
                <p className="text-purple-600 mb-6 h-12">{plan.description}</p>
                <p className="text-5xl font-bold text-purple-900 mb-2">
                  {plan.price.toLocaleString()}
                  <span className="text-lg font-medium text-gray-600">VNĐ</span>
                </p>
                <p className="text-sm text-gray-500">
                  per {plan.durationDays} days
                </p>
              </div>
              {/* Thêm phần hiển thị services */}
              <div className="mb-4 text-left">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  What's Included:
                </h3>
                <ul className="space-y-2 mb-4">
                  {currentPackageServices.slice(0, 4).map((service, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {service}
                    </li>
                  ))}
                  {currentPackageServices.length > 4 && (
                    <li className="text-xs text-gray-500 italic">
                      + {currentPackageServices.length - 4} more services
                    </li>
                  )}
                </ul>

                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full p-3 mb-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={promoCodes[plan.id] || ""}
                  onChange={(e) =>
                    handlePromoCodeChange(plan.id, e.target.value)
                  }
                />
                <button
                  className={`w-full py-3 px-6 rounded-xl text-lg font-semibold transition-all duration-300 ${
                    plan.purchaseStatus === "Purchased"
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : plan.purchaseStatus === "PendingPayment"
                      ? "bg-yellow-500 text-white cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
                  }`}
                  disabled={
                    plan.purchaseStatus === "Purchased" ||
                    plan.purchaseStatus === "PendingPayment" ||
                    loadingStates[plan.id]
                  }
                  onClick={() => handleBuyService(plan.id)}>
                  {plan.purchaseStatus === "Purchased"
                    ? "Current Plan"
                    : plan.purchaseStatus === "PendingPayment"
                    ? "Pending Payment"
                    : loadingStates[plan.id]
                    ? "Processing..."
                    : "Subscribe Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade Confirmation Modal */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 bg-[#332f2f2f] flex items-center justify-center z-50 backdrop-blur-[5px]">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <h2 className="text-3xl font-semibold mb-5 text-purple-800 tracking-tight">
              Upgrade Your Plan
            </h2>
            <p className="text-gray-700 mb-7 leading-relaxed">
              Would you like to upgrade from your current plan to the{" "}
              <span className="font-medium text-indigo-600">
                {selectedUpgradePackage?.name}
              </span>{" "}
              plan for{" "}
              <span className="font-medium text-indigo-600">
                {selectedUpgradePackage?.price.toLocaleString()} VND
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setUpgradeModalOpen(false)}
                className="px-5 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium">
                Cancel
              </button>
              <button
                onClick={handleUpgradeConfirm}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium shadow-md">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
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
