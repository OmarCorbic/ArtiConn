import { useSelector } from "react-redux";
import { useGetUserInfoQuery } from "./userApiSlice";
import { useState } from "react";
import { selectCurrentUserId } from "../auth/authSlice";
import Modal from "../../components/Modal";
import UserPhotoChange from "./UserPhotoChange";
import ProfilePhoto from "./ProfilePhoto";

type Props = {
  userId?: string;
};

const UserInfo = ({ userId }: Props) => {
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const loggedInUserId = useSelector(selectCurrentUserId);

  const {
    data: userInfo,
    isLoading,
    isSuccess,
    error,
  } = useGetUserInfoQuery({ userId });
  const user = userInfo?.user || null;
  const star = "\u2B50";
  const ratingStars = user && new Array(Math.floor(user?.rating)).fill(star);

  const hideModal = (e: any) => {
    if (e.target.id === "modalBackground") {
      setShowPhotoOptions(false);
    }
  };

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>{error.message}</div>;
  }

  const gridStyles = {
    display: "grid",
    gridTemplateRows: "2fr 30px 1fr auto auto",
    gridTemplateColumns: "1fr 1fr",
  };

  if (isSuccess) {
    content = (
      <div style={gridStyles} className="text-sm  gap-2 items-center">
        {showPhotoOptions && (
          <Modal hideModal={hideModal}>
            <UserPhotoChange />
          </Modal>
        )}
        <div className="col-span-2 flex items-center justify-between">
          <button
            disabled={userId?.toString() !== loggedInUserId?.toString()}
            onClick={() => setShowPhotoOptions(true)}
            className="border overflow-hidden border-slate-300 rounded-full w-[64px] h-[64px] flex items-center justify-center text-3xl font-bold"
          >
            <ProfilePhoto userId={userId} />
          </button>
          <div className="flex w-32 justify-around">
            <button className="w-10 bg-blue-300 rounded-full p-1">PM</button>
            <button className="w-10 bg-blue-300 rounded-full p-1">!</button>
          </div>
        </div>
        <div className="flex items-center font-bold text-base">
          <p>{user.username}</p>
        </div>
        <div className="flex justify-end items-center">
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
              {user.biography?.slice(0, 100)}
              {user.biography?.length >= 100 && (
                <button className="font-bold"> . . . Show more</button>
              )}
            </p>
          </div>
        )}

        <div className="col-span-2 grid grid-cols-2 gap-1 text-xs">
          {user.skills?.split(" ").map((skill: string, i: number) => {
            return (
              <div
                key={i}
                className="bg-blue-300 px-2 py-1 rounded-full flex items-center justify-center"
              >
                {skill}
              </div>
            );
          })}

          {false && (
            <button className="col-span-2 text-xs">
              Show more (if more than 4)
            </button>
          )}
        </div>
      </div>
    );
  }
  return content;
};

export default UserInfo;
