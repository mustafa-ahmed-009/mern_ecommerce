import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProductsService } from "../../data/services/ProductService";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { CategoriesService } from "../../data/services/CategoriesService";

const ProductManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsList, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(ProductsService.fetchAllProducts({ page: 1, limit: 10 }));
      await dispatch(CategoriesService.fetchAllCategories({ page: 1, limit: 10 }));
      setIsLoading(false);
    };
    
    fetchData();
  }, [dispatch]);

  if (loading || isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg text-center">
        <p className="text-red-600">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          onClick={() => dispatch(ProductsService.fetchAllProducts({ page: 1, limit: 10 }))}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!productsList.length) {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-gray-600">No products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {productsList.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              navigate(`adminproductdetails/${product.id}`, {
                state: { product, productsList },
              })
            }
          >
            <div className="relative pb-[60%]">
              <img
                src={product.imageCover}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800 truncate">{product.title}</h3>
              {product.price && (
                <p className="text-sm text-gray-600 mt-1">${product.price.toFixed(2)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagementPage;