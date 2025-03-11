import React, { useEffect, useState } from "react";
import styles from "../../styles/Web/IntroFPT.module.css";
import axios from "axios";

const OptionService = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://psychologysupportsubscription-gmgqg4hudadufya9.eastasia-01.azurewebsites.net/service-packages?PageIndex=1&PageSize=10"
        );

        // Kiểm tra response và lọc chỉ những service có isActive = true
        const activePackages =
          response.data?.servicePackages?.data?.filter(pkg => pkg.isActive) || [];

        setPackages(activePackages);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPackages([]); // Đảm bảo không lỗi khi có lỗi API
      }
    };

    fetchData();
  }, []);



  return (

    // <div className="flex flex-col items-center w-full mt-7 h-screen bg-[#fff] ">
    //   <span className="text-xl font-thin mt-10 text-[#000]">
    //     Subscription Plans
    //   </span>
    //   <h1
    //     className={`${styles.sourceSerif} font-bold text-5xl text-[#000] max-w-[750px] text-center mt-5`}>
    //     PREDICTABLE PRICING
    //   </h1>
    //   <p
    //     className={`${styles.sourceSerif} text-center mt-5 font-thin text-[#000]`}>
    //     Pick the Plan That Matches Your Ambition. You're in control :<br />{" "}
    //     Pause, adjust, or cancel anytime (with no penalties). You Deserve
    //     Flexibility.
    //   </p>

    //   <div className="pt-10 grid grid-cols-5 grid-rows-4 gap-4 justify-center w-full h-screen">
    //     <div className="row-span-3 col-start-2 bg-[#fff] rounded-xl">
    //       <div className={styles.card}>
    //         <span className={styles.title}>
    //           Pro
    //           <p className={styles.pricing}>
    //             $8 <span className={styles.pricingTime}>/ month</span>
    //           </p>
    // <span className={styles.subTitle}>
    //   Everything on Basic plus:
    //   <ul className={styles.list}>
    //     <li className={styles.listItem}>
    //       <span className={styles.check}>✓</span> Feature
    //     </li>
    //     <li className={styles.listItem}>
    //       <span className={styles.check}>✓</span> Feature
    //     </li>
    //     <li className={styles.listItem}>
    //       <span className={styles.check}>✓</span> Feature
    //     </li>
    //     <li className={styles.listItem}>
    //       <span className={styles.check}>✓</span> Feature
    //     </li>
    //     <li className={styles.listItem}>
    //       <span className={styles.check}>✓</span> Feature
    //     </li>
    //   </ul>
    //   <button className={styles.button}>
    //     <span className={styles.textButton}>Get pro now</span>
    //   </button>
    // </span>
    //         </span>
    //       </div>
    //     </div>
    //     <div className="row-span-3 col-start-3 bg-[#fff] rounded-xl">
    //       <div className={styles.card}>
    //         <span className={styles.title}>
    //           Pro
    //           <p className={styles.pricing}>
    //             $8 <span className={styles.pricingTime}>/ month</span>
    //           </p>
    //           <span className={styles.subTitle}>
    //             Everything on Basic plus:
    //             <ul className={styles.list}>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //             </ul>
    //             <button className={styles.button}>
    //               <span className={styles.textButton}>Get pro now</span>
    //             </button>
    //           </span>
    //         </span>
    //       </div>
    //     </div>
    //     <div className="row-span-3 col-start-4  bg-[#fff] rounded-xl">
    //       <div className={styles.card}>
    //         <span className={styles.title}>
    //           Pro
    //           <p className={styles.pricing}>
    //             $8 <span className={styles.pricingTime}>/ month</span>
    //           </p>
    //           <span className={styles.subTitle}>
    //             Everything on Basic plus:
    //             <ul className={styles.list}>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //               <li className={styles.listItem}>
    //                 <span className={styles.check}>✓</span> Feature
    //               </li>
    //             </ul>
    //             <button className={styles.button}>
    //               <span className={styles.textButton}>Get pro now</span>
    //             </button>
    //           </span>
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center w-full mt-7 h-screen bg-[#fff] ">
      <span className="text-xl font-thin mt-10 text-[#000]">
        Subscription Plans
      </span>
      <h1
        className={`${styles.sourceSerif} font-bold text-5xl text-[#000] max-w-[750px] text-center mt-5`}>
        PREDICTABLE PRICING
      </h1>

      <p
        className={`${styles.sourceSerif} text-center mt-5 font-thin text-[#000]`}>
        Pick the Plan That Matches Your Ambition. You're in control :<br />{" "}
        Pause, adjust, or cancel anytime (with no penalties). You Deserve
        Flexibility.
      </p>

      <div className="pt-10 p-50  grid grid-cols-3 gap-4 justify-center w-full h-screen">
        {/* pt-10 grid grid-cols-5 grid-rows-4 gap-4 justify-center w-full h-screen */}
        {packages.map((servicePackage) => (
          <div
            key={servicePackage.id}
            className="bg-[#fff] rounded-xl  shadow-lg"
          >
            <div className={styles.card}>
              <span className={styles.title}>
                {servicePackage.name}
                <p className={styles.pricing}>
                  ${servicePackage.price}{" "}
                  <span className={styles.pricingTime}>/ month</span>
                </p>
                <span className={styles.subTitle}>
                  Everything on Basic plus:
                  <ul className={styles.list}>
                    <li className={styles.listItem}>
                      <span className={styles.check}>✓</span> Feature
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.check}>✓</span> Feature
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.check}>✓</span> Feature
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.check}>✓</span> Feature
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.check}>✓</span> Feature
                    </li>
                  </ul>
                </span>
                <span className={styles.subTitle}>
                  {servicePackage.description}for studentsa
                  <ul className={styles.list}>
                    {servicePackage.features?.map((feature, index) => (
                      <li key={index} className={styles.listItem}>
                        <span className={styles.check}>✓</span> {feature}
                      </li>
                    ))}
                  </ul>

                  <button className={styles.button}>
                    <span className={styles.textButton}>Get now</span>
                  </button>
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionService;
