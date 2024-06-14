import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={` text-sm md:text-base`}>
      <div className="flex justify-between  items-center py-2 px-2 md:px-10 text-white font-bold">
        <NavLink to="/" className="text-lg md:text-2xl text-center">
          <span className="text-white  font-bold">Arti</span>
          <span className="text-cyan-200 font-bold">Conn</span>
          <p className="text-sm hidden md:block font-bold text-white">
            Everything you need done.
          </p>
        </NavLink>
        <div className="flex gap-4 ">
          <NavLink to="auth">Login</NavLink>
          <NavLink to="auth/register">Register</NavLink>
        </div>
      </div>
      <div className="relative  bg-gray-100 py-4 flex justify-center md:justify-end items-center px-2 md:px-10 text-gray-700 ">
        <div className={`flex gap-4  items-center`}>
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
