import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Regit = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        gender: 1,
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [formDataProfile, setFormDataProfile] = useState({
        fullName: '',
        gender: 1,
        allergies: '',
        personalityTraits: 'introvertion',
        contactInfo: {
            email: '',
            phoneNumber: '',
            address: 'S901 Vinhome GrandPark'
        }
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, including a number, a lowercase and an uppercase letter.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        if (!/^(\+84|0)\d{9,10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await fetch('https://psychologysupportauth-gqdkbafkbpf5a4gf.eastasia-01.azurewebsites.net/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {

                alert('Registration successful');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            alert('Error during registration');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/2.png')]">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
                <img src="/logo2.png" alt="Logo" className="w-20 h-20 mx-auto mb-2 rounded-full border border-gray-300" />

                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-pink-400 text-transparent bg-clip-text">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1">Male</option>
                            <option value="0">Female</option>
                            <option value="2">Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="Address"
                            value={formDataProfile.contactInfo.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Personality Traits</label>
                        <input
                            type="text"
                            name="personalityTraits"
                            value={formDataProfile.personalityTraits}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Allergies</label>
                        <input
                            type="text"
                            name="allergies"
                            value={formDataProfile.allergies}
                            onChange={handleChange}
                            // required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-400 to-pink-400 text-white py-2 rounded-lg 
               hover:from-blue-500 hover:to-pink-500 hover:shadow-lg transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                <button
                    onClick={() => navigate('/Emo')}
                    className="w-full mt-4 py-2 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Regit;
