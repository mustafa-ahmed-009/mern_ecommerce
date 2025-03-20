import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesService } from "../../../home/data/services/CategoriesService";
import { AppDispatch, RootState } from "../../../../redux/store";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../utils/components/LoadingSpinner";

const AddCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state.categories);

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null); // Store the File object
  const [imagePreview, setImagePreview] = useState(""); // Store the blob URL for preview

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file); // Store the File object
      setImagePreview(URL.createObjectURL(file)); // Generate a blob URL for preview
    }
  };

  const handleSubmit = async () => {
    if (!categoryName || !image) {
      toast.error("برجاء ادخال اسم المنتج والصورة");
      return;
    }

    // Prepare the FormData
    const formData = new FormData();
    formData.append("name", categoryName); // Append the category name
    formData.append("image", image); // Append the File object

    // Dispatch the createCategory thunk
    dispatch(CategoriesService.createCategory(formData))
      .unwrap()
      .then(() => {
        toast.success("تم اضافة الصنف بنجاح");
        setCategoryName("");
        setImage(null);
        setImagePreview("");
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  // Display the loading spinner if the state is loading
  if (state.loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-end bg-gray-100 p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">اضافة تصنيف جديد</h2>
      <div className="bg-white p-6 rounded-lg w-full shadow flex flex-col gap-4">
        <div className="flex items-center justify-end">
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
            {!imagePreview && <FiUpload size={24} className="text-gray-400" />}
            {imagePreview && (
              <img
                src={imagePreview} // Use the blob URL for preview
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
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-lg self-start disabled:bg-gray-400"
        >
          حفظ التعديلات
        </button>
      </div>
    </div>
  );
};

export default AddCategory;