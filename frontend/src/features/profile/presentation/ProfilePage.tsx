// components/ProfilePage.tsx
import React from 'react';
import { FaTrash, FaShoppingBag, FaMapMarkerAlt, FaPlus, FaEdit } from 'react-icons/fa';
import { useProfile } from '../hooks/useProfileHook';
import { AddressDialog } from './components/AddressDialogComponent';

export const ProfilePage = () => {
  const {
    navigate,
    user,
    wishList,
    userAddress,
    isAddressDialogOpen,
    newAddress,
    handleLogout,
    handleRemoveFromWishlist,
    handleViewProduct,
    handleAddressInputChange,
    handleSubmitAddress,
    handleSetDefaultAddress,
    handleRemoveAddress,
    setIsAddressDialogOpen
  } = useProfile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
{isAddressDialogOpen && (
  <AddressDialog title="Add New Address" onClose={() => setIsAddressDialogOpen(false)}>
    <form onSubmit={handleSubmitAddress} className="space-y-4">
      {/* Governorate Field */}
      <div>
        <label htmlFor="governorate" className="block text-sm font-medium text-gray-700 mb-1">
          Governorate
        </label>
        <input
          type="text"
          id="governorate"
          name="governorate"
          value={newAddress.governorate}
          onChange={handleAddressInputChange}
          placeholder="Cairo, Alexandria, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Street Field */}
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={newAddress.street}
          onChange={handleAddressInputChange}
          placeholder="123 Main St"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={newAddress.phone}
          onChange={handleAddressInputChange}
          placeholder="+201234567890"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Country Field */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          value={newAddress.country}
          onChange={handleAddressInputChange}
          placeholder="Egypt"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Postal Code Field */}
      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
          Postal Code
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={newAddress.postalCode}
          onChange={handleAddressInputChange}
          placeholder="12345"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Details Field */}
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
          Additional Details
        </label>
        <input
          type="text"
          id="details"
          name="details"
          value={newAddress.details}
          onChange={handleAddressInputChange}
          placeholder="Apartment number, building, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>



      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => setIsAddressDialogOpen(false)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Address
        </button>
      </div>
    </form>
  </AddressDialog>
)}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="absolute -bottom-16 left-6">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-indigo-700">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-6 pb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>

            {/* Wishlist Section */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaShoppingBag className="mr-2 text-gray-500" />
                My Wishlist
              </h2>
              {wishList?.length > 0 ? (
                <div className="space-y-4">
                  {wishList.map((product) => (
                    <div 
                      key={product._id} 
                      className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                    >
                      <img 
                        src={product.imageCover} 
                        alt={product.title} 
                        className="w-16 h-16 object-cover rounded-md mr-4 cursor-pointer"
                        onClick={() => handleViewProduct(product)}
                      />
                      <div className="flex-grow">
                        <h3 
                          className="text-sm font-medium text-gray-800 cursor-pointer hover:text-blue-600"
                          onClick={() => handleViewProduct(product)}
                        >
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500">${product.price}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromWishlist(product._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from Wishlist"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">Your wishlist is empty</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                  >
                    Explore Products
                  </button>
                </div>
              )}
            </div>

            {/* Addresses Section */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  My Addresses
                </h2>
                <button
                  onClick={() => setIsAddressDialogOpen(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  <FaPlus className="mr-2" />
                  Add Address
                </button>
              </div>

              {userAddress!.length > 0 ? (
                <div className="space-y-4">
                  {userAddress!.map((address) => (
                    <div 
                      key={address.id} 
                      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${address.isDefault ? 'border-blue-500' : 'border-transparent'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800 flex items-center">
                            {address.label}
                            {address.isDefault && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.country} {address.postalCode}</p>
                        </div>
                        <div className="flex space-x-2">
        
                          <button
                            onClick={() => {
                              handleRemoveAddress(address._id)
                            }}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center"
                            title="Remove address"
                          >
                            <FaTrash className="mr-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">You haven't added any addresses yet</p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};