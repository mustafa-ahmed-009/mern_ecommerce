import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const UserProtectedRoutes = () => {
  // const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.auth);
  console.log(state.user);
  if (state.user == null) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};
export default UserProtectedRoutes;
