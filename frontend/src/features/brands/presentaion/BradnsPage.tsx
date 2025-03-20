import React from 'react'
import BrandsPageItems from './components/BrandPageItem'

const BradnsPage = () => {
  return (
    <div className='flex flex-col justify-between items-center gap-4'>
      
      <BrandsPageItems />
      <div className="join">
  <input
    className="join-item btn btn-square"
    type="radio"
    name="options"
    aria-label="1"
     />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
  <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
</div>
    </div>
  )
}

export default BradnsPage