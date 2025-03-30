import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store"; // Adjust path if needed
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../admin/data/models/ProductModel"; // Adjust path if needed
import { ProductsService } from "../admin/data/services/ProductService"; // Adjust path if needed
import { CiHeart, CiShoppingCart } from "react-icons/ci"; // Added Cart Icon
import { UserService } from "../data/UserService"; // Adjust path if needed
import { FaHeart } from "react-icons/fa";
import LoadingSpinner from "../../utils/components/LoadingSpinner"; // Adjust path if needed
import ErrorMessage from "../../utils/components/ErroMessage"; // Adjust path if needed
import toast from "react-hot-toast";
import { CartService } from "../cart/data/CartService";

const ProductsOfCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: categoryId } = useParams<{ id: string }>(); // Rename id for clarity
  const navigate = useNavigate();

  const { productsList, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const userState = useSelector((state: RootState) => state.user.user);
  // Optional: Select cart state if needed for button logic (e.g., disable if item already in cart)
  // const cartState = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // Fetch products only if the list is empty or needs refreshing
    // Consider adding categoryId to dependencies if you want to refetch when category changes
    if (productsList.length === 0) {
      dispatch(ProductsService.fetchAllProducts({})); // Pass params if API supports filtering
    }
  }, [dispatch, productsList.length]); // Dependency array

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={`Failed to load products: ${error}`} />
      </div>
    );
  }

  // --- Filtering ---
  // Ensure categoryId is available before filtering
  const desiredProducts: Product[] = categoryId
    ? productsList.filter((product) => product.category?._id === categoryId)
    : []; // Return empty array if no categoryId

  // --- Empty State (After filtering) ---
  if (!loading && desiredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">No Products Found</h2>
        <p className="text-gray-600">
          There are currently no products available in this category.
        </p>
        <button
          onClick={() => navigate("/")} // Navigate to home or main products page
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  // --- Add to Cart Handler ---
  const handleAddToCart = async (productId: string) => {
    if (!userState) {
      toast.error("Please log in to add items to your cart.");
      // Optional: redirect to login
      // navigate('/login');
      return;
    }
    try {
      // Assuming addProductToCart returns the updated cart or a success message
      await dispatch(CartService.addAnItemToTheCart(productId)).unwrap();
      toast.success("Product added to cart!");
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      toast.error(err?.message || "Could not add product to cart.");
    }
  };

  // --- Wishlist Handlers ---
  const handleAddToWishlist = async (productId: string) => {
    if (!userState) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    try {
      await dispatch(UserService.addPrdouctToWishList(productId)).unwrap();
      toast.success("Added to wishlist!");
    } catch (err: any) {
      console.error("Failed to add to wishlist:", err);
      toast.error(err?.message || "Could not add product to wishlist.");
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    if (!userState) {
      // Should ideally not happen if icon is correct, but good failsafe
      toast.error("Please log in.");
      return;
    }
    try {
      await dispatch(UserService.removeProductFromWishList(productId)).unwrap();
      toast.error("Removed from wishlist."); // Use info or success
    } catch (err: any) {
      console.error("Failed to remove from wishlist:", err);
      toast.error(err?.message || "Could not remove product from wishlist.");
    }
  };

  // --- Render Product Grid ---
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional: Add category title here */}
      {/* <h1 className="text-2xl font-bold mb-6">Category: {desiredProducts[0]?.category?.name || 'Products'}</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {desiredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group" // group for potential hover effects
          >
            {/* Clickable Image Area */}
            <div
              className="relative cursor-pointer overflow-hidden"
              onClick={() =>
                navigate(`/products/${product._id}`, { state: { product } })
              }
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" // Slight zoom on hover
              />
              {/* Optional: Discount Badge */}
              {/* {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                       SALE
                    </span>
                 )} */}
            </div>

            {/* Content Area */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h3
                className="text-md font-semibold text-gray-800 mb-1 truncate hover:text-blue-600 cursor-pointer"
                title={product.title} // Show full title on hover
                onClick={() =>
                  navigate(`/products/${product._id}`, { state: { product } })
                }
              >
                {product.title}
              </h3>

              {/* Price */}
              <p className="text-lg font-bold text-red-600 mb-3">
                {/* Display discount price if available */}
                {product.priceAfterDiscount &&
                product.priceAfterDiscount < product.price
                  ? `${product.priceAfterDiscount.toFixed(2)}$`
                  : `${product.price.toFixed(2)}$`}
                {/* Show original price if discounted */}
                {product.priceAfterDiscount &&
                  product.priceAfterDiscount < product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {product.price.toFixed(2)}$
                    </span>
                  )}
              </p>

              {/* Action Buttons - pushed to bottom */}
              <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200 p-1"
                  title="Add to Cart" // Tooltip
                  aria-label="Add to Cart"
                >
                  <CiShoppingCart size={28} />
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() =>
                    userState?.wishlist.includes(product._id)
                      ? handleRemoveFromWishlist(product._id)
                      : handleAddToWishlist(product._id)
                  }
                  className={`p-1 transition-colors duration-200 ${
                    userState?.wishlist.includes(product._id)
                      ? "text-red-500 hover:text-red-400" // Style for already in wishlist
                      : "text-gray-500 hover:text-red-500" // Style for not in wishlist
                  }`}
                  title={
                    userState?.wishlist.includes(product._id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }
                  aria-label={
                    userState?.wishlist.includes(product._id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"
                  }
                >
                  {userState?.wishlist.includes(product._id) ? (
                    <FaHeart size={24} />
                  ) : (
                    <CiHeart size={28} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOfCategory;
