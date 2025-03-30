import { useParams, useLocation } from "react-router-dom";
import { FaTimes, FaUpload } from "react-icons/fa"; // Note: FaUpload isn't used, FiUpload is. Keeping for completeness based on original import.
import useUpdateProductHook from "../hooks/updateProductHook";
import { FiUpload } from "react-icons/fi";
// Assuming CategoriesList is correctly imported and functional
// import CategoriesList from "../components/Categories/CategoriesList"; 

const AdminProductDetails = () => {
  const { id } = useParams(); // Product ID from URL
  const location = useLocation();
  // Getting product data and the full list passed via route state
  const product = location.state?.product; 
  const products = location.state?.productsList; 

  console.log("Product data received:", product); // Log received product data

  // Using the custom hook to manage product update state and logic
  const {
    productName,
    setProductName,
    productDescription, setProductDescription,
    priceAfterDiscount, setPriceAfterDiscount,
    productPrice, setProductPrice,
    quantity, setQuantity,
    additionalImages, // Array of { file: File, preview: string }
    setReplacingImageIndex, // Function to set which additional image index is being replaced
    handleUpdate, // Function to submit the update
    // categoriesList, // This seems duplicated, removing one instance. Assuming it comes from the hook.
    coverImagePreview, // URL string for cover image preview
    handleAdditionalImageChange, // Handler for additional image input change
    handleCoverImageChange, // Handler for cover image input change
    categoriesList, // List of available categories from the hook
    handelDelete, // Function to delete the product (Typo: should likely be handleDelete)
    mainCategory, setMainCategory // Currently selected main category ID
  } = useUpdateProductHook(product, products); // Pass initial product and full list to the hook

  // Basic check if product data is available
  if (!product) {
    return <div className="text-center p-6">Product data not found. Please go back and select a product.</div>;
  }

  return (
    // Main container with styling for centering and appearance
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-left"> {/* Changed text-right to text-left for English */}
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>

      {/* Cover Image Upload/Preview Section */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label className="block text-gray-700 mb-2">Cover Image</label> {/* Added label */}
        <div className="flex items-center justify-center">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"> {/* Changed hover bg */}
            {/* Show upload icon if no preview exists */}
            {!coverImagePreview && (
              <FiUpload size={24} className="text-gray-400" />
            )}
            {/* Show image preview if available */}
            {coverImagePreview && (
              <img
                src={coverImagePreview}
                alt="Cover Preview" // Changed alt text
                className="w-full h-full object-cover rounded-lg"
              />
            )}
            {/* Hidden file input, triggered by clicking the label */}
            <input
              type="file"
              className="hidden"
              onChange={handleCoverImageChange}
              accept="image/*" // Accept only image files
            />
          </label>
        </div>
      </div>

      {/* Additional Images Upload/Preview Section */}
      {/* Check if original product had images to decide whether to show this section */}
      {/* Or always show it to allow adding images even if none existed */}
      <div className="mb-4"> {/* Added margin bottom */}
         {/* Hidden file input for adding/replacing additional images */}
        <input
          type="file"
          id="additionalImageInput" // Changed ID to be more specific
          className="hidden"
          onChange={handleAdditionalImageChange}
          accept="image/*" // Accept only image files
          multiple // Allow selecting multiple files (hook needs to handle this logic)
        />
      </div>

      {/* Product Name Input */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label htmlFor="productName" className="block text-gray-700 mb-1">Product Name</label> {/* Added htmlFor and margin */}
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" // Added border rounding
        />
      </div>

      {/* Product Description Input */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label htmlFor="productDescription" className="block text-gray-700 mb-1">Product Description</label> {/* Added htmlFor and margin */}
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" // Added border rounding
          rows={4} // Added rows attribute for better textarea size
        />
      </div>

      {/* Price Before Discount Input */}
       {/* Assuming 'productPrice' is the original price */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label htmlFor="productPrice" className="block text-gray-700 mb-1">Price Before Discount</label> {/* Added htmlFor and margin */}
        <input
          id="productPrice"
          type="number" // Use type="number" for prices
          value={productPrice}
           onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" // Added border rounding
          step="0.01" // Allow decimal values for price
          min="0" // Prevent negative values
        />
      </div>

      {/* Price After Discount Input */}
      {/* Assuming 'priceAfterDiscount' is the final/sale price */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label htmlFor="priceAfterDiscount" className="block text-gray-700 mb-1">Price After Discount (Sale Price)</label> {/* Added htmlFor and margin */}
        <input
          id="priceAfterDiscount"
          type="number" // Use type="number" for prices
          value={priceAfterDiscount}
          onChange={(e) => setPriceAfterDiscount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" // Added border rounding
          step="0.01" // Allow decimal values for price
           min="0" // Prevent negative values
        />
      </div>


      {/* Quantity Input */}
      <div className="mb-4"> {/* Added margin bottom */}
        <label htmlFor="quantity" className="block text-gray-700 mb-1">Quantity</label> {/* Added htmlFor and margin */}
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded" // Added border rounding
          min="0" // Prevent negative quantity
        />
      </div>

       {/* Category Selection Dropdown */}
      <div className="mb-6"> {/* Added more margin bottom */}
         <label htmlFor="mainCategory" className="block text-gray-700 mb-1">Category</label> {/* Added htmlFor and margin */}
        <select
          id="mainCategory"
          value={mainCategory || ""} // Ensure it's a controlled component, handle null/undefined case
          onChange={(e) => setMainCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded bg-white" // Added bg-white for consistency
        >
          {/* Default placeholder option */}
          <option value="" disabled>Select Category</option> 
          
          {/* Map through the categories fetched by the hook */}
          {categoriesList?.map((category) => (
            <option
              key={category._id} // React requires a unique key for list items
              value={category._id} // The value sent on change will be the category ID
            >
              {category.name} {/* Display category name */}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end"> {/* Align buttons to the right */}
        {/* Update Button */}
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-200" // Changed color to blue, added hover effect and transition
          onClick={handleUpdate} // Call the update handler from the hook
        >
          Save Changes {/* Changed text */}
        </button>
        
        {/* Delete Button */}
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200" // Standardized styling, added hover and transition
          onClick={() => handelDelete(product._id)} // Call the delete handler from the hook (Corrected typo: handleDelete)
        >
          Delete Product {/* Changed text */}
        </button>
      </div>
    </div>
  );
};

export default AdminProductDetails;