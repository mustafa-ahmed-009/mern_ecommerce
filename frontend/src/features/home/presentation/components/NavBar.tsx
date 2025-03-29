import React, { useEffect } from 'react';
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import logo from "../../../../assets/logo.png"; // Adjust path if needed
import { Link, useNavigate } from 'react-router-dom';
import { FaReceipt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CartService } from '../../../cart/data/CartService';
import { AppDispatch, RootState } from '../../../../redux/store';
import LoadingSpinner from '../../../../utils/components/LoadingSpinner';
import ErrorMessage from '../../../../utils/components/ErroMessage';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>(); 
  useEffect(
    () => {
      dispatch(CartService.getUserCartItems())
    },[]
  )
  const state = useSelector((state: RootState) => state.cart); 
  if (state.loading) {
    return <LoadingSpinner />
    
  }
  if (state.error) {
    return ErrorMessage({
      message:state.error
    })
  }
  
  const cartItemCount = state.cart?.cartItems.length;
  return (
    <nav className="flex items-center justify-between bg-[#2553D3] h-[12vh] px-4 md:px-8 relative w-full z-50"> {/* Added z-index */}
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-[60%] w-auto object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Search Bar - Always Visible */}
      <input
        type="text"
        className="bg-white text-center rounded-2xl px-4 py-1 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] focus:outline-none mx-4" // Added horizontal margin
        placeholder="ابحث عن منتج"
      />

      {/* Desktop Icons (Hidden on small screens) */}
      <div className="hidden md:flex items-center gap-x-6"> {/* Increased gap slightly */}
        <Link to="/profile" className="text-white hover:text-gray-300 transition duration-200">
          <CgProfile className="text-3xl" />
        </Link>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative text-white hover:text-gray-300 transition duration-200">
          <IoCartOutline className="text-3xl" />
          {/* Badge: Only show if count > 0 (logic can be added later) */}
          {cartItemCount! > 0 && (
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
              {cartItemCount} {/* Display actual count */}
            </span>
          )}
        </Link>

        <Link to="/orders" className="text-white hover:text-gray-300 transition duration-200">
          <FaReceipt className="text-3xl" />
        </Link>
      </div>

      {/* Hamburger Menu Button - Visible on Small Screens */}
      <button
        className="md:hidden text-white text-3xl z-50" // Ensure button is clickable above menu if open
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"} // Accessibility
        aria-expanded={menuOpen}
      >
        {menuOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
           className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center py-4 space-y-6 md:hidden transition-transform duration-300 ease-in-out" // Added transition
           onClick={() => setMenuOpen(false)} // Close menu when clicking inside
        >
          <Link to="/profile" className="hover:text-gray-400 transition duration-200">
            <CgProfile className="text-3xl" />
            <span className="sr-only">Profile</span> {/* Screen reader text */}
          </Link>

          {/* Mobile Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-gray-400 transition duration-200">
            <IoCartOutline className="text-3xl" />
             {/* Badge: Only show if count > 0 */}
             {cartItemCount! > 0 && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
                  {cartItemCount} {/* Display actual count */}
                </span>
             )}
             <span className="sr-only">Cart</span>
          </Link>

          <Link to="/orders" className="hover:text-gray-400 transition duration-200">
            <FaReceipt className="text-3xl" />
             <span className="sr-only">Orders</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;