// features/admin/presentation/components/AdminSidebar.tsx
import { NavLink } from "react-router-dom";

type AdminSidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const AdminSidebar = ({ isOpen, toggleSidebar }: AdminSidebarProps) => {
  const menuItems = [
    { path: "/admin/products", label: "Manage Products" },
    { path: "/admin/orders", label: "Manage Orders" },
    { path: "/admin/add-category", label: "Manage Categories" },
    { path: "/admin/add-product", label: "Manage Products" },
  ];
  
  return (
    <>
      {/* Overlay for mobile - only appears when sidebar is open on mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - fixed position with higher z-index */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg p-6 pt-16 md:pt-6 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${isOpen ? "w-64" : "md:w-64"} overflow-y-auto`}
      >
        <h2 className="text-lg font-semibold mb-6 text-gray-900">Admin Menu</h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => {
                  // Close sidebar after navigation on mobile
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-900 hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;