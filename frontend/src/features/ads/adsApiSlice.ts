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

    editAd: builder.mutation({
      query: (data) => ({
        url: `/ads/${data.adId}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["Ads", "User"],
    }),

    deleteAd: builder.mutation({
      query: (data) => ({
        url: `/ads/${data.adId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads", "User"],
    }),
  }),
});

export const { useGetAllAdsQuery, useDeleteAdMutation, useEditAdMutation } =
  adsApiSlice;
