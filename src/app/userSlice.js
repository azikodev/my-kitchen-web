import { createSlice } from "@reduxjs/toolkit";

function getUserFromLocalStorage() {
  return (
    JSON.parse(localStorage.getItem("user")) || {
      isAuthState: false,
      user: null,
    }
  );
}

const userSlice = createSlice({
  name: "user",
  initialState: getUserFromLocalStorage,
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

export const { login, logout, isAuthChange } = userSlice.actions;

export default userSlice.reducer;
