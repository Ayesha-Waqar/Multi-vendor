import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("addToWishlist", (state, action) => {
      const item = action.payload;
      const targetId = item?._id || item?.id;

      const isItemExist = state.wishlist.find(
        (i) => (i._id || i.id) === targetId
      );

      if (isItemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) =>
            (i._id || i.id) === targetId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    })
    .addCase("removeFromWishlist", (state, action) => {
      const targetId =
        typeof action.payload === "object"
          ? action.payload?._id || action.payload?.id
          : action.payload;

      return {
        ...state,
        wishlist: state.wishlist.filter(
          (i) => (i._id || i.id) !== targetId
        ),
      };
    });
});
