import React, { useEffect, useState } from "react"; // Make sure useEffect is imported
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store";
import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import { CategoriesService } from "../../../data/services/CategoriesService";
// Removed useState import from here as it's already imported above
import toast from "react-hot-toast";
import { FiUpload } from "react-icons/fi";

interface AddCategoryProps {
  onClose: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(""); // Explicitly string

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // Create a new object URL
      const newPreviewUrl = URL.createObjectURL(file);

      // Revoke the old URL *before* setting the new one in state
      // This prevents trying to revoke the URL while it might still be needed
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(newPreviewUrl);
    } else {
      // Handle case where user cancels file selection
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImage(null);
      setImagePreview("");
    }
  };

  // Correct: Use useEffect for cleanup
  useEffect(() => {
    // This is the setup function, but we only need the cleanup part.
    // The cleanup function runs when the component unmounts
    // or when `imagePreview` changes *before* the effect runs again.
    return () => {
      console.log("Cleaning up object URL:", imagePreview); // Optional: for debugging
      // Ensure we have a URL to revoke (it might be an empty string initially)
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]); // Dependency array: run cleanup when imagePreview changes or on unmount

  const handleSubmit = async () => {
    if (!categoryName || !image) {
      toast.error("Please enter the category name and image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", image); // image is the File object

    try {
      await dispatch(CategoriesService.createCategory(formData)).unwrap();
      toast.success("Category added successfully.");
      // Reset state *after* successful submission
      setCategoryName("");
      setImage(null);
      setImagePreview(""); // This will trigger the useEffect cleanup for the last URL
      onClose(); // Close the modal
      dispatch(CategoriesService.fetchAllCategories({})); // Refresh the categories list
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to add category. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to create category:", error); // Log the actual error
    }
  };

  // ... rest of the component code remains the same ...

  // Handle overlay click to close the modal
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Consider a local loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWrapper = async () => {
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    await handleSubmit(); // Call the actual submit logic
    setIsSubmitting(false);
  };

  // Using the global loading state might be okay if it reflects the creation status
  // if (state.loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md mx-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Category
        </h2>
        <div className="space-y-4">
          {/* Image Upload Area */}
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Category Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                  <FiUpload size={24} className="mb-2" />
                  <p className="text-sm">Upload Image</p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                disabled={isSubmitting} // Disable while submitting
              />
            </label>
          </div>

          {/* Category Name Input */}
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            disabled={isSubmitting} // Disable while submitting
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={isSubmitting} // Disable while submitting
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitWrapper} // Use the wrapper
              disabled={isSubmitting || !categoryName || !image} // Disable if submitting or form invalid
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        {/* Optional: show spinner inside modal during submission */}
        {isSubmitting && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default AddCategory;
