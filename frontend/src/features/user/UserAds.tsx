import { useState } from "react";
import Ad from "../ads/Ad";
import { useGetUserAdsQuery } from "./userApiSlice";
import { MdPlaylistRemove } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectCurrentUserId } from "../auth/authSlice";
import CreateNewAd from "../ads/CreateNewAd";
import AdPlaceholder from "../ads/AdPlaceholder";

type Props = { userId: number | string | null };

const UserAds = ({ userId }: Props) => {
  const { data, isLoading, isUninitialized, isFetching, isError, error } =
    useGetUserAdsQuery({
      userId,
    });
  const loggedInUserId = useSelector(selectCurrentUserId);
  const [showDemands, setShowDemands] = useState(false);

  if (isUninitialized || isLoading || isFetching) {
    return (
      <div className="px-1 py-2 flex justify-center flex-wrap gap-2">
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <div>{error.data?.message || error.message || error.status}</div>;
  }

  const services = data?.filter((ad: any) => ad.type === "service");
  const demands = data?.filter((ad: any) => ad.type === "demand");

  return (
    <div className="flex flex-col gap-2 ">
      {userId == loggedInUserId?.toString() && <CreateNewAd />}
      <div className="flex items-center justify-around text-sm  text-slate-500">
        <button
          className={`py-3 w-1/2 ${
            !showDemands && "text-blue-500 font-bold border-b "
          }`}
          onClick={() => setShowDemands(false)}
        >
          Services
        </button>
        <button
          className={`py-3 w-1/2 ${
            showDemands && "text-blue-500 font-bold border-b"
          }`}
          onClick={() => setShowDemands(true)}
        >
          Demands
        </button>
      </div>
      {!showDemands ? (
        services?.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 justify-center overflow-auto">
              {services.map((ad: any) => {
                return <Ad key={ad.adId} ad={ad} />;
              })}
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center w-full py-3 px-10 justify-center border rounded-xl gap-2 shadow-md">
              <MdPlaylistRemove size={30} /> <span> No services yet.</span>
            </div>
          </>
        )
      ) : demands?.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2 justify-center overflow-auto">
            {demands.map((ad: any) => {
              return <Ad key={ad.adId} ad={ad} />;
            })}
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="flex items-center w-full py-3 px-10 justify-center border rounded-xl gap-2 shadow-md">
            <MdPlaylistRemove size={30} /> <span> No demands yet.</span>
          </div>
        </>
      )}
    </div>
  );
};

export default UserAds;
