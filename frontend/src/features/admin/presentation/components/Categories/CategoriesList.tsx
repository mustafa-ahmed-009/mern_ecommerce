import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import EditCategory from "./EditCategory"; // Import the EditCategory component
import ConfirmationDialog from "../../../../../utils/components/ConfirmationDialog";
import useCategories from "../../hooks/categoriesLIstHook";

const CategoriesList = () => {
  const {
    categoriesList,
    loading,
    error,
    editingCategory,
    deletingCategoryId,
    setEditingCategory,
    setDeletingCategoryId,
    handleDelete,
  } = useCategories();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categoriesList.map((category) => (
        <div key={category._id} className="bg-white p-4 rounded-lg shadow">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditingCategory(category)} // Open the edit dialog
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              تعديل
            </button>
            <button
              onClick={() => setDeletingCategoryId(category._id)} // Open the confirmation dialog
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              حذف
            </button>
          </div>
        </div>
      ))}

      {/* Render the EditCategory dialog if a category is being edited */}
      {editingCategory && (
        <EditCategory
          category={editingCategory}
          onClose={() => setEditingCategory(null)} // Close the dialog
        />
      )}

      {/* Render the ConfirmationDialog if a category is being deleted */}
      {deletingCategoryId && (
        <ConfirmationDialog
          isOpen={!!deletingCategoryId} // Open the dialog if deletingCategoryId is not null
          onClose={() => setDeletingCategoryId(null)} // Close the dialog
          onConfirm={() => handleDelete(deletingCategoryId)} // Confirm deletion
          message="هل أنت متأكد أنك تريد حذف هذا التصنيف؟"
        />
      )}
    </div>
  );
};

export default CategoriesList;