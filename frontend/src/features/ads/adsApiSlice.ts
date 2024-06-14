// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export type AdType = {
  adId: number;
  userId: number;
  payout: number;
  payoutType: string;
  city: string;
  type: string;
  title: string;
  description: string;
  date: Date | null;
  createdAt: Date;
  formattedDate?: string | null;
};

// const adsAdapter = createEntityAdapter<AdType>({ selectId: (ad) => ad.adId });
// const initialState = adsAdapter.getInitialState();

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query<any, { page: number }>({
      query: ({ page }) => ({
        url: `/ads?offset=${page * 10}&limit=10`,
        method: "GET",
      }),

      transformResponse(baseQueryReturnValue) {
        const isEndOfList = baseQueryReturnValue.length < 10 ? true : false;
        return { ads: baseQueryReturnValue, isEndOfList };
      },

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newData, { arg }) => {
        console.log(arg);
        if (arg.page > 0) {
          currentCache.ads.push(...newData.ads);
          currentCache.isEndOfList = newData.isEndOfList;
          return;
        }
        return newData;
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },

      providesTags: ["Ads"],
    }),

    createAd: builder.mutation({
      query: (data) => ({
        url: `/ads`,
        method: "POST",
        body: data.body,
      }),

      invalidatesTags: ["Ads", { type: "User", id: "ADS" }],
    }),

    editAd: builder.mutation({
      query: (data) => ({
        url: `/ads/${data.adId}`,
        method: "PATCH",
        body: data.body,
      }),

      invalidatesTags: ["Ads", { type: "User", id: "ADS" }],
    }),

    deleteAd: builder.mutation({
      query: (data) => ({
        url: `/ads/${data.adId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Ads", { type: "User", id: "ADS" }],
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useCreateAdMutation,
  useDeleteAdMutation,
  useEditAdMutation,
} = adsApiSlice;
