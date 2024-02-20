import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className={location.pathname.startsWith("/private") ? "hidden" : "block"}
    >
      <div className="flex justify-between items-center py-2 px-2 md:px-10 text-white font-bold">
        <NavLink to="/" className="text-lg md:text-3xl text-center">
          <span className="text-white  font-bold">Arti</span>
          <span className="text-cyan-200  ml-1  font-bold">Conn</span>
          <p className="text-sm hidden md:block font-bold text-white">
            Everything you need done.
          </p>
        </NavLink>
        <div className="flex gap-4 text-sm md:text-lg">
          <NavLink to="/auth">Login</NavLink>
          <NavLink to="/auth/register">Register</NavLink>
        </div>
      </div>
      <div className="relative  bg-gray-100 py-4 flex justify-center md:justify-end items-center px-2 md:px-10 text-gray-500 text-sm lg:text-lg">
        {location.pathname === "/public-feed" && (
          <div className="absolute left-0 ml-2 bg-gray-100">
            <SearchBar />
          </div>
        )}
        <div className={`flex gap-4 text-sm lg:text-lg items-center`}>
          <NavLink
            className="border-b border-gray-100 transition duration-200 hover:border-gray-500"
            to="/public-feed"
          >
            Browse Work
          </NavLink>
          <NavLink
            className="border-b border-gray-100 transition duration-200 hover:border-gray-500"
            to="/contact"
          >
            Contact
          </NavLink>
          <NavLink
            className="border-b border-gray-100 transition duration-200 hover:border-gray-500"
            to="/about"
          >
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
