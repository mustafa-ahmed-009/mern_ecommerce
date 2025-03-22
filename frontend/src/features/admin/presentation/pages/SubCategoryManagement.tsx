import { useEffect, useState } from "react";
import DropDownMenu from "../components/subCategory/DropDownMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { CategoriesService } from "../../data/services/CategoriesService";

const AddingSubCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categoriesList); 
  const [subCategoryName, setSubCategoryName] = useState(""); 
  const [categoryName, setCategoryName] = useState(""); // State variable

  const categoriesNames = categories.map((category) => category.name);
  const getCategoryName = (category:string) => {
    setCategoryName(category)
  }
  useEffect(
    () => {
      dispatch(CategoriesService.fetchAllCategories({})); 
    }
  ,[])
  return (

    <div>
      <button onClick={() => {
        categoriesNames.forEach((name)=>console.log(name)
        )
      }}>
        test
      </button>
      <h2>اضافة تصنيف فرعي جديد</h2>
      <input type="text" className="border border-black rounded-2xl m-2 p-2 w-full  " name="" id="" placeholder="ادخل تصنيف فرعي جديد" onChange={
        (e)=>setSubCategoryName(e.target.value) 
      } />
      <DropDownMenu categoriesNames={categoriesNames} getCategoryName={getCategoryName}/>
      <br />
      <button className="rounded-2xl bg-black text-white m-3 w-32 h-15" onClick={() => {
        
      }}>خفظ التعديلات</button>
</div>

  );
};

export default AddingSubCategory;
