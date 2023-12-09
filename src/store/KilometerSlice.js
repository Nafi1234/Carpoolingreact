import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kilometer: null,
};

const kilometerSlice = createSlice({
  name: "kilometer",
  initialState,
  reducers: {
    setKilometer: (state, action) => {
      state.kilometer = action.payload;
    },
  },
});

export const { setKilometer } = kilometerSlice.actions;

export const selectKilometer = (state) => state.kilometer.kilometer;

export default kilometerSlice.reducer;
