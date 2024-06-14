import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { jwtDecode, JwtPayload } from "jwt-decode";

type AuthState = {
  token: string | null;
  userId: number | null;
};

interface CustomJWTPayload extends JwtPayload {
  userId: number;
}

const initialState: AuthState = {
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      const { userId } = jwtDecode<CustomJWTPayload>(accessToken);
      state.token = accessToken;
      state.userId = userId;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUserId = (state: RootState) => state.auth.userId;

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
