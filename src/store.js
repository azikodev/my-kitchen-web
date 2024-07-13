import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/userSlice";
import cartReducer from "./app/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["user/login", "cart/addProduct", "cart/changeAmount", "cart/removeProduct", "cart/removeAll"],
        ignoredPaths: ["user.user", "cart.calculator.products"],
      },
    }),
});

export default store;
