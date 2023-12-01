import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  const content = token ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );

  return content;
};

export default ProtectedRoutes;
