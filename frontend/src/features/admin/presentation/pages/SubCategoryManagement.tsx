import React, { useState } from "react";
import Dialog from "../../../../utils/components/Dialog";
import DropDownMenu from "../components/subCategory/DropDownMenu";
import SubCategoryItem from "../components/subCategory/subCategoryItem";
import useSubCategory from "../hooks/subCategoryHook";
import { SubCategoryModel } from "../../data/models/SubCategoryModel";
import toast from "react-hot-toast";

const AddingSubCategory = () => {
  const {
    categoriesNames,
    setSubCategoryName,
    getCategoryName,
    categoryName,
    subCategoryName,
    subCategories,
    createNewCategory,
    deleteSubCategory, // Add deleteSubCategory from the hook
    updateSubCategory, // Add updateSubCategory from the hook
  } = useSubCategory();

  const [editingSubCategory, setEditingSubCategory] = useState<SubCategoryModel | null>(null); // State for editing

  const handleEdit = (subCategory: SubCategoryModel) => {
    setEditingSubCategory(subCategory); // Set the subcategory to edit
  };

  const handleSaveEdit = () => {
    if (editingSubCategory) {
      const updatedName = (document.querySelector("#edit-subcategory-name") as HTMLInputElement)?.value;
      if (updatedName) {
        updateSubCategory({ id: editingSubCategory._id, name: updatedName })
          .then(() => {
            setEditingSubCategory(null); // Close the edit modal
            toast.success("تم تعديل التصنيف الفرعي بنجاح");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    }
  };

  const handleDelete = (subCategoryId: string) => {
    deleteSubCategory(subCategoryId)
      .then(() => {
        toast.success("تم حذف التصنيف الفرعي بنجاح");
      })
      .catch((error:any) => {
        toast.error(error);
      });
  };

  return (
    <div>
      <h2>اضافة تصنيف فرعي جديد</h2>
      <input
        type="text"
        className="border border-black rounded-2xl m-2 p-2 w-full"
        placeholder="ادخل تصنيف فرعي جديد"
        onChange={(e) => setSubCategoryName(e.target.value)}
      />
      <DropDownMenu categoriesNames={categoriesNames} getCategoryName={getCategoryName} />
      <br />
      <button
        className="rounded-2xl bg-black text-white m-3 w-32 h-15"
        onClick={() => {
          createNewCategory(subCategoryName, categoryName);
        }}
      >
        خفظ التعديلات
      </button>

      {/* Edit Dialog */}
      {editingSubCategory && (
        <Dialog title="تعديل التصنيف الفرعي" onClose={() => setEditingSubCategory(null)}>
          <input
            id="edit-subcategory-name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder="اسم التصنيف الفرعي"
            defaultValue={editingSubCategory.name} // Pre-fill the input with the current name
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditingSubCategory(null)} // Close the modal
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              إلغاء
            </button>
            <button
              onClick={handleSaveEdit} // Save the changes
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              حفظ التعديلات
            </button>
          </div>
        </Dialog>
      )}

      {/* Display Subcategories in a List Tile Format */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">التصنيفات الفرعية</h3>
        {subCategories.map((subCategory) => (
          <SubCategoryItem
            key={subCategory._id}
            subCategory={subCategory}
            open={handleEdit} // Pass the edit handler
            onDelete={handleDelete} // Pass the delete handler
          />
        ))}
      </div>
    </div>
  );
};

export default AddingSubCategory;