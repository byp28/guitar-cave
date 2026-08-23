import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  passport } from "../utils/guitarCaveApi";
//import { encrypt } from "../utils/hash";


export const verifieConnection = createAsyncThunk(
  "users/auth/passport",
  async () => {
    try{
        const response = await passport();
        return response.data;
    }catch(e){
        console.log(e)
    }
    
  }
);

export type TUserCredentials = {
    id : number,
    addressId? : number, 
    nom : string,
    email : string,
    type : string,
    token : string
}

export type TInitialUserCredentials = {
    data : {
        user : TUserCredentials | undefined,
        connected : boolean
        message? : string
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
            localStorage.setItem("token", JSON.stringify(state.data.user?.token as string))
        },
        deconnexion : (state,_action) =>{
            state.data.user = undefined,
            state.data.connected = false,
            localStorage.removeItem("token")
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(verifieConnection.pending, (_state)=>{
                //state.data.loadingSubCategorie = true
            })
            .addCase(verifieConnection.fulfilled, (state, action)=>{
                if(action.payload.user){
                    state.data.connected = true
                    state.data.user = action.payload.user
                }else{
                    localStorage.removeItem("token")
                }
            })
            .addCase(verifieConnection.rejected, (state)=>{
                //state.data.loadingSubCategorie = false
                console.log(state.data.message,"rej")
            })
    }
})

export const {saveCredentials,deconnexion} = userSlice.actions;
export default userSlice.reducer;
