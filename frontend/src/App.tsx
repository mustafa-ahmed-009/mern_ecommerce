import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeView from "./features/home/presentation/HomeView"
import Footer from "./utils/components/footer"
import NavBar from "./features/home/presentation/components/NavBar"
import LoginPage from "./features/Auth/presentation/pages/LoginPage"
import Cart from "./features/cart/presentation/components/Cart"
import RegisterPage from "./features/Auth/presentation/pages/RegisterPage"
import CategoriesPage from "./features/categories/presentation/AllCategoriesPage"
import BradnsPage from "./features/brands/presentaion/BradnsPage"
import ProductPage from "./features/products/presentation/ProductsPage"
import ProductDetails from "./features/products/presentation/ProductDetailsPage"
import PaymentMethodPage from "./features/cart/presentation/PaymentMethodPage"
import AdminDashboard from "./features/admin/presentation/AdminDashboard"
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
    <BrowserRouter> {/* Wrap everything inside BrowserRouter */}
      <NavBar />
        <Routes>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route index element={<HomeView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/allcategories" element={<CategoriesPage />} />
        <Route path="/brands" element={<BradnsPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/paymentmethod" element={<PaymentMethodPage />} />

        </Routes>
        <Toaster/>
    </BrowserRouter>
      
    </>
  )
}

export default App
