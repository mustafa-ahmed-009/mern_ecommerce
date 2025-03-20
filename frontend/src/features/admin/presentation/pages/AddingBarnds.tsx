import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const AddingBrand = () => {
  const [categoryName, setCategoryName] = useState("");

  return (
    <div className="flex flex-col items-end bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">اضافة ماركة</h2>
      <div className="bg-white p-6 rounded-lg w-full shadow flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            <FiUpload size={24} className="text-gray-400" />
            <span className="text-sm text-gray-500">صورة التصنيف</span>
            <input type="file" className="hidden" />
          </label>
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg text-right"
          placeholder="اسم التصنيف"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button className="bg-black text-white px-6 py-2 rounded-lg self-start">
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
};

export default AddingBrand;
