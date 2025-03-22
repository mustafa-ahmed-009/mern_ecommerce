import { useState } from "react";
import AddingNewBrandDialog from "../components/brands/AddingNewBrandDialog";
import BransList from "../components/brands/brandsList";

const AddingBrand = () => {
  const [categoryName, setCategoryName] = useState("");
  const [showAddingDialog, setShowAddingDialog] = useState(false); 
  return (
    <div>
      <div className="flex justify-between">
        <h2>اضف ماركة</h2>
        <button className="bg-black text-white rounded-2xl p-2" onClick={
         ()=>{setShowAddingDialog(true)}
        }>اضافة مركة جديدة</button>
      </div>
      
      {showAddingDialog && <AddingNewBrandDialog close={() => setShowAddingDialog(false)} />}
      <BransList/>

</div>
  );
};

export default AddingBrand;
