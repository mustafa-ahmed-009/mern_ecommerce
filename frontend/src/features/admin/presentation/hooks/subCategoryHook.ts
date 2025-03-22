import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { CategoriesService } from "../../data/services/CategoriesService";
import { SubCategoriesService } from "../../data/services/SubCategoryService";
import toast from "react-hot-toast";

const useSubCategory = () => {
    const [editingSubCategory, setEditingSubCategory] = useState(false);
  
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.categories.categoriesList
  );
  const subCategories = useSelector(
    (state: RootState) => state.subCategories.subCategoriesList
  );
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const categoriesNames = categories.map((category) => category.name);

  const getCategoryName = (category: string) => {
    setCategoryName(category);
  };

  useEffect(() => {
    dispatch(CategoriesService.fetchAllCategories({}));
    dispatch(SubCategoriesService.fetchAllSubCategories({}));
  }, [dispatch]);

  let rightCategoryId: string;
  const convertCategoryNameToid = (categoryName: string) => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === categoryName) {
        rightCategoryId = categories[i]._id;
      }
    }
  };
  const createNewCategory = async (
    subCategoryName: string,
    category: string
  ) => {
    if (!subCategoryName?.trim() || !categoryName?.trim()) {
      toast.error("برجاء كتابة اسم الصنف واختيار الصنف الفرعي");
      return; // Stop further execution if fields are empty
    }
    try {
      convertCategoryNameToid(categoryName);
      await dispatch(
        SubCategoriesService.createSubCategory({
          name: subCategoryName,
          category: rightCategoryId,
        })
      ).unwrap(); // Use .unwrap() to handle errors
      toast.success("Subcategory created successfully!");
    } catch (error: any) {
      toast.error(error); // Display the error message in a toast
    }
  };
  const deleteSubCategory = async (subCategoryId: string) => {
    try {
      await dispatch(SubCategoriesService.deleteSubCategory(subCategoryId)).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const updateSubCategory = async ({ id, name }: { id: string; name: string }) => {
    try {
      await dispatch(SubCategoriesService.updateSubCategory({ id, name })).unwrap();
    } catch (error) {
      throw error;
    }
  };
  return {
    categoriesNames,
    categoryName,
    setCategoryName,
    setSubCategoryName,
    subCategoryName,
    getCategoryName,
    subCategories,
    createNewCategory,
    editingSubCategory,
    setEditingSubCategory,
    deleteSubCategory,
    updateSubCategory
    // Return subcategories for display
  };
};

export default useSubCategory;
