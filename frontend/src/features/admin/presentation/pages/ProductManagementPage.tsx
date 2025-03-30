import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(ProductsService.fetchAllProducts({ page: 1, limit: 10 }));
    dispatch(CategoriesService.fetchAllCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-full grid grid-cols-5 gap-4 p-4">
      {" "}
      {/* Added w-full, gap-4, and p-4 */}
      {productsList.map((product) => (
        <div
          key={product.id}
          className="border border-black rounded-2xl overflow-hidden" // Added overflow-hidden
          onClick={() =>
            navigate(`adminproductdetails/${product.id}`, {
              state: { product, productsList },
            })
          }
        >
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-48 object-cover" // Constrained image size
          />

          <p className="p-2">{product.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductManagementPage;
