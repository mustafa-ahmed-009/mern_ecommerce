import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProductsService } from "../../data/services/ProductService";
import { AppDispatch, RootState } from "../../../../redux/store";

const ProductManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsList, loading, error } = useSelector((state:RootState) => state.products);

  useEffect(() => {
    dispatch(ProductsService.fetchAllProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {productsList.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductManagementPage;