import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ to, isAuth }) => {
  const loading = useSelector((state) => state.profile.loading);
  if (isAuth === false && loading === false) {
    <Navigate to={to} />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
