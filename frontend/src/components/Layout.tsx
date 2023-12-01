import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </div>
  );
};

export default Layout;
