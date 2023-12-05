import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import Ad from "./Ad";
import { useGetAllAdsQuery } from "./adsApiSlice";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import AdPlaceholder from "./AdPlaceholder";

const AdsList = () => {
  const {
    data: ads,
    isLoading,
    isSuccess,
    isError,
    error,
  }: UseQueryHookResult<
    QueryDefinition<any, any, any, any>
  > = useGetAllAdsQuery({});

  let content;

  if (isLoading) {
    content = (
      <div className="px-3 py-2 flex flex-col gap-2">
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
        <AdPlaceholder />
      </div>
    );
  }

  if (isError) {
    content = <div>{error.data?.message}</div>;
  }

  if (isSuccess) {
    content = (
      <div className="px-3 py-2 flex flex-col gap-2">
        {ads.map((ad: any) => {
          return <Ad key={ad.adId} ad={ad} />;
        })}
      </div>
    );
  }

  return content;
};

export default AdsList;
