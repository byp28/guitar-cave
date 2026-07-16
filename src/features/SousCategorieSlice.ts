import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSousCategorie, type TSousCategorie } from "../utils/guitarCaveApi";

export const fetchSubCategorie = createAsyncThunk(
  "users/fetchSubCategorie",
  async () => {
    const response = await getSousCategorie();
    return response.data;
  }
);

export type TInitialCategorie = {
    data : {
        sousCategories : Array<TSousCategorie>,
        loadingSubCategorie : boolean
    }
    
}

const initialState : TInitialCategorie = {
    data : {
        sousCategories : [],
        loadingSubCategorie : true
    }
}

export const sousCategorieSlice = createSlice({
    name : "sousCategorie",
    initialState,
    reducers : {
        fillSousCategorie : (state, action) =>{
            state.data.sousCategories = action.payload
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(fetchSubCategorie.pending, (state)=>{
                state.data.loadingSubCategorie = true
                console.log(state.data.loadingSubCategorie)
            })
            .addCase(fetchSubCategorie.fulfilled, (state, action)=>{
                state.data.loadingSubCategorie = false
                state.data.sousCategories = action.payload
                console.log(state.data.sousCategories)
            })
            .addCase(fetchSubCategorie.rejected, (state)=>{
                state.data.loadingSubCategorie = false
            })
    }
})

export const {fillSousCategorie} = sousCategorieSlice.actions;
export default sousCategorieSlice.reducer;
