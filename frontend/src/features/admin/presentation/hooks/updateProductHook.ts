import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Product } from "../../data/models/ProductModel";
import toast from "react-hot-toast";
import { ProductsService } from "../../data/services/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../data/models/CategoryModel";
import { AppDispatch, RootState } from "../../../../redux/store";
interface AdditionalImage {
  file: File;
  preview: string;
}
const useUpdateProductHook = (product: Product, productsList:Category[]) => {
  const [productName, setProductName] = useState(product?.title || "");
  const [productDescription, setProductDescription] = useState(product?.description || "");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(product?.priceAfterDiscount || "");
  const [productPrice, setProductPrice] = useState(product?.price || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(product?.imageCover || "");
  const [replacingImageIndex, setReplacingImageIndex] = useState<number | null>(null);
  const [mainCategory, setMainCategory] = useState(product?.category?._id || ""); 
  const [additionalImages, setAdditionalImages] = useState<AdditionalImage[]>(
    product?.images?.map(image => ({
      preview: image,
      file: new File([], 'existing-image.jpg') // Dummy file for existing images
    })) || []
  );  


  const [selectedColors, setSelectedColors] = useState([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const categoriesList = useSelector((state: RootState) => state.categories.categoriesList); 
  const productState = useSelector((state: RootState) => state.products); 
  let isLoading = productState.loading; 
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
      
      if (replacingImageIndex !== null) {
        // Replace existing image
        const updatedImages = [...additionalImages];
        URL.revokeObjectURL(updatedImages[replacingImageIndex].preview); // Clean up old URL
        updatedImages[replacingImageIndex] = { file, preview };
        setAdditionalImages(updatedImages);
        setReplacingImageIndex(null);
      } else {
        // Add new image
        setAdditionalImages([...additionalImages, { file, preview }]);
      }
      
      event.target.value = ''; // Reset input to allow selecting same file again
    }
  };

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages];
    URL.revokeObjectURL(newImages[index].preview); // Clean up to prevent memory leaks
    newImages.splice(index, 1);
    setAdditionalImages(newImages);
  };
  let cateogoryId:string; 
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", productName);
      formData.append("description", productDescription);
      formData.append("priceAfterDiscount", priceAfterDiscount.toString());
      formData.append("price", productPrice.toString());
      formData.append("quantity", quantity.toString());
      formData.append("category", mainCategory);
  
      if (coverImage) {
        formData.append("imageCover", coverImage);
      }
  
      // Only append new images (filter out existing ones with dummy files)
      additionalImages.forEach((img) => {
        if (img.file.size > 0) {
          formData.append("images", img.file);
        }
      });
  
      // Log FormData contents
      console.log("--- FormData Contents ---");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, `[File] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(key, value);
        }
      }
  
      await dispatch(ProductsService.updateProduct({
        id: product._id,
        formData: formData
      })).unwrap();
  
      toast.success("product has been successfully updated ");
      navigate("/admin/products")
    } catch (error: any) {
      toast.error(error.message || "there was an error during update");
      console.error("Update error:", error);
    }
  };

  const handelDelete = (id:string) => {
try {
  dispatch(ProductsService.deleteProduct(id)).unwrap(); 
  navigate("/products")
  toast.success("product has been successfully removed ")
} catch (error:any) {
  toast.error(error); 
}
  }
  return {
      categoriesList,
    coverImage,
    categeriesList: productsList,
    coverImagePreview,
    productName,
    setProductName,
    productDescription,
    setProductDescription,
   priceAfterDiscount,
setPriceAfterDiscount,
    productPrice,
    setProductPrice,
    quantity,
    setQuantity,
    setCoverImagePreview,
    additionalImages,
    setAdditionalImages,
    mainCategory,
    setMainCategory,
    selectedColors,
    setSelectedColors,
    handleAdditionalImageChange,
    handleCoverImageChange,
    removeAdditionalImage,
    setReplacingImageIndex,
    removeCoverImage,
    handleUpdate, 
    handelDelete, 
    isLoading
  };
}
export default useUpdateProductHook;
