import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./features/home/presentation/HomeView";
import Footer from "./utils/components/footer";
import NavBar from "./features/home/presentation/components/NavBar";
import LoginPage from "./features/Auth/presentation/pages/LoginPage";
import Cart from "./features/cart/presentation/components/Cart";
import RegisterPage from "./features/Auth/presentation/pages/RegisterPage";

import PaymentMethodPage from "./features/cart/presentation/PaymentMethodPage";
import AdminDashboard from "./features/admin/presentation/AdminDashboard";
import toast, { Toaster } from "react-hot-toast";
import ProductsOfCategory from "./features/home/ProductsOfCategory";
import ProductsPage from "./features/home/presentation/ProductsPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import ProfilePage from "./features/profile/presentation/ProfilePage";
import UserProtectedRoutes from "./utils/components/UserProtectedRoutes";
import AdminProtectedRoutes from "./utils/components/AdminProtectedRoutes";
import { UserService } from "./features/data/UserService";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(UserService.checkAuth());
  });
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
          <Route path="/cart/paymentmethod" element={<PaymentMethodPage />} />
          <Route element={<UserProtectedRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
