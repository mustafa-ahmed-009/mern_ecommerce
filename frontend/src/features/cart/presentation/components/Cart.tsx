import React, { useState } from 'react';
import { CiTrash } from "react-icons/ci";
import { Navigate, useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  brand: string;
  color: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate(); 
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'آيفون XR بذاكرة سعة 128 جيجابايت ودعم تقنية 4G LTE مع تطبيق فيس',
      price: 34000,
      quantity: 3,
      image: 'https://btech.com/media/catalog/product/cache/4709f4e5925590e2003d78a7a1e77edb/a/p/apple-iphone-13-starlight_3.jpg',
      category: 'الإلكترونيات',
      brand: 'ابل',
      color: 'red'
    },
    {
      id: '2',
      name: 'آيفون XR بذاكرة سعة 128 جيجابايت ودعم تقنية 4G LTE مع تطبيق فيس',
      price: 34000,
      quantity: 1,
      image: 'https://btech.com/media/catalog/product/cache/4709f4e5925590e2003d78a7a1e77edb/a/p/apple-iphone-13-starlight_3.jpg',
      category: 'الإلكترونيات',
      brand: 'ابل',
      color: 'red'
    }
  ]);
  
  const [promoCode, setPromoCode] = useState<string>('');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleApplyPromoCode = () => {
    console.log('Applying promo code:', promoCode);
    // Logic to apply promo code would go here
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout');
    navigate("/cart/paymentmethod"); 

    // Checkout logic would go here
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-gray-100 min-h-screen" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold">عربة التسوق</h1>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-32 object-contain"
                    />
                    <div>
                      <span className="text-sm text-gray-500">{item.category}</span>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">:الماركة</span>
                        <span className="text-sm">{item.brand}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">:اللون</span>
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-lg font-bold">{item.price.toLocaleString()} جنية</span>
                    <div className="flex items-center mt-2">
                      <span className="text-sm ml-2">:الكمية</span>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
                        min="1"
                      />
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="flex items-center mt-2 text-gray-500 hover:text-red-500"
                    >
                      <CiTrash  size={16} className="ml-1" />
                      <span>ازالة</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 space-y-4">
            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex">
                <input 
                  type="text" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="كود الخصم"
                  className="flex-grow border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none"
                />
                <button 
                  onClick={handleApplyPromoCode}
                  className="bg-gray-900 text-white px-4 py-2 rounded-l-md"
                >
                  تطبيق
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between mb-2">
                <span>المجموع</span>
                <span>{calculateTotal().toLocaleString()} جنية</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي</span>
                  <span>{calculateTotal().toLocaleString()} جنية</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gray-900 text-white py-3 rounded-md mt-4 font-medium"
              >
                اتمام الشراء
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;