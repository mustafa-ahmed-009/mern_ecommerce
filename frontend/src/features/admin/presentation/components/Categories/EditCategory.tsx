import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import { CategoriesService } from "../../../../home/data/services/CategoriesService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { Category } from "../../../../home/data/models/CategoryModel";

interface EditCategoryProps {
  category: Category; // Pass the category to edit
  onClose: () => void; // Function to close the dialog
}

const EditCategory: React.FC<EditCategoryProps> = ({ category, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.categories);

  const [categoryName, setCategoryName] = useState(category.name);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(category.image);

  // Update the form when the category prop changes
  useEffect(() => {
    setCategoryName(category.name);
    setImagePreview(category.image);
  }, [category]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!categoryName) {
      toast.error("برجاء ادخال اسم التصنيف");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    if (image) {
      formData.append("image", image); // Append the new image if it exists
    }

    dispatch(
      CategoriesService.updateCategory({ id: category._id, formData })
    )
      .unwrap()
        .then(() => {
          
        toast.success("تم تعديل التصنيف بنجاح");
            onClose();
            dispatch(CategoriesService.fetchAllCategories({}));// Close the dialog after successful update
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  // Handle overlay click to close the dialog
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick} // Close dialog when clicking outside
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent event bubbling
      >
        <h2 className="text-xl font-semibold mb-4">تعديل التصنيف</h2>
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              {!imagePreview && <FiUpload size={24} className="text-gray-400" />}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg text-right"
            placeholder="اسم التصنيف"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              إلغاء
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              حفظ التعديلات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;