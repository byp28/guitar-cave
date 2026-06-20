import { configureStore } from "@reduxjs/toolkit";
import cart, { type TCart } from "./features/cart";
import type { TCategorie, TSousCategorie } from "./utils/guitarCaveApi";
import categorie from "./features/CategorieSlice";
import sousCategorie from "./features/SousCategorieSlice";

export type TReducer = {
  cart : {
    data : {
      cart : Array<TCart>
    }
  },
  categorie : {
    data : {
      categories : Array<TCategorie>
    }
  },
  sousCategorie : {
    data : {
      sousCategories : Array<TSousCategorie> 
    }
  }
}

export const store = configureStore({
  reducer: {
    cart,
    categorie,
    sousCategorie
  },
});
