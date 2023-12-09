// store.js

// userApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userSubmitted,
  userSubmittedSuccess,
  userSubmittedError,
} from "./userSlice";

export const submitUserData = createAsyncThunk(
  "user/submit",
  async (data, { dispatch }) => {
    dispatch(userSubmitted());
    try {
      const response = await fetch("http://127.0.0.1:8000/user/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("HTTP error! Status:", response.status);
        console.error("Error data:", errorData);
        dispatch(userSubmittedError(errorData)); // Dispatch userSubmittedError with error data
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    }
  }
);
