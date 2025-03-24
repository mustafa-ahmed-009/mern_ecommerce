import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import Select from "react-select";
import useProductManagement from "../hooks/productPageHook";

const AddingProudctsPage = () => {
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
    categoriesList,
    coverImagePreview,
    additionalImages,
    formErrors,
    isSubmitting,
    setSubCategories,
    selectedColors,
    availableColors,
    subCategoryOptions,
    handleColorSelection,
    handleCoverImageChange,
    removeCoverImage,
    handleAdditionalImageChange,
    removeAdditionalImage,
    handleSubmit,
  } = useProductManagement();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-right">
      <h2 className="text-xl font-bold mb-4">إضافة منتج جديد</h2>

      {/* Cover Image Upload */}
      <div className="mb-4">
        <p className="text-gray-500 mb-2">صورة الغلاف (الصورة الرئيسية)</p>
        <div className="flex justify-center">
          {!coverImagePreview ? (
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleCoverImageChange}
              />
              <div
                className={`w-32 h-32 border-2 border-dashed ${
                  formErrors.coverImage ? "border-red-500" : "border-gray-300"
                } flex items-center justify-center`}
              >
                <div className="flex flex-col items-center">
                  <FaUpload className="mb-2" />
                  <span className="text-xs text-center">صورة الغلاف</span>
                </div>
              </div>
            </label>
          ) : (
            <div className="relative w-32 h-32 border border-gray-300">
              <img
                src={coverImagePreview}
                className="w-full h-full object-cover"
                alt="Product cover"
              />
              <button
                onClick={removeCoverImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
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

      {/* Additional Images */}
      <div className="mb-4">
        <p className="text-gray-500 mb-2">صور إضافية للمنتج</p>
        <div className="flex flex-wrap gap-2">
          {additionalImages.map((img, index) => (
            <div
              key={index}
              className="relative w-24 h-24 border border-gray-300"
            >
              <img
                src={img.preview}
                className="w-full h-full object-cover"
                alt={`Product ${index + 1}`}
              />
              <button
                onClick={() => removeAdditionalImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleAdditionalImageChange}
            />
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <FaUpload className="mb-1" />
                <span className="text-xs text-center">إضافة صورة</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Product Name */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="اسم المنتج"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full p-2 border ${
            formErrors.productName ? "border-red-500" : ""
          }`}
        />
        {formErrors.productName && (
          <p className="text-red-500 text-xs mt-1">{formErrors.productName}</p>
        )}
      </div>

      {/* Product Description */}
      <div className="mb-2">
        <textarea
          placeholder="وصف المنتج"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className={`w-full p-2 border ${
            formErrors.productDescription ? "border-red-500" : ""
          }`}
        />
        {formErrors.productDescription && (
          <p className="text-red-500 text-xs mt-1">
            {formErrors.productDescription}
          </p>
        )}
      </div>

      {/* Price Before Discount */}
      <input
        type="text"
        placeholder="السعر قبل الخصم"
        value={priceBeforeDiscount}
        onChange={(e) => setPriceBeforeDiscount(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Product Price */}
      <div className="mb-2">
        <input
          type="text"
          placeholder="سعر المنتج"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className={`w-full p-2 border ${
            formErrors.productPrice ? "border-red-500" : ""
          }`}
        />
        {formErrors.productPrice && (
          <p className="text-red-500 text-xs mt-1">{formErrors.productPrice}</p>
        )}
      </div>

      {/* Quantity Field */}
      <div className="mb-2">
        <input
          type="number"
          placeholder="الكمية"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={`w-full p-2 border ${
            formErrors.quantity ? "border-red-500" : ""
          }`}
        />
        {formErrors.quantity && (
          <p className="text-red-500 text-xs mt-1">{formErrors.quantity}</p>
        )}
      </div>

      {/* Main Category Dropdown */}
      <div className="mb-2">
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          className={`w-full p-2 border ${
            formErrors.mainCategory ? "border-red-500" : ""
          }`}
        >
          {categoriesList.map((category) => {
            return <option value={category.name}>{ category.name}</option>
          })}
    
        </select>
        {formErrors.mainCategory && (
          <p className="text-red-500 text-xs mt-1">{formErrors.mainCategory}</p>
        )}
      </div>

      {/* Subcategories Multi-Select using react-select */}
      <div className="mb-2">
        <p className="text-gray-500 mb-1">التصنيف الفرعي:</p>
        <Select
          options={subCategoryOptions}
          isMulti
          className="text-right"
          placeholder="اختر التصنيفات الفرعية..."
          onChange={(selectedOptions) =>
            setSubCategories(
              selectedOptions as { value: string; label: string }[]
            )
          }
        />
      </div>

      {/* Product Colors */}
      <div className="mb-4">
        <p className="text-gray-500">الألوان المتاحة للمنتج</p>
        <div className="flex gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${
                selectedColors.includes(color) ? "border-black" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelection(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الحفظ..." : "حفظ التعديلات"}
      </button>
    </div>
  );
};

export default AddingProudctsPage;
