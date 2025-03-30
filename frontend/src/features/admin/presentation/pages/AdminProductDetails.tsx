import { useParams, useLocation } from "react-router-dom";
import { FaTimes, FaUpload } from "react-icons/fa";
import useUpdateProductHook from "../hooks/updateProductHook";
import { FiUpload } from "react-icons/fi";
import LoadingSpinner from "../../../../utils/components/LoadingSpinner";

const AdminProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
  const products = location.state?.productsList;

  console.log("Product data received:", product);

  const {
    productName, setProductName,
    productDescription, setProductDescription,
    priceAfterDiscount, setPriceAfterDiscount,
    productPrice, setProductPrice,
    quantity, setQuantity,
    additionalImages,
    setReplacingImageIndex,
    handleUpdate,
    coverImagePreview,
    handleAdditionalImageChange,
    handleCoverImageChange,
    categoriesList,
    handelDelete,
    mainCategory, setMainCategory,
    isLoading, // Loading state for update operation
  } = useUpdateProductHook(product, products);

  if (!product) {
    return <div className="text-center p-6">Product data not found. Please go back and select a product.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-left">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      {/* Cover Image Upload */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Cover Image</label>
        <div className="flex items-center justify-center">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
            {!coverImagePreview && <FiUpload size={24} className="text-gray-400" />}
            {coverImagePreview && (
              <img src={coverImagePreview} alt="Cover Preview" className="w-full h-full object-cover rounded-lg" />
            )}
            <input type="file" className="hidden" onChange={handleCoverImageChange} accept="image/*" />
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <label htmlFor="productName" className="block text-gray-700 mb-1">Product Name</label>
        <input id="productName" type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
      </div>

      {/* Product Description */}
      <div className="mb-4">
        <label htmlFor="productDescription" className="block text-gray-700 mb-1">Product Description</label>
        <textarea id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" rows={4} />
      </div>

      {/* Price Before Discount */}
      <div className="mb-4">
        <label htmlFor="productPrice" className="block text-gray-700 mb-1">Price Before Discount</label>
        <input id="productPrice" type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="w-full p-2 border border-gray-300 rounded" step="0.01" min="0" />
      </div>

      {/* Price After Discount */}
      <div className="mb-4">
        <label htmlFor="priceAfterDiscount" className="block text-gray-700 mb-1">Price After Discount</label>
        <input id="priceAfterDiscount" type="number" value={priceAfterDiscount} onChange={(e) => setPriceAfterDiscount(e.target.value)} className="w-full p-2 border border-gray-300 rounded" step="0.01" min="0" />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-gray-700 mb-1">Quantity</label>
        <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border border-gray-300 rounded" min="0" />
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label htmlFor="mainCategory" className="block text-gray-700 mb-1">Category</label>
        <select id="mainCategory" value={mainCategory || ""} onChange={(e) => setMainCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded bg-white">
          <option value="" disabled>Select Category</option>
          {categoriesList?.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        {/* Update Button with Loading Indicator */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200 flex items-center justify-center min-w-[120px]"
          onClick={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size={20} color="white" /> : "Save Changes"}
        </button>

        {/* Delete Button */}
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
          onClick={() => handelDelete(product._id)}
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;
