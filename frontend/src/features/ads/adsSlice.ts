import { createSlice } from "@reduxjs/toolkit";

type AdsState = {
  page: number;
};

const initialState: AdsState = {
  page: 0,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
    resetPage: () => {
      return initialState;
    },
  },
});

export const { nextPage, resetPage } = adsSlice.actions;
export default adsSlice.reducer;
