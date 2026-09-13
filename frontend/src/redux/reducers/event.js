import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  error: null
};


export const eventReducer = createReducer(initialState, (builder) => {
  builder

    .addCase("clearErrors", (state) => {
      state.error = null;
    })


    //create event
    .addCase("EventCreateRequest", (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    })
    .addCase("EventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("EventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("EventCreateReset", (state) => {
      state.success = false;
    })

    // get all events 
    .addCase("GetEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("GetEventsSuccess", (state, action) => {
      state.isLoading = false;
      // state.success = true;
      state.allEvents = action.payload
    })

    .addCase("GetEventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })

     //get all events of shop 
    .addCase("getAllShopEvents", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopEventsSuccess", (state, action) => {
      state.isLoading = false;
      // state.success = true;
      state.events = action.payload
    })

    .addCase("getAllShopEventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload
    })

    //del a product from shop 
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteEventRequestFalse", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

});
