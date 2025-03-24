import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminSidebar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const menuItems = [
    { path: "/admin/products", label: "إدارة المنتجات" },
    { path: "/admin/orders", label: "إدارة الطلبات" },
    { path: "/admin/add-brand", label: "أضف ماركة" },
    { path: "/admin/add-category", label: "أضف تصنيف" },
    { path: "/admin/add-product", label: "أضف منتج" },
  ];

  return (
    <div className="w-64 h-screen fixed right-0 bg-white shadow-lg p-6">
      <h2 className="text-lg font-semibold text-right mb-4">إدارة جميع المنتجات</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 text-right rounded-lg transition-colors ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
