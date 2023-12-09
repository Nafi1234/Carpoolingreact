import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: null,
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setPrice } = priceSlice.actions;

export const selectPrice = (state) => state.price.price;

export default priceSlice.reducer;
