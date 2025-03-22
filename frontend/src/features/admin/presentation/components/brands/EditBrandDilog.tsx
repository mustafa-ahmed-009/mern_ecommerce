import { useEffect, useState } from "react";  // Add useState
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import { Brand } from "../../../data/models/BrandModel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { BrandsService } from "../../../data/services/BranderService";

interface EditBrandProps {
  brand: Brand;
  onClose: () => void;
}

const EditBrand: React.FC<EditBrandProps> = ({ brand, onClose }) => {
  // Use local state in the component instead of from the hook
  const [brandName, setBrandName] = useState(brand.name);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(brand.image);
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.brands);

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!brandName) {
      toast.error("برجاء ادخال اسم الماركة");
      return;
    }

    const formData = new FormData();
    formData.append("name", brandName);
    if (image) {
      formData.append("image", image);
    }
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    dispatch(BrandsService.update({ id: brand._id, formData }))
      .unwrap()
      .then(() => {
        toast.success("تم تعديل الماركة بنجاح");
        onClose(); // Close the dialog
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-2xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">تعديل الماركة</h2>
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
          <div className="flex items-center justify-end">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
              {!previewImage && (
                <FiUpload size={24} className="text-gray-400" />
              )}
              {previewImage && (
                <img
                  src={previewImage}
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
            placeholder="اسم الماركة"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
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

export default EditBrand;