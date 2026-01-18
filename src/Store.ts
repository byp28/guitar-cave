import { configureStore } from "@reduxjs/toolkit";
import cart from "./features/cart";

export const store = configureStore({
  reducer: {
    cart,
  },
});
