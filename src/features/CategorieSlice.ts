import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategorie, type TCategorie } from "../utils/guitarCaveApi";


export const fetchCategorie = createAsyncThunk(
  "users/fetchCategorie",
  async () => {
    const response = await getCategorie();
    return response.data;
  }
);

export type TInitialCategorie = {
    data : {
        categories : Array<TCategorie>,
        loadingCategorie : boolean,
    }
    
}

const initialState : TInitialCategorie = {
    data : {
        categories : [],
        loadingCategorie : true
    }
}

export const categorieSlice = createSlice({
    name : "categorie",
    initialState,
    reducers : {
        fillCategorie : (state, action) =>{
            state.data.categories = action.payload
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchCategorie.pending, (state)=>{
                state.data.loadingCategorie = true
            })
            .addCase(fetchCategorie.fulfilled, (state, action)=>{
                    state.data.loadingCategorie = false
                    state.data.categories = action.payload
                })
            .addCase(fetchCategorie.rejected, (state)=>{
                state.data.loadingCategorie = false
        })
    }
})

export const {fillCategorie} = categorieSlice.actions;
export default categorieSlice.reducer;
