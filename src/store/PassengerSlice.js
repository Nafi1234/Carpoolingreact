import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passenger: 1,
};

const passengerSlice = createSlice({
  name: "passenger",
  initialState,
  reducers: {
    setPassengerCount: (state, action) => {
      state.passenger = action.payload;
    },
  },
});

export const { setPassengerCount } = passengerSlice.actions;
export const selectpassenger = (state) => state.passenger.passenger;

export default passengerSlice.reducer;
