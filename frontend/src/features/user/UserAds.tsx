import Ad from "../ads/Ad";
import { useGetUserAdsQuery } from "./userApiSlice";
import { MdPlaylistRemove } from "react-icons/md";
type Props = { userId?: string };

const UserAds = ({ userId }: Props) => {
  const { data, isLoading, isSuccess, error } = useGetUserAdsQuery({ userId });

  let content;
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (error) {
    content = <div>{error.message}</div>;
  }

  if (isSuccess) {
    if (data.length < 1) {
      return (
        <div className="flex items-center w-full py-3 px-10 justify-center border rounded-xl gap-2 shadow-md">
          <MdPlaylistRemove size={30} /> <span> No ads yet.</span>
        </div>
      );
    }
    const services = data?.filter((ad: any) => ad.type === "service");
    const demands = data?.filter((ad: any) => ad.type === "demand");
    content = (
      <div>
        {services?.length > 0 && (
          <>
            <div className="text-slate-500 text-xs py-2">My services</div>
            <div className="flex flex-col gap-2 py-2 px-1 overflow-auto">
              {services.map((ad: any) => {
                return <Ad key={ad.adId} ad={ad} />;
              })}
            </div>
          </>
        )}
        {demands?.length > 0 && (
          <>
            <div className="text-slate-500 text-xs py-2">My demands</div>
            <div className="flex flex-col gap-2 py-2 px-1 overflow-auto">
              {demands.map((ad: any) => {
                return <Ad key={ad.adId} ad={ad} />;
              })}
            </div>
          </>
        )}
      </div>
    );
  }
  return content;
};

export default UserAds;
