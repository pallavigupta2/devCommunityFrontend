import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import requestReducer from "./requestSlice"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        request:requestReducer,
    }
})

export default appStore;