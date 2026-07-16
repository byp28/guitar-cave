import { configureStore } from "@reduxjs/toolkit";
import cart, { type TCart } from "./features/cart";
import type { TCategorie, TProduct, TSousCategorie } from "./utils/guitarCaveApi";
import categorie from "./features/CategorieSlice";
import product from "./features/ProductSlice";
import sousCategorie from "./features/SousCategorieSlice";
import user from "./features/UserSlice";
import type { TUserCredentials } from "./features/UserSlice";

export type TReducer = {
  cart : {
    data : {
      cart : Array<TCart>,
      
    }
  },
  user : {
    data : {
      user : TUserCredentials | undefined,
      connected : boolean
    }
  },
  categorie : {
    data : {
      categories : Array<TCategorie>,
      loadingCategorie : boolean
    }
  },
  sousCategorie : {
    data : {
      sousCategories : Array<TSousCategorie> ,
      loadingSubCategorie : boolean
    }
  },
  product : {
    data : {
      products : Array<TProduct>,
      loading : boolean
    }
  }
}

export const store = configureStore({
  reducer: {
    cart,
    user,
    categorie,
    sousCategorie,
    product
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;