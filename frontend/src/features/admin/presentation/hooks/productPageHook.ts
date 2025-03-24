import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProductsService } from "../../data/services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { CategoriesService } from "../../data/services/CategoriesService";
import { BrandsService } from "../../data/services/BranderService";
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
  useEffect(
    () => {
      try {
        dispatch(CategoriesService.fetchAllCategories({})).unwrap();
        dispatch(SubCategoriesService.fetchAllSubCategories({})).unwrap()
      } catch (error: any) {
        toast.error(error)
      }
    }, []
  )

  const categoriesList = useSelector((state: RootState) => state.categories.categoriesList);

  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Quantity field

  // State for images
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<AdditionalImage[]>([]);

  // State for form errors
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // State for subcategories and colors
  const [subCategories, setSubCategories] = useState<SubCategoryOption[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Constants for available colors and subcategory options
  const availableColors: string[] = ["black", "red", "white"];


  // Handle color selection
  const handleColorSelection = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Handle cover image change
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleAdditionalImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!productName.trim()) errors.productName = "اسم المنتج مطلوب";
    if (!productDescription.trim()) errors.productDescription = "وصف المنتج مطلوب";
    if (!productPrice.trim()) errors.productPrice = "سعر المنتج مطلوب";
    if (!quantity) errors.quantity = "الكمية مطلوبة"; // Validate quantity
    if (!mainCategory) errors.mainCategory = "التصنيف الرئيسي مطلوب";
    if (!coverImage) errors.coverImage = "صورة الغلاف مطلوبة";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  let myCategoryId = ""
  const transformCategoryToId = (categoryName:string) => {
    for (let index = 0; index < categoriesList.length; index++) {
      if (categoriesList[index].name === categoryName)
        myCategoryId = categoriesList[index]._id; 
    }

    console.log(myCategoryId);
    
  }
  const subcategoryIds = subCategories.map((subcategory) => subcategory.value);



  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
  
    setIsSubmitting(true);
    transformCategoryToId(mainCategory);
  
    try {
      // Create FormData object to send to backend
      const formData = new FormData();
  
      // Add text fields
      formData.append("title", productName);
      formData.append("description", productDescription);
      formData.append("priceAfterDiscount", priceBeforeDiscount);
      formData.append("price", productPrice);
      formData.append("quantity", quantity.toString()); // Add quantity
      formData.append("category", myCategoryId);
  
      // Add each subcategory ID individually
      subcategoryIds.forEach((id) => {
        formData.append("subcategories", id); // Append each subcategory ID
      });
  
      // Add cover image
      if (coverImage) {
        formData.append("imageCover", coverImage);
      }
  
      // Add additional images
      additionalImages.forEach((img, index) => {
        formData.append(`images`, img.file);
      });
  
      // Log the form data for debugging
      console.log(subcategoryIds);
  
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      // Submit the form data
      await dispatch(ProductsService.createProduct(formData)).unwrap();

      toast.success("تم اضافة المنتج بنجاح");
    } catch (error: any) {
      // Handle different error types
      if (error.message) {
        toast.error(error.message);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("حدث خطأ أثناء إضافة المنتج");
      }
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
    priceBeforeDiscount,
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