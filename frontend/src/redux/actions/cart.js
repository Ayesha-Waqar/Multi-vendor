
// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: data,
    })

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cart))
    return data ;
}



// remove  to cart
export const RemoveFromCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: "addToCart",
        payload: data._id,
    })

    localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cart))
    return data ;
}