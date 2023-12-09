import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rideid: null,
};

const rideidslice = createSlice({
  name: "rideid",
  initialState,
  reducers: {
    setRideid: (state, action) => {
      state.rideid = action.payload;
    },
  },
});

export const { setRideid } = rideidslice.actions;
export default rideidslice.reducer;
