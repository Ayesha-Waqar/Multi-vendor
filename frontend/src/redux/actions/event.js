import axios from "axios";
import { server } from "../../server";

// create event 
export const createEvent = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "EventCreateRequest" })

        const { data } = await axios.post(
            `${server}/event/create-event`,
            newForm, // plain JS object hai, FormData nahi
            { withCredentials: true }
        )

        dispatch({
            type: "EventCreateSuccess",
            // success : true , 
            payload: data.event,
        })
    }
    catch (err) {
        dispatch({
            type: "EventCreateFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}

//get  all events
export const getAllEvents = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "GetEventsRequest" })

        const { data } = await axios.get(
            `${server}/event/get-all-events`,
            // { withCredentials: true }
        )

        console.log("event" , data)

        dispatch({
            type: "GetEventsSuccess",
            // success : true , 
            payload: data.events,
        })
    }
    catch (err) {
        dispatch({
            type: "GetEventsFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}

// get all events  of a shop 
export const getEvents = (id) => async (dispatch) => {
    try {
        dispatch({ type: "getAllShopEvents" })

        const { data } = await axios.get(
            `${server}/event/get-all-shop-events/${id}`,
        )
  console.log("events" , data)

        dispatch({
            type: "getAllShopEventsSuccess",
            success : true , 
            payload: data.events,
        })
    }
    catch (err) {
        dispatch({
            type: "getAllShopEventsFail",
            payload: err.response?.data?.message || err.message,
        })
    }
}

// delete any shop product
export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({ type: "deleteEventRequest" })

        const { data } = await axios.get(
            `${server}/event/delete-shop-event/${id}`,
            {withCredentials:true}
        )

        dispatch({
            type: "deleteEventRequestSuccess",
            success : true , 
            payload: data.message,
        })
    }
    catch (err) {
        dispatch({
            type: "deleteEventRequestFalse",
            payload: err.response?.data?.message || err.message,
        })
    }
}