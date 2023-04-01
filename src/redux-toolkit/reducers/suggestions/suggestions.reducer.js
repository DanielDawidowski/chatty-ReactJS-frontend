import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    addToSuggestions: (state, action) => {
      const { isLoading, users } = action.payload;
      state.users = [...users];
      state.isLoading = isLoading;
    }
  }
});

export const { addToSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
