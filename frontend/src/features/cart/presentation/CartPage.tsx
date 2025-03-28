import React, { useEffect, useState } from 'react';
import { CiTrash, CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { CartService } from '../data/CartService';
import LoadingSpinner from '../../../utils/components/LoadingSpinner';
import ErrorMessage from '../../../utils/components/ErroMessage';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const navigate = useNavigate(); 
  const cart = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const dispatch = useDispatch<AppDispatch>() ;
  useEffect(
    () => {
      dispatch(CartService.getUserCartItems()); 
  },[]
)
  // Placeholder functions (you'll implement actual logic)
  const handleQuantityIncrease = (itemId: string) => {
    dispatch(CartService.changeProductQuantity({
      cartItemId: itemId, 
      increase: true , 
    }))
  };

  const handleQuantityDecrease = (itemId: string) => {
    dispatch(CartService.changeProductQuantity({
      cartItemId: itemId, 
      increase: false , 
    }))
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(CartService.removeCartItem(itemId))
  };

  const handleApplyPromoCode = () => {
   try {
     dispatch(CartService.applyCoupon(promoCode)).unwrap()
   } catch (error:any) {
    toast.error(error);
    
   }
  };

  const handleCheckout = () => {
    // Implement checkout logic
    navigate('/cart/checkout', {
      state: { total: cart.cart?.totalCartPrice } // Wrap total inside an object
    });
  };


  if (cart.loading) {
    return LoadingSpinner(); 
  }
  if (cart.error) {
    return ErrorMessage({message:cart.error});
  }
  const cartItems = cart.cart?.cartItems || []; 

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">Shopping Cart</h1>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Your cart is empty
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        className="w-24 h-32 object-contain"
                      />
                      <div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">Brand:</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">Color:</span>
                          <div 
                            className="w-4 h-4 rounded-full" 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold">{item.price.toLocaleString()} EGP</span>
                      <div className="flex items-center mt-2">
                        <span className="text-sm ml-2">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityDecrease(item._id)}
                            className="p-1 text-gray-600 hover:text-gray-900"
                            disabled={item.quantity <= 1}
                          >
                            <CiCircleMinus size={20} />
                          </button>
                          <span className="px-3 text-center min-w-[40px]">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityIncrease(item._id)}
                            className="p-1 text-gray-600 hover:text-gray-900"
                          >
                            <CiCirclePlus size={20} />
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item._id)}
                        className="flex items-center mt-2 text-gray-500 hover:text-red-500"
                      >
                        <CiTrash size={16} className="ml-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 space-y-4">
              {/* Promo Code */}
              {/* <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="flex-grow border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none"
                  />
                  <button 
                    onClick={handleApplyPromoCode}
                    className="bg-gray-900 text-white px-4 py-2 rounded-l-md"
                  >
                    Apply
                  </button>
                </div>
              </div> */}

              {/* Price Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                {/* <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{calculateTotal().toLocaleString()} EGP</span>
                </div> */}
    
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{cart.cart?.totalPriceAfterDiscount != 0 ? cart.cart?.totalPriceAfterDiscount :cart.cart?.totalCartPrice} EGP</span>
                  </div>
                </div>
              </div>
                            <button 
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 text-white py-3 rounded-md mt-4 font-medium"
                >
                  Proceed to Checkout
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;