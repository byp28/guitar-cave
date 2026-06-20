import { createSlice } from "@reduxjs/toolkit";
import type { TSousCategorie } from "../utils/guitarCaveApi";


export type TInitialCategorie = {
    data : {
        sousCategories : Array<TSousCategorie>
    }
    
}

const initialState : TInitialCategorie = {
    data : {
        sousCategories : []
    }
}

export const sousCategorieSlice = createSlice({
    name : "sousCategorie",
    initialState,
    reducers : {
        fillSousCategorie : (state, action) =>{
            state.data.sousCategories = action.payload
            console.log(action.payload , "lk")
        }
    }
})

export const {fillSousCategorie} = sousCategorieSlice.actions;
export default sousCategorieSlice.reducer;
