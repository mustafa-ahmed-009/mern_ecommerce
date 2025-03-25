import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";

const AdminProtectedRoutes = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.auth);
    if (state.user?.role !== "admin") {
      toast.error("you are not an admin to access this route")
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
export default AdminProtectedRoutes;
