import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSousCategorie, } from "../utils/guitarCaveApi";

export const fetchSubCategorie = createAsyncThunk(
  "users/fetchSubCategorie",
  async () => {
    const response = await getSousCategorie();
    return response.data;
  }
);

export type TUserCredentials = {
    id : number,
    nom : string,
    email : string,
    type : string,
    token : string
}

export type TInitialUserCredentials = {
    data : {
        user : TUserCredentials | undefined,
        connected : boolean
    }
}

const initialState : TInitialUserCredentials = {
    data : {
        user : undefined,
        connected : false
    }
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        saveCredentials : (state, action) =>{
            state.data.user = action.payload
            state.data.connected = true
            console.log(state.data)
        }
    },
    // extraReducers : (builder)=>{
    //     builder
    //         .addCase(fetchSubCategorie.pending, (state)=>{
    //             state.data.loadingSubCategorie = true
    //             console.log(state.data.loadingSubCategorie)
    //         })
    //         .addCase(fetchSubCategorie.fulfilled, (state, action)=>{
    //             state.data.loadingSubCategorie = false
    //             state.data.sousCategories = action.payload
    //             console.log(state.data.sousCategories)
    //         })
    //         .addCase(fetchSubCategorie.rejected, (state)=>{
    //             state.data.loadingSubCategorie = false
    //         })
    // }
})

export const {saveCredentials} = userSlice.actions;
export default userSlice.reducer;
