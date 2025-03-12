// import React, { useEffect, useState } from "react";
// import styles from "../../styles/Web/IntroFPT.module.css";
// import axios from "axios";

// const OptionService = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://psychologysupportsubscription-gmgqg4hudadufya9.eastasia-01.azurewebsites.net/service-packages?PageIndex=1&PageSize=10"
//         );

//         // Kiểm tra response và lọc chỉ những service có isActive = true
//         const activePackages = response.data?.servicePackages?.data?.filter(pkg => pkg.isActive) || [];
//         const sortedPackages = activePackages.sort((a, b) => a.price - b.price);
//         setPackages(sortedPackages);

//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setPackages([]); // Đảm bảo không lỗi khi có lỗi API
//       }
//     };

//     fetchData();
//   }, []);



//   return (
//     <div className="flex flex-col items-center w-full mt-7 h-screen bg-[#fff] ">
//       <span className="text-xl font-thin mt-10 text-[#000]">
//         Subscription Plans
//       </span>
//       <h1
//         className={`${styles.sourceSerif} font-bold text-5xl text-[#000] max-w-[750px] text-center mt-5`}>
//         PREDICTABLE PRICING
//       </h1>

//       <p
//         className={`${styles.sourceSerif} text-center mt-5 font-thin text-[#000]`}>
//         Pick the Plan That Matches Your Ambition. You're in control :<br />{" "}
//         Pause, adjust, or cancel anytime (with no penalties). You Deserve
//         Flexibility.
//       </p>

//       <div className="pt-10 p-50  grid grid-cols-3 gap-4 justify-center w-full h-screen">
//         {/* pt-10 grid grid-cols-5 grid-rows-4 gap-4 justify-center w-full h-screen */}
//         {packages.map((servicePackage) => (
//           <div
//             key={servicePackage.id}
//             className="bg-[#fff] rounded-xl  shadow-lg"
//           >
//             <div className={styles.card}>
//               <span className={styles.title}>
//                 {servicePackage.name}
//                 <p className={styles.pricing}>
//                   ${servicePackage.price}{" "}
//                   <span className={styles.pricingTime}>/ month</span>
//                 </p>
//                 <span className={styles.subTitle}>{servicePackage.description}</span>
//                 <span className={styles.subTitle}>
//                   <span>Everything on {servicePackage.name}:
//                   </span>
//                   <ul className={styles.list}>
//                     <li className={styles.listItem}>
//                       <span className={styles.check}>✓</span> Feature
//                     </li>
//                     <li className={styles.listItem}>
//                       <span className={styles.check}>✓</span> Feature
//                     </li>
//                     <li className={styles.listItem}>
//                       <span className={styles.check}>✓</span> Feature
//                     </li>
//                     <li className={styles.listItem}>
//                       <span className={styles.check}>✓</span> Feature
//                     </li>
//                     <li className={styles.listItem}>
//                       <span className={styles.check}>✓</span> Feature
//                     </li>
//                   </ul>
//                 </span>
//                 <span className={styles.subTitle}>

//                   <ul className={styles.list}>
//                     {servicePackage.features?.map((feature, index) => (
//                       <li key={index} className={styles.listItem}>
//                         <span className={styles.check}>✓</span> {feature}
//                       </li>
//                     ))}
//                   </ul>

//                   <button className={styles.button}>
//                     <span className={styles.textButton}>Get now</span>
//                   </button>
//                 </span>
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OptionService;
// const packages = [
//   {
//     id: 1,
//     name: "Miễn phí",
//     price: "0",
//     description: "Khám phá AI hỗ trợ cho công việc hàng ngày của bạn",
//     features: [
//       "Truy cập GPT-4o mini và tính năng suy luận",
//       "Chế độ thoại tiêu chuẩn",
//       "Dữ liệu thời gian thực từ web qua tính năng tìm kiếm",
//       "Quyền truy cập hạn chế vào GPT-4o",
//       "Hạn chế truy cập vào các tính năng tải tệp lên, phân tích dữ liệu nâng cao và tạo ảnh",
//       "Sử dụng GPT tùy chỉnh"
//     ],
//     buttonText: "Kế hoạch hiện tại của bạn",
//     buttonDisabled: true,
//   },
//   {
//     id: 2,
//     name: "Plus",
//     price: "20",
//     description: "Nâng cao năng suất và sáng tạo với quyền truy cập mở rộng",
//     features: [
//       "Mọi thứ đều miễn phí",
//       "Mở rộng quyền truy cập vào các tính năng nhắn tin, tải tệp lên, phân tích dữ liệu nâng cao và tạo ảnh",
//       "Chế độ thoại tiêu chuẩn và nâng cao",
//       "Access to deep research, multiple reasoning models (o3-mini, o3-mini-high, and o1), and a research preview of GPT-4.5",
//       "Create and use tasks, projects, and custom GPTs",
//       "Quyền truy cập hạn chế vào chức năng tạo video Sora",
//       "Cơ hội để thử nghiệm các tính năng mới"
//     ],
//     buttonText: "Chuyển sang Plus",
//     buttonDisabled: false,
//   },
//   {
//     id: 3,
//     name: "Pro",
//     price: "200",
//     description: "Khai thác tối đa OpenAI với cấp độ truy cập cao nhất",
//     features: [
//       "Mọi tính năng trong gói Plus",
//       "Truy cập không giới hạn vào tất cả các mô hình suy luận và GPT-4o",
//       "Quyền truy cập không giới hạn vào chế độ thoại nâng cao",
//       "Extended access to deep research, which conducts multi-step online research for complex tasks",
//       "Truy cập vào các bản xem trước nghiên cứu của GPT-4.5 và Operator",
//       "Truy cập vào chế độ o1 pro, một chức năng sử dụng nhiều khả năng tính toán hơn để mang lại câu trả lời tốt nhất cho những câu hỏi khó nhất",
//       "Quyền truy cập mở rộng vào chức năng tạo video Sora"
//     ],
//     buttonText: "Chuyển sang Pro",
//     buttonDisabled: false,
//   }
// ];

// const [packages, setPackages] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://psychologysupportsubscription-gmgqg4hudadufya9.eastasia-01.azurewebsites.net/service-packages?PageIndex=1&PageSize=10"
//       );

//       // Kiểm tra response và lọc chỉ những service có isActive = true
//       const activePackages = response.data?.servicePackages?.data?.filter(pkg => pkg.isActive) || [];
//       const sortedPackages = activePackages.sort((a, b) => a.price - b.price);
//       setPackages(sortedPackages);

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setPackages([]); // Đảm bảo không lỗi khi có lỗi API
//     }
//   };

//   fetchData();
// }, []);
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Web/IntroFPT.module.css";

export default function Pricing() {

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "",
      price: "",
      description: "",
      durationDays: "",
      "features": [
        "Access to the DAS21 psychological test for evaluating anxiety, stress, and tension levels",
        "Insights into mental well-being through blog articles",
        "Shopping for mental health-related products",
        "Viewing a list of trusted psychological consultants",
        "Booking appointments with licensed therapists",

      ],
      buttonText: "Kế hoạch hiện tại của bạn",
      buttonDisabled: true,
    },
    {
      id: 2,
      name: "",
      price: "",
      description: "",
      durationDays: "",
      "features": [
        "Access to the DAS21 psychological test for evaluating anxiety, stress, and tension levels",
        "Insights into mental well-being through blog articles",
        "Viewing full detailed test results",
        "Personalized 2-week mental health improvement plan based on preferences, food, and activities",
        "Sharing personal stories on the blog",
        "Access to information about upcoming mental health workshops",
        "Shopping for mental health-related products",
        "Viewing a list of trusted psychological consultants",
        "Booking appointments with licensed therapists",

      ],
      buttonText: "Upgrade to Plus",
      buttonDisabled: false,
    },
    {
      id: 3,
      name: "",
      price: "",
      description: "",
      durationDays: "",
      "features": [
        "Personalized 1-month mental health improvement plan based on preferences, food, and activities",
        "Regular reminders to follow the personalized improvement plan",
        "AI chatbox for daily emotional support and conversations",
        "Discounts on therapist bookings",
        "Unlimited access to the psychological test",
        "Sharing personal stories on the blog",
      ],
      buttonText: "Upgrade to Pro",
      buttonDisabled: false,
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://psychologysupportsubscription-gmgqg4hudadufya9.eastasia-01.azurewebsites.net/service-packages?PageIndex=1&PageSize=10"
        );

        const activePackages = response.data?.servicePackages?.data?.filter(pkg => pkg.isActive) || [];
        const sortedPackages = activePackages.sort((a, b) => a.price - b.price);

        setPackages(prevPackages =>
          prevPackages.map((pkg, index) => {
            const updatedPkg = sortedPackages[index]; // Lấy gói tương ứng với index
            return updatedPkg
              ? { ...pkg, name: updatedPkg.name, price: updatedPkg.price, description: updatedPkg.description, durationDays: updatedPkg.durationDays }
              : pkg;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <span className="text-xl font-thin text-[#000]">
        Subscription Plans
      </span>
      <h1
        className={`${styles.sourceSerif} font-bold text-5xl text-[#3d1085]  max-w-[750px] text-center mt-5`}>
        PREDICTABLE PRICING
      </h1>

      <p
        className={`${styles.sourceSerif} text-center mt-5 font-thin text-[#000]`}>
        Pick the Plan That Matches Your Ambition. You're in control :<br />{" "}
        Pause, adjust, or cancel anytime (with no penalties). You Deserve
        Flexibility.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  w-full max-w-7xl mt-10">
        {packages.map((plan, index) => (
          <div
            key={plan.id}
            className={`bg-gradient-to-b from-pink-100 to-purple-200 shadow-lg rounded-2xl p-6 text-center border ${index === 1 ? 'border-green-500 scale-105' : 'border-gray-600'} hover:shadow-xl transition`}
          >
            <h2 className="text-2xl font-semibold text-[#3d1085] font-bold">{plan.name}</h2>
            <p className=" mt-2 text-sm">{plan.description}</p>
            <button
              className={`mt-4 w-full py-2 rounded-lg text-lg font-medium transition ${plan.buttonDisabled ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
              disabled={plan.buttonDisabled}
            >
              {plan.buttonText}
            </button>
            <p className="text-4xl font-bold mt-4">
              ${plan.price} <span className="text-lg font-medium">USD/month</span>
            </p>
            <ul className="mt-4 space-y-2 text-left">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center ">
                  <span className="text-green-400 mr-2">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
