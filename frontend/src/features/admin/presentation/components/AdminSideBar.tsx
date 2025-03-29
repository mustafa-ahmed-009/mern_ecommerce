// features/admin/presentation/components/AdminSidebar.tsx
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const menuItems = [
    { path: "/admin/products", label: "Manage Products" },
    { path: "/admin/orders", label: "Manage Orders" },
    { path: "/admin/add-brand", label: "Add Brand" },
    { path: "/admin/add-category", label: "Add Category" },
    { path: "/admin/add-product", label: "Add Product" },
    // { path: "/admin", label: "Dashboard", end: true },
  ];

  return (
    // Sidebar background remains white
    <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg p-6 pt-16 md:pt-6 z-10">
      {/* Title text color (using default black/dark gray from root styles or add text-gray-900) */}
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Admin Menu</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              // end={item.end}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                  isActive
                    ? "bg-primary text-white" // Active: Primary background, white text
                    : "text-gray-900 hover:bg-gray-100" // Default: Dark text, light gray hover bg
                    // Removed dark mode classes as main bg is white
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