import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { Brand } from "../../data/models/BrandModel";
import { useEffect, useState } from "react";
import { BrandsService } from "../../data/services/BranderService";
import toast from "react-hot-toast";

const useBrands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { brandsList, loading, error } = useSelector(
    (state: RootState) => state.brands,
  );

  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingBrandId, setDeletingBrandId] = useState<string | null>(null);

  // State for adding a new brand
  const [previewImage, setImagePreview] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [brandName, setBrandName] = useState<string>("");

  // Fetch all brands on mount
  useEffect(() => {
    dispatch(BrandsService.fetchAllBrands({}))
      .unwrap()
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  // Handle image upload
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (closeModal: () => void) => {
    if (!brandName || !image) {
      toast.error("برجاء ادخال اسم الماركة والصورة");
      return;
    }

    const formData = new FormData();
    formData.append("name", brandName);
    formData.append("image", image);

    dispatch(BrandsService.createBrand(formData))
      .unwrap()
      .then(() => {
        toast.success("تم اضافة الصنف بنجاح");
        setBrandName("");
        setImage(null);
        setImagePreview("");
        closeModal(); // Close the modal
        dispatch(BrandsService.fetchAllBrands({})); // Refresh the list
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  // Handle brand deletion
  const handleDelete = async (id: string) => {
    try {
      await dispatch(BrandsService.deleteBrand(id)).unwrap();
      toast.success("brand has been sucessfully removed ");
      dispatch(BrandsService.fetchAllBrands({})); // Refresh the list
    } catch (error) {
      toast.error("فشل في حذف التصنيف");
    } finally {
      setDeletingBrandId(null); // Close the confirmation dialog
    }
  };

  const handleEditSubmit = async (id: string, closeModal: () => void) => {
    if (!brandName) {
      toast.error("برجاء ادخال اسم الماركة");
      return;
    }

    const formData = new FormData();
    formData.append("name", brandName);
    if (image) {
      formData.append("image", image); // Append the new image if it exists
    }

    dispatch(BrandsService.update({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("تم تعديل الماركة بنجاح");
        setBrandName("");
        setImage(null);
        setImagePreview("");
        closeModal(); // Close the modal
        dispatch(BrandsService.fetchAllBrands({})); // Refresh the list
      })
      .catch((error: any) => {
        toast.error(error);
      });
  };

  return {
    brandsList,
    loading,
    error,
    editingBrand,
    deletingBrandId,
    previewImage,
    brandName,
    setBrandName,
    setEditingBrand,
    setDeletingBrandId,
    handleImageChange,
    handleSubmit,
    handleEditSubmit,
    handleDelete,
  };
};

export default useBrands;
