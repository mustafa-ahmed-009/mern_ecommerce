import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { CategoriesService } from "../../data/services/CategoriesService";
import { ProductsService } from "../../data/services/ProductService";
import { SubCategoriesService } from "../../data/services/SubCategoryService";

// Define types for the form data and images
interface AdditionalImage {
  file: File;
  preview: string;
}

interface SubCategoryOption {
  value: string;
  label: string;
}

const useProductManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    try {
      dispatch(CategoriesService.fetchAllCategories({})).unwrap();
      dispatch(SubCategoriesService.fetchAllSubCategories({})).unwrap();
    } catch (error: any) {
      toast.error(error);
    }
  }, []);

  const categoriesList = useSelector(
    (state: RootState) => state.categories.categoriesList,
  );

  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [priceAfterDiscount, setPriceBeforeDiscount] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Quantity field

  // State for images
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<AdditionalImage[]>(
    [],
  );

  // State for form errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State for subcategories and colors
  const [subCategories, setSubCategories] = useState<SubCategoryOption[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Constants for available colors and subcategory options
  const availableColors: string[] = ["black", "red", "white"];

  if (categoriesList.length > 0 && !mainCategory) {
    setMainCategory(categoriesList[0]._id);
  }
  // Handle color selection
  const handleColorSelection = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  // Handle cover image change
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove cover image
  const removeCoverImage = () => {
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview); // Clean up to prevent memory leaks
    }
    setCoverImage(null);
    setCoverImagePreview("");
  };

  // Handle additional image change
  const handleAdditionalImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const preview = URL.createObjectURL(file);
      setAdditionalImages([...additionalImages, { file, preview }]);
    }
  };

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages];
    URL.revokeObjectURL(newImages[index].preview); // Clean up to prevent memory leaks
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };

  // Validate form fields
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    if (!productName.trim()) {
      errors.productName = "اسم المنتج مطلوب";
      isValid = false;
    }
    if (!productDescription.trim()) {
      errors.productDescription = "وصف المنتج مطلوب";
      isValid = false;
    }
    if (!productPrice.trim()) {
      errors.productPrice = "سعر المنتج مطلوب";
      isValid = false;
    }
    if (!quantity) {
      errors.quantity = "الكمية مطلوبة";
      isValid = false;
    }
    if (!mainCategory) {
      errors.mainCategory = "التصنيف الرئيسي مطلوب";
      isValid = false;
    }
    if (!coverImage) {
      errors.coverImage = "صورة الغلاف مطلوبة";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  let myCategoryId = "";
  const transformCategoryToId = (categoryName: string) => {
    for (let index = 0; index < categoriesList.length; index++) {
      if (categoriesList[index].name === categoryName)
        myCategoryId = categoriesList[index]._id;
    }

    console.log(myCategoryId);
  };
  const subcategoryIds = subCategories.map((subcategory) => subcategory.value);

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form first
    if (!validateForm()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    transformCategoryToId(mainCategory);

    try {
      const formData = new FormData();
      formData.append("title", productName);
      formData.append("description", productDescription);
      formData.append("priceAfterDiscount", priceAfterDiscount);
      formData.append("price", productPrice);
      formData.append("quantity", quantity.toString());
      formData.append("category", mainCategory);

      subcategoryIds.forEach((id) => {
        formData.append("subcategories", id);
      });

      if (coverImage) {
        formData.append("imageCover", coverImage);
      }

      additionalImages.forEach((img) => {
        formData.append("images", img.file);
      });

      await dispatch(ProductsService.createProduct(formData)).unwrap();
      toast.success("product has benn succeffully added ");
    } catch (error: any) {
      const errorMessage =
        error.message ||
        error.response?.data?.message ||
        "حدث خطأ أثناء إضافة المنتج";
      toast.error(errorMessage);
      console.error("Product creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    categoriesList,
    productName,
    setProductName,
    productDescription,
    setProductDescription,
    priceAfterDiscount,
    setPriceBeforeDiscount,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    mainCategory,
    setMainCategory,
    coverImage,
    coverImagePreview,
    additionalImages,
    formErrors,
    isSubmitting,
    subCategories,
    setSubCategories,
    selectedColors,
    availableColors,
    handleColorSelection,
    handleCoverImageChange,
    removeCoverImage,
    handleAdditionalImageChange,
    removeAdditionalImage,
    handleSubmit,
  };
};

export default useProductManagement;
