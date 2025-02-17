import React, { useState } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            phone: '0987654321',
            email: 'nguyenvana@gmail.com',
            createdAt: '2025-02-16',
            message: 'Chào bạn, tôi cần tư vấn về sản phẩm.'
        },
        {
            id: 2,
            name: 'Trần Thị B',
            phone: '0976543210',
            email: 'tranthib@gmail.com',
            createdAt: '2025-02-17',
            message: 'Cảm ơn vì đã giúp đỡ tôi lần trước.'
        },
        {
            id: 3,
            name: 'Lê Minh C',
            phone: '0965432109',
            email: 'leminhc@gmail.com',
            createdAt: '2025-02-18',
            message: 'Tôi muốn hỏi về chương trình khuyến mãi mới.'
        },
    ]);

    const [messages, setMessages] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleAccept = (id) => {
        const acceptedCustomer = customers.find((customer) => customer.id === id);
        setMessages([...messages, { ...acceptedCustomer, status: 'new' }]);
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Danh sách khách hàng đang nhắn đến</h1>

            {/* Danh sách khách hàng */}
            <table className="min-w-full table-auto border-collapse mb-6">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Họ tên</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Số điện thoại</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Email</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 border-b">{customer.name}</td>
                            <td className="px-6 py-4 border-b">{customer.phone}</td>
                            <td className="px-6 py-4 border-b">{customer.email}</td>
                            <td className="px-6 py-4 border-b">{customer.createdAt}</td>
                            <td className="px-6 py-4 border-b">
                                <button
                                    onClick={() => handleSelectCustomer(customer)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
                                >
                                    Chi tiết
                                </button>
                                <button
                                    onClick={() => handleAccept(customer.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Chấp nhận
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Danh sách tin nhắn của tôi */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Danh sách tin nhắn của tôi</h2>
            <table className="min-w-full table-auto border-collapse mb-6">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Họ tên</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Ngày tạo</th>
                        <th className="px-6 py-3 text-left text-lg font-semibold bg-gray-100 border-b">Tin nhắn</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-6 py-4 border-b">{message.name}</td>
                            <td className="px-6 py-4 border-b">{message.createdAt}</td>
                            <td className="px-6 py-4 border-b">{message.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Chi tiết khách hàng */}
            {selectedCustomer && (
                <div className="mt-12 p-6 bg-white shadow-lg rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Chi tiết khách hàng</h3>
                    <p><strong>Họ tên:</strong> {selectedCustomer.name}</p>
                    <p><strong>Số điện thoại:</strong> {selectedCustomer.phone}</p>
                    <p><strong>Email:</strong> {selectedCustomer.email}</p>
                    <p><strong>Ngày tạo:</strong> {selectedCustomer.createdAt}</p>
                    <p className="mt-4"><strong>Tin nhắn:</strong> {selectedCustomer.message}</p>
                    <button
                        onClick={() => setSelectedCustomer(null)}
                        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Đóng
                    </button>
                </div>
            )}
        </div>
    );
};

export default CustomerList;
