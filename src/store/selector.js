import { createSelector } from "reselect";

const selectUserState = (state) => state.auth;

export const selectAccessToken = createSelector(
  selectUserState,
  (userState) => userState.access_token
);
