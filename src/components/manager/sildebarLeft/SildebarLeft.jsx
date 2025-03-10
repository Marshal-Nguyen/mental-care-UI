import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { AiFillApple } from "react-icons/ai";
import { toast } from "react-toastify";
import { AiFillCaretDown } from "react-icons/ai";
import logo from "../../../assets/images/logo.png";
import "./SildebarLeft.css"; // CSS của bạn
import { NavLink } from "react-router-dom";
import IconManager from "../../../util/icon/icon";
import { useLocation } from "react-router-dom";

const { GrDocumentStore, FaUserDoctor,
    FaChartSimple,
    AiFillHeart,
    TbReportSearch,
    MdManageAccounts,
    CiGift,
    MdOutlineAssignmentReturned,
    TbDeviceIpadCancel,
    RiAccountPinCircleFill,
    BiLogOut,
    FaChevronDown,
    IoMdArrowDropdown,
    IoMdArrowDropup,
    TbFileInvoice,
    CgUserList,
    RiFeedbackFill,
    LiaFileInvoiceDollarSolid,
    GrUserManager,
    MdOutlineManageAccounts,
    GiStonePile,
    LiaGiftsSolid,
    VscGitPullRequestGoToChanges,
    GiGoldNuggets,
    GiReceiveMoney, GiEmeraldNecklace, GiCrystalEarrings, GiDiamondRing, GiNecklaceDisplay, AiOutlineGold,
    LiaMoneyBillWaveSolid, LiaCircleNotchSolid, IoDiamondOutline, PiDiamondsFourLight, MdWarehouse, MdOutlinePriceChange, GiWorld, FaMoneyBillTrendUp, TbBasketDiscount, GiStoneBlock, MdOutlinePayments, RiCopperDiamondLine } = IconManager
const menuItemsData = [
    { id: 0, text: "Dashboard", path: 'dashboard', icon: <FaChartSimple />, subMenu: [] },
    {
        id: 1, text: "Customer", path: 'customer', icon: <CgUserList />, subMenu: [
            { path: 'viewCustomer', text: 'List customer' },
            { path: 'addCustomer', text: 'Add Customer' },

        ]
    },
    {
        id: 2, text: "Staff", path: 'staff', icon: <GrUserManager />, subMenu: [
            { path: 'viewStaff', text: 'List staff' },
            { path: 'addStaff', text: 'Add staff' },

        ]
    },
    {
        id: 3, text: "Doctor", path: 'doctor', icon: <FaUserDoctor />, subMenu: [
            { path: 'viewDoctor', text: 'List doctor' },
            { path: 'addDoctor', text: 'Add doctor' },

        ]
    },
    {
        id: 4, text: "Service Packages", path: 'promotion', icon: <CiGift />, subMenu: [
            { path: 'managePackages', text: 'List Packages' },
            { path: 'addPackages', text: 'Add Packages' },
        ]
    },
    { id: 5, text: "Pending Replies", path: 'view-message', icon: <RiFeedbackFill />, subMenu: [] },
];


const SildebarLeft = ({ onMenuClick }) => {
    const [activeItem, setActiveItem] = useState(menuItemsData[0]?.id); // Phần tử đầu tiên
    const [showSubMenu, setShowSubMenu] = useState({ [menuItemsData[0]?.id]: true }); // Hiển thị submenu nếu có
    const actionRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname.split("/manager/")[1];

        // Tìm menu khớp với đường dẫn
        const activeMenuItem = menuItemsData.find(
            (item) =>
                item.path?.toLowerCase() === currentPath?.toLowerCase() ||
                item.subMenu.some((subItem) => subItem.path?.toLowerCase() === currentPath?.toLowerCase())
        );

        if (activeMenuItem) {
            setShowSubMenu({ [activeMenuItem.id]: true }); // Hiển thị submenu
            handleItemClick(activeMenuItem);

            // Đợi submenu mở trước khi tính offsetHeight
            setTimeout(() => {
                const currentItem = document.getElementById(`menu-item-${activeMenuItem.id}`);
                if (currentItem) {
                    document.documentElement.style.setProperty("--height-end", `${currentItem.offsetHeight}px`);
                    document.documentElement.style.setProperty("--top-end", `${currentItem.getBoundingClientRect().top}px`);
                }
            }, 300); // Thời gian phải tương ứng với CSS transition (duration)
        }
    }, [location.pathname]);
    useEffect(() => {
        const currentItem = document.getElementById(`menu-item-${menuItemsData[0]?.id}`);
        if (currentItem) {
            document.documentElement.style.setProperty("--height-end", `${currentItem.offsetHeight}px`);
            document.documentElement.style.setProperty("--top-end", `${currentItem.getBoundingClientRect().top}px`);
        }
        if (actionRef.current) {
            actionRef.current.classList.add("runanimation");
        }
    }, []);

    const handleItemClick = (item) => {
        setActiveItem(item.id);
        setActionRef(item.id);

    };
    const setActionRef = (id) => {
        setTimeout(() => {
            const currentItem = document.getElementById(`menu-item-${id}`);
            if (currentItem) {
                document.documentElement.style.setProperty(
                    "--height-end",
                    `${currentItem.offsetHeight}px`
                );
                document.documentElement.style.setProperty(
                    "--top-end",
                    `${currentItem.getBoundingClientRect().top}px`
                );
            }
            if (action) {
                action.classList.remove("runanimation");
                void action.offsetWidth; // Force reflow
                action.classList.add("runanimation");
            }
        }, 0);
    }
    const handleSubMenuToggle = (index) => {
        setShowSubMenu((prev) => {
            // Tạo một object mới với tất cả các giá trị là null
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {});
            // Đổi chiều giá trị của index được nhấn
            newState[index] = !prev[index];
            return newState;
        });
    };

    const handleLogOut = () => {
        toast.success('Logout successful. See you next time!');
        localStorage.clear();

    }

    return (
        <div className="bg-[#2D193B] w-56  z-20">
            {/* Phần logo và tiêu đề */}
            <div className="w-full mb-14 h-20 py-12 flex flex-col gap-2 font-serif text-pink-500 text-xl justify-center items-center">
                <img
                    className="object-contain w-24 transition-all duration-300"
                    src={logo}
                    alt="Logo"
                />
                <span className="font-bold">Emoease</span>
            </div>

            {/* Menu chính */}
            <div className="relative p-0 m-0 text-16">
                {menuItemsData.map((item) => {
                    // Trường hợp có submenu
                    if (item.subMenu?.length > 0) {
                        return (
                            <div
                                key={item.id}
                                id={`menu-item-${item.id}`}
                                className={`my-2 ${activeItem === item.id ? "text-white font-bold" : ""}`}
                            >
                                <div
                                    className={`flex items-center py-2 pl-5 pr-2 relative cursor-pointer text-[#757474] hover:bg-gray-500 hover:text-white rounded-full transition-all duration-500 ${activeItem === item.id ? "text-white font-bold" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActionRef(activeItem);
                                        handleSubMenuToggle(item.id);
                                    }}
                                >
                                    <span className="w-8 text-center text-base z-10 mr-2 ml-0.5 scale-130">{item.icon}</span>
                                    <span>{item.text}</span>
                                    <span
                                        className={`ml-auto transform transition-transform ${showSubMenu[item.id] ? "rotate-180" : ""
                                            }`}
                                    >
                                        <AiFillCaretDown />
                                    </span>
                                </div>

                                {/* Hiển thị submenu */}
                                <div
                                    className={`${showSubMenu[item.id] ? "max-h-screen opacity-100 " : "max-h-0 opacity-0"}`}
                                >
                                    {showSubMenu[item.id] && (
                                        <div >
                                            {item.subMenu.map((subItem) => (
                                                <NavLink
                                                    to={subItem.path}
                                                    key={subItem.path}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleItemClick(item);
                                                        onMenuClick(subItem.text);
                                                    }}
                                                    className={({ isActive }) =>
                                                        isActive ? "text-black font-bold " : ""
                                                    }
                                                >
                                                    <div className={`flex items-center m-5 hover:bg-gray-500 rounded-full ${activeItem === item.id ? "" : "hover:text-white text-[#757474]"}`}>
                                                        <span
                                                            className={`w-8 text-center text-base z-10 mr-2 ml-0.5 scale-130  ${activeItem === item.id ? "" : " pl-4 "}`}
                                                        >
                                                            <AiFillHeart />
                                                        </span>

                                                        <span className={` ${activeItem === item.id ? "text-white" : "pl-4"}`}
                                                        >{subItem.text}</span>
                                                    </div>
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    // Trường hợp không có submenu
                    return (
                        <div
                            key={item.id}
                            id={`menu-item-${item.id}`}
                            className={`my-2 ${activeItem === item.id ? "text-white font-bold" : ""}`}
                        >
                            <NavLink
                                to={item.path}
                                className={`flex items-center p-5  py-2 relative cursor-pointer text-[#757474] hover:bg-gray-500 hover:text-white rounded-full transition-all duration-500 ${activeItem === item.id ? "text-white font-bold" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemClick(item);
                                    onMenuClick(item.text);
                                }}
                            >
                                <span className="w-8 text-center text-base z-10 mr-2 ml-0.5 scale-130">{item.icon}</span>
                                <span>{item.text}</span>
                            </NavLink>
                        </div>
                    );
                })}


                <NavLink to="/HomeUser" onClick={handleLogOut}>
                    <div className="flex items-center w-full p-2 my-3 bg-[#faf3e0] hover:bg-gray-100 rounded">
                        <BiLogOut size={24} className="mr-2 text-red-500" />
                        <span className="ml-4 text-lg text-gray-800">Logout</span>
                    </div>
                </NavLink>

            </div>
            <div
                id="action"
                ref={actionRef}
                className="absolute w-10 h-[var(--height-end)] rounded-full bg-gradient-to-b from-[#C45AB3] to-[#DD789A] top-[var(--top-end)] left-2 transition-all duration-1000 flex items-center justify-center scale-100"
            >
            </div>

        </div>
    );
};

export default SildebarLeft;
