import React from 'react';
import laptop from "../../../../assets/laptop.png";

const HomeViewDiscountContainer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl flex flex-col md:flex-row items-center justify-between p-4 md:p-6 text-white min-h-[120px] md:min-h-[200px] my-5">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <img
          src={laptop}
          alt="Laptop Promotion"
          className="w-32 md:w-48 h-auto rounded-lg" // Adjusted image width
        />
      </div>

      {/* Right: Text */}
      <div className="w-full md:w-1/2 text-center md:text-right mt-2 md:mt-0">
        <h2 className="text-sm md:text-xl font-bold">
          خصم يصل حتى <span className="text-yellow-300">30%</span> علي اجهزة اللاب توب
        </h2>
      </div>
    </div>
  );
};

export default HomeViewDiscountContainer;
