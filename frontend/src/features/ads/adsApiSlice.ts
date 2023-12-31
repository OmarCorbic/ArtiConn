// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// type Ad = {
//   adId: number;
//   userId: number;
//   payout: number;
//   payoutType: string;
//   city: string;
//   type: string;
//   title: string;
//   description: string;
//   date: Date;
//   createdAt: Date;
// };

// const adsAdapter = createEntityAdapter<Ad>({ selectId: (ad) => ad.adId });
// const initialState = adsAdapter.getInitialState();

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: () => ({
        url: "/ads",
        method: "GET",
      }),

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
