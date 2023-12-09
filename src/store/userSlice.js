import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: {
      first_name: null,
      last_name: null,
      phone_number: null,
      email: null,
      password: null,
      confirm_password: null,
    },
  },

  reducers: {
    userSubmitted: (state) => {
      state.status = "loading";
    },
    userSubmittedSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      console.log("here printing the suceeded", state.user);
    },
    userSubmittedError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.log("here printing the suceeded", state.error);
    },
  },
});
export const { userSubmitted, userSubmittedSuccess, userSubmittedError } =
  userSlice.actions;
export default userSlice.reducer;
