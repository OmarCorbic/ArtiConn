import UserInfo from "./UserInfo";
import UserAds from "./UserAds";
import { useParams } from "react-router-dom";

const UserProfileLayout = () => {
  const params = useParams();
  const userId = Number(params.id);
  return (
    <div className="overflow-auto">
      <div className="px-3 border-b py-5">
        <UserInfo userId={userId} />
      </div>
      <div className="px-1 py-3">
        <UserAds userId={userId} />
      </div>
    </div>
  );
};

export default UserProfileLayout;
