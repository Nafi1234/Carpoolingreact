import { createSlice } from "@reduxjs/toolkit";
const pickupslice = createSlice({
  name: "location",
  initialState: {
    location: {
      coordinates: {
        longitude: 0,
        latitude: 0,
      },
    },
    dropofflocation: {
      name: "",
      coordinates: {
        longitude: 0,
        latitude: 0,
      },
    },
  },
  reducers: {
    setpickuplocation: (state, action) => {
      state.pickuplocation.name = action.payload.name;
      state.pickuplocation.coordinates.longitude =
        action.payload.coordinates.longitude;
      state.pickuplocation.coordinates.latitude =
        action.payload.coordinates.latitude;
    },
    setdropofflocation: (state, action) => {
      state.dropofflocation.name = action.payload.name;
      state.dropofflocation.coordinates.longitude =
        action.payload.coordinates.longitude;
      state.dropofflocation.coordinates.latitude =
        action.payload.coordinates.latitude;
    },
  },
});

export const { setpickuplocation, setdropofflocation } = pickupslice.actions;
export const { pickuplocation, dropofflocation } = pickupslice.actions;
export default pickupslice.reducer;
