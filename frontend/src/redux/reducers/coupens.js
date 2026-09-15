import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null
};


export const CoupenCodeReducer = createReducer(initialState, (builder) => {
  builder

    .addCase("clearErrors", (state) => {
      state.error = null;
    })


    //create codes 
    .addCase("CoupenCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("CoupenCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("CoupenCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("CoupenCreateReset", (state) => {
      state.success = false;
    })

     //get all coupens of shop 
    .addCase("getAllShopCoupens", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopCoupensSuccess", (state, action) => {
      state.isLoading = false;
      // state.success = true;
      state.coupens = action.payload
    })

    .addCase("getAllShopCoupensFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })

     //del a coupen from shop 
    .addCase("deleteCoupenRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCoupenRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteCoupenRequestFalse", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

});
