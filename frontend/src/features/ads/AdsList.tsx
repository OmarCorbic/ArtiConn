import Ad from "./Ad";

import { MdPlaylistRemove } from "react-icons/md";
import { AdType } from "./adsApiSlice";

const AdsList = ({ ads }: { ads: AdType[] }) => {
  return (
    <div className="justify-center px-1 py-2 flex flex-wrap gap-2">
      {ads?.length < 1 ? (
        <div className="flex items-center w-full py-3 px-10 justify-center border rounded-xl gap-2 shadow-md">
          <MdPlaylistRemove size={30} /> <span> No ads to show.</span>
        </div>
      ) : (
        <>
          {ads?.map((ad: any) => {
            return <Ad key={ad.adId} ad={ad} />;
          })}
        </>
      )}
    </div>
  );
};

export default AdsList;
