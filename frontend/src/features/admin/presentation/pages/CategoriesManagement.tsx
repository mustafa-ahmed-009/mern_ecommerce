import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import CategoriesList from "../components/Categories/CategoriesList";
import AddCategory from "../components/Categories/AddCategory";

const CategoriesManagemntPage = () => {
  const [showAddCategory, setShowAddCategory] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button
          onClick={() => setShowAddCategory(true)}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus />
          Add Category
        </button>
      </div>

      {showAddCategory && (
        <AddCategory onClose={() => setShowAddCategory(false)} />
      )}

      <CategoriesList />
    </div>
  );
};

export default CategoriesManagemntPage;