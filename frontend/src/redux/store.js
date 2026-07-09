import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "../redux/reducers/user.js"

const Store= configureStore({
    reducer:{
        user : userReducer,
    }
})

export default Store