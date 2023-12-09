import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: null,
  reducers: {
    setDate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export const selectdate = (state) => state.date;
export default dateSlice.reducer;
