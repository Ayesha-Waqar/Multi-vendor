import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
};


export const sellerReducer = createReducer(initialState, (builder) => {
  builder

  //load seller
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
   .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.isSeller = false;
      state.error = action.payload;
    })
    
    .addCase("clearErrors", (state) => {
      state.error = null;
    })


});