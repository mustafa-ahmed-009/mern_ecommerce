import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthService } from '../../Auth/data/AuthService';
import { UserModel } from '../../Auth/data/UserModel';

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user) as UserModel;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(AuthService.logout());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
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
                <div className="mt-2 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user?.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
                  </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                    user?.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user?.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* User Details Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Account Information */}


              {/* Address Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Saved Addresses
                </h2>
                {user?.addresses?.length > 0 ? (
                  <div className="space-y-3">
                    {user.addresses.slice(0, 2).map((address, index) => (
                      <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="font-medium text-gray-800">{address.label || 'Primary Address'}</p>
                        <p className="text-sm text-gray-600">{address.street}</p>
                        <p className="text-sm text-gray-600">{address.city}, {address.country}</p>
                      </div>
                    ))}
                    {user.addresses.length > 2 && (
                      <button className="text-sm text-blue-600 hover:underline">
                        View all {user.addresses.length} addresses
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No addresses saved yet</p>
                    <button className="mt-2 text-sm text-blue-600 hover:underline">
                      Add new address
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
 
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
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