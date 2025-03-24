// features/admin/presentation/AdminDashboard.tsx
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import OrdersManagement from "./pages/OrdersManagement";
import AddingBarnds from "./pages/BrandsManagementPage";
import AddingCategory from "./pages/CategoriesManagementPage";
import AddingSubCategroy from "./pages/SubCategoryManagement";
import AddingProudctsPage from "./pages/AddingProudctsPage";
import AdminSidebar from "./components/AdminSideBar";
import ProductManagementPage from "./pages/ProductManagementPage";

// Admin page components

const AdminDashboard = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className="admin-layout" style={{ display: "flex", direction: "rtl" }}>
      <AdminSidebar />
      {/* Main Content Area */}
      <div
        className="admin-content"
        style={{
          marginRight: "250px",
          width: "calc(100% - 250px)",
          padding: "20px",
        }}
      >
        <Routes>
          <Route path="/products"   element={<ProductManagementPage />} />
          <Route path="orders" element={<OrdersManagement />} />
          <Route path="add-brand" element={<AddingBarnds />} />
          <Route path="add-category" element={<AddingCategory />} />
          <Route path="add-subcategory" element={<AddingSubCategroy />} />
          <Route path="add-product" element={<AddingProudctsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
