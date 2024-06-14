import {
  fetchBaseQuery,
  createApi,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../../features/auth/authSlice";
import {
  BaseQueryArg,
  BaseQueryResult,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
  prepareHeaders: (headers, api: any) => {
    const token = api.getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (
  args: BaseQueryArg<any>,
  api: BaseQueryApi,
  extraOptions: any
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 500) {
    return result.error;
  }

  // If you want, handle other status codes, too
  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult: BaseQueryResult<any> = await baseQuery(
      "/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        refreshResult.error.data.message = "Your login has expired.";
        api.dispatch(logout());
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "Api",
  tagTypes: ["User", "Auth", "Ads"],
  endpoints: () => ({}),
});
