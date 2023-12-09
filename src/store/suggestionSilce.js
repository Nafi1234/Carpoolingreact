// suggestionsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
    sourceSuggestions: [],
    destinationSuggestions: [],
  },
  reducers: {
    setSourceSuggestions: (state, action) => {
      state.sourceSuggestions = action.payload;
    },
    setDestinationSuggestions: (state, action) => {
      state.destinationSuggestions = action.payload;
    },
  },
});

export const { setSourceSuggestions, setDestinationSuggestions } =
  suggestionsSlice.actions;

export const selectSourceSuggestions = (state) =>
  state.suggestions.sourceSuggestions;

export const selectDestinationSuggestions = (state) =>
  state.suggestions.destinationSuggestions;

export default suggestionsSlice.reducer;
