import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronDown, FiStar, FiHeart, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

const products = Array(100).fill({
  title: "سود كربون ساعة يد ذكية بيب إس",
  price: "880 جنيه",
  rating: 4.5,
  image: "https://www.importadoracel.com/wp-content/uploads/2024/03/Importadora-Cel-LENOVO-LEGION-SLIM-7i-1.jpg",
  discount: "15%",
  oldPrice: "1035 جنيه"
});

const ITEMS_PER_PAGE = 8;

const ProductList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("الأكثر مبيعًا");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [activeCategory, setActiveCategory] = useState("الكل");
  
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentProducts = products.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    // Smooth scroll to top of products
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    setPriceRange({ ...priceRange, [type]: value });
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filter - Now with better styling */}
      <aside className="w-full md:w-1/4 p-5 bg-white rounded-lg shadow-sm">
        <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">تصفية المنتجات</h3>
        
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-3">الفئة</h4>
          <ul className="space-y-2">
            {["الكل", "أجهزة منزلية", "إلكترونيات", "ساعات ذكية", "أجهزة لوحية"].map((category) => (
              <li key={category} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${category}`} 
                  className="w-4 h-4 accent-blue-600" 
                  checked={category === "الكل"}
                />
                <label htmlFor={`category-${category}`} className="mr-2 cursor-pointer text-gray-600 hover:text-blue-600">
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-3">الماركة</h4>
          <ul className="space-y-2">
            {["الكل", "أبل", "سامسونج", "شاومي", "هواوي", "لينوفو"].map((brand) => (
              <li key={brand} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`brand-${brand}`} 
                  className="w-4 h-4 accent-blue-600"
                />
                <label htmlFor={`brand-${brand}`} className="mr-2 cursor-pointer text-gray-600 hover:text-blue-600">
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-gray-700 mb-3">السعر</h4>
          <div className="flex flex-col space-y-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="الحد الأدنى" 
                value={priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="border border-gray-300 p-2 rounded w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <span className="absolute left-3 top-2.5 text-gray-500">جنيه</span>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="الحد الأقصى" 
                value={priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="border border-gray-300 p-2 rounded w-full pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
              <span className="absolute left-3 top-2.5 text-gray-500">جنيه</span>
            </div>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
              تطبيق
            </button>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-700 mb-3">التقييم</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input type="checkbox" id={`rating-${rating}`} className="w-4 h-4 accent-blue-600" />
                <label htmlFor={`rating-${rating}`} className="mr-2 flex items-center cursor-pointer text-gray-600">
                  {Array(rating).fill(0).map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array(5-rating).fill(0).map((_, i) => (
                    <FiStar key={i} className="text-gray-300" />
                  ))}
                  <span className="mr-1">و أعلى</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content - Now with better styling */}
      <div className="w-full md:w-3/4">
        {/* Categories Navigation */}
        <nav className="bg-white p-4 rounded-lg shadow-sm mb-6 overflow-x-auto">
          <ul className="flex space-x-6 rtl:space-x-reverse whitespace-nowrap">
            {["الكل", "الإلكترونيات", "كهربية", "ساعات", "ملابس", "تخفيضات", "العروض الأسبوعية"].map((cat) => (
              <li key={cat}>
                <button 
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    activeCategory === cat 
                    ? "bg-blue-600 text-white" 
                    : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Filter & Sort - Now with better styling */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-gray-600 mb-3 sm:mb-0">
            <span className="font-semibold">600</span> منتج متاح
          </h2>
          
          <div className="relative">
            <button 
              className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg w-48 hover:bg-gray-200 transition duration-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{sortOption}</span>
              <FiChevronDown className={`ml-2 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-10"
              >
                {["الأكثر مبيعًا", "الأحدث", "السعر: من الأقل إلى الأعلى", "السعر: من الأعلى إلى الأقل", "التقييم"].map((option) => (
                  <button 
                    key={option}
                    className="block w-full text-right px-4 py-2.5 text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Product Grid - Now with better product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-cover" 
                />
                {product.discount && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    خصم {product.discount}
                  </span>
                )}
                <button className="absolute top-2 left-2 text-gray-500 hover:text-red-500 transition-colors duration-200 bg-white rounded-full p-1.5">
                  <FiHeart size={18} />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-gray-700 font-medium h-12 overflow-hidden">{product.title}</h3>
                
                <div className="mt-2 flex items-center">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} w-4 h-4`} 
                    />
                  ))}
                  <span className="text-sm text-gray-500 mr-1">({product.rating})</span>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg text-gray-900">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through block">{product.oldPrice}</span>
                    )}
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-200">
                    <FiShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination - Now with better styling */}
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={<span className="text-lg">«</span>}
            nextLabel={<span className="text-lg">»</span>}
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-1"
            pageClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
            pageLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
            previousClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
            previousLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
            nextClassName="block border border-gray-300 hover:bg-gray-100 transition-colors duration-200 rounded"
            nextLinkClassName="flex items-center justify-center w-10 h-10 text-gray-700"
            breakClassName="flex items-center justify-center w-10 h-10 text-gray-700"
            activeClassName="bg-blue-600 text-white border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;