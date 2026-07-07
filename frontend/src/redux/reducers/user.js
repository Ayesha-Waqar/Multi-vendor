import { createReducer } from "@reduxjs/toolkit";
import { isAuthenticated } from "../../../../backend/src/middlewares/auth";

const initialState = {
    isAuthenticated :  false 
}


export const userREducer = createReducer(initialState, {
   LoadUserRequest : (state)=>{
    state.loading=true
   },
   LoadUserSuccess : (state,action)=>{
    state.isAuthenticated= true;
    state.loading=false;
    state.user=action.payload;
   },
   LoadUserFail : (s)
})