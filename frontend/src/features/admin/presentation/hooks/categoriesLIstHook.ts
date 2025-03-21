import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { CategoriesService } from "../../data/services/CategoriesService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "../../data/models/CategoryModel";

const useCategories = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const { categoriesList, loading, error } = useSelector((state: RootState) => state.categories); 
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
      null
    );
    useEffect(() => {
        dispatch(CategoriesService.fetchAllCategories({}))
          .unwrap()
          .catch((error) => {
            toast.error(error);
          });
    }, [dispatch]);
    
    const handleDelete = async (id: string) => {
        try {
          await dispatch(CategoriesService.deleteCategory(id)).unwrap();
          toast.success("تم حذف التصنيف بنجاح");
          dispatch(CategoriesService.fetchAllCategories({})); // Refresh the list
        } catch (error) {
          toast.error("فشل في حذف التصنيف");
        } finally {
          setDeletingCategoryId(null); // Close the confirmation dialog
        }
    };
    
    return {
        categoriesList,
        loading,
        error,
        editingCategory,
        deletingCategoryId,
        setEditingCategory,
        setDeletingCategoryId,
        handleDelete,
      };
}
export default useCategories;
