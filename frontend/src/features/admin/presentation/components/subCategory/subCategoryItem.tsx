import React from "react";
import { SubCategoryModel } from "../../../data/models/SubCategoryModel";

interface SubCategoryItemProps {
  subCategory: SubCategoryModel;
  open: (subCategory: SubCategoryModel) => void; // Pass the subcategory data
  onDelete: (subCategoryId: string) => void; // Pass the delete function
}

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ subCategory, open, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("هل أنت متأكد من حذف هذا التصنيف الفرعي؟")) {
      onDelete(subCategory._id); // Call the delete function
    }
  };

  return (
    <div className="space-y-4">
      <div
        key={subCategory._id}
        className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <div>
          <p className="text-lg font-medium">{subCategory.name}</p>
        </div>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => open(subCategory)} // Pass the subcategory data
          >
            تعديل
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleDelete} // Handle delete action
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryItem;