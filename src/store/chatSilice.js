import { createSlice } from "@reduxjs/toolkit";
export const chatSlice = createSlice({
  name: " chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
    chats: [],
  },
  reducers: {
    loadMessages: (state, action) => {
      state.messages = [...action.payload, ...state.messages];
      state.loading = false;
    },
    loadMessage: (state, action) => {
      state.messages = [action.payload, ...state.messages];
      state.loading = false;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.error = null;
    },
    loadChats: (state, action) => {
      state.chats = action.payload;
      state.loading = false;
    },
    filterChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat.uuid !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loadMessages,
  loadMessage,
  clearMessages,
  loadChats,
  setError,
  setLoading,
  filterChat,
} = chatSlice.actions;
export const selectMessages = (state) => state.chat.messages;
export const selectChatLoading = (state) => state.chat.loading;
export const selectChatError = (state) => state.chat.error;
export const selectChats = (state) => state.chat.chats;
