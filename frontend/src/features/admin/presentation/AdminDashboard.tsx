// features/admin/presentation/AdminDashboard.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./components/AdminSideBar";
import AddingProudctsPage from "./pages/AddingProudctsPage";
import AdminProductDetails from "./pages/AdminProductDetails";
import AddingCategory from "./pages/CategoriesManagementPage";
import OrdersManagement from "./pages/OrdersManagement";
import ProductManagementPage from "./pages/ProductManagementPage";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener("resize", checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile menu toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-primary text-white p-2 rounded-lg"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* AdminSidebar with open state */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area - adapts based on sidebar state */}
      <div
        className={`transition-all duration-300 p-4 md:p-6 ${
          sidebarOpen ? "md:ml-64" : "ml-0"
        } pt-16 md:pt-6`}
      >
        <Routes>
          {/* Index Route: Redirects from /admin to /admin/products */}
          <Route index element={<Navigate to="products" replace />} />
          {/* Child Routes */}
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