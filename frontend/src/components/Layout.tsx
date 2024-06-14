import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
