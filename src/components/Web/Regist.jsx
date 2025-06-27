import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "../../../dist/2.png";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!formData.fullName) return "Please enter your full name";
    if (!formData.gender) return "Please select your gender";
    if (!emailRegex.test(formData.email)) return "Invalid email format";
    if (!phoneRegex.test(formData.phoneNumber))
      return "Phone number must be 10 digits";
    if (!passwordRegex.test(formData.password))
      return "Password must be at least 8 characters, including uppercase, lowercase, and numbers";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://api.emoease.vn/auth-service/Auth/register",
        formData
      );
      setError("");
      setFormData({
        fullName: "",
        gender: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/EMO");
      }, 1800);
    } catch (err) {
      // Ưu tiên lấy thông báo từ detail nếu có
      const backendDetail = err.response?.data?.detail;
      setError(
        backendDetail || err.response?.data?.message || "Registration failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate("/EMO");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div
        className="bg-white/90 shadow-xl rounded-2xl px-6 py-6 w-full max-w-md flex flex-col items-center"
        style={{
          maxHeight: "95vh",
          minHeight: "auto",
        }}>
        <div className="mb-4 flex flex-col items-center">
          <img
            src="/emo.webp"
            alt="Logo"
            className="w-12 h-12 rounded-xl shadow mb-1"
          />
          <h2 className="text-2xl font-bold text-purple-700 mb-0.5">
            Create Account
          </h2>
          <p className="text-gray-500 text-xs">
            Join EmoEase and start your wellness journey!
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded mb-2 w-full text-xs">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-2 overflow-y-auto"
          style={{ maxHeight: "60vh" }}>
          <div>
            <label className="block text-gray-700 mb-0.5 text-sm">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm"
              placeholder="Enter your full name"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-0.5 text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Else">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-0.5 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm"
              placeholder="Enter your email"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-0.5 text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm"
              placeholder="Enter your phone number"
              autoComplete="off"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-0.5 text-sm">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm pr-10"
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-7 text-gray-400 hover:text-purple-600"
              tabIndex={-1}>
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-0.5 text-sm">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-purple-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-sm pr-10"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-7 text-gray-400 hover:text-purple-600"
              tabIndex={-1}>
              {showConfirmPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded text-white font-semibold text-base shadow transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95"
            }`}>
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-3 w-full flex flex-col items-center">
          <span className="text-gray-500 text-xs mb-1">
            Already have an account?
          </span>
          <button
            onClick={handleLoginRedirect}
            className="text-purple-600 font-semibold hover:underline hover:text-pink-500 text-sm transition">
            Go to Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
