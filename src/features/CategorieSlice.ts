import { createSlice } from "@reduxjs/toolkit";
import type { TCategorie } from "../utils/guitarCaveApi";


export type TInitialCategorie = {
    data : {
        categories : Array<TCategorie>
    }
    
}

const initialState : TInitialCategorie = {
    data : {
        categories : []
    }
}

export const categorieSlice = createSlice({
    name : "categorie",
    initialState,
    reducers : {
        fillCategorie : (state, action) =>{
            state.data.categories = action.payload
            console.log(action.payload, "rk")
        }
    }
})

export const {fillCategorie} = categorieSlice.actions;
export default categorieSlice.reducer;
