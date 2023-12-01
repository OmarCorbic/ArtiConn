import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    sendVerificationCode: builder.mutation({
      query: (data) => ({
        url: "/auth/send-code",
        method: "POST",
        body: { email: data.email },
      }),
    }),

    verifyCode: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-code",
        method: "POST",
        body: { email: data.email, code: data.code },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useSendVerificationCodeMutation,
  useVerifyCodeMutation,
} = authApiSlice;
