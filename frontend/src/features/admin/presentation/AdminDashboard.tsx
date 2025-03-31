// features/admin/presentation/AdminDashboard.tsx
import { Navigate, Route, Routes } from "react-router-dom"; // Import Navigate
import AdminSidebar from "./components/AdminSideBar";
import AddingProudctsPage from "./pages/AddingProudctsPage";
import AdminProductDetails from "./pages/AdminProductDetails";
import AddingCategory from "./pages/CategoriesManagementPage";
import OrdersManagement from "./pages/OrdersManagement";
import ProductManagementPage from "./pages/ProductManagementPage";

const AdminDashboard = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <AdminSidebar />
      {/* Main Content Area */}
      <div className="ml-64 p-6">
        <Routes>
          {/* Index Route: Redirects from /admin to /admin/products */}
          <Route index element={<Navigate to="products" replace />} />

          {/* Child Routes */}
          {/* Removed redundant 'index' prop from products route */}
          <Route path="products" element={<ProductManagementPage />} />
          <Route
            path="products/adminproductdetails/:id"
            element={<AdminProductDetails />}
          />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="add-category" element={<AddingCategory />} />
          <Route path="add-product" element={<AddingProudctsPage />} />

          {/* Optional: Add a catch-all or not-found route within admin if desired */}
          {/* <Route path="*" element={<div>Admin Section Not Found</div>} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;