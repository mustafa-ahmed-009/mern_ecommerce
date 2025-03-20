import React from 'react'
import CategoryItem from '../../../home/presentation/components/categories/HomeViewCategoriesContainerItem'
import { Category } from '../../../home/data/models/CategoryModel'
interface CategiesPageitemsProps {
  categories: Category[]
}
const CategiesPageitems: React.FC<CategiesPageitemsProps> = ({categories}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-3">
 
      {categories.map((category,index) => {
        return    <CategoryItem key={index} category={category}
        />
      })}
  </div>
  )
}

export default CategiesPageitems