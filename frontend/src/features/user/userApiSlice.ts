import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}`,
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "INFO" }],
    }),

    getUserAds: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}/ads`,
        method: "GET",
      }),
      providesTags: [{ type: "User", id: "ADS" }],
    }),

    getProfilePhoto: builder.query({
      query: (data) => ({
        url: `/user/${data.userId}/profile-photo`,
        method: "GET",
      }),

      providesTags: [{ type: "User", id: "PHOTO" }],
    }),

    editUserInfo: builder.mutation({
      query: (data) => ({
        url: `/user/${data.userId}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [{ type: "User", id: "INFO" }],
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
      invalidatesTags: [{ type: "User", id: "PHOTO" }],
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
