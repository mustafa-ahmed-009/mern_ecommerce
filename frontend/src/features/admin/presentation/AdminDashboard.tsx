// features/admin/presentation/AdminDashboard.tsx
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./components/AdminSideBar";
import AddingProudctsPage from "./pages/AddingProudctsPage";
import AdminProductDetails from "./pages/AdminProductDetails";
import AddingCategory from "./pages/CategoriesManagementPage";
import OrdersManagement from "./pages/OrdersManagement";
import ProductManagementPage from "./pages/ProductManagementPage";

const AdminDashboard = () => {
  return (
    // Removed bg-gray-50 dark:bg-gray-900 - will inherit white bg
    // Added bg-white explicitly if needed
    <div className="relative min-h-screen bg-white">
      <AdminSidebar /> {/* Sidebar is fixed, outside the normal flow */}
      {/* Main Content Area */}
      <div className="ml-64 p-6">
        {" "}
        {/* Adjust padding as needed */}
        <Routes>
          {/* Routes remain the same */}
          <Route path="products" element={<ProductManagementPage />} />
          <Route
            path="products/adminproductdetails/:id"
            element={<AdminProductDetails />}
          />
          <Route path="orders" element={<OrdersManagement />} />
          {/* <Route path="add-brand" element={<AddingBarnds />} /> */}
          <Route path="add-category" element={<AddingCategory />} />
          <Route path="add-product" element={<AddingProudctsPage />} />
          {/* <Route index element={<YourAdminHomePage />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
