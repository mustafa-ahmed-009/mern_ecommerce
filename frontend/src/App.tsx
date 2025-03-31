import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/Auth/presentation/pages/LoginPage";
import RegisterPage from "./features/Auth/presentation/pages/RegisterPage";
import Cart from "./features/cart/presentation/CartPage";
import HomeView from "./features/home/presentation/HomeView";
import NavBar from "./features/home/presentation/components/NavBar";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import AdminDashboard from "./features/admin/presentation/AdminDashboard";
import { CartService } from "./features/cart/data/CartService";
import CheckOutPage from "./features/cart/presentation/PaymentMethodPage";
import { UserService } from "./features/data/UserService";
import ProductsOfCategory from "./features/home/ProductsOfCategory";
import ProductsPage from "./features/home/presentation/ProductsPage";
import OrdersPage from "./features/orders/presentation/OrdersPage";
import { ProfilePage } from "./features/profile/presentation/ProfilePage";
import { AppDispatch } from "./redux/store";
import AdminProtectedRoutes from "./utils/components/AdminProtectedRoutes";
import UserProtectedRoutes from "./utils/components/UserProtectedRoutes";
import { ProductsService } from "./features/admin/data/services/ProductService";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
try {
      dispatch(UserService.checkAuth()).then(() =>
        dispatch(CartService.getUserCartItems()).then(
        ()=>dispatch(ProductsService.fetchAllProducts({}))
      ),
    );
} catch (error) {
  
}
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        {" "}
        {/* Wrap everything inside BrowserRouter */}
        <NavBar />
        <Routes>
          <Route element={<AdminProtectedRoutes />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>
          <Route index element={<HomeView />} />
          <Route path="/categories/:id" element={<ProductsOfCategory />} />
          <Route path="/products/:id" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<UserProtectedRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart/checkout" element={<CheckOutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
