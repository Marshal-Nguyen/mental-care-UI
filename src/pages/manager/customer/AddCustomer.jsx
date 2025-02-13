import React, { useState } from "react";

const AddCustomerForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Customer Data: ", formData);
        // Xử lý dữ liệu (API call hoặc lưu vào state)
        alert("Customer added successfully!");
        setFormData({ name: "", email: "", phone: "" }); // Reset form
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Customer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter customer name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter customer email"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Customer
                </button>
            </form>
        </div>
    );
};

export default AddCustomerForm;
