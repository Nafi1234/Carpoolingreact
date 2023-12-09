import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rides: {},
  message: null,
};

const rideSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRides: (state, action) => {
      state.rides = action.payload;
      state.message = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.rides = [];
    },
  },
});

export const { setRides, setMessage } = rideSlice.actions;

export default rideSlice.reducer;
