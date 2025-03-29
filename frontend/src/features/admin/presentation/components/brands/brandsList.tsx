import React from "react";
import useBrands from "../../hooks/brandsLIstHook";
import LoadingSpinner from "../../../../../utils/components/LoadingSpinner";
import ConfirmationDialog from "../../../../../utils/components/ConfirmationDialog";
import EditBrand from "./EditBrandDilog";

const BransList = () => {
  const {
    brandsList,
    loading,
    error,
    editingBrand,
    deletingBrandId,
    setEditingBrand,
    setDeletingBrandId,
    handleDelete,
  } = useBrands();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {brandsList.map((brand) => (
        <div key={brand._id} className="bg-white p-4 rounded-lg shadow">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          <h3 className="text-lg font-semibold mt-2">{brand.name}</h3>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditingBrand(brand)} // Open the edit dialog
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
           edit
            </button>
            <button
              onClick={() => setDeletingBrandId(brand._id)} // Open the confirmation dialog
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
          remove
            </button>
          </div>
        </div>
      ))}

      {/* Render the EditBrand dialog if a brand is being edited */}
      {editingBrand && (
        <EditBrand
          brand={editingBrand}
          onClose={() => setEditingBrand(null)} // Close the dialog
        />
      )}

      {/* Render the ConfirmationDialog if a brand is being deleted */}
      {deletingBrandId && (
        <ConfirmationDialog
          isOpen={!!deletingBrandId} // Open the dialog if deletingBrandId is not null
          onClose={() => setDeletingBrandId(null)} // Close the dialog
          onConfirm={() => handleDelete(deletingBrandId)} // Confirm deletion
          message="هل أنت متأكد أنك تريد حذف هذا التصنيف؟"
        />
      )}
    </div>
  );
};

export default BransList;