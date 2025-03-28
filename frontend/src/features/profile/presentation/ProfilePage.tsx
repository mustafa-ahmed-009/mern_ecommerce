import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthService } from '../../Auth/data/AuthService';
import { UserModel } from '../../Auth/data/UserModel';
import { UserService } from '../../data/UserService';
import { Product } from '../../admin/data/models/ProductModel';
import { FaTrash, FaShoppingBag, FaMapMarkerAlt, FaPlus, FaEdit } from 'react-icons/fa';

// Dummy address data
const dummyAddresses = [
  {
    id: '1',
    label: 'Home',
    street: '123 Main Street',
    city: 'New York',
    country: 'United States',
    postalCode: '10001',
    isDefault: true
  },
  {
    id: '2',
    label: 'Work',
    street: '456 Business Ave',
    city: 'New York',
    country: 'United States',
    postalCode: '10002',
    isDefault: false
  }
];

interface DialogProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({ children, title = "Add Address", className, onClose }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white p-6 rounded-lg w-full max-w-md mx-4 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user) as UserModel;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);

  // Address form state
  const [newAddress, setNewAddress] = useState({
    label: '',
    street: '',
    city: '',
    country: '',
    postalCode: '',
    isDefault: false
  });

  const handleLogout = async () => {
    try {
      await dispatch(AuthService.logout());
      await dispatch(UserService.checkAuth());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  React.useEffect(() => {
    dispatch(UserService.getAllWishListProducts());  
  }, [dispatch]);

  const wishList = useSelector((state: RootState) => state.user.detailedWishList) as Product[];

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(UserService.removeProductFromWishList(productId));
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/products/${product._id}`, { state: { product } });
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would dispatch an action here
    console.log('New Address:', newAddress);
    toast.success('Address added successfully');
    // Reset form and close dialog
    setNewAddress({
      label: '',
      street: '',
      city: '',
      country: '',
      postalCode: '',
      isDefault: false
    });
    setIsAddressDialogOpen(false);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    // In a real app, dispatch an action to update default address
    toast.success(`Address ${addressId} set as default`);
  };

  const handleRemoveAddress = (addressId: string) => {
    // In a real app, dispatch an action to remove address
    toast.success(`Address ${addressId} removed`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {isAddressDialogOpen && (
        <Dialog title="Add New Address" onClose={() => setIsAddressDialogOpen(false)}>
          <form onSubmit={handleSubmitAddress} className="space-y-4">
            <div>
              <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
                Address Label
              </label>
              <input
                type="text"
                id="label"
                name="label"
                value={newAddress.label}
                onChange={handleAddressInputChange}
                placeholder="Home, Work, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressInputChange}
                  placeholder="New York"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
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
                  placeholder="10001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
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
                placeholder="United States"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={handleAddressInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
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
        </Dialog>
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

              {dummyAddresses.length > 0 ? (
                <div className="space-y-4">
                  {dummyAddresses.map((address) => (
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
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            >
                              <FaEdit className="mr-1" /> Set Default
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveAddress(address.id)}
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

export default ProfilePage;