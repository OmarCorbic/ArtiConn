import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "./userApiSlice";
import { useState } from "react";
import { selectCurrentUserId } from "../auth/authSlice";
import Modal from "../../components/Modal";
import UserPhotoChange from "./UserPhotoChange";
import ProfilePhoto from "./ProfilePhoto";
import { FaMessage } from "react-icons/fa6";
import { MdReport } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../auth/authApiSlice";
import Spinner from "../../components/Spinner";

type Props = {
  userId: number | string | null;
};

const UserInfo = ({ userId }: Props) => {
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const loggedInUserId = useSelector(selectCurrentUserId);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const {
    data: userInfo,
    isLoading,
    isUninitialized,
    isFetching,
    isError,
    error,
  } = useGetUserInfoQuery({ userId });
  const user = userInfo?.user || null;
  const star = "\u2B50";
  const ratingStars = user && new Array(Math.floor(user?.rating)).fill(star);

  const handleLogOut = async () => {
    try {
      await logout({}).unwrap();
      navigate("/");
    } catch (error: any) {
      navigate("/");
      toast.error(error?.data?.message || error?.message || error);
    }
  };

  const toggleProfileOptions = () => {
    setShowProfileOptions((prev) => !prev);
  };

  const hideModal = (e: any) => {
    if (e.target.id === "modalBackground") {
      setShowPhotoOptions(false);
    }
  };

  const toggleFullBio = () => {
    setShowFullBio((prev) => !prev);
  };
  const toggleSkills = () => {
    setShowAllSkills((prev) => !prev);
  };

  if (isUninitialized || isLoading || isFetching) {
    return <Spinner />;
  }

  if (isError) {
    console.log(error);
    return <div>{error.data?.message || error.message || error.status}</div>;
  }

  const gridStyles = {
    display: "grid",
    gridTemplateRows: "2fr 30px 1fr auto auto",
    gridTemplateColumns: "1fr 1fr",
  };

  return (
    <div style={gridStyles} className="text-sm  gap-2 items-center md:w-1/2">
      {showPhotoOptions && (
        <Modal hideModal={hideModal}>
          <UserPhotoChange />
        </Modal>
      )}
      <button
        disabled={userId?.toString() !== loggedInUserId?.toString()}
        onClick={() => setShowPhotoOptions(true)}
        className="border overflow-hidden border-slate-300 rounded-full w-[64px] h-[64px] flex items-center justify-center text-3xl font-bold"
      >
        <ProfilePhoto userId={userId} />
      </button>
      {userId?.toString() !== loggedInUserId?.toString() ? (
        <div className="flex gap-2 justify-self-end md:justify-self-start">
          <button className=" h-10 border text-violet-500 rounded-full p-2 flex gap-2 items-center justify-center">
            Message <FaMessage size={15} />
          </button>
          <button className="w-10 h-10 border text-violet-500 rounded-full p-2 flex items-center justify-center">
            <MdReport size={20} />
          </button>
        </div>
      ) : (
        <div className="relative justify-self-end md:justify-self-start">
          {showProfileOptions && (
            <div className="absolute text-center border md:left-[30px] right-[30px] top-0 flex flex-col w-32 bg-white">
              <button onClick={handleLogOut} className="px-1 py-3 border-b">
                Log out
              </button>
              <Link
                to={`/private/profile/${userId}/edit`}
                className=" px-1 py-3"
              >
                Edit profile
              </Link>
            </div>
          )}
          <button onClick={toggleProfileOptions}>
            <IoIosSettings size={30} color="gray" />
          </button>
        </div>
      )}

      <div className="flex items-center font-bold text-base">
        <p>{user.username}</p>
      </div>
      <div className="flex border rounded-full p-1 gap-1 justify-self-end md:justify-self-start items-center">
        <div>{ratingStars}</div>
        <div className="border rounded-full p-1 w-[30px] h-[30px] flex items-center justify-center">
          {user.rating.toFixed(1)}
        </div>
      </div>
      <div className="col-span-2  text-xs text-slate-500 px-2 flex flex-col  ">
        <p>{user.email}</p>
        {user.phoneNumber && <p>{user.phoneNumber}</p>}
      </div>
      {user.biography && (
        <div className="col-span-2 border-slate-300  text-xs text-slate-700  overflow-auto">
          <div>Biography</div>
          <p className="text-slate-500 px-2 py-1 break-all">
            {showFullBio && user.biography}
            {user.biography?.slice(0, 100)}
            {user.biography?.length >= 100 && (
              <button
                onClick={toggleFullBio}
                className="font-bold text-violet-600"
              >
                . . . Show {showFullBio ? "less" : "more"}
              </button>
            )}
          </p>
        </div>
      )}

      <div className="col-span-2 grid grid-cols-2  gap-1 text-xs">
        {user.skills
          ?.split(" ")
          .slice(0, showAllSkills ? undefined : 4)
          .map((skill: string, i: number) => {
            return (
              <div
                key={i}
                className="bg-blue-300 px-2 py-1 rounded-full flex items-center justify-center"
              >
                {skill}
              </div>
            );
          })}

        {user.skills?.split(" ").length > 4 && (
          <button onClick={toggleSkills} className="col-span-2 text-xs">
            Show {showAllSkills ? "less" : "more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
