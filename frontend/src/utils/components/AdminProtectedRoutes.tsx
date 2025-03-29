// src/utils/components/AdminProtectedRoutes.tsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store"; // Adjust path if needed
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have this

const AdminProtectedRoutes = () => {
  const userSliceState = useSelector((state: RootState) => state.user);
  const { user, loading, error } = userSliceState;

  if (loading) {
    console.log("Admin Route: Still Loading Auth Check...");
    return ( <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div> );
  }

  if (error && !user) {
    console.error("Admin Route: Auth check failed with error, redirecting to login.", error);
    return <Navigate to="/login" replace />;
  }

  // --- ADD DETAILED LOGS HERE ---
  console.log("Admin Route Check (After Loading):");
  console.log("  User Object:", user); // Check if this is null or the user object
  console.log("  User Role:", user?.role); // Check the exact value of the role
  console.log("  Is user falsy?", !user);
  console.log("  Is role !== 'admin'?", user?.role !== "admin");
  // ---------------------------------

  if (!user || user.role !== "admin") {
    console.log(`Admin Route: Redirecting to '/' because !user (${!user}) or user.role !== 'admin' (${user?.role !== 'admin'})`);
    if (user && user.role !== "admin") {
         toast.error("You do not have permission to access this page.");
    }
    return <Navigate to="/" replace />;
  }

  console.log("Admin Route: Access Granted.");
  return <Outlet />;
};

export default AdminProtectedRoutes;