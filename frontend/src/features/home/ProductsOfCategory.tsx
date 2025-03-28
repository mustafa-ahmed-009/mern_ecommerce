import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../admin/data/models/ProductModel';
import { ProductsService } from '../admin/data/services/ProductService';
import { CiHeart } from 'react-icons/ci';
import { UserService } from '../data/UserService';
import { FaHeart } from 'react-icons/fa';

const ProductsOfCategory = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { productsList, loading, error } = useSelector((state: RootState) => state.products); 
  const userState = useSelector((state: RootState) => state.user.user); 
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
  return <div className=''>
    <div onClick={() => navigate(`/products/${product._id}`, {
  state:{product}
})
} >
    <img src={product.imageCover} alt="" className='border-1 rounded-2xl border-gray-300' />
    <p>{product.title}</p>
 </div>
          <div className='flex justify-between'>
          <p className='text-red-600'>{ product.price}$</p>
{userState?.wishlist.includes(product._id) ?       <FaHeart size={30} onClick={
        ()=>dispatch(UserService.removeProductFromWishList(product._id))
          }/>:  <CiHeart size={30} onClick={
            ()=>dispatch(UserService.addPrdouctToWishList(product._id))
              }/> }
          </div>
        </div>
      })}
    </div>
  )
}

export default ProductsOfCategory

