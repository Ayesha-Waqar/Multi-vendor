import axios from "axios";
import { server } from "../../server";

// create coupen codes 
export const createCoupens = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "CoupenCreateRequest" })

        const { data } = await axios.post(
            `${server}/coupen/create-code`,
            newForm, // plain JS object hai, FormData nahi
            { withCredentials: true }
        )

        dispatch({
            type: "CoupenCreateSuccess",
            // success : true , 
            payload: data.coupenCode,
        })
    }
    catch (err) {
        dispatch({
            type: "CoupenCreateFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}

// get all events  of a shop 
export const getCoupons  = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getAllShopCoupens" })

        const { data } = await axios.get(
            `${server}/coupen/get-all-shop-coupens/${id}`,
            {withCredentials : true ,
                 headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    "Pragma": "no-cache",
                    "Expires": "0"
                }
            }
        )
  console.log("coupens" , data)

        dispatch({
            type: "getAllShopCoupensSuccess",
            success : true , 
            payload: data.coupens,
        })
    }
    catch (err) {
        dispatch({
            type: "getAllShopCoupensFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}

// delete any shop coupen 
export const deleteCoupen = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteCoupenRequest" })

        const { data } = await axios.get(
            `${server}/coupen/delete-shop-coupen/${id}`,
            {withCredentials:true}
        )

        dispatch({
            type: "deleteCoupenRequestSuccess",
            success : true , 
            payload: data.message,
        })
    }
    catch (err) {
        dispatch({
            type: "deleteCoupenRequestFalse",
            payload: err.response?.data?.message || err.message,
        })
    }
}

