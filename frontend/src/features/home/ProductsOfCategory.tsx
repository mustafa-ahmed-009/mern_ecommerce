import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../admin/data/models/ProductModel';
import { ProductsService } from '../admin/data/services/ProductService';
import { CiHeart } from 'react-icons/ci';

const ProductsOfCategory = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { productsList, loading, error } = useSelector((state: RootState) => state.products); 
  useEffect(
    () => {
      dispatch(ProductsService.fetchAllProducts({}))
    },[]
  )
  const desiredProducts: Product[] = productsList.filter((product) => {
    console.log(product.category._id);
    console.log(`navigation id${id}` );
  return  product.category._id === id 
  })
  return (
<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 m-2'>
{desiredProducts.map((product) => {
  return <div className='' onClick={() => navigate(`/products/${product._id}`, {
    state:{product}
  })
  }>
          <img src={product.imageCover} alt="" className='border-1 rounded-2xl border-gray-300' />
          <p>{product.title}</p>
          <div className='flex justify-between'>
          <p className='text-red-600'>{ product.price}$</p>
          <CiHeart  size={30}/>
          </div>
        </div>
      })}
    </div>
  )
}

export default ProductsOfCategory