// import { useDeleteAdMutation } from "./adsApiSlice";

import { Link } from "react-router-dom";
import ProfilePhoto from "../user/ProfilePhoto";

const Ad = ({ ad }: { ad: any }) => {
  const clockCharacter = "🕒";
  // const [deleteAd] = useDeleteAdMutation();
  // const handleDelete = async () => {
  //   try {
  //     await deleteAd({ adId: ad.adId }).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const calculateTime = (ad: any) => {
    const current = new Date();
    let minutes =
      (current.getTime() - new Date(ad.createdAt).getTime()) / 1000 / 60;

    let timeAgo;
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const leftoverMinutes = Math.floor(minutes - hours * 60);
      timeAgo = `${hours}h ${leftoverMinutes}min ago`;
    }
    return timeAgo;
  };
  return (
    <div className="grid grid-cols-2 grid-rows-5 items-center border border-slate-300 rounded-3xl px-4 py-2 text-sm w-full">
      <div className="font-bold">
        <p>{ad.title}</p>
      </div>
      <Link
        className="overflow-hidden justify-self-end rounded-full w-[32px] h-[32px] border border-slate-300 flex items-center justify-center text-xl font-bold"
        to={`/profile/${ad.userId}`}
      >
        <ProfilePhoto userId={ad?.userId} />
      </Link>
      <div className="col-span-2 text-xs text-slate-500 px-2">
        <p>{ad.description}</p>
      </div>
      <div className="col-span-2">{ad.date && clockCharacter + ad.date}</div>
      <div>
        <span className="text-lime-500 font-bold">{ad.payout} KM</span>
        <span> / </span>
        <span className="text-lime-500 font-bold">{ad.payoutType}</span>
      </div>
      <div className="row-span-2 justify-self-end">
        {ad.type === "demand" && (
          <button className="bg-amber-400 px-3 py-2 border border-orange-400 rounded-full">
            Apply
          </button>
        )}
        {ad.type === "service" && (
          <button className="bg-blue-400 px-3 py-2 border border-blue-500 rounded-full">
            Contact
          </button>
        )}
      </div>
      <div className="text-[10px]   flex gap-2">
        <p>{calculateTime(ad)}</p>
        <p>{ad.city}</p>
      </div>
    </div>
  );
};

export default Ad;
