import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    refreshtoken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRefreshtoken: (state, action) => {
      state.refreshtoken = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, clearToken, setRefreshtoken } =
  authSlice.actions;
export default authSlice.reducer;
