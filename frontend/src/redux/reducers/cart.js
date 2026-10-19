import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToCart", (state, action) => {
      const item = action.payload;
      const targetId = item?._id || item?.id;

      const isItemExist = state.cart.find(
        (i) => (i._id || i.id) === targetId
      );

      if (isItemExist) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            (i._id || i.id) === targetId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    })
    .addCase("RemoveFromCart", (state, action) => {
      const targetId =
        typeof action.payload === "object"
          ? action.payload?._id || action.payload?.id
          : action.payload;

      return {
        ...state,
        cart: state.cart.filter(
          (i) => (i._id || i.id) !== targetId
        ),
      };
    });
});