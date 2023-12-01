import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserAds: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}/ads`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getProfilePhoto: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}/profile-photo`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    editUserInfo: builder.mutation({
      query: (data) => ({
        url: `/user/${data.userId}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
        method: "PATCH",
        body: data.body,
      }),
    }),

    updateProfilePhoto: builder.mutation({
      query: (data) => ({
        url: `/user/profile-photo`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserAdsQuery,
  useGetUserInfoQuery,
  useGetProfilePhotoQuery,
  useEditUserInfoMutation,
  useChangePasswordMutation,
  useUpdateProfilePhotoMutation,
} = userApiSlice;
