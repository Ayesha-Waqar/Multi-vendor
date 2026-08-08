import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder

  //load user
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
   .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    
    .addCase("clearErrors", (state) => {
      state.error = null;
    })


});



export default userReducer;