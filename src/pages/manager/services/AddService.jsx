import { useState } from "react";

const AddPromotion = () => {
    const [promotion, setPromotion] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        applicablePackages: [],
    });

    const packageOptions = ["Free", "AI", "Bác sĩ tâm lý"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPromotion({ ...promotion, [name]: value });
    };

    const handleCheckboxChange = (packageName) => {
        setPromotion((prevState) => {
            const isSelected = prevState.applicablePackages.includes(packageName);
            const updatedPackages = isSelected
                ? prevState.applicablePackages.filter((pkg) => pkg !== packageName)
                : [...prevState.applicablePackages, packageName];
            return { ...prevState, applicablePackages: updatedPackages };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Promotion added:", promotion);
        // Logic gửi dữ liệu lên server (API call)
    };

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Thêm chương trình khuyến mãi
            </h2>

            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Tên chương trình
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={promotion.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Nhập tên chương trình"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="description"
                    >
                        Mô tả chương trình
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={promotion.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Nhập mô tả chương trình"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="startDate"
                    >
                        Ngày bắt đầu
                    </label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={promotion.startDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="endDate"
                    >
                        Ngày kết thúc
                    </label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={promotion.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Gói áp dụng
                    </label>
                    <div className="flex flex-wrap gap-4">
                        {packageOptions.map((pkg) => (
                            <div key={pkg} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={pkg}
                                    name="applicablePackages"
                                    checked={promotion.applicablePackages.includes(pkg)}
                                    onChange={() => handleCheckboxChange(pkg)}
                                    className="mr-2"
                                />
                                <label htmlFor={pkg} className="text-gray-700">
                                    {pkg}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <div
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                        onClick={handleSubmit}
                    >
                        Lưu chương trình
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddPromotion;
