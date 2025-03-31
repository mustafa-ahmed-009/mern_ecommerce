import React, { useEffect } from "react"; // Removed useState as promoCode state was commented out
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store"; // Adjust path if needed
import ErrorMessage from "../../../utils/components/ErroMessage"; // Adjust path if needed
import LoadingSpinner from "../../../utils/components/LoadingSpinner"; // Adjust path if needed
import { CartService } from "../data/CartService"; // Adjust path if needed
// Import toast if you uncomment the promo code error handling
// import { toast } from 'react-toastify';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart); // Assuming cart state is structured correctly
  const dispatch = useDispatch<AppDispatch>();

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(CartService.getUserCartItems());
  }, [dispatch]); // Added dispatch to dependency array

  // --- Event Handlers ---
  const handleQuantityIncrease = (itemId: string) => {
    dispatch(
      CartService.changeProductQuantity({
        cartItemId: itemId,
        increase: true,
      }),
    );
  };

  const handleQuantityDecrease = (itemId: string) => {
    dispatch(
      CartService.changeProductQuantity({
        cartItemId: itemId,
        increase: false,
      }),
    );
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(CartService.removeCartItem(itemId));
  };

  // --- Promo Code (Currently Commented Out) ---
  // const [promoCode, setPromoCode] = useState(""); // Uncomment if using promo codes
  // const handleApplyPromoCode = () => {
  //  try {
  //    // Ensure promoCode state is managed if uncommenting
  //    // dispatch(CartService.applyCoupon(promoCode)).unwrap();
  //    // toast.success("Coupon applied!"); // Add success feedback
  //  } catch (error:any) {
  //    // Extract error message more reliably if possible
  //    // const message = error?.message || "Failed to apply coupon";
  //    // toast.error(message);
  //  }
  // };

  const handleCheckout = () => {
    // Ensure cart data is available before navigating
    if (cart.cart?.totalCartPrice !== undefined) {
      navigate("/cart/checkout", {
        state: { total: cart.cart.totalCartPrice }, // Pass total in state
      });
    } else {
      console.error("Cart total price is not available for checkout.");
      // Optionally show an error toast to the user
    }
  };

  // --- Render Loading State ---
  if (cart.loading) {
    return <LoadingSpinner />;
  }

  // --- Render Error State ---
  // Ensure ErrorMessage component expects a specific prop like 'message'
  if (cart.error) {
    return <ErrorMessage message={cart.error || "Failed to load cart."} />;
  }

  // --- Cart Data ---
  // Provide default empty array to prevent errors if cart.cart is null/undefined
  const cartItems = cart.cart?.cartItems || [];
  const totalCartPrice = cart.cart?.totalCartPrice || 0; // Default to 0 if undefined

  // --- Render Component ---
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10"> {/* Added sticky header */}
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
        </div>
      </header>

      <div className="container mx-auto py-6 px-4">
        {/* Empty Cart Message */}
        {cartItems.length === 0 && !cart.loading ? ( // Check loading finished
          <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-sm">
            Your cart is empty.
          </div>
        ) : (
          // Cart Content Layout
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Cart Items Section */}
            <div className="lg:w-2/3 space-y-4">
              {cartItems.map((item) => (
                // --- RESPONSIVE PRODUCT CARD ---
                <div
                  key={item._id} // Use cart item's unique ID
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* Left Side (Image & Details) */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <img
                        src={item.image} // Assuming 'image' field exists
                        alt={item.title || 'Product Image'} // Add alt text
                        className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-32 object-contain flex-shrink-0 rounded" // Added rounded
                      />
                      <div>
                        <h3 className="text-base sm:text-lg font-medium leading-tight text-gray-900 hover:text-gray-700 cursor-pointer" onClick={() => navigate(`/products/${item._id}`)}> {/* Navigate on click */}
                          {item.title || "Product Title"} {/* Add fallback */}
                        </h3>
                        {/* Optional details like brand/color */}
                        {/* <p className="text-xs sm:text-sm text-gray-500 mt-1">Color: {item.color || 'N/A'}</p> */}
                      </div>
                    </div>

                    {/* Right Side (Price, Quantity, Remove) */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 mt-2 sm:mt-0">
                      <span className="text-base sm:text-lg font-bold text-gray-900 order-1 sm:order-none">
                        {item.price ? item.price.toLocaleString() : "0.00"} EGP {/* Added fallback */}
                      </span>
                      <div className="flex items-center order-3 sm:order-none mt-0 sm:mt-2">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleQuantityDecrease(item._id)}
                            className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity" // Accessibility
                          >
                            <CiCircleMinus size={18} />
                          </button>
                          <span className="px-2 sm:px-3 text-center min-w-[30px] sm:min-w-[40px] text-sm sm:text-base font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityIncrease(item._id)}
                            className="p-1 text-gray-600 hover:text-gray-900"
                            aria-label="Increase quantity" // Accessibility
                          >
                            <CiCirclePlus size={18} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="flex items-center text-xs sm:text-sm text-gray-500 hover:text-red-600 order-2 sm:order-none mt-0 sm:mt-2 transition-colors duration-150" // Smooth transition
                        aria-label="Remove item" // Accessibility
                      >
                        <CiTrash size={14}  className="mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
                // --- END RESPONSIVE PRODUCT CARD ---
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3 space-y-4 lg:sticky lg:top-24"> {/* Made summary sticky on large screens */}

              {/* Promo Code Input (Commented Out) */}
              {/* <div className="bg-white rounded-lg shadow-sm p-4">
                <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                <div className="flex">
                  <input
                    id="promo-code"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Added focus styles
                  />
                  <button
                    onClick={handleApplyPromoCode}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-150" // Style adjustments
                  >
                    Apply
                  </button>
                </div>
              </div> */}

              {/* Price Summary */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Order Summary</h2>
                {/* You could add Subtotal, Discount rows here if needed */}
                {/* Example Subtotal: */}
                {/* <div className="flex justify-between mb-2 text-sm text-gray-600">
                   <span>Subtotal</span>
                   <span>{subtotalPrice.toLocaleString()} EGP</span> // Calculate subtotal if needed
                </div> */}
                {/* Example Discount: */}
                {/* {cart.cart?.totalPriceAfterDiscount && cart.cart.totalPriceAfterDiscount < totalCartPrice && (
                   <div className="flex justify-between mb-2 text-sm text-green-600">
                     <span>Discount</span>
                     <span>-{(totalCartPrice - cart.cart.totalPriceAfterDiscount).toLocaleString()} EGP</span>
                   </div>
                )} */}
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      {totalCartPrice.toLocaleString()} EGP
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" // Style adjustments
                disabled={cartItems.length === 0} // Disable if cart is empty
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