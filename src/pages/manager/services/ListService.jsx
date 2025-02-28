import { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const UpgradePackages = () => {
    const [packages, setPackages] = useState([
        { id: 1, name: "Basic", price: "$5", description: "Gói cơ bản", active: true },
        { id: 2, name: "Pro", price: "$15", description: "Gói nâng cao", active: true },
        { id: 3, name: "Enterprise", price: "$30", description: "Gói doanh nghiệp", active: false },
    ]);
    const [newPackage, setNewPackage] = useState({ name: "", price: "", description: "" });

    const toggleStatus = (id) => {
        setPackages((prev) =>
            prev.map((pkg) => (pkg.id === id ? { ...pkg, active: !pkg.active } : pkg))
        );
    };

    const deletePackage = (id) => {
        setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    };

    const addPackage = () => {
        if (newPackage.name && newPackage.price && newPackage.description) {
            setPackages((prev) => [
                ...prev,
                { id: Date.now(), ...newPackage, active: true }
            ]);
            setNewPackage({ name: "", price: "", description: "" });
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý gói nâng cấp</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Tên gói"
                    className="p-2 border rounded"
                    value={newPackage.name}
                    onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Giá"
                    className="p-2 border rounded"
                    value={newPackage.price}
                    onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Mô tả"
                    className="p-2 border rounded"
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                />
                <button onClick={addPackage} className="p-2 bg-blue-500 text-white rounded">Thêm gói</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="p-4 border rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.description}</p>
                        <p className="font-bold mt-2">{pkg.price}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <button
                                className={`p-2 rounded ${pkg.active ? "bg-gray-300" : "bg-green-500 text-white"}`}
                                onClick={() => toggleStatus(pkg.id)}
                            >
                                {pkg.active ? "Ngừng hoạt động" : "Kích hoạt"}
                            </button>
                            <div className="flex gap-2">
                                <button className="p-2 bg-gray-200 rounded">
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button className="p-2 bg-red-500 text-white rounded" onClick={() => deletePackage(pkg.id)}>
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackages;