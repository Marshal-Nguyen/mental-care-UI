import React, { useState } from "react";

const CustomerList = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321" },
    ]);

    const [editingCustomer, setEditingCustomer] = useState(null); // Lưu khách hàng đang được sửa
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

    // Xử lý xóa
    const handleDelete = (id) => {
        const updatedCustomers = customers.filter((customer) => customer.id !== id);
        setCustomers(updatedCustomers);
    };

    // Xử lý sửa
    const handleEdit = (customer) => {
        setEditingCustomer(customer.id);
        setFormData(customer);
    };

    // Lưu thông tin đã sửa
    const handleSave = () => {
        const updatedCustomers = customers.map((customer) =>
            customer.id === editingCustomer ? { ...customer, ...formData } : customer
        );
        setCustomers(updatedCustomers);
        setEditingCustomer(null);
        setFormData({ name: "", email: "", phone: "" });
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer List</h2>
            <ul className="space-y-4">
                {customers.map((customer) => (
                    <li
                        key={customer.id}
                        className="flex justify-between items-center p-4 border rounded-lg"
                    >
                        {editingCustomer === customer.id ? (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 mb-2 border rounded-lg"
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 mb-2 border rounded-lg"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Phone"
                                />
                            </div>
                        ) : (
                            <div className="flex-1">
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-gray-600">{customer.email}</p>
                                <p className="text-sm text-gray-600">{customer.phone}</p>
                            </div>
                        )}
                        <div className="flex space-x-2">
                            {editingCustomer === customer.id ? (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(customer)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(customer.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
