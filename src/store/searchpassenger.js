import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: null,
};

const searchcount = createSlice({
  name: "searchcount",
  initialState,
  reducers: {
    setsearchcount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setsearchcount } = searchcount.actions;
export default searchcount.reducer;
