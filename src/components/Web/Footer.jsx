import { FaFacebook, FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import styles from "../../styles/Web/Footer.module.css";
const Footer = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 ">
      {/* Hàng 1 */}
      <div className="relative col-span-5 h-40 bg-white">
        <span
          className={`${styles.Holtwood}
            absolute
            text-[#4a2580]
            top-8
            left-1/2
            transform
            -translate-x-1/2
            font-bold
            text-[9rem]
            leading-none
            `}>
          EMOEASE
        </span>
      </div>

      {/* Hàng 2 */}
      <div className="col-span-5 row-start-2 h-40 bg-[#4a2580] flex items-center justify-around text-xl font-light  text-[#fff]">
        <span>SOLTECH</span>
        <div className="flex gap-8">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <span>Gianggg244@gmail.com</span>
      </div>
    </div>
  );
};

export default Footer;
