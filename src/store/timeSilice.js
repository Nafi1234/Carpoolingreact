// timeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
  name: "time",
  initialState: {
    hours: "12",
    minutes: "00",
  },
  reducers: {
    setTime: (state, action) => {
      const { hours, minutes } = action.payload;
      state.hours = hours;
      state.minutes = minutes;
    },
  },
});

export const { setTime } = timeSlice.actions;
export const selectTime = (state) => state.time;

export default timeSlice.reducer;
