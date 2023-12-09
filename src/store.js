import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import { submitUserData } from "./store/userApi";
import loginReducer from "./store/loginsilice";
import authReducer from "./store/authslice";
import { registerReducer } from "./store/Registerslice";
import { apiSlice } from "./store/apiSilice";
import suggestionsReducer from "./store/suggestionSilce";
import Pickupreducer from "./store/Pickupreducer";
import dateReducer from "./store/DateSlice";
import timeReducer from "./store/timeSilice";
import passengerReducer from "./store/PassengerSlice";
import KilometerReducer from "./store/KilometerSlice";
import priceReducer from "./store/Priceslice";
import rideReducer from "./store/searchslice";
import rideidReducer from "./store/ridedeatails";
import searchcountReducer from "./store/searchpassenger";
import vehicleReducer from "./store/Vehiclename";
import Sidebar from "./components/Sidebar";
const store = configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    auth: authReducer,
    register: registerReducer,
    api: apiSlice.reducer,
    suggestions: suggestionsReducer,
    Pickup: Pickupreducer,
    date: dateReducer,
    time: timeReducer,
    passenger: passengerReducer,
    kilometer: KilometerReducer,
    price: priceReducer,
    rides: rideReducer,
    rideid: rideidReducer,
    searchcount: searchcountReducer,
    vehicle: vehicleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
