import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthState: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthChange: (state) => {
      state.isAuthState = true;
    },
  },
});

export const { isAuthChange, login, logout } = userSlice.actions;
export default userSlice.reducer;
