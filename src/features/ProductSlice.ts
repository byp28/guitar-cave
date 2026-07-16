import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, type TProduct } from "../utils/guitarCaveApi";

export const fetchProduct = createAsyncThunk(
  "users/fetchProduct",
  async () => {
    const response = await getProducts();
    return response.data;
  }
);

export type TInitialProduct = {
    data : {
        products : Array<TProduct>,
        loading : boolean
    }
    
}

const initialState : TInitialProduct = {
    data : {
        products : [],
        loading : true
    }
}

export const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        fillProduct : (state, action) =>{
            state.data.products = action.payload
        },
    },
     extraReducers : (builder)=>{
        builder
            .addCase(fetchProduct.pending, (state)=>{
                state.data.loading = true
                console.log(state.data.loading)
            })
            .addCase(fetchProduct.fulfilled, (state, action)=>{
                state.data.loading = false
                state.data.products = action.payload
                console.log(state.data.products)
            })
            .addCase(fetchProduct.rejected, (state)=>{
                state.data.loading = false
            })
    }
})

export const {fillProduct} = productSlice.actions;
export default productSlice.reducer;
