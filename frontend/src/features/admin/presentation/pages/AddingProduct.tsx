import { useState } from "react";
import Select from "react-select";

const AddingProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategories, setSubCategories] = useState<{ value: string; label: string }[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const availableColors = ["black", "red", "white"];

  const subCategoryOptions = [
    { value: "sub1", label: "التصنيف الأول" },
    { value: "sub2", label: "التصنيف الثاني" },
    { value: "sub3", label: "التصنيف الثالث" },
  ];

  const handleColorSelection = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md text-right">
      <h2 className="text-xl font-bold mb-4">إضافة منتج جديد</h2>

      {/* Product Image Upload */}
      <div className="flex justify-end mb-4">
        <label className="cursor-pointer">
          <input type="file" className="hidden" />
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center">
            📷
          </div>
        </label>
        <p className="text-gray-500 mr-2">صور المنتج</p>
      </div>

      {/* Product Name */}
      <input
        type="text"
        placeholder="اسم المنتج"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Product Description */}
      <textarea
        placeholder="وصف المنتج"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Price Before Discount */}
      <input
        type="text"
        placeholder="السعر قبل الخصم"
        value={priceBeforeDiscount}
        onChange={(e) => setPriceBeforeDiscount(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Product Price */}
      <input
        type="text"
        placeholder="سعر المنتج"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className="w-full p-2 border mb-2"
      />

      {/* Main Category Dropdown */}
      <select
        value={mainCategory}
        onChange={(e) => setMainCategory(e.target.value)}
        className="w-full p-2 border mb-2"
      >
        <option value="">التصنيف الرئيسي</option>
        <option value="category1">التصنيف الأول</option>
        <option value="category2">التصنيف الثاني</option>
      </select>

      {/* Subcategories Multi-Select using react-select */}
      <div className="mb-2">
        <p className="text-gray-500 mb-1">التصنيف الفرعي:</p>
        <Select
          options={subCategoryOptions}
          isMulti
          className="text-right"
          placeholder="اختر التصنيفات الفرعية..."
          onChange={(selectedOptions) => setSubCategories(selectedOptions as { value: string; label: string }[])}
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
      <button className="bg-black text-white px-4 py-2 rounded">حفظ التعديلات</button>
    </div>
  );
};

export default AddingProduct;
