import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from "../redux/reducers/user.js"
import { sellerReducer } from "./reducers/seller.js"
import { productReducer } from "./reducers/product.js"

const Store= configureStore({
    reducer:{
        user : userReducer,
        seller : sellerReducer,
        products : productReducer
    }
})

export default Store