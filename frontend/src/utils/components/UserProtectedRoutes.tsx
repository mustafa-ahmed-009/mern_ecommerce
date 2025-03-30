import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const UserProtectedRoutes = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  if (user == null) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
export default UserProtectedRoutes;
