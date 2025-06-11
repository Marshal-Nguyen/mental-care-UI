import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../../../dist/2.png';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
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

        if (!formData.fullName) return 'Please enter your full name';
        if (!formData.gender) return 'Please select your gender';
        if (!emailRegex.test(formData.email)) return 'Invalid email format';
        if (!phoneRegex.test(formData.phoneNumber)) return 'Phone number must be 10 digits';
        if (!passwordRegex.test(formData.password))
            return 'Password must be at least 8 characters, including uppercase, lowercase, and numbers';
        if (formData.password !== formData.confirmPassword)
            return 'Passwords do not match';
        return '';
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
                'https://anhtn.id.vn/auth-service/Auth/register',
                formData
            );
            console.log('Registration successful:', response.data);
            setError('');
            setFormData({
                fullName: '',
                gender: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: ''
            });
            setIsRegistered(true);
            toast.success('Registration successful!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/emo');
    };

    return (
        <div
            className="h-screen flex items-center justify-center"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500">
                <h2 className="text-2xl font-bold text-center text-purple-600 animate-fade-in">
                    Sign Up
                </h2>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4 animate-slide-in">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2 font-medium">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500 appearance-none"
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Else">Other</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="mb-2 relative">
                        <label className="block text-gray-700 mb-2 font-medium">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500 pr-12"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:border-purple-500 pr-12"
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform ${isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-500 hover:bg-purple-600 hover:scale-105 active:scale-95'
                            }`}
                    >
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>


                    <button
                        onClick={handleLoginRedirect}
                        className="w-full text-pink-500 font-semibold hover:text-indigo-600 underline"
                    >
                        Go to Login
                    </button>


                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterForm;