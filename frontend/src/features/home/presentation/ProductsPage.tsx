import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Product } from '../../admin/data/models/ProductModel';

const ProductsPage = () => {
    const { id } = useParams(); 
    const location = useLocation();
    const product:Product = location.state?.product;
  return (
<div className='flex flex-col'>
<div className='flex flex-col sm:flex-row  gap-4 justify-center m-2'>
  <img 
    src={product.imageCover} 
    alt={product.title} 
    className='w-full sm:w-1/4 object-cover' 
    />
    <div className='w-full sm:w-3/4'>
    <p>{product.title}</p>
    <p>{product.price}</p>
                  <p>{product.description}</p>
                  <div className='flex gap-2'>
                  <div className='flex rounded-2xl border-2 justify-between p-4 w-1/12'>
                      <button className=''>-</button>
                      <p>value</p>
                      <button>+</button>

                      </div>
                      <button className='bg-primary text-white rounded-2xl w-1/3'>add to cart </button>

           </div>

         
  </div>
</div>
<p>Items like it</p>

</div>
        

  )
}

export default ProductsPage