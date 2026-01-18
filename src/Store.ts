import { configureStore } from "@reduxjs/toolkit";
import cart, { type TCart } from "./features/cart";

export type TReducer = {
  cart : {
    data : {
      cart : Array<TCart>
    }
  }
}

export const store = configureStore({
  reducer: {
    cart,
  },
});
