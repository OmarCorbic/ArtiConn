import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectCurrentUserId } from "../features/auth/authSlice";
import { PiHouseSimpleFill } from "react-icons/pi";
import { IoMdChatbubbles } from "react-icons/io";
import ProfilePhoto from "../features/user/ProfilePhoto";

const ProtectedLayout = () => {
  const userId = useSelector(selectCurrentUserId)?.toString();

  return (
    <div className="h-screen overflow-auto flex flex-col bg-white">
      <Outlet />
      <div className="flex justify-around mt-auto w-full bg-white border-t py-1">
        <Link
          className="w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center "
          to="/feed"
        >
          <PiHouseSimpleFill size={22} />
        </Link>
        <Link
          className="w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center "
          to="/feed"
        >
          <IoMdChatbubbles size={22} />
        </Link>
        <Link
          className="overflow-hidden w-11 h-11 border border-slate-300 rounded-full flex items-center justify-center  text-xl font-bold"
          to={`/profile/${userId && userId}`}
        >
          <ProfilePhoto userId={userId} />
        </Link>
      </div>
    </div>
  );
};

export default ProtectedLayout;
