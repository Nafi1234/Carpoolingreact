import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken, setUser, setRefreshtoken } from "./authslice";
import { useNavigate } from "react-router-dom";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { dispatch }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { access_token, user, refresh_token } = await response.json();

      console.log("Here priniting the tokem", access_token);
      localStorage.removeItem("access_token");
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      dispatch(setUser(user));

      return user;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loginStatus = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
