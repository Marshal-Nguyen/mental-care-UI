import React from "react";
import { useNavigate } from "react-router-dom";

const Tab = ({ history, setHistory, activeTab, setActiveTab }) => {
    const navigate = useNavigate();

    const handleTabClick = (menuText) => {
        setActiveTab(menuText); // Đặt tab hiện tại
        const matchingItem = menuItemsData.find(
            (item) =>
                item.text === menuText ||
                item.subMenu.some((subItem) => subItem.text === menuText)
        );
        if (matchingItem) {
            const subItem = matchingItem.subMenu.find((sub) => sub.text === menuText);
            navigate(`/manager/${subItem?.path || matchingItem.path}`);
        }
    };

    const handleTabClose = (menuText) => {
        setHistory((prevHistory) => {
            const newHistory = prevHistory.filter((tab) => tab !== menuText);

            // Nếu tab đang đứng bị xóa, chuyển sang tab trước đó
            if (menuText === activeTab) {
                const currentIndex = prevHistory.indexOf(menuText);
                const newActiveTab =
                    newHistory[currentIndex - 1] || newHistory[currentIndex] || "";
                setActiveTab(newActiveTab);

                // Điều hướng đến tab mới hoặc quay lại dashboard nếu không còn tab
                const matchingItem = menuItemsData.find(
                    (item) =>
                        item.text === newActiveTab ||
                        item.subMenu.some((subItem) => subItem.text === newActiveTab)
                );
                if (matchingItem) {
                    const subItem = matchingItem.subMenu.find(
                        (sub) => sub.text === newActiveTab
                    );
                    navigate(`/manager/${subItem?.path || matchingItem.path}`);
                } else {
                    navigate("/manager/dashboard");
                }
            }

            return newHistory;
        });
    };

    return (
        <div className="flex space-x-2">
            {history.map((menuText, index) => (
                <div
                    key={index}
                    className={`flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg shadow hover:bg-blue-200 ${menuText === activeTab ? "bg-blue-200 font-bold" : ""
                        }`}
                >
                    <span
                        className="cursor-pointer"
                        onClick={() => handleTabClick(menuText)}
                    >
                        {menuText}
                    </span>
                    {menuText !== "Dashboard" && ( // Không hiển thị nút x nếu là Dashboard
                        <button
                            className="ml-2 text-red-500 hover:text-red-700"
                            onClick={() => handleTabClose(menuText)}
                        >
                            x
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Tab;

// Dữ liệu menu
const menuItemsData = [
    { id: 0, text: "Dashboard", path: "dashboard", subMenu: [] },
    {
        id: 1,
        text: "Staff",
        path: "staff",
        subMenu: [
            { path: "addStaff", text: "Add staff" },
            { path: "viewStaff", text: "List staff" },
        ],
    },
    {
        id: 2,
        text: "Customer",
        path: "customer",
        subMenu: [
            { path: "addCustomer", text: "Add customer" },
            { path: "viewCustomer", text: "List customer" },
        ],
    },
    {
        id: 3,
        text: "Doctor",
        path: "doctor",
        subMenu: [
            { path: "addDoctor", text: "Add doctor" },
            { path: "viewDoctor", text: "List doctor" },
        ],
    },
    {
        id: 4,
        text: "Promotion",
        path: "promotion",
        subMenu: [
            { path: "addPromo", text: "Add promotion" },
            { path: "managePromo", text: "List promotions" },
        ],
    },
    {
        id: 5,
        text: "Feedback",
        path: "feedback",
        subMenu: [
            { path: "view-feedback", text: "View feedback" },
            { path: "respond-feedback", text: "Respond feedback" },
        ],
    },
];
