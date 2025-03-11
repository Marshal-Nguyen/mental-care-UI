import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import styles from "../../styles/Web/LogIn.module.css";
import { auth, provider, signInWithPopup } from "../../util/firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state kiểm tra đăng nhập
  const [userImage, setUserImage] = useState(null); // Lưu ảnh đại diện
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Kiểm tra email có đuôi ".fpt.edu.vn"
      if (!user.email.endsWith("@fpt.edu.vn")) {
        toast.warn("Chỉ email FPT được phép đăng nhập!", {
          position: "top-right",
        });
        auth.signOut(); // Đăng xuất ngay lập tức
        return;
      }

      console.log("Đăng nhập thành công:", user);
      console.log("Tên:", user.displayName);
      console.log("Email:", user.email);
      console.log("Ảnh đại diện:", user.photoURL);
      console.log("UID:", user.uid);
      toast.success("Đăng nhập thành công!", { position: "top-right" });
      setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
      setUserImage(user.photoURL); // Lưu ảnh đại diện
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Lỗi đăng nhập! Vui lòng thử lại.", {
        position: "top-right",
      });
      console.error("Lỗi đăng nhập:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Đã đăng xuất thành công!", { position: "top-right" });
      console.log("Đã đăng xuất thành công!");
      setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập
      setUserImage(null); // Xóa ảnh đại diện khi đăng xuất
      setOpen(false);
    } catch (error) {
      toast.error("Lỗi đăng xuất! Vui lòng thử lại.", {
        position: "top-right",
      });
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  return (
    <div className="relative">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-300 hover:shadow-purple-400 transition-all overflow-hidden">
        {isLoggedIn && userImage ? (
          <img
            src={userImage}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <FaUser className="text-white text-2xl" />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-30  bg-white border border-purple-600 rounded-3xl shadow-lg shadow-purple-300 p-2 z-51">
          {/* Login Button */}
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setIsModalOpen(true);
              } else {
                navigate("/DashboardPartient");
                // Điều hướng đến trang Dashboard
                // navigate("/DashboardDoctor");
              }
              setOpen(false);
            }}
            className="w-full bg-purple-300 py-1 text-[#4d4d4d] font-mono rounded-2xl mb-2 hover:bg-purple-400">
            {isLoggedIn ? "Dashboard" : "LogIn"}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full bg-purple-300 py-2 flex items-center justify-center text-gray-700 font-semibold rounded-2xl hover:bg-purple-400">
            <FaSignOutAlt className="mr-2" color="white" />
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#4e4d4dbb] bg-opacity-50 z-51">
          <div class="relative py-3 sm:max-w-xl sm:mx-auto">
            <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
              <div class="max-w-md mx-auto">
                <div class="flex items-center space-x-5 justify-center">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-3 right-0 text-gray-600 hover:text-black text-xl">
                    ✖
                  </button>
                  <h1 className="text-[#4e0986] text-2xl font-serif">
                    SOLTECH
                  </h1>
                </div>
                <div class="mt-5">
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="login">
                    E-mail
                  </label>
                  <input
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="text"
                    id="login"
                  />
                  <label
                    class="font-semibold text-sm text-gray-600 pb-1 block"
                    for="password">
                    Password
                  </label>
                  <input
                    class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                    type="password"
                    id="password"
                  />
                </div>
                <div class="text-right mb-4">
                  <a
                    class="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
                    href="#">
                    Forgot Password?
                  </a>
                </div>
                <div class="flex justify-center w-full items-center">
                  <div>
                    <button
                      onClick={handleGoogleLogin}
                      class="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      <svg
                        viewBox="0 0 24 24"
                        height="25"
                        width="25"
                        y="0px"
                        x="0px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                          fill="#F44336"></path>
                        <path
                          d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                          fill="#2196F3"></path>
                        <path
                          d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                          fill="#FFC107"></path>
                        <path
                          d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                          fill="#00B060"></path>
                        <path
                          opacity=".1"
                          d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"></path>
                        <polygon
                          opacity=".1"
                          points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"></polygon>
                        <path
                          d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                          fill="#E6E6E6"></path>
                        <path
                          opacity=".2"
                          d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                          fill="#FFF"></path>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          y2="12"
                          y1="12"
                          x2="24"
                          x1="0"
                          id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1">
                          <stop
                            stop-opacity=".2"
                            stop-color="#fff"
                            offset="0"></stop>
                          <stop
                            stop-opacity="0"
                            stop-color="#fff"
                            offset="1"></stop>
                        </linearGradient>
                        <path
                          d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                          fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"></path>
                        <path
                          opacity=".1"
                          d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"></path>
                        <path
                          opacity=".2"
                          d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                          fill="#FFF"></path>
                      </svg>
                      <span class="ml-2">Sign in with Google</span>
                    </button>
                  </div>
                </div>
                <div class="mt-5">
                  <button class="py-2 px-4 bg-blue-600 hover:bg-blue-700 cursor-pointer focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    Log in
                  </button>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  <a
                    class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    href="#">
                    or sign up
                  </a>
                  <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  );
};

export default LogIn;
// import React, { useState } from "react";
// import { FaUser, FaSignOutAlt } from "react-icons/fa";
// import styles from "../../styles/Web/LogIn.module.css";
// import { auth, provider, signInWithPopup } from "../../util/firebase/firebase";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";
// const LogIn = () => {
//   const [open, setOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state kiểm tra đăng nhập
//   const [userImage, setUserImage] = useState(null); // Lưu ảnh đại diện
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Xử lý đăng nhập
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     const input = formData.email; // Ô input nhập vào
//     const isEmail = /.+@.+\..+/.test(input); // Kiểm tra có phải email không

//     const data = {
//       [isEmail ? "email" : "phoneNumber"]: input,
//       password: formData.password,
//     };
//     try {
//       const response = await axios.post(
//         "https://psychologysupportauth-gqdkbafkbpf5a4gf.eastasia-01.azurewebsites.net/Auth/login",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const token = response.data.token;
//       const decodedToken = jwtDecode(token);
//       const userRole = decodedToken.role;
//       // Lưu token vào localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("userRole", userRole);
//       setFormData({
//         email: "",
//         password: "",
//       });
//       console.log("User role:", userRole);
//       switch (userRole) {
//         case 'Manager':
//           navigate("/manager", { replace: true });
//           toast.success('Login successful, welcome to Manager');
//           break;
//         case 'Staff':
//           navigate("/staff", { replace: true });
//           break;
//         // chú g tự set đường dẫn ở đây nha
//         case 'User':
//           toast.success("Đăng nhập thành công!", { position: "top-right" });
//           setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
//           setUserImage('https://i.pravatar.cc/150?img=3'); // Lưu ảnh đại diện
//           setIsModalOpen(false);
//           break;
//         case 'Doctor':
//           navigate("/manager", { replace: true });
//           break;
//         default:
//           toast.error('Unknown user role');
//           break;
//       }
//     } catch (err) {
//       setError("Login failed. Please check your information again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Kiểm tra email có đuôi ".fpt.edu.vn"
//       if (!user.email.endsWith("@fpt.edu.vn")) {
//         toast.warn("Chỉ email FPT được phép đăng nhập!", {
//           position: "top-right",
//         });
//         auth.signOut(); // Đăng xuất ngay lập tức
//         return;
//       }

//       console.log("Đăng nhập thành công:", user);
//       console.log("Tên:", user.displayName);
//       console.log("Email:", user.email);
//       console.log("Ảnh đại diện:", user.photoURL);
//       console.log("UID:", user.uid);
//       toast.success("Đăng nhập thành công!", { position: "top-right" });
//       setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
//       setUserImage(user.photoURL); // Lưu ảnh đại diện
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error("Lỗi đăng nhập! Vui lòng thử lại.", {
//         position: "top-right",
//       });
//       console.error("Lỗi đăng nhập:", error);
//     }
//   };
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       toast.success("Đã đăng xuất thành công!", { position: "top-right" });
//       console.log("Đã đăng xuất thành công!");
//       // toast.success('Logout successful. See you next time!');
//       localStorage.clear();
//       setIsLoggedIn(false); // Đặt lại trạng thái đăng nhập
//       setUserImage(null); // Xóa ảnh đại diện khi đăng xuất
//       setOpen(false);
//     } catch (error) {
//       toast.error("Lỗi đăng xuất! Vui lòng thử lại.", {
//         position: "top-right",
//       });
//       console.error("Lỗi khi đăng xuất:", error);
//     }
//   };
//   return (
//     <div className="relative">
//       {/* Avatar Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-300 hover:shadow-purple-400 transition-all overflow-hidden">
//         {isLoggedIn && userImage ? (
//           <img
//             src={userImage}
//             alt="Avatar"
//             className="w-full h-full object-cover rounded-full"
//           />
//         ) : (
//           <FaUser className="text-white text-2xl" />
//         )}
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-30  bg-white border border-purple-600 rounded-3xl shadow-lg shadow-purple-300 p-2 z-51">
//           {/* Login Button */}
//           <button
//             onClick={() => {
//               if (!isLoggedIn) {
//                 setIsModalOpen(true);
//               } else {
//                 navigate("dashboardUser"); // Điều hướng đến trang Dashboard
//               }
//               setOpen(false);
//             }}
//             className="w-full bg-purple-300 py-1 text-[#4d4d4d] font-mono rounded-2xl mb-2 hover:bg-purple-400">
//             {isLoggedIn ? "Dashboard" : "LogIn"}
//           </button>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full bg-purple-300 py-2 flex items-center justify-center text-gray-700 font-semibold rounded-2xl hover:bg-purple-400">
//             <FaSignOutAlt className="mr-2" color="white" />
//           </button>
//         </div>
//       )}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-[#4e4d4dbb] bg-opacity-50 z-51">
//           <div class="relative py-3 sm:max-w-xl sm:mx-auto">
//             <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
//               <div class="max-w-md mx-auto">
//                 <div class="flex items-center space-x-5 justify-center">
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="absolute top-3 right-0 text-gray-600 hover:text-black text-xl">
//                     ✖
//                   </button>
//                   <h1 className="text-[#4e0986] text-2xl font-serif">
//                     Login
//                   </h1>

//                 </div>
//                 {error && <p className="text-red-500 text-center">{error}</p>}
//                 <div class="mt-5">

//                   <label
//                     class="font-semibold text-sm text-gray-600 pb-1 block"
//                     for="login">
//                     E-mail or Phone Number
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full p-2 border rounded mt-1 focus:ring focus:ring-blue-300"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       className="w-full p-2 border rounded mt-1 focus:ring focus:ring-blue-300 pr-10"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-2 flex items-center text-gray-600"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                     </button>
//                   </div>
//                 </div>
//                 <div class="text-right mb-4">
//                   <a
//                     class="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
//                     href="#">
//                     Forgot Password?
//                   </a>
//                 </div>
//                 <div class="flex justify-center w-full items-center">
//                   <div>
//                     <button
//                       onClick={handleGoogleLogin}
//                       class="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
//                       <svg
//                         viewBox="0 0 24 24"
//                         height="25"
//                         width="25"
//                         y="0px"
//                         x="0px"
//                         xmlns="http://www.w3.org/2000/svg">
//                         <path
//                           d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
//                           fill="#F44336"></path>
//                         <path
//                           d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
//                           fill="#2196F3"></path>
//                         <path
//                           d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
//                           fill="#FFC107"></path>
//                         <path
//                           d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
//                           fill="#00B060"></path>
//                         <path
//                           opacity=".1"
//                           d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"></path>
//                         <polygon
//                           opacity=".1"
//                           points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"></polygon>
//                         <path
//                           d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
//                           fill="#E6E6E6"></path>
//                         <path
//                           opacity=".2"
//                           d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
//                           fill="#FFF"></path>
//                         <linearGradient
//                           gradientUnits="userSpaceOnUse"
//                           y2="12"
//                           y1="12"
//                           x2="24"
//                           x1="0"
//                           id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1">
//                           <stop
//                             stop-opacity=".2"
//                             stop-color="#fff"
//                             offset="0"></stop>
//                           <stop
//                             stop-opacity="0"
//                             stop-color="#fff"
//                             offset="1"></stop>
//                         </linearGradient>
//                         <path
//                           d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
//                           fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"></path>
//                         <path
//                           opacity=".1"
//                           d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"></path>
//                         <path
//                           opacity=".2"
//                           d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
//                           fill="#FFF"></path>
//                       </svg>
//                       <span class="ml-2">Sign in with Google</span>
//                     </button>
//                   </div>
//                 </div>
//                 <div class="mt-5">
//                   <button class="py-2 px-4 bg-blue-600 hover:bg-blue-700 cursor-pointer focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"

//                     onClick={handleLogin}
//                     disabled={loading}>
//                     Log in
//                   </button>
//                 </div>
//                 <div class="flex items-center justify-between mt-4">
//                   <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
//                   <a
//                     className="text-xs text-blue-500 underline hover:text-blue-700 cursor-pointer"
//                     onClick={() => {
//                       navigate("/regist", { replace: true }); // Chỉ giữ lại "/regist"
//                       setIsModalOpen(false);
//                     }}
//                   >
//                     or sign up
//                   </a>
//                   <span class="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/*  */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LogIn;
