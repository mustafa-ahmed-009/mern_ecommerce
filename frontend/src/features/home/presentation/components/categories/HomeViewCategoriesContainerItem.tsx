import React from "react";
import { Category } from "../../../data/models/CategoryModel";

interface CategoryItemProps {
  category:Category
}

const CategoryItem: React.FC<CategoryItemProps> = ({category}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={category.image} alt={category.name} className="rounded-full w-50 h-50 object-cover" />
      <h4 className="mt-2 text-center">{category?.name ?? "test"}</h4>
    </div>
  );
};

export default CategoryItem;
