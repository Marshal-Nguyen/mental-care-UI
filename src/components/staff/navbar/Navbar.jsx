import React from "react";
import { AiFillApple } from "react-icons/ai";
const App = () => {
    return (
        <div className="font-mono">
            {/* Header Section */}
            <header>
                <div
                    id="nav"
                    className="absolute top-0 left-0 w-4/5 p-4 flex items-center text-black border-b border-gray-300"
                >
                    <div className="logo">
                        <img
                            src="https://marketingai.mediacdn.vn/thumb_w/480//wp-content/uploads/2018/06/Sb-min-2-370x370.jpg"
                            alt="Logo"
                            className="w-15"
                        />
                    </div>
                    <ul className="ml-12 flex space-x-12">
                        <li>HOME</li>
                        <li>INFO</li>
                        <li>CONTACT</li>
                    </ul>
                </div>

                <div className="banner relative h-[110vh] overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center bg-fixed brightness-50" style={{ backgroundImage: 'url(https://via.placeholder.com/1200x800)' }}></div>
                    <h1 className="absolute top-1/2 left-1/2 text-white text-[20vh] font-great transform -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fade-in">
                        Lùn Dev
                    </h1>
                    <img
                        src="https://via.placeholder.com/500"
                        alt="User"
                        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-1/2 brightness-50 opacity-0 animate-slide-up"
                    />
                </div>
            </header>

            {/* Intro Section */}
            <div className="container bg-gray-300 text-center flex items-center justify-center min-h-screen">
                <div>
                    <div className="text-2xl mb-4">Tiktok ~ youtube</div>
                    <h2 className="text-[150px] font-great my-8">Lùn Dev</h2>
                    <div className="text-lg">
                        <p>Kênh youtube Lùn Dev gồm 2 series</p>
                        <p>Series animation web with project</p>
                        <p>Series animation cơ bản cho người mới</p>
                    </div>
                </div>
            </div>

            {/* Travel Section */}
            <div className="travel bg-gray-200 py-36 text-center">
                <div className="mb-20">
                    <div>@lun.dev</div>
                    <h2 className="text-4xl">CODE VUI KHI CHIA SẼ</h2>
                </div>
                <div className="flex flex-wrap justify-center">
                    {[1, 2, 3, 4].map((_, idx) => (
                        <div key={idx} className="w-1/4 px-4 mb-8">
                            <img
                                src="https://via.placeholder.com/300"
                                alt="Placeholder"
                                className="w-full h-[520px] object-cover mb-4"
                            />
                            <div className="text-center">
                                <h3>Hình</h3>
                                <h3>Nội dung hình</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="darkshow bg-gray-900 text-gray-100 py-36">
                <div className="text-4xl font-bold mb-20">Contact with me</div>
                <div className="flex">
                    <div className="w-1/2">
                        <img
                            src="https://via.placeholder.com/300"
                            alt="Avatar"
                            className="w-1/2 mx-auto object-cover"
                        />
                    </div>
                    <div className="w-1/2">
                        {[1, 2, 3, 4].map((_, idx) => (
                            <div
                                key={idx}
                                className="contactItem bg-gray-800 p-8 mb-4 rounded-lg"
                            >
                                <div className="icon bg-purple-600 px-3 py-1 rounded-lg mb-4 inline-block">
                                    <AiFillApple className="inline-block mr-2" /> Facebook
                                </div>
                                <div className="titleContact text-3xl font-bold mb-4">Hồ Viết Hoàng</div>
                                <div className="slug text-gray-400">fb.com/hohoasng.dev</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer bg-gray-800 text-gray-100 py-36 text-center">
                <div className="text-[130px] font-great mb-12">Lùn Dev</div>
                <ul className="flex justify-center border-t border-gray-600 pt-12">
                    {['HOME', 'INFO', 'CONTACT', 'NEW', 'NAMI'].map((item, idx) => (
                        <li key={idx} className="px-12 text-2xl">
                            {item}
                        </li>
                    ))}
                </ul>
            </footer>
        </div>
    );
};

export default App;
