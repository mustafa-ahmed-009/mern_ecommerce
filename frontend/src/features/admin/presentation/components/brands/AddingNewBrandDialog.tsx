import React from "react";
import { FiUpload } from "react-icons/fi";
import useBrands from "../../hooks/brandsLIstHook";

interface AddingNewBrandDialogProps {
  close: () => void;
}

const AddingNewBrandDialog: React.FC<AddingNewBrandDialogProps> = ({
  close,
}) => {
  const {
    previewImage,
    brandName,
    setBrandName,
    handleImageChange,
    handleSubmit,
  } = useBrands();

  return (
    <div
      onClick={close}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div
        className="bg-white rounded-lg w-full p-2 max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          {/* Image Upload */}
          <label
            htmlFor="image"
            className="w-32 h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 flex flex-col justify-center items-center"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <FiUpload size={24} className="text-gray-400" />
            )}
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Brand Name Input */}
          <input
            type="text"
            placeholder="اكتب اسم الماركة"
            className="w-full m-2 border border-black rounded-2xl p-2"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end items-center gap-2">
            <button
              className="bg-red-500 rounded-2xl text-white px-3 py-2 cursor-pointer"
              onClick={close}
            >
              الغاء
            </button>
            <button
              className="bg-black rounded-2xl text-white px-3 py-2 cursor-pointer"
              onClick={() => handleSubmit(close)}
            >
              اضافة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingNewBrandDialog;
