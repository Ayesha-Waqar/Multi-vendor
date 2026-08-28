import axios from "axios";
import { server } from "../../server";

export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "productCreateRequest" })

        const { data } = await axios.post(
            `${server}/product/create-product`,
            newForm, // plain JS object hai, FormData nahi
            { withCredentials: true }
        )

        dispatch({
            type: "productCreateSuccess",
            payload: data.product,
        })
    }
    catch (err) {
        dispatch({
            type: "productCreateFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}