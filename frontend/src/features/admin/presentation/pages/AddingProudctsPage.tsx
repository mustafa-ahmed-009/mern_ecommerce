import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import Select from "react-select"; // Assuming you might add this back later
import useProductManagement from "../hooks/productPageHook";

const AddingProductsPage = () => { // Renamed component for clarity
  // Use the custom hook
  const {
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    priceBeforeDiscount,
    setPriceBeforeDiscount,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    mainCategory,
    setMainCategory,
    categoriesList, // Assuming this is fetched within the hook
    coverImagePreview,
    // Assuming additionalImages state and handlers are in the hook
    // additionalImages,
    formErrors,
    isSubmitting,
    // Assuming subcategory state and handlers are in the hook
    // setSubCategories,
    // Assuming color state and handlers are in the hook
    // selectedColors,
    // availableColors,
    // handleColorSelection,
    handleCoverImageChange,
    removeCoverImage,
    // handleAdditionalImageChange,
    // removeAdditionalImage,
    handleSubmit,
  } = useProductManagement(); // Ensure the hook provides all needed states/handlers

  return (
    // Removed text-right as default is left for English
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Add New Product</h2>

      {/* Cover Image Upload */}
      <div className="mb-6">
        <p className="text-gray-600 mb-2 font-medium">Cover Image (Main Image)</p>
        <div className="flex justify-start"> {/* Changed justify-center to justify-start */}
          {!coverImagePreview ? (
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*" // Good practice to specify accepted types
                className="hidden"
                onChange={handleCoverImageChange}
              />
              <div
                className={`w-32 h-32 border-2 border-dashed rounded-md ${
                  formErrors.coverImage ? "border-red-500" : "border-gray-300 hover:border-gray-400"
                } flex items-center justify-center text-gray-400 hover:text-gray-500 transition-colors`}
              >
                <div className="flex flex-col items-center">
                  <FaUpload className="mb-2 text-2xl" />
                  <span className="text-xs text-center">Upload Cover</span>
                </div>
              </div>
            </label>
          ) : (
            <div className="relative w-32 h-32 border border-gray-300 rounded-md">
              <img
                src={coverImagePreview}
                className="w-full h-full object-cover rounded-md"
                alt="Product cover"
              />
              <button
                type="button" // Added type="button"
                onClick={removeCoverImage}
                aria-label="Remove cover image" // Added aria-label
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
        </div>
        {formErrors.coverImage && (
          <p className="text-red-500 text-xs mt-1">{formErrors.coverImage}</p>
        )}
      </div>

       {/* Product Name */}
      <div className="mb-4">
         <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          id="productName"
          type="text"
          placeholder="e.g., Summer T-Shirt"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-primary focus:border-primary ${
            formErrors.productName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formErrors.productName && (
          <p className="text-red-500 text-xs mt-1">{formErrors.productName}</p>
        )}
      </div>

      {/* Product Description */}
      <div className="mb-4">
         <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
        <textarea
          id="productDescription"
          placeholder="Detailed description of the product..."
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
           rows={4} // Added rows for better usability
          className={`w-full p-2 border rounded-md focus:ring-primary focus:border-primary ${
            formErrors.productDescription ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formErrors.productDescription && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.productDescription}
          </p>
        )}
      </div>

      {/* --- Price Section (Grouped) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
              <label htmlFor="priceBeforeDiscount" className="block text-sm font-medium text-gray-700 mb-1">Price Before Discount (Optional)</label>
             <input
                id="priceBeforeDiscount"
                type="number" // Use number type for prices
                placeholder="e.g., 25.00"
                value={priceBeforeDiscount}
                min="0" // Add min value
                step="0.01" // Add step for decimals
                onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
          </div>
          <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
             <input
                id="productPrice"
                type="number" // Use number type for prices
                placeholder="e.g., 19.99"
                value={productPrice}
                min="0" // Add min value
                step="0.01" // Add step for decimals
                onChange={(e) => setProductPrice(e.target.value)}
                className={`w-full p-2 border rounded-md focus:ring-primary focus:border-primary ${
                  formErrors.productPrice ? "border-red-500" : "border-gray-300"
                }`}
              />
              {formErrors.productPrice && (
                <p className="text-red-500 text-xs mt-1">{formErrors.productPrice}</p>
              )}
          </div>
      </div>


      {/* Quantity Field */}
      <div className="mb-4">
         <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Available Quantity</label>
        <input
          id="quantity"
          type="number"
          placeholder="e.g., 100"
          value={quantity}
          min="0" // Add min value
          onChange={(e) => setQuantity(Number(e.target.value) >= 0 ? Number(e.target.value) : 0)} // Prevent negative numbers
          className={`w-full p-2 border rounded-md focus:ring-primary focus:border-primary ${
            formErrors.quantity ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formErrors.quantity && (
          <p className="text-red-500 text-xs mt-1">{formErrors.quantity}</p>
        )}
      </div>

      {/* Main Category Dropdown */}
      <div className="mb-4">
         <label htmlFor="mainCategory" className="block text-sm font-medium text-gray-700 mb-1">Main Category</label>
        <select
          id="mainCategory"
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          className={`w-full p-2 border rounded-md focus:ring-primary focus:border-primary bg-white ${ // Added bg-white for consistency
            formErrors.mainCategory ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="" disabled>-- Select a Category --</option> {/* Added default option */}
          {categoriesList?.map((category) => ( // Added optional chaining
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </select>
         {formErrors.mainCategory && (
          <p className="text-red-500 text-xs mt-1">{formErrors.mainCategory}</p>
        )}
      </div>



      {/* Submit Button */}
       <div className="mt-6 text-left"> {/* Changed alignment */}
         <button
            type="button" // Use type="button" if not submitting a <form> element
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Product"}
          </button>
       </div>
    </div>
  );
};

export default AddingProductsPage; // Renamed export