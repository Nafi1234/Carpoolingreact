import { createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    registrationNo: null,
    vehicleName: "",
  },
  reducers: {
    setRegistrationNo: (state, action) => {
      state.registrationNo = action.payload;
    },
    setVehicleName: (state, action) => {
      state.vehicleName = action.payload;
    },
  },
});

export const { setRegistrationNo, setVehicleName } = vehicleSlice.actions;
export const selectRegistrationNo = (state) => state.vehicle.registrationNo;
export const selectVehicleName = (state) => state.vehicle.vehicleName;

export default vehicleSlice.reducer;
