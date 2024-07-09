import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/login"],
        ignoredPaths: ["user.user"],
      },
    }),
});
