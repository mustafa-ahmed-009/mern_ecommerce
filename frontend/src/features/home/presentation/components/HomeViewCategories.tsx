import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../redux/store'
import { CategoriesService } from '../../../admin/data/services/CategoriesService';
import LoadingSpinner from '../../../../utils/components/LoadingSpinner';
import ErrorMessage from '../../../../utils/components/ErroMessage';
import { useNavigate } from 'react-router-dom';

const HomeViewCategories = () => {
    const dispatch = useDispatch<AppDispatch>(); 
    const { categoriesList, loading, error } = useSelector((state: RootState) => state.categories); 
    const navigate = useNavigate(); 
    useEffect(
        () => {
            dispatch(
                CategoriesService.fetchAllCategories({}) 
            );
        } ,[]
    );
    if (loading) {
        return <LoadingSpinner/>
    }
    if (error) {
        return <ErrorMessage message={error} />
    }
  return (
      <div className="min-h-[20vh] my-1 p-2">
          <h1 className='text-center m-1 '>Categories</h1>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {categoriesList.map((category) => (
      <div 
        key={category._id} // Always add a unique key
            className="rounded-2xl border  flex flex-col hover:shadow-lg transition-all h-full overflow-hidden"
            onClick={()=>navigate(`/categories/${category._id}`)}
      >

        <div className="relative aspect-square cursor-pointer">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />
            </div>
            <h3 className="text-lg font-semibold p-2 text-center truncate">
          {category.name}
        </h3>
      </div>
    ))}
  </div>
</div>
    
  )
}

export default HomeViewCategories