import React, { useEffect, useState, useMemo } from "react"; // Import useMemo/useCallback
import { CgProfile } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaReceipt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce"; // Import debounce

// Adjust these paths based on your project structure
import logo from "../../../../assets/logo.png";
import { CartService } from "../../../cart/data/CartService";
import { AppDispatch, RootState } from "../../../../redux/store";
import { ProductsService } from "../../../admin/data/services/ProductService";
import { Product } from "../../../admin/data/models/ProductModel";

const DEBOUNCE_DELAY = 400; // Wait 400ms after user stops typing

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // --- Selectors (keep as before) ---
  const userState = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = !!userState;
  const cartState = useSelector((state: RootState) => state.cart);
  const cartItemCount = cartState.cart?.cartItems?.length ?? 0;
  const { searchedProductList, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  // --- Fetch Cart Items (keep as before) ---
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(CartService.getUserCartItems());
    }
  }, [dispatch, isAuthenticated]);

  // --- Create the debounced search dispatch function ---
  // useMemo ensures the debounced function is not recreated on every render
  const debouncedSearch = useMemo(() => {
    return debounce((term: string) => {
      if (term.trim()) {
        console.log(`Debounced search for: ${term}`); // For debugging
        dispatch(ProductsService.searchInProducts(term));
      }
    }, DEBOUNCE_DELAY);
  }, [dispatch]); // Dependency array includes dispatch

  // --- Handle Search Input Change ---
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTerm = e.target.value;
    setSearchTerm(currentTerm); // Update local state immediately for input value

    if (currentTerm.trim()) {
      setIsDropdownVisible(true); // Show dropdown immediately
      debouncedSearch(currentTerm); // Call the debounced function
    } else {
      setIsDropdownVisible(false); // Hide dropdown if input is empty
      debouncedSearch.cancel(); // Optional: Cancel any pending debounced call if input is cleared
      // Optional: Dispatch action to clear searchedProductList if needed
    }
  };

  // --- Cleanup debounced function on unmount ---
  useEffect(() => {
    // This cancels any pending debounced call when the component unmounts
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // --- Handle Clicking a Result (keep as before) ---
  const handleResultClick = (productId: string) => {
    setIsDropdownVisible(false);
    setSearchTerm("");
    debouncedSearch.cancel(); // Cancel any pending search
    navigate(`/products/${productId}`);
  };

  // --- Handle Clicking Outside Dropdown (keep as before) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".search-container")) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // --- JSX Structure remains the same ---
    <nav className="relative flex items-center justify-between bg-[#2553D3] h-[12vh] px-4 md:px-8 w-full z-50">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="h-[80%] w-auto object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Search Bar Container */}
      <div className="relative flex-grow mx-4 max-w-[300px] md:max-w-[400px] lg:max-w-[500px] search-container">
        <input
          onChange={handleSearchChange} // Use the updated handler
          value={searchTerm}
          type="text"
          className="bg-white text-center rounded-2xl px-4 py-1 w-full focus:outline-none"
          placeholder="Search for a product"
          onFocus={() => searchTerm && setIsDropdownVisible(true)}
        />

        {/* Search Results Dropdown (JSX remains the same) */}
        {isDropdownVisible && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
            {/* ... loading, error, list rendering ... */}
            {loading && (
              <div className="p-3 text-gray-500 text-center">Loading...</div>
            )}
            {error && (
              <div className="p-3 text-red-600 text-center">Error: {error}</div>
            )}
            {!loading &&
              !error &&
              searchedProductList.length === 0 &&
              searchTerm && (
                <div className="p-3 text-gray-500 text-center">
                  No results found.
                </div>
              )}
            {!loading && !error && searchedProductList.length > 0 && (
              <ul>
                {searchedProductList.map((product: Product) => (
                  <li key={product._id}>
                    <button
                      onClick={() => handleResultClick(product._id)}
                      className="w-full flex items-center gap-x-3 px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors duration-150"
                    >
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded flex-shrink-0 bg-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Price: {product.price}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Desktop Icons (JSX remains the same) */}
      <div className="hidden md:flex items-center gap-x-6">
        {/* ... icons ... */}
        <Link
          to={isAuthenticated ? "/profile" : "/login"}
          className="text-white hover:text-gray-300 transition duration-200"
        >
          <CgProfile className="text-3xl" />
          <span className="sr-only">
            {isAuthenticated ? "Profile" : "Login"}
          </span>
        </Link>

        <Link
          to="/cart"
          className="relative text-white hover:text-gray-300 transition duration-200"
        >
          <IoCartOutline className="text-3xl" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
              {cartItemCount}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Link>

        {isAuthenticated && (
          <Link
            to="/orders"
            className="text-white hover:text-gray-300 transition duration-200"
          >
            <FaReceipt className="text-3xl" />
            <span className="sr-only">Orders</span>
          </Link>
        )}
      </div>

      {/* Hamburger Menu Button (JSX remains the same) */}
      <button
        className="md:hidden text-white text-3xl z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <HiX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Menu (JSX remains the same) */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center py-4 space-y-6 md:hidden transition-transform duration-300 ease-in-out"
          onClick={() => setMenuOpen(false)}
        >
          {/* ... mobile links ... */}
          {/* Mobile Profile/Login Link */}
          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className="hover:text-gray-400 transition duration-200"
          >
            <CgProfile className="text-3xl" />
            <span className="sr-only">
              {isAuthenticated ? "Profile" : "Login"}
            </span>
          </Link>

          {/* Mobile Cart Icon with Badge */}
          <Link
            to="/cart"
            className="relative hover:text-gray-400 transition duration-200"
          >
            <IoCartOutline className="text-3xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-red-600 text-xs font-medium text-white">
                {cartItemCount}
              </span>
            )}
            <span className="sr-only">Cart</span>
          </Link>

          {/* Mobile Orders Link */}
          {isAuthenticated && (
            <Link
              to="/orders"
              className="hover:text-gray-400 transition duration-200"
            >
              <FaReceipt className="text-3xl" />
              <span className="sr-only">Orders</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
