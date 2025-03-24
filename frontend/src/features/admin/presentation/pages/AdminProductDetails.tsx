import { useParams, useLocation } from "react-router-dom";
import { FaTimes, FaUpload } from "react-icons/fa";
import useUpdateProductHook from "../hooks/updateProductHook";
import { FiUpload } from "react-icons/fi";
import CategoriesList from "../components/Categories/CategoriesList";

const AdminProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const products = location.state?.productsList;
  
  console.log(product);

  const {
    productName,
    setProductName,
    productDescription, setProductDescription,
    priceAfterDiscount, setPriceAfterDiscount,
    productPrice, setProductPrice,
    quantity, setQuantity,
    additionalImages,
    setReplacingImageIndex,
    handleUpdate,
    categeriesList,
    coverImagePreview,
    handleAdditionalImageChange,
    handleCoverImageChange, 
    categoriesList,
    handelDelete,
    mainCategory, setMainCategory } = useUpdateProductHook(product , products);
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-right">
      <h1 className="text-xl font-bold mb-4">تعديل المنتج</h1>
      {/* Cover Image */}
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              {!coverImagePreview && (
                <FiUpload size={24} className="text-gray-400" />
              )}
              {coverImagePreview && (
                <img
                  src={coverImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleCoverImageChange}
                accept="image/*"
              />
            </label>
          </div>
      {/* additional images*/}
      {product.images &&
        
<div className="py-2">
  <p>صور اخر للمنتج</p>
  <div className="flex w-[50vh] ">
    <label htmlFor="additionalImage" className="flex">
    {additionalImages.map((img, index) => (
  <div 
    key={index} 
    className="relative mr-2 cursor-pointer"
    onClick={(e) => {
      e.preventDefault();
      setReplacingImageIndex(index); // Track which image we're replacing
      document.getElementById('additionalImage')?.click();
    }}
  >
    <img 
      src={img.preview} 
      className="w-20 h-20 object-cover"
      alt={`Product image ${index}`}
    />
  </div>
))}
    </label>
    <input 
      type="file" 
      id="additionalImage" 
      className="hidden" 
      onChange={handleAdditionalImageChange}
      multiple
    />
  </div>
</div>
  
      
      }
      {/* Product Name */}
      <div className="mb-2">
        <label className="block text-gray-700">اسم المنتج</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      {/* Product Description */}
      <div className="mb-2">
        <label className="block text-gray-700">وصف المنتج</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      {/* Price Before Discount */}
      <div className="mb-2">
        <label className="block text-gray-700">السعر قبل الخصم</label>
        <input
          type="text"
          value={priceAfterDiscount}
          onChange={(e) => setPriceAfterDiscount(e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      {/* Product Price */}
      <div className="mb-2">
        <label className="block text-gray-700">سعر المنتج</label>
        <input
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      {/* Quantity */}
      <div className="mb-2">
        <label className="block text-gray-700">الكمية</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border"
        />
      </div>

      <select
  value={mainCategory || ""} // Ensure controlled component
  onChange={(e) => setMainCategory(e.target.value)}
  className="w-full p-2 border"
>
  {/* Optional default/empty option */}
  <option value="">اختر التصنيف</option>
  
  {categoriesList?.map((category) => (
    <option 
      key={category._id}  // Required key
      value={category._id}
    >
      {category.name}
    </option>
  ))}
</select>
      {/* Submit Button */}
      <div className="flex gap-3">
      <button className="bg-black text-white px-4 py-2 rounded my-3" onClick={() => {
        handleUpdate();
        
        
        }}>حفظ التعديلات</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded my-3" onClick={() => {
        handelDelete(product._id);
        
        
        }}>حفظ التعديلات</button>
</div>
    </div>
  );
};

export default AdminProductDetails;
