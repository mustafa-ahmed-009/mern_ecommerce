import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Product } from "../../admin/data/models/ProductModel"; // Adjust path if needed
import { useDispatch, useSelector } from "react-redux";
import { CartService } from "../../cart/data/CartService"; // Adjust path if needed
import { ProductsService } from "../../admin/data/services/ProductService"; // Adjust path if needed
import { UserService } from "../../data/UserService"; // Adjust path if needed
import { AppDispatch, RootState } from "../../../redux/store"; // Adjust path if needed
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import LoadingSpinner from "../../../utils/components/LoadingSpinner"; // Adjust path if needed
import ErrorMessage from "../../../utils/components/ErroMessage"; // Adjust path if needed
import toast from "react-hot-toast"; // Using react-hot-toast

// Assume you have a reusable ProductCard component (optional but recommended)
// import ProductCard from '../../components/ProductCard';

const ProductsPage = () => {
  const { id: productId } = useParams<{ id: string }>(); // Get product ID from URL parameters
  const location = useLocation(); // Access location state (for potential initial data)
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch<AppDispatch>(); // Hook to dispatch Redux actions

  // --- Local State for the main product being viewed ---
  // Try to get initial product data passed via navigation state
  const initialProductFromState = location.state?.product as
    | Product
    | undefined;
  // State to hold the fully loaded product data
  const [currentProduct, setCurrentProduct] = useState<Product | null>(
    initialProductFromState || null,
  );
  // State to track loading status for the *specific* product fetch
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(
    !initialProductFromState,
  ); // Start loading if no initial data passed
  // State to hold any error specific to fetching *this* product
  const [productError, setProductError] = useState<string | null>(null);

  // --- Redux State ---
  // Select necessary data from the Redux store
  const {
    productsList, // List of all products (used for 'Related Items')
    loading: loadingList, // Loading status for the *list* of products
    error: errorList, // Error status for the *list* of products
  } = useSelector((state: RootState) => state.products); // Select from the 'products' slice
  const userState = useSelector((state: RootState) => state.user.user); // Select user data (for wishlist/cart authentication)

  // --- Data Fetching Effect ---
  useEffect(() => {
    // Determine if we need to fetch the product data
    const shouldFetch =
      productId &&
      (!initialProductFromState || initialProductFromState._id !== productId);

    if (shouldFetch) {
      const fetchProduct = async () => {
        setIsLoadingProduct(true); // Set loading true locally
        setProductError(null); // Clear previous errors
        setCurrentProduct(null); // Clear previous product data
        try {
          // Dispatch the thunk to fetch the single product.
          // Assumes `fetchSingleProduct` is corrected to return the Product data on success.
          const fetchedProduct = await dispatch(
            ProductsService.fetchSingleProduct(productId),
          ).unwrap();
          setCurrentProduct(fetchedProduct); // Update local state with fetched data
        } catch (err: any) {
          // Handle errors from the fetch operation
          console.error("Failed to fetch product:", err);
          const errorMessage =
            typeof err === "string"
              ? err
              : err?.message || "Failed to load product details.";
          setProductError(errorMessage); // Set local error state
        } finally {
          setIsLoadingProduct(false); // Set loading false locally, regardless of success/error
        }
      };
      fetchProduct();
    } else if (initialProductFromState) {
      // If initial data from location state is valid and matches the ID, use it directly
      setCurrentProduct(initialProductFromState);
      setIsLoadingProduct(false); // Ensure loading is false
      setProductError(null); // Ensure no error is set
    } else if (!productId) {
      // Handle the case where no product ID is present in the URL
      setProductError("No product ID specified.");
      setIsLoadingProduct(false);
    }

    // Fetch the general list of products if it's empty (needed for 'Related Items')
    // This uses the loading/error state from the Redux 'products' slice
    if (productsList.length === 0) {
      dispatch(ProductsService.fetchAllProducts({})); // Pass params if needed
    }

    // Scroll to the top of the page when the component mounts or product ID changes
    window.scrollTo(0, 0);
  }, [productId, dispatch, initialProductFromState, productsList.length]); // Dependencies for the effect

  // --- Add to Cart Handler ---
  const handleAddToCart = async () => {
    if (!currentProduct) return; // Don't proceed if product data isn't loaded
    if (!userState) {
      // Check if user is logged in
      toast.error("Please log in to add items to your cart.");
      navigate("/login"); // Optionally redirect to login page
      return;
    }
    // Prevent adding if out of stock (already handled by button visibility, but good failsafe)
    if (currentProduct.quantity <= 0) {
      toast.error("This item is currently out of stock.");
      return;
    }

    try {
      // Dispatch the cart action. Assumes quantity 1.
      // Verify the exact payload expected by CartService.addAnItemToTheCart
      await dispatch(
        CartService.addAnItemToTheCart(currentProduct._id),
      ).unwrap();
      toast.success(`${currentProduct.title} added to cart!`);
    } catch (err: any) {
      // Handle potential errors during cart addition
      console.error("Failed to add to cart:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Could not add product to cart.";
      toast.error(errorMessage);
    }
  };

  // --- Wishlist Handlers ---
  const handleAddToWishlist = async () => {
    if (!currentProduct) return;
    if (!userState) {
      toast.error("Please log in to manage your wishlist.");
      return;
    }
    try {
      await dispatch(
        UserService.addPrdouctToWishList(currentProduct._id),
      ).unwrap();
      toast.success("Added to wishlist!");
    } catch (err: any) {
      console.error("Failed to add to wishlist:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Could not add to wishlist.";
      toast.error(errorMessage);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!currentProduct) return;
    if (!userState) {
      toast.error("Please log in.");
      return;
    }
    try {
      await dispatch(
        UserService.removeProductFromWishList(currentProduct._id),
      ).unwrap();
      toast.success("Removed from wishlist."); // Using success for consistency
    } catch (err: any) {
      console.error("Failed to remove from wishlist:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Could not remove from wishlist.";
      toast.error(errorMessage);
    }
  };

  // --- Calculate Related Products ---
  const relatedProducts = currentProduct
    ? productsList
        .filter(
          (p) =>
            p.category?._id === currentProduct.category?._id && // Match category ID
            p._id !== currentProduct._id, // Exclude the current product itself
        )
        .slice(0, 5) // Limit the number of related products shown
    : []; // Return empty array if currentProduct isn't loaded yet

  // --- Conditional Rendering: Loading State ---
  if (isLoadingProduct) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  // --- Conditional Rendering: Error State ---
  if (productError) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage message={`Error loading product: ${productError}`} />
        {/* Optional: Add a button to retry or go back */}
      </div>
    );
  }

  // --- Conditional Rendering: Product Not Found State ---
  // This catches cases where loading finished but currentProduct is still null
  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <p className="text-gray-600">
          The product details could not be loaded or the product does not exist.
        </p>
        <button
          onClick={() => navigate("/")} // Navigate to homepage
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  // --- Render Main Page Content ---
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Product Details Section: Image and Info */}
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mb-12">
        {/* Image Column */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">
          <img
            src={currentProduct.imageCover}
            alt={currentProduct.title}
            className="max-w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md border border-gray-200"
          />
          {/* TODO: Implement image gallery if product.images exists */}
        </div>

        {/* Details Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Category Link (Optional) */}
          {currentProduct.category?._id && currentProduct.category?.name && (
            <span
              className="text-sm text-gray-500 mb-2 hover:text-blue-600 cursor-pointer"
              onClick={() =>
                navigate(`/category/${currentProduct.category._id}`)
              }
            >
              {currentProduct.category.name}
            </span>
          )}

          {/* Product Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {currentProduct.title}
          </h1>

          {/* TODO: Add Ratings Display Component */}
          {/* e.g., <StarRating rating={currentProduct.ratingsAverage} count={currentProduct.ratingsQuantity} /> */}

          {/* Price Display */}
          <p className="text-3xl font-semibold text-red-600 mb-5">
            {/* Show discount price if available and less than original */}
            {currentProduct.priceAfterDiscount &&
            currentProduct.priceAfterDiscount < currentProduct.price
              ? `${currentProduct.priceAfterDiscount.toFixed(2)}$`
              : `${currentProduct.price.toFixed(2)}$`}
            {/* Show original price strikethrough if discounted */}
            {currentProduct.priceAfterDiscount &&
              currentProduct.priceAfterDiscount < currentProduct.price && (
                <span className="text-lg text-gray-400 line-through ml-3">
                  {currentProduct.price.toFixed(2)}$
                </span>
              )}
          </p>

          {/* Product Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {currentProduct.description}
          </p>

          {/* Stock Availability */}
          <p
            className={`mb-6 text-sm font-medium ${currentProduct.quantity > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {currentProduct.quantity > 0
              ? `In stock (${currentProduct.quantity} available)`
              : "Out of Stock"}
          </p>

          {/* Actions (Add to Cart, Wishlist) - Only shown if product is in stock */}
          {currentProduct.quantity > 0 && (
            <div className="flex items-center gap-4 mb-6">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow sm:flex-grow-0 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md shadow-sm transition duration-200 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2" // Ensure 'primary' color is defined in tailwind.config.js
                disabled={isLoadingProduct} // Can optionally disable if still loading
                aria-label="Add to cart"
              >
                <CiShoppingCart size={22} />
                Add to Cart
              </button>

              {/* Wishlist Toggle Button */}
              <button
                onClick={() =>
                  userState?.wishlist.includes(currentProduct._id)
                    ? handleRemoveFromWishlist()
                    : handleAddToWishlist()
                }
                className={`p-2 border rounded-md transition-colors duration-200 ${
                  userState?.wishlist.includes(currentProduct._id) // Check if item is in wishlist
                    ? "text-red-500 border-red-300 bg-red-50 hover:bg-red-100" // Styles when in wishlist
                    : "text-gray-500 border-gray-300 bg-white hover:text-red-500 hover:border-red-300" // Styles when not in wishlist
                }`}
                title={
                  userState?.wishlist.includes(currentProduct._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
                aria-label={
                  userState?.wishlist.includes(currentProduct._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }
              >
                {userState?.wishlist.includes(currentProduct._id) ? (
                  <FaHeart size={20} /> // Filled heart icon
                ) : (
                  <CiHeart size={24} /> // Outline heart icon
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You Might Also Like
          </h2>
          {/* Use loading/error state from Redux for the related products list */}
          {loadingList ? (
            <div className="flex justify-center p-8">
              <LoadingSpinner />
            </div>
          ) : errorList ? (
            <ErrorMessage
              message={`Could not load related products: ${errorList}`}
            />
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {/* Map through related products */}
              {relatedProducts.map((relatedProduct) => (
                // Recommended: Replace inline card with <ProductCard product={relatedProduct} key={relatedProduct._id} />
                <div
                  key={relatedProduct._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group p-3 text-center"
                >
                  <div
                    className="relative cursor-pointer overflow-hidden mb-2 group"
                    onClick={() => navigate(`/products/${relatedProduct._id}`)}
                  >
                    <img
                      src={relatedProduct.imageCover}
                      alt={relatedProduct.title}
                      className="w-full h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3
                    className="text-sm font-semibold text-gray-700 mb-1 truncate hover:text-blue-600 cursor-pointer h-10 flex items-center justify-center"
                    title={relatedProduct.title}
                    onClick={() => navigate(`/products/${relatedProduct._id}`)}
                  >
                    {relatedProduct.title}
                  </h3>
                  <p className="text-md font-bold text-red-600 mt-auto pt-2">
                    {relatedProduct.price.toFixed(2)}$
                  </p>
                  {/* Optional: Add mini cart/wishlist buttons to related items */}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
