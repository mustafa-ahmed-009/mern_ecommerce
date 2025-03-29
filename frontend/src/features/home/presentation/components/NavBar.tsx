import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import logo from "../../../../assets/logo.png"; // Adjust path if needed
import { Link, useNavigate } from 'react-router-dom';
import { FaReceipt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CartService } from '../../../cart/data/CartService'; // Adjust path
import { AppDispatch, RootState } from '../../../../redux/store'; // Adjust path
// Removed LoadingSpinner and ErrorMessage imports as we won't replace the NavBar

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // --- Select User State ---
  // Adjust selector based on how you store authentication status/user data
  const userState = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!userState; // Simple check if user object exists

  // --- Select Cart State ---
  const cartState = useSelector((state: RootState) => state.cart);
  // Error and loading state from cart slice can still be useful for debugging or specific UI hints
  // const { cart, loading: cartLoading, error: cartError } = useSelector((state: RootState) => state.cart);

  // --- Fetch Cart Items Conditionally ---
  useEffect(() => {
    // ONLY fetch cart items if the user is authenticated
    if (isAuthenticated) {
      dispatch(CartService.getUserCartItems());
    }
    // If user logs out, you might want to clear the cart state in your user/auth slice reducer
    // Or handle it here if necessary, though slice is better.

  }, [dispatch, isAuthenticated]); // Re-run effect if authentication status changes

  // --- Calculate Cart Item Count Safely ---
  // Use optional chaining and nullish coalescing operator for safety
  const cartItemCount = cartState.cart?.cartItems?.length ?? 0;

  // --- Removed Early Returns for Loading/Error ---
  // The NavBar should always render. Loading/Errors from cart fetch
  // shouldn't prevent the navigation from showing.

  // Optional: Handle cart fetch error with a toast if desired (but maybe not in NavBar globally)
  // useEffect(() => {
  //   if (cartState.error) {
  //     // Avoid showing repeated errors, maybe check if it's a new error
  //     console.error("Cart fetch error:", cartState.error)
  //     // toast.error("Couldn't fetch cart details."); // Could be annoying in NavBar
  //   }
  // }, [cartState.error]);

  return (
    <nav className="flex items-center justify-between bg-[#2553D3] h-[12vh] px-4 md:px-8 relative w-full z-50">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-[60%] w-auto object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Search Bar */}
      <input
        type="text"
        className="bg-white text-center rounded-2xl px-4 py-1 w-full max-w-[300px] md:max-w-[400px] lg:max-w-[500px] focus:outline-none mx-4"
        placeholder="Search for a product" // Changed placeholder to English
      />

      {/* Desktop Icons */}
      <div className="hidden md:flex items-center gap-x-6">
        {/* Profile Link */}
        <Link to={isAuthenticated ? "/profile" : "/login"} className="text-white hover:text-gray-300 transition duration-200">
          <CgProfile className="text-3xl" />
           <span className="sr-only">{isAuthenticated ? "Profile" : "Login"}</span>
        </Link>

        {/* Cart Icon with Badge */}
        <Link to="/cart" className="relative text-white hover:text-gray-300 transition duration-200">
          <IoCartOutline className="text-3xl" />
          {/* Badge: Only show if count > 0 */}
          {cartItemCount > 0 && ( // Use safe cartItemCount
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
              {cartItemCount} {/* Display actual count */}
            </span>
          )}
           <span className="sr-only">Cart</span>
        </Link>

        {/* Orders Link (Conditionally show or disable if not logged in?) */}
        {isAuthenticated && ( // Example: Only show Orders if logged in
           <Link to="/orders" className="text-white hover:text-gray-300 transition duration-200">
             <FaReceipt className="text-3xl" />
             <span className="sr-only">Orders</span>
           </Link>
        )}
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-white text-3xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
           className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center py-4 space-y-6 md:hidden transition-transform duration-300 ease-in-out"
           onClick={() => setMenuOpen(false)}
        >
          {/* Mobile Profile/Login Link */}
          <Link to={isAuthenticated ? "/profile" : "/login"} className="hover:text-gray-400 transition duration-200">
            <CgProfile className="text-3xl" />
            <span className="sr-only">{isAuthenticated ? "Profile" : "Login"}</span>
          </Link>

          {/* Mobile Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-gray-400 transition duration-200">
            <IoCartOutline className="text-3xl" />
             {cartItemCount > 0 && ( // Use safe cartItemCount
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
                  {cartItemCount}
                </span>
             )}
             <span className="sr-only">Cart</span>
          </Link>

           {/* Mobile Orders Link */}
           {isAuthenticated && ( // Example: Only show Orders if logged in
              <Link to="/orders" className="hover:text-gray-400 transition duration-200">
                <FaReceipt className="text-3xl" />
                 <span className="sr-only">Orders</span>
              </Link>
           )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;