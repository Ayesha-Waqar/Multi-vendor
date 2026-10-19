// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const RemoveFromCart = (data) => async (dispatch, getState) => {
  const targetId = typeof data === "object" ? data?._id || data?.id : data;

  dispatch({
    type: "RemoveFromCart",
    payload: targetId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};