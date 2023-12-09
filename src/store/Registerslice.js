import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "register",
  initialState: {
    access_token: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
      console.log("access token updated");
    },
    clearToken: (state, action) => {
      state.access_token = null;
    },
  },
});

export const registerReducer = userSlice.reducer;
export const { setAccessToken, clearToken } = userSlice.actions;
