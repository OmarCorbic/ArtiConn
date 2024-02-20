import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { PiHouseSimpleFill } from "react-icons/pi";
import { IoMdChatbubbles } from "react-icons/io";
import ProfilePhoto from "../features/user/ProfilePhoto";
import SearchBar from "./SearchBar";
import { FaBurger } from "react-icons/fa6";
import { useState } from "react";

const ProtectedLayout = () => {
  const userId = useSelector(selectCurrentUserId)?.toString();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = (e: any) => {
    const ul = e.target.nextElementSibling;
    ul.classList.toggle("max-h-80");
  };

  const categories = [
    {
      name: "Demands",
      subcategories: [
        "Electricity",
        "Plumbing",
        "Renovating",
        "Moving",
        "School work",
        "Gardening",
        "Cleaning",
        "Mechanic",
      ],
    },
    {
      name: "Services",
      subcategories: [
        "Electricity",
        "Plumbing",
        "Renovating",
        "Moving",
        "School work",
        "Gardening",
        "Cleaning",
        "Mechanic",
      ],
    },
    {
      name: "Workers",
      subcategories: [
        "Electrician",
        "Plumber",
        "Woodworker",
        "Student",
        "Gardener",
        "Maid",
        "Mechanic",
      ],
    },
  ];

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div className="h-screen justify-between flex flex-col md:flex-col-reverse bg-white">
      <div className="flex items-center p-2 border-b w-full md:hidden mr-auto">
        <button onClick={toggleSidebar}>
          <FaBurger />
        </button>
        <SearchBar />
      </div>
      <div className="overflow-auto flex-grow relative">
        {showSidebar && (
          <div className="w-40 sm:w-52 h-full absolute z-[9999] bg-white border-r overflow-auto">
            <ul className="space-y-1">
              {categories?.map((cat) => {
                return (
                  <li>
                    <button
                      onClick={handleClick}
                      className="w-full flex justify-between items-center bg-slate-100 px-4 py-2 rounded-md focus:outline-none"
                    >
                      {cat.name}
                      <svg
                        className="w-4 h-4 transform transition-transform"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-current text-gray-600"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    <ul className="max-h-0 overflow-hidden duration-200">
                      {cat.subcategories.map((sub) => {
                        return <li className="px-6 py-1 border-b">{sub}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <Outlet />
      </div>
      <div className=" flex justify-around items-center w-full bg-white border-t border-b py-2 md:justify-end md:gap-5 px-5">
        <div className="hidden md:flex items-center mr-auto ">
          <button onClick={toggleSidebar}>
            <FaBurger />
          </button>
          <SearchBar />
        </div>
        <Link
          className="w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center "
          to="/private"
        >
          <PiHouseSimpleFill color="purple" size={22} />
        </Link>
        <Link
          className="w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center "
          to="/private"
        >
          <IoMdChatbubbles color="purple" size={22} />
        </Link>
        <Link
          className="overflow-hidden w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center  text-xl font-bold"
          to={`/private/profile/${userId && userId}`}
        >
          <ProfilePhoto userId={userId} />
        </Link>
      </div>
    </div>
  );
};

export default ProtectedLayout;
