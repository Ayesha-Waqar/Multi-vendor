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
