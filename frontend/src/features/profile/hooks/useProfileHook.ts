import { Address, AddressFormValues } from './../../data/AdressModel';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../admin/data/models/ProductModel';
import { AuthService } from '../../Auth/data/AuthService';
import { UserService } from '../../data/UserService';
import toast from 'react-hot-toast';

// Validation function for address inputs
const validateAddress = (address: AddressFormValues): { isValid: boolean; errors: Partial<Record<keyof AddressFormValues, string>> } => {
  const errors: Partial<Record<keyof AddressFormValues, string>> = {};

  // Country validation
  if (!address.country || address.country.trim().length < 2) {
    errors.country = 'Country must be at least 2 characters long';
  }

  // Governorate validation
  if (!address.governorate || address.governorate.trim().length < 2) {
    errors.governorate = 'Governorate must be at least 2 characters long';
  }

  // Street validation
  if (!address.street || address.street.trim().length < 3) {
    errors.street = 'Street address must be at least 3 characters long';
  }

  // Phone validation (assuming Egyptian phone number format)
  const phoneRegex = /^(010|011|012|015)\d{8}$/;
  if (!address.phone || !phoneRegex.test(address.phone.replace(/\s+/g, ''))) {
    errors.phone = 'Invalid phone number. Must be an Egyptian mobile number (010/011/012/015 followed by 8 digits)';
  }

  // Postal Code validation (assuming 5-digit postal code)
  const postalCodeRegex = /^\d{5}$/;
  if (!address.postalCode || !postalCodeRegex.test(address.postalCode)) {
    errors.postalCode = 'Postal code must be 5 digits';
  }

  // Optional details can be of any length, so no validation needed

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const useProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const userAddress = user?.addresses;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressErrors, setAddressErrors] = useState<Partial<Record<keyof AddressFormValues, string>>>({});
  const [newAddress, setNewAddress] = useState<AddressFormValues>({
    country: '',
    governorate: '',
    street: '',
    phone: '',
    postalCode: '',
    details: ''
  });
  const wishList = useSelector((state: RootState) => state.user.detailedWishList) as Product[];

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

  useEffect(() => {
    dispatch(UserService.getAllWishListProducts());  
  }, [dispatch, userAddress]);

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

    // Clear specific field error when user starts typing
    if (addressErrors[name as keyof AddressFormValues]) {
      setAddressErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate address
    const { isValid, errors } = validateAddress(newAddress);
    
    if (!isValid) {
      // Set validation errors
      setAddressErrors(errors);
      
      // Show toast for first error
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      
      return;
    }

    // Clear any previous errors
    setAddressErrors({});

    dispatch(UserService.addingNewAddress(newAddress))
      .then(() => {
        dispatch(UserService.checkAuth()); // Refresh user state
        toast.success('Address added successfully');
        setNewAddress({
          country: '',
          governorate: '',
          street: '',
          phone: '',
          postalCode: '',
          details: '',
        });
        setIsAddressDialogOpen(false);
      })
      .catch((error) => {
        toast.error('Failed to add address');
      });
  };

  const handleSetDefaultAddress = (addressId: string) => {
    toast.success(`Address ${addressId} set as default`);
  };

  const handleRemoveAddress = (addressId: string) =>  {
    dispatch(UserService.removeAnAddress(addressId)).then(
      () =>
        dispatch(UserService.checkAuth())
      
    )
    toast.success(`Address ${addressId} removed`);

  };

  return {
    user,
    wishList,
    navigate,
    userAddress,
    isAddressDialogOpen,
    newAddress,
    addressErrors,
    handleLogout,
    handleRemoveFromWishlist,
    handleViewProduct,
    handleAddressInputChange,
    handleSubmitAddress,
    handleSetDefaultAddress,
    handleRemoveAddress,
    setIsAddressDialogOpen
  };
};