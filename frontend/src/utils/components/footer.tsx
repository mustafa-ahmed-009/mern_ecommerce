import { FaTwitter, FaInstagram, FaFacebook, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-4 border-t border-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm px-4">
        {/* Left: Social Icons & Phone */}
        <div className="flex items-center gap-3 order-2 md:order-1">
          <FaTwitter />
          <FaInstagram />
          <FaFacebook />
          <span className="flex items-center gap-1">
            <FaPhone />
            <span>0122455346356</span>
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex gap-6 order-1 md:order-2">
          <a href="#" className="hover:text-gray-600">
            اتصل بنا
          </a>
          <a href="#" className="hover:text-gray-600">
            سياسة الخصوصية
          </a>
          <a href="#" className="hover:text-gray-600">
            الشروط والأحكام
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
