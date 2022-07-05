import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ to, isAuth }) => {
  if (isAuth === false) {
    return <Navigate to={to} />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
