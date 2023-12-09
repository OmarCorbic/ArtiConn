import UserInfo from "./UserInfo";
import UserAds from "./UserAds";
import { useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../auth/authApiSlice";
import toast from "react-hot-toast";

const UserProfileLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logout({}).unwrap();
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || error);
      navigate("/");
    }
  };

  return (
    <div className="py-2">
      {/* <button
        disabled={isLoading}
        onClick={handleLogOut}
        className="bg-red-400"
      >
        Log out
      </button> */}
      <div className="px-3">
        <UserInfo userId={params.id} />
      </div>
      <div className="px-1">
        <UserAds userId={params.id} />
      </div>
    </div>
  );
};

export default UserProfileLayout;
