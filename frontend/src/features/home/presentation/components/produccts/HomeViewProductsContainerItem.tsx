import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HomeViewProductsContainerItem = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[200px] bg-white shadow-lg rounded-2xl p-4 text-right" onClick={()=>navigate("/products/3")}>
      {/* Image Container */}
      <div className="w-full h-40 bg-gray-100 rounded-2xl flex justify-center items-center overflow-hidden">
        <img
          src="https://ttcrunch.com/images/featured-post/fan10years.jpg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Heart Icon */}
      <div className="w-full flex justify-between items-center mt-2">
        <CiHeart className="text-gray-400 text-lg cursor-pointer" />
      </div>

      {/* Product Name */}
      <p className="text-sm font-medium text-gray-700 leading-tight mt-1">
        سود كربون ساعة يد ذكية بيب إس
      </p>
      <p className="text-xs text-gray-500">أسود كربون</p>

      {/* Rating & Price Row */}
      <div className="flex justify-between items-center w-full mt-2">
        {/* Price */}
        <span className="text-black font-bold text-lg">٨٨٠ جنيه</span>

        {/* Rating */}
        <div className="flex items-center text-yellow-500 text-sm">
          <span className="text-gray-700 ml-1">4.5</span>
          <FaStar />
        </div>
      </div>
    </div>
  );
};

export default HomeViewProductsContainerItem;
