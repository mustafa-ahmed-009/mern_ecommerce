// src/views/home/components/FeaturedProducts.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Adjust path
// Assuming you have a reusable ProductCard or use inline styling
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../../redux/store";
import { ProductsService } from "../../../admin/data/services/ProductService";
import LoadingSpinner from "../../../../utils/components/LoadingSpinner";
import ErrorMessage from "../../../../utils/components/ErroMessage";
import { Product } from "../../../admin/data/models/ProductModel";

const FeaturedProducts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productsList, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    // Fetch products only if the list is empty.
    // Consider more specific fetching if your API supports 'featured' or sorting/limiting.
    // Example: Fetch first 8 products sorted by sales (if API supports sort=-sold)
    if (productsList.length === 0) {
      dispatch(ProductsService.fetchAllProducts({ limit: 8 })); // Fetch limited products
    }
  }, [dispatch, productsList.length]);

  // Determine which products to feature (e.g., first 8 from the fetched list)
  // You might apply different logic here based on how 'featured' is defined
  const featured = productsList.slice(0, 8);

  if (loading && productsList.length === 0) {
    // Show loading only on initial load
    return (
      <div className="flex justify-center items-center h-[30vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={`Could not load products: ${error}`} />;
  }

  if (!loading && featured.length === 0) {
    return (
      <p className="text-center text-gray-500 my-4">
        No featured products available at the moment.
      </p>
    );
  }

  // Reusable Product Card Component (Example Structure - Replace or use your actual card)
  const ProductCard = ({ product }: { product: Product }) => (
    <div
      key={product._id}
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col group cursor-pointer transform transition duration-300 hover:shadow-md hover:-translate-y-1"
      onClick={() =>
        navigate(`/products/${product._id}`, { state: { product } })
      }
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3
          className="text-sm font-semibold text-gray-700 mb-1 truncate h-10 leading-tight"
          title={product.title}
        >
          {product.title}
        </h3>
        <p className="text-md font-bold text-red-600 mt-auto pt-1">
          {product.priceAfterDiscount &&
          product.priceAfterDiscount < product.price
            ? `${product.priceAfterDiscount.toFixed(2)}$`
            : `${product.price.toFixed(2)}$`}
          {product.priceAfterDiscount &&
            product.priceAfterDiscount < product.price && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                {product.price.toFixed(2)}$
              </span>
            )}
        </p>
        {/* Optional: Add mini Add to Cart / Wishlist icons here */}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 my-6">
      {featured.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default FeaturedProducts;
