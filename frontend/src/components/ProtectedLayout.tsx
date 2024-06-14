import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { PiHouseSimpleFill } from "react-icons/pi";
import { IoMdChatbubbles } from "react-icons/io";
import ProfilePhoto from "../features/user/ProfilePhoto";

const ProtectedLayout = () => {
  const userId = useSelector(selectCurrentUserId);

  return (
    <div className=" min-h-screen flex flex-col md:flex-col-reverse  pb-16 md:pb-0 bg-white">
      <Outlet />

      <div className="bg-white fixed bottom-0 md:static flex z-[9999] justify-around items-center w-full border-t border-b py-2 md:justify-end md:gap-5 px-5">
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
