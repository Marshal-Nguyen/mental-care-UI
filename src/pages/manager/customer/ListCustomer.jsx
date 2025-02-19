import React, { useState } from "react";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const customerData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", vipLevel: "VIP 1" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", vipLevel: "VIP 2" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "1112223333", vipLevel: "VIP 1" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "4445556666", vipLevel: "VIP 2" },
    { id: 5, name: "Charlie White", email: "charlie@example.com", phone: "7778889999", vipLevel: "VIP 1" },
];

const ListCustomerManager = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (customer) => {
        setCurrentCustomer(customer);
        setModalIsOpen(true);
    };

    const handleDelete = (id) => {
        console.log("Delete customer with ID:", id);
    };

    const handleViewDetails = (id) => {
        navigate(`/manager/viewCustomer/${id}`);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setCurrentCustomer(null);
    };

    const handleSave = () => {
        console.log("Save updated customer:", currentCustomer);
        handleCloseModal();
    };

    const groupByVipLevel = (data) => {
        return data.reduce((acc, customer) => {
            if (!acc[customer.vipLevel]) {
                acc[customer.vipLevel] = [];
            }
            acc[customer.vipLevel].push(customer);
            return acc;
        }, {});
    };

    const groupedCustomers = groupByVipLevel(customerData);

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Customer List by VIP Levels</h2>

            {Object.keys(groupedCustomers).map((vipLevel) => (
                <div key={vipLevel} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-purple-600">{vipLevel}</h3>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Phone</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupedCustomers[vipLevel].map((customer, index) => (
                                <tr key={customer.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{customer.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleViewDetails(customer.id)}
                                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                title="View Details"
                                            >
                                                <AiFillEye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(customer)}
                                                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                title="Edit"
                                            >
                                                <AiFillEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(customer.id)}
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                title="Delete"
                                            >
                                                <AiFillDelete size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Edit Customer"
                className="w-96 mx-auto mt-40 bg-white p-6 rounded-xl shadow-lg"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
            >
                <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>
                {currentCustomer && (
                    <div>
                        <div className="mb-4">
                            <label>Name</label>
                            <input
                                type="text"
                                value={currentCustomer.name}
                                onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label>Email</label>
                            <input
                                type="email"
                                value={currentCustomer.email}
                                onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label>Phone</label>
                            <input
                                type="text"
                                value={currentCustomer.phone}
                                onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleCloseModal} className="bg-gray-500 text-white p-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
                                Save
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ListCustomerManager;
