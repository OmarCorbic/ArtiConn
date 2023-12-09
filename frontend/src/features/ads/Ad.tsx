import ProfilePhoto from "../user/ProfilePhoto";
import { useDeleteAdMutation } from "./adsApiSlice";
import { selectCurrentUserId } from "../auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const Ad = ({ ad }: { ad: any }) => {
  const [showAdOptions, setShowAdOptions] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const loggedInUserId = useSelector(selectCurrentUserId);
  const [deleteAd] = useDeleteAdMutation();
  const clockCharacter = "🕒";

  useEffect(() => {
    const hideAdOptions = (e: any) => {
      if (e.target.id !== "options" && showAdOptions) {
        setShowAdOptions(false);
      }
    };

    window.addEventListener("click", hideAdOptions);

    return () => {
      window.removeEventListener("click", hideAdOptions);
    };
  });

  const handleDelete = async () => {
    try {
      await deleteAd({ adId: ad?.adId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const toggleAdOptions = () => {
    setShowAdOptions((prev) => !prev);
  };

  const hideModal = (e: any) => {
    if (e.target.id === "modalBackground") {
      setShowConfirm(false);
    }
  };

  const calculateTime = (ad: any) => {
    const current = new Date();

    let minutes =
      (current.getTime() - new Date(ad?.createdAt).getTime()) / 1000 / 60;

    let timeAgo;
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const leftoverMinutes = Math.floor(minutes - hours * 60);
      timeAgo = `${hours} h ${leftoverMinutes} min ago`;
    } else if (minutes >= 1) {
      timeAgo = `${Math.floor(minutes)} min ago`;
    } else {
      timeAgo = `${Math.floor((minutes / 60) * 1000)} sec ago`;
    }
    return timeAgo;
  };

  return (
    <div
      style={
        loggedInUserId === ad.userId
          ? { gridTemplateColumns: "1fr 1fr 20px" }
          : {}
      }
      className={`grid ${
        loggedInUserId === ad.userId ? "grid-cols-3 pl-4" : "grid-cols-2 px-4"
      } relative grid-rows-5 items-center border border-slate-300 rounded-lg py-3 text-sm w-full`}
    >
      {showConfirm && (
        <Modal hideModal={hideModal}>
          <div className="flex flex-col gap-4">
            <p className="text-base font-bold text-slate-700">
              Please confirm that you want to delete the selected ad:
            </p>
            <div className="pl-3">
              <p>{ad?.title}</p>
              <p>{ad?.description}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleDelete}
                className="py-2 w-1/3 px-2 rounded-sm bg-slate-300"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="py-2 w-1/3 px-2 rounded-sm bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      <div className="font-bold">
        <p>{ad?.title}</p>
      </div>
      <Link
        className="overflow-hidden justify-self-end rounded-full w-[32px] h-[32px] border border-slate-300 flex items-center justify-center text-xl font-bold"
        to={`/profile/${ad?.userId}`}
      >
        <ProfilePhoto userId={ad?.userId} />
      </Link>
      <div className="col-span-2 text-xs text-slate-500 px-2">
        <p>{ad?.description}</p>
      </div>
      <div className="col-span-2">
        {ad?.date &&
          clockCharacter + " " + new Date(ad?.date).toLocaleDateString()}
      </div>
      <div className="col-start-1 col-end-2">
        <span className="text-lime-500 font-bold">{ad?.payout} KM</span>
        <span> / </span>
        <span className="text-lime-500 font-bold">{ad?.payoutType}</span>
      </div>
      <div className="row-span-2 justify-self-end">
        {ad?.type === "demand" && (
          <button className="bg-amber-400 px-3 py-2 border border-orange-400 rounded-full">
            Apply
          </button>
        )}
        {ad?.type === "service" && (
          <button className="bg-blue-400 px-3 py-2 border border-blue-500 rounded-full">
            Contact
          </button>
        )}
      </div>
      <div className="text-[10px]   flex gap-2  col-start-1 col-end-2">
        <p>{calculateTime(ad)}</p>
        <p>{ad?.city}</p>
      </div>
      {loggedInUserId === ad?.userId && (
        <>
          <div className=" row-span-5 row-start-1 row-end-6 h-full w-full col-start-3 col-end-4 ">
            <div
              id="options"
              className={`${
                showAdOptions ? "w-1/3 " : "w-0"
              } flex flex-col gap-2 text-slate-700 text-base items-center justify-center duration-300 overflow-hidden absolute top-0 right-[20px] h-full bg-slate-200`}
            >
              <button id="options" className="bg-slate-300 w-full py-1">
                Edit ad
              </button>
              <button
                id="options"
                onClick={handleConfirm}
                className="bg-slate-300 w-full py-1"
              >
                Delete ad
              </button>
            </div>
            <button
              id="options"
              onClick={toggleAdOptions}
              className=" w-full h-full text-xl font-bold text-slate-600"
            >
              &#8942;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Ad;
