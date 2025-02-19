import { useParams, useNavigate } from "react-router-dom";

const customerData = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890", vipLevel: "VIP 1" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "0987654321", vipLevel: "VIP 2" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "1112223333", vipLevel: "VIP 1" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "4445556666", vipLevel: "VIP 2" },
    { id: 5, name: "Charlie White", email: "charlie@example.com", phone: "7778889999", vipLevel: "VIP 1" },
];

const CustomerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const customer = customerData.find((c) => c.id === parseInt(id));

    if (!customer) {
        return <div className="text-center text-red-500">Customer not found!</div>;
    }

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Customer Details</h2>
            <div className="text-lg mb-4">
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>VIP Level:</strong> {customer.vipLevel}</p>
            </div>
            <button
                onClick={() => navigate(-1)} // Quay lại trang trước đó
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Back
            </button>
        </div>
    );
};

export default CustomerDetail;
